import { Injectable } from '@angular/core';
import { BehaviorSubject, from, Observable } from "rxjs";

export enum TOKEN {
  ERG = 'ERG',
  QUID = 'QUID'
}

export enum WalletConnectionState {
  NOT_CONNECTED = 'NOT_CONNECTED', // initial state
  CONNECTING = 'CONNECTING',
  CONNECTED = 'CONNECTED',
  DISCONNECTED = 'DISCONNECTED'
}

interface ErgoWindow extends Window {
  ergo: ErgoAPI

  _ergo_rpc_call(string: string, arr: number[]): any

  ergo_request_read_access(): Promise<boolean>
}

export interface ErgoAPI {
  get_balance(token_id: string): Promise<number>,

  sign_tx(tx: Object): Promise<string>;
}

@Injectable({
  providedIn: 'root'
})
export class WalletService {
  private _ergoWindow: ErgoWindow;
  private _ergo: ErgoAPI | undefined;

  private _walletConnectionState: BehaviorSubject<WalletConnectionState> = new BehaviorSubject<WalletConnectionState>(WalletConnectionState.NOT_CONNECTED)
  walletConnectionState$: Observable<WalletConnectionState> = this._walletConnectionState.asObservable();

  constructor() {
    this._ergoWindow = window as any;
  }

  connectWallet() {
    if (typeof this._ergoWindow.ergo_request_read_access === "undefined") {
      console.log("ergo not found")
    } else {
      console.log("ergo found")
      this._walletConnectionState.next(WalletConnectionState.CONNECTING);
      this._ergoWindow.ergo_request_read_access().then((access_granted: boolean) => {
        if (access_granted) {
          console.log("access granted")

          // @ts-ignore
          this._ergo = ergo;
          this._walletConnectionState.next(WalletConnectionState.CONNECTED);
        } else {
          console.log("access denied")
          this._walletConnectionState.next(WalletConnectionState.DISCONNECTED);
        }
      });
    }
  }

  getBalance(token: TOKEN = TOKEN.ERG): Observable<number> {
    if (this._ergo) {
      return from(this._ergo.get_balance(token.valueOf()));
    }
    throw 'Wallet not initialized';
  }
}
