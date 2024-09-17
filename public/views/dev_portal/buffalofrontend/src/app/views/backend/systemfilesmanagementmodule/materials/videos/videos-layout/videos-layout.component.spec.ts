import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VideosLayoutComponent } from './videos-layout.component';

describe('VideosLayoutComponent', () => {
  let component: VideosLayoutComponent;
  let fixture: ComponentFixture<VideosLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VideosLayoutComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VideosLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
