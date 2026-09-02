"use client";

import { useRef, useState } from "react";

interface UploadZoneProps {
  onFilesSelected: (files: File[]) => void;
}

export default function UploadZone({ onFilesSelected }: UploadZoneProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  function handleFiles(fileList: FileList | null) {
    if (!fileList || fileList.length === 0) return;
    onFilesSelected(Array.from(fileList));
  }

  return (
    <div
      role="button"
      tabIndex={0}
      aria-label="Upload images. JPG, PNG, or WebP, up to 25 megabytes each."
      onClick={() => inputRef.current?.click()}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          inputRef.current?.click();
        }
      }}
      onDragOver={(e) => {
        e.preventDefault();
        setIsDragging(true);
      }}
      onDragLeave={() => setIsDragging(false)}
      onDrop={(e) => {
        e.preventDefault();
        setIsDragging(false);
        handleFiles(e.dataTransfer.files);
      }}
      className={`flex flex-col items-center justify-center rounded-xl border-2 border-dashed p-10 text-center cursor-pointer transition-colors ${
        isDragging
          ? "border-blue-500 bg-blue-50 dark:border-blue-400 dark:bg-blue-950/40"
          : "border-gray-300 hover:border-gray-400 dark:border-gray-700 dark:hover:border-gray-600"
      }`}
    >
      <p className="text-lg font-medium text-gray-800 dark:text-gray-100">
        Drop your images here
      </p>
      <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
        JPG, PNG, or WebP — up to 25 MB each
      </p>
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          inputRef.current?.click();
        }}
        className="mt-4 rounded-lg bg-gray-900 px-5 py-2.5 text-sm font-medium text-white hover:bg-gray-800 dark:bg-white dark:text-gray-900 dark:hover:bg-gray-200"
      >
        Choose Images
      </button>
      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp"
        multiple
        className="hidden"
        aria-hidden="true"
        tabIndex={-1}
        onChange={(e) => handleFiles(e.target.files)}
      />
    </div>
  );
}
