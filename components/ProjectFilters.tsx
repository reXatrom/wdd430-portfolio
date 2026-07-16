'use client';

import { useEffect, useState } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { PROJECT_TYPE_OPTIONS, TECHNOLOGY_OPTIONS } from '../types/search';

function normalizeOption(value: string | null, options: readonly string[]) {
  if (!value) return 'all';
  return options.includes(value) ? value : 'all';
}

export default function ProjectFilters() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const [projectType, setProjectType] = useState('all');
  const [technology, setTechnology] = useState('all');

  useEffect(() => {
    setProjectType(normalizeOption(searchParams.get('type'), PROJECT_TYPE_OPTIONS));
    setTechnology(normalizeOption(searchParams.get('technology'), TECHNOLOGY_OPTIONS));
  }, [searchParams.toString()]);

  function applyFilters(nextType: string, nextTechnology: string) {
    const params = new URLSearchParams(Array.from(searchParams.entries()));
    params.set('page', '1');

    if (nextType === 'all') params.delete('type');
    else params.set('type', nextType);

    if (nextTechnology === 'all') params.delete('technology');
    else params.set('technology', nextTechnology);

    router.replace(`${pathname}?${params.toString()}`);
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 mb-6">
      <label className="block">
        <span className="text-sm font-medium text-gray-700">Project type</span>
        <select
          value={projectType}
          onChange={(e) => {
            const nextType = e.target.value;
            setProjectType(nextType);
            applyFilters(nextType, technology);
          }}
          className="mt-2 block w-full rounded border p-2"
        >
          {PROJECT_TYPE_OPTIONS.map((option) => (
            <option key={option} value={option}>
              {option === 'all' ? 'All projects' : option.replace(/^(.)/, (m) => m.toUpperCase())}
            </option>
          ))}
        </select>
      </label>

      <label className="block">
        <span className="text-sm font-medium text-gray-700">Technology</span>
        <select
          value={technology}
          onChange={(e) => {
            const nextTechnology = e.target.value;
            setTechnology(nextTechnology);
            applyFilters(projectType, nextTechnology);
          }}
          className="mt-2 block w-full rounded border p-2"
        >
          {TECHNOLOGY_OPTIONS.map((option) => (
            <option key={option} value={option}>
              {option === 'all' ? 'All technologies' : option}
            </option>
          ))}
        </select>
      </label>
    </div>
  );
}
