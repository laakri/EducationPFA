import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { GroupeComponent } from './groupe/groupe.component';
import { CatGroupsComponent } from './groupe/category-group/category-group.component';
import { AddUserComponent } from './groupe/add-user/add-user.component';
import { AboutPageComponent } from './home-page/about-page/about-page.component';
import { HomeViewComponent } from './home-page/home-view/home-view.component';
import { ProfileComponent } from './profile/profile.component';
import { AnnouncementComponent } from './formation/announcement/announcement.component';
import { ContactPageComponent } from './home-page/contact-page/contact-page.component';
import { ViewGroupComponent } from './groupe/view-group/view-group.component';
import { AuthGuard } from './login/user.guard';
import { PostPageComponent } from './post-page/post-page.component';
import { CreatePostComponent } from './groupe/create-post/create-post.component';
import { GroupsListComponent } from './groups-list/groups-list.component';
import { GroupUsersComponent } from './groupe/group-users/group-users.component';
import { GroupMeetComponent } from './formation/group-meet/group-meet.component';
import { FormationComponent } from './formation/formation.component';
import { WaitingListComponent } from './groupe/waiting-list/waiting-list.component';
import { SettingsComponent } from './settings/settings.component';

const routes: Routes = [
  { path: '', redirectTo: '/Homepage/View', pathMatch: 'full' },

  {
    path: 'Homepage',
    component: HomePageComponent,
    children: [
      { path: '', redirectTo: '/Homepage/View', pathMatch: 'full' },
      { path: 'View', component: HomeViewComponent },
      { path: 'AboutUs', component: AboutPageComponent },
      { path: 'ContactUs', component: ContactPageComponent },
      { path: 'PostPage/:groupId', component: PostPageComponent },
      { path: 'GroupsList', component: GroupsListComponent },
      { path: 'Profile/:userId', component: ProfileComponent },
      { path: 'Settings', component: SettingsComponent },
    ],
  },
  {
    path: 'Formation',
    component: FormationComponent,

    children: [
      { path: '', redirectTo: '/Formation/Announcement', pathMatch: 'full' },
      { path: 'Announcement', component: AnnouncementComponent },
      { path: 'Meeting', component: GroupMeetComponent },
    ],
  },
  {
    path: 'Group',
    component: GroupeComponent,
    children: [
      { path: '', redirectTo: '/Group/View', pathMatch: 'full' },
      { path: 'View', component: ViewGroupComponent },
      { path: 'CatGroup/:groupName', component: CatGroupsComponent },
      { path: 'AddUser', component: AddUserComponent },
      { path: 'CreatePost', component: CreatePostComponent },
      { path: 'GroupUsers/:groupId', component: GroupUsersComponent },
      { path: 'WaitingList', component: WaitingListComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard],
})
export class AppRoutingModule {}
