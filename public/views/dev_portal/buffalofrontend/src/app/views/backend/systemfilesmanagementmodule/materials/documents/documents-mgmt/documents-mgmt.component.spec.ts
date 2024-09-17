import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentsMgmtComponent } from './documents-mgmt.component';

describe('DocumentsMgmtComponent', () => {
  let component: DocumentsMgmtComponent;
  let fixture: ComponentFixture<DocumentsMgmtComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DocumentsMgmtComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DocumentsMgmtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
