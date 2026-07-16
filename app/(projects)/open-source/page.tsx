import { getProjects } from '../../../lib/projects-db';
import ProjectList from '../../../components/ProjectList';

export const dynamic = 'force-dynamic';

export default async function OpenSourcePage() {
  // Temporary artificial delay to make the loading skeleton visible in dev
  await new Promise((res) => setTimeout(res, 2000));

  const projects = await getProjects('opensource');

  const normalized = projects.map((p) => ({
    title: p.title,
    description: p.description,
    technologies: p.technologies,
    link: p.link ?? undefined,
  }));

  return (
    <main className="max-w-4xl mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-6">Open-source Projects</h1>

      <ProjectList projects={normalized} />
    </main>
  );
}
