"use server";

import { fetchUserContribution, getGithubToken } from "@/module/github/lib/github";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { Octokit } from "octokit";
// import prisma from "@/lib/db";

export async function getDashboardStats() {
    try {
        const session = await auth.api.getSession({
            headers: await headers(),
        });

        if (!session?.user) {
            throw new Error("Unauthorized");
        }

        const token = await getGithubToken();

        const octokit = new Octokit({
            auth: token,
        });

        // Get authenticated github user
        const { data: user } =
            await octokit.rest.users.getAuthenticated();

        // Get github contribution calendar
        const calendar = await fetchUserContribution(
            token,
            user.login
        );

        const totalCommits =
            calendar?.totalContributions || 0;

        // Count all pull requests created by current user
        const { data: prs } =
            await octokit.rest.search.issuesAndPullRequests({
                q: `author:${user.login} type:pr`,
                per_page: 1,
            });

        const totalPRs = prs.total_count;

        // TODO: Replace with database count after repository table is created
        // const totalRepos = await prisma.repository.count({
        //   where: {
        //     userId: session.user.id,
        //   },
        // });

        const totalRepos = 30;

        // TODO: Replace with database count after review table is created
        // const totalReviews = await prisma.review.count({
        //   where: {
        //     userId: session.user.id,
        //   },
        // });

        const totalReviews = 44;

        return {
            totalCommits,
            totalPRs,
            totalReviews,
            totalRepos,
        };
    } catch (error) {
        console.error(
            "Error fetching dashboard stats:",
            error
        );

        return {
            totalCommits: 0,
            totalPRs: 0,
            totalReviews: 0,
            totalRepos: 0,
        };
    }
}



export async function getMonthlyActivity() {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session?.user) {
      throw new Error("Unauthorized");
    }

    const token = await getGithubToken();

    const octokit = new Octokit({
      auth: token,
    });

    const { data: user } =
      await octokit.rest.users.getAuthenticated();

    const calendar = await fetchUserContribution(
      token,
      user.login
    );

    const monthlyData: {
      [key: string]: {
        commits: number;
        prs: number;
        reviews: number;
      };
    } = {};

    const monthNames = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    // initialize last 6 months
    const now = new Date();

    for (let i = 5; i >= 0; i--) {
      const date = new Date(
        now.getFullYear(),
        now.getMonth() - i,
        1
      );

      const monthKey =
        monthNames[date.getMonth()];

      monthlyData[monthKey] = {
        commits: 0,
        prs: 0,
        reviews: 0,
      };
    }

    // commit/contribution count
    calendar.weeks.forEach((week: any) => {
      week.contributionDays.forEach((day: any) => {
        const date = new Date(day.date);

        const monthKey =
          monthNames[date.getMonth()];

        if (monthlyData[monthKey]) {
          monthlyData[monthKey].commits +=
            day.contributionCount;
        }
      });
    });

    // last 6 months PRs
    const sixMonthsAgo = new Date();

    sixMonthsAgo.setMonth(
      sixMonthsAgo.getMonth() - 6
    );

    const { data: prs } =
      await octokit.rest.search.issuesAndPullRequests({
        q: `author:${user.login} type:pr created:>${sixMonthsAgo
          .toISOString()
          .split("T")[0]}`,
        per_page: 100,
      });

    prs.items.forEach((pr: any) => {
      const date = new Date(pr.created_at);

      const monthKey =
        monthNames[date.getMonth()];

      if (monthlyData[monthKey]) {
        monthlyData[monthKey].prs += 1;
      }
    });

    // TODO: Replace with real review data from database
    const generateSampleReviews = () => {
      const sampleReviews = [];

      for (let i = 0; i < 45; i++) {
        const randomDaysAgo = Math.floor(
          Math.random() * 180
        );

        const reviewDate = new Date();

        reviewDate.setDate(
          reviewDate.getDate() - randomDaysAgo
        );

        sampleReviews.push({
          createdAt: reviewDate,
        });
      }

      return sampleReviews;
    };

    const reviews = generateSampleReviews();

    reviews.forEach((review) => {
      const monthKey =
        monthNames[
          review.createdAt.getMonth()
        ];

      if (monthlyData[monthKey]) {
        monthlyData[monthKey].reviews += 1;
      }
    });

    return Object.keys(monthlyData).map(
      (name) => ({
        name,
        ...monthlyData[name],
      })
    );
  } catch (error) {
    console.error(
      "Error fetching monthly activity:",
      error
    );

    return [];
  }
}