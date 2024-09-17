import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-leftnav',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule
  ],
  templateUrl: './leftnav.component.html',
  styleUrl: './leftnav.component.css'
})
export class LeftnavComponent {

}
