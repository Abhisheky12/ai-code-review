export default function ReviewsPage() {
  return (
    <div className="p-8">
      <h2 className="text-3xl font-bold tracking-tight">Reviews</h2>
      <p className="text-muted-foreground mt-1">Manage and track your code reviews.</p>
      <div className="mt-8 flex h-[400px] items-center justify-center rounded-2xl border border-dashed border-border bg-zinc-900/10">
        <p className="text-muted-foreground">No active reviews found.</p>
      </div>
    </div>
  );
}
