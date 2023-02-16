import { UsersService } from './../../login/user.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, NgForm, Validators } from '@angular/forms';
import { AnnouncementService } from './announcement.service';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { User } from '../../login/user.model';
import { Clipboard } from '@angular/cdk/clipboard';
import { debounceTime } from 'rxjs/operators';
import { Subject, Subscription } from 'rxjs';

@Component({
  selector: 'app-announcement',
  templateUrl: './announcement.component.html',
  styleUrls: ['./announcement.component.css'],
})
export class AnnouncementComponent implements OnInit {
  groups = [
    'Category 1',
    'Category 2',
    'Category 3',
    'Category 4',
    'Category 5',
  ];
  selectedGroups: string[] = [];
  groupsFormControl = new FormControl(null, Validators.required);

  showFiller = false;
  private userId: any;
  private userRole: any;
  fontStyle = 'all';
  Announs: any;
  filter = '';
  filterToSend = '';
  AnnounSub: Subscription = new Subscription();
  userSub: Subscription = new Subscription();
  users: any;
  userlength = 0;
  announslength = 0;
  spinner = false;
  query = '';
  searchSubject = new Subject<string>();
  searchQuery = '';
  defaultName = '?name=';
  UserId: any;
  constructor(
    private AnnouncementService: AnnouncementService,
    private UserService: UsersService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private clipboard: Clipboard
  ) {}
  Show() {
    this.showFiller = !this.showFiller;
  }
  options = [
    { value: '', namevalue: 'all', iconvalue: 'density_small' },
    { value: 'admin', namevalue: 'Announce', iconvalue: 'campaign' },
    { value: 'student', namevalue: 'Teacher', iconvalue: 'wallet_travel' },
  ];
  ngOnInit(): void {
    this.UserId = this.UserService.getUserId();
    this.spinner = true;
    this.activatedRoute.queryParams
      .pipe(map(({ filter }) => filter || this.filter))
      .subscribe((filter) => (this.filter = filter));
    this.filterToSend = '?userRole=' + this.filter;

    this.AnnouncementService.getAnnouncs(this.filterToSend);
    this.AnnounSub =
      this.AnnouncementService.getAnnouncUpdateListener().subscribe(
        (Announs: []) => {
          this.Announs = Announs;
          this.announslength = Announs.length;
        }
      );

    this.searchSubject.pipe(debounceTime(500)).subscribe((query) => {
      this.AnnouncementService.getTeachers(this.defaultName + query);
      this.userSub =
        this.AnnouncementService.getTeacherUpdateListener().subscribe(
          (users: User[]) => {
            this.users = users;
            this.userlength = users.length;
          }
        );
    });
    this.spinner = false;
  }
  onChange(filter: string) {
    this.router.navigate([], { queryParams: { filter } });
    this.filterToSend = '?userRole=' + filter;
    this.AnnouncementService.getAnnouncs(this.filterToSend);
    this.AnnounSub =
      this.AnnouncementService.getAnnouncUpdateListener().subscribe(
        (Announs: []) => {
          this.Announs = Announs;
        }
      );
  }
  /*async*/ onAddAnnounc(form: NgForm) {
    /*
    if (form.invalid) {
      return;
    }
    this.userId = this.UserService.getUserId();
    this.userRole = this.UserService.getUserRole();
*/
    console.log(this.groupsFormControl.value);
    /* await this.AnnouncementService.addAnnounc(
      this.userId,
      this.userRole,
      form.value.content
    );

    this.AnnouncementService.getAnnouncs(this.filterToSend);
    this.AnnounSub =
      this.AnnouncementService.getAnnouncUpdateListener().subscribe(
        (Announs: []) => {
          this.Announs = Announs;
        }
      );*/
  }
  onDelete(announcId: string) {
    this.userId = this.UserService.getUserId();

    this.AnnouncementService.deleteAnnouncement(announcId, this.UserId)
      .then(() => {
        this.AnnouncementService.getAnnouncs(this.filterToSend);
        this.AnnounSub =
          this.AnnouncementService.getAnnouncUpdateListener().subscribe(
            (Announs: []) => {
              this.Announs = Announs;
            }
          );
      })
      .catch((error) => {
        console.log('An error occurred while Deleting the announcement', error);
        // handle the error here
      });
  }
  onUpdate(announc: any) {
    this.AnnouncementService.updateAnnouncement(
      announc.id,
      this.UserId,
      announc.content
    )
      .then(() => {
        this.AnnouncementService.getAnnouncs(this.filterToSend);
        this.AnnounSub =
          this.AnnouncementService.getAnnouncUpdateListener().subscribe(
            (Announs: []) => {
              this.Announs = Announs;
            }
          );
      })
      .catch((error) => {
        console.log('An error occurred while updating the announcement', error);
        // handle the error here
      });
  }
  onCopy(emailvalue: string) {
    this.clipboard.copy(emailvalue);
  }
}
