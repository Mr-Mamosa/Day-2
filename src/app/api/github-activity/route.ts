
import { Octokit } from "@octokit/rest";
import { NextResponse } from "next/server";

export const revalidate = 3600; // Revalidate every hour

async function getGithubActivity() {
  const octokit = new Octokit({
    auth: process.env.GITHUB_TOKEN,
  });

  try {
    const repos = await octokit.repos.listForUser({
      username: "Mr-Mamosa",
      type: "owner",
      sort: "pushed",
      per_page: 5,
    });

    const activity = await Promise.all(
      repos.data.map(async (repo) => {
        if (repo.size === 0) {
          return null;
        }
        const commits = await octokit.repos.listCommits({
          owner: "Mr-Mamosa",
          repo: repo.name,
          per_page: 1,
        });
        return {
          repo: repo.name,
          commit: commits.data[0],
        };
      })
    );

    return activity.filter(Boolean);
  } catch (error) {
    console.error("Error fetching GitHub activity:", error);
    return null;
  }
}

export async function GET() {
  const activity = await getGithubActivity();

  if (!activity) {
    return NextResponse.json(
      { error: "Error fetching GitHub activity" },
      { status: 500 }
    );
  }

  return NextResponse.json(activity);
}
