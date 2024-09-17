import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppCurrenciesInfoComponent } from './app-currencies-info.component';

describe('AppCurrenciesInfoComponent', () => {
  let component: AppCurrenciesInfoComponent;
  let fixture: ComponentFixture<AppCurrenciesInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppCurrenciesInfoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AppCurrenciesInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
