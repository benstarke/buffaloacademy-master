import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentsLayoutComponent } from './documents-layout.component';

describe('DocumentsLayoutComponent', () => {
  let component: DocumentsLayoutComponent;
  let fixture: ComponentFixture<DocumentsLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DocumentsLayoutComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DocumentsLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
