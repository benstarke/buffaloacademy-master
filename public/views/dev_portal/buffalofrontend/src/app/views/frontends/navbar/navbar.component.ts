// navbar.component.ts
import { Component, OnInit, ChangeDetectorRef, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from './auth.service';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { HttpClient, HttpHeaders } from '@angular/common/http';


interface SystemInfo {
  id: number;
  title: string;
  logo: string;
}

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    RouterModule,
    CommonModule,
    RouterOutlet
  ],
  styleUrls: ['./navbar.component.css'],
  templateUrl: './navbar.component.html',
})
export class NavbarComponent implements OnInit {
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

  isLoggedIn: boolean = false;
  isLoadingProfile = false;

  imageUrl: SafeUrl = ''; // Use SafeUrl for image URL

  connectionStatus: boolean = navigator.onLine; // Add connection status property
  onlineEventSubscription: EventListenerOrEventListenerObject;
  offlineEventSubscription: EventListenerOrEventListenerObject;

  // system information - logo and title
  SystemInfo: SystemInfo | null = null;
  loading: boolean = true;


  // mobile friendly
  // mobileMenuOpen: boolean = false;
  isDrawerOpen = false;
  mobileMenuOpen = false;
  
  constructor(
    private router: Router, 
    private http: HttpClient, 
    public toastr: ToastrService,
    public authService: AuthService,
    private cd: ChangeDetectorRef,
    private sanitizer: DomSanitizer // Add this
  ) {
    // check network connectivity
    this.onlineEventSubscription = () => {
      this.connectionStatus = true;
      // this.toastr.info('You are back online!', '', { timeOut: 2000 });
      this.cd.detectChanges(); // Detect changes
    };

    this.offlineEventSubscription = () => {
      this.connectionStatus = false;
      // this.toastr.error('You are offline. Please check your internet connection.', '', { timeOut: 2000 });
      this.cd.detectChanges(); // Detect changes
    };
  }

  ngOnInit(): void {
    this.authService.checkAuthenticationState();
    this.authService.loginStatus$.subscribe(isLoggedIn => {
      this.isLoggedIn = isLoggedIn;
      this.cd.detectChanges(); // Manually trigger change detection
      this.fetchSystemInfo();
    });

    this.loadProfile();

    this.updateConnectionStatus(); // Initial check
    window.addEventListener('online', this.onlineEventSubscription);
    window.addEventListener('offline', this.offlineEventSubscription);

    // Show initial connection status message
    if (this.connectionStatus) {
      // this.toastr.success('You are online!', '', { timeOut: 2000 });
    } else {
      // this.toastr.error('You are offline. Please check your internet connection.', '', { timeOut: 2000 });
    }

    this.onlineEventSubscription = () => {
      this.connectionStatus = true;
      // this.toastr.info('You are back online!', '', { timeOut: 2000 });
      this.cd.detectChanges(); // Detect changes
    };

    this.offlineEventSubscription = () => {
      this.connectionStatus = false;
      // this.toastr.error('You are offline. Please check your internet connection.', '', { timeOut: 2000 });
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
      // this.toastr.error('Network is offline. Please check your connection.');
      return false;
    }
    return true;
  }

  //  system inform
  fetchSystemInfo(): void {
    this.http.get<{ success: boolean, data: SystemInfo[] }>('http://127.0.0.1:8000/api/site-information-sub-system/general-system-layout/footer-info')
      .subscribe(
        (response) => {
          console.log('Fetched footer info:', response.data); // Log the fetched data to the console
          if (response.success && response.data.length > 0) {
            this.SystemInfo = response.data[0]; // Assuming the first record in the data array is the required footer info
          } else {
            console.warn('No footer info found');
          }
          this.loading = false;
        },
        (error) => {
          console.error('Error fetching footer info', error);
          this.loading = false;
        }
      );
  }
  

  loadProfile() {
    if (!this.checkNetworkStatus()) return;
  
    const token = localStorage.getItem('token');
    if (!token) {
      // this.toastr.error('No token found. Please log in again.');
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
        
        // this.toastr.success('Student information loaded successfully');
      }, error => {
        this.isLoadingProfile = false;
        // this.toastr.error('Error loading profile');
        console.error('Error loading profile', error);
      });
  }


  onLogout() {
    this.authService.logout()
      .then(() => {
        this.authService.handleLogoutSuccess();
        this.cd.detectChanges(); // Manually trigger change detection
      })
      .catch(error => {
        console.error('Logout failed:', error);
        this.authService.handleLogoutError();
      });
    this.toggleMobileMenu();
  }

  toggleDropdown(event: Event) {
    event.preventDefault();
    const dropdown = document.getElementById('imageDropdown');
    if (dropdown) {
      dropdown.classList.toggle('show');
    }
  }

 
toggleMobileMenu(): void {
  this.mobileMenuOpen = !this.mobileMenuOpen;
}

openSearch(): void{

}

closeSearch(): void{

}

@HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    if (window.innerWidth > 1199 && this.mobileMenuOpen) {
      this.mobileMenuOpen = false;
    }
  }
  
// toggleDrawer() {
//   this.isDrawerOpen = !this.isDrawerOpen;
// }

}
