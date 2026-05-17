"use client";

import { Octokit } from "@octokit/rest";
import { useEffect, useState } from "react";

type Activity = {
  repo: string;
  commit: any;
}[];

async function getGithubActivity() {
  const octokit = new Octokit();

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

    return activity.filter(Boolean) as Activity;
  } catch (error) {
    console.error("Error fetching GitHub activity:", error);
    return null;
  }
}

const LiveActivity = () => {
  const [activity, setActivity] = useState<Activity | null>(null);

  useEffect(() => {
    getGithubActivity().then(setActivity);
  }, []);

  if (!activity) {
    return <div>Loading activity...</div>;
  }

  return (
    <div className="bg-[#0c0c0c] border border-zinc-800 rounded-lg p-4 h-64 overflow-y-auto font-mono text-sm">
      <h3 className="text-zinc-500">// Recent Activity</h3>
      {activity.map(({ repo, commit }) => (
        <div key={commit.sha} className="mt-2">
          <p>
            <span className="text-green-400">commit</span>{" "}
            <span className="text-yellow-400">{commit.sha.slice(0, 7)}</span>
          </p>
          <p>
            <span className="text-blue-400">repo:</span> {repo}
          </p>
          <p>
            <span className="text-blue-400">author:</span> {commit.commit.author?.name}
          </p>
          <p>
            <span className="text-blue-400">date:</span>{" "}
            {new Date(commit.commit.author?.date as string).toLocaleString()}
          </p>
          <p className="mt-1">
            {">"} {commit.commit.message}
          </p>
        </div>
      ))}
    </div>
  );
};

export default LiveActivity;
