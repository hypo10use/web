import {post} from './rest';
import {
  getUrl
} from './helpers';
import {Address} from '@coinbarn/ergo-ts';
import {assmUrl,txFee} from "./consts";

// const assmUrl = 'https://assm.sigmausd.io/';


export async function p2s(request: {} | undefined) {
  return await post(getUrl(assmUrl) + '/compile', request).then((res) =>
    res.json()
  ).then(res => {
    if (res.success === false) throw new Error()
    return res
  });
}

