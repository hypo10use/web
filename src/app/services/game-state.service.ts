import { Injectable } from '@angular/core';
import { Observable, of } from "rxjs";
import { shareReplay } from "rxjs/operators";

export type GameState = 'LOBBY' | 'GUESS' | 'RESULT';

@Injectable({
  providedIn: 'root'
})
export class GameStateService {
  readonly gameState$: Observable<GameState>;
  readonly timeUntilStateChange$: Observable<number>;
  constructor() {
    this.gameState$ = of<GameState>('LOBBY').pipe(shareReplay(1));
    this.timeUntilStateChange$ = of<number>(100).pipe(shareReplay(1));
  }
}
