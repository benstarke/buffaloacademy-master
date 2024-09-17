import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatasetsLayoutComponent } from './datasets-layout.component';

describe('DatasetsLayoutComponent', () => {
  let component: DatasetsLayoutComponent;
  let fixture: ComponentFixture<DatasetsLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DatasetsLayoutComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DatasetsLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
