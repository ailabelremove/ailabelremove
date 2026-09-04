import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "What to Know Before Sharing Your Child's Photos Online | AI Label Remove",
  description:
    "A practical look at 'sharenting' and simple habits that reduce the risk for kids in photos.",
  alternates: { canonical: "/articles/sharenting-awareness" },
};

export default function Article() {
  return (
    <main className="mx-auto max-w-2xl px-4 py-10">
      <h1 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
        What to Know Before Sharing Your Child's Photos Online
      </h1>

      <p className="mt-4 text-sm text-gray-600 dark:text-gray-300">
        "Sharenting" — parents sharing photos and details of their children
        online — is common and usually well-intentioned. A few simple habits
        can meaningfully reduce the risk involved without requiring you to
        stop sharing altogether.
      </p>

      <h2 className="mt-8 text-lg font-semibold text-gray-900 dark:text-gray-100">
        Be mindful of identifying details
      </h2>
      <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
        School uniforms with a visible school name, house numbers, and
        recognizable landmarks in the background can combine with a caption
        or location tag to reveal more than any single detail alone.
      </p>

      <h2 className="mt-8 text-lg font-semibold text-gray-900 dark:text-gray-100">
        Consider the audience, not just the platform
      </h2>
      <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
        "Friends only" privacy settings only limit who sees the post — not
        who friends might forward it to, or how permanent it is once shared.
      </p>

      <h2 className="mt-8 text-lg font-semibold text-gray-900 dark:text-gray-100">
        Check hidden file data too
      </h2>
      <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
        Beyond what's visible in the photo, the file itself may carry GPS
        coordinates pointing to your home or your child's school. This is
        invisible in the image but readable by anyone who downloads the
        original file. You can check and remove this with our{" "}
        <Link href="/checker" className="underline">
          Metadata Checker
        </Link>{" "}
        before posting.
      </p>

      <h2 className="mt-8 text-lg font-semibold text-gray-900 dark:text-gray-100">
        A simple habit
      </h2>
      <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
        Before posting, ask: would I be comfortable with a stranger seeing
        exactly where and when this was taken? If not, that's worth
        addressing before sharing, not after.
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
