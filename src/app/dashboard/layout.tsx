import React from "react";
// import { Sidebar } from "@/module/dashboard/components/sidebar"; // Left nav component link

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode; // Active path sub-page element node template slot
}) {
  return (
    <div className="flex min-h-screen bg-background text-foreground antialiased selection:bg-primary/20">
      {/* Persistent global sidebar control channel node */}
      {/* <Sidebar /> */}
      
      {/* Main scrolling layout grid canvas view viewport */}
      <main className="flex-1 overflow-y-auto bg-background p-6 lg:p-10">
        <div className="max-w-7xl mx-auto w-full">
          {children} 
        </div>
      </main>
    </div>
  );
}