import { Component, OnInit } from '@angular/core';
import { FormControl, NgForm, Validators} from '@angular/forms';
import { GroupService } from './../group.service';

interface Speciality {
  value: string;
  viewValue: string;
}
interface Professeur {
  value: string;
  viewValue: string;
}
interface Lesson {
  value: string;
  viewValue: string;
}


@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {

  Specialitys: Speciality[] = [
    {value: '0', viewValue: 'Math'},
    {value: '1', viewValue: 'Informmatique'},
    {value: '2', viewValue: 'Physique'},
  ];

  Professeurs: Professeur[] = [
    {value: '0', viewValue: 'Hmed Bouaasba'},
    {value: '1', viewValue: 'Satour Nafkha'},
    {value: '2', viewValue: 'Nato Lemkhalet'},
  ];

  Lessons: Lesson[] = [
    {value: '0', viewValue: '1'},
    {value: '1', viewValue: '2'},
    {value: '2', viewValue: '3'},
    {value: '3', viewValue: '4'},
  ];


  selectFormControl = new FormControl('', Validators.required);

  constructor(public GroupService: GroupService) { }

  ngOnInit(): void {
  }

  onSubmit(form: NgForm) {
    if (form.invalid) {
      return;
    }
    /*this.GroupService.addGroup(
      form.value.groupName,
      form.value.groupSpeciality,
      form.value.groupTeacher,
      form.value.groupLessoncount,
      form.value.groupLessondate
    );*/
    console.log(
      form.value
      )
  }
}
