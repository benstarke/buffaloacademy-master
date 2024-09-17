import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuffaloteamInfoComponent } from './buffaloteam-info.component';

describe('BuffaloteamInfoComponent', () => {
  let component: BuffaloteamInfoComponent;
  let fixture: ComponentFixture<BuffaloteamInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BuffaloteamInfoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BuffaloteamInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
