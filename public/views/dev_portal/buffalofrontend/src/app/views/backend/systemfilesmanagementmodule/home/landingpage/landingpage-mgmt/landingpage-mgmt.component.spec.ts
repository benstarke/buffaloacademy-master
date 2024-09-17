import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LandingpageMgmtComponent } from './landingpage-mgmt.component';

describe('LandingpageMgmtComponent', () => {
  let component: LandingpageMgmtComponent;
  let fixture: ComponentFixture<LandingpageMgmtComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LandingpageMgmtComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LandingpageMgmtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
