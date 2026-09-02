const FAQS = [
  {
    q: "Is this guaranteed to remove the 'AI info' label on Instagram or TikTok?",
    a: "No. Metadata (C2PA, XMP) is the most common trigger, and we remove it. But some platforms also run their own visual AI-detection on the image itself, independent of file metadata — that cannot be bypassed by editing the file. We verify and show you exactly what metadata was removed, but we can't control how a platform's own systems behave.",
  },
  {
    q: "Are my images uploaded to a server?",
    a: "No. All analysis and cleaning happens locally in your browser using Web Workers. Your images never leave your device.",
  },
  {
    q: "Does cleaning reduce image quality?",
    a: "No. We remove metadata segments directly from the file's binary structure without re-encoding or recompressing the pixel data, so image quality is unaffected.",
  },
  {
    q: "Which file formats are supported?",
    a: "JPG, PNG, and WebP, up to 25 MB per file.",
  },
  {
    q: "What's the difference between EXIF, XMP, IPTC, and C2PA?",
    a: "EXIF stores camera and shooting details. XMP is an extensible field often used for editing history and, increasingly, AI-generation parameters. IPTC covers captions, credit, and copyright. C2PA is a signed provenance record — the main thing platforms scan for AI-content labeling.",
  },
  {
    q: "Can this remove invisible pixel watermarks like SynthID?",
    a: "No. Those are embedded in the image's pixel data itself, not in metadata, so no metadata tool — including this one — can remove them.",
  },
  {
    q: "Do I need an account?",
    a: "No. There's no sign-up, no login, and no usage limits tracked against an account.",
  },
  {
    q: "Is my usage history stored anywhere?",
    a: "Only optionally, and only on your own device (local browser storage) if you choose to keep a history — never on our servers.",
  },
];

export default function FaqPage() {
  return (
    <main className="mx-auto max-w-2xl px-4 py-10">
      <h1 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
        Frequently Asked Questions
      </h1>
      <div className="mt-6 flex flex-col divide-y divide-gray-200 dark:divide-gray-800">
        {FAQS.map((item) => (
          <div key={item.q} className="py-4">
            <h2 className="text-sm font-semibold text-gray-900 dark:text-gray-100">
              {item.q}
            </h2>
            <p className="mt-1.5 text-sm text-gray-600 dark:text-gray-300">
              {item.a}
            </p>
          </div>
        ))}
      </div>
    </main>
  );
}
