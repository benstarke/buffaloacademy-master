import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TagmgmtComponent } from './tagmgmt.component';

describe('TagmgmtComponent', () => {
  let component: TagmgmtComponent;
  let fixture: ComponentFixture<TagmgmtComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TagmgmtComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TagmgmtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
