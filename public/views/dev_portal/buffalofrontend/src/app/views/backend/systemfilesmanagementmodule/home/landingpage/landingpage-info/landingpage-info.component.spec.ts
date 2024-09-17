import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LandingpageInfoComponent } from './landingpage-info.component';

describe('LandingpageInfoComponent', () => {
  let component: LandingpageInfoComponent;
  let fixture: ComponentFixture<LandingpageInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LandingpageInfoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LandingpageInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
