"use client";

import {
  createContext,
  useContext,
  useEffect,
  useId,
  useMemo,
  useState,
  type MouseEvent,
  type ReactNode,
} from "react";
import { LeadForm, type LeadFormCopy } from "@/components/sections/lead-form";

type LeadFormModalContextValue = {
  openModal: (options?: { tariff?: string | null }) => void;
  closeModal: () => void;
};

const LeadFormModalContext = createContext<LeadFormModalContextValue | null>(null);

type LeadFormModalProviderProps = {
  children: ReactNode;
  locale: string;
  copy: LeadFormCopy;
};

export function LeadFormModalProvider({
  children,
  locale,
  copy,
}: LeadFormModalProviderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedTariff, setSelectedTariff] = useState<string | null>(null);
  const titleId = useId();

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  const value = useMemo(
    () => ({
      openModal: (options?: { tariff?: string | null }) => {
        setSelectedTariff(options?.tariff ?? null);
        setIsOpen(true);
      },
      closeModal: () => {
        setIsOpen(false);
        setSelectedTariff(null);
      },
    }),
    [],
  );

  return (
    <LeadFormModalContext.Provider value={value}>
      <div
        className={`transition-[filter,transform,opacity] duration-300 ease-out ${
          isOpen ? "pointer-events-none blur-[16px] saturate-50 opacity-70" : ""
        }`}
        aria-hidden={isOpen}
      >
        {children}
      </div>

      {isOpen ? (
        <div
          className="fixed inset-0 z-[160] flex items-center justify-center bg-[#050403]/58 p-4 backdrop-blur-[20px] sm:p-6"
          onClick={() => {
            setIsOpen(false);
            setSelectedTariff(null);
          }}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            className="relative w-full max-w-[720px] rounded-[30px] border border-[#8a7030]/28 bg-[radial-gradient(circle_at_top,rgba(212,175,74,0.14),transparent_34%),linear-gradient(180deg,rgba(28,24,20,0.98)_0%,rgba(14,12,10,0.98)_100%)] p-4 shadow-[0_40px_120px_rgba(0,0,0,0.52)] sm:p-5"
            onClick={(event: MouseEvent<HTMLDivElement>) => event.stopPropagation()}
          >
            <div className="mb-3 flex items-center justify-between gap-4 px-1 sm:mb-4">
              <p
                id={titleId}
                className="font-[var(--font-manrope)] text-[16px] font-semibold tracking-[-0.03em] text-white/88 sm:text-[18px]"
              >
                {copy.modal.openTitle}
              </p>

              <button
                type="button"
                onClick={() => {
                  setIsOpen(false);
                  setSelectedTariff(null);
                }}
                className="inline-flex min-h-10 items-center justify-center gap-2 rounded-[12px] border border-white/10 bg-white/[0.04] px-3 text-[14px] font-medium text-white/84 transition-all duration-200 ease-out hover:border-[#8a7030]/55 hover:text-white"
              >
                <span aria-hidden="true" className="text-[18px] leading-none">
                  ×
                </span>
                {copy.modal.close}
              </button>
            </div>

            <LeadForm
              locale={locale}
              copy={copy}
              trackingSection="lead_modal"
              trackOnMount
              selectedTariff={selectedTariff}
              onStatusClose={() => {
                setIsOpen(false);
                setSelectedTariff(null);
              }}
            />
          </div>
        </div>
      ) : null}
    </LeadFormModalContext.Provider>
  );
}

export function useLeadFormModal() {
  const context = useContext(LeadFormModalContext);

  if (!context) {
    throw new Error("useLeadFormModal must be used within LeadFormModalProvider");
  }

  return context;
}
