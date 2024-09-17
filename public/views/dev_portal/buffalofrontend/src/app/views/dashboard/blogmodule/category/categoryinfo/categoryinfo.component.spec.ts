import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryinfoComponent } from './categoryinfo.component';

describe('CategoryinfoComponent', () => {
  let component: CategoryinfoComponent;
  let fixture: ComponentFixture<CategoryinfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CategoryinfoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CategoryinfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
