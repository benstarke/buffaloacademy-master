import { CommonModule } from '@angular/common';
import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr'; // Import ToastrService

import { debounceTime, Subject, throwError, TimeoutError, of } from 'rxjs';
import { catchError, timeout, delay, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-auth-register',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    FormsModule
  ],
  templateUrl: './auth-register.component.html',
  styleUrls: ['./auth-register.component.css']
})
export class AuthRegisterComponent  implements OnInit, OnDestroy  {
  name: string = '';
  email: string = '';
  password: string = '';
  password_confirmation: string = '';
  agree: boolean = false;
  errors: any = {};
  emailValid: boolean = true;
  emailExists: boolean = false;
  passwordStrength: string = '';
  passwordsMatch: boolean = true;
  emailCheck$ = new Subject<string>();
  loading: boolean = false; // Add loading indicator
  passwordSameAsEmail: boolean = false; // Add flag for password same as email

  showVerificationMessage: boolean = false;
  // emailProviderLink: string = '';
  emailProviderLink: { name: string, url: string }[] = [];
  studentId: number | null = null; // Add student ID property

  connectionStatus: boolean = navigator.onLine; // Add connection status property
  onlineEventSubscription: EventListenerOrEventListenerObject;
  offlineEventSubscription: EventListenerOrEventListenerObject;

  constructor(
    private http: HttpClient, 
    private router: Router, 
    private toastr: ToastrService,
    private cd: ChangeDetectorRef // Inject ChangeDetectorRef
  ) {
    this.emailCheck$.pipe(debounceTime(500)).subscribe(email => this.checkEmailExists(email));

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

  // internet search on this component
  ngOnInit() {
    this.updateConnectionStatus(); // Initial check
    window.addEventListener('online', this.onlineEventSubscription);
    window.addEventListener('offline', this.offlineEventSubscription);

    // Show initial connection status message
    if (this.connectionStatus) {
      this.toastr.success('You are online!', '', { timeOut: 2000 });
    } else {
      this.toastr.error('You are offline. Please check your internet connection.', '', { timeOut: 2000 });
    }
  }

  ngOnDestroy() {
    window.removeEventListener('online', this.onlineEventSubscription);
    window.removeEventListener('offline', this.offlineEventSubscription);
  }

  private updateConnectionStatus = () => {
    this.connectionStatus = navigator.onLine;
  };

  // internet search on this component

  register(event: Event) {
    event.preventDefault(); // Prevent default form submission

    if (!this.agree) {
      this.toastr.error('You must accept the terms and privacy policy', '', { timeOut: 2000 });
      return;
    }

    if (this.passwordStrength === 'weak') {
      this.toastr.error('Your password is too weak. Please use a stronger password.', '', { timeOut: 2000 });
      return;
    }

    if (this.emailExists) {
      this.toastr.error('This email is already taken. Please use another email.', '', { timeOut: 2000 });
      return;
    }

    if (this.passwordSameAsEmail) {
      this.toastr.error('The password cannot be the same as the email.', '', { timeOut: 2000 });
      return;
    }

    // Check internet connection before proceeding
    if (!this.connectionStatus) {
      this.toastr.error('You are offline. Please check your internet connection.', '', { timeOut: 3000 });
      return;
    }

    // Show loading indicator
    this.loading = true;

    // Simulate delay for 2 seconds
    of(null).pipe(
      delay(2000), // Delay for 2 seconds
      switchMap(() => 
        this.http.post('http://127.0.0.1:8000/api/authentication-sub-system/student/register', {
          name: this.name,
          email: this.email,
          password: this.password,
          password_confirmation: this.password_confirmation
        })
      ),
      timeout(10000), // Add a timeout to simulate weak internet connection
      catchError((error: HttpErrorResponse) => {
        if (error instanceof TimeoutError) {
          this.toastr.error('Request timed out. Please check your internet connection.', '', { timeOut: 3000 });
        } else if (!navigator.onLine) {
          this.toastr.error('Registration failed due to a network issue. Please try again.', '', { timeOut: 3000 });
        } else {
          this.errors = error.error.errors;
          this.showErrors();
        }
        return throwError(error);
      })
    ).subscribe(
      (response: any) => {
        this.toastr.success('Successfully Registered. Please verify your email.', '', { timeOut: 3000 });
        this.showVerificationMessage = true;
        this.emailProviderLink = this.getEmailProviderLink(this.email);
        this.studentId = response.studentId; // Store the student ID
      }
    ).add(() => {
      // Hide loading indicator after response or error handling
      this.loading = false;
    });
  }

  showErrors() {
    for (const key in this.errors) {
      if (this.errors.hasOwnProperty(key)) {
        this.toastr.error(this.errors[key][0], '', { timeOut: 2000 });
      }
    }
    // Hide loading indicator on error
    this.loading = false;
  }


  getEmailProviderLink(email: string): { name: string, url: string }[] {
    const emailDomain = email.split('@')[1];
    let emailProviderLink = [
      { name: 'Gmail', url: 'https://mail.google.com' },
      { name: 'Yahoo', url: 'https://mail.yahoo.com' },
      { name: 'Outlook', url: 'https://outlook.live.com' }
    ];

    if (emailDomain.includes('gmail')) {
      emailProviderLink = emailProviderLink.filter(provider => provider.name === 'Gmail');
    } else if (emailDomain.includes('yahoo')) {
      emailProviderLink = emailProviderLink.filter(provider => provider.name === 'Yahoo');
    } else if (emailDomain.includes('outlook') || emailDomain.includes('hotmail') || emailDomain.includes('live')) {
      emailProviderLink = emailProviderLink.filter(provider => provider.name === 'Outlook');
    }

    return emailProviderLink;
  }

  // Add the method to resend the verification email
resendVerificationEmail() {
  if (!this.studentId) {
    this.toastr.error("You haven't registered yet! Cannot resend verification email.", '', { timeOut: 2000 });
    return;
  }
  this.loading = true; // Show loading indicator while sending email
  this.http.get(`http://127.0.0.1:8000/api/authentication-sub-system/student/email/resend/${this.studentId}`)
    .pipe(
      catchError(error => {
        this.toastr.error('Error resending verification email', '', { timeOut: 2000 });
        this.loading = false; // Hide loading indicator on error
        return throwError(error);
      })
    )
    .subscribe(
      (response: any) => {
        this.toastr.success('Verification email resent successfully.', '', { timeOut: 3000 });
      },
      (error) => {
        this.errors = error.error.errors;
        this.showErrors();
      }
    )
    .add(() => {
      // Hide loading indicator after response or error handling
      this.loading = false;
    });
}

  togglePassword(fieldId: string) {
    const field = document.getElementById(fieldId) as HTMLInputElement;
    field.type = field.type === 'password' ? 'text' : 'password';
  }

  validateEmail() {
    if (this.email === '') {
      this.emailValid = true;
      this.emailExists = false;
      return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    this.emailValid = emailPattern.test(this.email);

    if (this.emailValid) {
      this.emailCheck$.next(this.email);
    } else {
      this.emailExists = false;
    }
  }

  checkEmailExists(email: string) {
    this.http.post('http://127.0.0.1:8000/api/authentication-sub-system/student/check-email', { email }).subscribe(
      (response: any) => {
        if (response.exists) {
          this.emailExists = true;
          const toast = this.toastr.error('Your email already exists in our system.', '', { timeOut: 2000 });
          toast.onHidden.subscribe(() => {
            const redirectToast = this.toastr.info('Redirecting to login page...', '', { timeOut: 2000 });
            redirectToast.onHidden.subscribe(() => {
              this.router.navigate(['/app-student-auth/authentication-sub-system/studentLogin']);
            });
          });
        } else {
          this.emailExists = false;
        }
      },
      (error) => {
        console.error('Error checking email existence', error);
      }
    );
  }

  validatePasswordStrength() {
    if (this.password === '') {
      this.passwordStrength = '';
      return;
    }

    const hasLetters = /[a-zA-Z]/.test(this.password);
    const hasNumbers = /[0-9]/.test(this.password);
    const hasSpecial = /[!@#\$%\^&\*]/.test(this.password);

    if (!hasLetters || !hasNumbers || !hasSpecial) {
      this.passwordStrength = 'weak';
    } else if (this.password.length >= 16) {
      this.passwordStrength = 'strong';
    } else if (this.password.length >= 8) {
      this.passwordStrength = 'medium';
    } else {
      this.passwordStrength = 'weak';
    }

    this.checkPasswordSameAsEmail(); // Check if password is same as email
  }


  checkPasswordSameAsEmail() {
    if (this.password === this.email) {
      this.passwordSameAsEmail = true;
      this.toastr.error('The password cannot be the same as the email.', '', { timeOut: 2000 });
    } else {
      this.passwordSameAsEmail = false;
    }
  }

  validatePasswordConfirmation() {
    if (this.password_confirmation === '') {
      this.passwordsMatch = true;
      return;
    }

    this.passwordsMatch = this.password === this.password_confirmation;
  }
}
