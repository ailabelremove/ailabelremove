import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "What is XMP Metadata? A Complete Guide | AI Label Remove",
  description:
    "Learn what XMP metadata is, how AI tools like Midjourney and DALL·E use it, and how to remove it from your images.",
  alternates: { canonical: "/xmp-guide" },
  openGraph: {
    title: "What is XMP Metadata? A Complete Guide",
    description:
      "Learn what XMP metadata is and how AI generation tools use it.",
  },
};

export default function XmpGuidePage() {
  return (
    <main className="mx-auto max-w-2xl px-4 py-10">
      <h1 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
        What is XMP Metadata?
      </h1>
      <p className="mt-3 text-sm text-gray-600 dark:text-gray-300">
        XMP (Extensible Metadata Platform) is a flexible metadata format
        created by Adobe. Unlike EXIF's fixed fields, XMP can carry
        arbitrary custom data — which is why many AI image generation tools
        use it to record how an image was made.
      </p>

      <h2 className="mt-8 text-lg font-semibold text-gray-900 dark:text-gray-100">
        What XMP commonly contains
      </h2>
      <ul className="mt-3 flex flex-col gap-2 text-sm text-gray-600 dark:text-gray-300">
        <li>• Editing history from Adobe products</li>
        <li>• AI generation parameters — model name, prompt, or seed</li>
        <li>• Rights and usage terms</li>
        <li>• Custom fields defined by whichever tool wrote the file</li>
      </ul>

      <h2 className="mt-8 text-lg font-semibold text-gray-900 dark:text-gray-100">
        Why it matters for AI images
      </h2>
      <p className="mt-3 text-sm text-gray-600 dark:text-gray-300">
        Because XMP is where many AI tools declare generation details,
        platforms that scan for "AI info" labels often check XMP fields
        specifically. Removing this field-level declaration is one of the
        most direct ways to stop a metadata-based AI label from appearing —
        though it does not affect a platform's separate, independent visual
        AI-detection systems.
      </p>

      <div className="mt-8">
        <Link
          href="/checker"
          className="inline-block rounded-md bg-gray-900 px-5 py-2.5 text-sm font-semibold text-white dark:bg-white dark:text-gray-900"
        >
          Check Your Image's XMP Data
        </Link>
      </div>
    </main>
  );
}
