import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LatesteventsInfoComponent } from './latestevents-info.component';

describe('LatesteventsInfoComponent', () => {
  let component: LatesteventsInfoComponent;
  let fixture: ComponentFixture<LatesteventsInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LatesteventsInfoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LatesteventsInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
