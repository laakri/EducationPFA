import { BreakpointObserver } from '@angular/cdk/layout';
import { StepperOrientation } from '@angular/cdk/stepper';
import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { MatChipInputEvent } from '@angular/material/chips';
export interface categ {
  name: string;
}
import { GroupService } from '../group.service';

@Component({
  selector: 'app-create-gig',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css'],
})
export class CreatePostComponent implements OnInit {
  formGroup!: FormGroup;
  isLinear = false;
  filteredOptions!: Observable<categ[]>;
  myControl = new FormControl();
  value = 1;
  valuebase = 1;
  valuetrait = 1;
  valuevariation = 1;
  valuetype = 'Hour';
  Revisionsnumbre = '1';

  imagePreview!: string;
  imageName!: string;
  private userId: any;
  Alltime!: string;
  trueFile!: File;

  /********************************************************** */
  showError: boolean = true;
  selectedDate: any;
  checkDate(picker: any) {
    const today = new Date();
    this.selectedDate = picker._model.selection;

    if (this.selectedDate < today) {
      this.showError = false;
      console.log(this.showError);
    } else {
      this.showError = true;
      console.log(this.showError);
    }
  }
  /********************************************************** */

  keywords = ['angular'];
  chipControl = new FormControl([this.keywords]);
  ChipList = '';
  removeKeyword(keyword: string) {
    const index = this.keywords.indexOf(keyword);
    if (index >= 0) {
      this.keywords.splice(index, 1);
    }
  }

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add our keyword
    if (value) {
      this.keywords.push(value);
    }

    // Clear the input value
    event.chipInput!.clear();
  }
  /********************************************************** */

  stepperOrientation: Observable<StepperOrientation>;
  get formArray(): AbstractControl | null {
    return this.formGroup.get('formArray');
  }

  constructor(
    private _formBuilder: FormBuilder,
    breakpointObserver: BreakpointObserver,
    private GroupService: GroupService
  ) {
    this.stepperOrientation = breakpointObserver
      .observe('(min-width: 1000px)')
      .pipe(map(({ matches }) => (matches ? 'horizontal' : 'vertical')));
  }

  private _filter(name: string): categ[] {
    const filterValue = name.toLowerCase();

    return this.options.filter((option) =>
      option.name.toLowerCase().includes(filterValue)
    );
  }

  displayFn(user: categ): string {
    return user && user.name ? user.name : '';
  }

  ngOnInit(): void {
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map((value) => (typeof value === 'string' ? value : value.name)),
      map((name) => (name ? this._filter(name) : this.options.slice()))
    );

    this.formGroup = this._formBuilder.group({
      formArray: this._formBuilder.array([
        this._formBuilder.group({
          objectFormCtrl: ['', Validators.required],
          categoryFormCtrl: ['', Validators.required],
          teacherFormCtrl: ['', Validators.required],
          descriptionFormCtrl: ['', Validators.required],
          groupFilePathFormCtrl: ['', Validators.required],
        }),
        this._formBuilder.group({
          groupPriceFormCtrl: ['', Validators.required],
          groupLevelFormCtrl: ['', Validators.required],
          selectedDate: ['', Validators.required],

          groupPeriodeFormCtrl: ['', Validators.required],
          groupPeriodeTimeFormCtrl: ['', Validators.required],
          groupHourPerWeekFormCtrl: ['', Validators.required],

          groupExperienseNeedFormCtrl: ['', Validators.required],
          groupExperienseGainFormCtrl: ['', Validators.required],
          groupDetailsFormCtrl: ['', Validators.required],
        }),
      ]),
    });
  }

  addinfo(form: FormGroup) {
    if (form.invalid) {
      return;
    }
    this.ChipList = this.keywords.join(',');

    this.Alltime =
      form.value.formArray[1].groupPeriodeFormCtrl +
      ' ' +
      form.value.formArray[1].groupPeriodeTimeFormCtrl;

    this.GroupService.addGroup(
      form.value.formArray[0].objectFormCtrl,
      form.value.formArray[0].categoryFormCtrl.name,
      form.value.formArray[0].teacherFormCtrl.name,
      form.value.formArray[0].descriptionFormCtrl,

      this.trueFile,

      form.value.formArray[1].groupPriceFormCtrl,
      form.value.formArray[1].groupLevelFormCtrl,
      form.value.formArray[1].selectedDate,
      this.Alltime,

      form.value.formArray[1].groupHourPerWeekFormCtrl,
      form.value.formArray[1].groupExperienseNeedFormCtrl,
      form.value.formArray[1].groupExperienseGainFormCtrl,

      this.ChipList,

      form.value.formArray[1].groupDetailsFormCtrl
    );
  }
  onFilePicked(event: Event) {
    const file = ((event.target as HTMLInputElement).files as FileList)[0];
    this.formGroup.patchValue({ filePath: file });
    this.formGroup.get('filePath') as any;
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result as string;
    };
    reader.readAsDataURL(file);
    this.trueFile = file;
    this.imageName = file.name;
  }

  options: categ[] = [
    { name: 'Informatique' },
    { name: 'Math' },
    { name: 'Writing | Translation' },
  ];
}
