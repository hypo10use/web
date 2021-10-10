import { Component } from '@angular/core';
import { FormControl, Validators } from "@angular/forms";
import { BetService } from "../../services/bet.service";
import { GuessService } from "../../services/guess.service";

@Component({
  selector: 'ergo-lobby-stage',
  templateUrl: './lobby-stage.component.html',
  styleUrls: ['./lobby-stage.component.scss']
})
export class LobbyStageComponent {
  readonly bet: FormControl = new FormControl(null, [Validators.required, Validators.min(1), Validators.max(5)]);
  readonly guess: FormControl = new FormControl(null, [Validators.required]);

  constructor(private betService: BetService, private guessService: GuessService) {}

  submit(): void {
    if (this.bet.valid) {
      this.betService.placeBet(this.bet.value);
    }
    if (this.guess.valid) {
      this.guessService.makeGuess(this.guess.value);
    }
  }
}
