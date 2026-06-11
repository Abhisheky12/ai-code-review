// "use client";

// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";

// import {
//   GitBranch,
//   GitCommit,
//   GitPullRequest,
//   MessageSquare,
// } from "lucide-react";

// import { useQuery } from "@tanstack/react-query";

// import {
//   getDashboardStats,
// } from "@/module/dashboard/actions";

// import ContributionGraph from "@/module/dashboard/components/contribution-graph";

// const MainPage = () => {
//   const { data: stats, isLoading } = useQuery({
//     queryKey: ["dashboard-stats"],
//     queryFn: async () => await getDashboardStats(),
//     refetchOnWindowFocus: false,
//   });

//   const statCards = [
//     {
//       title: "Total Repositories",
//       value: stats?.totalRepos || 0,
//       description: "Connected repositories",
//       icon: GitBranch,
//     },
//     {
//       title: "Total Commits",
//       value: stats?.totalCommits || 0,
//       description: "In the last year",
//       icon: GitCommit,
//     },
//     {
//       title: "Pull Requests",
//       value: stats?.totalPRs || 0,
//       description: "All time",
//       icon: GitPullRequest,
//     },
//     {
//       title: "AI Reviews",
//       value: stats?.totalReviews || 0,
//       description: "Generated reviews",
//       icon: MessageSquare,
//     },
//   ];

//   return (
//     <div className="space-y-8 animate-in fade-in duration-500">
//       <div className="flex flex-col gap-1">
//         <h1 className="text-3xl font-bold tracking-tight text-zinc-100">
//           Dashboard
//         </h1>
//         <p className="text-zinc-400">
//           Overview of your coding activity and AI reviews
//         </p>
//       </div>

//       <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
//         {statCards.map((card, index) => (
//           <Card key={index} className="bg-zinc-900/50 border-zinc-800/50 backdrop-blur-sm hover:bg-zinc-900/80 transition-colors">
//             <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//               <CardTitle className="text-sm font-medium text-zinc-400">
//                 {card.title}
//               </CardTitle>
//               <card.icon className="h-4 w-4 text-zinc-500" />
//             </CardHeader>
//             <CardContent>
//               <div className="text-2xl font-bold text-zinc-100">
//                 {isLoading ? (
//                   <div className="h-8 w-16 animate-pulse bg-zinc-800 rounded mt-1" />
//                 ) : (
//                   card.value.toLocaleString()
//                 )}
//               </div>
//               <p className="text-xs text-zinc-500 mt-1">
//                 {card.description}
//               </p>
//             </CardContent>
//           </Card>
//         ))}
//       </div>

//       <Card className="bg-zinc-900/50 border-zinc-800/50 backdrop-blur-sm">
//         <CardHeader>
//           <CardTitle className="text-xl text-zinc-100">
//             Contribution Activity
//           </CardTitle>
//           <CardDescription className="text-zinc-400">
//             Visualizing your coding frequency over the last year
//           </CardDescription>
//         </CardHeader>
//         <CardContent>
//           <ContributionGraph />
//         </CardContent>
//       </Card>
//     </div>
//   );
// };

// export default MainPage;





"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  GitBranch,
  GitCommit,
  GitPullRequest,
  MessageSquare,
} from "lucide-react";

import { useQuery } from "@tanstack/react-query";

import {
  getDashboardStats,
  getMonthlyActivity,
} from "@/module/dashboard/actions";

import ContributionGraph from "@/module/dashboard/components/contribution-graph";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from "recharts";

const MainPage = () => {
  const { data: stats, isLoading } = useQuery({
    queryKey: ["dashboard-stats"],
    queryFn: async () => await getDashboardStats(),
    refetchOnWindowFocus: false,
  });

  const {
    data: monthlyActivity,
    isLoading: isLoadingActivity,
  } = useQuery({
    queryKey: ["monthly-activity"],
    queryFn: async () => await getMonthlyActivity(),
    refetchOnWindowFocus: false,
  });

  const statCards = [
    {
      title: "Total Repositories",
      value: stats?.totalRepos || 0,
      description: "Connected repositories",
      icon: GitBranch,
    },
    {
      title: "Total Commits",
      value: stats?.totalCommits || 0,
      description: "In the last year",
      icon: GitCommit,
    },
    {
      title: "Pull Requests",
      value: stats?.totalPRs || 0,
      description: "All time",
      icon: GitPullRequest,
    },
    {
      title: "AI Reviews",
      value: stats?.totalReviews || 0,
      description: "Generated reviews",
      icon: MessageSquare,
    },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col gap-1">
        <h1 className="text-3xl font-bold tracking-tight text-zinc-100">
          Dashboard
        </h1>

        <p className="text-zinc-400">
          Overview of your coding activity and AI reviews
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {statCards.map((card, index) => (
          <Card
            key={index}
            className="bg-zinc-900/50 border-zinc-800/50 backdrop-blur-sm hover:bg-zinc-900/80 transition-colors"
          >
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-zinc-400">
                {card.title}
              </CardTitle>

              <card.icon className="h-4 w-4 text-zinc-500" />
            </CardHeader>

            <CardContent>
              <div className="text-2xl font-bold text-zinc-100">
                {isLoading ? (
                  <div className="h-8 w-16 animate-pulse bg-zinc-800 rounded mt-1" />
                ) : (
                  card.value.toLocaleString()
                )}
              </div>

              <p className="text-xs text-zinc-500 mt-1">
                {card.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="bg-zinc-900/50 border-zinc-800/50 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-xl text-zinc-100">
            Contribution Activity
          </CardTitle>

          <CardDescription className="text-zinc-400">
            Visualizing your coding frequency over the last year
          </CardDescription>
        </CardHeader>

        <CardContent>
          <ContributionGraph />
        </CardContent>
      </Card>

      <Card className="bg-zinc-900/50 border-zinc-800/50 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-xl text-zinc-100">
            Monthly Activity
          </CardTitle>

          <CardDescription className="text-zinc-400">
            Commits, pull requests and AI reviews in the last 6 months
          </CardDescription>
        </CardHeader>

        <CardContent>
          {isLoadingActivity ? (
            <div className="h-80 w-full animate-pulse rounded-lg bg-zinc-800" />
          ) : (
            <div className="h-[350px] w-full">
              <ResponsiveContainer
                width="100%"
                height="100%"
              >
                <BarChart data={monthlyActivity}>
                  <XAxis
                    dataKey="name"
                    stroke="#a1a1aa"
                  />

                  <YAxis stroke="#a1a1aa" />

                  <Tooltip />

                  <Legend />

                  <Bar
                    dataKey="commits"
                    name="Commits"
                    radius={[4, 4, 0, 0]}
                  />

                  <Bar
                    dataKey="prs"
                    name="Pull Requests"
                    radius={[4, 4, 0, 0]}
                  />

                  <Bar
                    dataKey="reviews"
                    name="AI Reviews"
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default MainPage;