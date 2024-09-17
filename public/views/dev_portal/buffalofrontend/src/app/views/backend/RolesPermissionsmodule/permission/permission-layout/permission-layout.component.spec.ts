import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PermissionLayoutComponent } from './permission-layout.component';

describe('PermissionLayoutComponent', () => {
  let component: PermissionLayoutComponent;
  let fixture: ComponentFixture<PermissionLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PermissionLayoutComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PermissionLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
