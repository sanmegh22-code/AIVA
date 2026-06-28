interface BadgeProps {
  children: React.ReactNode;
  color?: "green" | "yellow" | "red" | "gray";
}

export default function Badge({
  children,
  color = "gray",
}: BadgeProps) {
  const colors = {
    green:
      "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",

    yellow:
      "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400",

    red:
      "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",

    gray:
      "bg-zinc-100 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300",
  };

  return (
    <span
      className={`px-3 py-1 rounded-full text-xs font-semibold ${colors[color]}`}
    >
      {children}
    </span>
  );
}