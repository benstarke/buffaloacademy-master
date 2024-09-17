import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PartnersinfoLayoutComponent } from './partnersinfo-layout.component';

describe('PartnersinfoLayoutComponent', () => {
  let component: PartnersinfoLayoutComponent;
  let fixture: ComponentFixture<PartnersinfoLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PartnersinfoLayoutComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PartnersinfoLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
