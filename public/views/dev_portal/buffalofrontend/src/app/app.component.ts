import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: true,
  imports: [
    RouterOutlet,
    CommonModule,
    RouterModule,
  ],
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'The Buffalo Academy | E-learning Platform';
}
