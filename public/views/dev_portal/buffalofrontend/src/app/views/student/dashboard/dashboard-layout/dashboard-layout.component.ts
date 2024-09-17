import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ToastrService } from 'ngx-toastr'; // Import ToastrService
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

import { NavbarComponent } from '../../../frontends/navbar/navbar.component';
import { FooterComponent } from '../../../frontends/footer/footer.component';

@Component({
  selector: 'app-dashboard-layout',
  standalone: true,
  imports: [
    RouterModule,
    NavbarComponent,
    FooterComponent
  ],
  templateUrl: './dashboard-layout.component.html',
  styleUrl: './dashboard-layout.component.css'
})
export class DashboardLayoutComponent implements OnInit {
  studentInfo: any = null;
  enrolledCount: number = 0;
  completedCount: number = 0;
  loading: boolean = true;

  private profileApiUrl = 'http://127.0.0.1:8000/api/authentication-sub-system/student-sub-system-dashboard/profile-count-updates';

  constructor(
    private http: HttpClient, 
    private router: Router, 
    private toastr: ToastrService) {}

  ngOnInit(): void {
    this.fetchStudentProfile();
  }

  // fetchStudentProfile(): void {
  //   this.loading = true; // Set loading to true at the beginning
  //   const token = localStorage.getItem('token');
  //   if (!token) {
  //     this.toastr.error('No token found', 'Error');
  //     this.loading = false; // Set loading to false if no token is found
  //     return;
  //   }

  //   const headers = new HttpHeaders({
  //     'Authorization': `Bearer ${token}`
  //   });

  //   this.http.get<any>(this.profileApiUrl, { headers }).subscribe(
  //     data => {
  //       this.studentInfo = data.student_info;
  //       this.enrolledCount = data.enrolled_count;
  //       this.completedCount = data.completed_count;
  //       this.loading = false; // Set loading to false after data is fetched
  //     },
  //     error => {
  //       console.error('Failed to fetch student profile count updates', error);
  //       this.toastr.error('Failed to fetch student profile count updates', 'Error');
  //       this.loading = false; // Set loading to false if an error occurs
  //     }
  //   );
  // }
  fetchStudentProfile(): void {
    this.loading = true; // Set loading to true at the beginning

    const token = localStorage.getItem('token');
    if (!token) {
      this.toastr.error('No token found', 'Error');
      this.loading = false; // Set loading to false if no token is found
      return;
    }

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    this.http.get<any>(this.profileApiUrl, { headers }).subscribe(
      data => {
        this.studentInfo = data.student_info;
        this.enrolledCount = data.enrolled_count;
        this.completedCount = data.completed_count;
        this.loading = false; // Set loading to false after data is fetched
      },
      error => {
        console.error('Failed to fetch student profile count updates', error);

        if (error.status === 401) { // Unauthorized error
          this.toastr.error('Session expired or unauthorized. Please log in again.', 'Error');
          // Optionally, redirect to the login page
          this.router.navigate(['/app-student-auth/authentication-sub-system/studentLogin']);
        } else {
          this.toastr.error('Failed to fetch student profile count updates', 'Error');
        }

        this.loading = false; // Set loading to false if an error occurs
      }
    );
}


}
