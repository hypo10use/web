import { Component } from '@angular/core';
import { Observable } from "rxjs";
import { GameState, GameStateService } from "../services/game-state.service";

@Component({
  selector: 'ergo-game-page',
  templateUrl: './game-page.component.html',
  styleUrls: ['./game-page.component.scss']
})
export class GamePageComponent {
  readonly gameState$!: Observable<GameState>;

  constructor(private gameStateService: GameStateService) {
    this.gameState$ = this.gameStateService.gameState$;
  }
}
