import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IconsInfoComponent } from './icons-info.component';

describe('IconsInfoComponent', () => {
  let component: IconsInfoComponent;
  let fixture: ComponentFixture<IconsInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IconsInfoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(IconsInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
