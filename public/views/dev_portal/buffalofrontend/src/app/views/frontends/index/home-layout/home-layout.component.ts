import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LandingPageComponent } from '../landing-page/landing-page.component';
import { CourseSubCategoriesComponent } from '../course-sub-categories/course-sub-categories.component';
import { PopularCoursesComponent } from '../popular-courses/popular-courses.component';
import { WhyLearnWithBuffaloComponent } from '../why-learn-with-buffalo/why-learn-with-buffalo.component';
import { BuffaloLearningStepsComponent } from '../buffalo-learning-steps/buffalo-learning-steps.component';
import { BuffaloTestimonialsComponent } from '../buffalo-testimonials/buffalo-testimonials.component';
import { PartnersinfoComponent } from '../partnersinfo/partnersinfo.component';
import { TeamComponent } from '../team/team.component';
import { LatestEventsComponent } from '../latest-events/latest-events.component';
import { BuffaloNewsletterComponent } from '../buffalo-newsletter/buffalo-newsletter.component';

@Component({
  selector: 'app-home-layout',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    // import the dependent components
    LandingPageComponent,
    CourseSubCategoriesComponent,
    PopularCoursesComponent,
    WhyLearnWithBuffaloComponent,
    BuffaloLearningStepsComponent,
    BuffaloTestimonialsComponent,
    TeamComponent,
    LatestEventsComponent,
    BuffaloNewsletterComponent
  ],
  templateUrl: './home-layout.component.html',
  styleUrl: './home-layout.component.css'
})
export class HomeLayoutComponent {

}
