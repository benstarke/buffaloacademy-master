import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { DxDataGridModule, DxTemplateModule, DxHtmlEditorModule, DxCheckBoxModule } from 'devextreme-angular';
import { BlogService } from '../blog.service.'; 
import { BlogStatusService } from '../status.service'; 
import { TagService } from '../../tag/tag.service';
import { CategoryService } from '../../category/category.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { DxDataGridTypes } from 'devextreme-angular/ui/data-grid';

import { DomSanitizer, SafeHtml } from '@angular/platform-browser';


@Component({
  selector: 'app-bloginfo',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    DxDataGridModule,
    DxTemplateModule,
    DxHtmlEditorModule,
    DxCheckBoxModule,

  ],
  templateUrl: './bloginfo.component.html',
  styleUrls: ['./bloginfo.component.css']
})
export class BloginfoComponent implements OnInit {

  blogs: any[] = [];
  // sanitizedDescription: SafeHtml | undefined;
  tagsDataSource: any[] = [];
  categoriesDataSource: any[] = [];
  statusDataSource: any[] = [];
  isLoading: boolean = true;

  constructor(
    private blogService: BlogService,
    private toastr: ToastrService,
    private tagService: TagService,
    private categoryService: CategoryService,
    private blogStatusService: BlogStatusService,
    private sanitizer: DomSanitizer
  ) { }

  ngOnInit(): void {
    this.fetchBlogs();
    this.fetchTags();
    this.fetchCategories();
    this.fetchStatus();
  }

  // Master Detail API

  onContentReady(e: DxDataGridTypes.ContentReadyEvent) {
    if (!e.component.getSelectedRowKeys().length) { e.component.selectRowsByIndexes([0]); }
  }

  onSelectionChanged(e: DxDataGridTypes.SelectionChangedEvent) {
    e.component.collapseAll(-1);
    e.component.expandRow(e.currentSelectedRowKeys[0]);
  }

  // Master Detail API

  fetchBlogs(): void {
    // Set the spinner to be visible when the method starts
    this.isLoading = true;
  
    this.blogService.getBlogs().subscribe(
      (response: any) => {
        // Hide the spinner when the API call is complete
        this.isLoading = false;
  
        if (response.success) {
          if (response.data && response.data.length > 0) {
            this.blogs = response.data.map((blog: any) => ({
              ...blog,
              description: this.sanitizeHtml(blog.description)
            }));
            this.showToast('Blogs loaded successfully!', 'success');
            console.log('Blogs loaded successfully!:', this.blogs);
          } else {
            // Handle when there are no blogs but success is true
            this.blogs = [];
            this.showToast('No blogs found!', 'info');
            console.log('No blogs found!');
          }
        } else {
          // Handle failure indicated by the success flag
          this.blogs = [];
          this.showToast(response.message || 'No blogs found!', 'info');
          console.log(response.message || 'No blogs found!');
        }
      },
      (error: any) => {
        // Hide the spinner when the API call is complete
        this.isLoading = false;
  
        // Check if the error is due to a 404 status (no blogs found)
        if (error.status === 404) {
          this.blogs = [];
          this.showToast('No blogs found!', 'info');
          console.log('No blogs found!');
        } else {
          console.error('Error fetching blogs:', error);
          this.showToast('Error fetching blogs', 'error');
        }
      }
    );
  }
  
  
  

  
  fetchTags(): void {
    this.tagService.getTags().subscribe(
      (response: any) => {
        if (response.success) {
          this.tagsDataSource = response.data;
          console.error('Tags loaded successfully!:', this.tagsDataSource);
        } else {
          this.tagsDataSource = [];
        }
      },
      (error: any) => {
        console.error('Error fetching tags:', error);
        this.showToast('Error fetching tags', 'error');
      }
    );
  }

  fetchCategories(): void {
    this.categoryService.getCategories().subscribe(
      (response: any) => {
        if (response.success) {
          this.categoriesDataSource = response.data;
          console.error('Categories loaded successfully!:', this.categoriesDataSource);
        } else {
          this.categoriesDataSource = [];
        }
      },
      (error: any) => {
        console.error('Error fetching categories:', error);
        this.showToast('Error fetching categories', 'error');
      }
    );
  }

  fetchStatus(): void {
    this.blogStatusService.getBlogStatus().subscribe(
      (response: any) => {
        if (response.success) {
          this.statusDataSource = response.data;
          console.error('Status loaded successfully!:', this.statusDataSource);
        } else {
          this.statusDataSource = [];
        }
      },
      (error: any) => {
        console.error('Error fetching status:', error);
        this.showToast('Error fetching status', 'error');
      }
    );
  }

  sanitizeHtml(html: string): string {
    const doc = new DOMParser().parseFromString(html, 'text/html');
    return doc.body.textContent || "";
  }
  


  selectionChanged(data: any): void {
    // Handle selection change if needed
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
        this.toastr.info(message, 'Information', { timeOut: 3000, positionClass: 'toast-bottom-right' });
        break;
      case 'warning':
        this.toastr.warning(message, 'Warning', { timeOut: 3000, positionClass: 'toast-top-right' });
        break;
      default:
        console.warn(`Unsupported toast type: ${type}`);
        break;
    }
  }
}
