import { RouterModule } from '@angular/router';
import { Component, OnInit, SecurityContext } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BlogService } from '../blog-list/blog.service';
import { TagService } from './tag.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Blog, Category, Tag } from '../blog-list/blog.model';
import { ToastrService } from 'ngx-toastr'; // Import ToastrService
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-blog-tag',
  standalone: true,
  imports: [
    RouterModule,
    CommonModule
  ],
  templateUrl: './blog-tag.component.html',
  styleUrls: ['./blog-tag.component.css']
})
export class BlogTagComponent implements OnInit {
  blogs: Blog[] = [];
  tagId: string | null = null;

  categories: Category[] = [];
  tags: Tag[] = [];
  recentBlogs: Blog[] = [];

  currentPage: number = 1;
  pageSize: number = 4; // Number of blogs per page
  totalPages: number = 1; // Initially set to 1
  paginationRange: number[] = [];
  noTagsMessage: string = '';

  // spinner
  loadingBlogs: boolean = true;  // this.loadingBlogs = false;
  loadingCategories: boolean = true; // this.loadingCategories = false;
  loadingTags: boolean = true; // this.loadingTags = false;
  loadingRecentBlogs: boolean = false; //this.loadingRecentBlogs = false;

  constructor(
    private route: ActivatedRoute,
    private blogService: BlogService,
    private toastr: ToastrService, // Inject ToastrService
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.tagId = params.get('tagId');
      if (this.tagId) {
        this.loadGetBlogsByTag();
      }
    });

    this.loadCategories();
    this.loadRecentBlogs();
    this.loadTags();
  }

  loadGetBlogsByTag(): void {
    if (this.tagId) {
      this.blogService.getBlogsByTag(this.tagId, this.currentPage, this.pageSize).subscribe(
        (response: any) => {
          if (response.success) {
            this.blogs = response.data.data;
            this.totalPages = response.data.last_page;
            this.setPaginationRange();
            this.noTagsMessage = '';
            this.showToast('Blogs loaded successfully!', 'success'); // Show success toast
            this.loadingBlogs = false;
          } else {
            this.blogs = []; // Clear previous blogs
            this.noTagsMessage = response.message;
            this.showToast(this.noTagsMessage, 'info'); // Show info toast
            this.loadingBlogs = false;
          }
        },
        (error: any) => {
          if (error.status === 404 && error.error && error.error.message === 'No blogs found for this tag') {
            // Handle expected 404 error without logging
            this.blogs = []; // Clear previous blogs
            this.noTagsMessage = error.error.message;
            this.showToast(this.noTagsMessage, 'info'); // Show info toast
            this.loadingBlogs = false;
          } else {
            // Log unexpected errors
            console.error('Error fetching blogs for tag:', error);
            this.noTagsMessage = 'Error fetching blogs for this tag';
            this.showToast(this.noTagsMessage, 'error'); // Show error toast
            this.loadingBlogs = false;
          }
        }
      );
    }
  }

  loadCategories(): void {
    this.blogService.getCategories().subscribe(
      (response: any) => {
        this.categories = response.data;
        // this.showToast('Categories loaded successfully!', 'success'); // Show success toast
        this.loadingCategories = false;
      },
      (error: any) => {
        console.error('Error fetching categories:', error);
        // this.showToast('Error fetching categories', 'error'); // Show error toast
        this.loadingCategories = false;
      }
    );
  }

  loadTags(): void {
    this.blogService.getTags().subscribe(
      (response: any) => {
        this.tags = response.data;
        this.showToast('Tags loaded successfully!', 'success'); // Show success toast
        this.loadingTags = false;
      },
      (error: any) => {
        console.error('Error fetching tags:', error);
        this.showToast('Error fetching tags', 'error'); // Show error toast
        this.loadingTags = false;
      }
    );
  }

  loadRecentBlogs(): void {
    this.blogService.getRecentBlogs().subscribe(
      (response: any) => {
        if (response.success) {
          this.recentBlogs = response.recentBlogs;
          this.showToast('Recent blogs loaded successfully!', 'success'); // Show success toast
          this.loadingRecentBlogs = false;
        } else {
          console.error('Error fetching recent blogs:', response.message);
          this.showToast('Error fetching recent blogs', 'error'); // Show error toast
          this.loadingRecentBlogs = false;
        }
      },
      (error: any) => {
        console.error('Error fetching recent blogs:', error);
        this.showToast('Error fetching recent blogs', 'error'); // Show error toast
        this.loadingRecentBlogs = false;
      }
    );
  }

  sanitizeHtml(html: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(html);
  }

  getTrimmedDescription(description: SafeHtml): string {
    // Sanitize the HTML to remove any potential malicious content
    const sanitizedHtml = this.sanitizer.sanitize(SecurityContext.HTML, description);
    // Use a temporary div to convert SafeHtml to plain text
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = sanitizedHtml ?? '';
    const textContent = tempDiv.textContent || tempDiv.innerText || '';
    // Split by words and truncate to first 10 words
    const truncated = textContent.trim().split(' ').slice(0, 10).join(' ');
    return `${truncated}...`;
  }


  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.loadGetBlogsByTag();
    }
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.loadGetBlogsByTag();
    }
  }

  goToPage(page: number): void {
    this.currentPage = page;
    this.loadGetBlogsByTag();
  }

  private setPaginationRange(): void {
    this.paginationRange = [];
    for (let i = 1; i <= this.totalPages; i++) {
      this.paginationRange.push(i);
    }
  }

  private showToast(message: string, type: 'success' | 'error' | 'info' | 'warning'): void {
    switch (type) {
      case 'success':
        this.toastr.success(message, 'Success', { timeOut: 3000, positionClass: 'toast-top-right' });
        break;
      case 'error':
        this.toastr.error(message, 'Error', { timeOut: 3000, positionClass: 'toast-bottom-right' });
        break;
      case 'info':
        this.toastr.info(message, 'Information', { timeOut: 3000, positionClass: 'toast-top-right' });
        break;
      case 'warning':
        this.toastr.warning(message, 'Warning', { timeOut: 3000, positionClass: 'toast-bottom-right' });
        break;
    }
  }
}
