import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Free Image Metadata Checker — EXIF, GPS, C2PA | AI Label Remove",
  description:
    "Scan any image for hidden EXIF, GPS, XMP, IPTC, and C2PA metadata. See a privacy risk score, entirely in your browser — no upload, no account needed.",
  alternates: { canonical: "/checker" },
};

export default function CheckerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
