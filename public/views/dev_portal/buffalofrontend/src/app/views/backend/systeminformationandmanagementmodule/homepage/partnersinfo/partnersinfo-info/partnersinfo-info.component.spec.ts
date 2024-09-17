import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PartnersinfoInfoComponent } from './partnersinfo-info.component';

describe('PartnersinfoInfoComponent', () => {
  let component: PartnersinfoInfoComponent;
  let fixture: ComponentFixture<PartnersinfoInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PartnersinfoInfoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PartnersinfoInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
