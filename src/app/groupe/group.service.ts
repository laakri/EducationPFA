import { HttpClient, HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Group, GroupUsers } from './group.model';
import { Wuser } from './waitlist.model';
import { SuccesComponent } from './../succes/succes.component';
import { environment } from '@envi/environment';
import { MatSnackBar } from '@angular/material/snack-bar';
import { map } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class GroupService {
  apiURL = environment.apiURL;
  private groupUpdate = new Subject<[]>();
  private onegroupUpdate = new Subject<[]>();

  private groups: [] = [];
  private group: [] = [];
  private groupUsers: GroupUsers | null = null;
  private groupUsersUpdate = new Subject<GroupUsers>();

  private waitlist: [] = [];
  private waitlistUpdate = new Subject<[]>();
  private waitlists: Wuser | null = null;
  private waitlistsUpdate = new Subject<Wuser>();
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

  /**************** Stats ******************** */
  AddUserGroup(paramms: string) {
    const queryParams = new HttpParams({ fromString: paramms });

    this.http
      .post<{ message: string }>(
        this.apiURL + '/api/groups/AddUserGroup',
        {
          message: 'This is the body of the POST request',
        },
        {
          params: queryParams,
        }
      )
      .subscribe(
        () => {
          console.log('user <=> group Added !');
          const successMessage = 'User Added To group Successfully!';
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
  /******************** Waitlist *********************** */
  AddToWl(userId: string, groupId: string) {
    const resultData: Wuser = {
      userId: userId,
      groupId: groupId,
      createdAt: '',
      updatedAt: '',
    };

    this.http
      .post<{ message: string }>(this.apiURL + '/api/wuser/AddToWl', resultData)
      .subscribe(
        () => {
          const successMessage = "We'll respond via Gmail shortly ";
          this._snackBar.openFromComponent(SuccesComponent, {
            data: { message: successMessage },
            duration: 4500,
            panelClass: ['green-snackbar'],
          });
        },
        (error) => {
          console.log(error);
        }
      );
  }

  /**************************************** */
  getWaitlistUsers() {
    this.http
      .get<{ message: string; result: any }>(this.apiURL + '/api/wuser/GetAll/')
      .pipe(
        map((groupData): { result: Wuser } => {
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
        this.waitlists = transformedGroup.result;
        this.waitlistsUpdate.next(this.waitlists);
      });
  }

  getWaitListUpdateListener() {
    return this.waitlistUpdate.asObservable();
  }
}
