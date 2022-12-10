import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  isLogin = true;
  constructor(private router:Router) { }

  ngOnInit(): void {
  }

  Sign( variable :String ): void{

    if ( variable == 'login'){
      this.isLogin= true;
    }
    else{
      this.isLogin=false
    
    }

  }
}
