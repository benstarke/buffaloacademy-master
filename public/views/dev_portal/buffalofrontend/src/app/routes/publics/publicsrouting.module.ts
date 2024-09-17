import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


// publics
import { BlogLayoutComponent } from '../../views/publics/blog-layout/blog-layout.component';
import { BlogListComponent } from '../../views/publics/blog-list/blog-list.component';
import { BlogDetailComponent } from '../../views/publics/blog-detail/blog-detail.component';
import { BlogTagComponent } from '../../views/publics/blog-tag/blog-tag.component';
import { BlogCategoryComponent } from '../../views/publics/blog-category/blog-category.component';



export const publicsRoutes: Routes = [
    // {
        // path: 'app-publics', redirectTo: '/app-publics/blog-list', pathMatch: 'full'
    // },
  {
    path: '',
    component: BlogLayoutComponent,
    children:[
    {
        path:'',
        component: BlogListComponent
    },
    // students dashboard
    {
      path:'blog_list',
      component: BlogListComponent
    },
    {
      path:'blog_detail/:title/:author/:id',
      component: BlogDetailComponent
    },
    {
        path:'blog_tag/:title/:tagId',
        component: BlogTagComponent
    },
    {
      path:'blog_category/:title/:categoryId',
      component: BlogCategoryComponent
    },
    

  ]
}]
@NgModule({
  imports: [ RouterModule.forChild(publicsRoutes)],
  exports: [RouterModule]
})

export class PublicsRoutingModule { }
