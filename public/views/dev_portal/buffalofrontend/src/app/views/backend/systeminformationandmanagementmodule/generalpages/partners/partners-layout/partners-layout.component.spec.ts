import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PartnersLayoutComponent } from './partners-layout.component';

describe('PartnersLayoutComponent', () => {
  let component: PartnersLayoutComponent;
  let fixture: ComponentFixture<PartnersLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PartnersLayoutComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PartnersLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
