import { Component } from '@angular/core';
import { MatIconRegistry } from "@angular/material/icon";
import { DomSanitizer } from "@angular/platform-browser";

@Component({
  selector: 'ergo-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'ergohack';

  constructor(private matIconRegistry: MatIconRegistry, private domSanitizer: DomSanitizer) {
    this.matIconRegistry.addSvgIcon('circle', this.domSanitizer.bypassSecurityTrustResourceUrl('assets/svg/circle.svg'));
    this.matIconRegistry.addSvgIcon('triangle', this.domSanitizer.bypassSecurityTrustResourceUrl('assets/svg/triangle.svg'));
    this.matIconRegistry.addSvgIcon('rectangle', this.domSanitizer.bypassSecurityTrustResourceUrl('assets/svg/rectangle.svg'));
  }
}
