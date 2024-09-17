import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventMgmtComponent } from './event-mgmt.component';

describe('EventMgmtComponent', () => {
  let component: EventMgmtComponent;
  let fixture: ComponentFixture<EventMgmtComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EventMgmtComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EventMgmtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
