"use client";

import React from "react";
import { ActivityCalendar } from "react-activity-calendar";
import { useTheme } from "next-themes";
import { useQuery } from "@tanstack/react-query";

import { getContributionStats } from "../actions";

const ContributionGraph = () => {
  const { theme } = useTheme();

  const { data, isLoading } = useQuery({
    queryKey: ["contribution-stats"],
    queryFn: async () => await getContributionStats(),
    staleTime: 1000 * 60 * 5,
  });

  if (isLoading) {
    return (
      <div className="w-full flex flex-col items-center justify-center p-8 min-h-[200px]">
        <div className="animate-pulse text-muted-foreground flex flex-col items-center gap-2">
          <div className="h-4 w-32 bg-muted rounded"></div>
          <div className="h-32 w-full max-w-3xl bg-muted rounded"></div>
        </div>
      </div>
    );
  }

  if (!data || !data.contributions || data.contributions.length === 0) {
    return (
      <div className="w-full flex flex-col items-center justify-center p-8 min-h-[200px] border border-dashed rounded-lg">
        <div className="text-muted-foreground">
          No contribution data available
        </div>
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col items-center gap-8 py-2">
      <div className="text-sm font-medium text-center">
        <span className="text-foreground font-bold">
          {data.totalContributions.toLocaleString()}
        </span>{" "}
        contributions in the last year
      </div>

      <div className="w-full overflow-x-auto scrollbar-hide">
        <div className="flex justify-center min-w-max px-4">
          <ActivityCalendar
            data={data.contributions}
            colorScheme={theme === "dark" ? "dark" : "light"}
            theme={{
                dark: ["#161b22", "#0e4429", "#006d32", "#26a641", "#39d353"],
                light: ["#ebedf0", "#9be9a8", "#40c463", "#30a14e", "#216e39"],
            }}
            labels={{
              totalCount: "{{count}} activities in {{year}}",
              months: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
              weekdays: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
            }}
            showWeekdayLabels
            fontSize={12}
            blockSize={13}
            blockRadius={2}
            blockMargin={4}
          />
        </div>
      </div>
    </div>
  );
};

export default ContributionGraph;
