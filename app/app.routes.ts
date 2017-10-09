import {
    AboutComponent,
    AccountProfileComponent,
    AmenitiesComponent,
    AnnouncementsComponent,
    BoardComponent,
    ChangeEmailComponent,
    ChangePasswordComponent,
    ContactUsComponent,
    DiscussionComponent,
    EventsCalendarComponent,
    FeaturesComponent,
    FeesComponent,
    ForgotPasswordComponent,
    ForsaleComponent,
    GeneralInformationComponent,
    HomeComponent,
    DriveViewerComponent,
    PdfViewerComponent,
    PicturesComponent,
    ResetPasswordComponent,
    ResidentSearchComponent,
    ServicesComponent,
    SigninComponent,
    SignoutComponent,
    SignupComponent,
    UnderConstructionComponent,
} from "./index";
import { RouterModule, Routes } from "@angular/router";

import { AuthGuard } from "./shared/auth.guard";

const APP_ROUTES: Routes = [

    { path: "", redirectTo: "/home", pathMatch: "full" },
    { path: "home",  component: HomeComponent },
    { path: "about",  component: AboutComponent },
    { path: "board",  component: BoardComponent, canActivate: [AuthGuard] },
    { path: "features", component: FeaturesComponent },
    { path: "amenities", component: AmenitiesComponent },
    { path: "forsale", component: ForsaleComponent },
    { path: "fees", component: FeesComponent },
    { path: "announcements/driveViewer/:id",component: DriveViewerComponent, canActivate: [AuthGuard] },
    { path: "announcements/pdfViewer/:id",component: PdfViewerComponent, canActivate: [AuthGuard] },
    { path: "announcements",  component: AnnouncementsComponent, canActivate: [AuthGuard] },
    { path: "pictures",  component: PicturesComponent, canActivate: [AuthGuard] },
    { path: "services",  component: ServicesComponent },
    { path: "contactus", component: ContactUsComponent },
    { path: "signup", component: SignupComponent },
    { path: "signin",  component: SigninComponent },
    { path: "signout",  component: SignoutComponent },
    { path: "eventsCalendar",  component: EventsCalendarComponent, canActivate: [AuthGuard] },
    { path: "underConstruction", component: UnderConstructionComponent },
    { path: "resetPassword", component: ResetPasswordComponent },
    { path: "forgotPassword",  component: ForgotPasswordComponent },
    { path: "accountProfile", component: AccountProfileComponent, canActivate: [AuthGuard] },
    { path: "changeEmail", component: ChangeEmailComponent, canActivate: [AuthGuard] },
    { path: "changePassword", component: ChangePasswordComponent, canActivate: [AuthGuard] },
    { path: "discussion",component: DiscussionComponent, canActivate: [AuthGuard] },
    { path: "residentSearch",component: ResidentSearchComponent, canActivate: [AuthGuard] },
    { path: "generalInformation",component: GeneralInformationComponent, canActivate: [AuthGuard] },
    { path: "pdfViewer/:id",component: PdfViewerComponent, canActivate: [AuthGuard] },
    { path: "driveViewer/:id",component: DriveViewerComponent, canActivate: [AuthGuard] }
   


];

export const routing = RouterModule.forRoot(APP_ROUTES);

// tslint:disable-next-line:max-line-length
export const routedComponents = [AboutComponent, AnnouncementsComponent, AmenitiesComponent, BoardComponent, ContactUsComponent, EventsCalendarComponent, FeesComponent,
                                 FeaturesComponent,ForsaleComponent, HomeComponent, PicturesComponent, ServicesComponent, SigninComponent, SignoutComponent, SignupComponent, UnderConstructionComponent,
                                 // tslint:disable-next-line:max-line-length
                                 ResetPasswordComponent, ForgotPasswordComponent, AccountProfileComponent, ChangeEmailComponent, ChangePasswordComponent, DiscussionComponent,
                                 GeneralInformationComponent, ResidentSearchComponent, PdfViewerComponent, DriveViewerComponent];

