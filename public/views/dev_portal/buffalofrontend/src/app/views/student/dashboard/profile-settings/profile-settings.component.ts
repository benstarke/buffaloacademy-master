import { CommonModule } from '@angular/common';
import { Component, OnInit, ChangeDetectorRef, Renderer2 } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpEvent, HttpEventType } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { DxSelectBoxModule, DxTextBoxModule } from 'devextreme-angular';

import { debounceTime, Subject, Subscription, throwError, TimeoutError, of } from 'rxjs';
import { catchError, timeout, delay, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-profile-settings',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    DxSelectBoxModule,
    DxTextBoxModule
  ],
  templateUrl: './profile-settings.component.html',
  styleUrls: ['./profile-settings.component.css']
})
export class ProfileSettingsComponent implements OnInit {
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

  selectedFile: File | null = null; // image upload
  uploadProgress: number | null = null; // image upload progress

  isUploading = false;
  isSubmitting = false;
  // imageUrl: string = '';
  imageUrl: SafeUrl = ''; // Use SafeUrl for image URL
  // imageUrl: string = 'assets/uploads/students/' + this.studentInfo.image;

  // select box
  genderOptions = [
    { text: 'Male', value: 'male' },
    { text: 'Female', value: 'female' },
    { text: 'Other', value: 'other' }
];


  isLoadingProfile = false;
  isLoadingPassword = false;
  isLoadingImage = false;

  errors: any = {};
  passwordStrength: string = '';
  passwordsMatch: boolean = true;
  passwordSameAsEmail: boolean = false; // Add flag for password same as email

  connectionStatus: boolean = navigator.onLine; // Add connection status property
  onlineEventSubscription: EventListenerOrEventListenerObject;
  offlineEventSubscription: EventListenerOrEventListenerObject;

  constructor(
    private http: HttpClient, 
    private toastr: ToastrService,
    private cd: ChangeDetectorRef, // Inject ChangeDetectorRef
    // private cdr: ChangeDetectorRef // to automate image upload
    // private renderer: Renderer2 // Add this
    private sanitizer: DomSanitizer // Add this
  ) {
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

  ngOnInit() {
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
  

  saveProfile() {
    // event.preventDefault(); // Prevent default form submission

    if (!this.checkNetworkStatus()) return;
  
    const token = localStorage.getItem('token');
    if (!token) {
      this.toastr.error('No token found. Please log in again.');
      return;
    }
  
    this.isLoadingProfile = true; // Start spinner
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    this.http.post('http://127.0.0.1:8000/api/authentication-sub-system/student-sub-system-profile/student/profile', this.studentInfo, { headers })
      .pipe(
        timeout(10000), // Add a timeout to simulate weak internet connection
        catchError((error: any) => {
          this.isLoadingProfile = false;
          if (error instanceof TimeoutError) {
            this.toastr.error('Request timed out. Please check your internet connection.', '', { timeOut: 3000 });
            console.error('Request timed out:', error);
          } else if (!navigator.onLine) {
            this.toastr.error('Profile save failed due to a network issue. Please try again.', '', { timeOut: 3000 });
            console.error('Offline error:', error);
          } else if (error.status === 400) {
            const errorMessage = error.error.message || 'Validation error';
            this.toastr.error(errorMessage, '', { timeOut: 3000 });
            console.error('Validation error:', error);
          } else {
            this.toastr.error('Error saving profile', '', { timeOut: 3000 });
            console.error('Error response:', error);
          }
          return throwError(error);
        })
      )
      .subscribe(
        (response: any) => {
          this.isLoadingProfile = false; // Stop spinner
          this.toastr.success('Profile saved successfully!', '', { timeOut: 3000 });
          console.log('Profile saved successfully', response);
        },
        (error: any) => {
          // Additional error handling logic if needed
          console.error('Subscription error:', error);
        }
      );
  }


  changePassword() {
    this.validateCurrentPassword();
    this.validateNewPasswordStrength();
    this.validatePasswordConfirmation();

    if (!this.checkNetworkStatus()) {
        this.toastr.error('You are offline. Please check your internet connection.', '', { timeOut: 3000 });
        return;
    }

    if (Object.keys(this.errors).length > 0) {
        this.showErrors();
        return;
    }

    this.checkPasswordSameAsEmail(this.studentInfo.new_password, this.studentInfo.email);

    if (this.passwordSameAsEmail) {
        return;
    }

    this.isLoadingPassword = true;

    const token = localStorage.getItem('token');
    if (!token) {
        this.toastr.error('Authorization Token not found. Please log in again.', '', { timeOut: 3000 });
        this.isLoadingPassword = false;
        return;
    }

    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    this.http.post('http://127.0.0.1:8000/api/authentication-sub-system/student-sub-system-profile/student/change-password', {
        current_password: this.studentInfo.current_password,
        new_password: this.studentInfo.new_password,
        new_password_confirmation: this.studentInfo.new_password_confirmation
    }, { headers }).pipe(
        timeout(10000), // Add a timeout to simulate weak internet connection
        catchError((error: HttpErrorResponse) => {
            this.isLoadingPassword = false;
            if (error instanceof TimeoutError) {
                this.toastr.error('Request timed out. Please check your internet connection.', '', { timeOut: 3000 });
                console.error('Request timed out:', error);
                return of(null); // Return an observable that emits null to ensure the process stops here
            } else if (!navigator.onLine) {
                this.toastr.error('Password change failed due to a network issue. Please try again.', '', { timeOut: 3000 });
                console.error('Offline error:', error);
                return of(null);
            } else {
                this.errors = error.error.errors || {};
                this.showErrors();
                if (error.status === 401) {
                    this.toastr.error('Authorization Token not found. Please log in again.', '', { timeOut: 3000 });
                }
                console.error('Error response:', error.error.errors);
                return throwError(error);
            }
        })
    ).subscribe(
        (response: any) => {
            if (response) {
                this.toastr.success('Password changed successfully!', '', { timeOut: 3000 });
                this.isLoadingPassword = false;
                this.resetPasswordFields();
                console.log('Success response:', response);
            }
        },
        (error: any) => {
            this.isLoadingPassword = false;
            if (error.status === 400 && error.error.message === 'Current password is incorrect.') {
                this.toastr.error('Current password is incorrect. Please try again.', '', { timeOut: 3000 });
            } else {
                this.errors = error.error.errors || {};
                this.showErrors();
                console.error('Subscription error:', error);
            }
        }
    );
}

  


  validateCurrentPassword() {
    if (!this.studentInfo.current_password) {
      this.errors.current_password = 'Current password is required.';
    } else {
      delete this.errors.current_password;
    }
  }

  validateNewPasswordStrength() {
    const { new_password } = this.studentInfo;
    if (!new_password) {
      this.errors.new_password = 'New password is required.';
    } else {
      delete this.errors.new_password;
      this.passwordStrength = this.getPasswordStrength(new_password);
    }
  }

  validatePasswordConfirmation() {
    if (!this.studentInfo.new_password_confirmation) {
      this.errors.new_password_confirmation = 'Password confirmation is required.';
    } else {
      delete this.errors.new_password_confirmation;
      this.passwordsMatch = this.studentInfo.new_password === this.studentInfo.new_password_confirmation;
    }
  }

  getPasswordStrength(password: string): string {
    if (password === '') {
      return '';
    }

    const hasLetters = /[a-zA-Z]/.test(password);
    const hasNumbers = /[0-9]/.test(password);
    const hasSpecial = /[!@#\$%\^&\*]/.test(password);

    if (!hasLetters || !hasNumbers || !hasSpecial) {
      return 'weak';
    } else if (password.length >= 16) {
      return 'strong';
    } else if (password.length >= 8) {
      return 'medium';
    } else {
      return 'weak';
    }
  }

  checkPasswordSameAsEmail(password: string, email: string) {
    if (password === email) {
      this.passwordSameAsEmail = true;
      this.toastr.error('The password cannot be the same as the email.', '', { timeOut: 2000 });
    } else {
      this.passwordSameAsEmail = false;
    }
  }

  showErrors() {
    Object.keys(this.errors).forEach(field => {
      this.toastr.error(this.errors[field], '', { timeOut: 3000 });
    });
  }

  resetPasswordFields() {
    this.studentInfo.current_password = '';
    this.studentInfo.new_password = '';
    this.studentInfo.new_password_confirmation = '';
    this.errors = {};
    this.passwordStrength = '';
    this.passwordsMatch = true;
  }
  


  // changeImage(event: any) {
  //   if (!this.checkNetworkStatus()) return;

  //   const file = event.target.files[0];
  //   if (file) {
  //     this.isLoadingImage = true;
  //     const formData = new FormData();
  //     formData.append('image', file);
  //     const headers = new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem('token')}`);

  //     this.http.post('http://127.0.0.1:8000/api/authentication-sub-system/student-sub-system-profile/student/change-image', formData, { headers })
  //       .subscribe(response => {
  //         this.isLoadingImage = false;
  //         this.toastr.success('Image changed successfully');
  //         console.log('Image changed successfully', response);
  //         this.loadProfile();
  //       }, error => {
  //         this.isLoadingImage = false;
  //         this.toastr.error('Error changing image');
  //         console.error('Error changing image', error);
  //       });
  //   }
  // }

  

  onFileChange(event: any) {
    if (event.target.files.length > 0) {
      this.selectedFile = event.target.files[0];
      if (this.selectedFile) {
        this.uploadFile(this.selectedFile); // Ensure selectedFile is not null
      }
    }
  }

  uploadFile(file: File) {
    const formData = new FormData();
    formData.append('image', file);

    const token = localStorage.getItem('token');
    if (!token) {
      this.toastr.error('No token found. Please log in again.');
      return;
    }

    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    this.isUploading = true;

    this.http.post('http://127.0.0.1:8000/api/authentication-sub-system/student-sub-system-profile/student/upload-temp-image', formData, {
      headers,
      reportProgress: true,
      observe: 'events'
    }).subscribe(
      (event: HttpEvent<any>) => {
        switch (event.type) {
          case HttpEventType.UploadProgress:
            if (event.total) {
              this.uploadProgress = Math.round((100 * event.loaded) / event.total);
            }
            break;
          case HttpEventType.Response:
            this.uploadProgress = null;
            this.isUploading = false;
            if (event.body && event.body.imageName) {
              this.studentInfo.image = event.body.imageName;
              // this.imageUrl = 'assets/uploads/temp/' + event.body.imageName;
              this.imageUrl = this.sanitizer.bypassSecurityTrustUrl('assets/uploads/temp/' + event.body.imageName);
            }
            this.toastr.success('Image uploaded successfully');
            console.log('Success response:', event.body);
            break;
        }
      },
      (error: any) => {
        this.uploadProgress = null;
        this.isUploading = false;
        if (error.status === 400) {
          const errorMessage = error.error.message || 'Validation error';
          this.toastr.error(errorMessage);
        } else {
          this.toastr.error('Error uploading image');
        }
        console.error('Error uploading image', error);
      }
    );
  }
  

  changeImage() {
    if (!this.selectedFile) {
      this.toastr.error('Please select an image first.');
      return;
    }
  
    // Handle the post request to save the image
    this.isUploading = true;
  
    const token = localStorage.getItem('token');
    if (!token) {
      this.toastr.error('No token found. Please log in again.');
      this.isUploading = false;
      return;
    }
  
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
  
    const formData = new FormData();
    formData.append('image', this.selectedFile);
  
    this.http.post('http://127.0.0.1:8000/api/authentication-sub-system/student-sub-system-profile/student/change-image', formData, { headers })
      .subscribe(
        (response: any) => {
          this.isUploading = false;
          this.studentInfo.image = response.imagePath;
          // this.imageUrl = response.imagePath + `?${new Date().getTime()}`;
          this.imageUrl = this.sanitizer.bypassSecurityTrustUrl(`http://127.0.0.1:8000/${response.imagePath}?${new Date().getTime()}`);
          this.toastr.success('Image changed successfully');
          console.log('Image changed successfully', response);

          // Manually trigger change detection
        // this.cd.detectChanges();
        // Use Renderer2 to update the img src attribute
        // const imgElement = document.querySelector('.profile-image') as HTMLImageElement;
        // if (imgElement) {
        //   this.renderer.setAttribute(imgElement, 'src', this.imageUrl);
        // }
        },
        (error: any) => {
          this.isUploading = false;
          if (error.status === 400) {
            const errorMessage = error.error.message || 'Validation error';
            this.toastr.error(errorMessage);
          } else {
            this.toastr.error('Error changing image');
          }
          console.error('Error changing image', error);
        }
      );
  }
  

}
