"use client";

import { useEffect, useId, useRef, useState } from "react";

type CasesAccordionItemProps = {
  buttonClassName?: string;
  children: React.ReactNode;
  className?: string;
  defaultOpen?: boolean;
  onToggle?: () => void;
  open?: boolean;
  titleClassName?: string;
  title: string;
};

function ChevronIcon({ open }: { open: boolean }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={`h-[15px] w-[15px] shrink-0 text-white/42 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${open ? "rotate-180" : ""}`}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}

export function CasesAccordionItem({
  buttonClassName = "",
  children,
  className = "",
  defaultOpen = false,
  onToggle,
  open: controlledOpen,
  titleClassName = "",
  title,
}: CasesAccordionItemProps) {
  const [uncontrolledOpen, setUncontrolledOpen] = useState(defaultOpen);
  const [contentHeight, setContentHeight] = useState(0);
  const contentRef = useRef<HTMLDivElement | null>(null);
  const contentId = useId();
  const open = controlledOpen ?? uncontrolledOpen;

  useEffect(() => {
    const element = contentRef.current;

    if (!element) {
      return;
    }

    const updateHeight = () => {
      setContentHeight(element.scrollHeight);
    };

    updateHeight();

    const observer = new ResizeObserver(updateHeight);
    observer.observe(element);

    return () => observer.disconnect();
  }, []);

  return (
    <div className={`h-full overflow-hidden rounded-[16px] border border-white/8 bg-white/[0.025] ${className}`}>
      <button
        type="button"
        aria-expanded={open}
        aria-controls={contentId}
        onClick={() => {
          if (onToggle) {
            onToggle();
            return;
          }

          setUncontrolledOpen((current) => !current);
        }}
        className={`flex w-full items-center justify-between gap-3 px-4 py-3 text-left ${buttonClassName}`}
      >
        <span className={`flex items-center gap-2 text-[14px] font-semibold tracking-[-0.02em] text-white/84 ${titleClassName}`}>
          <span aria-hidden="true" className="h-1.5 w-1.5 shrink-0 rounded-full bg-current" />
          <span>{title}</span>
        </span>
        <ChevronIcon open={open} />
      </button>

      <div
        id={contentId}
        className="overflow-hidden transition-[height] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]"
        style={{ height: open ? contentHeight : 0 }}
      >
        <div
          ref={contentRef}
          className={`border-t border-white/6 px-4 pb-4 pt-3 transition-opacity duration-500 ease-out ${open ? "opacity-100 delay-100" : "opacity-0"}`}
        >
          {children}
        </div>
      </div>
    </div>
  );
}
