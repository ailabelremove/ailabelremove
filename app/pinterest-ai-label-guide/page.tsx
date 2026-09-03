import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "How to Remove the AI-Generated Label on Pinterest | AI Label Remove",
  description:
    "Why Pinterest labels pins as AI-generated, and how to clean the underlying image metadata before you pin.",
  alternates: { canonical: "/pinterest-ai-label-guide" },
};

export default function PinterestGuidePage() {
  return (
    <main className="mx-auto max-w-2xl px-4 py-10">
      <h1 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
        How to Remove the AI-Generated Label on Pinterest
      </h1>

      <p className="mt-4 text-sm text-gray-600 dark:text-gray-300">
        Pinterest also scans uploaded pins for C2PA and XMP metadata to
        decide whether to mark content as AI-generated. This matters
        especially for creators pinning design mockups, moodboards, or
        AI-assisted graphics, where the label can affect how a pin performs.
      </p>

      <h2 className="mt-8 text-lg font-semibold text-gray-900 dark:text-gray-100">
        Checking your images before pinning
      </h2>
      <ol className="mt-2 flex flex-col gap-2 text-sm text-gray-600 dark:text-gray-300">
        <li>
          1. Scan the image with our{" "}
          <Link href="/checker" className="underline">
            Metadata Checker
          </Link>
          .
        </li>
        <li>2. Look for C2PA or XMP fields in the results.</li>
        <li>3. Clean the file with Maximum Privacy mode.</li>
        <li>4. Confirm the removal, then download and pin the clean file.</li>
      </ol>

      <h2 className="mt-8 text-lg font-semibold text-gray-900 dark:text-gray-100">
        Cleaning a full board at once
      </h2>
      <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
        If you're preparing multiple pins for a board or campaign, our batch
        tool lets you clean several images together and download them as one
        ZIP file, so you're not repeating the process one image at a time.
      </p>

      <p className="mt-6 text-sm text-gray-600 dark:text-gray-300">
        As always, this removes file-level metadata — it does not affect any
        independent visual AI-detection Pinterest may separately run. See our{" "}
        <Link href="/disclaimer" className="underline">
          Disclaimer
        </Link>
        .
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
