import { Component, OnInit } from '@angular/core';
import { BetService } from "./bet.service";
import { GameStateService } from "./game-state.service";
import { GameStatusService } from "./game-status.service";
import { GuessService } from "./guess.service";

@Component({
  selector: 'ergo-game-page',
  templateUrl: './game-page.component.html',
  styleUrls: ['./game-page.component.scss'],
  providers: [GameStateService, BetService, GameStatusService, GuessService]
})
export class GamePageComponent implements OnInit{
  readonly gameState$ = this.gameStateService.gameState$;
  readonly timeRemaining$ = this.gameStateService.timeUntilStateChange$;

  constructor(private gameStateService: GameStateService) {}

  ngOnInit(): void {
    this.gameStateService.fetch();
  }
}
