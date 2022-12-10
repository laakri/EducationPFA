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
@Component({
  selector: 'app-add-group',
  templateUrl: './add-group.component.html',
  styleUrls: ['./add-group.component.css']
})
export class AddGroupComponent implements OnInit {
  selected = 1;

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



  selectFormControl = new FormControl('', Validators.required);

  constructor(public GroupService: GroupService) { }

  ngOnInit(): void {


  }
  someMethod()
  {
    console.log("ddd");
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



