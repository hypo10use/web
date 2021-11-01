import {get} from "./rest";

export const explorerApi = 'https://api.ergoplatform.com/api/v0'
export const explorerApiV1 = 'https://api.ergoplatform.com/api/v1'

function getRequest(url: string, api = explorerApi) {
  return get(api + url).then(res => res.json())
}

export async function currentHeight() {
  return getRequest('/blocks?limit=1')
    .then(res => {
      return res.items[0].height
    })
}

export async function currentBlock() {
  return getRequest('/blocks?limit=1')
    .then(res => {
      return res.items[0]
    })
}
