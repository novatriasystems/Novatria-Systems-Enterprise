import React from "react";
import { cn } from "../../lib/utils";

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "cobalt" | "emerald" | "amber" | "crimson";
  pulse?: boolean;
}

export function Badge({
  className,
  variant = "default",
  pulse = false,
  children,
  ...props
}: BadgeProps) {
  const variantStyles = {
    default: "border-zinc-800 bg-zinc-900/60 text-zinc-400",
    cobalt: "border-blue-500/30 bg-blue-950/40 text-blue-400",
    emerald: "border-emerald-500/30 bg-emerald-950/40 text-emerald-400",
    amber: "border-amber-500/30 bg-amber-950/40 text-amber-400",
    crimson: "border-red-500/30 bg-red-950/40 text-red-400",
  };

  const dotStyles = {
    default: "bg-zinc-500",
    cobalt: "bg-blue-400",
    emerald: "bg-emerald-400",
    amber: "bg-amber-400",
    crimson: "bg-red-400",
  };

  return (
    <div
      className={cn(
        "inline-flex items-center gap-2 rounded-sm border px-2.5 py-0.5 font-mono text-[10px] font-medium uppercase tracking-[0.2em] shadow-sm backdrop-blur-sm",
        variantStyles[variant],
        className
      )}
      {...props}
    >
      {pulse && (
        <span
          className={cn("h-1.5 w-1.5 rounded-full pulse-dot", dotStyles[variant])}
        />
      )}
      {children}
    </div>
  );
}
