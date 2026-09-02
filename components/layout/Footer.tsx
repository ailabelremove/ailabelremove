import Link from "next/link";

const COLUMNS = [
  {
    title: "Product",
    links: [
      { href: "/checker", label: "Metadata Checker" },
      { href: "/cleaner", label: "Metadata Cleaner" },
    ],
  },
  {
    title: "Learn",
    links: [
      { href: "/metadata-guide", label: "Metadata Guide" },
      { href: "/how-it-works", label: "How It Works" },
      { href: "/privacy", label: "Privacy Guide" },
    ],
  },
  {
    title: "Company",
    links: [
      { href: "/about", label: "About" },
      { href: "/privacy", label: "Privacy" },
      { href: "/faq", label: "FAQ" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="mt-16 border-t border-gray-200 dark:border-gray-800">
      <div className="mx-auto grid max-w-5xl grid-cols-2 gap-6 px-4 py-8 text-sm sm:grid-cols-3">
        {COLUMNS.map((col) => (
          <div key={col.title}>
            <p className="font-semibold text-gray-900 dark:text-gray-100">
              {col.title}
            </p>
            <ul className="mt-2 flex flex-col gap-1.5">
              {col.links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <p className="border-t border-gray-100 px-4 py-4 text-center text-xs text-gray-400 dark:border-gray-800 dark:text-gray-500">
        © {new Date().getFullYear()} AI Label Remove. Processing happens
        entirely in your browser.
      </p>
    </footer>
  );
}
