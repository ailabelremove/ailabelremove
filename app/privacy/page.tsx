import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy — AI Label Remove",
  description:
    "How AI Label Remove handles your images: 100% local browser processing, no uploads, no server storage, no tracking of your files.",
  alternates: { canonical: "/privacy" },
};
export default function PrivacyPage() {
  return (
    <main className="p-8">
      <h1 className="text-2xl font-semibold">Privacy</h1>
      <p className="mt-2 text-gray-600">Coming soon.</p>
    </main>
  );
}
