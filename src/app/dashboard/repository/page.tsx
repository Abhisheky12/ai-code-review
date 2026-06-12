// "use client";

// import React, { useState, useEffect, useRef } from "react";
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"; // Core structural elements [cite: 1610]
// import { Badge } from "@/components/ui/badge"; // Badge data elements [cite: 1610]
// import { Button } from "@/components/ui/button"; // Button framework elements [cite: 1611]
// import { Input } from "@/components/ui/input"; // Input text data element [cite: 1611]
// import { ExternalLink, Star, Search } from "lucide-react"; // System layout icon modules [cite: 1612]
// import { useRepositories } from "@/module/repository/hooks/use-repositories"; // Core client fetch hook [cite: 1612]
// import { RepositoryListSkeleton } from "@/module/repository/components/repository-skeleton"; // Static placeholder loader [cite: 1612]

// interface Repository {
//   id: number;
//   name: string;
//   full_name: string;
//   description: string | null;
//   html_url: string;
//   stargazers_count: number;
//   language: string | null;
//   topics: string[];
//   isConnected?: boolean;
// }

// const RepositoryPage = () => {
//   // Pull core state data structures out from single fetch query tool [cite: 1602]
//   const {
//     data,
//     isLoading,
//     isError,
//     /* fetchNextPage, 
//        hasNextPage, 
//        isFetchingNextPage */ // Temporarily commented out for single loop data fetch [cite: 1614]
//   } = useRepositories() as any; // Cast safely for current array tracking format override

//   const [localConnectingId, setLocalConnectingId] = useState<number | null>(null);
//   const [searchQuery, setSearchQuery] = useState("");
//   const observerTarget = useRef<HTMLDivElement>(null); // Kept node reference safe [cite: 1616]

//   // ==========================================
//   // INFINITE SCROLLING CODES COMMENTED OUT HERE
//   // ==========================================
//   /* useEffect(() => {
//     const target = observerTarget.current;
//     if (!target) return;

//     const observer = new IntersectionObserver(
//       async ([entry]) => {
//         if (
//           entry.isIntersecting &&
//           hasNextPage &&
//           !isFetchingNextPage
//         ) {
//           observer.unobserve(target);
//           await fetchNextPage();
//           observer.observe(target);
//         }
//       },
//       {
//         rootMargin: "200px",
//       }
//     );

//     observer.observe(target);
//     return () => {
//       observer.disconnect();
//     };
//   }, [fetchNextPage, hasNextPage, isFetchingNextPage]);
//   */
//   // ==========================================

//   // Process core layout loader framework skeleton
//   if (isLoading) {
//     return (
//       <div className="space-y-8">
//         <div>
//           <h1 className="text-3xl font-bold tracking-tight text-white">Repositories</h1>
//           <p className="text-zinc-500 text-sm font-medium">Manage and view all your GitHub repositories</p>
//         </div>
//         <RepositoryListSkeleton />
//       </div>
//     );
//   }

//   // Fallback indicator text logs on query drops
//   if (isError) {
//     return <div className="text-red-500 p-4">Failed to load repositories.</div>;
//   }

//   // Handled simple clean array unpacking to safely align single fetch queries [cite: 1602]
//   const allRepositories = Array.isArray(data) 
//     ? data 
//     : data?.pages?.flatMap((page: Repository[]) => page) || []; // Fallback layout matching format [cite: 1625]

//   // Filter criteria checking tracking input context
//   const filteredRepositories = allRepositories.filter(
//     (repo: Repository) =>
//       repo.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       repo.full_name.toLowerCase().includes(searchQuery.toLowerCase())
//   );

//   const handleConnect = async (repo: Repository) => {
//     setLocalConnectingId(repo.id); // Trigger loading spin state locally
//     try {
//       console.log("Connecting repository targets payload object logs:", repo); // Log context target [cite: 1627]
//       // Webhooks connection queries logic channel comes downstream here
//     } catch (err) {
//       console.error(err);
//     } finally {
//       setLocalConnectingId(null); // Return button back to passive states
//     }
//   };

//   return (
//     <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
//       {/* Title Descriptive Headers */}
//       <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
//         <div className="space-y-1">
//           <h1 className="text-3xl font-bold tracking-tight text-white">Repositories</h1>
//           <p className="text-zinc-500 text-sm font-medium">Manage and view all your GitHub repositories</p>
//         </div>
//       </div>

//       {/* Controlled Search Query input channel framework */}
//       <div className="relative flex-1 group max-w-xl">
//         <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500 group-focus-within:text-primary transition-colors" />
//         <Input
//           placeholder="Search repositories..."
//           className="pl-11 bg-zinc-900/40 border-border/40 focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all rounded-xl h-11 text-zinc-200"
//           value={searchQuery}
//           onChange={(e) => setSearchQuery(e.target.value)}
//         />
//       </div>

//       {/* Main mapping layout row loops cards container */}
//       <div className="grid gap-4">
//         {filteredRepositories.map((repo: Repository) => (
//           <Card
//             key={repo.id}
//             className="group relative overflow-hidden bg-zinc-900/20 border-border/40 hover:border-primary/30 hover:bg-zinc-900/40 transition-all duration-300 rounded-2xl shadow-sm"
//           >
//             <CardHeader className="flex flex-row items-start justify-between p-6 pb-2">
//               <div className="space-y-1 flex-1">
//                 <div className="flex flex-wrap items-center gap-2">
//                   <CardTitle className="text-xl font-bold text-white group-hover:text-primary transition-colors tracking-tight">
//                     {repo.name}
//                   </CardTitle>

//                   <Badge
//                     variant="secondary"
//                     className="text-[10px] font-bold py-0 px-2 bg-zinc-800/80 border-zinc-700/50 text-zinc-400 uppercase tracking-widest"
//                   >
//                     {repo.language || "Unknown"}
//                   </Badge>

//                   {repo.isConnected && (
//                     <Badge variant="outline" className="border-green-500/30 text-green-400">
//                       Connected
//                     </Badge>
//                   )}
//                 </div>

//                 <CardDescription className="text-zinc-500 max-w-3xl leading-relaxed">
//                   {repo.description || "No description available"}
//                 </CardDescription>
//               </div>

//               {/* Action Buttons Layer Context */}
//               <div className="flex items-center gap-2">
//                 <Button
//                   variant="ghost"
//                   size="icon"
//                   asChild
//                   className="h-9 w-9 text-zinc-500 hover:text-white hover:bg-zinc-800/80 rounded-lg"
//                 >
//                   <a href={repo.html_url} target="_blank" rel="noopener noreferrer">
//                     <ExternalLink className="h-4 w-4" />
//                   </a>
//                 </Button>

//                 <Button
//                   onClick={() => handleConnect(repo)}
//                   disabled={localConnectingId === repo.id || repo.isConnected}
//                   variant={repo.isConnected ? "outline" : "default"}
//                   className={`min-w-[170px] ${
//                     repo.isConnected
//                       ? "border-green-500/30 text-green-400"
//                       : "bg-zinc-100 hover:bg-white text-zinc-950 font-semibold"
//                   }`}
//                 >
//                   {localConnectingId === repo.id
//                     ? "Connecting..."
//                     : repo.isConnected
//                     ? "Connected"
//                     : "Connect Repository"}
//                 </Button>
//               </div>
//             </CardHeader>

//             {/* Bottom Section containing stars metrics */}
//             <CardContent className="px-6 pb-6 flex items-center justify-between mt-3">
//               <div className="flex items-center gap-6">
//                 <div className="flex items-center gap-1.5 text-zinc-500">
//                   <Star className={`h-4 w-4 ${repo.stargazers_count > 0 ? "fill-yellow-500 text-yellow-500" : ""}`} />
//                   <span className="text-xs font-semibold">{repo.stargazers_count}</span>
//                 </div>
//                 <div className="text-[11px] text-zinc-600 font-medium">{repo.full_name}</div>
//               </div>
//             </CardContent>

//             <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-primary/0 group-hover:bg-primary/40 transition-all" />
//           </Card>
//         ))}
//       </div>

//       {/* Hidden static anchor marker footer box element */}
//       <div ref={observerTarget} className="py-4">
//         {/* Infinite loaders elements are cleanly held away here for now */}
//         {filteredRepositories.length === 0 && (
//           <p className="text-center text-zinc-500 text-xs">No repositories found matching query string filters.</p>
//         )}
//       </div>

//     </div>
//   );
// };

// export default RepositoryPage;



"use client";

import React, { useState, useRef } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"; // View containers
import { Badge } from "@/components/ui/badge"; // Context tag status identifiers
import { Button } from "@/components/ui/button"; // Operational actions action component
import { Input } from "@/components/ui/input"; // Managed keyboard parameters input field
import { ExternalLink, Star, Search } from "lucide-react"; // Vector design icons layout links
import { useRepositories } from "@/module/repository/hooks/use-repositories"; // Simplified hook link
import { RepositoryListSkeleton } from "@/module/repository/components/repository-skeleton"; // Core skeleton indicator

interface Repository {
  id: number;
  name: string;
  full_name: string;
  description: string | null;
  html_url: string;
  stargazers_count: number;
  language: string | null;
  topics: string[];
  isConnected?: boolean;
}

const RepositoryPage = () => {
  // Pull data matrix directly with unified array fallback format
  const { data = [], isLoading, isError } = useRepositories() as any;

  const [localConnectingId, setLocalConnectingId] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const observerTarget = useRef<HTMLDivElement>(null); // Kept node reference safe for downstream scale

  // Display clean custom template loaders safely
  if (isLoading) {
    return (
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-white">Repositories</h1>
          <p className="text-zinc-500 text-sm font-medium">Manage and view all your GitHub repositories</p>
        </div>
        <RepositoryListSkeleton />
      </div>
    );
  }

  // Gracefully report error alerts if data handshake blocks
  if (isError) {
    return <div className="text-rose-500 font-semibold p-4">Failed to load repositories securely.</div>;
  }

  // Safe layout verification mapping clean arrays over the fetched returns
  const allRepositories = Array.isArray(data) ? data : [];

  // Filter lists based on real-time text input state values
  const filteredRepositories = allRepositories.filter(
    (repo: Repository) =>
      repo.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      repo.full_name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleConnect = async (repo: Repository) => {
    setLocalConnectingId(repo.id); // Toggle loading spinner indicators on row hooks
    try {
      console.log("Connecting target repo details entity object:", repo);
      // Integration pipeline for webhooks register calls hooks here later
    } catch (err) {
      console.error(err);
    } finally {
      setLocalConnectingId(null); // Clear loading status to release interactive elements
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {/* Dynamic Header Blocks */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold tracking-tight text-white">Repositories</h1>
          <p className="text-zinc-500 text-sm font-medium">Manage and view all your GitHub repositories</p>
        </div>
      </div>

      {/* Structured Input Box Layer for Search Strings */}
      <div className="relative flex-1 group max-w-xl">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500 group-focus-within:text-primary transition-colors" />
        <Input
          placeholder="Search repositories..."
          className="pl-11 bg-zinc-900/40 border-border/40 focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all rounded-xl h-11 text-zinc-200"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Main Grid Collection Generation Map Container */}
      <div className="grid gap-4">
        {filteredRepositories.map((repo: Repository) => (
          <Card
            key={repo.id}
            className="group relative overflow-hidden bg-zinc-900/20 border-border/40 hover:border-primary/30 hover:bg-zinc-900/40 transition-all duration-300 rounded-2xl shadow-sm"
          >
            <CardHeader className="flex flex-row items-start justify-between p-6 pb-2">
              <div className="space-y-1 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <CardTitle className="text-xl font-bold text-white group-hover:text-primary transition-colors tracking-tight">
                    {repo.name}
                  </CardTitle>

                  <Badge
                    variant="secondary"
                    className="text-[10px] font-bold py-0 px-2 bg-zinc-800/80 border-zinc-700/50 text-zinc-400 uppercase tracking-widest"
                  >
                    {repo.language || "Unknown"}
                  </Badge>

                  {repo.isConnected && (
                    <Badge variant="outline" className="border-green-500/30 text-green-400">
                      Connected
                    </Badge>
                  )}
                </div>

                <CardDescription className="text-zinc-500 max-w-3xl leading-relaxed">
                  {repo.description || "No description available"}
                </CardDescription>
              </div>

              {/* Action Buttons Interface Placement Blocks */}
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  asChild
                  className="h-9 w-9 text-zinc-500 hover:text-white hover:bg-zinc-800/80 rounded-lg"
                >
                  <a href={repo.html_url} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="h-4 w-4" />
                  </a>
                </Button>

                <Button
                  onClick={() => handleConnect(repo)}
                  disabled={localConnectingId === repo.id || repo.isConnected}
                  variant={repo.isConnected ? "outline" : "default"}
                  className={`min-w-[170px] ${
                    repo.isConnected
                      ? "border-green-500/30 text-green-400"
                      : "bg-zinc-100 hover:bg-white text-zinc-950 font-semibold"
                  }`}
                >
                  {localConnectingId === repo.id
                    ? "Connecting..."
                    : repo.isConnected
                    ? "Connected"
                    : "Connect Repository"}
                </Button>
              </div>
            </CardHeader>

            {/* Metrics Counter Card Contents Base Section */}
            <CardContent className="px-6 pb-6 flex items-center justify-between mt-3">
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-1.5 text-zinc-500">
                  <Star className={`h-4 w-4 ${repo.stargazers_count > 0 ? "fill-yellow-500 text-yellow-500" : ""}`} />
                  <span className="text-xs font-semibold">{repo.stargazers_count}</span>
                </div>
                <div className="text-[11px] text-zinc-600 font-medium">{repo.full_name}</div>
              </div>
            </CardContent>

            <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-primary/0 group-hover:bg-primary/40 transition-all" />
          </Card>
        ))}
      </div>

      {/* Safe Reserved Element Boundary Spot Anchor */}
      <div ref={observerTarget} className="py-2">
        {filteredRepositories.length === 0 && (
          <p className="text-center text-zinc-600 text-xs py-4">No repositories discovered matching input query configurations.</p>
        )}
      </div>

    </div>
  );
};

export default RepositoryPage;