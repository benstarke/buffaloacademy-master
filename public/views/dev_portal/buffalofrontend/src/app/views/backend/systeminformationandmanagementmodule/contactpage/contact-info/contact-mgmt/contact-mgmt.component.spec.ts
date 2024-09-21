import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactMgmtComponent } from './contact-mgmt.component';

describe('ContactMgmtComponent', () => {
  let component: ContactMgmtComponent;
  let fixture: ComponentFixture<ContactMgmtComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContactMgmtComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ContactMgmtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
