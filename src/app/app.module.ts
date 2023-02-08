import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HomePageComponent } from './home-page/home-page.component';
import { GroupeComponent } from './groupe/groupe.component';
import { SideNavComponent } from './side-nav/side-nav.component';
import { CatGroupsComponent } from './groupe/category-group/category-group.component';
import { SignUpComponent } from './login/sign-up/sign-up.component';
import { SignInComponent } from './login/sign-in/sign-in.component';
import { LoginComponent } from './login/login.component';
import { AddUserComponent } from './groupe/add-user/add-user.component';
import { HomeViewComponent } from './home-page/home-view/home-view.component';
import { ProfileComponent } from './profile/profile.component';
import { AnnouncementComponent } from './formation/announcement/announcement.component';
import { ContactPageComponent } from './home-page/contact-page/contact-page.component';
import { AboutPageComponent } from './home-page/about-page/about-page.component';
import { ViewGroupComponent } from './groupe/view-group/view-group.component';
import { ErrorComponent } from './error/error.component';
import { ErrorInterceptor } from './error-interceptor';
import { ViewGroupComponentColumnChart } from './groupe/view-group/column-chart/view-group.component';
import { AddCategoryComponent } from './groupe/add-category/add-category.component';
import { PostPageComponent } from './post-page/post-page.component';
import { CreatePostComponent } from './groupe/create-post/create-post.component';
import { GroupsListComponent } from './groups-list/groups-list.component';
import { GroupUsersComponent } from './groupe/group-users/group-users.component';
import { FooterComponent } from './home-page/footer/footer.component';
import { GroupMeetComponent } from './formation/group-meet/group-meet.component';
import { AddUserGroupComponent } from './groupe/add-user-group/add-user-group.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FormationComponent } from './formation/formation.component';
import { WaitingListComponent } from './groupe/waiting-list/waiting-list.component';

/* *******************MODELS******************** */

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatDialogModule } from '@angular/material/dialog';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatDividerModule } from '@angular/material/divider';
import { MatSidenavModule } from '@angular/material/sidenav';
import { A11yModule } from '@angular/cdk/a11y';
import { MatSortModule } from '@angular/material/sort';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatListModule } from '@angular/material/list';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatChipsModule } from '@angular/material/chips';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { ClipboardModule } from '@angular/cdk/clipboard';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatStepperModule } from '@angular/material/stepper';
import { MatSliderModule } from '@angular/material/slider';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSelectModule } from '@angular/material/select';
import { MatTabsModule } from '@angular/material/tabs';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { NgApexchartsModule } from 'ng-apexcharts';
import { MatRadioModule } from '@angular/material/radio';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { AcceptUserComponent } from './groupe/waiting-list/accept-user/accept-user.component';
import { DeleteConfirmationComponent } from './delete-confirmation/delete-confirmation.component';
/* ********************************************* */

@NgModule({
  declarations: [
    AppComponent,
    SideNavComponent,
    HomePageComponent,
    GroupeComponent,
    CatGroupsComponent,
    SignUpComponent,
    SignInComponent,
    LoginComponent,
    AddUserComponent,
    AboutPageComponent,
    HomeViewComponent,
    ProfileComponent,
    AnnouncementComponent,
    ContactPageComponent,
    ViewGroupComponent,
    ViewGroupComponentColumnChart,
    AddCategoryComponent,
    PostPageComponent,
    CreatePostComponent,
    GroupsListComponent,
    GroupUsersComponent,
    AddUserGroupComponent,
    FooterComponent,
    GroupMeetComponent,
    NavbarComponent,
    FormationComponent,
    WaitingListComponent,
    AcceptUserComponent,
    DeleteConfirmationComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MatToolbarModule,
    MatCardModule,
    MatButtonModule,
    MatMenuModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    FormsModule,
    ReactiveFormsModule,
    MatProgressSpinnerModule,
    MatSlideToggleModule,
    MatDialogModule,
    MatExpansionModule,
    MatTableModule,
    MatPaginatorModule,
    MatDividerModule,
    MatSidenavModule,
    A11yModule,
    MatSortModule,
    MatSnackBarModule,
    MatListModule,
    MatAutocompleteModule,
    BrowserAnimationsModule,
    MatChipsModule,
    /* SlickCarouselModule,*/
    ClipboardModule,
    MatTooltipModule,
    MatStepperModule,
    MatSelectModule,
    RouterModule.forRoot([]),
    MatSliderModule,
    MatCheckboxModule,
    MatTabsModule,
    MatButtonToggleModule,
    NgApexchartsModule,
    MatRadioModule,
    MatProgressBarModule,
    SlickCarouselModule,
    MatDatepickerModule,
    MatNativeDateModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
  entryComponents: [ErrorComponent],
})
export class AppModule {}
