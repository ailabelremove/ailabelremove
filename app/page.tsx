import Link from "next/link";

export default function HomePage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-10">
      <section className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 sm:text-4xl">
          Inspect. Clean. Protect.
        </h1>
        <p className="mt-3 text-base text-gray-600 dark:text-gray-300">
          Analyze and remove hidden metadata — EXIF, GPS, XMP, IPTC, and C2PA
          AI-provenance data — from your images before you share them.
          Everything happens in your browser.
        </p>
        <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
          <Link
            href="/checker"
            className="rounded-md bg-gray-900 px-5 py-3 text-sm font-semibold text-white dark:bg-white dark:text-gray-900"
          >
            Analyze an Image
          </Link>
          <Link
            href="/cleaner"
            className="rounded-md border border-gray-300 px-5 py-3 text-sm font-semibold text-gray-800 dark:border-gray-600 dark:text-gray-200"
          >
            Clean Images
          </Link>
        </div>
        <p className="mt-4 inline-block rounded-full bg-green-50 px-3 py-1 text-xs font-medium text-green-700 dark:bg-green-950 dark:text-green-300">
          100% Browser-Based Processing
        </p>
        <p className="mt-2 text-xs text-gray-400 dark:text-gray-500">
          Supports JPG, PNG, and WebP — up to 25 MB per image
        </p>
      </section>

      <section className="mt-14">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
          What is image metadata?
        </h2>
        <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
          Every photo and generated image carries hidden information inside
          the file itself — camera details, GPS location, editing software,
          and sometimes a signed record of how the image was created (C2PA
          Content Credentials). This data travels with the file wherever it's
          shared, even after you post it online.
        </p>
      </section>

      <section className="mt-10">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
          Why it matters
        </h2>
        <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
          Metadata can quietly reveal where a photo was taken, what device
          you used, or that an image was AI-generated — sometimes triggering
          an "AI info" label when you post it on platforms like Instagram,
          Facebook, or TikTok. Reviewing and cleaning this data before
          sharing gives you control over what your files reveal.
        </p>
      </section>

      <section className="mt-10">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
          How it works
        </h2>
        <ol className="mt-3 flex flex-col gap-2 text-sm text-gray-600 dark:text-gray-300">
          <li>1. Upload one or more images.</li>
          <li>
            2. We scan and display every metadata field we find, with a
            privacy risk score.
          </li>
          <li>3. Choose what to remove — everything, or just specific categories.</li>
          <li>
            4. We clean the file directly and automatically re-scan it to
            verify what was actually removed.
          </li>
          <li>5. Download your cleaned image, or all of them as a ZIP.</li>
        </ol>
      </section>

      <section className="mt-10">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
          Privacy features
        </h2>
        <ul className="mt-3 flex flex-col gap-2 text-sm text-gray-600 dark:text-gray-300">
          <li>• Your images are processed locally in your browser.</li>
          <li>
            • Your original image is never modified — a new cleaned copy is
            created.
          </li>
          <li>• Nothing is uploaded to a server, logged, or stored remotely.</li>
          <li>• No account required.</li>
        </ul>
      </section>

      <section className="mt-10">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
          What we detect and can remove
        </h2>
        <ul className="mt-3 grid grid-cols-2 gap-2 text-sm text-gray-600 dark:text-gray-300">
          <li>• EXIF (camera, settings)</li>
          <li>• GPS location</li>
          <li>• XMP (including AI parameters)</li>
          <li>• IPTC (captions, credit)</li>
          <li>• C2PA Content Credentials</li>
          <li>• PNG text chunks</li>
          <li>• ICC color profile</li>
        </ul>
      </section>

      <section className="mt-10 rounded-lg border border-amber-200 bg-amber-50 p-4 dark:border-amber-900 dark:bg-amber-950">
        <h2 className="text-base font-semibold text-amber-900 dark:text-amber-200">
          Metadata removal is not the same as AI detection bypass
        </h2>
        <p className="mt-2 text-sm text-amber-800 dark:text-amber-300">
          Removing EXIF, XMP, and C2PA metadata stops platforms from reading
          a <em>declared</em> AI label stored inside the file — this is what
          triggers most "AI info" tags today. It does not remove invisible
          pixel-level watermarks (like SynthID), and it cannot guarantee a
          platform's own visual AI-detection systems won't independently flag
          an image. We verify exactly what was removed after cleaning — we
          never claim more than that.
        </p>
      </section>

      <section className="mt-12 text-center">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
          Ready to check your images?
        </h2>
        <div className="mt-4">
          <Link
            href="/checker"
            className="rounded-md bg-gray-900 px-5 py-3 text-sm font-semibold text-white dark:bg-white dark:text-gray-900"
          >
            Get Started — It's Free
          </Link>
        </div>
        <p className="mt-3 text-xs text-gray-400 dark:text-gray-500">
          Have questions? See our{" "}
          <Link href="/faq" className="underline">
            FAQ
          </Link>
          .
        </p>
      </section>
    </main>
  );
}
