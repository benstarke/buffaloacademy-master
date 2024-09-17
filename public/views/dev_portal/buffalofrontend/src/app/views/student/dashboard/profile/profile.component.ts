import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ToastrService } from 'ngx-toastr'; // Import ToastrService
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit {
  studentInfo: any = null;
  enrolledCount: number = 0;
  completedCount: number = 0;
  loading: boolean = true;

  private profileApiUrl = 'http://127.0.0.1:8000/api/authentication-sub-system/student-sub-system-dashboard/profile-count-updates';

  constructor(private http: HttpClient, private toastr: ToastrService) {}

  ngOnInit(): void {
    this.fetchStudentProfile();
  }

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
        console.error('Failed to fetch student profile details', error);
        this.toastr.error('Failed to fetch student profile count details', 'Error');
        this.loading = false; // Set loading to false if an error occurs
      }
    );
  }

}
