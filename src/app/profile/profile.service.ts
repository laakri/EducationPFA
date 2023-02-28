import { User } from './../login/user.model';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from '@envi/environment';

@Injectable({ providedIn: 'root' })
export class ProfileService {
  private users: User[] = [];
  private userUpdated = new Subject<User[]>();
  apiURL = environment.apiURL;

  private groupTeacherId: any;
  private groupTeacherIdUpdated = new Subject<any>();

  constructor(private http: HttpClient, private router: Router) {}

  getusers(UserId: string) {
    this.http
      .get<{ message: string; users: any }>(
        this.apiURL + '/api/users/data/' + UserId
      )
      .pipe(
        map((usertData) => {
          return usertData.users.map(
            (user: {
              _id: any;
              name: any;
              email: any;
              imgPath: any;
              phonenum: any;
              category: any;
              speciality: any;
              location: any;
              verified: any;
              Paymentstatu: any;
              roles: any;
              groups: any;
              createdAt: any;
              updatedAt: any;
            }) => {
              return {
                userId: user._id,
                name: user.name,
                email: user.email,
                imgPath: user.imgPath,
                phonenum: user.phonenum,
                category: user.category,
                speciality: user.speciality,
                location: user.location,
                verified: user.verified,
                Paymentstatu: user.Paymentstatu,
                roles: user.roles,
                groups: user.groups,
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

  /***************************************** */

  getGroupsByTeacher(teacherId: string) {
    this.http
      .get<{ message: string; groups: any }>(
        this.apiURL + '/api/groups/GetGroupsById/' + teacherId
      )
      .pipe(
        map((responseData) => {
          return responseData.groups.map((group: any) => {
            return {
              _id: group._id,
              groupCode: group.groupCode,
              groupObject: group.groupObject,
              groupCategory: group.groupCategory,
              groupDescription: group.groupDescription,
              groupPrice: group.groupPrice,
              groupLevel: group.groupLevel,
              groupStartDate: group.groupStartDate,
              groupPeriode: group.groupPeriode,
              createdAt: group.createdAt,
            };
          });
        })
      )
      .subscribe((transformedGroupCodes) => {
        this.groupTeacherId = transformedGroupCodes;
        this.groupTeacherIdUpdated.next([...this.groupTeacherId]);
      });
  }

  getGroupsByTeacherIdUpdateListener() {
    return this.groupTeacherIdUpdated.asObservable();
  }
}
