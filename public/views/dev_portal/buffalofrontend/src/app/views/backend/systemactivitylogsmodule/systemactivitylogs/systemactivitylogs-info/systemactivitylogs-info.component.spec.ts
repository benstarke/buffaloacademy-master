import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SystemactivitylogsInfoComponent } from './systemactivitylogs-info.component';

describe('SystemactivitylogsInfoComponent', () => {
  let component: SystemactivitylogsInfoComponent;
  let fixture: ComponentFixture<SystemactivitylogsInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SystemactivitylogsInfoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SystemactivitylogsInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
