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
          groupSpeciality: string,
          groupTeacher: string,
          groupLessoncount: string,
          groupLessondate: string) {
            
        const group: Group = {

          groupId: '',
          groupName: groupName,
          groupSpeciality: groupSpeciality,
          groupTeacher: groupTeacher,
          groupLessoncount: groupLessoncount,      
          groupLessondate: groupLessondate,      
    
        };
        this.http
          .post<{ message: string }>('http://localhost:4401/api/users/signup', group)
          .subscribe(
            () => {
              console.log('User Added !');
            },
            (error) => {
              console.log(error);
            }
          );
      }



}