import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutMgmtComponent } from './about-mgmt.component';

describe('AboutMgmtComponent', () => {
  let component: AboutMgmtComponent;
  let fixture: ComponentFixture<AboutMgmtComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AboutMgmtComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AboutMgmtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
