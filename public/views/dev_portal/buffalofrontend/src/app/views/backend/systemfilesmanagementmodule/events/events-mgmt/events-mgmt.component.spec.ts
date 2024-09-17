import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventsMgmtComponent } from './events-mgmt.component';

describe('EventsMgmtComponent', () => {
  let component: EventsMgmtComponent;
  let fixture: ComponentFixture<EventsMgmtComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EventsMgmtComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EventsMgmtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
