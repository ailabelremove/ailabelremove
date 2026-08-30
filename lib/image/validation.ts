export const MAX_FILE_SIZE_BYTES = 25 * 1024 * 1024; // 25 MB

export const SUPPORTED_MIME_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
];

export const SUPPORTED_EXTENSIONS = [".jpg", ".jpeg", ".png", ".webp"];

export interface ValidationResult {
  valid: boolean;
  errorMessage?: string;
}

function getExtension(filename: string): string {
  const idx = filename.lastIndexOf(".");
  if (idx === -1) return "";
  return filename.slice(idx).toLowerCase();
}

export function validateImageFile(file: File): ValidationResult {
  const extension = getExtension(file.name);

  if (!SUPPORTED_EXTENSIONS.includes(extension)) {
    return {
      valid: false,
      errorMessage: `Unsupported file extension "${extension || "unknown"}".`,
    };
  }

  if (!SUPPORTED_MIME_TYPES.includes(file.type)) {
    return {
      valid: false,
      errorMessage: `Unsupported file type "${file.type || "unknown"}".`,
    };
  }

  if (file.size === 0) {
    return {
      valid: false,
      errorMessage: "File appears to be empty or corrupted.",
    };
  }

  if (file.size > MAX_FILE_SIZE_BYTES) {
    return {
      valid: false,
      errorMessage: "Image exceeds the 25 MB limit.",
    };
  }

  return { valid: true };
}

export function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export function getFormatLabel(file: File): string {
  const extension = getExtension(file.name).replace(".", "").toUpperCase();
  return extension || "UNKNOWN";
}
