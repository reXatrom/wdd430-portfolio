import ProjectList from '../../components/ProjectList';
import ProjectSearch from '../../components/ProjectSearch';
import ProjectFilters from '../../components/ProjectFilters';
import Pagination from '../../components/Pagination';
import ProjectEmptyState from '../../components/ProjectEmptyState';
import {
  fetchSearchResults,
} from '../../lib/projects-db';
import { SearchParams } from '../../types/search';

export const dynamic = 'force-dynamic';

export default async function ProjectsPage({
  searchParams,
}: {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
}) {
  const resolvedSearchParams = await searchParams;
  const params: SearchParams = {
    query: Array.isArray(resolvedSearchParams?.query)
      ? resolvedSearchParams?.query[0]
      : resolvedSearchParams?.query,
    type: Array.isArray(resolvedSearchParams?.type)
      ? resolvedSearchParams?.type[0]
      : resolvedSearchParams?.type,
    technology: Array.isArray(resolvedSearchParams?.technology)
      ? resolvedSearchParams?.technology[0]
      : resolvedSearchParams?.technology,
    page: Array.isArray(resolvedSearchParams?.page)
      ? Number(resolvedSearchParams?.page[0])
      : Number(resolvedSearchParams?.page ?? 1),
    limit: 6,
  };

  const result = await fetchSearchResults(params);

  const normalized = result.results.map((p) => ({
    title: p.title,
    description: p.description,
    technologies: p.technologies,
    link: p.link ?? undefined,
  }));

  return (
    <main className="max-w-4xl mx-auto py-10 px-4">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Projects</h1>
        <p className="mt-2 text-gray-600">
          Search and filter project cards by keyword, type, or technology.
        </p>
      </div>

      <ProjectSearch />
      <ProjectFilters />

      {result.total === 0 ? (
        <ProjectEmptyState query={params.query ?? ''} />
      ) : (
        <>
          <div className="mb-4 text-sm text-gray-600">
            Showing {result.results.length} of {result.total} project
            {result.total === 1 ? '' : 's'}.
          </div>

          <ProjectList projects={normalized} />
          <Pagination totalPages={result.totalPages} currentPage={result.page} />
        </>
      )}
    </main>
  );
}
