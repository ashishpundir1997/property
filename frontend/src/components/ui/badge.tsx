"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "primary" | "secondary" | "success" | "warning" | "error" | "info" | "neutral";
  size?: "sm" | "md";
}

export const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  ({
    className,
    variant = "primary",
    size = "sm",
    ...props
  }, ref) => {
    const variants = {
      primary: "badge-primary",
      secondary: "badge-secondary",
      success: "badge-success",
      warning: "badge-warning",
      error: "badge-error",
      info: "badge-info",
      neutral: "badge-neutral",
    };

    const sizeClasses = {
      sm: "px-3 py-1.5 text-xs font-semibold rounded-full",
      md: "px-4 py-2 text-sm font-semibold rounded-full",
    };

    return (
      <span
        ref={ref}
        className={cn(
          "badge inline-block",
          variants[variant],
          sizeClasses[size],
          className
        )}
        {...props}
      />
    );
  }
);

Badge.displayName = "Badge";
