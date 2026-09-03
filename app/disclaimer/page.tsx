import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Disclaimer — AI Label Remove",
  description:
    "What metadata removal does and doesn't guarantee, including limits around platform AI-detection systems.",
  alternates: { canonical: "/disclaimer" },
};

export default function DisclaimerPage() {
  return (
    <main className="mx-auto max-w-2xl px-4 py-10">
      <h1 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
        Disclaimer
      </h1>

      <section className="mt-6">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
          Metadata removal is not a guarantee against AI detection
        </h2>
        <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
          This tool removes metadata that is declared inside an image file —
          including EXIF, XMP, IPTC, ICC, PNG text chunks, and C2PA Content
          Credentials. Many platforms, including Instagram, Facebook, and
          TikTok, use this file-level metadata as a primary signal for
          showing an "AI info" or "Made with AI" label, and removing it often
          stops that specific trigger.
        </p>
        <p className="mt-3 text-sm text-gray-600 dark:text-gray-300">
          However, some platforms also run independent, visual AI-detection
          systems that analyze the actual pixel content of an image — these
          operate completely separately from file metadata. Some AI tools
          also embed invisible, pixel-level watermarks (such as SynthID) that
          are part of the image data itself, not metadata, and cannot be
          removed by any metadata-editing tool, including this one. We have
          verified this limitation through direct testing.
        </p>
        <p className="mt-3 text-sm text-gray-600 dark:text-gray-300">
          We do not, and will not, claim that this tool guarantees bypassing
          any platform's AI-detection or labeling system.
        </p>
      </section>

      <section className="mt-8">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
          Not legal advice
        </h2>
        <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
          Nothing on this site constitutes legal advice. Laws and platform
          policies regarding AI-generated content disclosure vary by
          jurisdiction and platform, and change over time. If you need advice
          on compliance obligations, consult a qualified professional.
        </p>
      </section>

      <section className="mt-8">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
          Use at your own discretion
        </h2>
        <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
          You are responsible for how you use cleaned images and for
          complying with the terms of any platform you share them on. See our{" "}
          <Link href="/terms" className="underline">
            Terms of Service
          </Link>{" "}
          for more.
        </p>
      </section>
    </main>
  );
}
