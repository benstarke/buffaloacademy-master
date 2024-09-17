import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WhylearnwithusMgmtComponent } from './whylearnwithus-mgmt.component';

describe('WhylearnwithusMgmtComponent', () => {
  let component: WhylearnwithusMgmtComponent;
  let fixture: ComponentFixture<WhylearnwithusMgmtComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WhylearnwithusMgmtComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(WhylearnwithusMgmtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
