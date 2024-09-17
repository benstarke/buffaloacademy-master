import { Component, OnInit, ViewChild } from '@angular/core';
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
import { DxMenuModule, DxDataGridModule, DxButtonModule, DxPopupModule, DxFormModule, DxDataGridComponent, DxTextBoxModule, DxTextAreaModule } from 'devextreme-angular';

// Import libraries for excel export
import { Workbook } from 'exceljs';
import { saveAs } from 'file-saver';
import { exportDataGrid } from 'devextreme/excel_exporter';
import { DxDataGridTypes } from 'devextreme-angular/ui/data-grid';
import { unparse } from 'papaparse';


@Component({
  selector: 'app-courses-info',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    FormsModule, ReactiveFormsModule,
    DxDataGridModule,
    DxButtonModule,
    DxPopupModule,
    DxFormModule,
    DxMenuModule,
    DxTextBoxModule, DxTextAreaModule
  ],
  templateUrl: './courses-info.component.html',
  styleUrl: './courses-info.component.css'
})
export class CoursesInfoComponent implements OnInit {

  courses: Course[] = [];
  selectedCourses: any[] = [];
  isLoading: boolean = true;

  // Related
  Category: any[] = [];
  SubCategory: any[] = [];
  Type: any[] = [];
  Tag: any[] = [];
  Difficulty: any[] = [];
  Status: any[] = [];
  Currency: any[] = [];

  @ViewChild('multipleCoursesGrid', { static: false }) multipleCoursesGrid!: DxDataGridComponent;

  @ViewChild(DxDataGridComponent, { static: false }) coursesGrid!: DxDataGridComponent;

  constructor(
    private courseService: CourseService,
    private CategoryService: CategoryService,
    private SubCategoryService: SubCategoryService,
    private TagService: TagService,
    private TypeService: TypeService,
    private DifficultyService: DifficultyService,
    private StatusService: StatusService,
    private CurrencyService: CurrencyService,
    public toastr: ToastrService) { }

  ngOnInit(): void {
    this.fetchCourses();
    this.fetchCategories();
    this.fetchSubCategories();
    this.fetchTags();
    this.fetchTypes();
    this.fetchDifficulties();
    this.fetchStatus();
    this.fetchCurrencies();
  }

  fetchCourses(): void {
    // Set the spinner to be visible when the method starts
    this.isLoading = true;

    this.courseService.getCourses().subscribe(
      (response: any) => {
        // Hide the spinner when the API call is complete
        this.isLoading = false;
  
        if (response.success) {
          this.courses = response.data;
          this.showToast('Courses loaded successfully!', 'success');
        } else {
          this.courses = [];
          this.showToast(response.message, 'info');
        }
      },
      (error: any) => {
        // Hide the spinner when the API call is complete
        this.isLoading = false;
  
        // console.error('Error fetching courses:', error);
        this.showToast('Error fetching courses', 'error');
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


  

  onExporting(e: DxDataGridTypes.ExportingEvent) {
    const selectedData = e.component.getSelectedRowsData();
    switch (e.format) {
      case 'xlsx':
        this.exportToExcel(e, selectedData);
        break;
      case 'csv':
        this.exportToCSV(selectedData);
        break;
      default:
        break;
    }
    e.cancel = true; // Prevent default export
  }

  exportToExcel(e: DxDataGridTypes.ExportingEvent, selectedData: any[]) {
    const workbook = new Workbook();
    const worksheet = workbook.addWorksheet('Courses');
  
    // Export only the selected data or full data if no selection
    exportDataGrid({
      component: e.component,
      worksheet,
      autoFilterEnabled: true,
      selectedRowsOnly: selectedData.length > 0, // Export only selected rows
    }).then(() => {
      // Write the workbook buffer and save it
      workbook.xlsx.writeBuffer().then((buffer) => {
        saveAs(new Blob([buffer], { type: 'application/octet-stream' }), 'Courses.xlsx');
      });
    });
  }  

  exportToCSV(selectedData: any[]) {
    const dataToExport = selectedData.length > 0 ? selectedData : this.courses;
    const csvData = unparse(dataToExport.map(cat => ({ name: cat.name, description: cat.description })));
    const csvBlob = new Blob([csvData], { type: 'text/csv;charset=utf-8;' });
    saveAs(csvBlob, 'Courses.csv');
  }

  selectionChanged(e: any): void {
    this.selectedCourses = e.selectedRowsData; // Capture selected rows
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
