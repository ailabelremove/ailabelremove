import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Free Image Metadata Cleaner — Remove EXIF, GPS, C2PA | AI Label Remove",
  description:
    "Remove EXIF, GPS, XMP, IPTC, and C2PA metadata from your images before sharing. Batch clean up to several images and download as ZIP — free, browser-based.",
  alternates: { canonical: "/cleaner" },
};

export default function CleanerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
