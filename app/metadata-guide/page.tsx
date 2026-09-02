import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Image Metadata Guide — EXIF, XMP, IPTC, C2PA | AI Label Remove",
  description:
    "A complete guide to image metadata: what EXIF, XMP, IPTC, ICC, and C2PA data reveal, and why it matters before you share a photo.",
  alternates: { canonical: "/metadata-guide" },
};
export default function MetadataGuidePage() {
  return (
    <main className="p-8">
      <h1 className="text-2xl font-semibold">Metadata Guide</h1>
      <p className="mt-2 text-gray-600">Coming soon.</p>
    </main>
  );
}
