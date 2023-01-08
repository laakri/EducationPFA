import { Component, OnInit } from '@angular/core';
import { FormControl, NgForm, Validators, FormGroup } from '@angular/forms';
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
  styleUrls: ['./add-user.component.css'],
})
export class AddUserComponent implements OnInit {
  Specialitys: Speciality[] = [
    { value: 'Math', viewValue: 'Math' },
    { value: 'Informmatique', viewValue: 'Informmatique' },
    { value: 'Physique', viewValue: 'Physique' },
  ];

  Categorys: Category[] = [
    { value: 'MDW', viewValue: 'MDW' },
    { value: 'Programation', viewValue: 'Programation' },
    { value: 'Construction', viewValue: 'Construction' },
  ];

  selectFormControl = new FormControl('', Validators.required);

  formGroup!: FormGroup;
  ngForm!: NgForm;
  trueFile!: File;
  imagePreview!: string;
  imageName!: string;

  constructor(public UsersService: UsersService) {}

  ngOnInit(): void {}

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
      form.value.role
    );
    console.log(form.value);
  }

  onFilePicked(event: Event) {
    const file = ((event.target as HTMLInputElement).files as FileList)[0];
    if (this.formGroup !== undefined) {
      this.formGroup.patchValue({ filePath: file });
      this.formGroup.get('filePath') as any;
    }
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result as string;
    };
    reader.readAsDataURL(file);
    this.trueFile = file;
    this.imageName = file.name;
  }
}
