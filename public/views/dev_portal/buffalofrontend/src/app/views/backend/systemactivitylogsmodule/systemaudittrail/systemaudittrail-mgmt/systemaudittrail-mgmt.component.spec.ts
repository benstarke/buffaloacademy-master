import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SystemaudittrailMgmtComponent } from './systemaudittrail-mgmt.component';

describe('SystemaudittrailMgmtComponent', () => {
  let component: SystemaudittrailMgmtComponent;
  let fixture: ComponentFixture<SystemaudittrailMgmtComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SystemaudittrailMgmtComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SystemaudittrailMgmtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
