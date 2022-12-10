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
  hide = true;
  checked = false;
  disabled = false;
  constructor(private UsersService: UsersService) { }

  ngOnInit(): void {
  }
  onLogin(form : NgForm){
    if (form.invalid){
      return;
    }
    this.UsersService.login(form.value.email, form.value.password);
  }
}
