import { getProjects } from '../../../lib/projects-db';
import ProjectList from '../../../components/ProjectList';

export default async function SchoolProjectList() {
  // Temporary artificial delay to show component-level skeleton during testing
  await new Promise((res) => setTimeout(res, 2000));

  const projects = await getProjects('school');

  const normalized = projects.map((p) => ({
    title: p.title,
    description: p.description,
    technologies: p.technologies,
    link: p.link ?? undefined,
  }));

  return <ProjectList projects={normalized} />;
}
