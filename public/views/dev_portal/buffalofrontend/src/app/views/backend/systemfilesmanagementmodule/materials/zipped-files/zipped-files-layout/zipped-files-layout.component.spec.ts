import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ZippedFilesLayoutComponent } from './zipped-files-layout.component';

describe('ZippedFilesLayoutComponent', () => {
  let component: ZippedFilesLayoutComponent;
  let fixture: ComponentFixture<ZippedFilesLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ZippedFilesLayoutComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ZippedFilesLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
