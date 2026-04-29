"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

/**
 * Textarea – input.tsx 패턴을 그대로 따라 제작
 * ─────────────────────────────────────────
 * 래퍼      : flex-col, gap=8px (--space-200)
 * Label     : text-default-default, 16px/400, lh=1.4
 *             disabled → text-disabled-default
 * Description: text-default-secondary, 16px/400, lh=1.4
 * Textarea   : px=16px (space-400), py=12px (space-300), radius=8px, border=1px
 *              Default  → bg-white, border-default-default
 *              Error    → bg-white, border-danger-default
 *              Disabled → bg-disabled-default, border-disabled-default
 * Placeholder: text-default-tertiary
 * Error msg  : text-danger-default, lh=1.4
 */

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  description?: string;
  error?: string;
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, label, description, error, disabled, id, ...props }, ref) => {
    const inputId = id ?? React.useId();
    const isError = Boolean(error);

    return (
      <div className="flex flex-col gap-200 items-start w-full">
        {/* Label */}
        {label && (
          <label
            htmlFor={inputId}
            className={cn(
              "text-base font-normal leading-[1.4] w-full",
              disabled
                ? "text-text-disabled-default"
                : "text-text-default-default"
            )}
          >
            {label}
          </label>
        )}

        {/* Description */}
        {description && (
          <p
            className={cn(
              "text-base font-normal leading-[1.4] w-full",
              disabled
                ? "text-text-disabled-default"
                : "text-text-default-secondary"
            )}
          >
            {description}
          </p>
        )}

        {/* Textarea */}
        <textarea
          id={inputId}
          ref={ref}
          disabled={disabled}
          className={cn(
            "w-full min-w-[120px] resize-none",
            "px-400 py-300",
            "text-base font-normal leading-[1.6]",
            "rounded-200 border border-solid",
            "transition-colors outline-none",
            "focus:ring-2 focus:ring-border-brand-default focus:ring-offset-0",
            isError
              ? [
                  "bg-background-default-default",
                  "border-border-danger-default",
                  "text-text-default-default",
                  "placeholder:text-text-default-tertiary",
                ].join(" ")
              : disabled
              ? [
                  "bg-background-disabled-default",
                  "border-border-disabled-default",
                  "text-text-disabled-on-disabled",
                  "placeholder:text-text-disabled-on-disabled",
                  "cursor-not-allowed",
                ].join(" ")
              : [
                  "bg-background-default-default",
                  "border-border-default-default",
                  "text-text-default-default",
                  "placeholder:text-text-default-tertiary",
                ].join(" "),
            className
          )}
          {...props}
        />

        {/* Error message */}
        {isError && (
          <p className="text-base font-normal leading-[1.4] text-text-danger-default whitespace-nowrap">
            {error}
          </p>
        )}
      </div>
    );
  }
);
Textarea.displayName = "Textarea";

export { Textarea };
