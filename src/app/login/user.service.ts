import { User } from './user.model';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { UserToUpdate } from './userToUpdate.model';
import { SuccesComponent } from './../succes/succes.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { map } from 'rxjs/operators';
import { environment } from '@envi/environment';

@Injectable({ providedIn: 'root' })
export class UsersService {
  private isAuthenticated = false;
  private isAdminAuthenticated = false;
  private userId: any;
  private userName: any;
  private userPicture: any;
  private userRole: any;
  private token: any;
  private tokenTimer: any;
  private users: User[] = [];
  private teachers: User[] = [];
  private userimgListener = new Subject<String>();
  private usernameListener = new Subject<String>();
  private authStatusListener = new Subject<boolean>();
  private authAdminStatusListener = new Subject<boolean>();
  private userUpdated = new Subject<User[]>();
  private teacherUpdate = new Subject<User[]>();
  apiURL = environment.apiURL;

  constructor(
    private http: HttpClient,
    private router: Router,
    private _snackBar: MatSnackBar
  ) {}

  addUserAsAdmin(
    name: string,
    phonenum: string,
    file: File,
    password: string,
    email: string,
    category: string,
    speciality: string,
    location: string,
    role: string
  ) {
    const userData = new FormData();
    userData.append('name', name);
    userData.append('phonenum', phonenum);
    userData.append('file', file);
    userData.append('password', password);
    userData.append('email', email);
    userData.append('category', category);
    userData.append('speciality', speciality);
    userData.append('location', location);
    userData.append('role', role);

    this.http
      .post<{ message: string }>(
        this.apiURL + '/api/users/AdminAddUser',
        userData
      )
      .subscribe(
        () => {
          const successMessage = 'User Added Successfuly !';
          this._snackBar.openFromComponent(SuccesComponent, {
            data: { message: successMessage },
            duration: 2500,
            panelClass: ['green-snackbar'],
          });
        },
        (error) => {
          console.log(error);
        }
      );
  }

  editUser(
    userId: string,
    name: string,
    phonenum: string,
    file: File,
    password: string,
    email: string,
    category: string,
    location: string
  ) {
    const userData = new FormData();
    userData.append('userId', userId);
    userData.append('name', name);
    userData.append('phonenum', phonenum);
    userData.append('file', file);
    userData.append('password', password);
    userData.append('email', email);
    userData.append('category', category);
    userData.append('location', location);

    this.http
      .patch<{ message: string }>(
        this.apiURL + '/api/users/UpdateUser',
        userData
      )
      .subscribe(
        () => {
          console.log('User Update !');
        },
        (error) => {
          console.log(error);
        }
      );
  }

  SignUp(name: string, phonenum: string, password: string) {
    const userData: User = {
      name: name,
      phonenum: phonenum,
      password: password,
      userId: '',
      verified: '',
      email: '',
      category: '',
      speciality: '',
      location: '',
      role: '',
      createdAt: '',
      updatedAt: '',
    };

    this.http
      .post<{ message: string }>(this.apiURL + '/api/users/signup', userData)
      .subscribe(
        () => {
          console.log('SignUp Successf !');
          const successMessage = 'SignUp Successf !';
          this._snackBar.openFromComponent(SuccesComponent, {
            data: { message: successMessage },
            duration: 2500,
            panelClass: ['green-snackbar'],
          });
        },
        (error) => {
          console.log(error);
        }
      );
  }
  getToken() {
    return this.token;
  }

  getUserId() {
    return this.userId;
  }

  getUserName() {
    return this.userName;
  }
  getUserRole() {
    return this.userRole;
  }
  getUserPicture() {
    return this.userPicture;
  }
  getIsAuth() {
    return this.isAuthenticated;
  }
  getAdminIsAuth() {
    return this.isAdminAuthenticated;
  }
  getUserImgListener() {
    return this.userimgListener.asObservable();
  }
  getUserNameListener() {
    return this.usernameListener.asObservable();
  }
  getAuthStatusListener() {
    return this.authStatusListener.asObservable();
  }

  getAuthAdminStatusListener() {
    return this.authAdminStatusListener.asObservable();
  }

  login(phonenum: string, password: string) {
    const user: User = {
      phonenum: phonenum,
      password: password,
      userId: '',
      name: '',
      verified: '',
      email: '',
      category: '',
      speciality: '',
      location: '',
      role: '',
      createdAt: '',
      updatedAt: '',
    };
    this.http
      .post<{
        token: string;
        expiresIn: number;
        userId: string;
        userName: string;
        userRole: string;
        userPicture: string;
      }>(this.apiURL + '/api/users/login', user)
      .subscribe(
        (response) => {
          const token = response.token;
          this.token = token;
          if (token) {
            const expiresInDuration = response.expiresIn;
            this.setAuthTimer(expiresInDuration);
            this.isAuthenticated = true;
            this.userId = response.userId;
            this.userName = response.userName;
            this.userRole = response.userRole;
            this.userPicture = response.userPicture;
            if (this.userRole == 'admin') {
              this.isAdminAuthenticated = true;
              this.authAdminStatusListener.next(true);
            }
            this.authStatusListener.next(true);
            this.userimgListener.next(this.userPicture);
            this.usernameListener.next(this.userName);

            const now = new Date();
            const expirationDate = new Date(
              now.getTime() + expiresInDuration * 1000
            );
            console.log(expirationDate);
            this.saveAuthData(
              token,
              expirationDate,
              this.userId,
              this.userName,
              this.userRole,
              this.userPicture
            );
            const successMessage = 'Login Successfuly !';
            this._snackBar.openFromComponent(SuccesComponent, {
              data: { message: successMessage },
              duration: 2500,
              panelClass: ['green-snackbar'],
            });
            this.router.navigate(['/Homepage/Profile/' + this.userId]);
          }
        },
        (error) => {
          this.authStatusListener.next(false);
          this.userimgListener.next('');
          this.usernameListener.next('');

          this.authAdminStatusListener.next(false);
        }
      );
  }

  autoAuthUser() {
    const authInformation = this.getAuthData();
    if (!authInformation) {
      return;
    }
    const now = new Date();
    const expiresIn = authInformation.expirationDate.getTime() - now.getTime();
    if (expiresIn > 0) {
      this.token = authInformation.token;
      this.isAuthenticated = true;
      this.userId = authInformation.userId;
      this.userName = authInformation.userName;
      this.userPicture = authInformation.userPicture;
      this.userRole = authInformation.userRole;

      this.setAuthTimer(expiresIn / 1000);
      this.authStatusListener.next(true);
      this.userimgListener.next(this.userPicture);
      this.usernameListener.next(this.userName);

      if (this.userRole == 'admin') {
        this.isAdminAuthenticated = true;
        this.authAdminStatusListener.next(true);
      }
    }
  }
  logout() {
    this.token = null;
    this.isAuthenticated = false;
    this.isAdminAuthenticated = false;
    this.userimgListener.next('');
    this.usernameListener.next('');

    this.authStatusListener.next(false);
    this.authAdminStatusListener.next(false);
    this.userId = null;
    this.userName = null;
    this.userPicture = null;
    this.userRole = null;
    clearTimeout(this.tokenTimer);
    this.clearAuthData();
    console.log('Logout runs seccesfully!');
    this.router.navigate(['/Homepage/View']);
  }

  private setAuthTimer(duration: number) {
    console.log('Setting timer: ' + duration + ' Secends');
    this.tokenTimer = setTimeout(() => {
      this.logout();
    }, duration * 1000);
  }

  private saveAuthData(
    token: string,
    expirationDate: Date,
    userId: string,
    userName: string,
    userRole: string,
    userPicture: string
  ) {
    localStorage.setItem('token', token);
    localStorage.setItem('expiration', expirationDate.toISOString());
    localStorage.setItem('userId', userId);
    localStorage.setItem('userName', userName);
    localStorage.setItem('userRole', userRole);
    localStorage.setItem('userPicture', userPicture);
  }

  private clearAuthData() {
    localStorage.removeItem('token');
    localStorage.removeItem('expiration');
    localStorage.removeItem('userId');
    localStorage.removeItem('userName');
    localStorage.removeItem('userRole');
    localStorage.removeItem('userPicture');
  }

  private getAuthData() {
    const token = localStorage.getItem('token');
    const expirationDate = localStorage.getItem('expiration');
    const userId = localStorage.getItem('userId');
    const userName = localStorage.getItem('userName');
    const userRole = localStorage.getItem('userRole');
    const userPicture = localStorage.getItem('userPicture');

    if (!token || !expirationDate) {
      return;
    }
    return {
      token: token,
      expirationDate: new Date(expirationDate),
      userId: userId,
      userName: userName,
      userRole: userRole,
      userPicture: userPicture,
    };
  }

  modifyUser(
    userId: string,
    Wallet: string,
    country: string,
    responsTime: string,
    imgPath: File,
    description: string,
    occupation: string,
    skills: string
  ) {
    const userData = new FormData();
    userData.append('userId', userId);
    userData.append('Wallet', Wallet);
    userData.append('country', country);
    userData.append('responsTime', responsTime);
    userData.append('imgPath', imgPath);
    userData.append('description', description);
    userData.append('occupation', occupation);
    userData.append('skills', skills);

    this.http
      .patch<{ message: string }>(this.apiURL + '/api/users/up/', userData)
      .subscribe(
        () => {
          console.log('User Updateded Successfuly !');
          const successMessage = 'Updateded Successfuly !';
          this._snackBar.openFromComponent(SuccesComponent, {
            data: { message: successMessage },
            duration: 2500,
            panelClass: ['green-snackbar'],
          });
        },
        (error) => {
          console.log(error);
        }
      );
  }

  /*************************************************/

  getusersearch(filter: string) {
    this.http
      .get<{ message: string; users: any }>(
        this.apiURL + '/api/users/search/' + filter
      )
      .pipe(
        map((usertData) => {
          return usertData.users.map(
            (user: { _id: any; name: any; email: any; imgPath: any }) => {
              return {
                userId: user._id,
                name: user.name,
                email: user.email,
                imgPath: user.imgPath,
              };
            }
          );
        })
      )
      .subscribe((transformedUser) => {
        this.users = transformedUser;
        this.userUpdated.next([...this.users]);
      });
  }

  getUserUpdateListener() {
    return this.userUpdated.asObservable();
  }

  /*************************************************/

  getTeachers() {
    this.http
      .get<{ message: string; users: any }>(
        this.apiURL + '/api/users/GetTeacher'
      )
      .pipe(
        map((teacherData) => {
          return teacherData.users.map((teacher: { _id: any; name: any }) => {
            return {
              id: teacher._id,
              name: teacher.name,
            };
          });
        })
      )
      .subscribe((transformedTeacher) => {
        this.teachers = transformedTeacher;
        this.teacherUpdate.next([...this.teachers]);
      });
  }
  getTeacherUpdateListener() {
    return this.teacherUpdate.asObservable();
  }
}
