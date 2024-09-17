import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SystemactivitylogsMgmtComponent } from './systemactivitylogs-mgmt.component';

describe('SystemactivitylogsMgmtComponent', () => {
  let component: SystemactivitylogsMgmtComponent;
  let fixture: ComponentFixture<SystemactivitylogsMgmtComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SystemactivitylogsMgmtComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SystemactivitylogsMgmtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
