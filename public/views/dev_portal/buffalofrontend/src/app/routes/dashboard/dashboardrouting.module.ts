// import { NgModule } from '@angular/core';
// import { RouterModule, Routes } from '@angular/router';

// // dashboard components
// import { MaindashboardComponent } from '../../views/dashboard/blogmodule/maindashboard/maindashboard.component';
// import { LayoutComponent as DashboardLayoutComponent } from '../../views/dashboard/blogmodule/layout/layout.component';

// // category submodule components
// import { LayoutComponent as CategoryLayoutComponent } from '../../views/dashboard/blogmodule/category/layout/layout.component';
// import { CategoryinfoComponent } from '../../views/dashboard/blogmodule/category/categoryinfo/categoryinfo.component';
// import { CategorymgmtComponent } from '../../views/dashboard/blogmodule/category/categorymgmt/categorymgmt.component';

// import { LayoutComponent as BlogLayoutComponent } from '../../views/dashboard/blogmodule/blog/layout/layout.component';
// import { BloginfoComponent } from '../../views/dashboard/blogmodule/blog/bloginfo/bloginfo.component';
// import { BlogmgmtComponent } from '../../views/dashboard/blogmodule/blog/blogmgmt/blogmgmt.component';

// import { LayoutComponent as TagLayoutComponent } from '../../views/dashboard/blogmodule/tag/layout/layout.component';
// import { TagmgmtComponent } from '../../views/dashboard/blogmodule/tag/tagmgmt/tagmgmt.component';
// import { TaginfoComponent } from '../../views/dashboard/blogmodule/tag/taginfo/taginfo.component';

// export const dashboardRoutes: Routes = [
//   {
//     path: 'admin-buffalo', 
//     redirectTo: '/admin-buffalo/system-management-dashboard', 
//     pathMatch: 'full'
//   },
//   {
//     path: 'admin-buffalo',
//     component: DashboardLayoutComponent,
//     children: [
//       {
//         path: '',
//         component: MaindashboardComponent
//       },
//       {
//         path: 'main-dashboard',
//         component: MaindashboardComponent
//       },
//       {
//         path: 'system-management/dashboard-blogs',
//         component: BlogLayoutComponent,
//         children: [
//           {
//             path: '',
//             component: BloginfoComponent
//           },
//           {
//             path: 'blog-information',
//             component: BloginfoComponent
//           },
//           {
//             path: 'blog-management',
//             component: BlogmgmtComponent
//           }
//         ]
//       },
//       {
//         path: 'system-management/dashboard-blog-tags',
//         component: TagLayoutComponent,
//         children: [
//           {
//             path: '',
//             component: TaginfoComponent
//           },
//           {
//             path: 'tag-information',
//             component: TaginfoComponent
//           },
//           {
//             path: 'tag-management',
//             component: TagmgmtComponent
//           }
//         ]
//       },
//       {
//         path: 'system-management/dashboard-blog-categories',
//         component: CategoryLayoutComponent,
//         children: [
//           {
//             path: '',
//             component: CategoryinfoComponent
//           },
//           {
//             path: 'category-information',
//             component: CategoryinfoComponent
//           },
//           {
//             path: 'category-management',
//             component: CategorymgmtComponent
//           }
//         ]
//       }
//     ]
//   }
// ];

// @NgModule({
//   imports: [RouterModule.forChild(dashboardRoutes)],
//   exports: [RouterModule]
// })
// export class DashboardRoutingModule { }
