// app/products/[id]/error.tsx
'use client';

import React, { useEffect } from 'react';

interface Err{ 
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset,}: Readonly<Err>) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="max-w-2xl mx-auto p-8 text-center h-screen">
      <h2 className="text-xl font-semibold mb-4 text-red-600">
        Something went wrong 
      </h2>
      <p className="mb-6 text-gray-600">
        We couldn’t load the product details. Please try again.
      </p>
      <button
        onClick={() => reset()}
        className="px-4 py-2 bg-lime-600 text-white rounded hover:bg-lime-700"
      >
        Try Again
      </button>
    </div>
  );
}
