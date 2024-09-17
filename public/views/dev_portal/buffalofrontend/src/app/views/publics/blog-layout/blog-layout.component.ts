import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from '../../frontends/navbar/navbar.component';
import { FooterComponent } from '../../frontends/footer/footer.component';

@Component({
  selector: 'app-blog-layout',
  standalone: true,
  imports: [
    RouterModule,
    NavbarComponent,
    FooterComponent
  ],
  templateUrl: './blog-layout.component.html',
  styleUrl: './blog-layout.component.css'
})
export class BlogLayoutComponent {

}
