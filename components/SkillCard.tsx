interface SkillCardProps {
  skill: string;
}

export default function SkillCard({
  skill,
}: SkillCardProps) {
  return (
    <div className="bg-green-700 rounded p-3">
      {skill}
    </div>
  );
}