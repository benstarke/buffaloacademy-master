import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlogmgmtComponent } from './blogmgmt.component';

describe('BlogmgmtComponent', () => {
  let component: BlogmgmtComponent;
  let fixture: ComponentFixture<BlogmgmtComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BlogmgmtComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BlogmgmtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
