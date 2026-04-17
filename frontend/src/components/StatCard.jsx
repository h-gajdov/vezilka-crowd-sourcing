export default function StatCard({
  statValue,
  title,
  Icon,
  bgClass = "bg-warning/10",
  textClass = "text-warning",
}) {
  return (
    <div
      className="p-5 border bg-card border-border rounded-xl card-elevated"
      style={{ opacity: 1 }}
    >
      <div
        className={`inline-flex p-2 mb-3 rounded-lg ${bgClass} ${textClass}`}
      >
        {Icon && <Icon className="w-4 h-4"></Icon>}
      </div>
      <div className="text-2xl font-bold">{statValue}</div>
      <div className="text-sm text-muted-foreground">{title}</div>
    </div>
  );
}
