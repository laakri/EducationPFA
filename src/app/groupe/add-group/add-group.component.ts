import { Component, OnInit } from '@angular/core';
import { FormControl, NgForm, Validators} from '@angular/forms';
import { GroupService } from './../group.service';
import { AnnouncementService } from '../../announcement/announcement.service'
import {User} from '../../login/user.model'
import { Subscription } from 'rxjs';

interface Speciality {
  value: string;
  viewValue: string;
}
interface Category {
  value: string;
  viewValue: string;
}
interface Professeur {
  value: string;
  viewValue: string;
}
@Component({
  selector: 'app-add-group',
  templateUrl: './add-group.component.html',
  styleUrls: ['./add-group.component.css']
})
export class AddGroupComponent implements OnInit {
  selected = 1;

  Specialitys: Speciality[] = [
    {value: 'Math', viewValue: 'Math'},
    {value: 'Informmatique', viewValue: 'Informmatique'},
    {value: 'Physique', viewValue: 'Physique'},
  ];

  Categorys: Category[] = [
    {value: 'MDW', viewValue: 'MDW'},
    {value: 'Programation', viewValue: 'Programation'},
    {value: 'Construction', viewValue: 'Construction'},
  ];

 

  daycountvar:any;
  count = 2;
  selectFormControl = new FormControl('', Validators.required);
  lessonDate ="";
  userSub: Subscription = new Subscription();
  users: any;



  constructor(public GroupService: GroupService,
    private AnnouncementService : AnnouncementService,
    ) { }

  ngOnInit(): void {

    this.AnnouncementService.getTeachers();
    this.userSub = this.AnnouncementService
    .getUserUpdateListener().subscribe(
      (users: User[]) => {
        this.users = users;

      }
    );

  }
  someMethod()
  {
    console.log("ddd");
  }


  daycount(count: any) {
    this.count = +count.value;
    this.daycountvar = Array(this.count).fill(0).map((x,i)=>i);
  }
  
  onSubmit(form: NgForm) {
    if (form.invalid) {
      return;
    }
    this.GroupService.addGroup(
      form.value.groupName,
      form.value.groupCategory,
      form.value.groupSpeciality,
      form.value.groupTeacher,
      form.value.groupLessonHours,
      form.value.groupLessoncount,
      this.lessonDate
    );
    console.log(
      form.value
      )
  }

  onAddDate(form:NgForm){
    if (form.invalid) {
      return;
    }
    this.lessonDate =this.lessonDate + form.value.day +" "+ form.value.groupLessondate+";";
    console.log(this.lessonDate)
  }

}



