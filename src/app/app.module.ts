import { HttpClientModule } from "@angular/common/http";
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from "@angular/flex-layout";
import { ReactiveFormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatDialogModule } from "@angular/material/dialog";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatRadioModule } from "@angular/material/radio";
import { MatToolbarModule } from "@angular/material/toolbar";
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from "@angular/router";

import { AppComponent } from './app.component';
import { DialogConfigureWalletComponent } from './dialog-configure-wallet/dialog-configure-wallet.component';
import { GamePageComponent } from './game-page/game-page.component';
import { LobbyStageComponent } from './game-page/lobby-stage/lobby-stage.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { LoadingComponent } from './loading/loading.component';

@NgModule({
  declarations: [AppComponent, LoadingComponent, GamePageComponent, LobbyStageComponent, LandingPageComponent, DialogConfigureWalletComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FlexLayoutModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
    RouterModule.forRoot([{
      path: 'game',
      component: GamePageComponent,
    }, {
      path: '',
      pathMatch: 'full',
      component: LandingPageComponent,
    }]),
    MatInputModule,
    ReactiveFormsModule,
    MatRadioModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
