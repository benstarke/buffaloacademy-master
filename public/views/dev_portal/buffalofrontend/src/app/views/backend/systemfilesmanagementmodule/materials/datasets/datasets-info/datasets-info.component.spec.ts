import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatasetsInfoComponent } from './datasets-info.component';

describe('DatasetsInfoComponent', () => {
  let component: DatasetsInfoComponent;
  let fixture: ComponentFixture<DatasetsInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DatasetsInfoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DatasetsInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
