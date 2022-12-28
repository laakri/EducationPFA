import { Injectable } from '@angular/core';
import { Categ } from './category.model';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SuccesComponent } from './../succes/succes.component';
import { map } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { User } from '../login/user.model';
import { environment } from '@envi/environment';
@Injectable({ providedIn: 'root' })
export class CategoryService {
  private categs: [] = [];
  private categUpdate = new Subject<[]>();
  apiURL = environment.apiURL;

  constructor(
    private http: HttpClient,
    private router: Router,
    private _snackBar: MatSnackBar
  ) {}

  /***************************************************** */
  addCateg(categName: string) {
    const resultData: Categ = {
      categName: categName,
      id: '',
      createdAt: '',
      updatedAt: '',
    };

    this.http
      .post<{ message: string; result: Categ }>(
        this.apiURL + '/api/categs/Add/',
        resultData
      )
      .subscribe((responseData) => {
        console.log('Category added successfully');
        const successMessage = 'Category Added Successfuly !';
        this._snackBar.openFromComponent(SuccesComponent, {
          data: { message: successMessage },
          duration: 2500,
          panelClass: ['green-snackbar'],
        });
      });
  }

  /***************************************************** */
  getCategs() {
    this.http
      .get<{ message: string; result: any }>(this.apiURL + '/api/categs/GetAll')
      .pipe(
        map((categData) => {
          return categData.result.map(
            (categ: {
              _id: any;
              categName: any;
              createdAt: any;
              updatedAt: any;
            }) => {
              return {
                id: categ._id,
                categName: categ.categName,
                createdAt: new Date(categ.createdAt)
                  .toUTCString()
                  .split(' ')
                  .slice(0, 4)
                  .join(' '),
                updatedAt: new Date(categ.updatedAt)
                  .toUTCString()
                  .split(' ')
                  .slice(0, 4)
                  .join(' '),
              };
            }
          );
        })
      )
      .subscribe((transformedCateg) => {
        this.categs = transformedCateg;
        this.categUpdate.next([...this.categs]);
      });
  }
  getCategUpdateListener() {
    return this.categUpdate.asObservable();
  }
}
