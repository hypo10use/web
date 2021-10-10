import { Component } from '@angular/core';
import { MatIconRegistry } from "@angular/material/icon";
import { DomSanitizer } from "@angular/platform-browser";
import { MatDialog, MatDialogRef } from "@angular/material/dialog";
import { DialogConfigureWalletComponent } from "./dialog-configure-wallet/dialog-configure-wallet.component";

@Component({
  selector: 'ergo-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'ergohack';
  address: string = '';

  constructor(private matIconRegistry: MatIconRegistry, private domSanitizer: DomSanitizer, private dialog: MatDialog) {
    this.matIconRegistry.addSvgIcon('circle', this.domSanitizer.bypassSecurityTrustResourceUrl('assets/svg/circle.svg'));
    this.matIconRegistry.addSvgIcon('triangle', this.domSanitizer.bypassSecurityTrustResourceUrl('assets/svg/triangle.svg'));
    this.matIconRegistry.addSvgIcon('rectangle', this.domSanitizer.bypassSecurityTrustResourceUrl('assets/svg/rectangle.svg'));
  }

  openWalletDialog() {
    const matDialogRef: MatDialogRef<DialogConfigureWalletComponent> = this.dialog.open(DialogConfigureWalletComponent, {width: '800px'});
    matDialogRef.afterClosed().subscribe((address: string) => {
      if (address) {
        this.address = address;
      }
    })
  }
}
