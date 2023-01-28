import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { GroupService } from './../groupe/group.service';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-post-page',
  templateUrl: './post-page.component.html',
  styleUrls: ['./post-page.component.css'],
})
export class PostPageComponent implements OnInit {
  @ViewChild('here') here!: ElementRef;
  private routeSub: Subscription | undefined;
  goupId = '';
  Groups!: any;
  chips!: any;
  GroupSub: Subscription = new Subscription();
  userId: any;
  /*********************************************** */
  countdownDate!: Date;
  public days: number = 0;
  public hours: number = 0;
  public minutes: number = 0;
  public seconds: number = 0;
  /*********************************************** */
  constructor(
    private router: Router,
    public route: ActivatedRoute,
    private GroupService: GroupService
  ) {}

  /******************************************* */
  scrollToHere() {
    this.here.nativeElement.scrollIntoView({ behavior: 'smooth' });
  }
  ngOnInit() {
    this.routeSub = this.route.params.subscribe((params) => {
      this.goupId = params['groupId'];
    });
    this.GroupService.getGroup(this.goupId);

    this.GroupSub = this.GroupService.getOneGroupUpdateListener().subscribe(
      (Groups: []) => {
        this.Groups = Groups;
        this.chips = this.Groups[0].groupFuturesGain.split(',');
        this.countdownDate = new Date(this.Groups[0].groupStartDate);
      }
    );

    // Update the timer every second
    setInterval(() => {
      this.updateTimer();
    }, 1000);
  }

  public infoStruc() {
    this.userId = localStorage.getItem('userId');
    console.log(this.userId, this.goupId);
    this.GroupService.AddToWl(this.userId, this.goupId);
  }

  updateTimer(): void {
    // Get the current date and time
    const now = new Date().getTime();

    // Get the distance between now and the countdown date
    const distance = this.countdownDate.getTime() - now;

    // Calculate the days, hours, minutes, and seconds
    this.days = Math.floor(distance / (1000 * 60 * 60 * 24));
    this.hours = Math.floor(
      (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    this.minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    this.seconds = Math.floor((distance % (1000 * 60)) / 1000);
  }
}
