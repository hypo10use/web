import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LobbyStageComponent } from './lobby-stage.component';

describe('LobbyComponent', () => {
  let component: LobbyStageComponent;
  let fixture: ComponentFixture<LobbyStageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LobbyStageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LobbyStageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
