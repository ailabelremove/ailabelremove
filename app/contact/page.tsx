import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact — AI Label Remove",
  description: "Get in touch with AI Label Remove.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <main className="mx-auto max-w-2xl px-4 py-10">
      <h1 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
        Contact
      </h1>
      <p className="mt-4 text-sm text-gray-600 dark:text-gray-300">
        Questions, feedback, or found something not working right? Reach out
        through either of these:
      </p>

      <div className="mt-6 flex flex-col gap-4">
        <div>
          <p className="text-xs font-medium uppercase tracking-wide text-gray-500 dark:text-gray-400">
            Email
          </p>
          <a
            href="mailto:ailabelremove@gmail.com"
            className="text-base font-medium text-blue-600 underline dark:text-blue-400"
          >
            ailabelremove@gmail.com
          </a>
        </div>

        <div>
          <p className="text-xs font-medium uppercase tracking-wide text-gray-500 dark:text-gray-400">
            WhatsApp
          </p>
          <a
            href="https://wa.me/8801516013089"
            target="_blank"
            rel="noopener noreferrer"
            className="text-base font-medium text-blue-600 underline dark:text-blue-400"
          >
            +880 1516-013089
          </a>
        </div>
      </div>

      <p className="mt-6 text-sm text-gray-600 dark:text-gray-300">
        We aim to respond within a few days. Since we don't have access to
        the images you process (they never leave your browser), please
        include a description or screenshot if you're reporting an issue.
      </p>
    </main>
  );
}
