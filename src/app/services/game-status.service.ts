import { HttpClient } from "@angular/common/http";
import { Injectable } from '@angular/core';
import { Observable, Subject } from "rxjs";
import { map } from "rxjs/operators";
import { environment } from "../../environments/environment";
import { GameState } from "./game-state.service";

export const HTTP_ENDPOINT = environment.httpEndpoint;

export interface GameStatus {
  state: GameState,
  participantsCount: number,
  participants: string[],
  waitingListCount: number,
  waitingList: string[],
  timerLobbyStarted: boolean,
  lobbyTimeRemaining: number,
  timerGuessStarted: boolean,
  guessTimeRemaining: number,
  timerResultStarted: boolean,
  resultTimeRemaining: number,
}

@Injectable()
export class GameStatusService {
  get gameState$(): Observable<GameState> {
    return this.gameStatus$.pipe(map(status => status.state));
  }

  get gameStatus$(): Observable<GameStatus> {
    return this._gameStatus$.asObservable();
  }

  private _gameStatus$: Subject<GameStatus> = new Subject();

  constructor(private http: HttpClient) {}

  fetchStatus$(address?: string): void {
    this.http.get<GameStatus>(
      `${HTTP_ENDPOINT}/status`,
      !!address ? { params: { address } } : undefined
    ).subscribe((status) => {
      this._gameStatus$.next(status);
    });
  }
}

