"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, label, error, helperText, ...props }, ref) => {
    return (
      <div className="space-y-2">
        {label && (
          <label className="block text-xs sm:text-sm font-semibold text-slate-700">
            {label}
          </label>
        )}
        <textarea
          className={cn(
            "flex min-h-24 sm:min-h-28 w-full rounded-lg border border-slate-300 bg-white px-3.5 sm:px-4 py-2.5 sm:py-3 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 focus:border-transparent disabled:cursor-not-allowed disabled:opacity-50 resize-none transition-all",
            error && "border-red-500 focus:ring-red-500",
            className
          )}
          ref={ref}
          {...props}
        />
        {error && <p className="text-xs sm:text-sm text-red-500 font-medium">{error}</p>}
        {helperText && !error && (
          <p className="text-xs sm:text-sm text-slate-500">{helperText}</p>
        )}
      </div>
    );
  }
);

Textarea.displayName = "Textarea";
