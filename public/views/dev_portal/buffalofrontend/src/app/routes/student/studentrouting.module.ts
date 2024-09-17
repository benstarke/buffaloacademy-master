import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../../guards/auth.guard';


// students aunthentication
import { AuthLoginComponent } from '../../views/student/auth/auth-login/auth-login.component'; 
import { AuthRegisterComponent } from '../../views/student/auth/auth-register/auth-register.component';
import { AuthLayoutComponent } from '../../views/student/auth/auth-layout/auth-layout.component';
import { PasswordResetComponent } from '../../views/student/auth/password-reset/password-reset.component';

// app student profile dashboard
import { ProfileLayoutComponent } from '../../views/student/dashboard/profile-layout/profile-layout.component';
import { DashboardHomeComponent } from '../../views/student/dashboard/dashboard-home/dashboard-home.component'; 
import { ProfileComponent } from '../../views/student/dashboard/profile/profile.component';
import { ProfileSettingsComponent } from '../../views/student/dashboard/profile-settings/profile-settings.component';

// app student main dashboard
import { ActiveCoursesComponent } from '../../views/student/dashboard/active-courses/active-courses.component';
import { CompletedCoursesComponent } from '../../views/student/dashboard/completed-courses/completed-courses.component';
import { PurchaseHistoryComponent } from '../../views/student/dashboard/purchase-history/purchase-history.component';
import { AllCoursesComponent } from '../../views/student/dashboard/all-courses/all-courses.component';
import { DashboardLayoutComponent } from '../../views/student/dashboard/dashboard-layout/dashboard-layout.component';



export const studentRoutes: Routes = [
    {
        path: 'app-student', 
        redirectTo: '/app-student/student-playground-dashboard', 
        pathMatch: 'full'
    },
    // app student auth layout routes
    {
      // auth
    path: 'app-student-auth',
    component: AuthLayoutComponent,  
    children:[
          // students auth
          {
            path:'',
            component:AuthLoginComponent
          }, 
          {
            path:'authentication-sub-system/studentLogin',
            component:AuthLoginComponent
          }, 
          {
            path:'authentication-sub-system/studentRegister',
            component: AuthRegisterComponent
          },
          {
            path:'authentication-sub-system/reset-password',
            component: PasswordResetComponent
          },
      ],  
    },
    // app student dashboard and aunthentication routes
    {
    path: 'app-student',
    component: DashboardLayoutComponent,  
    children:[
          {
              path:'',
              component: DashboardHomeComponent
          },
          {
            path: 'main-dashboard',
            component: DashboardHomeComponent
          },
          {
            path:'main-dashboard/all_courses',
            component: AllCoursesComponent,
            // canActivate: [AuthGuard],
          },
          {
            path:'main-dashboard/active_courses',
            component: ActiveCoursesComponent,
            // canActivate: [AuthGuard],
          },
          {
            path:'main-dashboard/purchase_history',
            component: PurchaseHistoryComponent,
            // canActivate: [AuthGuard],
          },
          {
            path:'main-dashboard/complete_courses',
            component: CompletedCoursesComponent,
            // canActivate: [AuthGuard],
          },
      ],  
    },
    // app student profile dashboard routes
    {
      // profile
    path: 'app-student-profile',
    component: ProfileLayoutComponent,  
    children:[
          {
            path:'',
            component: ProfileComponent,
            // canActivate: [AuthGuard],
          },
          {
            path:'main-dashboard/student_profile',
            component: ProfileComponent,
            // canActivate: [AuthGuard],
          },
          {
              path:'main-dashboard/student_profile_settings',
              component: ProfileSettingsComponent,
              // canActivate: [AuthGuard],
          },
      ],  
    }
    ]

@NgModule({
  imports: [ RouterModule.forChild(studentRoutes)],
  exports: [RouterModule]
})

export class StudentRoutingModule { }
