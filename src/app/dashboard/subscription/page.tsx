export default function SubscriptionPage() {
  return (
    <div className="p-8">
      <h2 className="text-3xl font-bold tracking-tight">Subscription</h2>
      <p className="text-muted-foreground mt-1">Manage your billing and plan.</p>
      <div className="mt-8 grid gap-4 md:grid-cols-3">
        {["Free", "Pro", "Enterprise"].map((plan) => (
          <div key={plan} className="rounded-2xl border border-border p-6 bg-zinc-900/20">
            <h3 className="text-xl font-bold">{plan}</h3>
            <p className="text-muted-foreground text-sm mt-2">Plan details and features...</p>
            <button className="mt-4 w-full rounded-lg bg-zinc-800 py-2 text-sm font-medium hover:bg-zinc-700 transition-colors">
              {plan === "Pro" ? "Current Plan" : "Upgrade"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
