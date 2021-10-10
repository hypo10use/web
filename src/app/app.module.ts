import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from "@angular/forms";
import { MatInputModule } from "@angular/material/input";
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from "@angular/router";

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from "@angular/flex-layout";
import { MatIconModule } from "@angular/material/icon";
import { HttpClientModule } from "@angular/common/http";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatButtonModule } from "@angular/material/button";
import { GuessStageComponent } from "./game-page/guess-stage/guess-stage.component";
import { LoadingComponent } from './loading/loading.component';
import { GamePageComponent } from './game-page/game-page.component';
import { LobbyStageComponent } from './game-page/lobby-stage/lobby-stage.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { TokenPipe } from './pipes/token.pipe';
import { MatSelectModule } from "@angular/material/select";
import { MatOptionModule } from "@angular/material/core";
import { MatRadioModule } from "@angular/material/radio";

@NgModule({
  declarations: [AppComponent, LoadingComponent, GamePageComponent, LobbyStageComponent, LandingPageComponent, GuessStageComponent, TokenPipe],
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
    MatOptionModule,
    MatRadioModule,
    RouterModule.forRoot([{
      path: 'game',
      component: GamePageComponent,
    }, {
      path: '',
      pathMatch: 'full',
      component: LandingPageComponent,
    }]),
    MatInputModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
