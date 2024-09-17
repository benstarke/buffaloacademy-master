import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuffaloteamMgmtComponent } from './buffaloteam-mgmt.component';

describe('BuffaloteamMgmtComponent', () => {
  let component: BuffaloteamMgmtComponent;
  let fixture: ComponentFixture<BuffaloteamMgmtComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BuffaloteamMgmtComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BuffaloteamMgmtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
