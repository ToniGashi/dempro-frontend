"use client";

export default function Loading() {
  return (
    <main className="flex h-screen items-center justify-center">
      <div
        role="status"
        aria-label="Loading"
        className="
          w-12 h-12
          border-4
          border-primary
          border-t-transparent
          rounded-full
          animate-spin
        "
      />
    </main>
  );
}
