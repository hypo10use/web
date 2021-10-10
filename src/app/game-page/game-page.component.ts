import { Component } from '@angular/core';
import { Observable } from "rxjs";
import { BetService } from "./bet.service";
import { GameState, GameStateService } from "./game-state.service";
import { GameStatusService } from "./game-status.service";
import { ParticipantGameStatusService } from "./participant-game-status.service";

@Component({
  selector: 'ergo-game-page',
  templateUrl: './game-page.component.html',
  styleUrls: ['./game-page.component.scss'],
  providers: [GameStateService, BetService, GameStatusService, ParticipantGameStatusService]
})
export class GamePageComponent {
  readonly gameState$!: Observable<GameState>;
  readonly loading$!: Observable<boolean>;

  constructor(private gameStateService: GameStateService) {
    this.gameState$ = this.gameStateService.gameState$;
    this.loading$ = this.gameStateService.loading$;
  }
}
