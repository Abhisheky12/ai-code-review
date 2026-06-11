export default function SettingsPage() {
  return (
    <div className="p-8">
      <h2 className="text-3xl font-bold tracking-tight">Settings</h2>
      <p className="text-muted-foreground mt-1">Manage your account preferences.</p>
      <div className="mt-8 space-y-6 max-w-2xl">
        <div className="space-y-2">
          <label className="text-sm font-medium">Display Name</label>
          <input className="w-full rounded-lg border border-border bg-zinc-900/50 p-2 text-sm" placeholder="Your Name" />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">Email Notification</label>
          <div className="flex items-center gap-2">
            <input type="checkbox" className="rounded border-border" />
            <span className="text-sm text-muted-foreground">Receive weekly digest</span>
          </div>
        </div>
        <button className="rounded-lg bg-primary px-4 py-2 text-sm font-bold text-primary-foreground">
          Save Changes
        </button>
      </div>
    </div>
  );
}
