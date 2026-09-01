import type { MetadataField } from "@/types/metadata";

const JP_SIGNATURE = [0x4a, 0x50]; // "JP"
const C2PA_ASCII = [0x63, 0x32, 0x70, 0x61]; // "c2pa"

function containsSequence(haystack: Uint8Array, needle: number[]): boolean {
  outer: for (let i = 0; i <= haystack.length - needle.length; i++) {
    for (let j = 0; j < needle.length; j++) {
      if (haystack[i + j] !== needle[j]) continue outer;
    }
    return true;
  }
  return false;
}

export function detectJpegC2pa(bytes: Uint8Array): MetadataField[] {
  const fields: MetadataField[] = [];
  let offset = 2; // after SOI
  let app11Count = 0;
  let confirmed = false;

  while (offset + 4 <= bytes.length) {
    if (bytes[offset] !== 0xff) break;
    const marker = bytes[offset + 1];

    if (marker === 0xd9) break;
    if (marker === 0xda) break; // start of scan — stop before pixel data

    if (offset + 4 > bytes.length) break;
    const length = (bytes[offset + 2] << 8) | bytes[offset + 3];
    const segStart = offset + 4;
    const segEnd = offset + 2 + length;
    if (segEnd > bytes.length) break;

    if (marker === 0xeb) {
      const payload = bytes.subarray(segStart, segEnd);
      const hasJpHeader =
        payload.length >= 2 &&
        payload[0] === JP_SIGNATURE[0] &&
        payload[1] === JP_SIGNATURE[1];
      if (hasJpHeader) {
        app11Count++;
        if (containsSequence(payload, C2PA_ASCII)) confirmed = true;
      }
    }

    offset = segEnd;
  }

  if (app11Count > 0) {
    fields.push({
      category: "C2PA",
      field: confirmed
        ? "Content Credentials (C2PA)"
        : "JUMBF metadata (unconfirmed)",
      value: confirmed
        ? `Detected across ${app11Count} segment${app11Count > 1 ? "s" : ""} — this image carries a signed provenance manifest.`
        : `JUMBF container found in ${app11Count} segment${app11Count > 1 ? "s" : ""}, but could not be confirmed as C2PA specifically.`,
      sensitivity: "high",
      removable: true,
    });
  }

  return fields;
}

export function detectPngC2pa(bytes: Uint8Array): MetadataField[] {
  const fields: MetadataField[] = [];
  const view = new DataView(bytes.buffer, bytes.byteOffset, bytes.byteLength);
  let offset = 8;
  let found = false;

  while (offset + 8 <= bytes.length) {
    const length = view.getUint32(offset, false);
    const type = String.fromCharCode(
      bytes[offset + 4],
      bytes[offset + 5],
      bytes[offset + 6],
      bytes[offset + 7]
    );
    const chunkEnd = offset + 12 + length;
    if (chunkEnd > bytes.length) break;

    if (type === "caBX") found = true;

    offset = chunkEnd;
    if (type === "IEND") break;
  }

  if (found) {
    fields.push({
      category: "C2PA",
      field: "Content Credentials (C2PA)",
      value:
        "Detected in a caBX chunk — this image carries a signed provenance manifest.",
      sensitivity: "high",
      removable: true,
    });
  }

  return fields;
}

export function detectWebpC2pa(bytes: Uint8Array): MetadataField[] {
  const fields: MetadataField[] = [];
  const view = new DataView(bytes.buffer, bytes.byteOffset, bytes.byteLength);
  let offset = 12;
  let found = false;

  while (offset + 8 <= bytes.length) {
    const fourCC = String.fromCharCode(
      bytes[offset],
      bytes[offset + 1],
      bytes[offset + 2],
      bytes[offset + 3]
    );
    const chunkSize = view.getUint32(offset + 4, true);
    const paddedSize = chunkSize + (chunkSize % 2);
    const chunkEnd = offset + 8 + paddedSize;
    if (chunkEnd > bytes.length) break;

    if (fourCC === "C2PA") found = true;

    offset = chunkEnd;
  }

  if (found) {
    fields.push({
      category: "C2PA",
      field: "Content Credentials (C2PA)",
      value:
        "Detected in a C2PA RIFF chunk. WebP C2PA storage is less formally standardized than JPEG/PNG — detection here is best-effort.",
      sensitivity: "high",
      removable: true,
    });
  }

  return fields;
      }
