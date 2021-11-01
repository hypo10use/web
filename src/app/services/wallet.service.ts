import { Injectable } from '@angular/core';
import { BehaviorSubject, from, Observable } from 'rxjs';
import {
  Address,
  BoxValue,
  Contract,
  DataInputs,
  ErgoBox,
  ErgoBoxCandidateBuilder,
  ErgoBoxCandidates,
  ErgoBoxes,
  I64,
  SimpleBoxSelector,
  TokenAmount,
  TokenId,
  Tokens,
  TxBuilder
} from 'ergo-lib-wasm-browser';
import { parseJson } from '@angular/cli/utilities/json-file';
import * as JSONBigInt from 'json-bigint';

export class TokenType {
  public static readonly ERG: TokenType = new TokenType('ERG', 'ERG', 1000 * 1000 * 1000);
  public static readonly QUID: TokenType = new TokenType('264a662cbeca93c982796a578a6f69d59d25954126074f658db007ed52d1d679', 'QUID', 1);

  private constructor(public id: string, public name: string, public divider: number) {
  }
}

export enum WalletConnectionState {
  NOT_CONNECTED = 'NOT_CONNECTED', // initial state
  CONNECTING = 'CONNECTING',
  CONNECTED = 'CONNECTED',
  DISCONNECTED = 'DISCONNECTED'
}

interface ErgoWindow extends Window {
  ergo: ErgoAPI

  ergo_request_read_access(): Promise<boolean>
}

export interface ErgoAPI {
  get_balance(token_id: string): Promise<number>

  sign_tx(tx: Object): Promise<string>

  get_used_addresses(paginate?: boolean): Promise<string[]>

  get_utxos(amount: string, paginate?: boolean): Promise<ErgoBox[]>
}

export const IS_MAINNET = true;

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

    const fee = TxBuilder.SUGGESTED_TX_FEE().as_i64().as_num();
    console.log('fee', fee / (1000 * 1000 * 1000))

    /*
    const a: BoxSelector = {
      select(inputs: ErgoBox[], target: OverallAmount): BoxSelection | InsufficientInputs {
      }
    }
     */
  }

  connectWallet() {
    if (typeof this._ergoWindow.ergo_request_read_access === 'undefined') {
      console.log('ergo not found')
    } else {
      console.log('ergo found')
      this._walletConnectionState.next(WalletConnectionState.CONNECTING);
      this._ergoWindow.ergo_request_read_access().then((access_granted: boolean) => {
        if (access_granted) {
          console.log('access granted')

          // @ts-ignore
          this._ergo = ergo;
          this._walletConnectionState.next(WalletConnectionState.CONNECTED);
        } else {
          console.log('access denied')
          this._walletConnectionState.next(WalletConnectionState.DISCONNECTED);
        }
      });
    }
  }

  getBalance(token: TokenType = TokenType.ERG): Observable<number> {
    if (this._ergo) {
      return from(this._ergo.get_balance(token.id));
    }
    this._walletConnectionState.next(WalletConnectionState.DISCONNECTED);
    throw 'Wallet not initialized';
  }

  getUsedAddresses(): Observable<string[]> {
    if (this._ergo) {
      return from(this._ergo.get_used_addresses());
    }
    this._walletConnectionState.next(WalletConnectionState.DISCONNECTED);
    throw 'Wallet not initialized';
  }

  async checkSendUTXOs(): Promise<void> {
    if (this._ergo) {
      const utxos = await this._ergo.get_utxos(BoxValue.SAFE_USER_MIN().as_i64().checked_add(TxBuilder.SUGGESTED_TX_FEE().as_i64()).to_str());
      const selector = new SimpleBoxSelector();

      const boxSelection = selector.select(
        ErgoBoxes.from_boxes_json(utxos),
        BoxValue.from_i64(TxBuilder.SUGGESTED_TX_FEE().as_i64()),
        new Tokens()
      );
      console.log(`boxes selected: ${boxSelection.boxes().len()}`);

      const height = boxSelection.boxes().get(0).creation_height();

      const address = Address.from_base58('');

      const outputCandidates = ErgoBoxCandidates.empty();
      const donationBoxBuilder = new ErgoBoxCandidateBuilder(
        BoxValue.SAFE_USER_MIN(),
        Contract.pay_to_address(address),
        height);
      donationBoxBuilder.add_token(TokenId.from_str(TokenType.QUID.id), TokenAmount.from_i64(I64.from_str('2')));
      try {
        outputCandidates.add(donationBoxBuilder.build());
      } catch (e) {
        console.log(`building error: ${e}`);
        throw e;
      }

      const txBuilder = TxBuilder.new(
        boxSelection,
        outputCandidates,
        height,
        TxBuilder.SUGGESTED_TX_FEE(),
        address,
        BoxValue.SAFE_USER_MIN());
      const dataInputs = new DataInputs();
      txBuilder.set_data_inputs(dataInputs);
      const tx = parseJson(txBuilder.build().to_json());
      console.log(`tx: ${JSONBigInt.stringify(tx)}`);
      console.log(`original id: ${tx.id}`);

    } else {
      this._walletConnectionState.next(WalletConnectionState.DISCONNECTED);
      throw 'Wallet not initialized';
    }
  }
}
