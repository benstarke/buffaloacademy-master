import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppCurrenciesLayoutComponent } from './app-currencies-layout.component';

describe('AppCurrenciesLayoutComponent', () => {
  let component: AppCurrenciesLayoutComponent;
  let fixture: ComponentFixture<AppCurrenciesLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppCurrenciesLayoutComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AppCurrenciesLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
