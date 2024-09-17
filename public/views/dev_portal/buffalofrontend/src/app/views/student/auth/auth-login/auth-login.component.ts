import { CommonModule } from '@angular/common';
import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { DxButtonModule, DxTextBoxModule, DxPopupModule, DxScrollViewModule } from 'devextreme-angular';
import { ToastrService } from 'ngx-toastr';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';

import { debounceTime, Subject, Subscription, throwError, TimeoutError, of } from 'rxjs';
import { catchError, timeout, delay, switchMap } from 'rxjs/operators';
import { AuthService } from '../../../frontends/navbar/auth.service'; 


@Component({
  selector: 'app-auth-login',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    DxButtonModule,
    DxTextBoxModule,
    DxPopupModule,
    DxScrollViewModule,
    ReactiveFormsModule
  ],
  templateUrl: './auth-login.component.html',
  styleUrls: ['./auth-login.component.css']
})
export class AuthLoginComponent implements OnInit, OnDestroy  {
  email: string = '';
  password: string = '';
  errors: any = {};
  emailValid: boolean = true;
  emailExists: boolean = true; // Default to true to allow users to input password initially
  emailCheck$ = new Subject<string>();
  

  // forgot password/password reset
  islostpassword:boolean  = false;
  forgotPasswordFrm:FormGroup;
  loading: boolean = false; // for login
  spinner: boolean = false; // for reset password
  rememberMe: boolean = false; // remember me

  connectionStatus: boolean = navigator.onLine; // Add connection status property
  onlineEventSubscription: EventListenerOrEventListenerObject;
  offlineEventSubscription: EventListenerOrEventListenerObject;

  constructor(
    private http: HttpClient, 
    private router: Router, 
    private toastr: ToastrService,
    private cd: ChangeDetectorRef, // Inject ChangeDetectorRef
    private fb: FormBuilder, // Inject FormBuilder
    private authService: AuthService // Inject AuthService
    ) {

    // forgot password
    this.forgotPasswordFrm = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });
    // // forgot password/password reset 
    // this.forgotPasswordFrm = new FormGroup({
    //   email_address: new FormControl('', Validators.compose([Validators.required]))
    // });
    // // forgot password/password reset

    // email check existance
    this.emailCheck$.pipe(debounceTime(500)).subscribe(email => this.checkEmailExists(email));

    // internet connectivtiy check
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

    this.cd.detectChanges(); // Manually trigger change detection
  }

  ngOnDestroy() {
    window.removeEventListener('online', this.onlineEventSubscription);
    window.removeEventListener('offline', this.offlineEventSubscription);
  }

  private updateConnectionStatus = () => {
    this.connectionStatus = navigator.onLine;
  };

  // internet search on this component

  login(event: Event) {
    event.preventDefault();

    if (this.email === '' || this.password === '') {
      this.toastr.error('Email and Password are required', '', { timeOut: 2000 });
      return;
    }

    if (!this.emailExists) {
      this.toastr.error('Email does not exist. Redirecting to register page...', '', { timeOut: 2000 }).onHidden.subscribe(() => {
        this.router.navigate(['/app-student-auth/authentication-sub-system/studentRegister']);
      });
      return;
    }

    // Check internet connection before proceeding
    if (!this.connectionStatus) {
      this.toastr.error('You are offline. Please check your internet connection.', '', { timeOut: 3000 });
      return;
    }

    this.loading = true;

    this.authService.login(this.email, this.password, this.rememberMe).subscribe(
      (response: any) => {
        this.toastr.success('Successfully Logged In', '', { timeOut: 2000 });

        // Extract student_id and token from the response
        const studentId = response.authorization.student_id;
        const roleId = response.authorization.role_id;
        const token = response.authorization.token;

        // Check if the role_id is not 4
        if (roleId !== 4) {
          // Redirect to the admin sign-in page
          this.router.navigate(['/admin-buffalo/authentication-sign-in']);
          return; // Exit the function early to prevent further execution
        }

        // Store them in local storage
        localStorage.setItem('student_id', studentId);
        localStorage.setItem('token', token);


        this.cd.detectChanges(); // Manually trigger change detection
        this.router.navigate(['/app-student/main-dashboard']);
      },
      (error: any) => {
        this.loading = false; // Stop the loading spinner
        if (error instanceof TimeoutError) {
          this.toastr.error('Request timed out. Please check your internet connection.', '', { timeOut: 3000 });
        } else if (!navigator.onLine) {
          this.toastr.error('Login failed due to a network issue. Please try again.', '', { timeOut: 3000 });
        } else if (error.status === 403 && error.error.message === "We've noticed you didn't verify your email address. A new email verification has been sent to your email, check and verify.") {
          this.toastr.info("We've noticed you didn't verify your email address. A new email verification has been sent to your email, check and verify.", '', { timeOut: 5000 });
        } else if (error.status === 401) { // Unauthorized error
          this.toastr.error('Your password is incorrect. Please try again!', '', { timeOut: 2000 });
        } else {
          this.errors = error.error.errors;
          this.showErrors();
        }
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
    this.loading = false;
  }

  togglePassword(fieldId: string) {
    const field = document.getElementById(fieldId) as HTMLInputElement;
    field.type = field.type === 'password' ? 'text' : 'password';
  }

  validateEmail() {
    if (this.email === '') {
      this.emailValid = true;
      this.emailExists = true;
      return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    this.emailValid = emailPattern.test(this.email);

    if (this.emailValid) {
      this.emailCheck$.next(this.email);
    } else {
      this.emailExists = true; // Allow user to correct their email
    }
  }


  checkEmailExists(email: string) {
    this.http.post('http://127.0.0.1:8000/api/authentication-sub-system/student/check-email', { email }).subscribe(
      (response: any) => {
        if (response.exists) {
          // Email exists in the students table, handle accordingly
          this.emailExists = true;
        } else {
          // Email does not exist in the students table, check in the instructors table
          this.http.post('http://127.0.0.1:8000/api/authentication-sub-system/instructor/check-email', { email }).subscribe(
            (instructorResponse: any) => {
              if (instructorResponse.exists) {
                // Show toast message and redirect to sign-in page
                const toast = this.toastr.info('Please use the admin login page to access your portal.', '', { timeOut: 2000 });
                toast.onHidden.subscribe(() => {
                  const redirectToast = this.toastr.info('Redirecting to login page...', '', { timeOut: 2000 });
                        redirectToast.onHidden.subscribe(() => {
                          this.router.navigate(['/admin-buffalo/aunthentication-sign-in']);
                        });
                });
              } else {
                // Email does not exist in the instructors table, check in the users table
                this.http.post('http://127.0.0.1:8000/api/authentication-sub-system/user/check-email', { email }).subscribe(
                  (userResponse: any) => {
                    if (userResponse.exists) {
                      // Show toast message and redirect to sign-in page
                      const toast = this.toastr.info('Please use the admin login page to access your portal.', '', { timeOut: 2000 });
                      toast.onHidden.subscribe(() => {
                        const redirectToast = this.toastr.info('Redirecting to login page...', '', { timeOut: 2000 });
                        redirectToast.onHidden.subscribe(() => {
                          this.router.navigate(['/admin-buffalo/aunthentication-sign-in']);
                        });
                      });
                    } else {
                      // Email does not exist in any table, redirect to sign-up page
                      const toast = this.toastr.error('Sorry! Your email does not exist in our system!', '', { timeOut: 2000 });
                      toast.onHidden.subscribe(() => {
                        const redirectToast = this.toastr.info('Redirecting to home page...', '', { timeOut: 2000 });
                        redirectToast.onHidden.subscribe(() => {
                          this.router.navigate(['/']);
                        });
                      });
                    }
                  },
                  (userError) => {
                    console.error('Error checking email existence in users table', userError);
                  }
                );
              }
            },
            (instructorError) => {
              console.error('Error checking email existence in instructors table', instructorError);
            }
          );
        }
      },
      (error) => {
        console.error('Error checking email existence in students table', error);
      }
    );
  }
  

  // forget password/password reset
  onFuncRecoverPasswordRequest() {
    if (this.forgotPasswordFrm.invalid) {
      this.toastr.error('Please enter a valid email address', '', { timeOut: 2000 });
      return;
    }

    const email = this.forgotPasswordFrm.value.email;
    this.spinner = true; // Show spinner indicator
    this.http.post('http://127.0.0.1:8000/api/authentication-sub-system/student-password-reset-via-email/password/email', { email })
      .pipe(
        timeout(10000), // Add a timeout of 10 seconds
        catchError((error: HttpErrorResponse) => {
          this.spinner = false; // Hide spinner indicator
          if (error instanceof TimeoutError) {
            this.toastr.error('Request timed out. Please check your internet connection.', '', { timeOut: 3000 });
          } else if (!navigator.onLine) {
            this.toastr.error('Request failed due to a network issue. Please try again.', '', { timeOut: 3000 });
          } else {
            this.errors = error.error.errors;
            this.showErrors();
          }
          return throwError(error);
        })
      )
      .subscribe(
        (response: any) => {
          this.toastr.success('Password reset link sent to your email!', '', { timeOut: 2000 });
          this.islostpassword = false; // Close the popup
          this.forgotPasswordFrm.reset(); // Clear the form
        },
        (error: any) => {
          if (error.status === 404) {
            this.toastr.error('Email address not found', '', { timeOut: 2000 });
          }
        }
      ).add(() => {
        // Hide loading indicator after response or error handling
        this.spinner = false;
      });
  }


  funcLostPassord(){
    this.islostpassword = true;
  }
}
