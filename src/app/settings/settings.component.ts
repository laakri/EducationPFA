import { Component, OnInit } from '@angular/core';
import { FormControl, NgForm, Validators, FormGroup } from '@angular/forms';
import { UsersService } from '../login/user.service';
import { CategoryService } from '../groupe/category.service';
import { Subscription } from 'rxjs';
import { Categ } from '../groupe/category.model';
@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css'],
})
export class SettingsComponent implements OnInit {
  selectFormControl = new FormControl('', Validators.required);

  categSub: Subscription = new Subscription();
  categs: any;
  categlength = 0;

  formGroup!: FormGroup;
  ngForm!: NgForm;
  trueFile!: File;
  imagePreview!: string;
  imageName!: string;
  getUserId: any;

  constructor(
    public UsersService: UsersService,
    private CategoryService: CategoryService
  ) {}

  ngOnInit(): void {
    this.getUserId = this.UsersService.getUserId();
    this.CategoryService.getCategs();
    this.categSub = this.CategoryService.getCategUpdateListener().subscribe(
      (categs: Categ[]) => {
        this.categs = categs;
        this.categlength = categs.length;
      }
    );
  }
  onSubmit(form: NgForm) {
    if (form.invalid) {
      return;
    }
    this.UsersService.editUser(
      this.getUserId,
      form.value.name,
      form.value.phonenum,
      this.trueFile,
      form.value.phonenum,
      form.value.email,
      form.value.category,
      form.value.location
    );
    console.log(form.value, this.trueFile);
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
