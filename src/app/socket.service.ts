import { Injectable } from '@angular/core';
import { EMPTY, Observable, Subject } from 'rxjs';
import { catchError, switchAll, tap } from 'rxjs/operators';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';
import { environment } from '../environments/environment';

export const WS_ENDPOINT = environment.wsEndpoint;

@Injectable({
  providedIn: 'root'
})
export class SocketService {
  private socket$: WebSocketSubject<any> | null = null;
  private messagesSubject$: Subject<Observable<any>> = new Subject();
  readonly messages$ = this.messagesSubject$.pipe(switchAll(), catchError(e => { throw e }));

  connect(): void {
    if (!this.socket$ || this.socket$.closed) {
      this.socket$ = SocketService.getNewWebSocket();
      const messages = this.socket$.pipe(
        tap({
          error: error => console.log(error),
        }), catchError(_ => EMPTY));
      this.messagesSubject$.next(messages);
    }
  }

  private static getNewWebSocket(): WebSocketSubject<any> {
    return webSocket(WS_ENDPOINT);
  }

  sendMessage(msg: any): void {
    if (!this.socket$) {
      throw Error('Socket has not been initialised.')
    }
    this.socket$.next(msg);
  }

  close(): void {
    this.socket$?.complete();
  }
}
