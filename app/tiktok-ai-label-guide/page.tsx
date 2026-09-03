import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "How to Remove the AI-Generated Label on TikTok | AI Label Remove",
  description:
    "Why TikTok labels uploaded photos and images as AI-generated, and how to clean the underlying file metadata before posting.",
  alternates: { canonical: "/tiktok-ai-label-guide" },
};

export default function TikTokGuidePage() {
  return (
    <main className="mx-auto max-w-2xl px-4 py-10">
      <h1 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
        How to Remove the AI-Generated Label on TikTok
      </h1>

      <p className="mt-4 text-sm text-gray-600 dark:text-gray-300">
        TikTok has adopted C2PA-based Content Credentials scanning for photo
        and slideshow posts, similar to Instagram. If an image you upload
        gets automatically tagged as AI-generated, the file's own metadata is
        the most likely cause.
      </p>

      <h2 className="mt-8 text-lg font-semibold text-gray-900 dark:text-gray-100">
        Why it happens
      </h2>
      <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
        Like other major platforms, TikTok checks for a C2PA manifest and
        certain XMP fields on upload. AI generation tools and some editing
        apps write this data by default — often without the user realizing
        it's there. TikTok reads it and applies the label automatically.
      </p>

      <h2 className="mt-8 text-lg font-semibold text-gray-900 dark:text-gray-100">
        How to clean your image first
      </h2>
      <ol className="mt-2 flex flex-col gap-2 text-sm text-gray-600 dark:text-gray-300">
        <li>
          1. Run the image through our{" "}
          <Link href="/checker" className="underline">
            Metadata Checker
          </Link>
          .
        </li>
        <li>
          2. Check specifically for a "C2PA" category in the scan results.
        </li>
        <li>3. Clean the file using Maximum Privacy mode.</li>
        <li>
          4. Confirm removal in the verification results before downloading.
        </li>
      </ol>

      <h2 className="mt-8 text-lg font-semibold text-gray-900 dark:text-gray-100">
        Batch cleaning for multiple posts
      </h2>
      <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
        If you're preparing several images for a slideshow post, you can
        upload them all at once and clean them together, then download all
        the cleaned files as a single ZIP.
      </p>

      <p className="mt-6 text-sm text-gray-600 dark:text-gray-300">
        As with any platform, this addresses file-level metadata only — not
        any independent visual AI-detection TikTok may run. See our{" "}
        <Link href="/disclaimer" className="underline">
          Disclaimer
        </Link>{" "}
        for the full picture.
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
