import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

/**
 * Figma 정확 스펙 (node 44:5266, 44:5302)
 * ─────────────────────────────────────────
 * Medium: padding=12px(전사방), gap=8px, border-radius=8px, font=16px/400, border=1px
 * Small : padding=8px(전사방),  gap=8px, border-radius=8px, font=16px/400, border=1px
 *
 * Tailwind 토큰 경로 규칙:
 *   배경   → bg-background-{role}-{scale}
 *   텍스트 → text-text-{role}-{scale}
 *   테두리 → border-border-{role}-{scale}
 *   간격   → p-300(=12px) / p-200(=8px) / gap-200(=8px)
 *   라디우스→ rounded-200(=8px)
 */
const buttonVariants = cva(
  [
    // 레이아웃
    "inline-flex items-center justify-center whitespace-nowrap",
    // 도형 – 피그마: radius=8px, border=1px solid
    "rounded-200 border border-solid",
    // 타이포 – 피그마: Inter Regular 16px, line-height=1
    "text-base font-normal leading-none",
    // 상태
    "transition-colors",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-brand-default",
    // Disabled 공통 (피그마: bg-disabled-default, text-disabled-on-disabled, border-disabled-default)
    "disabled:pointer-events-none",
    "disabled:bg-background-disabled-default",
    "disabled:text-text-disabled-on-disabled",
    "disabled:border-border-disabled-default",
  ].join(" "),
  {
    variants: {
      variant: {
        /**
         * Primary
         * bg: background-brand-default (#2c2c2c)
         * text: text-brand-on-brand (#f5f5f5)
         * border: border-brand-default (#2c2c2c)
         */
        primary: [
          "bg-background-brand-default",
          "text-text-brand-on-brand",
          "border-border-brand-default",
          "hover:bg-background-brand-hover",
        ].join(" "),

        /**
         * Neutral
         * bg: background-neutral-tertiary (#e6e6e6)
         * text: text-neutral-default (#2c2c2c)
         * border: border-neutral-secondary (#767676)
         */
        neutral: [
          "bg-background-neutral-tertiary",
          "text-text-neutral-default",
          "border-border-neutral-secondary",
          "hover:bg-background-neutral-secondary",
        ].join(" "),

        /**
         * Subtle
         * bg: transparent
         * text: text-neutral-default (#2c2c2c)
         * border: transparent
         * hover: border-default-default (#d9d9d9)
         */
        subtle: [
          "bg-transparent",
          "text-text-neutral-default",
          "border-transparent",
          "hover:border-border-default-default",
        ].join(" "),

        /**
         * Danger Primary
         * bg: background-danger-default (#ec221f)
         * text: text-danger-on-danger (#fee9e7)
         * border: border-danger-default (#900b09)
         */
        danger: [
          "bg-background-danger-default",
          "text-text-danger-on-danger",
          "border-border-danger-default",
          "hover:bg-background-danger-hover",
        ].join(" "),

        /**
         * Danger Subtle
         * bg: transparent
         * text: text-danger-default (#900b09)
         * border: transparent → hover border-danger-tertiary
         */
        "danger-subtle": [
          "bg-transparent",
          "text-text-danger-default",
          "border-transparent",
          "hover:border-border-danger-tertiary",
          "hover:bg-background-danger-tertiary",
        ].join(" "),
      },

      size: {
        /**
         * Medium: padding=12px 전사방, gap=8px
         * 피그마: p-[var(--sds-size-space-300,12px)], gap-[var(--sds-size-space-200,8px)]
         */
        md: "p-300 gap-200",

        /**
         * Small: padding=8px 전사방, gap=8px
         * 피그마: p-[var(--sds-size-space-200,8px)], gap-[var(--sds-size-space-200,8px)]
         */
        sm: "p-200 gap-200",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { className, variant, size, isLoading, leftIcon, rightIcon, children, ...props },
    ref
  ) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        disabled={isLoading || props.disabled}
        {...props}
      >
        {isLoading && (
          <Loader2 className="h-4 w-4 animate-spin" />
        )}
        {!isLoading && leftIcon && (
          <span className="inline-flex shrink-0 size-4">{leftIcon}</span>
        )}
        {children}
        {!isLoading && rightIcon && (
          <span className="inline-flex shrink-0 size-4">{rightIcon}</span>
        )}
      </button>
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
