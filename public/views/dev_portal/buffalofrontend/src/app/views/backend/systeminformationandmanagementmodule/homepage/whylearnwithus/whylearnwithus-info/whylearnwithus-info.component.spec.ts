import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WhylearnwithusInfoComponent } from './whylearnwithus-info.component';

describe('WhylearnwithusInfoComponent', () => {
  let component: WhylearnwithusInfoComponent;
  let fixture: ComponentFixture<WhylearnwithusInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WhylearnwithusInfoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(WhylearnwithusInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
