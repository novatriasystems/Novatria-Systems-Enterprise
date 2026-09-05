import React from "react";
import { cn } from "../../lib/utils";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "danger";
  size?: "sm" | "md" | "lg";
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", children, disabled, ...props }, ref) => {
    const baseStyles =
      "relative inline-flex items-center justify-center font-mono font-medium uppercase tracking-[0.18em] transition-all duration-150 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-blue-500 disabled:pointer-events-none disabled:opacity-40 active:scale-[0.98]";

    const sizeStyles = {
      sm: "px-3 py-1.5 text-[11px] gap-1.5",
      md: "px-5 py-2.5 text-xs gap-2",
      lg: "px-7 py-3.5 text-xs md:text-sm gap-2.5",
    };

    const variantStyles = {
      primary:
        "bg-blue-600 text-zinc-50 hover:bg-blue-500 shadow-sm shadow-blue-900/30 border border-blue-500/40",
      secondary:
        "bg-zinc-900 text-zinc-200 border border-zinc-700/60 hover:bg-zinc-800 hover:text-white hover:border-zinc-600 shadow-sm",
      outline:
        "border border-zinc-800 text-zinc-300 hover:border-blue-500/60 hover:text-white hover:bg-blue-950/20",
      ghost:
        "text-zinc-400 hover:text-zinc-100 hover:bg-zinc-900/60",
      danger:
        "bg-red-950/40 text-red-400 border border-red-800/60 hover:bg-red-900/60 hover:text-white",
    };

    return (
      <button
        ref={ref}
        disabled={disabled}
        className={cn(baseStyles, sizeStyles[size], variantStyles[variant], className)}
        {...props}
      >
        {children}
      </button>
    );
  }
);
Button.displayName = "Button";
