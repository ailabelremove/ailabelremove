export interface PngStripOptions {
  removeTextChunks: boolean; // tEXt, zTXt, iTXt — comments, descriptions, AI-generation params
  removeExif: boolean; // eXIf chunk
  removeIcc: boolean; // iCCP chunk
  removeTime: boolean; // tIME chunk
}

const PNG_SIGNATURE = [137, 80, 78, 71, 13, 10, 26, 10];

export function stripPngMetadata(
  buffer: ArrayBuffer,
  options: PngStripOptions
): ArrayBuffer {
  const bytes = new Uint8Array(buffer);

  for (let i = 0; i < PNG_SIGNATURE.length; i++) {
    if (bytes[i] !== PNG_SIGNATURE[i]) {
      throw new Error("Not a valid PNG file (missing signature).");
    }
  }

  const view = new DataView(buffer);
  const output = new Uint8Array(bytes.length);
  output.set(bytes.subarray(0, 8), 0);
  let writeIndex = 8;

  let offset = 8;
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

    let shouldRemove = false;
    if (
      options.removeTextChunks &&
      (type === "tEXt" || type === "zTXt" || type === "iTXt")
    ) {
      shouldRemove = true;
    } else if (options.removeExif && type === "eXIf") {
      shouldRemove = true;
    } else if (options.removeIcc && type === "iCCP") {
      shouldRemove = true;
    } else if (options.removeTime && type === "tIME") {
      shouldRemove = true;
    }

    if (!shouldRemove) {
      output.set(bytes.subarray(offset, chunkEnd), writeIndex);
      writeIndex += chunkEnd - offset;
    }

    offset = chunkEnd;
    if (type === "IEND") break;
  }

  return output.slice(0, writeIndex).buffer;
}
