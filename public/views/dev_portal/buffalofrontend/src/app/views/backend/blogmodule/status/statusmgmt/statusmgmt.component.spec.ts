import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatusmgmtComponent } from './statusmgmt.component';

describe('StatusmgmtComponent', () => {
  let component: StatusmgmtComponent;
  let fixture: ComponentFixture<StatusmgmtComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StatusmgmtComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StatusmgmtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
