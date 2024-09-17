import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AboutinfoComponent } from '../aboutinfo/aboutinfo.component';
import { PartnersinfoComponent } from '../partnersinfo/partnersinfo.component';
import { TeamComponent } from '../team/team.component';

@Component({
  selector: 'app-about-layout',
  standalone: true,
  imports: [
    RouterModule,
    CommonModule,
    AboutinfoComponent,
    PartnersinfoComponent,
    TeamComponent
  ],
  templateUrl: './about-layout.component.html',
  styleUrl: './about-layout.component.css'
})
export class AboutLayoutComponent {

}
