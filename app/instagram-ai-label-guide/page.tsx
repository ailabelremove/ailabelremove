import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "How to Remove the 'AI Info' Label on Instagram | AI Label Remove",
  description:
    "Why Instagram shows an AI info label on your photos, what actually triggers it, and how to remove the underlying metadata before you post.",
  alternates: { canonical: "/instagram-ai-label-guide" },
};

export default function InstagramGuidePage() {
  return (
    <main className="mx-auto max-w-2xl px-4 py-10">
      <h1 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
        How to Remove the "AI Info" Label on Instagram
      </h1>

      <p className="mt-4 text-sm text-gray-600 dark:text-gray-300">
        If you've posted a photo on Instagram and seen an "AI info" label
        appear underneath it — even on an image you barely edited with AI —
        you're not alone. Here's what's actually happening and what you can
        do about it.
      </p>

      <h2 className="mt-8 text-lg font-semibold text-gray-900 dark:text-gray-100">
        Why the label appears
      </h2>
      <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
        Meta (Instagram's parent company) reads C2PA Content Credentials and
        XMP metadata from uploaded files as one of its main signals for
        AI-content labeling. Many AI tools — including image generators and
        even some photo editors with AI-assisted features — write this data
        automatically, sometimes for a fairly minor edit. Instagram doesn't
        necessarily analyze the whole image; it often just reads what the
        file itself declares.
      </p>

      <h2 className="mt-8 text-lg font-semibold text-gray-900 dark:text-gray-100">
        Steps to remove it before posting
      </h2>
      <ol className="mt-2 flex flex-col gap-2 text-sm text-gray-600 dark:text-gray-300">
        <li>
          1. Upload your image to our{" "}
          <Link href="/checker" className="underline">
            Metadata Checker
          </Link>{" "}
          to see exactly what it contains.
        </li>
        <li>
          2. Look for a "C2PA" or "XMP" category in the results — these are
          the most common triggers.
        </li>
        <li>
          3. Use Maximum Privacy mode (or select C2PA and XMP specifically in
          Custom mode) and clean the file.
        </li>
        <li>4. Verify the removal in the automatic before/after check.</li>
        <li>5. Download the cleaned image and post that version.</li>
      </ol>

      <h2 className="mt-8 text-lg font-semibold text-gray-900 dark:text-gray-100">
        What this doesn't guarantee
      </h2>
      <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
        Meta has also started using its own visual AI-detection models on
        some images, independent of file metadata. For clearly, heavily
        AI-styled images, a visual classifier may still flag the post even
        after metadata is removed. We've verified this ourselves — see our{" "}
        <Link href="/disclaimer" className="underline">
          Disclaimer
        </Link>
        . Metadata cleaning is the most common fix, but not a universal one.
      </p>

      <div className="mt-8">
        <Link
          href="/checker"
          className="inline-block rounded-md bg-gray-900 px-5 py-2.5 text-sm font-semibold text-white dark:bg-white dark:text-gray-900"
        >
          Check Your Image Now
        </Link>
      </div>
    </main>
  );
}
