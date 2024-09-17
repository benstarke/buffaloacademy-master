import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SystemMgmtComponent } from './system-mgmt.component';

describe('SystemMgmtComponent', () => {
  let component: SystemMgmtComponent;
  let fixture: ComponentFixture<SystemMgmtComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SystemMgmtComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SystemMgmtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
