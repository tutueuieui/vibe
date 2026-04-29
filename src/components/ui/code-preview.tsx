"use client";

import * as React from "react";
import { Check, Copy } from "lucide-react";
import { cn } from "@/lib/utils";

interface CodePreviewProps extends React.HTMLAttributes<HTMLDivElement> {
  code: string;
}

export function CodePreview({ code, className, children, ...props }: CodePreviewProps) {
  const [hasCopied, setHasCopied] = React.useState(false);

  React.useEffect(() => {
    if (hasCopied) {
      const timer = setTimeout(() => setHasCopied(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [hasCopied]);

  const onCopy = () => {
    navigator.clipboard.writeText(code);
    setHasCopied(true);
  };

  return (
    <div className={cn("group relative flex flex-col gap-4 rounded-xl border border-default-default p-6", className)} {...props}>
      <div className="flex items-center justify-between">
        <h4 className="text-sm font-medium text-default-secondary">Preview</h4>
        <button
          onClick={onCopy}
          className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-default-default bg-transparent text-default-secondary transition-colors hover:bg-neutral-tertiary focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-brand-default"
          aria-label="Copy code"
        >
          {hasCopied ? <Check className="h-4 w-4 text-positive-default" /> : <Copy className="h-4 w-4" />}
        </button>
      </div>
      <div className="flex w-full items-center justify-center rounded-lg border border-default-secondary border-dashed p-10 bg-neutral-tertiary/20">
        {children}
      </div>
      <div className="relative mt-2 overflow-x-auto rounded-lg bg-[#141414] p-4 text-sm text-[#f3f3f3]">
        <pre>
          <code>{code}</code>
        </pre>
      </div>
    </div>
  );
}
