import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Image Metadata Guide — EXIF, XMP, IPTC, C2PA | AI Label Remove",
  description:
    "A complete guide to image metadata: what EXIF, XMP, IPTC, ICC, and C2PA data reveal, and why it matters before you share a photo.",
  alternates: { canonical: "/metadata-guide" },
};

const GUIDES = [
  {
    href: "/exif-guide",
    title: "EXIF",
    body: "Camera make/model, shooting settings, timestamps, and GPS location — automatically written by most cameras and phones.",
  },
  {
    href: "/xmp-guide",
    title: "XMP",
    body: "A flexible, extensible metadata format — commonly used by editing software and, increasingly, AI image generators to record generation parameters.",
  },
  {
    href: "/c2pa-guide",
    title: "C2PA / Content Credentials",
    body: "A signed provenance record that platforms like Instagram and TikTok scan for as their primary signal for an 'AI info' label.",
  },
];

export default function MetadataGuidePage() {
  return (
    <main className="mx-auto max-w-2xl px-4 py-10">
      <h1 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
        Image Metadata Guide
      </h1>
      <p className="mt-3 text-sm text-gray-600 dark:text-gray-300">
        Every image file can carry several distinct kinds of hidden metadata,
        each written by different sources and read differently by different
        platforms. Here's a plain-language overview.
      </p>

      <div className="mt-8 flex flex-col gap-6">
        {GUIDES.map((g) => (
          <div key={g.href}>
            <h2 className="text-base font-semibold text-gray-900 dark:text-gray-100">
              {g.title}
            </h2>
            <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">
              {g.body}
            </p>
            <Link
              href={g.href}
              className="mt-1 inline-block text-sm text-blue-600 underline dark:text-blue-400"
            >
              Read the full {g.title} guide →
            </Link>
          </div>
        ))}

        <div>
          <h2 className="text-base font-semibold text-gray-900 dark:text-gray-100">
            IPTC
          </h2>
          <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">
            An older standard, still used by Adobe and other publishing
            tools, for captions, keywords, credit lines, and copyright
            information. Applies mainly to JPEG files.
          </p>
        </div>

        <div>
          <h2 className="text-base font-semibold text-gray-900 dark:text-gray-100">
            ICC Color Profile
          </h2>
          <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">
            Describes how colors in the image should be interpreted by a
            display or printer. Low privacy risk on its own, but some people
            prefer to strip it along with everything else.
          </p>
        </div>

        <div>
          <h2 className="text-base font-semibold text-gray-900 dark:text-gray-100">
            PNG Text Chunks
          </h2>
          <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">
            PNG files can embed free-form text data directly in the file
            structure (tEXt, zTXt, iTXt chunks). AI tools like Stable
            Diffusion commonly use this to store the prompt, model, and seed
            used to generate the image.
          </p>
        </div>
      </div>

      <div className="mt-10">
        <Link
          href="/checker"
          className="inline-block rounded-md bg-gray-900 px-5 py-2.5 text-sm font-semibold text-white dark:bg-white dark:text-gray-900"
        >
          Scan Your Own Image
        </Link>
      </div>
    </main>
  );
            }
