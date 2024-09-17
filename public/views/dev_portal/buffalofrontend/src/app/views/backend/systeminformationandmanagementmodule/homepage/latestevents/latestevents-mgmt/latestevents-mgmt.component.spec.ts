import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LatesteventsMgmtComponent } from './latestevents-mgmt.component';

describe('LatesteventsMgmtComponent', () => {
  let component: LatesteventsMgmtComponent;
  let fixture: ComponentFixture<LatesteventsMgmtComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LatesteventsMgmtComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LatesteventsMgmtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
