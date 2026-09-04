import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Why You Should Turn Off GPS Location Before Taking Photos | AI Label Remove",
  description:
    "How location metadata gets embedded in photos, and what it can reveal without you realizing.",
  alternates: { canonical: "/articles/turn-off-gps-location" },
};

export default function Article() {
  return (
    <main className="mx-auto max-w-2xl px-4 py-10">
      <h1 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
        Why You Should Turn Off GPS Location Before Taking Photos
      </h1>

      <p className="mt-4 text-sm text-gray-600 dark:text-gray-300">
        If your phone's camera app has location permission enabled, it
        typically records your exact GPS coordinates — often accurate to
        within a few meters — directly into every photo you take, as part of
        the file's EXIF metadata.
      </p>

      <h2 className="mt-8 text-lg font-semibold text-gray-900 dark:text-gray-100">
        What this actually reveals
      </h2>
      <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
        A single coordinate can pinpoint a home address, workplace, school,
        or a child's regular location — especially when combined with the
        timestamp also stored in the same file.
      </p>

      <h2 className="mt-8 text-lg font-semibold text-gray-900 dark:text-gray-100">
        Why it's easy to miss
      </h2>
      <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
        GPS tagging happens silently in the background. Nothing in the photo
        itself looks different — the location data is invisible unless you
        specifically inspect the file's metadata.
      </p>

      <h2 className="mt-8 text-lg font-semibold text-gray-900 dark:text-gray-100">
        How to turn it off
      </h2>
      <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
        On most phones, this is controlled through your camera app's
        location permission in system settings, separate from your phone's
        general location toggle. The exact menu differs by device — search
        your phone model plus "camera location permission" if you're unsure
        where to find it.
      </p>

      <h2 className="mt-8 text-lg font-semibold text-gray-900 dark:text-gray-100">
        Checking photos you already have
      </h2>
      <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
        For photos already taken, turning off the camera setting going
        forward doesn't remove GPS data already embedded in existing files.
        You can check any photo for GPS data — and remove it — with our{" "}
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
          Check Your Photos for GPS Data
        </Link>
      </div>
    </main>
  );
}
