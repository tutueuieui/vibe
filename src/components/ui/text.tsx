import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const textVariants = cva(
  "text-current", // 기본적으로 부모의 텍스트 색상을 상속
  {
    variants: {
      variant: {
        title: "font-bold tracking-[-0.02em]", // Title Hero, Title Page
        subtitle: "font-normal",               // Subtitle
        heading: "font-semibold tracking-[-0.02em]", // Heading
        subheading: "font-normal",             // Subheading
        body: "font-normal",                   // Body Base, Small
        code: "font-mono font-normal tracking-tight", // Body Code
        link: "font-normal underline underline-offset-4 hover:text-[var(--color-text-brand-default)] transition-colors", // Body Link
      },
      size: {
        hero: "text-[72px] leading-[1.2]",    // Title Hero
        page: "text-[48px] leading-[1.2]",    // Title Page
        xl: "text-[32px] leading-[1.4]",      // Subtitle
        lg: "text-[24px] leading-[1.4]",      // Heading
        md: "text-[20px] leading-[1.4]",      // Subheading
        base: "text-[16px] leading-[1.6]",    // Body Base, Code, Link
        sm: "text-[14px] leading-[1.6]",      // Body Small
      },
      weight: {
        default: "",
        regular: "font-normal",
        strong: "font-semibold", // Body Strong, Body Small Strong
        bold: "font-bold",
      },
      emphasis: {
        true: "italic", // Body Emphasis
        false: "not-italic",
      },
    },
    defaultVariants: {
      variant: "body",
      size: "base",
      weight: "default",
      emphasis: false,
    },
  }
);

export interface TextProps
  extends React.HTMLAttributes<HTMLParagraphElement>,
    VariantProps<typeof textVariants> {
  as?: React.ElementType;
}

const Text = React.forwardRef<HTMLParagraphElement, TextProps>(
  ({ className, variant, size, weight, emphasis, as: Component = "p", ...props }, ref) => {
    return (
      <Component
        ref={ref}
        className={cn(textVariants({ variant, size, weight, emphasis, className }))}
        {...props}
      />
    );
  }
);
Text.displayName = "Text";

export { Text, textVariants };
