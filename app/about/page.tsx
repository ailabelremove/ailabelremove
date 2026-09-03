import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About — AI Label Remove",
  description:
    "AI Label Remove is a free, privacy-first tool for inspecting and cleaning image metadata, built to run entirely in your browser.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <main className="mx-auto max-w-2xl px-4 py-10">
      <h1 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
        About AI Label Remove
      </h1>

      <p className="mt-4 text-sm text-gray-600 dark:text-gray-300">
        AI Label Remove was built to solve a specific, everyday problem:
        photos and AI-generated images carry hidden metadata — camera
        details, GPS coordinates, editing history, and increasingly, signed
        records of AI involvement (C2PA Content Credentials) — that most
        people never see, but that platforms like Instagram, Facebook, and
        TikTok read automatically when a file is uploaded.
      </p>

      <p className="mt-4 text-sm text-gray-600 dark:text-gray-300">
        We wanted a tool that shows exactly what's inside an image file, in
        plain language, and lets people decide what to remove before
        sharing — without uploading their photos to yet another server to do
        it.
      </p>

      <h2 className="mt-8 text-lg font-semibold text-gray-900 dark:text-gray-100">
        Our approach
      </h2>
      <ul className="mt-2 flex flex-col gap-2 text-sm text-gray-600 dark:text-gray-300">
        <li>
          • Everything runs locally in your browser — we built this as a
          browser-based tool from the ground up, not a server-based one with
          a thin client on top.
        </li>
        <li>
          • We only claim what we can verify. Every cleaning operation is
          automatically re-checked, and we show you exactly what was and
          wasn't removed.
        </li>
        <li>
          • We're upfront about limits. Metadata removal is not a magic
          bypass for every kind of AI detection — see our{" "}
          <Link href="/disclaimer" className="underline">
            Disclaimer
          </Link>{" "}
          for the honest version.
        </li>
      </ul>

      <h2 className="mt-8 text-lg font-semibold text-gray-900 dark:text-gray-100">
        Who's behind this
      </h2>
      <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
        AI Label Remove is an independently built and maintained project. If
        you have questions, feedback, or run into an issue, see our{" "}
        <Link href="/contact" className="underline">
          Contact page
        </Link>
        .
      </p>
    </main>
  );
}
