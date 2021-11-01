import { Component } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { Observable } from 'rxjs';
import { TokenType, WalletConnectionState, WalletService } from './services/wallet.service';

@Component({
  selector: 'ergo-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'ergohack';
  walletConnectionState$: Observable<WalletConnectionState>;
  WALLET_CONNECTION_STATES: typeof WalletConnectionState = WalletConnectionState;
  balance: number = -1;

  selectedToken = TokenType.QUID;

  constructor(private matIconRegistry: MatIconRegistry, private domSanitizer: DomSanitizer, private walletService: WalletService) {
    this.walletConnectionState$ = this.walletService.walletConnectionState$;

    this.walletConnectionState$.subscribe((state: WalletConnectionState) => {
      console.log(state);
      if (state === WalletConnectionState.CONNECTED) {
        this.walletService.getBalance(this.selectedToken).subscribe((balance: number) => {
          this.balance = balance;
        });
      }
    })

    this.matIconRegistry.addSvgIcon('circle', this.domSanitizer.bypassSecurityTrustResourceUrl('assets/svg/circle.svg'));
    this.matIconRegistry.addSvgIcon('triangle', this.domSanitizer.bypassSecurityTrustResourceUrl('assets/svg/triangle.svg'));
    this.matIconRegistry.addSvgIcon('rectangle', this.domSanitizer.bypassSecurityTrustResourceUrl('assets/svg/rectangle.svg'));
  }

  connectWallet() {
    this.walletService.connectWallet();
  }

  test() {
    this.walletService.checkSendUTXOs().then(() => {

    })
  }
}
