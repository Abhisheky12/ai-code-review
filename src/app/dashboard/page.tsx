import React from "react";
import { FolderGit, GitCommit, FileCode2, MessageSquarePlus } from "lucide-react"; // Section metadata icons

export default function DashboardPage() {
  // Metric matrix configuration mapping your video template numbers
  const metricCards = [
    { title: "Total Repositories", value: "30", desc: "Connected profiles", icon: FolderGit },
    { title: "Total Commits", value: "2,180", desc: "In the last year", icon: GitCommit },
    { title: "Pull Requests", value: "341", desc: "All time records", icon: FileCode2 },
    { title: "AI Reviews", value: "44", desc: "Generated analysis", icon: MessageSquarePlus },
  ];

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Main workspace text identity block titles */}
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight text-foreground">Dashboard</h1>
        <p className="text-sm text-muted-foreground mt-1">Overview of your coding activity and AI reviews</p>
      </div>

      {/* Grid wrapper auto-scaling statistics elements across screens */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {metricCards.map((card, idx) => {
          const Icon = card.icon;
          return (
            <div key={idx} className="rounded-xl border border-border/80 bg-card/30 p-5 backdrop-blur-md">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-muted-foreground tracking-wide uppercase">{card.title}</span>
                <Icon className="h-4 w-4 text-muted-foreground/60" />
              </div>
              <div className="mt-3">
                <h3 className="text-2xl font-bold text-foreground tracking-tight">{card.value}</h3>
                <p className="text-[11px] text-muted-foreground mt-0.5">{card.desc}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Persistent placeholder box container for downstream heatmap integration */}
      <div className="rounded-xl border border-border bg-card/20 p-6 backdrop-blur-sm min-h-[240px] flex items-center justify-center">
        <p className="text-xs text-muted-foreground">Contribution frequency tracking canvas module area placeholder.</p>
      </div>
    </div>
  );
}