import React, { useMemo } from "react";
import katex from "katex";

interface MathViewProps {
  math: string;
  block?: boolean;
  className?: string;
}

export const MathView: React.FC<MathViewProps> = ({ math, block = false, className = "" }) => {
  const html = useMemo(() => {
    if (!math) return "";
    try {
      return katex.renderToString(math, {
        displayMode: block,
        throwOnError: false,
        strict: false,
      });
    } catch {
      return `<span class="font-mono">${math}</span>`;
    }
  }, [math, block]);

  return (
    <span
      className={`${block ? "block text-center my-1.5 overflow-x-auto py-1 max-w-full" : "inline-block align-middle"} ${className}`}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
};
