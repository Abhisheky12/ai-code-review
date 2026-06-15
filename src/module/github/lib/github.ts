import { Octokit } from "octokit";
import { auth } from "@/lib/auth";
import prisma from "@/lib/db";
import { headers } from "next/headers";

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
    contributionsCollection: {
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
    query($username: String!) {
      user(login: $username) {
        contributionsCollection {
          contributionCalendar {
            totalContributions
            weeks {
              contributionDays {
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
    const response: ContributionData = await octokit.graphql(
      query,
      {
        username,
      }
    );

    return response.user.contributionsCollection.contributionCalendar;
  } catch (error) {
    console.error(
      "Github contribution fetch error:",
      error
    );

    throw new Error(
      "Failed to fetch contribution data"
    );
  }
}
//code by me 
// export const getRepositories = async (
//   page: number = 1,
//   perPage: number = 10
// ) => {
//   const token = await getGithubToken();

//   const octokit = new Octokit({
//     auth: token,
//   });

//   const { data } =
//     await octokit.rest.repos.listForAuthenticatedUser({
//       sort: "updated",
//       direction: "desc",
//       visibility: "all",
//       per_page: perPage,
//       page: page,
//     });

//   return data;
// };



export const getRepositories = async () => {
  // Fetch valid github session key token
  const token = await getGithubToken();

  // Initialize unified octokit client engine
  const octokit = new Octokit({
    auth: token,
  });

  // Pull active user metadata securely
  const { data: user } = await octokit.rest.users.getAuthenticated();

  // Apply fallback 0 to fix optional undefined addition types mismatch
  const totalRepos = (user.public_repos || 0) + (user.total_private_repos || 0);

  // Fetch paginated active repository details matrix data rows
  const { data } = await octokit.rest.repos.listForAuthenticatedUser({
    sort: "updated",
    direction: "desc",
    visibility: "all",
    per_page: Math.min(totalRepos, 100), // Enforce upper limit ceiling bounds
    page: 1,
  });

  return data; // Return clear collection matrix rows
};

export const createWebhook = async (
  owner: string,
  repo: string
) => {
  const token = await getGithubToken();

  const octokit = new Octokit({
    auth: token,
  });

  const webhookUrl =
    `${process.env.NEXT_PUBLIC_APP_BASE_URL}/api/webhooks/github`;

  const { data: hooks } =
    await octokit.rest.repos.listWebhooks({
      owner,
      repo,
    });

  const existingHook =
    hooks.find(
      (hook) =>
        hook.config.url === webhookUrl
    );

  if (existingHook) {
    return existingHook;
  }

  const { data } =
    await octokit.rest.repos.createWebhook({
      owner,
      repo,
      config: {
        url: webhookUrl,
        content_type: "json",
      },
      events: ["pull_request"],
    });

  return data;
};


export const deleteWebhook =
  async (
    owner: string,
    repo: string
  ) => {
    const token =
      await getGithubToken();

    const octokit =
      new Octokit({
        auth: token,
      });

    const webhookUrl = `${process.env.NEXT_PUBLIC_APP_BASE_URL}/api/webhooks/github`;

    try {
      const {
        data: hooks,
      } =
        await octokit.rest.repos.listWebhooks(
          {
            owner,
            repo,
          }
        );

      const hookToDelete =
        hooks.find(
          (hook) =>
            hook.config.url ===
            webhookUrl
        );

      if (hookToDelete) {
        await octokit.rest.repos.deleteWebhook(
          {
            owner,
            repo,
            hook_id:
              hookToDelete.id,
          }
        );

        return true;
      }

      return false;
    } catch (error) {
      console.error(
        "Error deleting webhook:",
        error
      );

      return false;
    }
  };



// export async function getRepoFileContents(
//   token: string,
//   owner: string,
//   repo: string,
//   path: string = ""
// ): Promise<
//   {
//     path: string;
//     content: string;
//   }[]
// > {
//   console.log(`📂 Entering folder: ${path || "root"}`);

//   const octokit = new Octokit({
//     auth: token,
//   });

//   const { data } =
//     await octokit.rest.repos.getContent({
//       owner,
//       repo,
//       path,
//     });

//   if (!Array.isArray(data)) {
//     if (
//       data.type === "file" &&
//       data.content
//     ) {
//       console.log(`📄 Single file: ${data.path}`);

//       return [
//         {
//           path: data.path,
//           content: Buffer.from(
//             data.content,
//             "base64"
//           ).toString("utf-8"),
//         },
//       ];
//     }

//     return [];
//   }

//   let files: {
//     path: string;
//     content: string;
//   }[] = [];

//   for (const item of data) {
//     console.log(
//       `🔍 Processing: ${item.path} (${item.type})`
//     );

//     if (item.type === "file") {
//       try {
//         console.log(
//           `📥 Fetching file content: ${item.path}`
//         );

//         const { data: fileData } =
//           await octokit.rest.repos.getContent({
//             owner,
//             repo,
//             path: item.path,
//           });

//         if (
//           !Array.isArray(fileData) &&
//           fileData.type === "file" &&
//           fileData.content
//         ) {
//           if (
//             !item.path.match(
//               /\.(png|jpg|jpeg|gif|svg|ico|pdf|zip|tar|gz)$/i
//             )
//           ) {
//             files.push({
//               path: item.path,
//               content: Buffer.from(
//                 fileData.content,
//                 "base64"
//               ).toString("utf-8"),
//             });

//             console.log(
//               `✅ Added: ${item.path}`
//             );
//           }
//         }
//       } catch (error) {
//         console.error(
//           `❌ Failed file: ${item.path}`,
//           error
//         );
//       }
//     } else if (item.type === "dir") {
//       console.log(
//         `📁 Entering subfolder: ${item.path}`
//       );

//       const subFiles =
//         await getRepoFileContents(
//           token,
//           owner,
//           repo,
//           item.path
//         );

//       files = files.concat(
//         subFiles
//       );
//     }
//   }

//   console.log(
//     `🎉 Finished ${path || "root"} | Files collected: ${files.length}`
//   );

//   return files;
// }


export async function getRepoFileContents(
  token: string,
  owner: string,
  repo: string,
  path: string = ""
): Promise<
  {
    path: string;
    content: string;
  }[]
> {
  const octokit = new Octokit({
    auth: token,
  });

  const { data } =
    await octokit.rest.repos.getContent({
      owner,
      repo,
      path,
    });

  if (!Array.isArray(data)) {
    if (
      data.type === "file" &&
      data.content
    ) {
      return [
        {
          path: data.path,
          content: Buffer.from(
            data.content,
            "base64"
          ).toString("utf-8"),
        },
      ];
    }

    return [];
  }

  let files: {
    path: string;
    content: string;
  }[] = [];

  const ignoredDirs = [
    "node_modules",
    ".git",
    ".next",
    "dist",
    "build",
    "coverage",
    ".turbo",
    ".vercel",
  ];

  for (const item of data) {
    // Skip useless directories
    if (
      ignoredDirs.some((dir) =>
        item.path.includes(dir)
      )
    ) {
      console.log(`⏭️ Skipped directory: ${item.path}`);
      continue;
    }

    if (item.type === "file") {
      try {
        // Skip non-code files
        if (
          item.path.match(
            /\.(png|jpg|jpeg|gif|svg|ico|pdf|zip|tar|gz|mp4|mp3|woff|woff2|ttf|eot|map|lock)$/i
          )
        ) {
          continue;
        }

        const { data: fileData } =
          await octokit.rest.repos.getContent({
            owner,
            repo,
            path: item.path,
          });

        if (
          !Array.isArray(fileData) &&
          fileData.type === "file" &&
          fileData.content
        ) {
          files.push({
            path: item.path,
            content: Buffer.from(
              fileData.content,
              "base64"
            ).toString("utf-8"),
          });
        }
      } catch (error) {
        console.error(
          `❌ Failed file: ${item.path}`,
          error
        );
      }
    } else if (item.type === "dir") {
      const subFiles =
        await getRepoFileContents(
          token,
          owner,
          repo,
          item.path
        );

      files = files.concat(subFiles);
    }
  }

  return files;
}



export async function getPullRequestDiff(
  token: string,
  owner: string,
  repo: string,
  prNumber: number
) {
  const octokit = new Octokit({
    auth: token,
  });

  const { data: pr } =
    await octokit.rest.pulls.get({
      owner,
      repo,
      pull_number: prNumber,
    });       

  const { data: diff } =
    await octokit.rest.pulls.get({
      owner,
      repo,
      pull_number: prNumber,
      mediaType: {
        format: "diff",
      },
    });

  return {
    diff: diff as unknown as string,
    title: pr.title,
    description: pr.body || "",
  };
}

export async function postReviewComment(
  token: string,
  owner: string,
  repo: string,
  prNumber: number,
  review: string
) {
  const octokit = new Octokit({
    auth: token,
  });

  await octokit.rest.issues.createComment({
    owner,
    repo,
    issue_number: prNumber,
    body: `# 🤖 AI Code Review\n\n${review}\n\n---\nPowered by CodeOrbit`,
  });
}


