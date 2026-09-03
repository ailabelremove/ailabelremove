import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy — AI Label Remove",
  description:
    "How AI Label Remove handles your images and data: 100% local browser processing, no image uploads, no server storage of your files.",
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return (
    <main className="mx-auto max-w-2xl px-4 py-10">
      <h1 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
        Privacy Policy
      </h1>
      <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
        Last updated: 2026
      </p>

      <section className="mt-8">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
          Your images never leave your device
        </h2>
        <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
          AI Label Remove analyzes and cleans image metadata entirely inside
          your browser, using JavaScript and Web Workers running on your own
          device. When you upload an image on this site, it is not sent to
          our servers, not stored remotely, and not shared with any third
          party. If you close the tab or clear your browser, nothing about
          your images remains on our end — because it was never sent to us in
          the first place.
        </p>
      </section>

      <section className="mt-8">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
          What we don't collect
        </h2>
        <ul className="mt-2 flex flex-col gap-2 text-sm text-gray-600 dark:text-gray-300">
          <li>• We do not upload or store your image files.</li>
          <li>
            • We do not log or transmit metadata values from your images
            (GPS coordinates, filenames, EXIF fields, camera details, etc.).
          </li>
          <li>• We do not require an account, so we don't collect account data.</li>
        </ul>
      </section>

      <section className="mt-8">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
          What we may collect
        </h2>
        <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
          Like most websites, our hosting provider (Vercel) automatically
          logs basic technical information for security and performance
          purposes, such as IP address, browser type, and page requests. We
          may also use standard web analytics to understand overall traffic
          patterns (which pages are visited, roughly how many people use the
          site) — this tracks page visits only, never the contents of any
          image you process.
        </p>
        <p className="mt-3 text-sm text-gray-600 dark:text-gray-300">
          If this site displays advertising (for example, through Google
          AdSense), the advertising provider may use cookies or similar
          technologies to serve ads and measure their performance, subject to
          that provider's own privacy policy. This is separate from, and has
          no access to, the images you process on this site.
        </p>
      </section>

      <section className="mt-8">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
          Local history
        </h2>
        <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
          If a local history feature is enabled in this app, it stores
          lightweight records (like filename, date, and result summary) only
          in your own browser's local storage — never on a server. You can
          clear this at any time from within the app.
        </p>
      </section>

      <section className="mt-8">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
          Your rights
        </h2>
        <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
          Because your images are never transmitted to us, there is nothing
          for us to delete or export on your behalf — the data stays under
          your control on your own device at all times.
        </p>
      </section>

      <section className="mt-8">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
          Changes to this policy
        </h2>
        <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
          We may update this policy as the site evolves. Material changes
          will be reflected here with an updated date.
        </p>
      </section>

      <section className="mt-8">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
          Contact
        </h2>
        <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
          Questions about this policy? See our{" "}
          <Link href="/contact" className="underline">
            Contact page
          </Link>
          .
        </p>
      </section>
    </main>
  );
}
