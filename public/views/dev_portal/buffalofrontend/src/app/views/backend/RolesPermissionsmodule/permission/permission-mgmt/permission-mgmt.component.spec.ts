import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PermissionMgmtComponent } from './permission-mgmt.component';

describe('PermissionMgmtComponent', () => {
  let component: PermissionMgmtComponent;
  let fixture: ComponentFixture<PermissionMgmtComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PermissionMgmtComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PermissionMgmtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
