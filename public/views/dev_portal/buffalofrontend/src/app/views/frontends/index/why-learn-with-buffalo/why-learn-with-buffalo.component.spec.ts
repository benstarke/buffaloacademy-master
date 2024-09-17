import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WhyLearnWithBuffaloComponent } from './why-learn-with-buffalo.component';

describe('WhyLearnWithBuffaloComponent', () => {
  let component: WhyLearnWithBuffaloComponent;
  let fixture: ComponentFixture<WhyLearnWithBuffaloComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WhyLearnWithBuffaloComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(WhyLearnWithBuffaloComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
