import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SystemaudittrailInfoComponent } from './systemaudittrail-info.component';

describe('SystemaudittrailInfoComponent', () => {
  let component: SystemaudittrailInfoComponent;
  let fixture: ComponentFixture<SystemaudittrailInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SystemaudittrailInfoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SystemaudittrailInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
