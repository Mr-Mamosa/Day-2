"use client";

import React, { useEffect, useState } from "react";
import { GitCommit, GitBranch, Calendar, User, ArrowUpRight } from "lucide-react";

type Activity = {
  repo: string;
  commit: {
    sha: string;
    html_url: string;
    commit: {
      message: string;
      author: {
        name: string;
        date: string;
      };
    };
  };
}[];

// Helper to turn absolute timestamps into clean, readable formats
const formatCommitDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

const LiveActivity = () => {
  const [activity, setActivity] = useState<Activity | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetching from your serverless API route to protect your GitHub token
    fetch("/api/github-activity")
      .then((res) => res.json())
      .then((data) => {
        setActivity(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-64 font-mono text-xs text-zinc-500 gap-2">
        <span className="w-4 h-4 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin" />
        <span>fetching telemetry matrix...</span>
      </div>
    );
  }

  if (!activity || activity.length === 0) {
    return (
      <div className="text-zinc-500 font-mono text-xs p-4 text-center">
        // No recent git streams detected.
      </div>
    );
  }

  return (
    <div className="w-full max-w-3xl mx-auto font-mono text-xs sm:text-sm">
      <div className="flex items-center justify-between mb-6 border-b border-zinc-850 pb-3">
        <div className="flex items-center gap-2 text-zinc-400">
          <GitBranch size={16} className="text-emerald-500" />
          <span>stdout / github-activity-daemon</span>
        </div>
        <span className="text-[10px] bg-zinc-900 border border-zinc-800 text-zinc-500 px-2 py-0.5 uppercase tracking-wider rounded">
          Live Sync
        </span>
      </div>

      {/* Timeline Wrapper */}
      <div className="relative pl-6 border-l border-zinc-800/80 space-y-6 ml-3">
        {activity.map(({ repo, commit }) => {
          const shortSha = commit.sha.slice(0, 7);
          const message = commit.commit.message.split("\n")[0]; // Grab just the title line

          return (
            <div key={commit.sha} className="relative group">

              {/* Timeline Node Point */}
              <div className="absolute -left-[31px] top-1.5 w-4 h-4 rounded-full bg-[#0a0a0a] border border-zinc-700 flex items-center justify-center group-hover:border-emerald-500 transition-colors duration-300">
                <div className="w-1.5 h-1.5 rounded-full bg-zinc-600 group-hover:bg-emerald-400 transition-colors duration-300" />
              </div>

              {/* Commit Entry Body */}
              <div className="p-4 rounded-xl border border-zinc-900 bg-zinc-950/40 hover:bg-zinc-950/80 hover:border-zinc-800 transition-all duration-300">

                {/* Top Row: Meta tags */}
                <div className="flex flex-wrap items-center gap-2 mb-2 text-zinc-500 text-[11px]">
                  <span className="flex items-center gap-1 bg-emerald-950/30 border border-emerald-900/50 text-emerald-400 font-bold px-2 py-0.5 rounded">
                    {repo}
                  </span>

                  <a
                    href={commit.html_url}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-1 bg-zinc-900 border border-zinc-800 hover:text-zinc-300 px-2 py-0.5 rounded transition-colors group/link"
                  >
                    <GitCommit size={12} className="text-zinc-400" />
                    <span>{shortSha}</span>
                    <ArrowUpRight size={10} className="opacity-0 group-hover/link:opacity-100 transition-opacity" />
                  </a>
                </div>

                {/* Middle Row: Message */}
                <h4 className="text-zinc-200 font-bold tracking-tight mb-3 text-sm sm:text-base line-clamp-2">
                  {message}
                </h4>

                {/* Bottom Row: Author & Date Details */}
                <div className="flex items-center justify-between border-t border-zinc-900/80 pt-2.5 mt-2 text-zinc-500 text-[11px]">
                  <div className="flex items-center gap-1">
                    <User size={12} className="text-zinc-600" />
                    <span>{commit.commit.author?.name}</span>
                  </div>

                  <div className="flex items-center gap-1">
                    <Calendar size={12} className="text-zinc-600" />
                    <span>{formatCommitDate(commit.commit.author?.date)}</span>
                  </div>
                </div>

              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default LiveActivity;
