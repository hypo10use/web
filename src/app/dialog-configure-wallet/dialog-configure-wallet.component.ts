import { Component } from '@angular/core';
import { FormControl } from "@angular/forms";

@Component({
  selector: 'ergo-dialog-configure-wallet',
  templateUrl: './dialog-configure-wallet.component.html',
  styleUrls: ['./dialog-configure-wallet.component.scss']
})
export class DialogConfigureWalletComponent {

  address: FormControl = new FormControl('');
}
