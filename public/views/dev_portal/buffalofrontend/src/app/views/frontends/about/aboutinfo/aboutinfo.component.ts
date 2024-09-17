import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RouterModule } from '@angular/router';

interface AboutInfo {
  id: number;
  about_image_path: string;
  title: string;
  description: string;
  who_we_are: string;
  our_mission: string;
  created_by: string;
  created_at: string;
  updated_by: string | null;
  updated_at: string | null;
}

@Component({
  selector: 'app-aboutinfo',
  standalone: true,
  imports: [
    RouterModule,
    CommonModule
  ],
  templateUrl: './aboutinfo.component.html',
  styleUrls: ['./aboutinfo.component.css']
})
export class AboutinfoComponent implements OnInit {
  aboutInfo: AboutInfo | null = null;
  loading: boolean = true;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchAboutInfo();
  }

  fetchAboutInfo(): void {
    this.http.get<AboutInfo[]>('http://127.0.0.1:8000/api/site-information-sub-system/about/about-info')
      .subscribe(
        (data) => {
          console.log('Fetched about info:', data);
          this.aboutInfo = data[0];
          this.loading = false;
        },
        (error) => {
          console.error('Error fetching about info', error);
          this.loading = false;
        }
      );
  }
}
