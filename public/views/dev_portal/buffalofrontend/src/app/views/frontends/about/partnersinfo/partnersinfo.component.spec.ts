import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PartnersinfoComponent } from './partnersinfo.component';

describe('PartnersinfoComponent', () => {
  let component: PartnersinfoComponent;
  let fixture: ComponentFixture<PartnersinfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PartnersinfoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PartnersinfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
