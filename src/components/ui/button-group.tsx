import * as React from "react";
import { cn } from "@/lib/utils";
import { Button } from "./button";

export type ButtonGroupAlign = "start" | "end" | "center" | "justify" | "stack";

export interface ButtonGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  align?: ButtonGroupAlign;
  /** 왼쪽(secondary) 버튼 레이블 */
  cancelLabel?: string;
  /** 오른쪽(primary) 버튼 레이블 */
  confirmLabel?: string;
  onCancel?: () => void;
  onConfirm?: () => void;
}

const ButtonGroup = React.forwardRef<HTMLDivElement, ButtonGroupProps>(
  (
    {
      className,
      align = "justify",
      cancelLabel = "Cancel",
      confirmLabel = "Confirm",
      onCancel,
      onConfirm,
      children,
      ...props
    },
    ref
  ) => {
    const alignClass: Record<ButtonGroupAlign, string> = {
      start: "flex-row justify-start items-center",
      end: "flex-row justify-end items-center",
      center: "flex-row justify-center items-center",
      justify: "flex-row items-center",
      stack: "flex-col items-start",
    };

    const buttonClass: Record<ButtonGroupAlign, string> = {
      start: "shrink-0",
      end: "shrink-0",
      center: "shrink-0",
      justify: "flex-1 min-w-0",
      stack: "w-full",
    };

    return (
      <div
        ref={ref}
        className={cn(
          "flex gap-400 relative",
          alignClass[align],
          className
        )}
        {...props}
      >
        {children ?? (
          <>
            <Button
              variant="subtle"
              size="md"
              className={cn(buttonClass[align])}
              onClick={onCancel}
            >
              {cancelLabel}
            </Button>
            <Button
              variant="primary"
              size="md"
              className={cn(buttonClass[align])}
              onClick={onConfirm}
            >
              {confirmLabel}
            </Button>
          </>
        )}
      </div>
    );
  }
);
ButtonGroup.displayName = "ButtonGroup";

export { ButtonGroup };
