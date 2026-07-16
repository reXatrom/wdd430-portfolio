import { sql } from "@vercel/postgres";
import { ProjectType, SearchParams, SearchResult } from "../types/search";

export interface Project {
  id: number;
  title: string;
  description: string;
  type: "opensource" | "school";
  technologies: string[];
  link?: string | null;
}

export async function getProjects(type?: string | null): Promise<Project[]> {
  if (type) {
    const { rows } = await sql<Project>`
      SELECT * FROM projects
      WHERE type = ${type}
      ORDER BY id;
    `;

    return rows;
  }

  const { rows } = await sql<Project>`
    SELECT * FROM projects
    ORDER BY id;
  `;

  return rows;
}

export async function getProjectById(
  id: number
): Promise<Project | null> {
  const { rows } = await sql<Project>`
    SELECT * FROM projects
    WHERE id = ${id};
  `;

  return rows[0] ?? null;
}

export const ITEMS_PER_PAGE = 6;

export async function fetchFilteredProjects(
  query: string,
  currentPage = 1
): Promise<Project[]> {
  const q = (query || '').trim().slice(0, 100);
  const page = Math.max(1, Number(currentPage) || 1);
  const offset = (page - 1) * ITEMS_PER_PAGE;

  if (!q) {
    const { rows } = await sql<Project>`
      SELECT * FROM projects
      ORDER BY id
      LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset};
    `;

    return rows;
  }

  const like = `%${q}%`;
  const { rows } = await sql<Project>`
    SELECT * FROM projects
    WHERE title ILIKE ${like} OR description ILIKE ${like}
    ORDER BY id
    LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset};
  `;

  return rows;
}

export async function fetchProjectsPages(query: string): Promise<number> {
  const q = (query || '').trim().slice(0, 100);

  if (!q) {
    const { rows } = await sql<{ count: number }>`
      SELECT COUNT(*)::int AS count FROM projects;
    `;

    const count = rows[0]?.count ?? 0;
    return Math.ceil(count / ITEMS_PER_PAGE) || 1;
  }

  const like = `%${q}%`;
  const { rows } = await sql<{ count: number }>`
    SELECT COUNT(*)::int AS count FROM projects
    WHERE title ILIKE ${like} OR description ILIKE ${like};
  `;

  const count = rows[0]?.count ?? 0;
  return Math.ceil(count / ITEMS_PER_PAGE) || 1;
}