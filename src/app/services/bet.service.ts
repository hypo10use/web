import { Injectable } from '@angular/core';
import { SocketService } from "../socket.service";
import { WalletService } from "./wallet.service";
import {txFee} from "./consts";
import {currentBlock, currentHeight} from "./explorer";
import {AddressService} from "./address.service";
import {p2s} from "./assembler";
let ergolib = import('ergo-lib-wasm-browser')
import {Serializer} from '@coinbarn/ergo-ts/dist/serializer';
import {tick} from "@angular/core/testing";
import {ErgoBox, ErgoBoxes} from "ergo-lib-wasm-browser";
import {parseJson} from "@angular/cli/utilities/json-file";
import {parse} from "@angular/compiler/src/render3/view/style_parser";

@Injectable()
export class BetService {
  constructor(private addressService: AddressService, private walletService: WalletService) {}

  async placeBet(amount: string | number) {

    const contract = `sigmaProp(1 == 1)`;

    const wasm = await ergolib

    let have = JSON.parse(JSON.stringify({"ERG":1, "264a662cbeca93c982796a578a6f69d59d25954126074f658db007ed52d1d679":amount}))
    have['ERG'] += wasm.TxBuilder.SUGGESTED_TX_FEE().as_i64().to_str()

    const keys = Object.keys(have);
    let ins: any[] = []
    for (let i = 0; i < keys.length; i++) {
      if (have[keys[i]] <= 0) continue
      const curIns = await this.walletService.get_utxos(have[keys[i]].toString(), keys[i]);
      if (curIns !== undefined) {
        ins = ins.concat(curIns)
      }
    }

    this.walletService.getChangeAddress().subscribe(async address => {
      let addr = address;
      let addr2 = "9gv4CVNsd181sZxyDyaBaUxPuuxkBJcpcz6VfaVxwhVyWN7aWe5"
    ///
      const block = await currentBlock()

      let fetchContract = await p2s(contract);
      console.log(fetchContract.address)
      console.log(wasm.Address.from_mainnet_str(fetchContract.address).to_ergo_tree().to_base16_bytes())
      //wasm.Address.from_mainnet_str(fetchContract.address).to_ergo_tree().to_base16_bytes()
      const ticketBox = {
        value: wasm.TxBuilder.SUGGESTED_TX_FEE().as_i64().to_str(),
        creationHeight: block.height,
        ergoTree: "1005040004000e36100204a00b08cd0279be667ef9dcbbac55a06295ce870b07029bfcdb2dce28d959f2815b16f81798ea02d192a39a8cc7a701730073011001020402d19683030193a38cc7b2a57300000193c2b2a57301007473027303830108cdeeac93b1a57304",
        additionalRegisters: {},
        assets: []
      }


      const changeBox = {
        value: (-have['ERG']).toString(),
        ergoTree: wasm.Address.from_mainnet_str(addr).to_ergo_tree().to_base16_bytes(),
        assets: Object.keys(have).filter(key => key !== 'ERG')
          .filter(key => have[key] < 0)
          .map(key => {
            return {
              tokenId: key,
              amount: (-have[key]).toString()
            }
          }),
        additionalRegisters: {},
        creationHeight: block.height
      }


      console.log(fetchContract)
      const gameBox = {
        value: wasm.TxBuilder.SUGGESTED_TX_FEE().as_i64().to_str(),
        creationHeight: block.height,
        ergoTree: wasm.Address.from_mainnet_str(addr2).to_ergo_tree().to_base16_bytes(),
        additionalRegisters: {},
        assets: [],
      }

      const amountToSendBoxValue = wasm.BoxValue.from_i64(wasm.I64.from_str((txFee).toString()));
      const selector = new wasm.SimpleBoxSelector();

      console.log(wasm.BoxValue.from_i64(amountToSendBoxValue.as_i64().checked_add(wasm.TxBuilder.SUGGESTED_TX_FEE().as_i64())).as_i64().to_str())
      const boxSelection = selector.select(
        wasm.ErgoBoxes.from_boxes_json(ins),
        wasm.BoxValue.from_i64(amountToSendBoxValue.as_i64().checked_add(wasm.TxBuilder.SUGGESTED_TX_FEE().as_i64())),
        new wasm.Tokens());
      console.log(boxSelection.boxes())


    /*
      const token = new wasm.Token(wasm.TokenId.from_box_id(wasm.BoxId.from_str(ins[ins.length - 1].boxId)), wasm.TokenAmount.from_i64(wasm.I64.from_str("1234567890123456789")));
      /      const unsigned = {
        inputs: ins.map(curIn => {
          return {
            ...curIn,
            extension: {}
          }
        }),
        outputs: [gameBox, changeBox, ticketBox],
        dataInputs: [],
        fee: txFee*2
      }
      */
      const outputCandidates = wasm.ErgoBoxCandidates.empty();
      const donationBoxBuilder = new wasm.ErgoBoxCandidateBuilder(
        amountToSendBoxValue,
        wasm.Contract.pay_to_address(wasm.Address.from_base58(addr2)),
        block.height);
      try {
          outputCandidates.add(donationBoxBuilder.build());
      } catch (e) {
          console.log(`building error: ${e}`);
          throw e;
      }
      const txBuilder = wasm.TxBuilder.new(
        boxSelection,
        outputCandidates,
        block.height,
        wasm.TxBuilder.SUGGESTED_TX_FEE(),
        wasm.Address.from_base58(addr),
        wasm.BoxValue.SAFE_USER_MIN()
      );

      const tx = txBuilder.build().to_json();
      console.log(tx)

      //const correctTx = JSON.parse(wasm.UnsignedTransaction.from_json(JSON.stringify(tx)).to_json());
      let tx2 = JSON.parse(wasm.UnsignedTransaction.from_json(tx).to_json())
      //console.log(correctTx)
      tx2.inputs = tx2.inputs.map((box: { boxId: ErgoBox; }) => {
        console.log(`box: ${JSON.stringify(box)}`);
        const fullBoxInfo = ins.find(utxo => utxo.boxId === box.boxId);
        return {
          ...fullBoxInfo,
          extension: {}
        };
      });
      tx2.outputs[0].value = tx2.outputs[0].value.toString()
      tx2.outputs[1].value = tx2.outputs[1].value.toString()
      tx2.outputs[2].value = tx2.outputs[1].value.toString()
      tx2.outputs[1].assets[0].amount = tx2.outputs[1].assets[0].amount.toString()
      try {
        tx2 = await this.walletService.sign_tx(tx2)
      } catch (e) {
        console.log(e)
        console.log('Error while sending funds from Yoroi!', true)
        return
      }
      const txId = await this.walletService.submit_tx(tx2)

      console.log('Yoroi tx id', txId)
      return txId

    })
  }
}
