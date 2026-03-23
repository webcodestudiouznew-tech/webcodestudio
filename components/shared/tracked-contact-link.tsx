"use client";

import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { trackEvent, type AnalyticsEventName } from "@/lib/analytics";

type TrackedContactLinkProps = Omit<
  ComponentPropsWithoutRef<"a">,
  "href" | "children"
> & {
  href: string;
  eventName: AnalyticsEventName;
  eventPayload?: Record<string, unknown>;
  children: ReactNode;
};

export function TrackedContactLink({
  href,
  eventName,
  eventPayload,
  onClick,
  children,
  ...props
}: TrackedContactLinkProps) {
  return (
    <a
      href={href}
      onClick={(event) => {
        trackEvent(eventName, eventPayload);
        onClick?.(event);
      }}
      {...props}
    >
      {children}
    </a>
  );
}
