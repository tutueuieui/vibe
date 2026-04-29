import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

/**
 * Figma 정확 스펙 (node 44:5339)
 * ─────────────────────────────────────────
 * Medium: padding=12px(전사방), radius=32px(pill), icon=20px, border=1px
 * Small : padding=8px(전사방),  radius=32px(pill), icon=20px, border=1px
 *
 * 피그마: rounded-[var(--sds-typography-scale-06,32px)]
 */
const iconButtonVariants = cva(
  [
    "inline-flex items-center justify-center overflow-clip border border-solid transition-colors",
    // 피그마 radius: 32px (pill형 - typography-scale-06 = 32px)
    "rounded-[32px]",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-brand-default",
    "disabled:pointer-events-none",
    "disabled:bg-background-disabled-default",
    "disabled:border-border-disabled-default",
    "disabled:text-text-disabled-on-disabled",
  ].join(" "),
  {
    variants: {
      variant: {
        /**
         * Primary: bg-brand-default / border-brand-default / text-brand-on-brand
         */
        primary: [
          "bg-background-brand-default",
          "border-border-brand-default",
          "text-text-brand-on-brand",
          "hover:bg-background-brand-hover",
        ].join(" "),

        /**
         * Neutral: bg-neutral-tertiary / border-neutral-secondary / text-neutral-default
         */
        neutral: [
          "bg-background-neutral-tertiary",
          "border-border-neutral-secondary",
          "text-text-neutral-default",
          "hover:bg-background-neutral-secondary",
        ].join(" "),

        /**
         * Subtle: transparent / no-border / text-default-default
         */
        subtle: [
          "bg-transparent",
          "border-transparent",
          "text-text-default-default",
          "hover:bg-background-default-secondary",
        ].join(" "),
      },
      size: {
        /**
         * Medium: padding=12px → 12 + 20 + 12 = 44px 정사각형
         * 피그마: p-[var(--sds-size-space-300,12px)], icon size=20px
         */
        md: "p-300",

        /**
         * Small: padding=8px → 8 + 20 + 8 = 36px 정사각형
         * 피그마: p-[var(--sds-size-space-200,8px)], icon size=20px
         */
        sm: "p-200",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
);

export interface IconButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof iconButtonVariants> {
  icon: React.ReactNode;
  isLoading?: boolean;
  "aria-label": string;
}

const IconButton = React.forwardRef<HTMLButtonElement, IconButtonProps>(
  ({ className, variant, size, icon, isLoading, ...props }, ref) => {
    return (
      <button
        className={cn(iconButtonVariants({ variant, size, className }))}
        ref={ref}
        disabled={isLoading || props.disabled}
        {...props}
      >
        {/* 아이콘 크기: 피그마 20px 고정 */}
        <span className="inline-flex shrink-0 size-5">
          {isLoading ? <Loader2 className="animate-spin size-5" /> : icon}
        </span>
      </button>
    );
  }
);
IconButton.displayName = "IconButton";

export { IconButton, iconButtonVariants };
