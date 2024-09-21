import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule
  ],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  // States to manage the collapse/expand functionality
  isStatisticsMenuOpen: boolean = false;
  isRolesMenuOpen: boolean = false;
  isCoursesMenuOpen: boolean = false;
  isBlogsMenuOpen: boolean = false;
  isFinancialMenuOpen: boolean = false;
  isFinancialStatisticsMenuOpen: boolean = false;
  isRolesPermissionsMenuOpen: boolean = false;
  isUserManagementMenuOpen: boolean = false;
  isCourseManagementMenuOpen: boolean = false;
  isSystemInfoMgmtMenuOpen: boolean = false;  
  isIndexHomeMenuOpen: boolean = false;
  isGeneralPagesMenuOpen: boolean = false;
  isContactPageMenuOpen: boolean = false;
  isSystemConfigsWorkflowMenuOpen: boolean = false;
  isSystemFilesManagementMenuOpen: boolean = false;

  isStudentsMenuOpen: boolean = false;
  isInstructorsMenuOpen: boolean = false;

  isCoursesFilesMenuOpen: boolean = false;
  isContentMaterialsMenuOpen: boolean = false;

  isBlogPostsMenuOpen: boolean = false;
  isUsersFilesMenuOpen: boolean = false;
  isSystemMenuOpen: boolean = false;
  isHomeMenuOpen: boolean = false;

  isSystemActivityLogsMenuOpen: boolean = false;
  isBlogStatusMenuOpen: boolean = false;


  
  

  // Method to toggle the Statistics menu
  toggleStatisticsMenu() {
    this.isStatisticsMenuOpen = !this.isStatisticsMenuOpen;
  }

  // Method to toggle the Roles menu
  toggleRolesMenu() {
    this.isRolesMenuOpen = !this.isRolesMenuOpen;
  }

  // Method to toggle the Courses menu
  toggleCoursesMenu() {
    this.isCoursesMenuOpen = !this.isCoursesMenuOpen;
  }

  // Method to toggle the Blogs menu
  toggleBlogsMenu() {
    this.isBlogsMenuOpen = !this.isBlogsMenuOpen;
  }

  // Method to toggle the Financial menu
  toggleFinancialMenu() {
    this.isFinancialMenuOpen = !this.isFinancialMenuOpen;
  }

  // Method to toggle the FinancialStatistics menu
  toggleFinancialStatisticsMenu() {
    this.isFinancialStatisticsMenuOpen = !this.isFinancialStatisticsMenuOpen;
  }

  // Method to toggle the RolesPermissions menu
  toggleRolesPermissionsMenu() {
    this.isRolesPermissionsMenuOpen = !this.isRolesPermissionsMenuOpen;
  }

  // Method to toggle the UserManagement menu
  toggleUserManagementMenu() {
    this.isUserManagementMenuOpen = !this.isUserManagementMenuOpen;
  }

  // Method to toggle the CourseManagement menu
  toggleCourseManagementMenu() {
    this.isCourseManagementMenuOpen = !this.isCourseManagementMenuOpen;
  }

  // Method to toggle the SystemInfoMgmt menu
  toggleSystemInfoMgmtMenu() {
    this.isSystemInfoMgmtMenuOpen = !this.isSystemInfoMgmtMenuOpen;
  }

  // Method to toggle the IndexHome menu
  toggleIndexHomeMenu() {
    this.isIndexHomeMenuOpen = !this.isIndexHomeMenuOpen;
  }

  // Method to toggle the GeneralPages menu
  toggleGeneralPagesMenu() {
    this.isGeneralPagesMenuOpen = !this.isGeneralPagesMenuOpen;
  }

  // Method to toggle the ContactPages menu
  toggleContactPageMenu() {
    this.isContactPageMenuOpen = !this.isContactPageMenuOpen;
  }

  // Method to toggle the SystemConfigsWorkflow menu
  toggleSystemConfigsWorkflowMenu() {
    this.isSystemConfigsWorkflowMenuOpen = !this.isSystemConfigsWorkflowMenuOpen;
  }

  // Method to toggle the SystemFilesManagement menu
  toggleSystemFilesManagementMenu() {
    this.isSystemFilesManagementMenuOpen = !this.isSystemFilesManagementMenuOpen;
  }

  // System Files Management

  // Method to toggle the Students menu
  toggleStudentsMenu() {
    this.isStudentsMenuOpen = !this.isStudentsMenuOpen;
  }

  // Method to toggle the Instructors menu
  toggleInstructorsMenu() {
    this.isInstructorsMenuOpen = !this.isInstructorsMenuOpen;
  }

  // Method to toggle the CoursesFiles menu
  toggleCoursesFilesMenu() {
    this.isCoursesFilesMenuOpen = !this.isCoursesFilesMenuOpen;
  }

  // Method to toggle the ContentMaterials menu
  toggleContentMaterialsMenu() {
    this.isContentMaterialsMenuOpen = !this.isContentMaterialsMenuOpen;
  }

  // Method to toggle the BlogPosts menu
  toggleBlogPostsMenu() {
    this.isBlogPostsMenuOpen = !this.isBlogPostsMenuOpen;
  }

  // Method to toggle the UsersFiles menu
  toggleUsersFilesMenu() {
    this.isUsersFilesMenuOpen = !this.isUsersFilesMenuOpen;
  }

  // Method to toggle the System menu
  toggleSystemMenu() {
    this.isSystemMenuOpen = !this.isSystemMenuOpen;
  }

  // Method to toggle the Home menu
  toggleHomeMenu() {
    this.isHomeMenuOpen = !this.isHomeMenuOpen;
  }

  // Method to toggle the SystemActivityLogs menu
  toggleSystemActivityLogsMenu() {
    this.isSystemActivityLogsMenuOpen = !this.isSystemActivityLogsMenuOpen;
  }

  // Method to toggle the BlogStatus menu
  toggleBlogStatusMenu() {
    this.isBlogStatusMenuOpen = !this.isBlogStatusMenuOpen;
  }

}
