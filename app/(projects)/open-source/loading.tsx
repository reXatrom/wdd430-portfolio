export default function Loading() {
  return (
    <main className="max-w-4xl mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-6">Open-source Projects</h1>

      <section className="grid gap-4 md:grid-cols-2">
        {Array.from({ length: 4 }).map((_, i) => (
          <article
            key={i}
            className="p-4 border-l-4 border-blue-200 bg-gray-100 rounded animate-pulse"
          >
            <div className="h-6 bg-gray-200 mb-3 w-3/4 rounded" />
            <div className="h-4 bg-gray-200 mb-2 w-full rounded" />
            <div className="h-4 bg-gray-200 mb-2 w-5/6 rounded" />
            <div className="h-3 bg-gray-200 w-1/2 rounded" />
          </article>
        ))}
      </section>
    </main>
  );
}
