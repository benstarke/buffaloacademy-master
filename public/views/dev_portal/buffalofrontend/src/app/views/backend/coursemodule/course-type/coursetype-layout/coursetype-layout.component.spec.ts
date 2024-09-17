import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoursetypeLayoutComponent } from './coursetype-layout.component';

describe('CoursetypeLayoutComponent', () => {
  let component: CoursetypeLayoutComponent;
  let fixture: ComponentFixture<CoursetypeLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CoursetypeLayoutComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CoursetypeLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
