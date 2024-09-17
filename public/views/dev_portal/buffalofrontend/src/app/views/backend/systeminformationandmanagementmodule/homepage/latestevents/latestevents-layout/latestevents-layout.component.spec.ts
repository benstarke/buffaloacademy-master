import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LatesteventsLayoutComponent } from './latestevents-layout.component';

describe('LatesteventsLayoutComponent', () => {
  let component: LatesteventsLayoutComponent;
  let fixture: ComponentFixture<LatesteventsLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LatesteventsLayoutComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LatesteventsLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
