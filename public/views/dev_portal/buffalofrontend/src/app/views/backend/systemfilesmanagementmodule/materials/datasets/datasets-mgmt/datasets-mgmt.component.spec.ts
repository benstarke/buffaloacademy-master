import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatasetsMgmtComponent } from './datasets-mgmt.component';

describe('DatasetsMgmtComponent', () => {
  let component: DatasetsMgmtComponent;
  let fixture: ComponentFixture<DatasetsMgmtComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DatasetsMgmtComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DatasetsMgmtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
