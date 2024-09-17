import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PartnersinfoComponent } from '../partnersinfo/partnersinfo.component';

@Component({
  selector: 'app-buffalo-testimonials',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    PartnersinfoComponent
  ],
  templateUrl: './buffalo-testimonials.component.html',
  styleUrl: './buffalo-testimonials.component.css'
})
export class BuffaloTestimonialsComponent {

}
