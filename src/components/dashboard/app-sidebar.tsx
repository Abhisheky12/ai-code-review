"use client";

import * as React from "react";
import {
  LayoutDashboard,
  FolderCode,
  ClipboardList,
  CreditCard,
  Settings,
  LogOut,
  Github,
  Command,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  useSidebar,
} from "@/components/ui/sidebar";
import { authClient } from "@/lib/auth-client";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { cn } from "@/lib/utils";

const items = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Repository",
    url: "/dashboard/repository",
    icon: FolderCode,
  },
  {
    title: "Reviews",
    url: "/dashboard/reviews",
    icon: ClipboardList,
  },
  {
    title: "Subscription",
    url: "/dashboard/subscription",
    icon: CreditCard,
  },
  {
    title: "Settings",
    url: "/dashboard/settings",
    icon: Settings,
  },
];

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { data: session } = authClient.useSession();
  const router = useRouter();
  const pathname = usePathname();
  const { state } = useSidebar();

  const handleLogout = async () => {
    await authClient.signOut();
    router.push("/login");
  };

  const user = session?.user;

  return (
    <Sidebar collapsible="icon" className="border-r border-border/50 bg-zinc-950" {...props}>
      <SidebarHeader className="h-16 flex items-center justify-center border-b border-border/50">
        <div className={cn(
          "flex items-center gap-2 transition-all duration-300",
          state === "collapsed" ? "px-0" : "px-4 w-full"
        )}>
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600 text-white shadow-lg shadow-indigo-500/20">
            <Command className="h-5 w-5" />
          </div>
          {state !== "collapsed" && (
            <span className="font-bold text-lg tracking-tight text-white">CodeRabbit</span>
          )}
        </div>
      </SidebarHeader>

      <SidebarContent className="px-2 pt-4">
        <SidebarGroup>
          <div className={cn(
            "mb-4 rounded-xl bg-zinc-900/50 p-3 border border-zinc-800/50 transition-all",
            state === "collapsed" ? "opacity-0 invisible h-0 p-0 mb-0" : "opacity-100 visible"
          )}>
            <div className="flex items-center gap-3">
               <div className="flex h-10 w-10 items-center justify-center rounded-full bg-zinc-800 border border-zinc-700/50">
                <Github className="h-5 w-5 text-white" />
              </div>
              <div className="flex flex-col overflow-hidden">
                <span className="truncate text-sm font-semibold text-zinc-100">
                  {user?.name || "Guest User"}
                </span>
                <span className="truncate text-[11px] text-zinc-400 font-medium">
                  {user?.email ? `@${user.email.split("@")[0]}` : "connected"}
                </span>
              </div>
            </div>
          </div>

          <SidebarGroupLabel className="px-4 text-[10px] font-bold uppercase tracking-[0.1em] text-zinc-500 mb-2">
            Workspace
          </SidebarGroupLabel>
          <SidebarMenu>
            {items.map((item) => {
              const isActive = pathname === item.url;
              return (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    isActive={isActive}
                    tooltip={item.title}
                    className={cn(
                      "relative h-11 transition-all duration-200 rounded-lg mb-1 px-4 outline-none",
                      "active:scale-[0.97] select-none",
                      isActive 
                        ? "bg-indigo-500/10 text-white ring-1 ring-indigo-500/20 shadow-[0_0_20px_-5px_rgba(99,102,241,0.1)]" 
                        : "text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800/40 hover:shadow-sm"
                    )}
                  >
                    <Link href={item.url} className="flex items-center gap-3">
                      <item.icon className={cn(
                        "h-[18px] w-[18px] transition-all duration-300",
                        isActive ? "text-indigo-400 scale-110" : "text-zinc-500 group-hover:text-zinc-200 group-hover:scale-110"
                      )} />
                      <span className={cn(
                        "font-medium tracking-tight transition-colors duration-200",
                        isActive ? "text-white" : "group-hover:text-white"
                      )}>
                        {item.title}
                      </span>
                      {isActive && (
                        <div className="absolute left-0 w-1.5 h-6 bg-indigo-500 rounded-r-full shadow-[0_0_10px_rgba(99,102,241,0.5)] animate-in slide-in-from-left-1 duration-300" />
                      )}
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              );
            })}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-4 border-t border-border/50">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              onClick={handleLogout}
              className="h-11 rounded-lg text-zinc-300 hover:text-red-400 hover:bg-red-500/10 transition-all duration-200"
            >
              <LogOut className="h-4 w-4" />
              <span className="font-medium">Sign Out</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
