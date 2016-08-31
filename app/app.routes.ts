import {  Routes, RouterModule } from '@angular/router';
import { AuthGuard } from "./shared/auth.guard";

import {
    AboutComponent,
    AnnouncementsComponent,
    AmenitiesComponent,
    BoardComponent,
    ContactUsComponent,
    EventsCalendarComponent,
    FeesComponent,
    FeaturesComponent,
    ForsaleComponent,
    HomeComponent,
    PicturesComponent,
    ServicesComponent,
    SigninComponent,
    SignupComponent,
    UnderConstructionComponent,
    ResetPasswordComponent,
    ForgotPasswordComponent,
    AccountProfileComponent,
    ChangeEmailComponent,
    ChangePasswordComponent,
    DiscussionComponent,
    GeneralInformationComponent
} from "./index";

const APP_ROUTES: Routes = [
 
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: 'home',  component: HomeComponent },
    { path: 'about',  component: AboutComponent },
    { path: 'board',  component: BoardComponent, canActivate: [AuthGuard] },
    { path: 'features', component: FeaturesComponent },
    { path: 'amenities', component: AmenitiesComponent },
    { path: 'forsale', component: ForsaleComponent },
    { path: 'fees', component: FeesComponent },
    { path: 'announcements',  component: AnnouncementsComponent, canActivate: [AuthGuard] },
    { path: 'pictures',  component: PicturesComponent, canActivate: [AuthGuard] },
    { path: 'services',  component: ServicesComponent },
    { path: 'contactus', component: ContactUsComponent },
    { path: 'signup', component: SignupComponent },
    { path: 'signin',  component: SigninComponent },
    { path: 'eventsCalendar',  component: EventsCalendarComponent, canActivate: [AuthGuard] },
    { path: 'underConstruction', component: UnderConstructionComponent },
    { path: 'resetPassword', component: ResetPasswordComponent },
    { path: 'forgotPassword',  component: ForgotPasswordComponent },
    { path: 'accountProfile', component: AccountProfileComponent, canActivate: [AuthGuard] },
    { path: 'changeEmail', component: ChangeEmailComponent, canActivate: [AuthGuard] },
    { path: 'changePassword', component: ChangePasswordComponent, canActivate: [AuthGuard] },
    { path: 'discussion',component: DiscussionComponent, canActivate: [AuthGuard] },
    { path: 'generalInformation',component: GeneralInformationComponent, canActivate: [AuthGuard] }    
];

export const routing = RouterModule.forRoot(APP_ROUTES);

export const routedComponents = [AboutComponent, AnnouncementsComponent, AmenitiesComponent, BoardComponent, ContactUsComponent, EventsCalendarComponent, FeesComponent,
                                 FeaturesComponent,ForsaleComponent, HomeComponent, PicturesComponent, ServicesComponent, SigninComponent, SignupComponent, UnderConstructionComponent,
                                 ResetPasswordComponent, ForgotPasswordComponent, AccountProfileComponent, ChangeEmailComponent, ChangePasswordComponent, DiscussionComponent, 
                                 GeneralInformationComponent];

