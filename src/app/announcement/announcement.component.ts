import { Component, OnInit } from '@angular/core';
import {  NgForm } from '@angular/forms';
import { AnnouncementService } from './announcement.service'
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { reverse } from 'dns';
import {User} from '../login/user.model'
import {Clipboard} from '@angular/cdk/clipboard';

@Component({
  selector: 'app-announcement',
  templateUrl: './announcement.component.html',
  styleUrls: ['./announcement.component.css']
})
export class AnnouncementComponent implements OnInit {
  showFiller = false;
  private userId : any;
  private userRole : any;
  fontStyle= "all";
  Announs: any;
  filter = '';
  filterToSend = '';
  AnnounSub: Subscription = new Subscription();
  userSub: Subscription = new Subscription();
  users: any;
  
  constructor(
    private AnnouncementService : AnnouncementService,
     private activatedRoute: ActivatedRoute,
    private router: Router,
    private clipboard: Clipboard
    ) { }
  Show(){
    this.showFiller=!this.showFiller
  }
  options = [
    { value: '', namevalue: 'all', iconvalue: 'density_small' },
    { value: 'admin', namevalue: 'Announce', iconvalue: 'campaign' },
    { value: 'student', namevalue: 'Teacher', iconvalue: 'wallet_travel' },
  ];
  ngOnInit(): void {
    this.activatedRoute.queryParams
    .pipe(map(({ filter }) => filter || this.filter))
    .subscribe((filter) => (this.filter = filter));
    this.filterToSend = '?userRole=' + this.filter;

    this.AnnouncementService.getAnnouncs(this.filterToSend);
    this.AnnounSub = this.AnnouncementService.getAnnouncUpdateListener()
    .subscribe((Announs: []) => {
    this.Announs = Announs.reverse();

    this.AnnouncementService.getTeachers();
    this.userSub = this.AnnouncementService
    .getUserUpdateListener().subscribe(
      (users: User[]) => {
        this.users = users;
        console.log(this.users);

      }
    );
    
  });
  
  }
  onChange(filter: string) {
    console.log(filter)
    this.router.navigate([], { queryParams: { filter } });
    this.filterToSend = '?userRole=' + filter;
    this.AnnouncementService.getAnnouncs(this.filterToSend);
    this.AnnounSub = this.AnnouncementService.getAnnouncUpdateListener().subscribe((Announs: []) => {
    this.Announs = Announs;
    });
  }

  onAddAnnounc(form: NgForm){
    if (form.invalid){
      return;
    }
    this.userId = localStorage.getItem('userId');
    this.userRole = localStorage.getItem('userRole');
    this.AnnouncementService.addAnnounc(this.userId,this.userRole,form.value.content);


    this.AnnouncementService.getAnnouncs(this.filterToSend);
    this.AnnounSub = this.AnnouncementService.getAnnouncUpdateListener()
    .subscribe((Announs: []) => {
    this.Announs = Announs;
  });

  }

onCopy(emailvalue :string){
this.clipboard.copy(emailvalue);
}

}
