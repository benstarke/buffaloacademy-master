import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VideosMgmtComponent } from './videos-mgmt.component';

describe('VideosMgmtComponent', () => {
  let component: VideosMgmtComponent;
  let fixture: ComponentFixture<VideosMgmtComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VideosMgmtComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VideosMgmtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
