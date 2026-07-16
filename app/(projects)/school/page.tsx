import React, { Suspense } from 'react';
import ProjectListLoading from '../../../components/ProjectListLoading';
import SchoolProjectList from './SchoolProjectList';

export default function SchoolPage() {
  return (
    <main className="max-w-4xl mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-6">School Projects</h1>

      <p className="mb-6 text-gray-700">A selection of projects completed for coursework.</p>

      <Suspense fallback={<ProjectListLoading />}>
        {/* `SchoolProjectList` is an async Server Component that fetches data */}
        {/* It will stream into this boundary once data is available */}
        {/* Remove the artificial delay inside `SchoolProjectList` after testing */}
        <SchoolProjectList />
      </Suspense>
    </main>
  );
}
