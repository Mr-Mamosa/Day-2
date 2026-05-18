"use client";

import { useEffect, useState } from "react";

type Activity = {
  repo: string;
  commit: any;
}[];

const LiveActivity = () => {
  const [activity, setActivity] = useState<Activity | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/github-activity")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch activity");
        }
        return res.json();
      })
      .then(setActivity)
      .catch((err) => {
        console.error(err);
        setError(err.message);
      });
  }, []);

  if (error) {
    return <div>{error}</div>;
  }

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
