import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "What to Check Before Posting a Photo on Social Media | AI Label Remove",
  description:
    "The habits worth building before you hit 'share' on Instagram, Facebook, or anywhere else.",
  alternates: { canonical: "/articles/before-posting-social-media" },
};

export default function Article() {
  return (
    <main className="mx-auto max-w-2xl px-4 py-10">
      <h1 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
        What to Check Before Posting a Photo on Social Media
      </h1>

      <p className="mt-4 text-sm text-gray-600 dark:text-gray-300">
        Once a photo is posted, it's largely out of your control — it can be
        saved, screenshotted, and re-shared regardless of your privacy
        settings. A short pre-posting habit helps avoid regret later.
      </p>

      <h2 className="mt-8 text-lg font-semibold text-gray-900 dark:text-gray-100">
        Check who can see it
      </h2>
      <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
        Confirm your audience setting (public, friends, close friends) before
        posting, not after. Defaults sometimes reset after app updates.
      </p>

      <h2 className="mt-8 text-lg font-semibold text-gray-900 dark:text-gray-100">
        Check the timing
      </h2>
      <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
        Posting a live, real-time location — especially that you're away
        from home — is different from posting the same photo a few days
        later. Delaying a post by even a day removes real-time exposure.
      </p>

      <h2 className="mt-8 text-lg font-semibold text-gray-900 dark:text-gray-100">
        Check what the file itself contains
      </h2>
      <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
        Most platforms strip some metadata automatically, but not always
        everything, and not consistently across all platforms and file
        types. If you want certainty rather than assumptions, scan the file
        yourself with our{" "}
        <Link href="/checker" className="underline">
          Metadata Checker
        </Link>{" "}
        before uploading.
      </p>

      <h2 className="mt-8 text-lg font-semibold text-gray-900 dark:text-gray-100">
        Check for an AI-content label if relevant
      </h2>
      <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
        If your image was AI-generated or AI-edited, some platforms will
        detect and label it automatically based on metadata in the file. If
        you'd rather that be your own explicit choice on your caption rather
        than an automatic platform label, our{" "}
        <Link href="/c2pa-guide" className="underline">
          C2PA guide
        </Link>{" "}
        explains what triggers it.
      </p>

      <div className="mt-8">
        <Link
          href="/checker"
          className="inline-block rounded-md bg-gray-900 px-5 py-2.5 text-sm font-semibold text-white dark:bg-white dark:text-gray-900"
        >
          Check a Photo Now
        </Link>
      </div>
    </main>
  );
}
