import { Injectable, OnDestroy } from '@angular/core';
import { Observable, Subject } from "rxjs";
import { filter, map, tap } from "rxjs/operators";
import { SocketService } from "../socket.service";
import { GameStatusService } from "./game-status.service";

export type GameState = 'LOBBY' | 'GUESS' | 'RESULT';

@Injectable()
export class GameStateService implements OnDestroy {
  readonly destroy$: Subject<void> = new Subject<void>();
  readonly gameState$: Observable<GameState>;
  readonly timeUntilStateChange$: Observable<number>;

  constructor(private socketService: SocketService, private statusService: GameStatusService) {
    const stateChange$: Observable<any> = this.socketService.messages$.pipe(
      filter(event => event.event === 'stateChanged')
    );
    this.gameState$ = stateChange$.pipe(
      map(event => event.state)
    );

    this.timeUntilStateChange$ = this.socketService.messages$.pipe(
      filter(event => event.event === 'tick'),
      map(event => event.timeRemaining),
    );
  }

  fetch(): void {
    this.socketService.connect('123123123123');
    this.statusService.fetchStatus$('123123123123');
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.unsubscribe();
  }
}
