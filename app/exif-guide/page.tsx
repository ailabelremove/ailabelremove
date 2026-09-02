import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "What is EXIF Data? A Complete Guide | AI Label Remove",
  description:
    "Learn what EXIF metadata is, what it reveals about your camera and location, and how to remove it from JPG and other image files.",
  alternates: { canonical: "/exif-guide" },
  openGraph: {
    title: "What is EXIF Data? A Complete Guide",
    description:
      "Learn what EXIF metadata is, what it reveals, and how to remove it from your images.",
  },
};

export default function ExifGuidePage() {
  return (
    <main className="mx-auto max-w-2xl px-4 py-10">
      <h1 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
        What is EXIF Data?
      </h1>
      <p className="mt-3 text-sm text-gray-600 dark:text-gray-300">
        EXIF (Exchangeable Image File Format) is metadata embedded directly
        inside JPEG and some other image files, usually written automatically
        by the camera or phone that took the photo.
      </p>

      <h2 className="mt-8 text-lg font-semibold text-gray-900 dark:text-gray-100">
        What EXIF can contain
      </h2>
      <ul className="mt-3 flex flex-col gap-2 text-sm text-gray-600 dark:text-gray-300">
        <li>• Camera make and model</li>
        <li>• Lens information, aperture, shutter speed, ISO</li>
        <li>• Date and time the photo was taken</li>
        <li>• GPS location, if location services were enabled</li>
        <li>• Device or camera serial number, in some cases</li>
        <li>• Software used to edit or export the file</li>
      </ul>

      <h2 className="mt-8 text-lg font-semibold text-gray-900 dark:text-gray-100">
        Why it matters
      </h2>
      <p className="mt-3 text-sm text-gray-600 dark:text-gray-300">
        Most of this data is harmless for a personal photo album, but it
        travels silently with the file. If you share a photo publicly, GPS
        coordinates can reveal your home address, and device details can
        expose more about you or your equipment than intended.
      </p>

      <h2 className="mt-8 text-lg font-semibold text-gray-900 dark:text-gray-100">
        How to remove it
      </h2>
      <p className="mt-3 text-sm text-gray-600 dark:text-gray-300">
        Our{" "}
        <Link href="/checker" className="underline">
          Metadata Checker
        </Link>{" "}
        scans a file and shows every EXIF field it finds, with a risk level
        for each. From there you can clean the file — EXIF is removed
        directly from the file's binary structure, so your image quality is
        unaffected.
      </p>

      <div className="mt-8">
        <Link
          href="/checker"
          className="inline-block rounded-md bg-gray-900 px-5 py-2.5 text-sm font-semibold text-white dark:bg-white dark:text-gray-900"
        >
          Check Your Image's EXIF Data
        </Link>
      </div>
    </main>
  );
      }
