export function sanitizeFilename(name: string): string {
  const trimmed = name.trim() || "image";
  const cleaned = trimmed
    .replace(/[\/\\]/g, "-")
    .replace(/[\x00-\x1f\x7f]/g, "")
    .replace(/[<>:"|?*]/g, "-");
  return cleaned.slice(0, 200) || "image";
}

export function buildCleanedFilename(originalName: string): string {
  const safe = sanitizeFilename(originalName);
  const dotIndex = safe.lastIndexOf(".");
  if (dotIndex <= 0) return `${safe}-cleaned`;
  return `${safe.slice(0, dotIndex)}-cleaned${safe.slice(dotIndex)}`;
}
