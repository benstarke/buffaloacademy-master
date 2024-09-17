import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SystemImageDialogComponent } from './system-image-dialog.component';

describe('SystemImageDialogComponent', () => {
  let component: SystemImageDialogComponent;
  let fixture: ComponentFixture<SystemImageDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SystemImageDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SystemImageDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
