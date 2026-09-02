import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "What is C2PA / Content Credentials? A Complete Guide | AI Label Remove",
  description:
    "Learn what C2PA Content Credentials are, why platforms like Instagram and TikTok scan for them, and how to remove them from your images.",
  alternates: { canonical: "/c2pa-guide" },
  openGraph: {
    title: "What is C2PA / Content Credentials? A Complete Guide",
    description:
      "Learn what C2PA Content Credentials are and why platforms scan for them.",
  },
};

export default function C2paGuidePage() {
  return (
    <main className="mx-auto max-w-2xl px-4 py-10">
      <h1 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
        What is C2PA / Content Credentials?
      </h1>
      <p className="mt-3 text-sm text-gray-600 dark:text-gray-300">
        C2PA (Coalition for Content Provenance and Authenticity) is a signed
        metadata standard, embedded directly in the image file, that records
        how an image was created or edited — including whether AI tools were
        involved. It's often called "Content Credentials."
      </p>

      <h2 className="mt-8 text-lg font-semibold text-gray-900 dark:text-gray-100">
        Why platforms scan for it
      </h2>
      <p className="mt-3 text-sm text-gray-600 dark:text-gray-300">
        Major platforms including Instagram, Facebook, and TikTok read C2PA
        data on upload as one of their primary signals for showing an
        "AI info" or "Made with AI" label on a post. Many AI tools — including
        image generators and editors — write a C2PA manifest automatically,
        even for minor edits.
      </p>

      <h2 className="mt-8 text-lg font-semibold text-gray-900 dark:text-gray-100">
        What removing C2PA does — and doesn't — do
      </h2>
      <p className="mt-3 text-sm text-gray-600 dark:text-gray-300">
        Removing the C2PA manifest stops a platform from reading a{" "}
        <em>declared</em> AI-provenance record from the file. It does not
        remove invisible pixel-level watermarks (such as SynthID) embedded in
        the image itself, and it cannot guarantee a platform's own visual
        AI-content classifiers won't independently flag the image — those
        operate on the picture's actual content, not its metadata.
      </p>

      <h2 className="mt-8 text-lg font-semibold text-gray-900 dark:text-gray-100">
        How we detect and remove it
      </h2>
      <p className="mt-3 text-sm text-gray-600 dark:text-gray-300">
        We check for the JUMBF container format that C2PA uses in JPEG
        (APP11 segments) and PNG (the <code>caBX</code> chunk), confirm it
        specifically as C2PA where possible, and remove it at the binary
        level — verified automatically after cleaning.
      </p>

      <div className="mt-8">
        <Link
          href="/checker"
          className="inline-block rounded-md bg-gray-900 px-5 py-2.5 text-sm font-semibold text-white dark:bg-white dark:text-gray-900"
        >
          Check Your Image for C2PA Data
        </Link>
      </div>
    </main>
  );
}
