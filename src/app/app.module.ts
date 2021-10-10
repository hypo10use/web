import { HttpClientModule } from "@angular/common/http";
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from "@angular/flex-layout";
import { ReactiveFormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatRadioModule } from "@angular/material/radio";
import { MatSelectModule } from "@angular/material/select";
import { MatToolbarModule } from "@angular/material/toolbar";
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from "@angular/router";

import { AppComponent } from './app.component';
import { GamePageComponent } from './game-page/game-page.component';
import { LobbyStageComponent } from './game-page/lobby-stage/lobby-stage.component';
import { AddressGuard } from "./guard/address.guard";
import { LandingPageComponent } from './landing-page/landing-page.component';
import { LoadingComponent } from './loading/loading.component';
import { TokenPipe } from "./pipes/token.pipe";

@NgModule({
  declarations: [AppComponent, LoadingComponent, GamePageComponent, LobbyStageComponent, LandingPageComponent, TokenPipe],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FlexLayoutModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatSelectModule,
    RouterModule.forRoot([{
      path: 'game',
      component: GamePageComponent,
      canActivate: [AddressGuard],
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
