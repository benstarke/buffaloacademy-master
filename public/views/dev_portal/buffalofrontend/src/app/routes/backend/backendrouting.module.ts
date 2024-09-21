import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router'; LessonmaterialsLayoutComponent

// backend components
import { MainDashboardComponent } from '../../views/backend/main-layout/main-dashboard/main-dashboard.component';
import { AdminDashboardComponent } from '../../views/backend/main-layout/admin/admin-dashboard/admin-dashboard.component';
import { InstructorDashboardComponent } from '../../views/backend/main-layout/instructor/instructor-dashboard/instructor-dashboard.component';
import { SignupComponent } from '../../views/backend/main-layout/instructor/signup/signup.component';
import { SigninComponent } from '../../views/backend/main-layout/instructor/signin/signin.component';
import { LayoutComponent as DashboardLayoutComponent } from '../../views/backend/main-layout/layout/layout.component';
import { AuthLayoutComponent } from '../../views/student/auth/auth-layout/auth-layout.component';
import { PasswordResetComponent } from '../../views/student/auth/password-reset/password-reset.component';


// ROLES & PERMISSION MODULE

// Permission components
import { PermissionInfoComponent } from '../../views/backend/RolesPermissionsmodule/permission/permission-info/permission-info.component';
import { PermissionMgmtComponent } from '../../views/backend/RolesPermissionsmodule/permission/permission-mgmt/permission-mgmt.component';
import { PermissionLayoutComponent } from '../../views/backend/RolesPermissionsmodule/permission/permission-layout/permission-layout.component';

// Role component
import { RoleInfoComponent } from '../../views/backend/RolesPermissionsmodule/role/role-info/role-info.component';
import { RoleMgmtComponent } from '../../views/backend/RolesPermissionsmodule/role/role-mgmt/role-mgmt.component';
import { RoleLayoutComponent } from '../../views/backend/RolesPermissionsmodule/role/role-layout/role-layout.component';


// Events components
import { EventInfoComponent } from '../../views/backend/event/event-info/event-info.component';
import { EventMgmtComponent } from '../../views/backend/event/event-mgmt/event-mgmt.component';
import { EventLayoutComponent } from '../../views/backend/event/event-layout/event-layout.component';


// BLOG MODULE

// Blogs
import { LayoutComponent as BlogLayoutComponent   } from '../../views/backend/blogmodule/blog/layout/layout.component'; 
import { BloginfoComponent } from '../../views/backend/blogmodule/blog/bloginfo/bloginfo.component';
import { BlogmgmtComponent } from '../../views/backend/blogmodule/blog/blogmgmt/blogmgmt.component';

// Blog Tags
import { LayoutComponent as TagLayoutComponent } from '../../views/backend/blogmodule/tag/layout/layout.component';
import { TaginfoComponent } from '../../views/backend/blogmodule/tag/taginfo/taginfo.component';
import { TagmgmtComponent } from '../../views/backend/blogmodule/tag/tagmgmt/tagmgmt.component';

// Blog categories
import { LayoutComponent as CategoryLayoutComponent } from '../../views/backend/blogmodule/category/layout/layout.component';
import { CategoryinfoComponent } from '../../views/backend/blogmodule/category/categoryinfo/categoryinfo.component';
import { CategorymgmtComponent } from '../../views/backend/blogmodule/category/categorymgmt/categorymgmt.component';

// Blog status
import { LayoutComponent as StatusLayoutComponent } from '../../views/backend/blogmodule/status/layout/layout.component';
import { StatusinfoComponent } from '../../views/backend/blogmodule/status/statusinfo/statusinfo.component';
import { StatusmgmtComponent } from '../../views/backend/blogmodule/status/statusmgmt/statusmgmt.component';

// USER MANAGEMENT MODULE

// User components
import { UsersInfoComponent } from '../../views/backend/usermanagementmodule/users/users-info/users-info.component';
import { UsersMgmtComponent } from '../../views/backend/usermanagementmodule/users/users-mgmt/users-mgmt.component';
import { UsersLayoutComponent } from '../../views/backend/usermanagementmodule/users/users-layout/users-layout.component';


// Students components
import { StudentsInfoComponent } from '../../views/backend/usermanagementmodule/students/students-info/students-info.component';
import { StudentsMgmtComponent } from '../../views/backend/usermanagementmodule/students/students-mgmt/students-mgmt.component';
import { StudentsLayoutComponent } from '../../views/backend/usermanagementmodule/students/students-layout/students-layout.component';


// Instructors components
import { InstructorsInfoComponent } from '../../views/backend/usermanagementmodule/instructors/instructors-info/instructors-info.component';
import { InstructorsMgmtComponent } from '../../views/backend/usermanagementmodule/instructors/instructors-mgmt/instructors-mgmt.component';
import { InstructorsLayoutComponent } from '../../views/backend/usermanagementmodule/instructors/instructors-layout/instructors-layout.component';


// COURSE MANAGEMENT MODULE

// Course type
import { CoursetypeInfoComponent } from '../../views/backend/coursemodule/course-type/coursetype-info/coursetype-info.component';
import { CoursetypeMgmtComponent } from '../../views/backend/coursemodule/course-type/coursetype-mgmt/coursetype-mgmt.component';
import { CoursetypeLayoutComponent } from '../../views/backend/coursemodule/course-type/coursetype-layout/coursetype-layout.component';


// Course Tag
import { CoursetagInfoComponent } from '../../views/backend/coursemodule/course-tag/coursetag-info/coursetag-info.component';
import { CoursetagMgmtComponent } from '../../views/backend/coursemodule/course-tag/coursetag-mgmt/coursetag-mgmt.component';
import { CoursetagLayoutComponent } from '../../views/backend/coursemodule/course-tag/coursetag-layout/coursetag-layout.component';


// Course Difficulty
import { CoursedifficultyInfoComponent } from '../../views/backend/coursemodule/course-difficulty/coursedifficulty-info/coursedifficulty-info.component';
import { CoursedifficultyMgmtComponent } from '../../views/backend/coursemodule/course-difficulty/coursedifficulty-mgmt/coursedifficulty-mgmt.component';
import { CoursedifficultyLayoutComponent } from '../../views/backend/coursemodule/course-difficulty/coursedifficulty-layout/coursedifficulty-layout.component';

// Course Category
import { CoursecategoryInfoComponent } from '../../views/backend/coursemodule/course-category/coursecategory-info/coursecategory-info.component';
import { CoursecategoryMgmtComponent } from '../../views/backend/coursemodule/course-category/coursecategory-mgmt/coursecategory-mgmt.component';
import { CoursecategoryLayoutComponent } from '../../views/backend/coursemodule/course-category/coursecategory-layout/coursecategory-layout.component';

// Course Sub-category
import { CoursesubcategoryInfoComponent } from '../../views/backend/coursemodule/course-sub-category/coursesubcategory-info/coursesubcategory-info.component';
import { CoursesubcategoryMgmtComponent } from '../../views/backend/coursemodule/course-sub-category/coursesubcategory-mgmt/coursesubcategory-mgmt.component';
import { CoursesubcategoryLayoutComponent } from '../../views/backend/coursemodule/course-sub-category/coursesubcategory-layout/coursesubcategory-layout.component';


// App Currency
import { AppCurrenciesInfoComponent } from '../../views/backend/coursemodule/app-currencies/app-currencies-info/app-currencies-info.component';
import { AppCurrenciesMgmtComponent } from '../../views/backend/coursemodule/app-currencies/app-currencies-mgmt/app-currencies-mgmt.component';
import { AppCurrenciesLayoutComponent } from '../../views/backend/coursemodule/app-currencies/app-currencies-layout/app-currencies-layout.component';


// course status
import { CoursestatusInfoComponent } from '../../views/backend/coursemodule/course-status/coursestatus-info/coursestatus-info.component';
import { CoursestatusMgmtComponent } from '../../views/backend/coursemodule/course-status/coursestatus-mgmt/coursestatus-mgmt.component';
import { CoursestatusLayoutComponent } from '../../views/backend/coursemodule/course-status/coursestatus-layout/coursestatus-layout.component';


// Course 
import { CoursesInfoComponent } from '../../views/backend/coursemodule/courses/courses-info/courses-info.component';
import { CoursesMgmtComponent } from '../../views/backend/coursemodule/courses/courses-mgmt/courses-mgmt.component';
import { CoursesLayoutComponent } from '../../views/backend/coursemodule/courses/courses-layout/courses-layout.component';


//  Course Curriculum
import { CoursecurriculumInfoComponent } from '../../views/backend/coursemodule/course-curriculum/coursecurriculum-info/coursecurriculum-info.component';
import { CoursecurriculumMgmtComponent } from '../../views/backend/coursemodule/course-curriculum/coursecurriculum-mgmt/coursecurriculum-mgmt.component';
import { CoursecurriculumLayoutComponent } from '../../views/backend/coursemodule/course-curriculum/coursecurriculum-layout/coursecurriculum-layout.component';


// Curriculum Lessons
import { CurriculumlessonsInfoComponent } from '../../views/backend/coursemodule/curriculum-lessons/curriculumlessons-info/curriculumlessons-info.component';
import { CurriculumlessonsMgmtComponent } from '../../views/backend/coursemodule/curriculum-lessons/curriculumlessons-mgmt/curriculumlessons-mgmt.component';
import { CurriculumlessonsLayoutComponent } from '../../views/backend/coursemodule/curriculum-lessons/curriculumlessons-layout/curriculumlessons-layout.component';


// Lesson Materials
import { LessonmaterialsInfoComponent } from '../../views/backend/coursemodule/lesson-materials/lessonmaterials-info/lessonmaterials-info.component';
import { LessonmaterialsMgmtComponent } from '../../views/backend/coursemodule/lesson-materials/lessonmaterials-mgmt/lessonmaterials-mgmt.component';
import { LessonmaterialsLayoutComponent } from '../../views/backend/coursemodule/lesson-materials/lessonmaterials-layout/lessonmaterials-layout.component';

// Course Enrollments
import { CourseenrollmentInfoComponent } from '../../views/backend/coursemodule/course-enrollments/courseenrollment-info/courseenrollment-info.component';
import { CourseenrollmentMgmtComponent } from '../../views/backend/coursemodule/course-enrollments/courseenrollment-mgmt/courseenrollment-mgmt.component';
import { CourseenrollmentLayoutComponent } from '../../views/backend/coursemodule/course-enrollments/courseenrollment-layout/courseenrollment-layout.component';


// Course Coupons
import { CourseencouponInfoComponent } from '../../views/backend/coursemodule/course-coupons/courseencoupon-info/courseencoupon-info.component';
import { CourseencouponMgmtComponent } from '../../views/backend/coursemodule/course-coupons/courseencoupon-mgmt/courseencoupon-mgmt.component';
import { CourseencouponLayoutComponent } from '../../views/backend/coursemodule/course-coupons/courseencoupon-layout/courseencoupon-layout.component';



// SYSTEM INFORMATION & MANAGAMENT MODULE

// HOME PAGE
// Buffallo Team
import { BuffaloteamInfoComponent } from '../../views/backend/systeminformationandmanagementmodule/homepage/buffaloteam/buffaloteam-info/buffaloteam-info.component';
import { BuffaloteamMgmtComponent } from '../../views/backend/systeminformationandmanagementmodule/homepage/buffaloteam/buffaloteam-mgmt/buffaloteam-mgmt.component';
import { BuffaloteamLayoutComponent } from '../../views/backend/systeminformationandmanagementmodule/homepage/buffaloteam/buffaloteam-layout/buffaloteam-layout.component';

// Landing page
import { LandingpageInfoComponent  } from '../../views/backend/systeminformationandmanagementmodule/homepage/landingpage/landingpage-info/landingpage-info.component';
import { LandingpageMgmtComponent } from '../../views/backend/systeminformationandmanagementmodule/homepage/landingpage/landingpage-mgmt/landingpage-mgmt.component';
import { LandingpageLayoutComponent } from '../../views/backend/systeminformationandmanagementmodule/homepage/landingpage/landingpage-layout/landingpage-layout.component';

// latest events
import { LatesteventsInfoComponent } from '../../views/backend/systeminformationandmanagementmodule/homepage/latestevents/latestevents-info/latestevents-info.component';
import { LatesteventsMgmtComponent } from '../../views/backend/systeminformationandmanagementmodule/homepage/latestevents/latestevents-mgmt/latestevents-mgmt.component';
import { LatesteventsLayoutComponent } from '../../views/backend/systeminformationandmanagementmodule/homepage/latestevents/latestevents-layout/latestevents-layout.component';

// learning steps
import { LearningstepsInfoComponent } from '../../views/backend/systeminformationandmanagementmodule/homepage/learningsteps/learningsteps-info/learningsteps-info.component';
import { LearningstepsMgmtComponent } from '../../views/backend/systeminformationandmanagementmodule/homepage/learningsteps/learningsteps-mgmt/learningsteps-mgmt.component';
import { LearningstepsLayoutComponent } from '../../views/backend/systeminformationandmanagementmodule/homepage/learningsteps/learningsteps-layout/learningsteps-layout.component';

// newsletter
import { NewsletterInfoComponent } from '../../views/backend/systeminformationandmanagementmodule/homepage/newsletter/newsletter-info/newsletter-info.component';
import { NewsletterMgmtComponent } from '../../views/backend/systeminformationandmanagementmodule/homepage/newsletter/newsletter-mgmt/newsletter-mgmt.component';
import { NewsletterLayoutComponent } from '../../views/backend/systeminformationandmanagementmodule/homepage/newsletter/newsletter-layout/newsletter-layout.component';

// partners info
import { PartnersinfoInfoComponent } from '../../views/backend/systeminformationandmanagementmodule/homepage/partnersinfo/partnersinfo-info/partnersinfo-info.component';
import { PartnersinfoMgmtComponent } from '../../views/backend/systeminformationandmanagementmodule/homepage/partnersinfo/partnersinfo-mgmt/partnersinfo-mgmt.component';
import { PartnersinfoLayoutComponent } from '../../views/backend/systeminformationandmanagementmodule/homepage/partnersinfo/partnersinfo-layout/partnersinfo-layout.component';

// testimonials
import { TestimonialsInfoComponent } from '../../views/backend/systeminformationandmanagementmodule/homepage/testimonials/testimonials-info/testimonials-info.component';
import { TestimonialsMgmtComponent } from '../../views/backend/systeminformationandmanagementmodule/homepage/testimonials/testimonials-mgmt/testimonials-mgmt.component';
import { TestimonialsLayoutComponent } from '../../views/backend/systeminformationandmanagementmodule/homepage/testimonials/testimonials-layout/testimonials-layout.component';

// why learn with us
import { WhylearnwithusInfoComponent } from '../../views/backend/systeminformationandmanagementmodule/homepage/whylearnwithus/whylearnwithus-info/whylearnwithus-info.component';
import { WhylearnwithusMgmtComponent } from '../../views/backend/systeminformationandmanagementmodule/homepage/whylearnwithus/whylearnwithus-mgmt/whylearnwithus-mgmt.component';
import { WhylearnwithusLayoutComponent } from '../../views/backend/systeminformationandmanagementmodule/homepage/whylearnwithus/whylearnwithus-layout/whylearnwithus-layout.component';



// CONTACT PAGE
// Company Address
import { CompanyAddressInfoComponent } from '../../views/backend/systeminformationandmanagementmodule/contactpage/company-address/company-address-info/company-address-info.component';
import { CompanyAddressMgmtComponent } from '../../views/backend/systeminformationandmanagementmodule/contactpage/company-address/company-address-mgmt/company-address-mgmt.component';
import { CompanyAddressLayoutComponent } from '../../views/backend/systeminformationandmanagementmodule/contactpage/company-address/company-address-layout/company-address-layout.component';

// Company Branches
import { CompanyBranchesInfoComponent } from '../../views/backend/systeminformationandmanagementmodule/contactpage/company-branches/company-branches-info/company-branches-info.component';
import { CompanyBranchesMgmtComponent } from '../../views/backend/systeminformationandmanagementmodule/contactpage/company-branches/company-branches-mgmt/company-branches-mgmt.component';
import { CompanyBranchesLayoutComponent } from '../../views/backend/systeminformationandmanagementmodule/contactpage/company-branches/company-branches-layout/company-branches-layout.component';

// Company Branch Info
import { CompanyBranchInfoComponent } from '../../views/backend/systeminformationandmanagementmodule/contactpage/company-branch-info/company-branch-info/company-branch-info.component';
import { CompanyBranchMgmtComponent } from '../../views/backend/systeminformationandmanagementmodule/contactpage/company-branch-info/company-branch-mgmt/company-branch-mgmt.component';
import { CompanyBranchLayoutComponent } from '../../views/backend/systeminformationandmanagementmodule/contactpage/company-branch-info/company-branch-layout/company-branch-layout.component';

// Contacts
import { ContactsInfoComponent } from '../../views/backend/systeminformationandmanagementmodule/contactpage/contacts/contacts-info/contacts-info.component';
import { ContactsMgmtComponent } from '../../views/backend/systeminformationandmanagementmodule/contactpage/contacts/contacts-mgmt/contacts-mgmt.component';
import { ContactsLayoutComponent } from '../../views/backend/systeminformationandmanagementmodule/contactpage/contacts/contacts-layout/contacts-layout.component';

// Contact Info
import { ContactInfoComponent } from '../../views/backend/systeminformationandmanagementmodule/contactpage/contact-info/contact-info/contact-info.component';
import { ContactMgmtComponent } from '../../views/backend/systeminformationandmanagementmodule/contactpage/contact-info/contact-mgmt/contact-mgmt.component';
import { ContactLayoutComponent } from '../../views/backend/systeminformationandmanagementmodule/contactpage/contact-info/contact-layout/contact-layout.component';

// Email Info
import { EmailInfoComponent } from '../../views/backend/systeminformationandmanagementmodule/contactpage/email-info/email-info/email-info.component';
import { EmailMgmtComponent } from '../../views/backend/systeminformationandmanagementmodule/contactpage/email-info/email-mgmt/email-mgmt.component';
import { EmailLayoutComponent } from '../../views/backend/systeminformationandmanagementmodule/contactpage/email-info/email-layout/email-layout.component';



// ABOUT PAGE
// About
import { AboutInfoComponent } from '../../views/backend/systeminformationandmanagementmodule/aboutpage/about-info/about-info.component'; 
import { AboutMgmtComponent } from '../../views/backend/systeminformationandmanagementmodule/aboutpage/about-mgmt/about-mgmt.component'; 
import { AboutLayoutComponent } from '../../views/backend/systeminformationandmanagementmodule/aboutpage/about-layout/about-layout.component';  

// GENERAL PAGES
// Footer
import { FooterInfoComponent } from '../../views/backend/systeminformationandmanagementmodule/generalpages/footer/footer-info/footer-info.component'; 
import { FooterMgmtComponent } from '../../views/backend/systeminformationandmanagementmodule/generalpages/footer/footer-mgmt/footer-mgmt.component';
import { FooterLayoutComponent } from '../../views/backend/systeminformationandmanagementmodule/generalpages/footer/footer-layout/footer-layout.component';


// Icons
import { IconsInfoComponent } from '../../views/backend/systeminformationandmanagementmodule/generalpages/icons/icons-info/icons-info.component';
import { IconsMgmtComponent } from '../../views/backend/systeminformationandmanagementmodule/generalpages/icons/icons-mgmt/icons-mgmt.component';
import { IconsLayoutComponent } from '../../views/backend/systeminformationandmanagementmodule/generalpages/icons/icons-layout/icons-layout.component';


// Partners
import { PartnersInfoComponent } from '../../views/backend/systeminformationandmanagementmodule/generalpages/partners/partners-info/partners-info.component'; 
import { PartnersMgmtComponent } from '../../views/backend/systeminformationandmanagementmodule/generalpages/partners/partners-mgmt/partners-mgmt.component'; 
import { PartnersLayoutComponent } from '../../views/backend/systeminformationandmanagementmodule/generalpages/partners/partners-layout/partners-layout.component';


// Team
import { TeamInfoComponent } from '../../views/backend/systeminformationandmanagementmodule/generalpages/team/team-info/team-info.component';
import { TeamMgmtComponent } from '../../views/backend/systeminformationandmanagementmodule/generalpages/team/team-mgmt/team-mgmt.component';
import { TeamLayoutComponent } from '../../views/backend/systeminformationandmanagementmodule/generalpages/team/team-layout/team-layout.component';


// SYSTEM ACTIVITY & LOGS MODULE

// System logs
import { SystemactivitylogsInfoComponent } from '../../views/backend/systemactivitylogsmodule/systemactivitylogs/systemactivitylogs-info/systemactivitylogs-info.component';
import { SystemactivitylogsMgmtComponent } from '../../views/backend/systemactivitylogsmodule/systemactivitylogs/systemactivitylogs-mgmt/systemactivitylogs-mgmt.component';
import { SystemactivitylogsLayoutComponent } from '../../views/backend/systemactivitylogsmodule/systemactivitylogs/systemactivitylogs-layout/systemactivitylogs-layout.component';

// System audit trail
import { SystemaudittrailInfoComponent } from '../../views/backend/systemactivitylogsmodule/systemaudittrail/systemaudittrail-info/systemaudittrail-info.component';
import { SystemaudittrailMgmtComponent } from '../../views/backend/systemactivitylogsmodule/systemaudittrail/systemaudittrail-mgmt/systemaudittrail-mgmt.component';
import { SystemaudittrailLayoutComponent } from '../../views/backend/systemactivitylogsmodule/systemaudittrail/systemaudittrail-layout/systemaudittrail-layout.component';



// SYSTEM FILES & MANAGEMENT MODULE

// Blog posts
import { BlogPostImagesInfoComponent } from '../../views/backend/systemfilesmanagementmodule/blog-posts/blog-post-images-info/blog-post-images-info.component';
import { BlogPostImagesMgmtComponent } from '../../views/backend/systemfilesmanagementmodule/blog-posts/blog-post-images-mgmt/blog-post-images-mgmt.component';
import { BlogPostImagesLayoutComponent } from '../../views/backend/systemfilesmanagementmodule/blog-posts/blog-post-images-layout/blog-post-images-layout.component';

// Courses
// categories
import { CourseCategoriesInfoComponent } from '../../views/backend/systemfilesmanagementmodule/courses/categories/course-categories-info/course-categories-info.component'; 
import { CourseCategoriesMgmtComponent } from '../../views/backend/systemfilesmanagementmodule/courses/categories/course-categories-mgmt/course-categories-mgmt.component';
import { CourseCategoriesLayoutComponent } from '../../views/backend/systemfilesmanagementmodule/courses/categories/course-categories-layout/course-categories-layout.component';

// images
import { CourseImagesInfoComponent } from '../../views/backend/systemfilesmanagementmodule/courses/images/course-images-info/course-images-info.component';
import { CourseImagesMgmtComponent } from '../../views/backend/systemfilesmanagementmodule/courses/images/course-images-mgmt/course-images-mgmt.component';
import { CourseImagesLayoutComponent } from '../../views/backend/systemfilesmanagementmodule/courses/images/course-images-layout/course-images-layout.component';

// sub-categories
import { CourseSubCategoriesInfoComponent } from '../../views/backend/systemfilesmanagementmodule/courses/sub-categories/course-sub-categories-info/course-sub-categories-info.component';
import { CourseSubCategoriesMgmtComponent } from '../../views/backend/systemfilesmanagementmodule/courses/sub-categories/course-sub-categories-mgmt/course-sub-categories-mgmt.component';
import { CourseSubCategoriesLayoutComponent } from '../../views/backend/systemfilesmanagementmodule/courses/sub-categories/course-sub-categories-layout/course-sub-categories-layout.component';

// thumbnail-images
import { CourseThumbnailImagesInfoComponent } from '../../views/backend/systemfilesmanagementmodule/courses/thumbnail-images/course-thumbnail-images-info/course-thumbnail-images-info.component';
import { CourseThumbnailImagesMgmtComponent } from '../../views/backend/systemfilesmanagementmodule/courses/thumbnail-images/course-thumbnail-images-mgmt/course-thumbnail-images-mgmt.component';
import { CourseThumbnailImagesLayoutComponent } from '../../views/backend/systemfilesmanagementmodule/courses/thumbnail-images/course-thumbnail-images-layout/course-thumbnail-images-layout.component';


// Events
import { EventsInfoComponent } from '../../views/backend/systemfilesmanagementmodule/events/events-info/events-info.component';
import { EventsMgmtComponent } from '../../views/backend/systemfilesmanagementmodule/events/events-mgmt/events-mgmt.component';
import { EventsLayoutComponent } from '../../views/backend/systemfilesmanagementmodule/events/events-layout/events-layout.component';


// Home
// landing page
import { LandingpageInfoComponent as LandingpageInfoFiles } from '../../views/backend/systemfilesmanagementmodule/home/landingpage/landingpage-info/landingpage-info.component';
import { LandingpageMgmtComponent as  LandingpageMgmtFiles } from '../../views/backend/systemfilesmanagementmodule/home/landingpage/landingpage-mgmt/landingpage-mgmt.component';
import { LandingpageLayoutComponent as  LandingpageLayoutFiles } from '../../views/backend/systemfilesmanagementmodule/home/landingpage/landingpage-layout/landingpage-layout.component';

// learning steps
import { LearningstepsInfoComponent as LearningstepsInfoFiles } from '../../views/backend/systemfilesmanagementmodule/home/learningsteps/learningsteps-info/learningsteps-info.component';
import { LearningstepsMgmtComponent as LearningstepsMgmtFiles } from '../../views/backend/systemfilesmanagementmodule/home/learningsteps/learningsteps-mgmt/learningsteps-mgmt.component';
import { LearningstepsLayoutComponent as LearningstepsLayoutFiles } from '../../views/backend/systemfilesmanagementmodule/home/learningsteps/learningsteps-layout/learningsteps-layout.component';


// Instructors
import { InstructorsProfilePicsInfoComponent } from '../../views/backend/systemfilesmanagementmodule/instructors/instructors-profile-pics-info/instructors-profile-pics-info.component';
import { InstructorsProfilePicsMgmtComponent } from '../../views/backend/systemfilesmanagementmodule/instructors/instructors-profile-pics-mgmt/instructors-profile-pics-mgmt.component';
import { InstructorsProfilePicsLayoutComponent } from '../../views/backend/systemfilesmanagementmodule/instructors/instructors-profile-pics-layout/instructors-profile-pics-layout.component';


// Materials
// datasets
import { DatasetsInfoComponent } from '../../views/backend/systemfilesmanagementmodule/materials/datasets/datasets-info/datasets-info.component';
import { DatasetsMgmtComponent } from '../../views/backend/systemfilesmanagementmodule/materials/datasets/datasets-mgmt/datasets-mgmt.component';
import { DatasetsLayoutComponent } from '../../views/backend/systemfilesmanagementmodule/materials/datasets/datasets-layout/datasets-layout.component';

// documents
import { DocumentsInfoComponent } from '../../views/backend/systemfilesmanagementmodule/materials/documents/documents-info/documents-info.component';
import { DocumentsMgmtComponent } from '../../views/backend/systemfilesmanagementmodule/materials/documents/documents-mgmt/documents-mgmt.component';
import { DocumentsLayoutComponent } from '../../views/backend/systemfilesmanagementmodule/materials/documents/documents-layout/documents-layout.component';

// videos
import { VideosInfoComponent } from '../../views/backend/systemfilesmanagementmodule/materials/videos/videos-info/videos-info.component';
import { VideosMgmtComponent } from '../../views/backend/systemfilesmanagementmodule/materials/videos/videos-mgmt/videos-mgmt.component';
import { VideosLayoutComponent } from '../../views/backend/systemfilesmanagementmodule/materials/videos/videos-layout/videos-layout.component';

// zipped files
import { ZippedFilesInfoComponent } from '../../views/backend/systemfilesmanagementmodule/materials/zipped-files/zipped-files-info/zipped-files-info.component';
import { ZippedFilesMgmtComponent } from '../../views/backend/systemfilesmanagementmodule/materials/zipped-files/zipped-files-mgmt/zipped-files-mgmt.component';
import { ZippedFilesLayoutComponent } from '../../views/backend/systemfilesmanagementmodule/materials/zipped-files/zipped-files-layout/zipped-files-layout.component';


// Students
import { StudentsProfilePicsInfoComponent } from '../../views/backend/systemfilesmanagementmodule/students/students-profile-pics-info/students-profile-pics-info.component'; 
import { StudentsProfilePicsMgmtComponent } from '../../views/backend/systemfilesmanagementmodule/students/students-profile-pics-mgmt/students-profile-pics-mgmt.component';
import { StudentsProfilePicsLayoutComponent } from '../../views/backend/systemfilesmanagementmodule/students/students-profile-pics-layout/students-profile-pics-layout.component';


// System
import { SystemInfoComponent } from '../../views/backend/systemfilesmanagementmodule/system/system-info/system-info.component';
import { SystemMgmtComponent } from '../../views/backend/systemfilesmanagementmodule/system/system-mgmt/system-mgmt.component';
import { SystemLayoutComponent } from '../../views/backend/systemfilesmanagementmodule/system/system-layout/system-layout.component';

// Users
import { UserProfilePicsInfoComponent } from '../../views/backend/systemfilesmanagementmodule/users/user-profile-pics-info/user-profile-pics-info.component';
import { UserProfilePicsMgmtComponent } from '../../views/backend/systemfilesmanagementmodule/users/user-profile-pics-mgmt/user-profile-pics-mgmt.component';
import { UserProfilePicsLayoutComponent } from '../../views/backend/systemfilesmanagementmodule/users/user-profile-pics-layout/user-profile-pics-layout.component';


export const backendRoutes: Routes = [
  {
    path: 'admin-buffalo', 
    redirectTo: '/admin-buffalo/student-instructor-courses-dashboard', 
    pathMatch: 'full'
  },
  {
    path: 'admin-buffalo',
    component: DashboardLayoutComponent,
    children: [
      {
        path: '',
        component: MainDashboardComponent
      },
      {
        path: 'master-dashboard',
        component: MainDashboardComponent
      },
      {
        path: 'super-admin-dashboard',
        component: AdminDashboardComponent
      },
      {
        path: 'instructor-dashboard',
        component: InstructorDashboardComponent
      },
      

      // ROLES & PERMISSION MODULE
      {
        path: 'student-instructor-courses/permission-dashboard',
        component: PermissionLayoutComponent,
        children: [
          {
            path: '',
            component: PermissionInfoComponent
          },
          {
            path: 'permission-information',
            component: PermissionInfoComponent
          },
          {
            path: 'permission-management',
            component: PermissionMgmtComponent
          }
        ]
      },
      {
        path: 'student-instructor-courses/role-dashboard',
        component: RoleLayoutComponent,
        children: [
          {
            path: '',
            component: RoleInfoComponent
          },
          {
            path: 'role-information',
            component: RoleInfoComponent
          },
          {
            path: 'role-management',
            component: RoleMgmtComponent
          }
        ]
      },

      // EVENT MODULE
      {
        path: 'student-instructor-courses/event-dashboard',
        component: EventLayoutComponent,
        children: [
          {
            path: '',
            component: EventInfoComponent
          },
          {
            path: 'event-information',
            component: EventInfoComponent
          },
          {
            path: 'event-management',
            component: EventMgmtComponent
          }
        ]
      },
    
    // BLOG MODULE
    {
      path: 'content-management/dashboard-blogs',
      component: BlogLayoutComponent,
      children: [
        {
          path: '',
          component: BloginfoComponent
        },
        {
          path: 'blog-information',
          component: BloginfoComponent
        },
        {
          path: 'blog-management',
          component: BlogmgmtComponent
        }
      ]
    },
    {
      path: 'content-management/dashboard-blog-tags',
      component: TagLayoutComponent,
      children: [
        {
          path: '',
          component: TaginfoComponent
        },
        {
          path: 'tag-information',
          component: TaginfoComponent
        },
        {
          path: 'tag-management',
          component: TagmgmtComponent
        }
      ]
    },
    {
      path: 'content-management/dashboard-blog-categories',
      component: CategoryLayoutComponent,
      children: [
        {
          path: '',
          component: CategoryinfoComponent
        },
        {
          path: 'category-information',
          component: CategoryinfoComponent
        },
        {
          path: 'category-management',
          component: CategorymgmtComponent
        }
      ]
    },
    {
      path: 'content-management/dashboard-blog-status',
      component: StatusLayoutComponent,
      children: [
        {
          path: '',
          component: StatusinfoComponent
        },
        {
          path: 'status-information',
          component: StatusinfoComponent
        },
        {
          path: 'status-management',
          component: StatusmgmtComponent
        }
      ]
    },

    // USER MANAGEMENT MODULE
    {
      path: 'user-management/dashboard-users',
      component: UsersLayoutComponent,
      children: [
        {
          path: '',
          component: UsersInfoComponent
        },
        {
          path: 'user-information',
          component: UsersInfoComponent
        },
        {
          path: 'user-management',
          component: UsersMgmtComponent
        }
      ]
    },
    {
      path: 'user-management/dashboard-students',
      component: StudentsLayoutComponent,
      children: [
        {
          path: '',
          component: StudentsInfoComponent
        },
        {
          path: 'student-information',
          component: StudentsInfoComponent
        },
        {
          path: 'student-management',
          component: StudentsMgmtComponent
        }
      ]
    },
    {
      path: 'user-management/dashboard-instructors',
      component: InstructorsLayoutComponent,
      children: [
        {
          path: '',
          component: InstructorsInfoComponent
        },
        {
          path: 'instructor-information',
          component: InstructorsInfoComponent
        },
        {
          path: 'instructor-management',
          component: InstructorsMgmtComponent
        }
      ]
    },

    // COURSE MODULE
    {
      path: 'course-management/dashboard-course-types',
      component: CoursetypeLayoutComponent,
      children: [
        {
          path: '',
          component: CoursetypeInfoComponent
        },
        {
          path: 'course-type-information',
          component: CoursetypeInfoComponent
        },
        {
          path: 'course-type-management',
          component: CoursetypeMgmtComponent
        }
      ]
    },
    {
      path: 'course-management/dashboard-course-tags',
      component: CoursetagLayoutComponent,
      children: [
        {
          path: '',
          component: CoursetagInfoComponent
        },
        {
          path: 'course-tag-information',
          component: CoursetagInfoComponent
        },
        {
          path: 'course-tag-management',
          component: CoursetagMgmtComponent
        }
      ]
    },
    {
      path: 'course-management/dashboard-course-difficulty',
      component: CoursedifficultyLayoutComponent,
      children: [
        {
          path: '',
          component: CoursedifficultyInfoComponent
        },
        {
          path: 'course-difficulty-information',
          component: CoursedifficultyInfoComponent
        },
        {
          path: 'course-difficulty-management',
          component: CoursedifficultyMgmtComponent
        }
      ]
    },
    {
      path: 'course-management/dashboard-course-categories',
      component: CoursecategoryLayoutComponent,
      children: [
        {
          path: '',
          component: CoursecategoryInfoComponent
        },
        {
          path: 'course-category-information',
          component: CoursecategoryInfoComponent
        },
        {
          path: 'course-category-management',
          component: CoursecategoryMgmtComponent
        }
      ]
    },
    {
      path: 'course-management/dashboard-course-status',
      component: CoursestatusLayoutComponent,
      children: [
        {
          path: '',
          component: CoursestatusInfoComponent
        },
        {
          path: 'course-status-information',
          component: CoursestatusInfoComponent
        },
        {
          path: 'course-status-management',
          component: CoursestatusMgmtComponent
        }
      ]
    },
    {
      path: 'course-management/dashboard-app-currency',
      component: AppCurrenciesLayoutComponent,
      children: [
        {
          path: '',
          component: AppCurrenciesInfoComponent
        },
        {
          path: 'app-currency-information',
          component: AppCurrenciesInfoComponent
        },
        {
          path: 'app-currency-management',
          component: AppCurrenciesMgmtComponent
        }
      ]
    },
    {
      path: 'course-management/dashboard-course-sub-categories',
      component: CoursesubcategoryLayoutComponent,
      children: [
        {
          path: '',
          component: CoursesubcategoryInfoComponent
        },
        {
          path: 'course-sub-category-information',
          component: CoursesubcategoryInfoComponent
        },
        {
          path: 'course-sub-category-management',
          component: CoursesubcategoryMgmtComponent
        }
      ]
    },
    {
      path: 'course-management/dashboard-courses',
      component: CoursesLayoutComponent,
      children: [
        {
          path: '',
          component: CoursesInfoComponent
        },
        {
          path: 'course-information',
          component: CoursesInfoComponent
        },
        {
          path: 'course-management',
          component: CoursesMgmtComponent
        }
      ]
    },
    {
      path: 'course-management/dashboard-course-curriculums',
      component: CoursecurriculumLayoutComponent,
      children: [
        {
          path: '',
          component: CoursecurriculumInfoComponent
        },
        {
          path: 'course-curriculum-information',
          component: CoursecurriculumInfoComponent
        },
        {
          path: 'course-curriculum-management',
          component: CoursecurriculumMgmtComponent
        }
      ]
    },
    {
      path: 'course-management/dashboard-curriculum-lessons',
      component: CurriculumlessonsLayoutComponent,
      children: [
        {
          path: '',
          component: CurriculumlessonsInfoComponent
        },
        {
          path: 'curriculum-lesson-information',
          component: CurriculumlessonsInfoComponent
        },
        {
          path: 'curriculum-lesson-management',
          component: CurriculumlessonsMgmtComponent
        }
      ]
    },
    {
      path: 'course-management/dashboard-lesson-materials',
      component: LessonmaterialsLayoutComponent,
      children: [
        {
          path: '',
          component: LessonmaterialsInfoComponent
        },
        {
          path: 'lessons-material-information',
          component: LessonmaterialsInfoComponent
        },
        {
          path: 'lessons-material-management',
          component: LessonmaterialsMgmtComponent
        }
      ]
    },
    {
      path: 'course-management/dashboard-course-enrollments',
      component: CourseenrollmentLayoutComponent,
      children: [
        {
          path: '',
          component: CourseenrollmentInfoComponent
        },
        {
          path: 'course-enrollment-information',
          component: CourseenrollmentInfoComponent
        },
        {
          path: 'course-enrollment-management',
          component: CourseenrollmentMgmtComponent
        }
      ]
    },
    {
      path: 'course-management/dashboard-course-coupons',
      component: CourseencouponLayoutComponent,
      children: [
        {
          path: '',
          component: CourseencouponInfoComponent
        },
        {
          path: 'course-coupon-information',
          component: CourseencouponInfoComponent
        },
        {
          path: 'course-coupon-management',
          component: CourseencouponMgmtComponent
        }
      ]
    },

    // SYSTEM INFORMATION & MANAGAMENT MODULE

    // HOME PAGE
    {
      path: 'system-information-management/home-page/dashboard-buffalo-team',
      component: BuffaloteamLayoutComponent,
      children: [
        {
          path: '',
          component: BuffaloteamInfoComponent
        },
        {
          path: 'buffalo-team-information',
          component: BuffaloteamInfoComponent
        },
        {
          path: 'buffalo-team-management',
          component: BuffaloteamMgmtComponent
        }
      ]
    },
    {
      path: 'system-information-management/home-page/dashboard-landing-page',
      component: LandingpageLayoutComponent,
      children: [
        {
          path: '',
          component:  LandingpageInfoComponent 
        },
        {
          path: 'landing-page-information',
          component:  LandingpageInfoComponent 
        },
        {
          path: 'landing-page-management',
          component: LandingpageMgmtComponent
        }
      ]
    },
    {
      path: 'system-information-management/home-page/dashboard-latest-events',
      component: LatesteventsLayoutComponent,
      children: [
        {
          path: '',
          component: LatesteventsInfoComponent
        },
        {
          path: 'latest-events-information',
          component: LatesteventsInfoComponent
        },
        {
          path: 'latest-events-management',
          component: LatesteventsMgmtComponent
        }
      ]
    },
    {
      path: 'system-information-management/home-page/dashboard-learning-steps',
      component: LearningstepsLayoutComponent,
      children: [
        {
          path: '',
          component: LearningstepsInfoComponent
        },
        {
          path: 'learning-steps-information',
          component: LearningstepsInfoComponent
        },
        {
          path: 'learning-steps-management',
          component: LearningstepsMgmtComponent
        }
      ]
    },
    {
      path: 'system-information-management/home-page/dashboard-newsletter',
      component: NewsletterLayoutComponent,
      children: [
        {
          path: '',
          component: NewsletterInfoComponent
        },
        {
          path: 'newsletter-information',
          component: NewsletterInfoComponent
        },
        {
          path: 'newsletter-management',
          component: NewsletterMgmtComponent
        }
      ]
    },
    {
      path: 'system-information-management/home-page/dashboard-partners-information',
      component: PartnersinfoLayoutComponent,
      children: [
        {
          path: '',
          component: PartnersinfoInfoComponent
        },
        {
          path: 'partners-information',
          component: PartnersinfoInfoComponent
        },
        {
          path: 'partners-management',
          component: PartnersinfoMgmtComponent
        }
      ]
    },
    {
      path: 'system-information-management/home-page/dashboard-testimonials',
      component: TestimonialsLayoutComponent,
      children: [
        {
          path: '',
          component: TestimonialsInfoComponent
        },
        {
          path: 'testimonials-information',
          component: TestimonialsInfoComponent
        },
        {
          path: 'testimonials-management',
          component: TestimonialsMgmtComponent
        }
      ]
    },
    {
      path: 'system-information-management/home-page/dashboard-why-learn-with-us',
      component: WhylearnwithusLayoutComponent,
      children: [
        {
          path: '',
          component: WhylearnwithusInfoComponent
        },
        {
          path: 'why-learn-with-us-information',
          component: WhylearnwithusInfoComponent
        },
        {
          path: 'why-learn-with-us-management',
          component: WhylearnwithusMgmtComponent
        }
      ]
    },

    // CONTACT PAGE
    {
      path: 'system-information-management/contact-page/dashboard-company-address',
      component: CompanyAddressLayoutComponent,
      children: [
        {
          path: '',
          component: CompanyAddressInfoComponent
        },
        {
          path: 'company-address-information',
          component: CompanyAddressInfoComponent
        },
        {
          path: 'company-address-management',
          component: CompanyAddressMgmtComponent
        }
      ]
    },
    {
      path: 'system-information-management/contact-page/dashboard-company-branch-info',
      component: CompanyBranchLayoutComponent,
      children: [
        {
          path: '',
          component: CompanyBranchInfoComponent
        },
        {
          path: 'company-branch-info-information',
          component: CompanyBranchInfoComponent
        },
        {
          path: 'company-branch-info-management',
          component: CompanyBranchMgmtComponent
        }
      ]
    },
    {
      path: 'system-information-management/contact-page/dashboard-company-branches',
      component: CompanyBranchesLayoutComponent,
      children: [
        {
          path: '',
          component: CompanyBranchesInfoComponent
        },
        {
          path: 'company-branches-information',
          component: CompanyBranchesInfoComponent
        },
        {
          path: 'company-branches-management',
          component: CompanyBranchesMgmtComponent
        }
      ]
    },
    {
      path: 'system-information-management/contact-page/dashboard-contact',
      component: ContactLayoutComponent,
      children: [
        {
          path: '',
          component: ContactInfoComponent
        },
        {
          path: 'contact-information',
          component: ContactInfoComponent
        },
        {
          path: 'contact-management',
          component: ContactMgmtComponent
        }
      ]
    },
    {
      path: 'system-information-management/contact-page/dashboard-contacts',
      component: ContactsLayoutComponent,
      children: [
        {
          path: '',
          component: ContactsInfoComponent
        },
        {
          path: 'contacts-information',
          component: ContactsInfoComponent
        },
        {
          path: 'contacts-management',
          component: ContactsMgmtComponent
        }
      ]
    },
    {
      path: 'system-information-management/contact-page/dashboard-email',
      component: EmailLayoutComponent,
      children: [
        {
          path: '',
          component: EmailInfoComponent
        },
        {
          path: 'email-information',
          component: EmailInfoComponent
        },
        {
          path: 'email-management',
          component: EmailMgmtComponent
        }
      ]
    },

    // ABOUT PAGE
    {
      path: 'system-information-management/about-page/dashboard-about',
      component: AboutLayoutComponent,
      children: [
        {
          path: '',
          component: AboutInfoComponent
        },
        {
          path: 'about-information',
          component: AboutInfoComponent
        },
        {
          path: 'about-management',
          component: AboutMgmtComponent
        }
      ]
    },

    // GENERAL PAGES
    {
      path: 'system-information-management/general-pages/dashboard-icons',
      component: IconsLayoutComponent,
      children: [
        {
          path: '',
          component: IconsInfoComponent
        },
        {
          path: 'icons-information',
          component: IconsInfoComponent
        },
        {
          path: 'icons-management',
          component: IconsMgmtComponent
        }
      ]
    },
    {
      path: 'system-information-management/general-pages/dashboard-footer',
      component: FooterLayoutComponent,
      children: [
        {
          path: '',
          component: FooterInfoComponent
        },
        {
          path: 'footer-information',
          component: FooterInfoComponent
        },
        {
          path: 'footer-management',
          component: FooterMgmtComponent
        }
      ]
    },
    {
      path: 'system-information-management/general-pages/dashboard-partners',
      component: PartnersLayoutComponent,
      children: [
        {
          path: '',
          component: PartnersInfoComponent
        },
        {
          path: 'partners-information',
          component: PartnersInfoComponent
        },
        {
          path: 'partners-management',
          component: PartnersMgmtComponent
        }
      ]
    },
    {
      path: 'system-information-management/general-pages/dashboard-team',
      component: TeamLayoutComponent,
      children: [
        {
          path: '',
          component: TeamInfoComponent
        },
        {
          path: 'team-information',
          component: TeamInfoComponent
        },
        {
          path: 'team-management',
          component: TeamMgmtComponent
        }
      ]
    },

    // SYSTEM FILES & MANAGEMENT MODULE
    // Blog posts
    {
      path: 'system-files-management/blog-posts/dashboard-blog-posts',
      component: BlogPostImagesLayoutComponent,
      children: [
        {
          path: '',
          component: BlogPostImagesInfoComponent
        },
        {
          path: 'blog-posts-information',
          component: BlogPostImagesInfoComponent
        },
        {
          path: 'blog-posts-management',
          component: BlogPostImagesMgmtComponent
        }
      ]
    },
    // courses
    // categories
    {
      path: 'system-files-management/courses/dashboard-categories',
      component: CourseCategoriesLayoutComponent,
      children: [
        {
          path: '',
          component: CourseCategoriesInfoComponent
        },
        {
          path: 'categories-information',
          component: CourseCategoriesInfoComponent
        },
        {
          path: 'categories-management',
          component: CourseCategoriesMgmtComponent
        }
      ]
    },
    // images
    {
      path: 'system-files-management/courses/dashboard-images',
      component: CourseImagesLayoutComponent,
      children: [
        {
          path: '',
          component: CourseImagesInfoComponent
        },
        {
          path: 'images-information',
          component: CourseImagesInfoComponent
        },
        {
          path: 'images-management',
          component: CourseImagesMgmtComponent
        }
      ]
    },
    // sub-categories
    {
      path: 'system-files-management/courses/dashboard-sub-categories',
      component: CourseSubCategoriesLayoutComponent,
      children: [
        {
          path: '',
          component: CourseSubCategoriesInfoComponent
        },
        {
          path: 'sub-categories-information',
          component: CourseSubCategoriesInfoComponent
        },
        {
          path: 'sub-categories-management',
          component: CourseSubCategoriesMgmtComponent
        }
      ]
    },
    // thumbnail-images
    {
      path: 'system-files-management/courses/dashboard-thumbnail-images',
      component: CourseThumbnailImagesLayoutComponent,
      children: [
        {
          path: '',
          component: CourseThumbnailImagesInfoComponent
        },
        {
          path: 'thumbnail-images-information',
          component: CourseThumbnailImagesInfoComponent
        },
        {
          path: 'thumbnail-images-management',
          component: CourseThumbnailImagesMgmtComponent
        }
      ]
    },

    // Events
    {
      path: 'system-files-management/events/dashboard-events',
      component: EventsLayoutComponent,
      children: [
        {
          path: '',
          component: EventsInfoComponent
        },
        {
          path: 'events-information',
          component: EventsInfoComponent
        },
        {
          path: 'events-management',
          component: EventsMgmtComponent
        }
      ]
    },

    // home
    // landingpage
    {
      path: 'system-files-management/home/dashboard-landing-page',
      component: LandingpageLayoutFiles,
      children: [
        {
          path: '',
          component: LandingpageInfoFiles
        },
        {
          path: 'landing-page-information',
          component: LandingpageInfoFiles
        },
        {
          path: 'landing-page-management',
          component: LandingpageMgmtFiles
        }
      ]
    },
    // learningsteps
    {
      path: 'system-files-management/home/dashboard-learning-steps',
      component: LearningstepsLayoutFiles,
      children: [
        {
          path: '',
          component: LearningstepsInfoFiles
        },
        {
          path: 'learning-steps-information',
          component: LearningstepsInfoFiles
        },
        {
          path: 'learning-steps-management',
          component: LearningstepsMgmtFiles
        }
      ]
    },
    // Instructors
    {
      path: 'system-files-management/instructors/dashboard-instructor-profile-pics',
      component: InstructorsProfilePicsLayoutComponent,
      children: [
        {
          path: '',
          component: InstructorsProfilePicsInfoComponent
        },
        {
          path: 'instructor-profile-pics-information',
          component: InstructorsProfilePicsInfoComponent
        },
        {
          path: 'instructor-profile-pics-management',
          component: InstructorsProfilePicsMgmtComponent
        }
      ]
    },

    // Materials
    // Datasets
    {
      path: 'system-files-management/materials/dashboard-datasets',
      component: DatasetsLayoutComponent,
      children: [
        {
          path: '',
          component: DatasetsInfoComponent
        },
        {
          path: 'datasets-information',
          component: DatasetsInfoComponent
        },
        {
          path: 'datasets-management',
          component: DatasetsMgmtComponent
        }
      ]
    },
    // Documents
    {
      path: 'system-files-management/materials/dashboard-documents',
      component: DocumentsLayoutComponent,
      children: [
        {
          path: '',
          component: DocumentsInfoComponent
        },
        {
          path: 'documents-information',
          component: DocumentsInfoComponent
        },
        {
          path: 'documents-management',
          component: DocumentsMgmtComponent
        }
      ]
    },
    // Videos
    {
      path: 'system-files-management/materials/dashboard-videos',
      component: VideosLayoutComponent,
      children: [
        {
          path: '',
          component: VideosInfoComponent
        },
        {
          path: 'videos-information',
          component: VideosInfoComponent
        },
        {
          path: 'videos-management',
          component: VideosMgmtComponent
        }
      ]
    },
    // Zipped files
    {
      path: 'system-files-management/materials/dashboard-zipped-files',
      component: ZippedFilesLayoutComponent,
      children: [
        {
          path: '',
          component: ZippedFilesInfoComponent
        },
        {
          path: 'zipped-files-information',
          component: ZippedFilesInfoComponent
        },
        {
          path: 'zipped-files-management',
          component: ZippedFilesMgmtComponent
        }
      ]
    },

    // Students
    {
      path: 'system-files-management/students/dashboard-student-profile-pics',
      component: StudentsProfilePicsLayoutComponent,
      children: [
        {
          path: '',
          component: StudentsProfilePicsInfoComponent
        },
        {
          path: 'student-profile-pics-information',
          component: StudentsProfilePicsInfoComponent
        },
        {
          path: 'student-profile-pics-management',
          component: StudentsProfilePicsMgmtComponent
        }
      ]
    },
    // System
    {
      path: 'system-files-management/system/dashboard-system-pics',
      component: SystemLayoutComponent,
      children: [
        {
          path: '',
          component: SystemInfoComponent
        },
        {
          path: 'system-information',
          component: SystemInfoComponent
        },
        {
          path: 'system-management',
          component: SystemMgmtComponent
        }
      ]
    },
    // Users
    {
      path: 'system-files-management/users/dashboard-user-profile-pics',
      component: UserProfilePicsLayoutComponent,
      children: [
        {
          path: '',
          component: UserProfilePicsInfoComponent
        },
        {
          path: 'user-profile-pics-information',
          component: UserProfilePicsInfoComponent
        },
        {
          path: 'user-profile-pics-management',
          component: UserProfilePicsMgmtComponent
        }
      ]
    },


    // SYSTEM ACTIVITY & LOGS MODULE
    {
      path: 'system-activity-and-logs/dashboard-system-activity-logs',
      component: SystemactivitylogsLayoutComponent,
      children: [
        {
          path: '',
          component: SystemactivitylogsInfoComponent
        },
        {
          path: 'system-activity-logs-information',
          component: SystemactivitylogsInfoComponent
        },
        {
          path: 'system-activity-logs-management',
          component: SystemactivitylogsMgmtComponent
        }
      ]
    },
    {
      path: 'system-activity-and-logs/dashboard-system-audit-trail',
      component: SystemaudittrailLayoutComponent,
      children: [
        {
          path: '',
          component: SystemaudittrailInfoComponent
        },
        {
          path: 'system-audit-trail-information',
          component: SystemaudittrailInfoComponent
        },
        {
          path: 'system-audit-trail-management',
          component: SystemaudittrailMgmtComponent
        }
      ]
    },
    ]
  },

  // app instructor/admin/superadmin/writer auth layout routes
  {
    // auth
  path: 'admin-buffalo',
  component: AuthLayoutComponent,  
  children:[
        // students auth
        {
          path:'',
          component:SigninComponent
        }, 
        {
          path:'aunthentication-sign-in',
          component:SigninComponent
        }, 
        {
          path:'aunthentication-sign-up',
          component: SignupComponent
        },
        {
          path:'authentication-sub-system/reset-password',
          component: PasswordResetComponent
        },
    ],  
  },
];

@NgModule({
  imports: [RouterModule.forChild(backendRoutes)],
  exports: [RouterModule]
})

export class BackendRoutingModule { }
