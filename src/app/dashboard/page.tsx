"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Activity, Code2, AlertCircle, Zap, ArrowUpRight } from "lucide-react";

export default function DashboardPage() {
  const stats = [
    { label: "Total Repos", value: "12", sub: "+2 this month", icon: Code2, color: "text-blue-500" },
    { label: "Reviews Done", value: "48", sub: "8 pending", icon: Activity, color: "text-emerald-500" },
    { label: "Issues Found", value: "124", sub: "-15% from last week", icon: AlertCircle, color: "text-amber-500" },
    { label: "Performance", value: "98%", sub: "Top 5% of users", icon: Zap, color: "text-primary" },
  ];

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col gap-1">
        <h2 className="text-3xl font-bold tracking-tight text-white">Workspace Overview</h2>
        <p className="text-zinc-500 text-sm font-medium">
          Monitor your codebase health and automated review metrics in real-time.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, i) => (
          <Card key={i} className="bg-zinc-900/20 border-border/40 hover:border-primary/30 transition-all duration-300 rounded-2xl group overflow-hidden">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 p-6">
              <CardTitle className="text-sm font-bold text-zinc-500 uppercase tracking-widest">{stat.label}</CardTitle>
              <stat.icon className={`h-4 w-4 ${stat.color} opacity-70 group-hover:opacity-100 transition-opacity`} />
            </CardHeader>
            <CardContent className="p-6 pt-0">
              <div className="text-3xl font-bold text-white tracking-tighter">{stat.value}</div>
              <p className="text-xs text-zinc-600 font-medium mt-1">
                {stat.sub}
              </p>
            </CardContent>
            <div className="absolute right-0 bottom-0 p-2 opacity-0 group-hover:opacity-10 transition-opacity">
               <stat.icon className="h-12 w-12" />
            </div>
          </Card>
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="lg:col-span-4 bg-zinc-900/20 border-border/40 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-6">
             <h3 className="text-lg font-bold text-white tracking-tight">Recent Activity</h3>
             <button className="text-xs font-bold text-primary hover:underline flex items-center">
               View All <ArrowUpRight className="ml-1 h-3 w-3" />
             </button>
          </div>
          <div className="space-y-4">
            {[1, 2, 3].map((_, i) => (
              <div key={i} className="flex items-center gap-4 p-4 rounded-xl bg-zinc-900/40 border border-border/20">
                <div className="h-2 w-2 rounded-full bg-primary animate-pulse" />
                <div className="flex-1 space-y-1">
                   <p className="text-sm font-bold text-zinc-200">New Review Completed</p>
                   <p className="text-xs text-zinc-500">Repository: <span className="text-zinc-300">OrbitalCli</span> • 2 hours ago</p>
                </div>
                <Badge variant="outline" className="border-emerald-500/20 text-emerald-500 bg-emerald-500/5 px-2">Safe</Badge>
              </div>
            ))}
          </div>
        </Card>

        <Card className="lg:col-span-3 bg-zinc-900/20 border-border/40 rounded-2xl p-6">
           <h3 className="text-lg font-bold text-white tracking-tight mb-6">System Health</h3>
           <div className="space-y-6">
              {[
                { label: "AI Engine", value: 94 },
                { label: "Vector Index", value: 88 },
                { label: "OAuth Sync", value: 100 },
              ].map((item) => (
                <div key={item.label} className="space-y-2">
                  <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider">
                    <span className="text-zinc-500">{item.label}</span>
                    <span className="text-zinc-300">{item.value}%</span>
                  </div>
                  <div className="h-1.5 w-full bg-zinc-800 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-primary shadow-[0_0_8px_rgba(var(--primary),0.4)] transition-all duration-1000" 
                      style={{ width: `${item.value}%` }} 
                    />
                  </div>
                </div>
              ))}
           </div>
        </Card>
      </div>
    </div>
  );
}
