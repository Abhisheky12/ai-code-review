"use client";

import { useInfiniteQuery } from "@tanstack/react-query";
import { fetchRepositories } from "../actions";

// export const useRepositories = () => {
//   return useInfiniteQuery({
//     queryKey: ["repositories"],

//     queryFn: async ({ pageParam = 1 }) => {
//       const data = await fetchRepositories(
//         pageParam,
//         10
//       );

//       return data;
//     },

//     getNextPageParam: (
//       lastPage,
//       allPages
//     ) => {
//       if (lastPage.length < 10)
//         return undefined;

//       return allPages.length + 1;
//     },

//     initialPageParam: 1,
//   });
// };


import { useQuery } from "@tanstack/react-query";
export const useRepositories = () => {
  return useQuery({
    queryKey: ["repositories"], // Core query engine lookup state key

    queryFn: async () => {
      // Fetch entire active repository listings context without pagination params
      return await fetchRepositories();
    },

    retry: 1, // Limit failing background network retry thresholds
  });
};