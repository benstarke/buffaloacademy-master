import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppCurrenciesMgmtComponent } from './app-currencies-mgmt.component';

describe('AppCurrenciesMgmtComponent', () => {
  let component: AppCurrenciesMgmtComponent;
  let fixture: ComponentFixture<AppCurrenciesMgmtComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppCurrenciesMgmtComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AppCurrenciesMgmtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
