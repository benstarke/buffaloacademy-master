import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';


import { FormsModule, ReactiveFormsModule, FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { DxButtonModule, DxTextBoxModule, DxPopupModule, DxScrollViewModule } from 'devextreme-angular';
import { debounceTime, Subject, Subscription, throwError, TimeoutError, of } from 'rxjs';
import { catchError, timeout, delay, switchMap } from 'rxjs/operators';


interface Contact {
  id: number;
  name: string;
  email: string;
  subject: string;
  message: string;
  created_by: string;
  created_at: string;
  updated_by: string | null;
  updated_at: string | null;
}

interface ContactInfo {
  id: number;
  contact_image_path: string;
  title: string;
  description: string;
  created_by: string;
  created_at: string;
  updated_by: string | null;
  updated_at: string | null;
}

interface BranchInfo {
  id: number;
  name: string;
  description: string;
  initial: string;
  branch_icon_id: number;
  created_by: string;
  created_at: string;
  updated_by: string | null;
  updated_at: string | null;
}

interface IconInfo {
  id: number;
  name: string;
  description: string | null;
  code: string | null;
  is_enabled: boolean | null;
  icon: string;
  created_by: string;
  created_at: string | null;
  updated_by: string | null;
  updated_at: string | null;
}

interface AddressInfo {
  id: number;
  address_icon_id: number;
  street_address_name: string;
  city: string;
  country: string;
  created_by: string;
  created_at: string;
  updated_by: string | null;
  updated_at: string | null;
}

interface PhoneInfo {
  id: number;
  phone_icon_id: number;
  company_phone_number: string;
  created_by: string;
  created_at: string;
  updated_by: string | null;
  updated_at: string | null;
}

interface EmailInfo {
  id: number;
  email_icon_id: number;
  company_email: string;
  created_by: string;
  created_at: string | null;
  updated_by: string | null;
  updated_at: string | null;
}

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [
    RouterModule, 
    CommonModule, 
    FormsModule,
    ReactiveFormsModule,
    DxButtonModule,
    DxTextBoxModule,
    DxPopupModule,
    DxScrollViewModule
  ],
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit, OnDestroy {
  contactInfo: ContactInfo | null = null;
  branches: BranchInfo[] = [];
  icons: IconInfo[] = [];
  addressInfo: AddressInfo[] = [];
  phoneInfo: PhoneInfo[] = [];
  // phoneInfo: PhoneInfo | null = null;
  emailInfo: EmailInfo | null = null;
  loading: boolean = true;

  contactInfoLoaded: boolean = false;
  branchesLoaded: boolean = false;
  iconsLoaded: boolean = false;
  addressInfoLoaded: boolean = false;
  phoneInfoLoaded: boolean = false;
  emailInfoLoaded: boolean = false;

  // contact form submission
  loadingContactFormSubmit: boolean = false;
  contactForm: FormGroup;
  emailValid: boolean = true;
  emailCheck$ = new Subject<string>();
  connectionStatus: boolean = navigator.onLine;

  private onlineEventSubscription: EventListenerOrEventListenerObject;
  private offlineEventSubscription: EventListenerOrEventListenerObject;


  constructor(
    private http: HttpClient,
    private router: Router,
    private toastr: ToastrService,
    private cd: ChangeDetectorRef,
    private fb: FormBuilder
  ) {
    this.contactForm = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      subject: ['', [Validators.maxLength(150)]],
      message: ['', [Validators.maxLength(1000)]]
    });

    this.emailCheck$.pipe(debounceTime(500)).subscribe(email => this.validateEmail(email));

    this.onlineEventSubscription = () => {
      this.connectionStatus = true;
      this.toastr.info('You are back online!', '', { timeOut: 2000 });
      this.cd.detectChanges();
    };

    this.offlineEventSubscription = () => {
      this.connectionStatus = false;
      this.toastr.error('You are offline. Please check your internet connection.', '', { timeOut: 2000 });
      this.cd.detectChanges();
    };
  }

  ngOnInit(): void {
    this.fetchContactInfo();
    this.fetchBranches();
    this.fetchIcons();
    this.fetchAddressInfo();
    this.fetchPhoneInfo();
    this.fetchEmailInfo();
    // contact form submission
    this.updateConnectionStatus();
    window.addEventListener('online', this.onlineEventSubscription);
    window.addEventListener('offline', this.offlineEventSubscription);

    if (this.connectionStatus) {
      this.toastr.success('You are online!', '', { timeOut: 2000 });
    } else {
      this.toastr.error('You are offline. Please check your internet connection.', '', { timeOut: 2000 });
    }

    this.cd.detectChanges();
  }

  fetchContactInfo(): void {
    this.http.get<ContactInfo[]>('http://127.0.0.1:8000/api/site-information-sub-system/contact/company-branch-info')
      .subscribe(
        (data) => {
          console.log('Fetched contact info:', data);
          this.contactInfo = data[0];
          this.contactInfoLoaded = true;
          this.checkLoading();
        },
        (error) => {
          console.error('Error fetching contact info', error);
          this.contactInfoLoaded = true;
          this.checkLoading();
        }
      );
  }

  fetchBranches(): void {
    this.http.get<BranchInfo[]>('http://127.0.0.1:8000/api/site-information-sub-system/contact/company-branches')
      .subscribe(
        (data) => {
          console.log('Fetched branches:', data);
          this.branches = data.slice(0, 3);
          this.branchesLoaded = true;
          this.checkLoading();
        },
        (error) => {
          console.error('Error fetching branches', error);
          this.branchesLoaded = true;
          this.checkLoading();
        }
      );
  }

  fetchIcons(): void {
    this.http.get<IconInfo[]>('http://127.0.0.1:8000/api/site-information-sub-system/general-system-layout/icons-info')
      .subscribe(
        (data) => {
          console.log('Fetched icons:', data);
          this.icons = data;
          this.iconsLoaded = true;
          this.checkLoading();
        },
        (error) => {
          console.error('Error fetching icons', error);
          this.iconsLoaded = true;
          this.checkLoading();
        }
      );
  }

  fetchAddressInfo(): void {
    this.http.get<AddressInfo[]>('http://127.0.0.1:8000/api/site-information-sub-system/contact/address-info')
      .subscribe(
        (data) => {
          console.log('Fetched address info:', data);
          this.addressInfo = data;
          this.addressInfoLoaded = true;
          this.checkLoading();
        },
        (error) => {
          console.error('Error fetching address info', error);
          this.addressInfoLoaded = true;
          this.checkLoading();
        }
      );
  }

  fetchPhoneInfo(): void {
    this.http.get<PhoneInfo[]>('http://127.0.0.1:8000/api/site-information-sub-system/contact/contact-info')
      .subscribe(
        (data) => {
          console.log('Fetched phone info:', data);
          this.phoneInfo = data;
          this.phoneInfoLoaded = true;
          this.checkLoading();
        },
        (error) => {
          console.error('Error fetching phone info', error);
          this.phoneInfoLoaded = true;
          this.checkLoading();
        }
      );
  }

  fetchEmailInfo(): void {
    this.http.get<EmailInfo[]>('http://127.0.0.1:8000/api/site-information-sub-system/contact/email-info')
      .subscribe(
        (data) => {
          console.log('Fetched email info:', data);
          this.emailInfo = data[0];
          this.emailInfoLoaded = true;
          this.checkLoading();
        },
        (error) => {
          console.error('Error fetching email info', error);
          this.emailInfoLoaded = true;
          this.checkLoading();
        }
      );
  }

  getIconClass(iconId: number): string {
    const icon = this.icons.find(i => i.id === iconId);
    return icon ? icon.icon : '';
  }

  checkLoading(): void {
    this.loading = !(
      this.contactInfoLoaded &&
      this.branchesLoaded &&
      this.iconsLoaded &&
      this.addressInfoLoaded &&
      this.phoneInfoLoaded &&
      this.emailInfoLoaded
    );
  }
  //  contact form submission
  ngOnDestroy(): void {
    window.removeEventListener('online', this.onlineEventSubscription);
    window.removeEventListener('offline', this.offlineEventSubscription);
  }

  private updateConnectionStatus = () => {
    this.connectionStatus = navigator.onLine;
  };

  onSubmit() {
    if (this.contactForm.invalid) {
      this.toastr.error('Please fill in all required fields correctly.', '', { timeOut: 2000 });
      return;
    }

    this.loadingContactFormSubmit = true;  
    this.http.post('http://127.0.0.1:8000/api/site-information-sub-system/contact/contacts', this.contactForm.value)
      .pipe(
        timeout(10000),
        catchError((error: HttpErrorResponse) => {
          this.loadingContactFormSubmit = false;
          if (error instanceof TimeoutError) {
            this.toastr.error('Request timed out. Please check your internet connection.', '', { timeOut: 3000 });
          } else if (!navigator.onLine) {
            this.toastr.error('Request failed due to a network issue. Please try again.', '', { timeOut: 3000 });
          } else {
            this.toastr.error('An error occurred. Please try again.', '', { timeOut: 3000 });
          }
          return throwError(error);
        })
      )
      .subscribe(
        (response: any) => {
          this.toastr.success('Message sent successfully!', '', { timeOut: 2000 });
          this.contactForm.reset();
        },
        (error: any) => {
          this.toastr.error('An error occurred. Please try again.', '', { timeOut: 2000 });
        }
      ).add(() => {
        this.loadingContactFormSubmit = false;
      });
  }

  validateEmail(email: string): void {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    this.emailValid = emailPattern.test(email);
    if (!this.emailValid) {
      this.toastr.error('Please enter a valid email address.', '', { timeOut: 2000 });
    }
  }
}



















// import { Component, OnInit } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { CommonModule } from '@angular/common';
// import { RouterModule } from '@angular/router';

// interface ContactInfo {
//   id: number;
//   contact_image_path: string;
//   title: string;
//   description: string;
//   created_by: string;
//   created_at: string;
//   updated_by: string | null;
//   updated_at: string | null;
//   altered_by: string | null;
//   altered_on: string | null;
// }

// interface BranchInfo {
//   id: number;
//   name: string;
//   description: string;
//   initial: string;
//   branch_icon_id: number;
//   created_by: string;
//   created_at: string;
//   updated_by: string | null;
//   updated_at: string | null;
//   altered_by: string | null;
//   altered_on: string | null;
// }

// interface IconInfo {
//   id: number;
//   name: string;
//   description: string | null;
//   code: string | null;
//   is_enabled: boolean | null;
//   icon: string;
//   created_by: string;
//   created_at: string | null;
//   updated_by: string | null;
//   updated_at: string | null;
//   altered_by: string | null;
//   altered_on: string | null;
// }

// @Component({
//   selector: 'app-contact',
//   standalone: true,
//   imports: [RouterModule, CommonModule],
//   templateUrl: './contact.component.html',
//   styleUrls: ['./contact.component.css']
// })
// export class ContactComponent implements OnInit {
//   contactInfo: ContactInfo | null = null;
//   branches: BranchInfo[] = [];
//   icons: IconInfo[] = [];
//   loading: boolean = true;

//   contactInfoLoaded: boolean = false;
//   branchesLoaded: boolean = false;
//   iconsLoaded: boolean = false;

//   constructor(private http: HttpClient) {}

//   ngOnInit(): void {
//     this.fetchContactInfo();
//     this.fetchBranches();
//     this.fetchIcons();
//   }

//   fetchContactInfo(): void {
//     this.http.get<ContactInfo[]>('http://127.0.0.1:8000/api/site-information-sub-system/contact/company-branch-info')
//       .subscribe(
//         (data) => {
//           console.log('Fetched contact info:', data);
//           this.contactInfo = data[0];
//           this.contactInfoLoaded = true;
//           this.checkLoading();
//         },
//         (error) => {
//           console.error('Error fetching contact info', error);
//           this.contactInfoLoaded = true;
//           this.checkLoading();
//         }
//       );
//   }

//   fetchBranches(): void {
//     this.http.get<BranchInfo[]>('http://127.0.0.1:8000/api/site-information-sub-system/contact/company-branches')
//       .subscribe(
//         (data) => {
//           console.log('Fetched branches:', data);
//           this.branches = data.slice(0, 3);
//           this.branchesLoaded = true;
//           this.checkLoading();
//         },
//         (error) => {
//           console.error('Error fetching branches', error);
//           this.branchesLoaded = true;
//           this.checkLoading();
//         }
//       );
//   }

//   fetchIcons(): void {
//     this.http.get<IconInfo[]>('http://127.0.0.1:8000/api/site-information-sub-system/general-system-layout/icons-info')
//       .subscribe(
//         (data) => {
//           console.log('Fetched icons:', data);
//           this.icons = data;
//           this.iconsLoaded = true;
//           this.checkLoading();
//         },
//         (error) => {
//           console.error('Error fetching icons', error);
//           this.iconsLoaded = true;
//           this.checkLoading();
//         }
//       );
//   }

//   getIconClass(branchIconId: number): string {
//     const icon = this.icons.find(i => i.id === branchIconId);
//     return icon ? icon.icon : '';
//   }

//   checkLoading(): void {
//     this.loading = !(this.contactInfoLoaded && this.branchesLoaded && this.iconsLoaded);
//   }
// }







