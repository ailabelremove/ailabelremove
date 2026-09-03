import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "How to Remove the 'AI Info' Label on Facebook | AI Label Remove",
  description:
    "Why Facebook shows an AI info label on uploaded photos, and how to remove the C2PA and XMP metadata that triggers it.",
  alternates: { canonical: "/facebook-ai-label-guide" },
};

export default function FacebookGuidePage() {
  return (
    <main className="mx-auto max-w-2xl px-4 py-10">
      <h1 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
        How to Remove the "AI Info" Label on Facebook
      </h1>

      <p className="mt-4 text-sm text-gray-600 dark:text-gray-300">
        Facebook, like Instagram, is run by Meta and uses the same
        underlying detection approach: it reads C2PA Content Credentials and
        XMP metadata from an uploaded file to decide whether to show an "AI
        info" label on a post.
      </p>

      <h2 className="mt-8 text-lg font-semibold text-gray-900 dark:text-gray-100">
        What to check
      </h2>
      <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
        Photos edited with AI-assisted tools, or fully AI-generated images
        from tools like DALL·E, Midjourney, or Stable Diffusion, often carry
        this metadata even if the AI involvement was minimal. Scanning the
        file first tells you exactly what's present, rather than guessing.
      </p>

      <h2 className="mt-8 text-lg font-semibold text-gray-900 dark:text-gray-100">
        How to remove it
      </h2>
      <ol className="mt-2 flex flex-col gap-2 text-sm text-gray-600 dark:text-gray-300">
        <li>
          1. Upload the image to our{" "}
          <Link href="/checker" className="underline">
            Metadata Checker
          </Link>{" "}
          to see its C2PA and XMP fields.
        </li>
        <li>2. Clean the file with Maximum Privacy mode.</li>
        <li>
          3. Check the automatic verification results to confirm C2PA and
          XMP were removed.
        </li>
        <li>4. Download and post the cleaned version.</li>
      </ol>

      <p className="mt-6 text-sm text-gray-600 dark:text-gray-300">
        This removes the declared, file-level record — not any independent
        visual scanning Facebook's systems may separately perform. Full
        details in our{" "}
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
