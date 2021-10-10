import { Injectable, OnDestroy, OnInit } from '@angular/core';
import { merge, Observable, Subject } from "rxjs";
import { filter, map, shareReplay, take, takeUntil } from "rxjs/operators";
import { SocketService } from "../socket.service";
import { GameStatusService } from "./game-status.service";

export type GameState = 'LOBBY' | 'GUESS' | 'RESULT';

@Injectable()
export class GameStateService implements OnDestroy {
  readonly destroy$: Subject<void> = new Subject<void>();
  readonly gameState$: Observable<GameState>;
  readonly timeUntilStateChange$: Observable<number>;
  readonly loading$: Observable<boolean>;

  constructor(private socketService: SocketService, private statusService: GameStatusService) {
    this.loading$ = this.statusService.loading$;

    const stateChange$: Observable<any> = this.socketService.messages$.pipe(
      filter(event => event.event === 'stateChanged')
    );
    /**
     * We want to know the game state asap, so we don't want to wait until the ws emits a stateChanged event
     * We can listen to both observables and complete the REST-derived one once it emits/if the websocket emits
     */
    this.gameState$ = merge(
      this.statusService.gameState$.pipe(
        take(1),
        takeUntil(stateChange$)
      ), stateChange$.pipe(
        map(event => event.state)
      )).pipe(
        shareReplay(1)
      );

    const tick$: Observable<any> = this.socketService.messages$.pipe(
      filter(event => event.event === 'tick')
    );
    this.timeUntilStateChange$ = tick$.pipe(map(event => event.timeRemaining), shareReplay(1));

    this.statusService.fetchStatus$('123123123');
    this.socketService.connect();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.unsubscribe();
  }
}
