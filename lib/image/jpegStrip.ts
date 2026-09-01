export interface JpegStripOptions {
  removeExif: boolean;
  removeXmp: boolean;
  removeIptc: boolean;
  removeIcc: boolean;
  removeC2pa: boolean;
}

const EXIF_SIGNATURE = [0x45, 0x78, 0x69, 0x66, 0x00, 0x00]; // "Exif\0\0"
const XMP_SIGNATURE = "http://ns.adobe.com/xap/1.0/";
const ICC_SIGNATURE = "ICC_PROFILE";

function startsWithBytes(bytes: Uint8Array, pattern: number[]): boolean {
  if (bytes.length < pattern.length) return false;
  for (let i = 0; i < pattern.length; i++) {
    if (bytes[i] !== pattern[i]) return false;
  }
  return true;
}

function startsWithAscii(bytes: Uint8Array, text: string): boolean {
  if (bytes.length < text.length) return false;
  for (let i = 0; i < text.length; i++) {
    if (bytes[i] !== text.charCodeAt(i)) return false;
  }
  return true;
}

export function stripJpegMetadata(
  buffer: ArrayBuffer,
  options: JpegStripOptions
): ArrayBuffer {
  const bytes = new Uint8Array(buffer);

  if (bytes.length < 4 || bytes[0] !== 0xff || bytes[1] !== 0xd8) {
    throw new Error("Not a valid JPEG file (missing SOI marker).");
  }

  const output = new Uint8Array(bytes.length);
  let writeIndex = 0;

  function copyRange(start: number, end: number) {
    output.set(bytes.subarray(start, end), writeIndex);
    writeIndex += end - start;
  }

  copyRange(0, 2); // SOI
  let offset = 2;

  while (offset < bytes.length) {
    if (bytes[offset] !== 0xff) {
      copyRange(offset, bytes.length);
      break;
    }

    const marker = bytes[offset + 1];

    if (marker === 0xd9) {
      copyRange(offset, offset + 2);
      offset += 2;
      continue;
    }

    if ((marker >= 0xd0 && marker <= 0xd7) || marker === 0x01) {
      copyRange(offset, offset + 2);
      offset += 2;
      continue;
    }

    if (marker === 0xda) {
      copyRange(offset, bytes.length);
      break;
    }

    if (offset + 4 > bytes.length) {
      copyRange(offset, bytes.length);
      break;
    }

    const length = (bytes[offset + 2] << 8) | bytes[offset + 3];
    const segmentStart = offset + 4;
    const segmentEnd = offset + 2 + length;

    if (segmentEnd > bytes.length) {
      copyRange(offset, bytes.length);
      break;
    }

    const payload = bytes.subarray(segmentStart, segmentEnd);
    let shouldRemove = false;

    if (marker === 0xe1) {
      const isExif = startsWithBytes(payload, EXIF_SIGNATURE);
      const isXmp = startsWithAscii(payload, XMP_SIGNATURE);
      if (isExif && options.removeExif) shouldRemove = true;
      if (isXmp && options.removeXmp) shouldRemove = true;
    } else if (marker === 0xed) {
      if (options.removeIptc) shouldRemove = true;
    } else if (marker === 0xe2) {
      if (startsWithAscii(payload, ICC_SIGNATURE) && options.removeIcc) {
        shouldRemove = true;
      }
    } else if (marker === 0xeb) {
      // APP11 — JUMBF / C2PA Content Credentials
      if (options.removeC2pa) shouldRemove = true;
    }

    if (!shouldRemove) {
      copyRange(offset, segmentEnd);
    }

    offset = segmentEnd;
  }

  return output.slice(0, writeIndex).buffer;
  }
