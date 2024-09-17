import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VideosInfoComponent } from './videos-info.component';

describe('VideosInfoComponent', () => {
  let component: VideosInfoComponent;
  let fixture: ComponentFixture<VideosInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VideosInfoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VideosInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
