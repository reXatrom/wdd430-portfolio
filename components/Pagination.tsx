'use client';

import { usePathname, useSearchParams } from 'next/navigation';

interface PaginationProps {
  totalPages: number;
  currentPage: number;
}

export default function Pagination({ totalPages, currentPage }: PaginationProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  function createPageURL(page: number) {
    const params = new URLSearchParams(Array.from(searchParams.entries()));
    if (page > 1) params.set('page', String(page));
    else params.delete('page');
    const qs = params.toString();
    return qs ? `${pathname}?${qs}` : pathname;
  }

  const prev = currentPage > 1 ? currentPage - 1 : null;
  const next = currentPage < totalPages ? currentPage + 1 : null;

  return (
    <nav className="mt-6 flex items-center justify-between">
      <div>
        {prev ? (
          <a href={createPageURL(prev)} className="px-3 py-1 border rounded mr-2">
            Previous
          </a>
        ) : (
          <button disabled className="px-3 py-1 border rounded mr-2 opacity-50">
            Previous
          </button>
        )}

        {next ? (
          <a href={createPageURL(next)} className="px-3 py-1 border rounded">
            Next
          </a>
        ) : (
          <button disabled className="px-3 py-1 border rounded opacity-50">Next</button>
        )}
      </div>

      <div className="text-sm text-gray-600">
        Page {currentPage} of {totalPages}
      </div>
    </nav>
  );
}
