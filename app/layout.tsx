import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AI Label Remove — Inspect. Clean. Protect.",
  description:
    "Analyze and remove image metadata — EXIF, GPS, XMP, IPTC, and AI-provenance data — entirely in your browser. Nothing is uploaded to a server.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-white text-gray-900 antialiased">
        {children}
      </body>
    </html>
  );
}
