import Link from "next/link";
import ThemeSwitcher from "@/components/ui/ThemeSwitcher";

const NAV_LINKS = [
  { href: "/checker", label: "Checker" },
  { href: "/cleaner", label: "Cleaner" },
  { href: "/how-it-works", label: "How It Works" },
  { href: "/metadata-guide", label: "Guides" },
  { href: "/faq", label: "FAQ" },
];

export default function Header() {
  return (
    <header className="border-b border-gray-200 dark:border-gray-800">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3">
        <Link
          href="/"
          className="text-sm font-bold text-gray-900 dark:text-gray-100"
        >
          AI Label Remove
        </Link>
        <nav className="hidden gap-4 text-sm text-gray-600 dark:text-gray-300 sm:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="hover:text-gray-900 dark:hover:text-white"
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <ThemeSwitcher />
      </div>
      <nav className="flex gap-3 overflow-x-auto border-t border-gray-100 px-4 py-2 text-xs text-gray-600 dark:border-gray-800 dark:text-gray-300 sm:hidden">
        {NAV_LINKS.map((link) => (
          <Link key={link.href} href={link.href} className="whitespace-nowrap">
            {link.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
