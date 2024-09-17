import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoursetypeInfoComponent } from './coursetype-info.component';

describe('CoursetypeInfoComponent', () => {
  let component: CoursetypeInfoComponent;
  let fixture: ComponentFixture<CoursetypeInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CoursetypeInfoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CoursetypeInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
