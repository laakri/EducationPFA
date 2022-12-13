import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { GroupeComponent } from './groupe/groupe.component';
import { CatGroupsComponent } from './groupe/category-group/category-group.component';
import { AddGroupComponent } from './groupe/add-group/add-group.component';
import { AddUserComponent } from './groupe/add-user/add-user.component';
import { AboutPageComponent } from './home-page/about-page/about-page.component';
import { HomeViewComponent } from './home-page/home-view/home-view.component';
import { ProfileComponent } from './profile/profile.component';
import { AnnouncementComponent } from './announcement/announcement.component';
import { ContactPageComponent } from './home-page/contact-page/contact-page.component';
import { SpecialityGroupComponent } from './groupe/speciality-group/speciality-group.component';
import { ViewGroupComponent } from './groupe/view-group/view-group.component';
import { AuthGuard } from './login/user.guard';


const routes: Routes = [

  { path: '', component: HomePageComponent },

  
  {path: 'Homepage',
  component: HomePageComponent,
  children:[
   { path: '', redirectTo: '/Homepage/View', pathMatch: 'full' },
   {path:'View',component: HomeViewComponent},
   {path:'AboutUs',component: AboutPageComponent},
   {path:'ContactUs',component: ContactPageComponent},
  ]
},

{ path: 'Profile/:userId', component: ProfileComponent },
{ path: 'Announcement', component: AnnouncementComponent },




  {path: 'Group',
  component: GroupeComponent,
  children:[
   { path: '', redirectTo: '/Group/View', pathMatch: 'full' },
   {path:'View', component: ViewGroupComponent },
   {path:'CatGroup', component: CatGroupsComponent },
   {path:'SpecialGroup', component: SpecialityGroupComponent },
   {path:'AddGroup',component: AddGroupComponent},
   {path:'AddUser',component: AddUserComponent}
  ]
},



];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard],
})
export class AppRoutingModule { }
