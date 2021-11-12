
export function getUrl(url: string) {
  if (!url.startsWith('http')) url = 'http://' + url;
  if (url.endsWith('/')) url = url.slice(0, url.length - 1);
  return url;
}
