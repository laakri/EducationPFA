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
  showFiller = false;
  private userId: any;
  private userRole: any;
  fontStyle = 'all';
  Announs: any;
  GroupCodes: any;
  filter = '';
  filterToSend = '';
  AnnounSub: Subscription = new Subscription();
  GroupCodesByTeacherSub: Subscription = new Subscription();
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
  UserRole: any;
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

    /**************************************** */
    this.AnnouncementService.getAnnouncs(this.filterToSend);
    this.GroupCodesByTeacherSub =
      this.AnnouncementService.getGroupCodeUpdateListener().subscribe(
        (GroupCodes: []) => {
          this.GroupCodes = GroupCodes;
          console.log(this.GroupCodes);
        }
      );

    /**************************************** */

    this.activatedRoute.queryParams
      .pipe(map(({ filter }) => filter || this.filter))
      .subscribe((filter) => (this.filter = filter));
    this.filterToSend = '?userRole=' + this.filter;

    /**************************************** */

    this.AnnouncementService.getGroupCodesByTeacher('63ee428ad3c6a248bb1ae14e');
    this.AnnounSub =
      this.AnnouncementService.getAnnouncUpdateListener().subscribe(
        (Announs: []) => {
          this.Announs = Announs;
          this.announslength = Announs.length;
        }
      );

    /**************************************** */

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
  async onAddAnnounc(form: NgForm) {
    if (form.invalid) {
      return;
    }

    const userId = this.UserService.getUserId();
    const userRole = this.UserService.getUserRole();
    const content = form.value.content;
    const groupIds = form.value.groupsControl;
    try {
      await this.AnnouncementService.addAnnounc(
        userId,
        userRole,
        content,
        groupIds
      );

      this.AnnouncementService.getAnnouncs(this.filterToSend);
      this.AnnounSub =
        this.AnnouncementService.getAnnouncUpdateListener().subscribe(
          (Announs: []) => {
            this.Announs = Announs;
            this.announslength = Announs.length;
          }
        );
    } catch (error) {
      console.error('Failed to add announcement', error);
    }
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
