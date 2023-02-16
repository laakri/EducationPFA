import { Injectable } from '@angular/core';
import { Announc } from './announcement.model';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SuccesComponent } from '../../succes/succes.component';
import { map } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { User } from '../../login/user.model';
import { environment } from '@envi/environment';

@Injectable({ providedIn: 'root' })
export class AnnouncementService {
  private announcs: [] = [];
  private announcUpdate = new Subject<[]>();
  private users: User[] = [];
  private userUpdated = new Subject<User[]>();
  apiURL = environment.apiURL;
  constructor(
    private http: HttpClient,
    private router: Router,
    private _snackBar: MatSnackBar
  ) {}

  /***************************************************** */
  addAnnounc(
    userId: string,
    userRole: string,
    content: string,
    groupIds: string[]
  ): Promise<void> {
    return new Promise((resolve, reject) => {
      const resultData: Announc = {
        userId: userId,
        userRole: userRole,
        content: content,
        id: '',
        createdAt: '',
        updatedAt: '',
      };

      this.http
        .post<{ message: string; result: Announc }>(
          this.apiURL + '/api/announcs/Add/',
          { resultData, ArrayOfGroups: groupIds }
        )
        .subscribe(
          (responseData) => {
            console.log('Announc added successfully');
            const successMessage = 'Announc Added Successfuly !';
            this._snackBar.openFromComponent(SuccesComponent, {
              data: { message: successMessage },
              duration: 2500,
              panelClass: ['green-snackbar'],
            });
            resolve();
          },
          (error) => {
            reject(error);
          }
        );
    });
  }

  /***************************************************** */
  getAnnouncs(filter: string) {
    this.http
      .get<{ message: string; result: any }>(
        this.apiURL + '/api/announcs/GetAll' + filter
      )
      .pipe(
        map((announcData) => {
          return announcData.result.map(
            (announc: {
              _id: any;
              userId: any;
              userRole: any;
              content: any;
              createdAt: any;
              updatedAt: any;
            }) => {
              return {
                id: announc._id,
                userId: announc.userId,
                userRole: announc.userRole,
                content: announc.content,
                createdAt: new Date(announc.createdAt)
                  .toUTCString()
                  .split(' ')
                  .slice(0, 5)
                  .join(' '),
                updatedAt: new Date(announc.updatedAt),
              };
            }
          );
        })
      )
      .subscribe((transformedAnnounc) => {
        this.announcs = transformedAnnounc;
        this.announcUpdate.next([...this.announcs]);
      });
  }
  getAnnouncUpdateListener() {
    return this.announcUpdate.asObservable();
  }

  /*************************************************/
  getTeachers(filter: string) {
    this.http
      .get<{ message: string; users: any }>(
        this.apiURL + '/api/users/searchTeacher/' + filter
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

  getTeacherUpdateListener() {
    return this.userUpdated.asObservable();
  }

  /***************************************** */

  deleteAnnouncement(announcId: string, userId: string): Promise<void> {
    return new Promise((resolve, reject) => {
      this.http
        .delete(`${this.apiURL}/api/announcs/delete/`, {
          body: { announcId, userId },
        })
        .subscribe(
          (response) => {
            console.log('Announc deleted successfully');
            const successMessage = 'Announc deleted Successfuly !';
            this._snackBar.openFromComponent(SuccesComponent, {
              data: { message: successMessage },
              duration: 2500,
              panelClass: ['green-snackbar'],
            });
            resolve();
          },
          (error) => {
            console.log(
              'An error occurred while deleting the announcement',
              error
            );
            reject(error);
          }
        );
    });
  }

  /***************************************** */
  updateAnnouncement(
    announcId: string,
    userId: string,
    content: string
  ): Promise<void> {
    return new Promise((resolve, reject) => {
      this.http
        .patch(`${this.apiURL}/api/announcs/update/`, {
          announcId,
          userId,
          content,
        })
        .subscribe(
          (response) => {
            console.log('Announcement updated successfully');
            const successMessage = 'Announc updated Successfuly !';
            this._snackBar.openFromComponent(SuccesComponent, {
              data: { message: successMessage },
              duration: 2500,
              panelClass: ['green-snackbar'],
            });
            resolve();
          },
          (error) => {
            console.log(
              'An error occurred while updating the announcement',
              error
            );
            reject(error);
          }
        );
    });
  }
}
