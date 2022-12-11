import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Group } from './group.model';

@Injectable({ providedIn: 'root' })
export class GroupService {




    constructor(
        private http: HttpClient,
        private router: Router,
      ) {}



      addGroup(
          groupName: string,
          groupCategory: string,
          groupSpeciality: string,
          groupTeacher: string,
          groupLessonHours: string,
          groupLessoncount: string,
          groupLessondate: string
          ) {
            
        const group: Group = {

          groupId: '',
          groupName: groupName,
          groupCategory: groupCategory,
          groupSpeciality: groupSpeciality,
          groupTeacher: groupTeacher,
          groupLessonHours: groupLessonHours,      
          groupLessoncount: groupLessoncount,      
          groupLessondate: groupLessondate,      
    
        };
        this.http
          .post<{ message: string }>('http://localhost:4401/api/groups/AddGroup', group)
          .subscribe(
            () => {
              console.log('Group Added !');
            },
            (error) => {
              console.log(error);
            }
          );
      }



}