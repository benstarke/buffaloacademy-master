import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategorymgmtComponent } from './categorymgmt.component';

describe('CategorymgmtComponent', () => {
  let component: CategorymgmtComponent;
  let fixture: ComponentFixture<CategorymgmtComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CategorymgmtComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CategorymgmtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
