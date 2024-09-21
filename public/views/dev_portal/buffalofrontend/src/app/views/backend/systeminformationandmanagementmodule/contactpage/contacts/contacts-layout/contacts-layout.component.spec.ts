import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactsLayoutComponent } from './contacts-layout.component';

describe('ContactsLayoutComponent', () => {
  let component: ContactsLayoutComponent;
  let fixture: ComponentFixture<ContactsLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContactsLayoutComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ContactsLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
