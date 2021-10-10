import { Component, OnInit } from '@angular/core';
import { BetService } from "../services/bet.service";
import { GameStateService } from "../services/game-state.service";
import { GuessService } from "../services/guess.service";

@Component({
  selector: 'ergo-game-page',
  templateUrl: './game-page.component.html',
  styleUrls: ['./game-page.component.scss'],
  providers: [GameStateService, BetService, GuessService]
})
export class GamePageComponent implements OnInit{
  readonly gameState$ = this.gameStateService.gameState$;
  readonly timeRemaining$ = this.gameStateService.timeUntilStateChange$;

  constructor(private gameStateService: GameStateService) {}

  ngOnInit(): void {
    this.gameStateService.fetch();
  }
}
