"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

/**
 * Figma 정확 스펙 (node 44:5167)
 * ─────────────────────────────────────────
 * 래퍼      : flex-col, gap=8px (--space-200)
 * Label     : text-default-default (#1e1e1e), 16px/400, line-height=1.4
 *             disabled → text-disabled-default (#b3b3b3)
 * Description: text-default-secondary (#767676), 16px/400, line-height=1.4
 * Input box  : px=16px (--space-400), py=12px (--space-300), radius=8px, border=1px
 *              Default  → bg-white,             border-default-default (#d9d9d9)
 *              Error    → bg-white,             border-danger-default  (#900b09)
 *              Disabled → bg-disabled-default (#d9d9d9), border-disabled-default (#b3b3b3)
 * Placeholder: text-default-tertiary (#b3b3b3), 16px/400, line-height=1
 * Value text : text-default-default (#1e1e1e),  16px/400, line-height=1
 * Error msg  : text-danger-default  (#900b09),  16px/400, line-height=1.4
 */

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> {
  /** 입력 필드 위에 표시되는 레이블 */
  label?: string;
  /** 레이블 아래에 표시되는 설명 */
  description?: string;
  /** 에러 상태일 때 표시되는 메시지 */
  error?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
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
              // 피그마: 16px / 400 / line-height 1.4
              "text-base font-normal leading-[1.4] w-full",
              disabled
                ? "text-text-disabled-default"   // #b3b3b3
                : "text-text-default-default"     // #1e1e1e
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
                : "text-text-default-secondary"   // #767676
            )}
          >
            {description}
          </p>
        )}

        {/* Input box
            피그마: px-400(16px) py-300(12px), radius-200(8px), border 1px solid
        */}
        <input
          id={inputId}
          ref={ref}
          disabled={disabled}
          className={cn(
            // 레이아웃
            "w-full min-w-[120px]",
            // 패딩: px=16px(space-400), py=12px(space-300)
            "px-400 py-300",
            // 타이포: 16px / 400 / line-height 1
            "text-base font-normal leading-none",
            // 쉐이프
            "rounded-200 border border-solid",
            "overflow-hidden",
            // 전환
            "transition-colors outline-none",
            // 포커스 링
            "focus:ring-2 focus:ring-border-brand-default focus:ring-offset-0",
            // ── 상태별 ──
            isError
              ? [
                  // Error: 흰 배경 + 빨간 테두리 + 빨간 텍스트 placeholder
                  "bg-background-default-default",
                  "border-border-danger-default",        // #900b09
                  "text-text-default-default",
                  "placeholder:text-text-default-tertiary",
                ].join(" ")
              : disabled
              ? [
                  // Disabled: 회색 배경 + 회색 테두리 + 회색 텍스트
                  "bg-background-disabled-default",      // #d9d9d9
                  "border-border-disabled-default",      // #b3b3b3
                  "text-text-disabled-on-disabled",      // #b3b3b3
                  "placeholder:text-text-disabled-on-disabled",
                  "cursor-not-allowed",
                ].join(" ")
              : [
                  // Default: 흰 배경 + 회색 테두리
                  "bg-background-default-default",       // #ffffff
                  "border-border-default-default",       // #d9d9d9
                  "text-text-default-default",           // #1e1e1e
                  "placeholder:text-text-default-tertiary", // #b3b3b3
                ].join(" "),
            className
          )}
          {...props}
        />

        {/* Error message
            피그마: text-danger-default (#900b09), 16px/400, line-height 1.4
        */}
        {isError && (
          <p className="text-base font-normal leading-[1.4] text-text-danger-default whitespace-nowrap">
            {error}
          </p>
        )}
      </div>
    );
  }
);
Input.displayName = "Input";

export { Input };
