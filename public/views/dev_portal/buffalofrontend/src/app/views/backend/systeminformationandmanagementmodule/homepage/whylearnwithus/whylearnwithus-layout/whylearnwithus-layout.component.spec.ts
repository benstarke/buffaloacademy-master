import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WhylearnwithusLayoutComponent } from './whylearnwithus-layout.component';

describe('WhylearnwithusLayoutComponent', () => {
  let component: WhylearnwithusLayoutComponent;
  let fixture: ComponentFixture<WhylearnwithusLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WhylearnwithusLayoutComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(WhylearnwithusLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
