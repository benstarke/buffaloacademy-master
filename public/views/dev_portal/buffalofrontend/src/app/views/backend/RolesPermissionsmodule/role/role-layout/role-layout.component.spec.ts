import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoleLayoutComponent } from './role-layout.component';

describe('RoleLayoutComponent', () => {
  let component: RoleLayoutComponent;
  let fixture: ComponentFixture<RoleLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RoleLayoutComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RoleLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
