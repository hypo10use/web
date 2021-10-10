import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { GameStatus, GameStatusService, Participant } from "./game-status.service";

export interface ParticipantGameStatus extends GameStatus {
  me: Participant;
}

@Injectable({
  providedIn: 'root'
})
export class ParticipantGameStatusService {
  get isWaiting$(): Observable<boolean> {
    return this.participantStatus$.pipe(map(status => !!status?.waitingList));
  }

  get loading$(): Observable<boolean> {
    return this.statusService.loading$;
  }

  get hasBet$(): Observable<boolean> {
    return this.participantStatus$.pipe(map(status => !!status?.bet && status.bet > 0));
  }

  get participantStatus$(): Observable<Participant | null> {
    return this.statusService.gameStatus$.pipe(map((status) => {
      if (ParticipantGameStatusService.isPersonalGameStatus(status)) {
        return status.me;
      }
      return null;
    }));
  }

  constructor(private statusService: GameStatusService) {}

  private static isPersonalGameStatus(status: GameStatus): status is ParticipantGameStatus {
    return Object.prototype.hasOwnProperty.call(status, 'me');
  }
}
