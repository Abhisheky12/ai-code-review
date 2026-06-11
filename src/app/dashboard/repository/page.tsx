"use client";

import React from "react";
import { Search, Star, ExternalLink, Github, Filter, ArrowUpRight } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const repositories = [
  {
    name: "OrbitalCli",
    language: "TypeScript",
    stars: 1,
    url: "#",
    description: "A high-performance CLI tool for managing distributed cloud orbital nodes.",
    updatedAt: "2 hours ago"
  },
  {
    name: "udemy-expo",
    language: "TypeScript",
    stars: 0,
    url: "#",
    description: "Full-stack mobile application template using Expo and React Native.",
    updatedAt: "1 day ago"
  },
  {
    name: "backend-batch-3",
    language: "JavaScript",
    stars: 0,
    url: "#",
    description: "Reference implementation for the Node.js backend training series.",
    updatedAt: "3 days ago"
  },
];

export default function RepositoryPage() {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div className="space-y-1">
          <h2 className="text-3xl font-bold tracking-tight text-white">Repositories</h2>
          <p className="text-zinc-500 text-sm font-medium">
            Manage your connected codebases and automate PR audits.
          </p>
        </div>
        <Button className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-6 shadow-lg shadow-primary/20">
          Add Repository
        </Button>
      </div>

      <div className="flex flex-col sm:flex-row items-center gap-3">
        <div className="relative flex-1 w-full group">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500 group-focus-within:text-primary transition-colors" />
          <Input
            placeholder="Search your codebases..."
            className="pl-11 bg-zinc-900/40 border-border/40 focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all rounded-xl h-11 text-zinc-200"
          />
        </div>
        <Button variant="outline" className="h-11 px-4 border-border/40 bg-zinc-900/20 hover:bg-zinc-900/60 text-zinc-400 hover:text-white transition-all rounded-xl">
          <Filter className="h-4 w-4 mr-2" />
          Filter
        </Button>
      </div>

      <div className="grid gap-4">
        {repositories.map((repo) => (
          <Card key={repo.name} className="group relative overflow-hidden bg-zinc-900/20 border-border/40 hover:border-primary/30 hover:bg-zinc-900/40 transition-all duration-300 rounded-2xl shadow-sm">
            <CardHeader className="flex flex-row items-start justify-between p-6 pb-2">
              <div className="space-y-1">
                <div className="flex items-center gap-3">
                  <CardTitle className="text-xl font-bold text-white group-hover:text-primary transition-colors tracking-tight">
                    {repo.name}
                  </CardTitle>
                  <Badge variant="secondary" className="text-[10px] font-bold py-0 px-2 bg-zinc-800/80 border-zinc-700/50 text-zinc-400 uppercase tracking-widest">
                    {repo.language}
                  </Badge>
                </div>
                <p className="text-sm text-zinc-500 max-w-xl leading-relaxed">
                  {repo.description}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-9 w-9 text-zinc-500 hover:text-white hover:bg-zinc-800/80 rounded-lg transition-all"
                >
                  <ExternalLink className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="px-6 pb-6 flex items-center justify-between mt-4">
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-1.5 text-zinc-500">
                  <Star className={cn("h-4 w-4", repo.stars > 0 ? "fill-primary text-primary" : "fill-none")} />
                  <span className="text-xs font-semibold">{repo.stars}</span>
                </div>
                <div className="text-[11px] text-zinc-600 font-medium">
                  Updated {repo.updatedAt}
                </div>
              </div>

              <Button className="bg-zinc-100 hover:bg-white text-zinc-950 font-bold px-5 rounded-xl transition-all active:scale-95 h-9 shadow-sm group-hover:shadow-primary/10">
                Connect Repository
                <ArrowUpRight className="ml-2 h-3.5 w-3.5 opacity-50 group-hover:opacity-100 transition-opacity" />
              </Button>
            </CardContent>
            
            {/* Subtle card accent line */}
            <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-primary/0 group-hover:bg-primary/40 transition-all" />
          </Card>
        ))}
      </div>
    </div>
  );
}

function cn(...inputs: any[]) {
  return inputs.filter(Boolean).join(" ");
}
