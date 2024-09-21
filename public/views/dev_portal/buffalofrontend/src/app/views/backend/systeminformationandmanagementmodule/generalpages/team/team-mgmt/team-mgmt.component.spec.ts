import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamMgmtComponent } from './team-mgmt.component';

describe('TeamMgmtComponent', () => {
  let component: TeamMgmtComponent;
  let fixture: ComponentFixture<TeamMgmtComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TeamMgmtComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TeamMgmtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
