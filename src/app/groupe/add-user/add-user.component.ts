import { Component, OnInit } from '@angular/core';
import { FormControl, NgForm, Validators} from '@angular/forms';
import { UsersService } from '../../login/user.service';

interface Speciality {
  value: string;
  viewValue: string;
}
interface Category {
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
    {value: 'Math', viewValue: 'Math'},
    {value: 'Informmatique', viewValue: 'Informmatique'},
    {value: 'Physique', viewValue: 'Physique'},
  ];

  Categorys: Category[] = [
    {value: 'MDW', viewValue: 'MDW'},
    {value: 'Programation', viewValue: 'Programation'},
    {value: 'Construction', viewValue: 'Construction'},
  ];

  selectFormControl = new FormControl('', Validators.required);

  constructor(public UsersService: UsersService) { }

  ngOnInit(): void {
  }

  onSubmit(form: NgForm) {
    if (form.invalid) {
      return;
    }
    this.UsersService.addUser(
      form.value.name,
      form.value.phonenum,
      form.value.phonenum,
      form.value.email,
      form.value.category,
      form.value.spec,
      form.value.location,
    );
    console.log(
      form.value
      )
  }
}
