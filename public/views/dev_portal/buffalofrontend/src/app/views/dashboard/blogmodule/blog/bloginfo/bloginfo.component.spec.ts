import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BloginfoComponent } from './bloginfo.component';

describe('BloginfoComponent', () => {
  let component: BloginfoComponent;
  let fixture: ComponentFixture<BloginfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BloginfoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BloginfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
