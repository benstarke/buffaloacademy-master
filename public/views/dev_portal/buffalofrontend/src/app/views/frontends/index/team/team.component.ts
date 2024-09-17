import { CommonModule } from '@angular/common';
import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { ToastrService } from 'ngx-toastr';



interface TeamInfo {
  id: number;
  name_en: string;
  name_bn: string;
  contact_en: string;
  contact_bn: string;
  email: string;
  role_id: string;
  bio: string;
  title: string;
  designation: string;
  image: string;
  status: string;
  language: string;
  // newly added
  instagram: string | null;
  linkedin: string | null;
  twitter: string | null;
  youtube: string | null;
  facebook: string | null;
  
  created_by: string;
  created_at: string;
  updated_by: string | null;
  updated_at: string | null;
}


@Component({
  selector: 'app-team',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule
  ],
  templateUrl: './team.component.html',
  styleUrl: './team.component.css'
})
export class TeamComponent implements OnInit, OnDestroy {

  loading: boolean = true;
  // teamInfo: TeamInfo | null = null;
  teamInfo: TeamInfo[] | null = null;

  teamInfoLoaded: boolean = false;

  instructorInfoLoaded: boolean = false;



  // internet connectivity
  connectionStatus: boolean = navigator.onLine;
  private onlineEventSubscription: EventListenerOrEventListenerObject;
  private offlineEventSubscription: EventListenerOrEventListenerObject;

  constructor(
    private http: HttpClient,
    private toastr: ToastrService,
    private cd: ChangeDetectorRef,
  ) {

    this.onlineEventSubscription = () => {
      this.connectionStatus = true;
      // this.toastr.info('You are back online!', '', { timeOut: 2000 });
      this.cd.detectChanges();
    };

    this.offlineEventSubscription = () => {
      this.connectionStatus = false;
      // this.toastr.error('You are offline. Please check your internet connection.', '', { timeOut: 2000 });
      this.cd.detectChanges();
    };
  }

  ngOnInit(): void {
    this.fetchTeamInfo();
    
    // network connectivity
    this.updateConnectionStatus();
    window.addEventListener('online', this.onlineEventSubscription);
    window.addEventListener('offline', this.offlineEventSubscription);

    if (this.connectionStatus) {
      // this.toastr.success('You are online!', '', { timeOut: 2000 });
    } else {
      // this.toastr.error('You are offline. Please check your internet connection.', '', { timeOut: 2000 });
    }

    this.cd.detectChanges();
  }


   // network connectivity
  ngOnDestroy(): void {
    window.removeEventListener('online', this.onlineEventSubscription);
    window.removeEventListener('offline', this.offlineEventSubscription);
  }

  private updateConnectionStatus = () => {
    this.connectionStatus = navigator.onLine;
  };


  fetchTeamInfo(): void {
    this.http.get<TeamInfo[]>('http://127.0.0.1:8000/api/site-information-sub-system/general-system-layout/team')
      .subscribe(
        (data) => {
          console.log('Fetched team info:', data);
          if (data.length > 0) {
            this.teamInfo = data; // Assign the array of TeamInfo
          } else {
            this.teamInfo = null; // Set to null if no data
          }
          this.teamInfoLoaded = true;
          this.checkLoading();
        },
        (error) => {
          console.error('Error fetching team info', error);
          this.teamInfo = null; // Set to null on error
          this.teamInfoLoaded = true;
          this.checkLoading();
        }
      );
}

  checkLoading(): void {
    this.loading = !(
      // this.simpleLearningStepsImageLoaded &&
      this.teamInfoLoaded
    );
  }


  getInstagramUrl(team: TeamInfo): string {
    return this.normalizeUrl(team.instagram ?? undefined, 'https://www.instagram.com/');
}

  
  getFacebookUrl(team: TeamInfo): string {
    return this.normalizeUrl(team.facebook ?? undefined, 'https://www.facebook.com/');
  }
  
  getLinkedInUrl(team: TeamInfo): string {
    return this.normalizeUrl(team.linkedin ?? undefined, 'https://www.linkedin.com/');
  }
  
  getTwitterUrl(team: TeamInfo): string {
    return this.normalizeUrl(team.twitter ?? undefined, 'https://x.com/home?lang=en');
  }
  
  getYoutubeUrl(team: TeamInfo): string {
    return this.normalizeUrl(team.youtube ?? undefined, 'https://www.youtube.com/');
  }
  
  // Helper method to normalize URLs
  private normalizeUrl(urlOrUsername: string | undefined, baseUrl: string): string {
    if (urlOrUsername) {
      // Normalize the URL by checking both 'https://' and 'www.'
      if (urlOrUsername.startsWith(baseUrl) || urlOrUsername.startsWith(baseUrl.replace('https://', 'www.'))) {
        // If it starts with 'www.', prepend 'https://'
        if (urlOrUsername.startsWith(baseUrl.replace('https://', 'www.'))) {
          return `https://${urlOrUsername}`;
        }
        return urlOrUsername;
      } else {
        // Otherwise, treat it as a username and construct the URL
        return `${baseUrl}${urlOrUsername}`;
      }
    } else {
      // Default URL when no input is available
      switch (baseUrl) {
        case 'https://www.instagram.com/':
          return 'https://www.instagram.com/';
        case 'https://www.facebook.com/':
          return 'https://www.facebook.com/';
        case 'https://www.linkedin.com/':
          return 'https://www.linkedin.com/';
        case 'https://x.com/home?lang=en':
          return 'https://x.com/home?lang=en';
        case 'https://www.youtube.com/':
          return 'https://www.youtube.com/';
        default:
          return baseUrl;
      }
    }
  }

}
