/* src/components/InteractiveTerminal.tsx */
"use client";

import { useState, useRef, useEffect } from "react";
import { useWindowManager } from "@/context/WindowManagerContext";
import HomeContent from './content/Home';
import AboutContent from './content/About';
import WorkContent from './content/Work';

type Log = { id: number | string; type: "input" | "output" | "system" | "error"; text: string };

// Helper function to guarantee unique IDs even if called in the same millisecond
const generateId = () => Date.now() + Math.random();

export default function InteractiveTerminal() {
  const { openWindow } = useWindowManager();
  const [logs, setLogs] = useState<Log[]>([
    { id: generateId(), type: "system", text: "Welcome to Adnan OS v3.0" },
    { id: generateId(), type: "system", text: "Type 'help' for available commands." }
  ]);
  const [input, setInput] = useState("");
  const endOfTerminalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endOfTerminalRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [logs]);

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const currentCmd = input.trim();
    setInput("");
    setLogs((prev) => [...prev, { id: generateId(), type: "input", text: currentCmd }]);

    const args = currentCmd.split(" ");
    const cmd = args[0].toLowerCase();

    if (cmd === "help") {
      setLogs((prev) => [...prev, { id: generateId(), type: "output", text: "Commands: whoami, ls, clear, open <app>" }]);
      setLogs((prev) => [...prev, { id: generateId(), type: "output", text: "Available apps: home, about, work" }]);
    } else if (cmd === "clear") {
      setLogs([]);
    } else if (cmd === "whoami") {
      setLogs((prev) => [...prev, { id: generateId(), type: "output", text: "guest@adnan-os" }]);
    } else if (cmd === "ls") {
      setLogs((prev) => [...prev, { id: generateId(), type: "output", text: "home.exe  about.exe  work.exe" }]);
    } else if (cmd === "open") {
      const app = args[1]?.toLowerCase();
      if (app === "home") openWindow("home", "~/home", <HomeContent />);
      else if (app === "about") openWindow("about", "~/about", <AboutContent />);
      else if (app === "work") openWindow("work", "~/work", <WorkContent />);
      else setLogs((prev) => [...prev, { id: generateId(), type: "error", text: `App '${app || ''}' not found.` }]);
    } else {
      setLogs((prev) => [...prev, { id: generateId(), type: "error", text: `zsh: command not found: ${cmd}` }]);
    }
  };

  return (
    <div className="flex flex-col h-full font-mono text-xs sm:text-sm text-zinc-300">
      <div className="flex-1 overflow-y-auto custom-scrollbar space-y-2 mb-4 pr-2">
        {logs.map((log) => (
          <div key={log.id} className="break-words">
            {log.type === "input" && (
              <div>
                <span className="text-orange-500 mr-2">➜</span>
                <span className="text-orange-300 mr-2">~</span>
                <span className="text-zinc-100">{log.text}</span>
              </div>
            )}
            {log.type === "output" && <div className="text-zinc-300 pl-4">{log.text}</div>}
            {log.type === "system" && <div className="text-orange-500/80 italic pl-4">{log.text}</div>}
            {log.type === "error" && <div className="text-red-400 pl-4">{log.text}</div>}
          </div>
        ))}
        <div ref={endOfTerminalRef} />
      </div>

      <form onSubmit={handleCommand} className="flex items-center gap-2 border-t border-zinc-800/80 pt-4 mt-auto shrink-0">
        <span className="text-orange-500">➜</span>
        <span className="text-orange-300">~</span>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 bg-transparent border-none outline-none text-zinc-100 placeholder:text-zinc-700"
          autoFocus
          spellCheck={false}
          autoComplete="off"
        />
      </form>
    </div>
  );
}
