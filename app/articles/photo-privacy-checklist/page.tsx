import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "5 Things to Check Before You Take a Photo | AI Label Remove",
  description:
    "A quick pre-photo checklist to avoid accidentally revealing more than you intended.",
  alternates: { canonical: "/articles/photo-privacy-checklist" },
};

export default function Article() {
  return (
    <main className="mx-auto max-w-2xl px-4 py-10">
      <h1 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
        5 Things to Check Before You Take a Photo
      </h1>

      <p className="mt-4 text-sm text-gray-600 dark:text-gray-300">
        Most privacy leaks from photos don't happen because of a mistake
        after the photo is taken — they happen because of what's already in
        the frame, or already turned on, before you press the shutter. Here
        are five quick things worth a second thought.
      </p>

      <h2 className="mt-8 text-lg font-semibold text-gray-900 dark:text-gray-100">
        1. What's visible in the background
      </h2>
      <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
        House numbers, street signs, mail with your address, ID cards,
        reflections in windows or mirrors, screens showing personal
        information — all of these can end up in frame without you noticing
        until later.
      </p>

      <h2 className="mt-8 text-lg font-semibold text-gray-900 dark:text-gray-100">
        2. Whether location services are on
      </h2>
      <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
        If your camera app has location access enabled, most phones embed
        exact GPS coordinates into every photo automatically. This travels
        with the file even if you don't mention where you are.
      </p>

      <h2 className="mt-8 text-lg font-semibold text-gray-900 dark:text-gray-100">
        3. Who else is in the photo
      </h2>
      <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
        Other people in your photo may not want to be posted publicly. A
        quick check-in before sharing — especially with children or
        coworkers — is a habit worth building.
      </p>

      <h2 className="mt-8 text-lg font-semibold text-gray-900 dark:text-gray-100">
        4. Whether the photo reveals a routine
      </h2>
      <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
        A single photo rarely reveals much. A pattern of photos — the same
        coffee shop every morning, the same route to school — can reveal a
        schedule over time.
      </p>

      <h2 className="mt-8 text-lg font-semibold text-gray-900 dark:text-gray-100">
        5. What metadata is attached to the file
      </h2>
      <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
        Beyond what's visible, the file itself can carry camera details,
        timestamps, and location data. You can check exactly what's in any
        photo — and remove what you don't want to share — with our{" "}
        <Link href="/checker" className="underline">
          free Metadata Checker
        </Link>
        .
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
