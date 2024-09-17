import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ZippedFilesMgmtComponent } from './zipped-files-mgmt.component';

describe('ZippedFilesMgmtComponent', () => {
  let component: ZippedFilesMgmtComponent;
  let fixture: ComponentFixture<ZippedFilesMgmtComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ZippedFilesMgmtComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ZippedFilesMgmtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
