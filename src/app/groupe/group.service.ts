import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Group, GroupUsers } from './group.model';
import { SuccesComponent } from './../succes/succes.component';
import { environment } from '@envi/environment';
import { MatSnackBar } from '@angular/material/snack-bar';
import { map } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class GroupService {
  apiURL = environment.apiURL;
  private groups: [] = [];
  private group: [] = [];
  private groupUsers: GroupUsers | null = null;
  private groupUpdate = new Subject<[]>();
  private onegroupUpdate = new Subject<[]>();
  private groupUsersUpdate = new Subject<GroupUsers>();

  constructor(
    private http: HttpClient,
    private router: Router,
    private _snackBar: MatSnackBar
  ) {}

  addGroup(
    groupObject: string,
    groupCategory: string,
    teacherId: string,
    groupDescription: string,

    groupFilePath: File,

    groupPrice: string,
    groupLevel: string,
    groupStartDate: string,
    groupPeriode: string,
    groupHourPerWeek: string,

    groupExperienseNeed: string,
    groupExperienseGain: string,
    groupFuturesGain: string,

    groupDetails: string
  ) {
    const resultData = new FormData();
    resultData.append('groupObject', groupObject);
    resultData.append('groupCategory', groupCategory);
    resultData.append('teacherId', teacherId);
    resultData.append('groupDescription', groupDescription);

    resultData.append('file', groupFilePath);

    resultData.append('groupPrice', groupPrice);
    resultData.append('groupLevel', groupLevel);
    resultData.append('groupStartDate', groupStartDate);
    resultData.append('groupPeriode', groupPeriode);
    resultData.append('groupHourPerWeek', groupHourPerWeek);

    resultData.append('groupExperienseNeed', groupExperienseNeed);
    resultData.append('groupExperienseGain', groupExperienseGain);
    resultData.append('groupFuturesGain', groupFuturesGain);
    resultData.append('groupDetails', groupDetails);
    console.log(resultData);
    this.http
      .post<{ message: string }>(
        this.apiURL + '/api/groups/AddGroup',
        resultData
      )
      .subscribe(
        () => {
          console.log('Group Added !');
          const successMessage = 'Category Added Successfuly !';
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
  /***********************************************************/
  getGroups(groupCategory: string) {
    this.http
      .get<{ message: string; result: any }>(
        this.apiURL + '/api/groups/GetAll/' + groupCategory
      )
      .pipe(
        map((groupData) => {
          return groupData.result.map(
            (group: {
              _id: any;
              teacherId: any;
              groupLevel: any;
              groupStartDate: any;
              groupPeriode: any;
              groupPrice: any;
              createdAt: any;
              updatedAt: any;
            }) => {
              return {
                id: group._id,
                teacherId: group.teacherId,
                groupLevel: group.groupLevel,
                groupPeriode: group.groupPeriode,
                groupPrice: group.groupPrice,

                groupStartDate: new Date(group.groupStartDate)
                  .toUTCString()
                  .split(' ')
                  .slice(0, 4)
                  .join(' '),
                createdAt: new Date(group.createdAt)
                  .toUTCString()
                  .split(' ')
                  .slice(0, 4)
                  .join(' '),
                updatedAt: new Date(group.updatedAt)
                  .toUTCString()
                  .split(' ')
                  .slice(0, 4)
                  .join(' '),
              };
            }
          );
        })
      )
      .subscribe((transformedGroup) => {
        this.groups = transformedGroup;
        this.groupUpdate.next([...this.groups]);
      });
  }
  getGroupUpdateListener() {
    return this.groupUpdate.asObservable();
  }
  /***********************************************************/
  getGroupFiltred(filter: string) {
    this.http
      .get<{ message: string; result: any }>(
        this.apiURL + '/api/groups/GetAllFiltred/' + filter
      )
      .pipe(
        map((groupData) => {
          return groupData.result.map(
            (group: {
              _id: any;
              groupObject: any;
              groupFilePath: any;
              groupDescription: any;
              groupLevel: any;
              groupPeriode: any;
              groupPrice: any;
              groupStartDate: any;
            }) => {
              return {
                id: group._id,
                groupObject: group.groupObject,
                groupFilePath: group.groupFilePath,
                groupDescription: group.groupDescription,
                groupLevel: group.groupLevel,
                groupPeriode: group.groupPeriode,
                groupPrice: group.groupPrice,

                groupStartDate: new Date(group.groupStartDate)
                  .toUTCString()
                  .split(' ')
                  .slice(0, 4)
                  .join(' '),
              };
            }
          );
        })
      )
      .subscribe((transformedGroup) => {
        this.groups = transformedGroup;
        this.groupUpdate.next([...this.groups]);
      });
  }
  getGroupFiltredUpdateListener() {
    return this.groupUpdate.asObservable();
  }

  /***************************************** */
  getGroup(id: string) {
    this.http
      .get<{ message: string; result: any }>(
        this.apiURL + '/api/groups/GetOne/' + id
      )
      .pipe(
        map((groupData) => {
          return groupData.result.map((group: Group) => {
            return {
              ...group,
              groupStartDate: new Date(group.groupStartDate)
                .toUTCString()
                .split(' ')
                .slice(0, 5)
                .join(' '),
              createdAt: new Date(group.createdAt)
                .toUTCString()
                .split(' ')
                .slice(0, 4)
                .join(' '),
              updatedAt: new Date(group.updatedAt)
                .toUTCString()
                .split(' ')
                .slice(0, 4)
                .join(' '),
            };
          });
        })
      )
      .subscribe((transformedGroup) => {
        this.group = transformedGroup;
        this.onegroupUpdate.next([...this.group]);
      });
  }
  getOneGroupUpdateListener() {
    return this.onegroupUpdate.asObservable();
  }

  /**************************************** */
  getGroupUsers(id: string) {
    this.http
      .get<{ message: string; result: any }>(
        this.apiURL + '/api/groups/GetUsersByGroup/' + id
      )
      .pipe(
        map((groupData): { result: GroupUsers } => {
          return {
            result: {
              ...groupData.result,
              createdAt: new Date(groupData.result.createdAt)
                .toUTCString()
                .split(' ')
                .slice(0, 4)
                .join(' '),
              groupStartDate: new Date(groupData.result.groupStartDate)
                .toUTCString()
                .split(' ')
                .slice(0, 4)
                .join(' '),
            },
          };
        })
      )
      .subscribe((transformedGroup) => {
        this.groupUsers = transformedGroup.result;
        this.groupUsersUpdate.next(this.groupUsers);
      });
  }

  getGroupUsersUpdateListener() {
    return this.groupUpdate.asObservable();
  }

  getGroupUsersUpdateListenerTwo() {
    return this.groupUsersUpdate.asObservable();
  }
}
