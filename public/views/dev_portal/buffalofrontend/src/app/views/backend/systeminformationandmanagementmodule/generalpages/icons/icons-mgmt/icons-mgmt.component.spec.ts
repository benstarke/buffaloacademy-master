import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IconsMgmtComponent } from './icons-mgmt.component';

describe('IconsMgmtComponent', () => {
  let component: IconsMgmtComponent;
  let fixture: ComponentFixture<IconsMgmtComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IconsMgmtComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(IconsMgmtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
