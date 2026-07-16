'use client';

import { useEffect } from 'react';

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="max-w-4xl mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-6 text-red-600">Something went wrong</h1>
      <p className="mb-4 text-gray-700">Unable to load projects right now. Please try again.</p>
      <button onClick={() => reset()} className="px-4 py-2 rounded bg-blue-600 text-white">
        Try again
      </button>
    </main>
  );
}
