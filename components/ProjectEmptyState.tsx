interface ProjectEmptyStateProps {
  query: string;
}

export default function ProjectEmptyState({ query }: ProjectEmptyStateProps) {
  return (
    <div className="rounded border border-gray-200 bg-gray-50 p-6 text-gray-700">
      <h2 className="text-xl font-semibold mb-2">No projects found</h2>
      <p className="mb-4">
        We couldn't find any projects matching {query ? `"${query}"` : 'your current filters'}.
      </p>
      <ul className="list-disc pl-5 space-y-2">
        <li>Try a broader search term</li>
        <li>Check your spelling</li>
        <li>Remove filters or search only by keyword</li>
      </ul>
    </div>
  );
}
