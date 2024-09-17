import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { PermissionService } from '../permission.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Permission } from '../permission.model';
import { FormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { ToolbarModule } from 'primeng/toolbar';
import { ButtonModule } from 'primeng/button';
import { FileUploadModule } from 'primeng/fileupload';
import { InputTextModule } from 'primeng/inputtext';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { DropdownModule } from 'primeng/dropdown';

@Component({
  selector: 'app-permission-mgmt',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    TableModule,
    DialogModule,
    ToolbarModule,
    ButtonModule,
    FileUploadModule,
    InputTextModule,
    ConfirmDialogModule,
    ToastModule,
    DropdownModule
  ],
  templateUrl: './permission-mgmt.component.html',
  styleUrls: ['./permission-mgmt.component.css'],
  providers: [MessageService, ConfirmationService]
})
export class PermissionMgmtComponent implements OnInit {
  permissions: Permission[] = [];
  selectedPermissions: Permission[] = [];
  permissionDialog: boolean = false;
  permission: Permission = {} as Permission;
  submitted: boolean = false;
  statuses: any[] = [];

  constructor(
    private permissionService: PermissionService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    public toastr: ToastrService
  ) {}

  ngOnInit() {
    this.loadPermissions();
    this.statuses = [
      { label: 'Enabled', value: 'enabled' },
      { label: 'Disabled', value: 'disabled' }
    ];
  }

  // loadPermissions() {
  //   this.permissionService.getPermissions().subscribe(
  //     data => {
  //       this.permissions = data;
  //     },
  //     error => {
  //       console.error('Error fetching permissions: ', error);
  //     }
  //   );
  // }
  loadPermissions(): void {
    this.permissionService.getPermissions().subscribe(
      (response: any) => {
        if (response.success) {
          this.permissions = response.data;
          this.showToast('Permissions loaded successfully!', 'success');
        } else {
          this.permissions = [];
          this.showToast(response.message, 'info');
        }
      },
      (error: any) => {
        console.error('Error fetching permissions:', error);
        this.showToast('Error fetching permissions', 'error');
      }
    );
  }

  openNew() {
    this.permission = {} as Permission;
    this.submitted = false;
    this.permissionDialog = true;
  }

  deleteSelectedPermissions() {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete the selected permissions?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.permissions = this.permissions.filter(val => !this.selectedPermissions.includes(val));
        this.selectedPermissions = [];
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Permissions Deleted', life: 3000 });
      }
    });
  }

  editPermission(permission: Permission) {
    this.permission = { ...permission };
    this.permissionDialog = true;
  }

  deletePermission(permission: Permission) {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete ' + permission.name + '?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.permissionService.deletePermission(permission.id).subscribe(
          () => {
            this.permissions = this.permissions.filter(val => val.id !== permission.id);
            this.permission = {} as Permission;
            this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Permission Deleted', life: 3000 });
          },
          error => {
            console.error('Error deleting permission: ', error);
          }
        );
      }
    });
  }

  hideDialog() {
    this.permissionDialog = false;
    this.submitted = false;
  }

  savePermission() {
    this.submitted = true;

    if (this.permission.name.trim()) {
      if (this.permission.id) {
        this.permissionService.updatePermission(this.permission).subscribe(
          data => {
            this.permissions[this.findIndexById(this.permission.id)] = data;
            this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Permission Updated', life: 3000 });
          },
          error => {
            console.error('Error updating permission: ', error);
          }
        );
      } else {
        this.permissionService.addPermission(this.permission).subscribe(
          data => {
            this.permissions.push(data);
            this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Permission Created', life: 3000 });
          },
          error => {
            console.error('Error adding permission: ', error);
          }
        );
      }

      this.permissions = [...this.permissions];
      this.permissionDialog = false;
      this.permission = {} as Permission;
    }
  }

  findIndexById(id: number): number {
    let index = -1;
    for (let i = 0; i < this.permissions.length; i++) {
      if (this.permissions[i].id === id) {
        index = i;
        break;
      }
    }
    return index;
  }

  onSelectionChange(event: any) {
    this.selectedPermissions = event;
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