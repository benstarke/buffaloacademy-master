import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SystemactivitylogsLayoutComponent } from './systemactivitylogs-layout.component';

describe('SystemactivitylogsLayoutComponent', () => {
  let component: SystemactivitylogsLayoutComponent;
  let fixture: ComponentFixture<SystemactivitylogsLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SystemactivitylogsLayoutComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SystemactivitylogsLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
