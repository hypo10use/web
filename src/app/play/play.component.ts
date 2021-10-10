import { Component, Input, OnInit } from '@angular/core';
import { FormControl, Validators } from "@angular/forms";

@Component({
  selector: 'ergo-play',
  templateUrl: './play.component.html',
  styleUrls: ['./play.component.scss']
})
export class PlayComponent implements OnInit {

  @Input() address: string = '';

  tokens: FormControl = new FormControl(1, [Validators.required, Validators.min(1), Validators.max(5)]);

  constructor() {
  }

  ngOnInit(): void {
  }

}
