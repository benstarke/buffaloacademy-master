import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { BlogService } from '../blog.service.'; 
import { BlogStatusService } from '../status.service'; 
import { TagService } from '../../tag/tag.service';
import { CategoryService } from '../../category/category.service';
import { DxDataGridComponent } from 'devextreme-angular/ui/data-grid';
import { DxMenuComponent } from 'devextreme-angular/ui/menu';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DxDataGridModule, DxButtonModule, DxTemplateModule, DxHtmlEditorModule, DxCheckBoxModule, DxPopupModule, DxFormModule, DxTextBoxModule, DxTextAreaModule, DxMenuModule, DxSelectBoxModule } from 'devextreme-angular';

import { DxDataGridTypes } from 'devextreme-angular/ui/data-grid';



import { DomSanitizer, SafeHtml } from '@angular/platform-browser';


@Component({
  selector: 'app-blogmgmt',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    FormsModule, ReactiveFormsModule,
    DxDataGridModule,
    DxButtonModule,
    DxSelectBoxModule,
    DxPopupModule,
    DxFormModule,
    DxTextBoxModule, DxTextAreaModule,
    DxMenuModule,
    DxTemplateModule,
    DxHtmlEditorModule,
    DxCheckBoxModule,
    
    // SanitizeHtmlPipe
  ],
  templateUrl: './blogmgmt.component.html',
  styleUrls: ['./blogmgmt.component.css', './blog.component.scss']
})
export class BlogmgmtComponent implements OnInit {
  addPopupVisible = false;
  updatePopupVisible = false;
  deletePopupVisible = false;
  addBlogForm: FormGroup;
  updateBlogForm: FormGroup;
  deleteBlogForm: FormGroup;
  blogs: any[] = [];
  tagsDataSource: any[] = []; // Replace with actual data source for tags
  categoriesDataSource: any[] = []; // Replace with actual data source for categories
  statusDataSource: any[] = []; 

  blogMenuItems = [
    {
      text: "Action",
      icon: 'menu',
      items: [
        { text: "Edit", action: 'edit_record', icon: 'fa fa-edit' },
        { text: "Delete", action: 'delete_record', icon: 'fa fa-trash' }
      ]
    }
  ];

  @ViewChild(DxDataGridComponent, { static: false }) blogsGrid!: DxDataGridComponent;
  @ViewChild(DxMenuComponent, { static: false }) dxMenu!: DxMenuComponent;

  constructor(
    private blogService: BlogService, 
    public toastr: ToastrService,
    private TagService: TagService, 
    private CategoryService: CategoryService, 
    private BlogStatusService:BlogStatusService,
    private sanitizer: DomSanitizer
  ) {
    this.addBlogForm = new FormGroup({
      name: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      tags_id: new FormControl(null, Validators.required),
      blog_categories_id: new FormControl(null, Validators.required),
      blog_status_id: new FormControl(null, Validators.required),
      blog_image_path: new FormControl(null)
    });

    this.updateBlogForm = new FormGroup({
      id: new FormControl('', Validators.compose([])),
      name: new FormControl('', Validators.compose([])),
      description: new FormControl('', Validators.compose([])),
      tags_id: new FormControl('', Validators.compose([Validators.required])),
      blog_categories_id: new FormControl('', Validators.compose([Validators.required])),
      blog_status_id: new FormControl('', Validators.compose([Validators.required])),
      blog_image_path: new FormControl('', Validators.compose([]))
    });

    this.deleteBlogForm = new FormGroup({
      id: new FormControl('', Validators.required),
      name: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      tags_id: new FormControl(null, Validators.required),
      blog_categories_id: new FormControl(null, Validators.required),
      blog_status_id: new FormControl(null, Validators.required),
      blog_image_path: new FormControl(null)
    });
  }

  fetchTags(): void {
    this.TagService.getTags().subscribe(
      (response: any) => {
        if (response.success) {
          this.tagsDataSource = response.data;
          console.error('Tags loaded successfully!:', this.tagsDataSource);
          // this.showToast('tags loaded successfully!', 'success');
        } else {
          this.tagsDataSource = [];
          // this.showToast('No tags found!', 'info');
        }
      },
      (error: any) => {
        console.error('Error fetching tags:', error);
        this.showToast('Error fetching tags', 'error');
      }
    );
  }


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
    this.blogService.getBlogs().subscribe(
      (response: any) => {
        if (response.success) {
          this.blogs = response.data.map((blog: any) => ({
            ...blog,
            description: this.sanitizeHtml(blog.description)
          }));
          this.showToast('Blogs loaded successfully!', 'success');
        } else {
          this.blogs = [];
          this.showToast('No blogs found!', 'info');
        }
      },
      (error: any) => {
        console.error('Error fetching blogs:', error);
        this.showToast('Error fetching blogs', 'error');
      }
    );
  }

  

  fetchCategories(): void {
    this.CategoryService.getCategories().subscribe(
      (response: any) => {
        if (response.success) {
          this.categoriesDataSource = response.data;
          console.error('Categories loaded successfully!:', this.categoriesDataSource);
          // this.showToast('Category loaded successfully!', 'success');
        } else {
          this.categoriesDataSource = [];
          // this.showToast('No Category found!', 'info');
        }
      },
      (error: any) => {
        console.error('Error fetching category:', error);
        this.showToast('Error fetching category', 'error');
      }
    );
  }

  fetchStatus(): void {
    this.BlogStatusService.getBlogStatus().subscribe(
      (response: any) => {
        if (response.success) {
          this.statusDataSource = response.data;
          console.error('Status loaded successfully!:', this.statusDataSource);
          // this.showToast('Status loaded successfully!', 'success');
        } else {
          this.statusDataSource = [];
          // this.showToast('No Status found!', 'info');
        }
      },
      (error: any) => {
        console.error('Error fetching status:', error);
        this.showToast('Error fetching status', 'error');
      }
    );
  }

  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.addBlogForm.patchValue({
        blog_image_path: file
      });
    }
  }
  
  

  onAddBlogClick(): void {
    this.addPopupVisible = true;
  }

  onAddBlogSubmit(): void {
    if (this.addBlogForm.valid) {
      const formData = new FormData();
      Object.keys(this.addBlogForm.controls).forEach(key => {
        formData.append(key, this.addBlogForm.get(key)?.value);
      });
  
      this.blogService.addBlog(formData).subscribe(
        (response: any) => {
          if (response.success) {
            console.log('Blog added successfully:', response);
            this.fetchBlogs(); // Refresh the blog list
            this.addBlogForm.reset(); // Clear the form after adding
            this.addPopupVisible = false; // Close the add popup
            this.toastr.success('Blog added successfully');
          } else {
            console.error('Error adding blog:', response.message);
            this.toastr.error(response.message);
          }
        },
        (error: any) => {
          console.error('Error adding blog:', error);
          if (error.status === 422 && error.error.errors) {
            if (error.error.errors.name) {
              this.toastr.error('Blog already exists');
            } else {
              this.toastr.error('Error adding blog');
            }
          } else {
            this.toastr.error('Error adding blog');
          }
        }
      );
    } else {
      // Form is invalid, display a toast message for each invalid field
      Object.keys(this.addBlogForm.controls).forEach(key => {
        if (this.addBlogForm.controls[key].invalid) {
          this.toastr.error(`${key} is required or invalid`);
        }
      });
    }
  }
  
  

  onUpdateBlogSubmit(): void {
    if (this.updateBlogForm.valid) {
      const formData = new FormData();
      Object.keys(this.updateBlogForm.controls).forEach(key => {
        const control = this.updateBlogForm.get(key);
        if (control) {
          formData.append(key, control.value);
        }
      });

      const id = this.updateBlogForm.get('id')?.value;

      this.blogService.updateBlog(id, formData).subscribe(
        (response: any) => {
          if (response && response.success) {
            console.log('Blog updated successfully:', response);
            this.fetchBlogs(); // Refresh the blog list if needed
            this.updateBlogForm.reset(); // Clear the form after updating
            this.toastr.success('Blog updated successfully');
          } else {
            console.error('Error updating blog:', response);
            this.toastr.error('Failed to update blog');
          }
        },
        (error: any) => {
          console.error('Error updating blog:', error);
          this.toastr.error('Failed to update blog');
        }
      );
    } else {
      // Form is invalid, display a toast message for each invalid field
      Object.keys(this.updateBlogForm.controls).forEach(key => {
        if (this.updateBlogForm.controls[key].invalid) {
          this.toastr.error(`${key} is required or invalid`);
        }
      });
    }
  }
  
  
  
  
  

  onDeleteBlogSubmit(): void {
    const blogId = this.deleteBlogForm.value.id;
    // Assuming your service method for deleting a blog post
    this.blogService.deleteBlog(blogId).subscribe(
      (response: any) => {
        console.log('Blog deleted successfully:', response);
        this.fetchBlogs(); // Refresh the blog list after deletion
        this.deletePopupVisible = false; // Close the delete popup
        this.toastr.success('Blog deleted successfully');
      },
      (error: any) => {
        console.error('Error deleting blog:', error);
        this.toastr.error('Error deleting blog');
      }
    );
  }

  onPopupHidden(): void {
    this.fetchBlogs(); // Refresh the blog list after popup hidden
  }

  blogActionColClick(e: any, data: any): void {
    const action = e.itemData.action;
    if (action === 'edit_record') {
      this.updateBlogForm.patchValue(data.data); // Populate update form with selected blog data
      this.updatePopupVisible = true;
    } else if (action === 'delete_record') {
      this.deleteBlogForm.patchValue(data.data); // Populate delete form with selected blog data
      this.deletePopupVisible = true;
    }
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
        this.toastr.info(message, 'Information', { timeOut: 3000, positionClass: 'toast-top-right' });
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
