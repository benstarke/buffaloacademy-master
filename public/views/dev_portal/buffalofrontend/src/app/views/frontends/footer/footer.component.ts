import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

interface FooterInfo {
  id: number;
  description: string;
  year: string;
  created_by: string;
  created_at: string;
  updated_by: string | null;
  updated_at: string | null;
  title: string;
  logo: string;
}

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [
    RouterModule,
    CommonModule,
  ],
  styleUrls: ['./footer.component.css'],
  templateUrl: './footer.component.html',
})
export class FooterComponent implements OnInit {
  footerInfo: FooterInfo | null = null;
  loading: boolean = true;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchFooterInfo();
  }


  fetchFooterInfo(): void {
    this.http.get<{ success: boolean, data: FooterInfo[] }>('http://127.0.0.1:8000/api/site-information-sub-system/general-system-layout/footer-info')
      .subscribe(
        (response) => {
          console.log('Fetched footer info:', response.data); // Log the fetched data to the console
          if (response.success && response.data.length > 0) {
            this.footerInfo = response.data[0]; // Assuming the first record in the data array is the required footer info
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
  
  
}
