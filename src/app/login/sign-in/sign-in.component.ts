import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UsersService } from './../user.service';
import {ThemePalette} from '@angular/material/core';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {
  private userId: any;
  hide = true;
  constructor(private UsersService: UsersService) { }

  ngOnInit(): void {
  }
  onLogin(form : NgForm){
    if (form.invalid){
      return;
    }
    this.userId = localStorage.getItem('userId');
    this.UsersService.login(form.value.phonenum, form.value.password);
  }
}
