import { NgModule } from '@angular/core';

// import components in these module
// import { NavbarComponent } from '../../views/frontends/navbar/navbar.component';
// import { FooterComponent } from '../../views/frontends/footer/footer.component';
// import { FrontendLayoutComponent } from '../../views/frontends/frontend-layout/frontend-layout.component';
// import { SearchCourseComponent } from '../../views/frontends/search-course/search-course.component';
// import { WatchCourseComponent } from '../../views/frontends/watch-course/watch-course.component';
// import { ContactComponent } from '../../views/frontends/contact/contact.component';
// import { AboutComponent } from '../../views/frontends/about/about.component';
// import { CartComponent } from '../../views/frontends/cart/cart.component';
// import { CheckoutComponent } from '../../views/frontends/checkout/checkout.component';
// import { InstructorProfileComponent } from '../../views/frontends/instructor-profile/instructor-profile.component';
// import { CourseDetailsComponent } from '../../views/frontends/course-details/course-details.component';
// import { HomeComponent } from '../../views/frontends/home/home.component';

// import the frontends routing module
import { FrontendsRoutingModule } from '../../routes/frontends/frontendsrouting.module';


@NgModule({
  // declarations: [
  //   NavbarComponent,
  //   FooterComponent,
  //   FrontendLayoutComponent,
  //   SearchCourseComponent,
  //   WatchCourseComponent,
  //   ContactComponent,
  //   AboutComponent,
  //   CartComponent,
  //   CheckoutComponent,
  //   InstructorProfileComponent,
  //   CourseDetailsComponent,
  //   HomeComponent
  // ],
  imports: [
    FrontendsRoutingModule
  ],
  // exports: [
  //   NavbarComponent,
  //   FooterComponent,
  //   FrontendLayoutComponent,
  //   SearchCourseComponent,
  //   WatchCourseComponent,
  //   ContactComponent,
  //   AboutComponent,
  //   CartComponent,
  //   CheckoutComponent,
  //   InstructorProfileComponent,
  //   CourseDetailsComponent,
  //   HomeComponent
  // ]
})
export class FrontendsModule { }

