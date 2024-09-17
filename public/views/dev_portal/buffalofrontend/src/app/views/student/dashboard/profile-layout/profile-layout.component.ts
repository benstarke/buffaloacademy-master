import { CommonModule } from '@angular/common';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { ToastrService } from 'ngx-toastr'; // Import ToastrService
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { NavbarComponent } from '../../../frontends/navbar/navbar.component';
import { FooterComponent } from '../../../frontends/footer/footer.component';

@Component({
  selector: 'app-profile-layout',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    NavbarComponent,
    FooterComponent
  ],
  templateUrl: './profile-layout.component.html',
  styleUrl: './profile-layout.component.css'
})
export class ProfileLayoutComponent implements OnInit {
    studentInfo: any =  {
      name_en: '',
      date_of_birth: '',
      email: '',
      profession: '',
      contact_en: '',
      nationality: '',
      bio: '',
      image: '',
      current_password: '',
      new_password: '',
      new_password_confirmation: '',
      gender: 'other'
    };

    enrolledCount: number = 0;
    completedCount: number = 0;
    loading: boolean = true;
    isLoadingProfile = false;

    imageUrl: SafeUrl = ''; // Use SafeUrl for image URL
  
    private profileApiUrl = 'http://127.0.0.1:8000/api/authentication-sub-system/student-sub-system-dashboard/profile-count-updates';

    connectionStatus: boolean = navigator.onLine; // Add connection status property
  onlineEventSubscription: EventListenerOrEventListenerObject;
  offlineEventSubscription: EventListenerOrEventListenerObject;

  constructor(
    private http: HttpClient, 
    private toastr: ToastrService,
    private cd: ChangeDetectorRef, // Inject ChangeDetectorRef
    private sanitizer: DomSanitizer // Add this
  ) {
    this.onlineEventSubscription = () => {
      this.connectionStatus = true;
      this.toastr.info('You are back online!', '', { timeOut: 2000 });
      this.cd.detectChanges(); // Detect changes
    };

    this.offlineEventSubscription = () => {
      this.connectionStatus = false;
      this.toastr.error('You are offline. Please check your internet connection.', '', { timeOut: 2000 });
      this.cd.detectChanges(); // Detect changes
    };
  }
  
  
    ngOnInit(): void {
      this.fetchStudentProfile();
      this.loadProfile();

    this.updateConnectionStatus(); // Initial check
    window.addEventListener('online', this.onlineEventSubscription);
    window.addEventListener('offline', this.offlineEventSubscription);

    // Show initial connection status message
    if (this.connectionStatus) {
      this.toastr.success('You are online!', '', { timeOut: 2000 });
    } else {
      this.toastr.error('You are offline. Please check your internet connection.', '', { timeOut: 2000 });
    }

    this.onlineEventSubscription = () => {
      this.connectionStatus = true;
      this.toastr.info('You are back online!', '', { timeOut: 2000 });
      this.cd.detectChanges(); // Detect changes
    };

    this.offlineEventSubscription = () => {
      this.connectionStatus = false;
      this.toastr.error('You are offline. Please check your internet connection.', '', { timeOut: 2000 });
      this.cd.detectChanges(); // Detect changes
    };
    }

    ngOnDestroy() {
      window.removeEventListener('online', this.onlineEventSubscription);
      window.removeEventListener('offline', this.offlineEventSubscription);
    }
  
    private updateConnectionStatus = () => {
      this.connectionStatus = navigator.onLine;
    };
  
    checkNetworkStatus() {
      if (!navigator.onLine) {
        this.toastr.error('Network is offline. Please check your connection.');
        return false;
      }
      return true;
    }

    loadProfile() {
      if (!this.checkNetworkStatus()) return;
    
      const token = localStorage.getItem('token');
      if (!token) {
        this.toastr.error('No token found. Please log in again.');
        return;
      }
    
      this.isLoadingProfile = true; // Start spinner
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
      this.http.get('http://127.0.0.1:8000/api/authentication-sub-system/student-sub-system-profile/student/profile', { headers })
        .subscribe((response: any) => {
          this.isLoadingProfile = false; // Stop spinner
          const data = response.student_info; // Extract student_info from response
          console.log('Profile data loaded:', data); // Log the loaded profile data
          this.studentInfo = {
            name_en: data.name_en,
            date_of_birth: data.date_of_birth,
            email: data.email,
            profession: data.profession,
            contact_en: data.contact_en,
            nationality: data.nationality,
            bio: data.bio,
            gender: data.gender,
            image: data.image // Ensure image is set
          };
          
        // Update imageUrl with the new studentInfo.image
        this.imageUrl = this.sanitizer.bypassSecurityTrustUrl(`http://127.0.0.1:8000/${data.image}?${new Date().getTime()}`);
          
          this.toastr.success('Student information loaded successfully');
        }, error => {
          this.isLoadingProfile = false;
          this.toastr.error('Error loading profile');
          console.error('Error loading profile', error);
        });
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
          console.error('Failed to fetch student profile count updates', error);
          this.toastr.error('Failed to fetch student profile count updates', 'Error');
          this.loading = false; // Set loading to false if an error occurs
        }
      );
    }
  
  }
