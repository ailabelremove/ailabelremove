import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Articles — Photo Privacy & Digital Awareness | AI Label Remove",
  description:
    "Practical guides on photo privacy, safe sharing habits, and digital awareness in the age of AI-generated content.",
  alternates: { canonical: "/articles" },
};

const PUBLISHED_ARTICLES = [
  {
    slug: "photo-privacy-checklist",
    title: "5 Things to Check Before You Take a Photo",
    description:
      "A quick pre-photo checklist to avoid accidentally revealing more than you intended.",
  },
  {
    slug: "before-posting-social-media",
    title: "What to Check Before Posting a Photo on Social Media",
    description:
      "The habits worth building before you hit 'share' on Instagram, Facebook, or anywhere else.",
  },
  {
    slug: "turn-off-gps-location",
    title: "Why You Should Turn Off GPS Location Before Taking Photos",
    description:
      "How location metadata gets embedded in photos, and what it can reveal without you realizing.",
  },
  {
    slug: "sharenting-awareness",
    title: "What to Know Before Sharing Your Child's Photos Online",
    description:
      "A practical look at 'sharenting' and simple habits that reduce the risk for kids in photos.",
  },
];

export default function ArticlesPage() {
  return (
    <main className="mx-auto max-w-2xl px-4 py-10">
      <h1 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
        Articles
      </h1>
      <p className="mt-3 text-sm text-gray-600 dark:text-gray-300">
        Practical, non-technical guides on photo privacy and safe sharing
        habits — the everyday awareness side of what our tool handles
        technically.
      </p>

      <div className="mt-8 flex flex-col divide-y divide-gray-200 dark:divide-gray-800">
        {PUBLISHED_ARTICLES.map((a) => (
          <Link
            key={a.slug}
            href={`/articles/${a.slug}`}
            className="block py-4"
          >
            <h2 className="text-base font-semibold text-gray-900 hover:underline dark:text-gray-100">
              {a.title}
            </h2>
            <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">
              {a.description}
            </p>
          </Link>
        ))}
      </div>

      <p className="mt-8 text-xs text-gray-400 dark:text-gray-500">
        More articles are added regularly.
      </p>
    </main>
  );
      }
