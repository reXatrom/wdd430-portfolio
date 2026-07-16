export type ProjectType = 'all' | 'opensource' | 'school';

export interface SearchParams {
  query?: string;
  type?: ProjectType;
  technology?: string;
  page?: number;
  limit?: number;
}

export interface SearchResult<T> {
  results: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

export const PROJECT_TYPE_OPTIONS: ProjectType[] = ['all', 'opensource', 'school'];
export const TECHNOLOGY_OPTIONS = ['all', 'React', 'Next.js', 'TypeScript', 'Tailwind', 'Node.js'] as const;
export const DEFAULT_PROJECTS_LIMIT = 6;
export const MAX_PROJECTS_LIMIT = 100;
