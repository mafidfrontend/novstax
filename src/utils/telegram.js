const HANDLE = "vorquaze";

export function telegramUrl(text) {
  const encoded = encodeURIComponent(text);
  return `https://t.me/${HANDLE}?text=${encoded}`;
}
