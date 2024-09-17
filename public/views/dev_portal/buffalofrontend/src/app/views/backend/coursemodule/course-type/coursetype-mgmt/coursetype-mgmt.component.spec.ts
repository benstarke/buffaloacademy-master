import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoursetypeMgmtComponent } from './coursetype-mgmt.component';

describe('CoursetypeMgmtComponent', () => {
  let component: CoursetypeMgmtComponent;
  let fixture: ComponentFixture<CoursetypeMgmtComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CoursetypeMgmtComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CoursetypeMgmtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
