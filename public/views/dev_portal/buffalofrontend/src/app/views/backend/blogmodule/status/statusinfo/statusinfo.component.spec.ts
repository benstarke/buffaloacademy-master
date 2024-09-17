import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatusinfoComponent } from './statusinfo.component';

describe('StatusinfoComponent', () => {
  let component: StatusinfoComponent;
  let fixture: ComponentFixture<StatusinfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StatusinfoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StatusinfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
