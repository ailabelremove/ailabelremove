export function getConcurrencyLimit(): number {
  if (typeof navigator === "undefined") return 2;
  const cores = navigator.hardwareConcurrency || 2;
  return cores <= 4 ? 2 : 4;
}
