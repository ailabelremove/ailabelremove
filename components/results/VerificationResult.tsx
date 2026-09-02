import type { VerificationResult } from "@/types/verification";

interface VerificationResultProps {
  verification: VerificationResult;
}

const STATUS_ICON: Record<string, string> = {
  removed: "✓",
  remains: "!",
  unaffected: "—",
};

const STATUS_STYLE: Record<string, string> = {
  removed: "text-green-700 dark:text-green-400",
  remains: "text-amber-700 dark:text-amber-400",
  unaffected: "text-gray-400 dark:text-gray-500",
};

export default function VerificationResultPanel({
  verification,
}: VerificationResultProps) {
  return (
    <div className="mt-3 rounded-lg border border-gray-200 p-3 dark:border-gray-800">
      <p className="text-xs font-medium text-gray-900 dark:text-gray-100">
        {verification.fullyClean
          ? "Verification completed — no metadata remains."
          : "Verification completed — some metadata remains."}
      </p>
      <ul className="mt-2 flex flex-col gap-1 text-xs">
        {verification.categories.map((cat) => (
          <li
            key={cat.category}
            className={`flex items-center justify-between ${STATUS_STYLE[cat.status]}`}
          >
            <span>
              {STATUS_ICON[cat.status]} {cat.category}
            </span>
            <span>
              {cat.status === "removed" && "Removed"}
              {cat.status === "remains" &&
                `${cat.afterCount} of ${cat.beforeCount} remain`}
              {cat.status === "unaffected" && "Not requested"}
            </span>
          </li>
        ))}
      </ul>
      {!verification.fullyClean && (
        <p className="mt-2 text-[11px] text-gray-500 dark:text-gray-400">
          Fields marked "remain" were not included in your cleaning
          selection, or could not be safely removed for this file type.
        </p>
      )}
    </div>
  );
}
