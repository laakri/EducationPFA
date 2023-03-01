import { ContactusService } from './contactus.service';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-contact-page',
  templateUrl: './contact-page.component.html',
  styleUrls: ['./contact-page.component.css'],
})
export class ContactPageComponent implements OnInit {
  constructor(private ContactusService: ContactusService) {}

  ngOnInit(): void {}
  onSignup(form: NgForm) {
    if (form.invalid) {
      return;
    }
    this.ContactusService.sendMail(
      form.value.name,
      form.value.email,
      form.value.textA
    );
  }
}
