import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About — AI Label Remove",
  description:
    "AI Label Remove is a free, privacy-first tool for inspecting and cleaning image metadata, built to run entirely in your browser.",
  alternates: { canonical: "/about" },
};
export default function AboutPage() {
  return (
    <main className="p-8">
      <h1 className="text-2xl font-semibold">About</h1>
      <p className="mt-2 text-gray-600">Coming soon.</p>
    </main>
  );
}
