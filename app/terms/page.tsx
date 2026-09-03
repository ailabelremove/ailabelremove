import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service — AI Label Remove",
  description: "Terms of Service for using AI Label Remove.",
  alternates: { canonical: "/terms" },
};

export default function TermsPage() {
  return (
    <main className="mx-auto max-w-2xl px-4 py-10">
      <h1 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
        Terms of Service
      </h1>
      <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
        Last updated: 2026
      </p>

      <section className="mt-8">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
          Acceptance of terms
        </h2>
        <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
          By using AI Label Remove ("the site", "the tool"), you agree to
          these Terms of Service. If you don't agree, please don't use the
          site.
        </p>
      </section>

      <section className="mt-8">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
          What the service does
        </h2>
        <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
          AI Label Remove lets you inspect and remove metadata from image
          files, entirely within your own browser. We do not receive, store,
          or have access to the images you process.
        </p>
      </section>

      <section className="mt-8">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
          Your responsibility
        </h2>
        <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
          You are solely responsible for the images you process and how you
          use the output. You agree not to use this tool for any unlawful
          purpose, including misrepresenting the origin or authenticity of
          content in a way that violates the law or the terms of any
          platform you share it on.
        </p>
      </section>

      <section className="mt-8">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
          No warranty
        </h2>
        <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
          The service is provided "as is," without warranty of any kind. We
          do not guarantee that metadata removal will produce any particular
          outcome on any third-party platform. See our{" "}
          <a href="/disclaimer" className="underline">
            Disclaimer
          </a>{" "}
          for details.
        </p>
      </section>

      <section className="mt-8">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
          Limitation of liability
        </h2>
        <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
          To the fullest extent permitted by law, we are not liable for any
          indirect, incidental, or consequential damages arising from your
          use of this site.
        </p>
      </section>

      <section className="mt-8">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
          Changes
        </h2>
        <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
          We may update these terms as the service evolves. Continued use of
          the site after changes means you accept the updated terms.
        </p>
      </section>
    </main>
  );
}
