import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatDialogModule } from '@angular/material/dialog';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon'; // Import MatIconModule


@Component({
  selector: 'app-system-image-dialog',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatDialogModule,
    MatIconModule
  ],
  templateUrl: './system-image-dialog.component.html',
  styleUrl: './system-image-dialog.component.css'
})
export class SystemImageDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<SystemImageDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { imageUrl: string }
  ) {}

  onClose(): void {
    this.dialogRef.close();
  }
}
