import { TestBed } from '@angular/core/testing';

import { ParticipantGameStatusService } from './participant-game-status.service';

describe('ParticipantGameStatusService', () => {
  let service: ParticipantGameStatusService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ParticipantGameStatusService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
