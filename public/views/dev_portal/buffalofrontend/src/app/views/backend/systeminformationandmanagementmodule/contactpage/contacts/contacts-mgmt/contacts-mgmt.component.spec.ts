import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactsMgmtComponent } from './contacts-mgmt.component';

describe('ContactsMgmtComponent', () => {
  let component: ContactsMgmtComponent;
  let fixture: ComponentFixture<ContactsMgmtComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContactsMgmtComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ContactsMgmtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
