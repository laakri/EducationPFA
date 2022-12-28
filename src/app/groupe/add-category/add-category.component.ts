import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import {CategoryService} from '../category.service'



@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css']
})
export class AddCategoryComponent implements OnInit {

  constructor(
    private CategoryService:CategoryService

  ) { }

  ngOnInit(): void {
  }

  onSubmit(form : NgForm){
    if (form.invalid) {
      return;
    }
    this.CategoryService.addCateg(
      form.value.categoryName,
    );
    
  }
}
