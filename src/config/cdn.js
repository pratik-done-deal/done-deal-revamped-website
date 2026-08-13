
export const CDN_BASE_URL = (
  import.meta.env.VITE_CDN_BASE_URL
).replace(/\/+$/, '');

export function cdnUrl(filename) {
  return `${CDN_BASE_URL}/${filename.replace(/^\/+/, '')}`;
}
