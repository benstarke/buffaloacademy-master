import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Component({
  selector: 'app-password-reset',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule
  ],
  templateUrl: './password-reset.component.html',
  styleUrl: './password-reset.component.css'
})
export class PasswordResetComponent implements OnInit {
  passwordResetFrm: FormGroup;
  loading: boolean = false;
  token!: string;
  student_id!: number;
  errors: any = {};
  passwordStrength: string = '';
  passwordsMatch: boolean = true;
  passwordSameAsEmail: boolean = false;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient,
    private toastr: ToastrService
  ) {
    this.passwordResetFrm = this.fb.group({
      password: ['', [Validators.required, Validators.minLength(8)]],
      password_confirmation: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.token = params['token'];
      this.student_id = +params['student_id'];
    });

    this.passwordResetFrm.valueChanges.subscribe(() => {
      this.validatePasswordStrength();
      this.validatePasswordConfirmation();
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

  onFuncResetPassword() {
    if (this.passwordResetFrm.invalid) {
      this.toastr.error('Please fill in the form correctly', '', { timeOut: 2000 });
      return;
    }

    const data = {
      token: this.token,
      student_id: this.student_id,
      password: this.passwordResetFrm.value.password,
      password_confirmation: this.passwordResetFrm.value.password_confirmation
    };

    this.loading = true;
    this.http.post('http://127.0.0.1:8000/api/authentication-sub-system/student-password-reset-via-email/password/reset', data)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          this.loading = false;
          if (error.status === 400) {
            this.toastr.error('Invalid or expired password reset token', '', { timeOut: 2000 });
          } else {
            this.toastr.error('Password reset failed. Please try again.', '', { timeOut: 2000 });
          }
          return throwError(error);
        })
      )
      .subscribe(
        (response: any) => {
          this.toastr.success('Password reset successfully!', '', { timeOut: 2000 });
          this.router.navigate(['/app-student/authentication-sub-system/studentLogin']);
        },
        (error: any) => {
          this.loading = false;
          this.toastr.error('Password reset failed. Please try again.', '', { timeOut: 2000 });
        }
      );
  }

  validatePasswordStrength() {
    const password = this.passwordResetFrm.get('password')?.value || '';
    if (password === '') {
      this.passwordStrength = '';
      return;
    }

    const hasLetters = /[a-zA-Z]/.test(password);
    const hasNumbers = /[0-9]/.test(password);
    const hasSpecial = /[!@#\$%\^&\*]/.test(password);

    if (!hasLetters || !hasNumbers || !hasSpecial) {
      this.passwordStrength = 'weak';
    } else if (password.length >= 16) {
      this.passwordStrength = 'strong';
    } else if (password.length >= 8) {
      this.passwordStrength = 'medium';
    } else {
      this.passwordStrength = 'weak';
    }

    this.checkPasswordSameAsEmail();
  }

  checkPasswordSameAsEmail() {
    const password = this.passwordResetFrm.get('password')?.value || '';
    const email = this.passwordResetFrm.get('email')?.value || '';
    if (password === email) {
      this.passwordSameAsEmail = true;
      this.toastr.error('The password cannot be the same as the email.', '', { timeOut: 2000 });
    } else {
      this.passwordSameAsEmail = false;
    }
  }

  validatePasswordConfirmation() {
    const password = this.passwordResetFrm.get('password')?.value || '';
    const password_confirmation = this.passwordResetFrm.get('password_confirmation')?.value || '';
    this.passwordsMatch = password === password_confirmation;
  }
}
