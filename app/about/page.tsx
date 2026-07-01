import SkillCard from "@/components/SkillCard";

export default function About() {
  return (
    <main className="max-w-4xl mx-auto px-4 py-12">

      <h2 className="text-3xl font-bold mb-4">
        About Me
      </h2>

      <p className="text-lg text-gray-600">
        This about page shares more information about my background and work.
      </p>

      <h2 className="text-2xl mt-8 mb-4">
        Skills
      </h2>

      <div className="grid grid-cols-2 gap-4">

        <SkillCard skill="Next.js" />
        <SkillCard skill="React" />
        <SkillCard skill="TypeScript" />
        <SkillCard skill="Tailwind CSS" />

      </div>

    </main>
  );
}