import { Component } from '@angular/core';
import { FormControl, Validators } from "@angular/forms";

@Component({
  selector: 'ergo-lobby-stage',
  templateUrl: './lobby-stage.component.html',
  styleUrls: ['./lobby-stage.component.scss']
})
export class LobbyStageComponent {
  readonly bet: FormControl = new FormControl(null, [Validators.required, Validators.min(1), Validators.max(5)]);
}
