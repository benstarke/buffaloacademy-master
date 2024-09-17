import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SystemaudittrailLayoutComponent } from './systemaudittrail-layout.component';

describe('SystemaudittrailLayoutComponent', () => {
  let component: SystemaudittrailLayoutComponent;
  let fixture: ComponentFixture<SystemaudittrailLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SystemaudittrailLayoutComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SystemaudittrailLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
