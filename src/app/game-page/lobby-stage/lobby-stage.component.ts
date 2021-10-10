import { Component, OnDestroy } from '@angular/core';
import { FormControl, Validators } from "@angular/forms";
import { Observable, Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";
import { BetService } from "../bet.service";
import { ParticipantGameStatusService } from "../participant-game-status.service";

@Component({
  selector: 'ergo-lobby-stage',
  templateUrl: './lobby-stage.component.html',
  styleUrls: ['./lobby-stage.component.scss']
})
export class LobbyStageComponent implements OnDestroy {
  private readonly destroy$: Subject<void> = new Subject();
  readonly loading$: Observable<boolean>;
  readonly isWaiting$: Observable<boolean>;
  readonly bet: FormControl = new FormControl(null, [Validators.required, Validators.min(1), Validators.max(5)]);
  hasBet: boolean = false;

  constructor(
    private betService: BetService,
    private participantGameService: ParticipantGameStatusService
  ) {
    this.participantGameService.hasBet$.pipe(
      takeUntil(this.destroy$)
    ).subscribe(
      (hasBet) => this.hasBet = hasBet
    );
    this.loading$ = this.participantGameService.loading$;
    this.isWaiting$ = this.participantGameService.isWaiting$;
  }

  placeBet(): void {
    if (this.bet.valid && !this.hasBet) {
      this.hasBet = true;
      this.betService.placeBet(this.bet.value);
    }
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.unsubscribe();
  }
}
