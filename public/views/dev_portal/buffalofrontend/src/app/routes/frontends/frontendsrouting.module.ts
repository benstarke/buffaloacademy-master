import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


//  frontends
import { FrontendLayoutComponent } from '../../views/frontends/frontend-layout/frontend-layout.component';
import { AboutLayoutComponent as AboutComponent } from '../../views/frontends/about/about-layout/about-layout.component'; 
import { ContactComponent } from '../../views/frontends/contact/contact.component';
import { SearchCourseComponent } from '../../views/frontends/search-course/search-course.component';
import { CartComponent } from '../../views/frontends/cart/cart.component';
import { CheckoutComponent } from '../../views/frontends/checkout/checkout.component';
import { CourseDetailsComponent } from '../../views/frontends/course-details/course-details.component';
import { InstructorProfileComponent } from '../../views/frontends/instructor-profile/instructor-profile.component';
import { WatchCourseComponent } from '../../views/frontends/watch-course/watch-course.component';
import { HomeLayoutComponent as HomeComponent } from '../../views/frontends/index/home-layout/home-layout.component'; 


export const frontendRoutes: Routes = [
  // {
  //   path: '', redirectTo: '/home', pathMatch: 'full'
  // },
  {
    path: '',
    component: FrontendLayoutComponent,
    children:[
    {
      path:'',
      component:HomeComponent
    },
    {
      path:'about',
      component:AboutComponent
    },
    {
      path:'cart',
      component:CartComponent
    },
    {
      path:'contact',
      component:ContactComponent
    }, 
    {
      path:'searchCourse',
      component:SearchCourseComponent
    }, 
    {
      path:'checkout',
      component: CheckoutComponent
    },
    {
      path:'courseDetails/:title_en/:id',
      component: CourseDetailsComponent
    },
    {
      path:'instructorProfile/:name_en/:designation/:id',
      component: InstructorProfileComponent
    },
    
  ],
},
// watch course - course detail
{
  // path:'watchCourse/:title_en/:id',
  path: 'watchCourse/:title_en/:id/:curriculum_name/:curriculum_id',
  component:WatchCourseComponent
}]
@NgModule({
  imports: [ RouterModule.forChild(frontendRoutes)],
  exports: [RouterModule]
})

export class FrontendsRoutingModule { }
