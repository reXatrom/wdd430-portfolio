'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';

export default function ProjectSearch() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const initial = searchParams.get('query') ?? '';
  const [value, setValue] = useState(initial);
  const timeoutRef = useRef<number | null>(null);

  useEffect(() => {
    setValue(searchParams.get('query') ?? '');
  }, [searchParams.toString()]);

  function applyQuery(term: string) {
    const params = new URLSearchParams(Array.from(searchParams.entries()));
    params.set('page', '1');
    if (term) params.set('query', term);
    else params.delete('query');
    router.replace(`${pathname}?${params.toString()}`);
  }

  function onChange(e: React.ChangeEvent<HTMLInputElement>) {
    const v = e.target.value;
    setValue(v);
    if (timeoutRef.current) window.clearTimeout(timeoutRef.current);
    // debounce 300ms
    timeoutRef.current = window.setTimeout(() => applyQuery(v), 300);
  }

  return (
    <div className="mb-4">
      <label className="sr-only">Search projects</label>
      <input
        type="search"
        placeholder="Search projects..."
        value={value}
        onChange={onChange}
        className="w-full p-2 border rounded"
      />
    </div>
  );
}
