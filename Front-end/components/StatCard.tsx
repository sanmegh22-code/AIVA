type StatCardProps = {
  title: string;
  value: string;
  change: string;
};

export default function StatCard({
  title,
  value,
  change,
}: StatCardProps) {
  return (
    <div className="bg-white rounded-2xl p-6 border border-zinc-200 shadow-sm hover:shadow-md transition">
      <p className="text-zinc-500 text-sm">
        {title}
      </p>

      <h2 className="text-3xl font-bold mt-2 text-zinc-900">
        {value}
      </h2>

      <p className="text-sm text-green-600 mt-2">
        {change}
      </p>
    </div>
  );
}