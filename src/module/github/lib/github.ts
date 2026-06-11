import { Octokit } from "octokit";
import { auth } from "@/lib/auth";
import prisma from "@/lib/db";
import { headers } from "next/headers";






export async function getContributionStats() {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session?.user) {
      throw new Error("Unauthorized");
    }

    const token = await getGithubToken();

    // Get the actual GitHub username
    const octokit = new Octokit({
      auth: token,
    });

    const { data: user } =
      await octokit.rest.users.getAuthenticated();

    const username = user.login;

    const calendar = await fetchUserContribution(
      token,
      username
    );

    if (!calendar) {
      return null;
    }

    const contributions = calendar.weeks.flatMap(
      (week: any) =>
        week.contributionDays.map((day: any) => ({
          date: day.date,
          count: day.contributionCount,
          level: Math.min(
            4,
            Math.floor(day.contributionCount / 3)
          ),
        }))
    );

    return {
  contributions,
  totalContributions: calendar.totalContributions 
};
   
  } catch (error) {
    console.error("Error fetching contributions:", error);
    return null;
  }
}




/**
 * Getting the github access token
 */
export const getGithubToken = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    throw new Error("Unauthorized");
  }

  const account = await prisma.account.findFirst({
    where: {
      userId: session.user.id,
      providerId: "github",
    },
  });

  if (!account?.accessToken) {
    throw new Error("No github access token found");
  }

  return account.accessToken;
};



interface ContributionData {
  user: {
    contributionCollection: {
      contributionCalendar: {
        totalContributions: number;
        weeks: {
          contributionDays: {
            contributionCount: number;
            date: string;
            color: string;
          }[];
        }[];
      };
    };
  };       
}

/**
 * Fetch github contribution graph data
 */
export async function fetchUserContribution(   
  token: string,
  username: string
) {      
  const octokit = new Octokit({
    auth: token,
  });

  const query = `
    query($username:String!){
      user(login:$username){
        contributionCollection{
          contributionCalendar{
            totalContributions
            weeks{
              contributionDays{
                contributionCount
                date
                color
              }
            }
          }
        }
      }
    }
  `;

  try {
    const response: ContributionData = await octokit.graphql(query, {
      username,
    });

    return response.user.contributionCollection.contributionCalendar;
  } catch (error) {
    console.error("Github contribution fetch error:", error);
    throw new Error("Failed to fetch contribution data");
  }
}



