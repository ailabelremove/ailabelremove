import type { AnalysisResult } from "@/types/metadata";
import MetadataCategory from "./MetadataCategory";

interface MetadataPanelProps {
  result?: AnalysisResult;
  errorMessage?: string;
}

export default function MetadataPanel({ result, errorMessage }: MetadataPanelProps) {
  if (errorMessage) {
    return (
      <p className="mt-2 text-xs text-red-600 dark:text-red-400">
        Could not analyze metadata: {errorMessage}
      </p>
    );
  }

  if (!result) return null;

  if (result.fields.length === 0) {
    return (
      <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
        No metadata fields were detected in this image.
      </p>
    );
  }

  const grouped = new Map<string, AnalysisResult["fields"]>();
  for (const field of result.fields) {
    const list = grouped.get(field.category) || [];
    list.push(field);
    grouped.set(field.category, list);
  }

  return (
    <div className="mt-3 rounded-lg border border-gray-200 dark:border-gray-800">
      {Array.from(grouped.entries()).map(([category, fields]) => (
        <MetadataCategory key={category} category={category} fields={fields} />
      ))}
    </div>
  );
}
