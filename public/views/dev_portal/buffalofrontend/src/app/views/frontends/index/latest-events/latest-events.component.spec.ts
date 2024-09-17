import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LatestEventsComponent } from './latest-events.component';

describe('LatestEventsComponent', () => {
  let component: LatestEventsComponent;
  let fixture: ComponentFixture<LatestEventsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LatestEventsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LatestEventsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
