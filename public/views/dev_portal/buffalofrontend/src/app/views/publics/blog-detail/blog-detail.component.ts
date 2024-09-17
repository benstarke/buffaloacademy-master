import { RouterModule } from '@angular/router';
import { Component, OnInit, SecurityContext } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BlogService } from '../blog-list/blog.service'; 
import { Blog, Category, Tag } from '../blog-list/blog.model'; 
import { CommonModule } from '@angular/common';
import { switchMap, filter } from 'rxjs/operators';
import { of } from 'rxjs';

import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-blog-detail',
  standalone: true,
  imports: [
    RouterModule,
    CommonModule
  ],
  templateUrl: './blog-detail.component.html',
  styleUrls: ['./blog-detail.component.css']
})
export class BlogDetailComponent implements OnInit {
  blog: any;
  relatedRecentBlogs: Blog[] = [];
  relatedCategories: Category[] = [];
  relatedTags: Tag[] = [];

  noRelatedCategoryMessage: string = '';
  noRelatedTagsMessage: string = '';
  noRecentRelatedBlogsMessage: string = '';

  // spinner
  loadingBlogs: boolean = true;  // this.loadingBlogs = false;
  loadingRelatedCategories: boolean = true; // this.loadingRelatedCategories = false;
  loadingRelatedRecentBlogs: boolean = true; // loadingRelatedRecentBlogs = false;
  loadingRelatedTags: boolean = true; // this.loadingRelatedTags = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private blogService: BlogService,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    this.route.paramMap.pipe(
      switchMap(params => {
        const id = params.get('id');
        if (id) {
          return this.blogService.getBlogDetail(id);
        } else {
          console.error('Blog ID not found in route parameters');
          return of({ success: false, message: 'Blog ID not found in route parameters' });
        }
      })
    ).subscribe(
      (response: any) => {
        if (response.success) {
          this.blog = response.data;
          this.loadingBlogs = false;
          // this.blog.descriptionParagraphs = this.splitDescriptionIntoParagraphs(this.blog.description);
          this.loadRelatedRecentBlogs(this.blog.id);
          this.loadRelatedCategories(this.blog.id);
          this.loadRelatedTags();
        } else {
          console.error('Error fetching blog:', response.message);
          this.loadingBlogs = false;
        }
      },
      (error: any) => {
        console.error('Error fetching blog:', error);
        this.loadingBlogs = false;
      }
    );
  }


  loadRelatedRecentBlogs(blogId: string): void {
    this.blogService.getRecentRelatedBlogs(blogId).subscribe(
      (response: any) => {
        if (response.success) {
          this.relatedRecentBlogs = response.relatedRecentBlogs;
          this.noRecentRelatedBlogsMessage = '';
          this.loadingRelatedRecentBlogs = false;
        } else {
          this.relatedRecentBlogs = []; // Clear previous blogs
          this.noRecentRelatedBlogsMessage = response.message;
          this.loadingRelatedRecentBlogs = false;
        }
      },
      (error: any) => {
        if (error.status === 404 && error.error && error.error.message === 'No recent related blogs found!') {
          // Handle expected 404 error without logging
          this.relatedRecentBlogs = []; // Clear previous blogs
          this.noRecentRelatedBlogsMessage = error.error.message;
          this.loadingRelatedRecentBlogs = false;
        } else {
          // Log unexpected errors
          console.error('Error fetching recent related blogs:', error);
          this.noRecentRelatedBlogsMessage = 'Error fetching recent related blogs';
          this.loadingRelatedRecentBlogs = false;
        }
      }
    );
  }

  loadRelatedCategories(blogId: string): void {
    this.blogService.getRelatedCategories(blogId).subscribe(
      (response: any) => {
        if (response.success) {
          this.relatedCategories = response.data;
          this.noRelatedCategoryMessage = '';
          this.loadingRelatedCategories = false;
        }else {
          this.relatedCategories = []; // Clear previous blogs
          this.noRelatedCategoryMessage = response.message;
          this.loadingRelatedCategories = false;
        }
      },
      (error: any) => {
        if (error.status === 404 && error.error && error.error.message === 'No related categories found!') {
          // Handle expected 404 error without logging
          this.relatedCategories = []; // Clear previous blogs
          this.noRelatedCategoryMessage = error.error.message;
          this.loadingRelatedCategories = false;
        } else {
          // Log unexpected errors
          console.error('Error fetching related categories:', error);
          this.noRelatedCategoryMessage = 'Error fetching related categories';
          this.loadingRelatedCategories = false;
        }
      }
    );
  }

  loadRelatedTags(): void {
    if (this.blog && this.blog.id) {
      this.blogService.getRelatedTags(this.blog.id.toString()).subscribe(
        (response: any) => {
          if (response.success) {
            this.relatedTags = response.data;
            this.noRelatedTagsMessage = '';
            this.loadingRelatedTags = false;
          } else {
            this.relatedTags = []; // Clear previous blogs
            this.noRelatedTagsMessage = response.message;
            this.loadingRelatedTags = false;
          }
        },
        (error: any) => {
          if (error.status === 404 && error.error && error.error.message === 'No related tags found!') {
            // Handle expected 404 error without logging
            this.relatedTags = []; // Clear previous blogs
            this.noRelatedTagsMessage = error.error.message;
            this.loadingRelatedTags = false;
          } else {
            // Log unexpected errors
            console.error('Error fetching related tags:', error);
            this.noRelatedTagsMessage = 'Error fetching related tags';
            this.loadingRelatedTags = false;
          }
        }
      );
    }
  }

  
  sanitizeHtml(html: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(html);
  }

  // splitDescriptionIntoParagraphs(description: string): string[] {
  //   // Remove HTML tags and inline styles from description
  //   const cleanDescription = description.replace(/<[^>]*>?/gm, '');
  //   const words = cleanDescription.split(' ');
  //   const paragraphs: string[] = [];
  //   let currentParagraph = '';

  //   for (const word of words) {
  //     currentParagraph += word + ' ';
  //     if (currentParagraph.split(' ').length >= 72) {
  //       paragraphs.push(currentParagraph);
  //       currentParagraph = '';
  //     }
  //   }

  //   if (currentParagraph.trim() !== '') {
  //     paragraphs.push(currentParagraph);
  //   }

  //   return paragraphs;
  // }
}
