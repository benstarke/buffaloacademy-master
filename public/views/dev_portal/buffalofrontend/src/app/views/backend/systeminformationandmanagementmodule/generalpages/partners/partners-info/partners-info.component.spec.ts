import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PartnersInfoComponent } from './partners-info.component';

describe('PartnersInfoComponent', () => {
  let component: PartnersInfoComponent;
  let fixture: ComponentFixture<PartnersInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PartnersInfoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PartnersInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
