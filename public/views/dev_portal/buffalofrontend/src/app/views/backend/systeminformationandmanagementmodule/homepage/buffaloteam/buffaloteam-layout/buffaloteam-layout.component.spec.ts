import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuffaloteamLayoutComponent } from './buffaloteam-layout.component';

describe('BuffaloteamLayoutComponent', () => {
  let component: BuffaloteamLayoutComponent;
  let fixture: ComponentFixture<BuffaloteamLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BuffaloteamLayoutComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BuffaloteamLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
