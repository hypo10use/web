import { Injectable } from '@angular/core';
import { SocketService } from "../socket.service";
import { WalletService } from "./wallet.service";
import {txFee} from "./consts";
import {currentBlock, currentHeight} from "./explorer";
import {AddressService} from "./address.service";
let ergolib = import('ergo-lib-wasm-browser')

@Injectable()
export class BetService {
  constructor(private addressService: AddressService, private walletService: WalletService) {}

  async placeBet(amount: string | number) {
    const wasm = await ergolib
    let curIn = await this.walletService.get_utxos();


    this.walletService.getChangeAddress().subscribe(async address => {
      let addr = address;

      const ticketBox = {
        value: txFee.toString(),
        ergoTree: wasm.Address.from_mainnet_str(addr).to_ergo_tree().to_base16_bytes(),
        creationHeight: currentHeight(),
        assets: [],
        additionalRegisters: {},
      }

      const gameBox = {
        value: txFee.toString(),
        creationHeight: currentHeight(),
        ergoTree: "1005040004000e36100204a00b08cd0279be667ef9dcbbac55a06295ce870b07029bfcdb2dce28d959f2815b16f81798ea02d192a39a8cc7a701730073011001020402d19683030193a38cc7b2a57300000193c2b2a57301007473027303830108cdeeac93b1a57304",
        assets: [],
        additionalRegisters: {},
      }

      const unsigned = {
        inputs: curIn,
        outputs: [ticketBox, gameBox],
        dataInputs: [],
        fee: txFee
      }

      let tx = null
      try {
        tx = await this.walletService.sign_tx(unsigned)
      } catch (e) {
        return
      }
      const txId = await this.walletService.submit_tx(tx)

      console.log('Yoroi tx id', txId)
      return txId

    })
  }
}
