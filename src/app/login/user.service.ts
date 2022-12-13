import { User } from './user.model';

import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { UserToUpdate } from './userToUpdate.model';
import { SuccesComponent } from 'src/app/succes/succes.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class UsersService {
  private isAuthenticated = false;
  private isAdminAuthenticated = false;
  private userId: any;
  private userName: any;
  private userRole: any;
  private token: any;
  private tokenTimer: any;
  private users: User[] = [];
  private authStatusListener = new Subject<boolean>();
  private authAdminStatusListener = new Subject<boolean>();
  private userUpdated = new Subject<User[]>();

  constructor(
    private http: HttpClient,
    private router: Router,
    private _snackBar: MatSnackBar
  ) {}

  addUser(name: string, phonenum: string, password: string,
          email: string, category: string, speciality: string,
          location: string,role: string
          ) 
    {
    const user: User = {
      name: name,
      phonenum: phonenum,
      password: password,
      email: email,
      category: category,
      speciality: speciality,
      location: location,
      role: role,
      userId: '',
      createdAt: '',
      updatedAt: '',
    };
    this.http
      .post<{ message: string }>('http://localhost:4401/api/users/signup', user)
      .subscribe(
        () => {
          
          console.log('User Added !');
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
  getIsAuth() {
    return this.isAuthenticated;
  }
  getAdminIsAuth() {
    return this.isAdminAuthenticated;
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
      }>('http://localhost:4401/api/users/login', user)
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
            if (this.userRole == 'admin') {
              this.isAdminAuthenticated = true;
              this.authAdminStatusListener.next(true);
            }
            this.authStatusListener.next(true);
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
              this.userRole
            );
            const successMessage = 'User Added Successfuly !';
            this._snackBar.openFromComponent(SuccesComponent, {
              data: { message: successMessage },
              duration: 2500,
              panelClass: ['green-snackbar'],
            });
            this.router.navigate(['/Profile/' + this.userId]);
          }
        },
        (error) => {
          this.authStatusListener.next(false);
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
      this.userRole = authInformation.userRole;

      this.setAuthTimer(expiresIn / 1000);
      this.authStatusListener.next(true);
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
    this.authStatusListener.next(false);
    this.authAdminStatusListener.next(false);
    this.userId = null;
    this.userName = null;
    this.userRole = null;
    clearTimeout(this.tokenTimer);
    this.clearAuthData();
    console.log('Logout runs seccesfully!');
    this.router.navigate(['/']);
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
    userRole: string
  ) {
    localStorage.setItem('token', token);
    localStorage.setItem('expiration', expirationDate.toISOString());
    localStorage.setItem('userId', userId);
    localStorage.setItem('userName', userName);
    localStorage.setItem('userRole', userRole);
  }

  private clearAuthData() {
    localStorage.removeItem('token');
    localStorage.removeItem('expiration');
    localStorage.removeItem('userId');
    localStorage.removeItem('userName');
    localStorage.removeItem('userRole');
  }

  private getAuthData() {
    const token = localStorage.getItem('token');
    const expirationDate = localStorage.getItem('expiration');
    const userId = localStorage.getItem('userId');
    const userName = localStorage.getItem('userName');
    const userRole = localStorage.getItem('userRole');

    if (!token || !expirationDate) {
      return;
    }
    return {
      token: token,
      expirationDate: new Date(expirationDate),
      userId: userId,
      userName: userName,
      userRole: userRole,
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
      .patch<{ message: string }>(
        'http://localhost:4401/api/users/up/',
        userData
      )
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

  getusers() {
    this.http
      .get<{ message: string; users: any }>(
        'http://localhost:4401/api/users/data'
      )
      .pipe(
        map((usertData) => {
          return usertData.users.map(
            (user: {
              _id: any;
              name: any;
              category: any;
              speciality: any;
              createdAt: any;
              updatedAt: any;
            }) => {
              return {
                userId: user._id,
                name: user.name,
                category: user.category,
                speciality: user.speciality,
                createdAt: user.createdAt,
                updatedAt: user.updatedAt,
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

}
