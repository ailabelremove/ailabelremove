import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "How AI Label Remove Works | AI Label Remove",
  description:
    "See exactly how we scan, score, clean, and verify image metadata — all locally in your browser, with no uploads.",
  alternates: { canonical: "/how-it-works" },
};

const STEPS = [
  {
    title: "1. Upload your image",
    body: "Drag and drop, or choose a file from your device. Nothing is sent anywhere at this point — the file is simply loaded into your browser's memory.",
  },
  {
    title: "2. We scan it",
    body: "A Web Worker running on your device reads the file's binary structure and extracts every metadata field it can find — EXIF, GPS, XMP, IPTC, ICC, PNG text chunks, and C2PA Content Credentials.",
  },
  {
    title: "3. See a privacy risk score",
    body: "Each detected field is classified by sensitivity (low, medium, high) and combined into a 0–100 privacy risk score. Tap the score to see exactly which fields contributed and why.",
  },
  {
    title: "4. Choose what to clean",
    body: "Use Maximum Privacy to remove everything removable, or Custom mode to pick specific categories — for example, removing GPS and C2PA while keeping your camera's ICC color profile.",
  },
  {
    title: "5. We clean the file",
    body: "Metadata segments are cut directly out of the file's binary structure. Your image is not redrawn, recompressed, or re-encoded — pixel quality is unaffected.",
  },
  {
    title: "6. Automatic verification",
    body: "The cleaned file is immediately re-scanned in the background. We show you a before/after comparison and a category-by-category checklist of exactly what was removed, so nothing is left to guesswork.",
  },
  {
    title: "7. Download",
    body: "Download the cleaned image, or clean several at once and download them together as a ZIP file.",
  },
];

export default function HowItWorksPage() {
  return (
    <main className="mx-auto max-w-2xl px-4 py-10">
      <h1 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
        How It Works
      </h1>
      <p className="mt-3 text-sm text-gray-600 dark:text-gray-300">
        Every step below happens inside your browser. No image is ever
        uploaded to a server.
      </p>

      <div className="mt-8 flex flex-col gap-6">
        {STEPS.map((step) => (
          <div key={step.title}>
            <h2 className="text-base font-semibold text-gray-900 dark:text-gray-100">
              {step.title}
            </h2>
            <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">
              {step.body}
            </p>
          </div>
        ))}
      </div>

      <section className="mt-10 rounded-lg border border-amber-200 bg-amber-50 p-4 dark:border-amber-900 dark:bg-amber-950">
        <h2 className="text-base font-semibold text-amber-900 dark:text-amber-200">
          What this doesn't do
        </h2>
        <p className="mt-2 text-sm text-amber-800 dark:text-amber-300">
          Cleaning metadata removes declared information stored inside the
          file. It does not remove invisible pixel-level watermarks, and it
          cannot guarantee a platform's own visual AI-detection systems won't
          independently flag an image, since those don't rely on file
          metadata at all. See our{" "}
          <Link href="/disclaimer" className="underline">
            Disclaimer
          </Link>{" "}
          for details.
        </p>
      </section>

      <div className="mt-8">
        <Link
          href="/checker"
          className="inline-block rounded-md bg-gray-900 px-5 py-2.5 text-sm font-semibold text-white dark:bg-white dark:text-gray-900"
        >
          Try It Now
        </Link>
      </div>
    </main>
  );
}
