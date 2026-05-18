"use client";
import React from "react";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

const Window = ({
  children,
  title,
  onClose,
  isActive,
  onClick,
}: {
  children: React.ReactNode;
  title: string;
  onClose: () => void;
  isActive: boolean;
  onClick: () => void;
}) => {
  return (
    <div
      onClick={onClick}
      className={cn(
        "bg-[#111111] border rounded-lg flex flex-col overflow-hidden h-full transition-colors duration-200",
        isActive ? "border-green-500" : "border-zinc-800"
      )}
    >
      <div className="bg-[#1c1c1c] px-4 py-2 border-b border-zinc-800 flex items-center justify-between">
        <span className="text-sm font-mono">{title}</span>
        <button onClick={onClose} className="text-zinc-500 hover:text-white">
          <X size={16} />
        </button>
      </div>
      <div className="p-4 overflow-y-auto">
        {children}
      </div>
    </div>
  );
};

export default Window;
