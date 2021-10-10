import { Injectable, OnDestroy } from '@angular/core';
import { Observable, Subject } from "rxjs";
import { filter, map, take } from "rxjs/operators";
import { SocketService } from "../socket.service";
import { AddressService } from "./address.service";

export type GameState = 'LOBBY' | 'GUESS' | 'RESULT';

@Injectable()
export class GameStateService implements OnDestroy {
  readonly destroy$: Subject<void> = new Subject<void>();
  readonly gameState$: Observable<GameState>;
  readonly timeUntilStateChange$: Observable<number>;

  constructor(private socketService: SocketService, private addressService: AddressService) {
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
    this.addressService.address$.pipe(take(1)).subscribe((address) => {
      if (!!address) {
        this.socketService.connect(address);
      } else {
        throw Error('Address not defined, cannot connect.');
      }
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.unsubscribe();
  }
}
