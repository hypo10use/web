import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GuessStageComponent } from './guess-stage.component';

describe('LobbyComponent', () => {
  let component: GuessStageComponent;
  let fixture: ComponentFixture<GuessStageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GuessStageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GuessStageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
