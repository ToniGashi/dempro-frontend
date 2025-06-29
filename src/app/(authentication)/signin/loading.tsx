// src/components/Loading.tsx
"use client";

export default function Loading() {
  return (
    <main className="flex h-screen items-center justify-center">
      <div
        className="w-12 h-12 border-4 border-primary-500 border-t-transparent rounded-full animate-spin"
        role="status"
        aria-label="Loading"
      />
    </main>
  );
}
