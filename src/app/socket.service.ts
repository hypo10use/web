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
  private messagesSubject$: Subject<any> = new Subject();
  readonly messages$ = this.messagesSubject$.pipe(catchError(e => { throw e }));

  connect(address: string): void {
    if (!this.socket$ || this.socket$.closed) {
      this.socket$ = SocketService.getNewWebSocket(address);
      this.socket$.pipe(
        tap({
          error: error => console.log(error),
        }), catchError(_ => EMPTY)).subscribe(message =>
        this.messagesSubject$.next(message)
      );
    }
  }

  private static getNewWebSocket(address: string): WebSocketSubject<any> {
    return webSocket(`${WS_ENDPOINT}?address=${address}`);
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
