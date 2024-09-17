import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaginfoComponent } from './taginfo.component';

describe('TaginfoComponent', () => {
  let component: TaginfoComponent;
  let fixture: ComponentFixture<TaginfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaginfoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TaginfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
