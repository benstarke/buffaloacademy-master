// auth.service.ts
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable, of, throwError, BehaviorSubject } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { tap, catchError, timeout, delay, switchMap } from 'rxjs/operators';
import { TimeoutError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isLoggedIn: boolean = false;
  userCountryOfOrigin: string | undefined;
  private loginStatus = new BehaviorSubject<boolean>(this.isLoggedIn);
  loginStatus$ = this.loginStatus.asObservable();

  constructor(
    private myRoute: Router,
    private router: Router,
    public toastr: ToastrService,
    private http: HttpClient
  ) {}

  logout(): Promise<any> {
    const token = localStorage.getItem('token');
    if (!navigator.onLine) {
      this.toastr.error('You are offline. Please check your internet connection.', '', { timeOut: 3000 });
      return Promise.reject(new Error('No internet connection'));
    }

    return of(null).pipe(
      // delay(1000),
      switchMap(() =>
        this.http.post('http://127.0.0.1:8000/api/authentication-sub-system/student/logout', {}, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
      ),
      timeout(10000),
      tap(response => {
        console.log('Logout response:', response);
      }),
      catchError((error: HttpErrorResponse) => {
        if (error instanceof TimeoutError) {
          this.toastr.error('Request timed out. Please check your internet connection.', '', { timeOut: 3000 });
        } else if (!navigator.onLine) {
          this.toastr.error('Logout failed due to a network issue. Please try again.', '', { timeOut: 3000 });
        } else {
          console.error('Logout error:', error);
        }
        return throwError(error);
      })
    ).toPromise();
  }

  clearToken() {
    localStorage.removeItem('token');
  }

  handleLogoutSuccess(): void {
    localStorage.clear();
    this.toastr.success('Logged out successfully');
    this.isLoggedIn = false;
    this.loginStatus.next(this.isLoggedIn); // Notify observers of login status change
    this.router.navigate(['/']);
  }

  handleLogoutError(): void {
    this.toastr.error('Logout failed. Please try again.');
  }

  checkAuthenticationState() {
    const token = localStorage.getItem('token');
    if (token) {
      this.isLoggedIn = true;
      this.loginStatus.next(this.isLoggedIn); // Notify observers of login status change
    }
  }

  login(email: string, password: string, rememberMe: boolean): Observable<any> {
    return this.http.post('http://127.0.0.1:8000/api/authentication-sub-system/student/login', {
      email,
      password,
      remember: rememberMe
    }).pipe(
      tap((response: any) => {
        localStorage.setItem('token', response.authorization.token);
        localStorage.setItem('type', response.authorization.type);
        localStorage.setItem('student_id', response.authorization.student_id);
        localStorage.setItem('role_id', response.authorization.role_id);
        this.isLoggedIn = true;
        this.loginStatus.next(this.isLoggedIn); // Notify observers of login status change
      }),
      catchError((error: HttpErrorResponse) => {
        console.error('Login error:', error);
        return throwError(error);
      })
    );
  }
}
