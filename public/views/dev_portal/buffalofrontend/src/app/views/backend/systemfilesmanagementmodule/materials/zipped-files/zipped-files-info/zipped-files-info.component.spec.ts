import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ZippedFilesInfoComponent } from './zipped-files-info.component';

describe('ZippedFilesInfoComponent', () => {
  let component: ZippedFilesInfoComponent;
  let fixture: ComponentFixture<ZippedFilesInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ZippedFilesInfoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ZippedFilesInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
