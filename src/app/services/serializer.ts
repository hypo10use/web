import {Serializer} from '@coinbarn/ergo-ts/dist/serializer';
import {Address, AddressKind} from "@coinbarn/ergo-ts/dist/models/address";



let ergolib = import('ergo-lib-wasm-browser')


export async function encodeNum(n: number) {
  return (await ergolib).Constant.from_i32(<number>n).encode_to_base16()
}
