export async function post(url: RequestInfo, body = {}, apiKey = '') {
  return await fetch(url, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      api_key: apiKey,
    },
    body: JSON.stringify(body),
  });
}

export async function get(url: RequestInfo, apiKey = '') {
  return await fetch(url, {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      api_key: apiKey,
    },
  });
}
