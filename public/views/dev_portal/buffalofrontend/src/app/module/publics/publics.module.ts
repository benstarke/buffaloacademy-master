import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TimeAgoPipe } from '../../views/publics/blog-list/time-ago.pipe';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    TimeAgoPipe
  ]
})
export class PublicsModule { }
