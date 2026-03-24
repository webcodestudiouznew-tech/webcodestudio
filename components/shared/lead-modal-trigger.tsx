"use client";

import type { ButtonHTMLAttributes, MouseEventHandler, ReactNode } from "react";
import { useLeadFormModal } from "@/components/shared/lead-form-modal-provider";

type LeadModalTriggerProps = Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  "type" | "children"
> & {
  children: ReactNode;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  tariff?: string;
};

export function LeadModalTrigger({
  children,
  onClick,
  tariff,
  ...props
}: LeadModalTriggerProps) {
  const { openModal } = useLeadFormModal();

  return (
    <button
      type="button"
      onClick={(event) => {
        onClick?.(event);
        openModal({ tariff });
      }}
      {...props}
    >
      {children}
    </button>
  );
}
