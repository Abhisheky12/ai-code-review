"use client";

import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/dashboard/app-sidebar";
import { authClient } from "@/lib/auth-client";
import { useRouter, usePathname } from "next/navigation";
import React, { useEffect } from "react";
import { Separator } from "@/components/ui/separator";
import { TooltipProvider } from "@/components/ui/tooltip";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: session, isPending } = authClient.useSession();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!isPending && !session) {
      router.push("/login");
    }
  }, [session, isPending, router]);

  if (isPending) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-zinc-950">
        <div className="flex flex-col items-center gap-4">
          <div className="h-10 w-10 animate-spin rounded-full border-2 border-primary border-t-transparent shadow-lg shadow-primary/20"></div>
          <p className="text-sm font-medium text-zinc-400 tracking-wide">Initializing workspace...</p>
        </div>
      </div>
    );
  }

  if (!session) {
    return null;
  }

  // Simple breadcrumb logic
  const paths = pathname.split("/").filter(Boolean);
  const breadcrumbs = paths.map((path, index) => {
    const url = `/${paths.slice(0, index + 1).join("/")}`;
    const isLast = index === paths.length - 1;
    const title = path.charAt(0).toUpperCase() + path.slice(1);

    return { title, url, isLast };
  });

  return (
    <TooltipProvider>
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset className="bg-zinc-950 flex flex-col">
          <header className="flex h-16 shrink-0 items-center gap-2 border-b border-border/40 px-6 bg-zinc-950/80 backdrop-blur-md sticky top-0 z-20">
            <SidebarTrigger className="-ml-2 h-9 w-9 hover:bg-zinc-900 transition-colors" />
            <Separator orientation="vertical" className="mx-2 h-4 bg-border/60" />
            
            <Breadcrumb>
              <BreadcrumbList>
                {breadcrumbs.map((bc, index) => (
                  <React.Fragment key={bc.url}>
                    <BreadcrumbItem>
                      {bc.isLast ? (
                        <BreadcrumbPage className="text-zinc-100 font-semibold">{bc.title}</BreadcrumbPage>
                      ) : (
                        <BreadcrumbLink href={bc.url} className="text-zinc-500 hover:text-zinc-300 transition-colors">
                          {bc.title}
                        </BreadcrumbLink>
                      )}
                    </BreadcrumbItem>
                    {!bc.isLast && <BreadcrumbSeparator className="text-zinc-700" />}
                  </React.Fragment>
                ))}
              </BreadcrumbList>
            </Breadcrumb>
          </header>

          <main className="flex-1 overflow-y-auto overflow-x-hidden relative">
            {/* Subtle background glow */}
            <div className="absolute top-0 right-0 -z-10 h-[500px] w-[500px] bg-primary/5 blur-[120px] rounded-full" />
            <div className="absolute bottom-0 left-0 -z-10 h-[300px] w-[300px] bg-indigo-500/5 blur-[100px] rounded-full" />
            
            <div className="container mx-auto p-4 md:p-8 max-w-7xl">
              {children}
            </div>
          </main>
        </SidebarInset>
      </SidebarProvider>
    </TooltipProvider>
  );
}
