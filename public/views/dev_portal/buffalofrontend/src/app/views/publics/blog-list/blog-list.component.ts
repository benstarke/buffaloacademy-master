import { Component, OnInit, SecurityContext } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { BlogService } from './blog.service';
import { Blog, Category, Tag } from './blog.model';
import { ToastrService } from 'ngx-toastr'; // Import ToastrService
import { ToastModule } from 'primeng/toast';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { ChangeDetectorRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-blog-list',
  standalone: true,
  imports: [
    RouterModule,
    CommonModule,
    ToastModule,
    FormsModule
  ],
  templateUrl: './blog-list.component.html',
  styleUrls: ['./blog-list.component.css']
})
export class BlogListComponent implements OnInit {
  blogs: Blog[] = [];
  filteredBlogs: Blog[] = [];
  displayedBlogs: Blog[] = [];

  totalBlogs: number = 0;
  page: number = 1;
  searchText: string = '';


  categories: Category[] = [];
  tags: Tag[] = [];
  recentBlogs: Blog[] = [];

  currentPage: number = 1;
  pageSize: number = 4; // Number of blogs per page
  totalPages: number = 1; // Initially set to 1
  paginationfRange: number[] = [];

  noBlogsMessage: string = '';
  noCategoryMessage: string = '';
  noTagsMessage: string = '';
  noRecentBlogsMessage: string = '';

  // spinner
  loadingBlogs: boolean = true;
  loadingBlogCategories: boolean = true;
  loadingRecentBlogs: boolean = true;
  loadingTags: boolean = true;

  constructor(
    private blogService: BlogService, 
    private toastr: ToastrService,
    private sanitizer: DomSanitizer,
    private cdRef: ChangeDetectorRef
  ) { } // Inject ToastrService

  ngOnInit(): void {

    this.loadBlogs();
    this.loadCategories();
    this.loadTags();
    this.loadRecentBlogs(); // Load recent blogs
    this.updatePagination();
  }

  loadBlogs(): void {
    console.log('Checkpoint 1: Entering loadBlogs function');
    this.loadingBlogs = true;

    this.blogService.getBlogs(this.currentPage).subscribe(
        (response: any) => {
            console.log('Checkpoint 2: Response received', response);

            if (response.success) {
                console.log('Checkpoint 3: Response was successful');
                console.log('Total blogs received:', response.data.data.length);

                try {
                    const publishedBlogs = response.data.data.filter((blog: any) => {
                        console.log('Processing blog:', blog);
                        return blog.blog_status_id === 1;
                    });
                    console.log('Checkpoint 4: Filtered published blogs', publishedBlogs);

                    if (publishedBlogs.length > 0) {
                        console.log('Checkpoint 5: Published blogs found');

                        this.blogs = publishedBlogs.map((blog: any) => ({
                            ...blog,
                            description: this.sanitizeHtml(blog.description)
                        }));

                        this.filteredBlogs = this.blogs;
                        this.updatePagination();

                        console.log('Checkpoint 6: Updated displayedBlogs', this.displayedBlogs);
                        this.cdRef.detectChanges();
                    } else {
                        console.log('Checkpoint 7: No published blogs found');
                        this.blogs = [];
                        this.filteredBlogs = [];
                        this.displayedBlogs = [];
                        this.noBlogsMessage = 'No published blogs found!';
                    }
                } catch (error) {
                    console.error('Error processing blogs:', error);
                }
            } else {
                console.log('Checkpoint 8: API response unsuccessful');
                this.blogs = [];
                this.filteredBlogs = [];
                this.displayedBlogs = [];
                this.noBlogsMessage = response.message;
            }
            this.loadingBlogs = false;
            console.log('Checkpoint 9: Loading complete, loadingBlogs:', this.loadingBlogs);
        },
        (error: any) => {
            console.error('Error fetching blogs:', error);
            this.blogs = [];
            this.filteredBlogs = [];
            this.displayedBlogs = [];
            this.noBlogsMessage = 'Error fetching blogs';
            this.loadingBlogs = false;
            this.cdRef.detectChanges();
        }
    );
}





  // loadBlogs(): void {
  //   this.loadingBlogs = true;
  //   console.log('loadBlogs called, loadingBlogs:', this.loadingBlogs);

  //   this.blogService.getBlogs(this.currentPage).subscribe(
  //     (response: any) => {
  //       console.log('loadBlogs response received:', response);
  //       if (response.success) {
  //         const publishedBlogs = response.data.data.filter((blog: any) => blog.blog_status_id === 1);

  //         if (publishedBlogs.length > 0) {
  //           this.blogs = publishedBlogs.map((blog: any) => ({
  //             ...blog,
  //             description: this.sanitizeHtml(blog.description) // Sanitize HTML
  //           }));
  //           this.totalPages = response.data.last_page;
  //           this.setPaginationRange();
  //           this.updatePagination(); // Ensure displayedBlogs is updated
  //           this.noBlogsMessage = '';
  //           this.showToast('Blogs loaded successfully!', 'success');
  //         } else {
  //           this.blogs = [];
  //           this.noBlogsMessage = 'No published blogs found!';
  //           this.showToast(this.noBlogsMessage, 'info');
  //         }
  //       } else {
  //         this.blogs = [];
  //         this.noBlogsMessage = response.message;
  //         this.showToast(this.noBlogsMessage, 'info');
  //       }
  //       this.loadingBlogs = false;
  //       console.log('loadBlogs completed, loadingBlogs:', this.loadingBlogs);
  //     },
  //     (error: any) => {
  //       console.error('Error fetching blogs:', error);
  //       if (error.status === 404 && error.error && error.error.message === 'No blogs found!') {
  //         this.blogs = [];
  //         this.noBlogsMessage = error.error.message;
  //         this.showToast(this.noBlogsMessage, 'info');
  //       } else {
  //         this.noBlogsMessage = 'Error fetching blogs';
  //         this.showToast(this.noBlogsMessage, 'error');
  //       }
  //       this.loadingBlogs = false;
  //       console.log('loadBlogs error handling, loadingBlogs:', this.loadingBlogs);
  //     }
  //   );
  // }

  filterSearchBlogs(): void {
    console.log('Search initiated with text:', this.searchText);
    this.loadingBlogs = true;
    console.log('filterSearchBlogs called, loadingBlogs:', this.loadingBlogs);

    this.blogService.searchBlogs(this.searchText).subscribe(
      (response: any) => {
        console.log('Search response:', response);
        const publishedBlogs = response.filter((blog: any) => blog.blog_status_id === 1);
        this.filteredBlogs = publishedBlogs;
        this.totalPages = Math.ceil(this.filteredBlogs.length / this.pageSize);
        this.updatePagination();
        this.loadingBlogs = false;
        console.log('filterSearchBlogs completed, loadingBlogs:', this.loadingBlogs);
      },
      (error: any) => {
        console.error('Error searching blogs:', error);
        this.loadingBlogs = false;
        this.filteredBlogs = []; // Clear the filtered blogs on error
        console.log('filterSearchBlogs error handling, loadingBlogs:', this.loadingBlogs);
      }
    );
  }

  

  loadCategories(): void {
    this.blogService.getCategories().subscribe(
      (response: any) => {
        if (response.success) {
          this.categories = response.data;
          this.noCategoryMessage = '';
          this.showToast('Categories loaded successfully!', 'success'); // Show success toast
          this.loadingBlogCategories = false;
        } else {
          this.categories = []; // Clear previous blogs
          this.noCategoryMessage = response.message;
          this.showToast(this.noCategoryMessage, 'info'); // Show info toast
          this.loadingBlogCategories = false;
        }
      },
      (error: any) => {
        if (error.status === 404 && error.error && error.error.message === 'No categories found!') {
          // Handle expected 404 error without logging
          this.categories = []; // Clear previous blogs
          this.noCategoryMessage = error.error.message;
          this.showToast(this.noCategoryMessage, 'info'); // Show info toast
          this.loadingBlogCategories = false;
        } else {
          // Log unexpected errors
          console.error('Error fetching categories:', error);
          this.noCategoryMessage = 'Error fetching categories';
          this.showToast(this.noCategoryMessage, 'error'); // Show error toast
          this.loadingBlogCategories = false;
        }
      }
    );
  }

  loadTags(): void {
    this.blogService.getTags().subscribe(
      (response: any) => {
        if (response.success) {
          this.tags = response.data;
          this.noTagsMessage = '';
          this.showToast('Tags loaded successfully!', 'success'); // Show success toast
          this.loadingTags = false;
        } else {
          this.tags = []; // Clear previous blogs
          this.noTagsMessage = response.message;
          this.showToast(this.noTagsMessage, 'info'); // Show info toast
          this.loadingTags = false;
        }
      },
      (error: any) => {
        if (error.status === 404 && error.error && error.error.message === 'No tags found!') {
          // Handle expected 404 error without logging
          this.tags = []; // Clear previous blogs
          this.noTagsMessage = error.error.message;
          this.showToast(this.noTagsMessage, 'info'); // Show info toast
          this.loadingTags = false;
        } else {
          // Log unexpected errors
          console.error('Error fetching tags:', error);
          this.noTagsMessage = 'Error fetching tags';
          this.showToast(this.noTagsMessage, 'error'); // Show error toast
          this.loadingTags = false;
        }
      }
    );
  }

  loadRecentBlogs(): void {
    this.blogService.getRecentBlogs().subscribe(
      (response: any) => {
        if (response.success) {
          this.recentBlogs = response.recentBlogs;
          this.noRecentBlogsMessage = '';
          this.showToast('Recent blogs loaded successfully!', 'success'); // Show success toast
        } else {
          this.recentBlogs = []; // Clear previous blogs
          this.noRecentBlogsMessage = response.message || 'No recent related blogs found!';
          this.showToast(this.noRecentBlogsMessage, 'info'); // Show info toast
        }
        this.loadingRecentBlogs = false;
      },
      (error: any) => {
        if (error.error && !error.error.success && error.error.message) {
          // Handle the case where the API returns success: false in an error response
          this.recentBlogs = []; // Clear previous blogs
          this.noRecentBlogsMessage = error.error.message || 'No recent related blogs found!';
          this.showToast(this.noRecentBlogsMessage, 'info'); // Show info toast
        } 
        this.loadingRecentBlogs = false;
      }
    );
  }
  

  sanitizeHtml(html: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(html);
  }

  getTruncatedDescription(description: SafeHtml): string {
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
      this.updatePagination();
    }
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updatePagination();
    }
  }

  goToPage(page: number): void {
    if (page < 1 || page > this.totalPages) return;
    this.currentPage = page;
    this.updatePagination();
  }

  updatePagination(): void {
    console.log('Current Page:', this.currentPage);
    console.log('Page Size:', this.pageSize);
    console.log('Filtered Blogs before slicing:', this.filteredBlogs);

    this.displayedBlogs = this.filteredBlogs.slice((this.currentPage - 1) * this.pageSize, this.currentPage * this.pageSize);

    console.log('Displayed Blogs after updatePagination:', this.displayedBlogs);
    console.log('List Blogs:', this.blogs); 
    // console.log('List Published Blogs:', this.publishedBlogs);
}

//   updatePagination(): void {
//     if (this.filteredBlogs.length > 0) {
//         this.displayedBlogs = this.filteredBlogs.slice((this.currentPage - 1) * this.pageSize, this.currentPage * this.pageSize);
//     } else {
//         this.displayedBlogs = this.blogs.slice((this.currentPage - 1) * this.pageSize, this.currentPage * this.pageSize);
//     }
// }

  // updatePagination(): void {
  //   this.displayedBlogs = this.filteredBlogs.slice((this.currentPage - 1) * this.pageSize, this.currentPage * this.pageSize);
  // }

  private setPaginationRange(): void {
    this.paginationfRange = [];
    for (let i = 1; i <= this.totalPages; i++) {
      this.paginationfRange.push(i);
    }
  }

  // updatePagination(): void {
  //   this.totalPages = Math.ceil(this.filteredBlogs.length / this.pageSize);
  //   this.displayedBlogs = this.filteredBlogs.slice((this.currentPage - 1) * this.pageSize, this.currentPage * this.pageSize);
  // }

  getPageArray(): number[] {
    const pagesToShow = 5;
    const halfPagesToShow = Math.floor(pagesToShow / 2);
    let startPage = Math.max(this.currentPage - halfPagesToShow, 1);
    let endPage = startPage + pagesToShow - 1;

    if (endPage > this.totalPages) {
      endPage = this.totalPages;
      startPage = Math.max(endPage - pagesToShow + 1, 1);
    }

    const pageArray = [];
    for (let i = startPage; i <= endPage; i++) {
      pageArray.push(i);
    }
    return pageArray;
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
