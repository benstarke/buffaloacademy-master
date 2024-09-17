import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FooterComponent } from '../footer/footer.component';
import { NavbarComponent } from '../navbar/navbar.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-frontend-layout',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    FooterComponent,
    NavbarComponent
  ],
  styleUrls: ['./frontend-layout.component.css'],
  templateUrl: './frontend-layout.component.html',
})
export class FrontendLayoutComponent {

}
