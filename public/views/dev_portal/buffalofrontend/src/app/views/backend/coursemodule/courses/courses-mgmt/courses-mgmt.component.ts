import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Course } from '../course.model'; 
import { CourseService } from '../course.services';

// Related
import { CategoryService } from '../../course-category/category.service'; 
import { SubCategoryService } from '../../course-sub-category/subcategory.service';
import { TagService } from '../../course-tag/tag.services';
import { TypeService } from '../../course-type/type.services';
import { DifficultyService } from '../../course-difficulty/difficulty.service';
import { StatusService } from '../../course-status/status.service';
import { CurrencyService } from '../../app-currencies/currencies.services';

import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DxDataGridModule, DxButtonModule, DxPopupModule, DxFormModule, DxTextBoxModule, DxTextAreaModule, DxMenuModule, DxSelectBoxModule, DxNumberBoxModule,} from 'devextreme-angular';
import { DxDataGridComponent } from 'devextreme-angular/ui/data-grid';
import { DxMenuComponent } from 'devextreme-angular/ui/menu';
import { HttpEventType, HttpEvent, HttpClient, HttpHeaders } from '@angular/common/http';


@Component({
  selector: 'app-courses-mgmt',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    FormsModule, ReactiveFormsModule,
    DxDataGridModule,
    DxButtonModule,
    DxPopupModule,
    DxFormModule,
    DxTextBoxModule, DxTextAreaModule,
    DxMenuModule,
    DxSelectBoxModule,
    DxNumberBoxModule,
  ],
  templateUrl: './courses-mgmt.component.html',
  styleUrl: './courses-mgmt.component.css'
})
export class CoursesMgmtComponent implements OnInit {
  addPopupVisible = false;
  updatePopupVisible = false;
  deletePopupVisible = false;
  addCourseForm: FormGroup;
  updateCourseForm: FormGroup;
  deleteCourseForm: FormGroup;
  Courses: Course[] = [];
  noCoursesMessage = '';
  createdResponsePopupVisible = false;
  editedResponsePopupVisible = false;
  deletedResponsePopupVisible = false;
  selectedCourses: Course[] = [];

  isLoading: boolean = true;
  isSubmitting = false;
  isSubmittingSave = false;  // For the "Save" button
  isSubmittingSaveAndAddAnother = false;  // For the "Save and Add Another" button

  // Related
  Category: any[] = [];
  SubCategory: any[] = [];
  Type: any[] = [];
  Tag: any[] = [];
  Difficulty: any[] = [];
  Status: any[] = [];
  Currency: any[] = [];

  // file uploads
  // Other properties
  fileError: string | null = null; // Declare fileError with initial value null
  uploadProgress: number = -1; // Initialize upload progress to -1 to hide progress bar initially


  // delete multiple records
  deleteMultiplePopupVisible = false; // Control the visibility of the delete popup
  selectedCourseForDeletion: any[] = [];  
  selectedCourseCount: number = 0;  // Holds the count of selected categories for deletion

  @ViewChild('multipleCourseGrid', { static: false }) multipleCourseGrid!: DxDataGridComponent;
  @ViewChild(DxDataGridComponent, { static: false }) CoursesGrid!: DxDataGridComponent;
  @ViewChild(DxMenuComponent, { static: false }) dxMenu!: DxMenuComponent;
  @ViewChild('fileInput') fileInput!: ElementRef;  // Use '!' to tell TypeScript that this will be initialized later


  // Course type otpions
  CourseTypeOptions = [
    { value: 'video', text: 'Video' },
    { value: 'document', text: 'Document' },
    { value: 'zipped', text: 'Zipped file' },
    { value: 'dataset', text: 'Dataset' },
    // { value: 'quiz', text: 'Questions' },
    { value: 'others', text: 'Others' },
  ];

  permitCourseMenuItems = [
    {
      text: "Action",
      icon: 'menu',
      items: [
        { text: "Edit", action: 'edit_record', icon: 'fa fa-edit' },
        { text: "Delete", action: 'delete_record', icon: 'fa fa-trash' }
      ]
    }
  ];

  // Define the menu items for the action menu
  permitGeneralCourseMenuItems = [
    {
        text: "Menu",
        icon: 'fa fa-bars', // Using a Font Awesome icon for the menu
        items: [
            { text: "Add", action: 'add_Course', icon: 'fa fa-plus' },
            { text: "Delete", action: 'delete_Course', icon: 'fa fa-trash', cssClass: 'red-text' }
        ]
    }
  ];

  onMenuItemClick(event: any): void {
    const action = event.itemData.action;
  
    switch (action) {
        case 'add_Course':
            this.onAddCourseClick();
            break;
        case 'delete_Course':
            this.onDeleteMultipleCourseSubmit();
            break;
        default:
            break;
    }
  }

  // STEP FORMS
  // update
  currentStep: number = 1; // Track which step the user is on 
  // add
  selectedTabIndex: number = 0;
  tabSteps: any[] = [
    { index: 0, title: 'Step 1', valid: false },
    { index: 1, title: 'Step 2', valid: false },
    { index: 2, title: 'Preview', valid: false },
  ];

  subCategory: any[] = [];


  constructor(
    private CourseService: CourseService, 
    public toastr: ToastrService,
    private CategoryService: CategoryService,
    private SubCategoryService: SubCategoryService,
    private TagService: TagService,
    private TypeService: TypeService,
    private DifficultyService: DifficultyService,
    private StatusService: StatusService,
    private CurrencyService: CurrencyService,
    private http: HttpClient, ) {
    this.addCourseForm = new FormGroup({
      title_en: new FormControl('', Validators.required),
      course_category_id: new FormControl('', Validators.required),
      course_sub_category_id: new FormControl('', Validators.required),
      course_type_id: new FormControl('', Validators.required),
      course_difficulty_id: new FormControl('', Validators.required),
      course_tag_id: new FormControl('', Validators.required),
      course_status_id: new FormControl('', Validators.required),
      currency_id: new FormControl('', Validators.required),
      subscription_price: new FormControl('', Validators.required),
      duration: new FormControl('', Validators.required),
      image: new FormControl('', Validators.required),
      thumbnail_image: new FormControl('', Validators.required),
      thumbnail_video: new FormControl('', Validators.required),
    });

    this.updateCourseForm = new FormGroup({
      id: new FormControl('', Validators.required),
      title_en: new FormControl('', Validators.required),
      course_category_id: new FormControl('', Validators.required),
      course_sub_category_id: new FormControl('', Validators.required),
      course_type_id: new FormControl('', Validators.required),
      course_difficulty_id: new FormControl('', Validators.required),
      course_tag_id: new FormControl('', Validators.required),
      course_status_id: new FormControl('', Validators.required),
      currency_id: new FormControl('', Validators.required),
      subscription_price: new FormControl('', Validators.required),
      duration: new FormControl('', Validators.required),
      image: new FormControl('', Validators.required),
      thumbnail_image: new FormControl('', Validators.required),
      thumbnail_video: new FormControl('', Validators.required),
    });

    this.deleteCourseForm = new FormGroup({
      id: new FormControl('', Validators.required),
      title_en: new FormControl('', Validators.required),
      course_category_id: new FormControl('', Validators.required),
      course_sub_category_id: new FormControl('', Validators.required),
      course_type_id: new FormControl('', Validators.required),
      course_difficulty_id: new FormControl('', Validators.required),
      course_tag_id: new FormControl('', Validators.required),
      course_status_id: new FormControl('', Validators.required),
      currency_id: new FormControl('', Validators.required),
      subscription_price: new FormControl('', Validators.required),
      duration: new FormControl('', Validators.required),
      image: new FormControl('', Validators.required),
      thumbnail_image: new FormControl('', Validators.required),
      thumbnail_video: new FormControl('', Validators.required),
    });
  
    // Mapping for user-friendly field names
    this.fieldNames = {
      title_en: 'Course Title',
      course_category_id: 'Course Category',
      course_sub_category_id: 'Course SubCategory',
      course_type_id: 'Course Type',
      course_difficulty_id: 'Course Level',
      course_tag_id: 'Course Tag',
      course_status_id: 'Course Status',
      currency_id: 'System currency',
      subscription_price: 'Course Subscription fee',
      duration: 'Course Duration',
      image: 'Course image',
      thumbnail_image: 'Course thumbnail image',
      thumbnail_video: 'Course thumbnail video',
    };
  }


  // Field name mapping object
  private fieldNames: { [key: string]: string };

  // Tracks the current step in the add form
  currentAddStep: number = 1;

  ngOnInit(): void {
    this.fetchCourses();
    this.fetchCategories();
    this.fetchSubCategories();
    this.fetchTags();
    this.fetchTypes();
    this.fetchDifficulties();
    this.fetchStatus();
    this.fetchCurrencies();

    // Listen for category selection changes
    this.addCourseForm.get('course_category_id')?.valueChanges.subscribe((categoryId) => {
      if (categoryId) {
        this.updateSubCategories(categoryId);
      } else {
        this.SubCategory = []; // Clear subcategories if no category is selected
      }
    });

    // tab step form
    // Initialize form and set validation watchers
    this.addCourseForm.statusChanges.subscribe(() => {
      this.updateTabStatus();
    });

    // Watch for form changes to update validation status dynamically
    this.addCourseForm.valueChanges.subscribe(() => {
      this.updateTabStatus();
    });
  }

  updateSubCategories(categoryId: string): void {
    // Retrieve the token from localStorage
    const token = localStorage.getItem('token');
    let headers = new HttpHeaders();
  
    // Add Authorization header if token is available
    if (token) {
      headers = headers.set('Authorization', `Bearer ${token}`);
    }
  
    // Call the service to get the related subcategories
    this.CourseService.getSubCategoriesByCategory(categoryId, headers).subscribe(
      (subCategories) => {
        if (subCategories && subCategories.length > 0) {
          this.SubCategory = subCategories; // Update the subcategory options
  
          // Reset and enable the subcategory field
          const subCategoryControl = this.addCourseForm.get('course_sub_category_id');
          subCategoryControl?.reset();
          subCategoryControl?.enable();
          subCategoryControl?.markAsUntouched();
        } else {
          this.SubCategory = [];
          this.addCourseForm.get('course_sub_category_id')?.disable(); // Disable if no subcategories are available
        }
      },
      (error) => {
        this.showToast('Error fetching subcategories', 'error');
        this.SubCategory = [];
        this.addCourseForm.get('course_sub_category_id')?.disable(); // Disable if error occurs
      }
    );
  }
  
  
  
  

  fetchCourses(): void {
    // Set the spinner to be visible when the method starts
    this.isLoading = true;

    this.CourseService.getCourses().subscribe(
      (response: any) => {
        // Hide the spinner when the API call is complete
        this.isLoading = false;

        if (response.success) {
          this.Courses = response.data;
          this.noCoursesMessage = '';
        } else {
          this.Courses = [];
          this.noCoursesMessage = response.message;
          this.showToast(this.noCoursesMessage, 'info');
        }
      },
      (error: any) => {
        // Hide the spinner when the API call is complete
        this.isLoading = false;

        if (error.Course === 404 && error.error && error.error.message === 'No Courses found!') {
          this.Courses = [];
          this.noCoursesMessage = error.error.message;
          this.showToast(this.noCoursesMessage, 'info');
        } else {
          this.noCoursesMessage = 'Error fetching Courses';
          this.showToast(this.noCoursesMessage, 'error');
        }
      }
    );
  }

  // RELATED

  fetchCategories() {
    this.CategoryService.getCategories().subscribe(
      (response: any) => {
        // console.log('Full API Response:', response); // Log the full response for debugging
  
        // Check if the response is successful
        if (response.success) {
          this.Category = response.data; // Assign the 'data' array to the Category property
          console.log('Categorys fetched successfully:', this.Category); // Log the fetched Categorys
        } else {
          console.warn('Categories fetch was not successful:', response.message); // Handle unsuccessful responses
        }
      },
      (error: any) => {
        console.error('Error fetching Categorys:', error); // Handle API error
        // Optionally, show a message to the user
      }
    );
  }

  fetchSubCategories() {
    this.SubCategoryService.getSubCategories().subscribe(
      (response: any) => {
        // console.log('Full API Response:', response); // Log the full response for debugging
  
        // Check if the response is successful
        if (response.success) {
          this.SubCategory = response.data; // Assign the 'data' array to the SubCategory property
          console.log('SubCategories fetched successfully:', this.SubCategory); // Log the fetched SubCategorys
        } else {
          console.warn('SubCategories fetch was not successful:', response.message); // Handle unsuccessful responses
        }
      },
      (error: any) => {
        console.error('Error fetching SubCategories:', error); // Handle API error
        // Optionally, show a message to the user
      }
    );
  }


  fetchTags() {
    this.TagService.getTags().subscribe(
      (response: any) => {
        // console.log('Full API Response:', response); // Log the full response for debugging
  
        // Check if the response is successful
        if (response.success) {
          this.Tag = response.data; // Assign the 'data' array to the Tag property
          console.log('Tags fetched successfully:', this.Tag); // Log the fetched Tags
        } else {
          console.warn('Tags fetch was not successful:', response.message); // Handle unsuccessful responses
        }
      },
      (error: any) => {
        console.error('Error fetching Tags:', error); // Handle API error
        // Optionally, show a message to the user
      }
    );
  }


  fetchTypes() {
    this.TypeService.getTypes().subscribe(
      (response: any) => {
        // console.log('Full API Response:', response); // Log the full response for debugging
  
        // Check if the response is successful
        if (response.success) {
          this.Type = response.data; // Assign the 'data' array to the Type property
          console.log('Types fetched successfully:', this.Type); // Log the fetched Types
        } else {
          console.warn('Types fetch was not successful:', response.message); // Handle unsuccessful responses
        }
      },
      (error: any) => {
        console.error('Error fetching Types:', error); // Handle API error
        // Optionally, show a message to the user
      }
    );
  }


  fetchDifficulties() {
    this.DifficultyService.getDifficulties().subscribe(
      (response: any) => {
        // console.log('Full API Response:', response); // Log the full response for debugging
  
        // Check if the response is successful
        if (response.success) {
          this.Difficulty = response.data; // Assign the 'data' array to the Difficulty property
          console.log('Difficultys fetched successfully:', this.Difficulty); // Log the fetched Difficultys
        } else {
          console.warn('Difficultys fetch was not successful:', response.message); // Handle unsuccessful responses
        }
      },
      (error: any) => {
        console.error('Error fetching Difficultys:', error); // Handle API error
        // Optionally, show a message to the user
      }
    );
  }

  fetchStatus() {
    this.StatusService.getStatuses().subscribe(
      (response: any) => {
        // console.log('Full API Response:', response); // Log the full response for debugging
  
        // Check if the response is successful
        if (response.success) {
          this.Status = response.data; // Assign the 'data' array to the Status property
          console.log('Statuss fetched successfully:', this.Status); // Log the fetched Statuss
        } else {
          console.warn('Categories fetch was not successful:', response.message); // Handle unsuccessful responses
        }
      },
      (error: any) => {
        console.error('Error fetching Statuss:', error); // Handle API error
        // Optionally, show a message to the user
      }
    );
  }

  fetchCurrencies() {
    this.CurrencyService.getCurrencies().subscribe(
      (response: any) => {
        // console.log('Full API Response:', response); // Log the full response for debugging
  
        // Check if the response is successful
        if (response.success) {
          this.Currency = response.data; // Assign the 'data' array to the Currencies property
          console.log('Currencies fetched successfully:', this.Currency); // Log the fetched Currenciess
        } else {
          console.warn('Categories fetch was not successful:', response.message); // Handle unsuccessful responses
        }
      },
      (error: any) => {
        console.error('Error fetching Currencies:', error); // Handle API error
        // Optionally, show a message to the user
      }
    );
  }


   // ****************************************************** CREATE FUNCTIONALITY ***********************************************

  onAddCourseClick(): void {
    this.addPopupVisible = true;
    this.selectedTabIndex = 0;  // Start at step 1 (tab 1)
  }
  // title_en: new FormControl('', Validators.required),
  //     course_category_id: new FormControl('', Validators.required),
  //     course_sub_category_id: new FormControl('', Validators.required),
  //     course_type_id: new FormControl('', Validators.required),
  //     course_difficulty_id: new FormControl('', Validators.required),
  //     course_tag_id: new FormControl('', Validators.required),
  //     course_status_id: new FormControl('', Validators.required),
  //     currency_id: new FormControl('', Validators.required),
  //     subscription_price: new FormControl('', Validators.required),
  //     duration: new FormControl('', Validators.required),
  //     image: new FormControl('', Validators.required),
  //     thumbnail_image: new FormControl('', Validators.required),
  //     thumbnail_video: new FormControl('', Validators.required),

  updateTabStatus(): void {
    // Step 1 validation
    this.tabSteps[0].valid = this.addCourseForm.get('title_en')?.valid &&
                             this.addCourseForm.get('course_curriculum_id')?.valid &&
                             this.addCourseForm.get('minutes')?.valid &&
                             this.addCourseForm.get('seconds')?.valid;
    
    // Step 2 validation (enabled if Step 1 is valid)
    if (this.tabSteps[0].valid) {
      this.tabSteps[1].valid = this.addCourseForm.get('description')?.valid &&
                               this.addCourseForm.get('notes')?.valid;
    } else {
      this.tabSteps[1].valid = false;
    }

    // Preview validation (enabled if Step 2 is valid)
    if (this.tabSteps[1].valid) {
      this.tabSteps[2].valid = true;
    } else {
      this.tabSteps[2].valid = false;
    }
  }

  // Function to move to the next tab
  goToNextAddStep(): void {
    if (this.tabSteps[this.selectedTabIndex].valid) {
      this.selectedTabIndex++;
    }
  }

  // Function to move to the previous tab
  goToPreviousAddStep(): void {
    if (this.selectedTabIndex > 0) {
      this.selectedTabIndex--;
    }
  }

  // Allow moving to a tab only if the previous tab is valid
  canNavigateToTab(tabIndex: number): boolean {
    return this.tabSteps[tabIndex - 1]?.valid || tabIndex === 0;
  }


  // Method to get accepted file formats for image and video
  getAcceptForFile(field: string): string {
    if (field === 'image' || field === 'thumbnail_image') {
      return 'image/jpeg,image/png,image/jpg,image/gif';
    } else if (field === 'thumbnail_video') {
      return 'video/mp4,video/avi,video/mpeg';
    }
    return '';
  }

  // Method to handle file selection for images and videos
  onFileSelected(event: any, field: string) {
    const file = event.target.files[0];
    if (file) {
      const validFormats = this.getAcceptForFile(field);
      const acceptedFormats = validFormats.split(',');

      // Validate selected file format
      if (!acceptedFormats.includes(file.type)) {
        this.toastr.error(
          `Invalid file format for ${this.fieldNames[field]}. Accepted formats: ${validFormats}`
        );
        this.addCourseForm.controls[field].reset();
        return;
      }

      // If valid, set the file to the form control
      this.addCourseForm.patchValue({
        [field]: file,
      });
    }
  }

  // onAddCourseSubmit(addAnother: boolean): void {
  //   if (this.addCourseForm.valid) {
  //     const newCourseTitle = this.addCourseForm.get('title_en')?.value.trim();
  
  //     // Frontend validation for unique Course title
  //     const courseExists = this.Courses.some(course => course.title_en.toLowerCase() === newCourseTitle.toLowerCase());
  //     if (courseExists) {
  //       this.showToast('Course title already exists', 'error');
  //       this.isSubmittingSave = false;
  //       this.isSubmittingSaveAndAddAnother = false;
  //       return;
  //     }
  
  //     // Set spinner state based on the action
  //     if (addAnother) {
  //       this.isSubmittingSaveAndAddAnother = true; // Start spinner for "Save and Add Another"
  //     } else {
  //       this.isSubmittingSave = true; // Start spinner for "Save"
  //     }
  
  //     const token = localStorage.getItem('token');
  //     if (!token) {
  //       this.showToast('No token found. Please log in again.', 'error');
  //       this.isSubmittingSave = false;
  //       this.isSubmittingSaveAndAddAnother = false;
  //       return;
  //     }
  
  //     const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
  
  //     // Collect all the required form data
  //     const selectedCategory = this.addCourseForm.get('course_category_id')?.value;
  //     const selectedSubCategory = this.addCourseForm.get('course_sub_category_id')?.value;
  //     const selectedType = this.addCourseForm.get('course_type_id')?.value;
  //     const selectedDifficulty = this.addCourseForm.get('course_difficulty_id')?.value;
  //     const selectedTag = this.addCourseForm.get('course_tag_id')?.value;
  //     const selectedStatus = this.addCourseForm.get('course_status_id')?.value;
  //     const selectedCurrency = this.addCourseForm.get('currency_id')?.value;
  //     const selectedSubscriptionPrice = this.addCourseForm.get('subscription_price')?.value;
  //     const selectedDuration = this.addCourseForm.get('duration')?.value;
  //     const selectedImage = this.addCourseForm.get('image')?.value;
  //     const thumbnailImage = this.addCourseForm.get('thumbnail_image')?.value;
  //     const thumbnailVideo = this.addCourseForm.get('thumbnail_video')?.value;
  
  //     // Check if image is selected
  //     if (!selectedImage) {
  //       this.showToast('Please select an image to upload', 'error');
  //       this.isSubmittingSave = false;
  //       this.isSubmittingSaveAndAddAnother = false;
  //       return;
  //     }
  
  //     // Preparing form data for the request
  //     const formData = new FormData();
  //     formData.append('title_en', this.addCourseForm.get('title_en')?.value);
  //     formData.append('course_category_id', selectedCategory);
  //     formData.append('course_sub_category_id', selectedSubCategory);
  //     formData.append('course_type_id', selectedType);
  //     formData.append('course_difficulty_id', selectedDifficulty);
  //     formData.append('course_tag_id', selectedTag);
  //     formData.append('course_status_id', selectedStatus);
  //     formData.append('currency_id', selectedCurrency);
  //     formData.append('subscription_price', selectedSubscriptionPrice);
  //     formData.append('duration', selectedDuration);
  //     formData.append('image', selectedImage); // Attach the image
  //     formData.append('thumbnail_image', thumbnailImage); // Attach the thumbnail image
  //     formData.append('thumbnail_video', thumbnailVideo); // Attach the thumbnail video
  //     formData.append('created_by', token); // User identity is stored in the token
  
  //     this.uploadProgress = 0; // Reset upload progress for new upload
  
  //     this.CourseService.addCourse(formData, headers).subscribe(
  //       (event: HttpEvent<any>) => {
  //         switch (event.type) {
  //           case HttpEventType.UploadProgress:
  //             if (event.total) {
  //               this.uploadProgress = Math.round(100 * (event.loaded / event.total));
  //             }
  //             break;
  //           case HttpEventType.Response:
  //             this.uploadProgress = -1; // Reset progress
  //             if (event.body?.success) {
  //               this.fetchCourses(); // Refresh the Course list
  //               if (addAnother) {
  //                 this.addCourseForm.reset(); // Clear the form for the next entry
  //                 this.resetFileInput(); // Reset the file input manually
  //                 this.showToast('Course added successfully. You can add another.', 'success');
  //               } else {
  //                 this.addCourseForm.reset(); // Clear the form after submitting
  //                 this.addPopupVisible = false; // Close the add popup
  //                 this.resetFileInput(); // Reset the file input manually
  //                 this.showToast('Course added successfully', 'success');
  //               }
  //             } else {
  //               this.showToast(event.body?.message || 'Error adding Course', 'error');
  //             }
  //             if (addAnother) {
  //               this.isSubmittingSaveAndAddAnother = false;
  //             } else {
  //               this.isSubmittingSave = false;
  //             }
  //             break;
  //         }
  //       },
  //       (error: any) => {
  //         this.uploadProgress = -1; // Reset progress on error
  //         if (addAnother) {
  //           this.isSubmittingSaveAndAddAnother = false; // Stop spinner for "Save and Add Another"
  //         } else {
  //           this.isSubmittingSave = false; // Stop spinner for "Save"
  //         }
  
  //         if (error.status === 422 && error.error.errors) {
  //           this.showToast('Course already exists', 'error');
  //         } else {
  //           this.showToast('Error adding Course', 'error');
  //         }
  //       }
  //     );
  //   } else {
  //     // Show toast messages only for fields that are invalid
  //     Object.keys(this.addCourseForm.controls).forEach(key => {
  //       const control = this.addCourseForm.get(key);
  //       if (control && control.invalid && (control.value === null || control.value === '')) {
  //         const fieldName = this.fieldNames[key] || key; // Fallback to control name if mapping is not defined
  //         this.showToast(`${fieldName} field is required`, 'error');
  //       }
  //     });
  //     this.isSubmittingSave = false;
  //     this.isSubmittingSaveAndAddAnother = false;
  //   }
  // }

  // Define the method that will handle the change event


  onAddCourseSubmit(addAnother: boolean): void {
    if (this.addCourseForm.valid) {
      const newCourseTitle = this.addCourseForm.get('title_en')?.value.trim();
  
      // Frontend validation for unique Course title
      const courseExists = this.Courses.some(course => course.title_en.toLowerCase() === newCourseTitle.toLowerCase());
      if (courseExists) {
        this.showToast('Course title already exists', 'error');
        this.isSubmittingSave = false;
        this.isSubmittingSaveAndAddAnother = false;
        return;
      }
  
      const token = localStorage.getItem('token');
      if (!token) {
        this.showToast('No token found. Please log in again.', 'error');
        this.isSubmittingSave = false;
        this.isSubmittingSaveAndAddAnother = false;
        return;
      }
  
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
  
      // Collect form data
      const selectedCategory = this.addCourseForm.get('course_category_id')?.value;
      const selectedSubCategory = this.addCourseForm.get('course_sub_category_id')?.value;
      const selectedType = this.addCourseForm.get('course_type_id')?.value;
      const selectedDifficulty = this.addCourseForm.get('course_difficulty_id')?.value;
      const selectedDuration = this.addCourseForm.get('duration')?.value;
      const selectedImage = this.addCourseForm.get('image')?.value;
      const thumbnailImage = this.addCourseForm.get('thumbnail_image')?.value;
      const thumbnailVideo = this.addCourseForm.get('thumbnail_video')?.value;
  
      // Hidden field default values
      const courseStatusId = 'Pending'; // Default value
      const courseTagId = 'Recent';     // Default value
  
      // Currency ID handling based on course type
      let currencyId = 'USDT'; // Default value for Free courses
      if (selectedType === 'Paid') {
        currencyId = this.addCourseForm.get('currency_id')?.value; // Use the value filled by the user
      }
  
      // Check if image is selected
      if (!selectedImage) {
        this.showToast('Please select an image to upload', 'error');
        this.isSubmittingSave = false;
        this.isSubmittingSaveAndAddAnother = false;
        return;
      }
  
      // Check if the course category and sub-category combination exists
      this.CourseService.checkCategorySubCategoryCombination(selectedCategory, selectedSubCategory, headers).subscribe(
        (combinationExists: boolean) => {
          if (!combinationExists) {
            // Insert new category-sub-category combination in the backend
            this.CourseService.addCategorySubCategoryMapping(selectedCategory, selectedSubCategory, token, headers).subscribe(
              () => {
                // Submitting the course form
                const formData = new FormData();
                formData.append('title_en', this.addCourseForm.get('title_en')?.value);
                formData.append('course_category_id', this.addCourseForm.get('course_category_id')?.value);
                formData.append('course_sub_category_id', this.addCourseForm.get('course_sub_category_id')?.value);
                formData.append('course_type_id', this.addCourseForm.get('course_type_id')?.value);
                formData.append('course_difficulty_id', this.addCourseForm.get('course_difficulty_id')?.value);
                formData.append('duration', this.addCourseForm.get('duration')?.value);
                formData.append('image', this.addCourseForm.get('image')?.value);
                formData.append('thumbnail_image', this.addCourseForm.get('thumbnail_image')?.value);
                formData.append('thumbnail_video', this.addCourseForm.get('thumbnail_video')?.value);
                formData.append('course_status_id', courseStatusId); // Default hidden value
                formData.append('course_tag_id', courseTagId);       // Default hidden value
                formData.append('currency_id', currencyId);          // Default or user-provided value based on course type
                formData.append('created_by', localStorage.getItem('token') || '');
  
                this.uploadProgress = 0;
  
                this.CourseService.addCourse(formData, headers).subscribe(
                  (event: HttpEvent<any>) => {
                    switch (event.type) {
                      case HttpEventType.UploadProgress:
                        if (event.total) {
                          this.uploadProgress = Math.round(100 * (event.loaded / event.total));
                        }
                        break;
                      case HttpEventType.Response:
                        this.uploadProgress = -1;
                        if (event.body?.success) {
                          this.fetchCourses();
                          if (addAnother) {
                            this.addCourseForm.reset();
                            this.resetFileInput();
                            this.showToast('Course added successfully. You can add another.', 'success');
                          } else {
                            this.addCourseForm.reset();
                            this.addPopupVisible = false;
                            this.resetFileInput();
                            this.showToast('Course added successfully', 'success');
                          }
                        } else {
                          this.showToast(event.body?.message || 'Error adding Course', 'error');
                        }
                        this.isSubmittingSave = false;
                        this.isSubmittingSaveAndAddAnother = false;
                        break;
                    }
                  },
                  (error: any) => {
                    this.uploadProgress = -1;
                    this.isSubmittingSave = false;
                    this.isSubmittingSaveAndAddAnother = false;
                    const errorMessage = error?.error?.error || 'Error adding Course';
                    this.showToast(errorMessage, 'error');
                  }
                );
              },
              (error: any) => {
                this.showToast('Error inserting category-sub-category combination', 'error');
                this.isSubmittingSave = false;
                this.isSubmittingSaveAndAddAnother = false;
              }
            );
          } else {
            // Submit the course form if combination exists
            const formData = new FormData();
            formData.append('title_en', this.addCourseForm.get('title_en')?.value);
            formData.append('course_category_id', this.addCourseForm.get('course_category_id')?.value);
            formData.append('course_sub_category_id', this.addCourseForm.get('course_sub_category_id')?.value);
            formData.append('course_type_id', this.addCourseForm.get('course_type_id')?.value);
            formData.append('course_difficulty_id', this.addCourseForm.get('course_difficulty_id')?.value);
            formData.append('duration', this.addCourseForm.get('duration')?.value);
            formData.append('image', this.addCourseForm.get('image')?.value);
            formData.append('thumbnail_image', this.addCourseForm.get('thumbnail_image')?.value);
            formData.append('thumbnail_video', this.addCourseForm.get('thumbnail_video')?.value);
            formData.append('course_status_id', courseStatusId); // Default hidden value
            formData.append('course_tag_id', courseTagId);       // Default hidden value
            formData.append('currency_id', currencyId);          // Default or user-provided value based on course type
            formData.append('created_by', localStorage.getItem('token') || '');
  
            this.uploadProgress = 0;
  
            this.CourseService.addCourse(formData, headers).subscribe(
              (event: HttpEvent<any>) => {
                switch (event.type) {
                  case HttpEventType.UploadProgress:
                    if (event.total) {
                      this.uploadProgress = Math.round(100 * (event.loaded / event.total));
                    }
                    break;
                  case HttpEventType.Response:
                    this.uploadProgress = -1;
                    if (event.body?.success) {
                      this.fetchCourses();
                      if (addAnother) {
                        this.addCourseForm.reset();
                        this.resetFileInput();
                        this.showToast('Course added successfully. You can add another.', 'success');
                      } else {
                        this.addCourseForm.reset();
                        this.addPopupVisible = false;
                        this.resetFileInput();
                        this.showToast('Course added successfully', 'success');
                      }
                    } else {
                      this.showToast(event.body?.message || 'Error adding Course', 'error');
                    }
                    this.isSubmittingSave = false;
                    this.isSubmittingSaveAndAddAnother = false;
                    break;
                }
              },
              (error: any) => {
                this.uploadProgress = -1;
                this.isSubmittingSave = false;
                this.isSubmittingSaveAndAddAnother = false;
                const errorMessage = error?.error?.error || 'Error adding Course';
                this.showToast(errorMessage, 'error');
              }
            );
          }
        },
        (error: any) => {
          this.showToast('Error checking category-sub-category combination', 'error');
          this.isSubmittingSave = false;
          this.isSubmittingSaveAndAddAnother = false;
        }
      );
    } else {
      // Show toast for invalid fields
      Object.keys(this.addCourseForm.controls).forEach(key => {
        const control = this.addCourseForm.get(key);
        if (control && control.invalid && (control.value === null || control.value === '')) {
          const fieldName = this.fieldNames[key] || key;
          this.showToast(`${fieldName} cannot be empty`, 'error');
        }
      });
      this.isSubmittingSave = false;
      this.isSubmittingSaveAndAddAnother = false;
    }
  }
  
  
  

  onPopupHidden() {
    this.fetchCourses();
  }

  funcEditDetails(data: any) {
    this.updateCourseForm.patchValue(data.data);
    this.updatePopupVisible = true;
  }

  onUpdateCourseSubmit(): void {
    if (this.updateCourseForm.valid) {
        const currentCourseId = this.updateCourseForm.get('id')?.value;
        const updatedCourseName = this.updateCourseForm.get('title')?.value.trim();
        const selectedType = this.updateCourseForm.get('type')?.value;
        const contentFile = this.updateCourseForm.get('content')?.value;

        // Frontend validation for unique Course title (excluding current Course)
        const CourseExists = this.Courses.some(Course => 
            Course.title_en.toLowerCase() === updatedCourseName.toLowerCase() && 
            Course.id !== currentCourseId
        );

        if (CourseExists) {
            this.showToast('Course title already exists in another record', 'error');
            this.isSubmitting = false;
            return;
        }

        this.isSubmitting = true; 

        const token = localStorage.getItem('token');
        if (!token) {
            this.showToast('Please log in again.', 'error');
            this.isSubmitting = false;
            return;
        }

        const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
        const formData = new FormData();

        // Prepare form data
        formData.append('title', this.updateCourseForm.get('title')?.value || '');
        formData.append('lesson_id', this.updateCourseForm.get('lesson_id')?.value || '');
        formData.append('type', selectedType || '');

        // Only append 'content' if a new file is selected
        if (contentFile && contentFile instanceof File) {
            formData.append('content', contentFile);
        }

        // 'updated_by' is handled by the backend based on the token/user, so it's optional to send it from frontend
        // Remove the following line if the backend manages 'updated_by'
        // formData.append('updated_by', localStorage.getItem('email') || 'Unknown');

        // Debugging FormData (optional, remove in production)
        formData.forEach((value, key) => {
            console.log(`${key}:`, value);
        });

        this.uploadProgress = 0; 

        // Ensure that the 'id' is passed in the URL, not in the FormData
        this.CourseService.updateCourse(currentCourseId, formData, headers).subscribe(
            (event: HttpEvent<any>) => {
                switch (event.type) {
                    case HttpEventType.UploadProgress:
                        if (event.total) {
                            this.uploadProgress = Math.round(100 * (event.loaded / event.total));
                        }
                        break;
                    case HttpEventType.Response:
                        this.uploadProgress = -1; 
                        if (event.body?.success) {
                            this.fetchCourses(); 
                            this.updateCourseForm.reset(); 
                            this.updatePopupVisible = false; 
                            this.showToast('Course updated successfully', 'info');
                        } else {
                            this.showToast(event.body?.message || 'Error updating Course', 'error');
                        }
                        this.isSubmitting = false; 
                        break;
                }
            },
            (error: any) => {
                this.uploadProgress = -1;
                this.isSubmitting = false; 
                // Handle validation errors from backend
                if (error.status === 400 && error.error.error) {
                    const errors = error.error.error;
                    Object.keys(errors).forEach(key => {
                        const messages = errors[key];
                        this.showToast(`${key}: ${messages.join(', ')}`, 'error');
                    });
                } else {
                    this.showToast('Error updating Course', 'error');
                }
            }
        );
    } else {
        // Show toast messages for invalid fields
        Object.keys(this.updateCourseForm.controls).forEach(key => {
            const control = this.updateCourseForm.get(key);
            if (control && control.invalid && (control.value === null || control.value === '')) {
                const fieldName = this.fieldNames[key] || key; 
                this.showToast(`${fieldName} field is required`, 'error');
            }
        });
        this.isSubmitting = false; 
    }
}




  // This is a placeholder for your logic to handle different file types
  isFileType() {
    const selectedType = this.updateCourseForm.get('type')?.value;
    return selectedType === 'pdf' || selectedType === 'image'; // Adjust based on your use case
  }
  // Manually reset the file input field
  resetFileInput(): void {
      if (this.fileInput) {
          this.fileInput.nativeElement.value = ''; // Clear the file input
      }
  }


  funcDeleteDetails(data:any) {
    this.deleteCourseForm.patchValue(data.data);
    this.deletePopupVisible = true;
  }
  
  
  onDeleteCourseSubmit(): void {
    this.isSubmitting = true;  // Start spinner
    const tagId = this.deleteCourseForm.value.id;
    
    const token = localStorage.getItem('token');
    if (!token) {
        this.showToast('Please log in again.', 'error');
        this.isSubmitting = false;  // Stop spinner
        return;
    }

    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    this.CourseService.deleteCourse(tagId, headers).subscribe(
        (response) => {
            this.isSubmitting = false;  // Stop spinner
            this.fetchCourses(); // Refresh the tag list after deletion
            this.deletePopupVisible = false; // Close the delete popup
            this.showToast('Course deleted successfully', 'warning');
        },
        (error) => {
            this.isSubmitting = false;  // Stop spinner
            this.showToast('Error deleting course Course', 'error');
        }
    );
  }


  onDeleteMultipleCourseSubmit(): void {
    const selectedCourses = this.multipleCourseGrid.instance.getSelectedRowsData();
    if (selectedCourses.length === 0) {
        this.showToast('No course Courses selected.', 'error');
        return;
    }

    // Store the selected Courses for deletion and their count
    this.selectedCourseForDeletion = selectedCourses;
    this.selectedCourseCount = selectedCourses.length;
    this.deleteMultiplePopupVisible = true;  // Show the confirmation popup
  }

  confirmDeleteMultipleCourse(): void {
      this.isSubmitting = true;  // Start spinner

      const CourseIds = this.selectedCourseForDeletion.map((Course: any) => Course.id);
      const token = localStorage.getItem('token');
      if (!token) {
          this.showToast('Please log in again.', 'error');
          this.isSubmitting = false;  // Stop spinner
          return;
      }

      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

      this.CourseService.deleteMultipleCourses(CourseIds, headers).subscribe(
          () => {
              this.isSubmitting = false;  // Stop spinner
              this.fetchCourses();  // Refresh the Course list after deletion
              this.deleteMultiplePopupVisible = false;  // Close the delete popup
              this.showToast(`${this.selectedCourseCount} Course(s) deleted successfully`, 'warning');
          },
          (error) => {
              this.isSubmitting = false;  // Stop spinner
              this.showToast('Error deleting Courses', 'error');
          }
      );
  }
 

  permitCourseActionColClick(e: any,  data: any) {
    var action_btn = e.itemData;
    if (action_btn.action === 'edit_record') {
      this.funcEditDetails(data);
    } 
    else if (action_btn.action === 'delete_record') {
      this.funcDeleteDetails(data);
    }
  }

  selectionChanged(data: any): void {
    this.selectedCourses = data.selectedRowsData;
  }

  onExportSelected(): void {
    // Export functionality remains unchanged
  }

  onColumnReordered(event: any): void {
    console.log('Columns reordered:', event);
  }

  private showToast(message: string, Course: 'success' | 'error' | 'info' | 'warning'): void {
    switch (Course) {
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
      default:
        console.warn(`Unsupported toast Course: ${Course}`);
        break;
    }
  }
}
