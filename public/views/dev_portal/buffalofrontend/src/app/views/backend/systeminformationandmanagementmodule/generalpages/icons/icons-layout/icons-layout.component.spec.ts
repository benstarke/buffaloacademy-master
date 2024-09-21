import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IconsLayoutComponent } from './icons-layout.component';

describe('IconsLayoutComponent', () => {
  let component: IconsLayoutComponent;
  let fixture: ComponentFixture<IconsLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IconsLayoutComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(IconsLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
