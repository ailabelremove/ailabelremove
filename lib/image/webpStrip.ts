export interface WebpStripOptions {
  removeExif: boolean;
  removeXmp: boolean;
  removeIcc: boolean;
}

export function stripWebpMetadata(
  buffer: ArrayBuffer,
  options: WebpStripOptions
): ArrayBuffer {
  const bytes = new Uint8Array(buffer);
  const view = new DataView(buffer);

  const isRiff =
    bytes.length >= 12 &&
    String.fromCharCode(bytes[0], bytes[1], bytes[2], bytes[3]) === "RIFF" &&
    String.fromCharCode(bytes[8], bytes[9], bytes[10], bytes[11]) === "WEBP";

  if (!isRiff) {
    throw new Error("Not a valid WebP file (missing RIFF/WEBP header).");
  }

  const output = new Uint8Array(bytes.length);
  output.set(bytes.subarray(0, 12), 0);
  let writeIndex = 12;

  let offset = 12;
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

    let shouldRemove = false;
    if (fourCC === "EXIF" && options.removeExif) shouldRemove = true;
    if (fourCC === "XMP " && options.removeXmp) shouldRemove = true;
    if (fourCC === "ICCP" && options.removeIcc) shouldRemove = true;

    if (!shouldRemove) {
      output.set(bytes.subarray(offset, chunkEnd), writeIndex);
      writeIndex += chunkEnd - offset;
    }

    offset = chunkEnd;
  }

  const finalBytes = output.slice(0, writeIndex);
  const finalView = new DataView(finalBytes.buffer);
  finalView.setUint32(4, writeIndex - 8, true); // update RIFF size field
  return finalBytes.buffer;
    }
