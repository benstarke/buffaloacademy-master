import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-buffalo-newsletter',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule
  ],
  templateUrl: './buffalo-newsletter.component.html',
  styleUrl: './buffalo-newsletter.component.css'
})
export class BuffaloNewsletterComponent {

}
