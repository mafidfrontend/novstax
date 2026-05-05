export function formatMoney(n) {
  return new Intl.NumberFormat("uz-UZ").format(n) + " UZS";
}

export function formatTokens(n) {
  return new Intl.NumberFormat("uz-UZ").format(n);
}
