"use client";

import type { ReactNode } from "react";
import { forwardRef, useEffect, useState } from "react";
import { motion, useReducedMotion, type Variants } from "motion/react";
import { cn } from "@/lib/utils";

const MOBILE_REVEAL_BREAKPOINT = 768;
const MOBILE_REVEAL_AMOUNT_CAP = 0.14;
const MOBILE_REVEAL_MARGIN = "0px 0px -4% 0px";

type RevealProps = {
  children: ReactNode;
  className?: string;
  amount?: number;
  margin?: string;
  delay?: number;
  duration?: number;
  once?: boolean;
  y?: number;
  scale?: number;
};

type StaggerGroupProps = {
  children: ReactNode;
  className?: string;
  amount?: number;
  margin?: string;
  delayChildren?: number;
  staggerChildren?: number;
  once?: boolean;
};

type StaggerItemProps = {
  children: ReactNode;
  className?: string;
  y?: number;
  scale?: number;
};

function createRevealVariants({
  delay = 0,
  duration = 1.1,
  y = 24,
  scale = 1,
}: Pick<RevealProps, "delay" | "duration" | "y" | "scale">): Variants {
  return {
    hidden: {
      opacity: 0,
      y,
      scale,
      filter: "blur(8px)",
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      filter: "blur(0px)",
      transition: {
        delay,
        duration,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };
}

function useResponsiveViewport(amount: number, margin: string) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia(
      `(max-width: ${MOBILE_REVEAL_BREAKPOINT - 1}px)`,
    );

    const update = () => setIsMobile(mediaQuery.matches);
    update();

    mediaQuery.addEventListener("change", update);
    return () => mediaQuery.removeEventListener("change", update);
  }, []);

  return {
    amount: isMobile ? Math.min(amount, MOBILE_REVEAL_AMOUNT_CAP) : amount,
    margin: isMobile ? MOBILE_REVEAL_MARGIN : margin,
  };
}

export function Reveal({
  children,
  className,
  amount = 0.26,
  margin = "0px 0px -12% 0px",
  delay = 0,
  duration = 1.1,
  once = true,
  y = 24,
  scale = 1,
}: RevealProps) {
  const shouldReduceMotion = useReducedMotion();
  const viewport = useResponsiveViewport(amount, margin);

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount: viewport.amount, margin: viewport.margin }}
      variants={createRevealVariants({ delay, duration, y, scale })}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export const StaggerGroup = forwardRef<HTMLDivElement, StaggerGroupProps>(
  function StaggerGroup(
    {
      children,
      className,
      amount = 0.22,
      margin = "0px 0px -10% 0px",
      delayChildren = 0,
      staggerChildren = 0.16,
      once = true,
    },
    ref,
  ) {
    const shouldReduceMotion = useReducedMotion();
    const viewport = useResponsiveViewport(amount, margin);

    if (shouldReduceMotion) {
      return (
        <div ref={ref} className={className}>
          {children}
        </div>
      );
    }

    return (
      <motion.div
        ref={ref}
        initial="hidden"
        whileInView="visible"
        viewport={{ once, amount: viewport.amount, margin: viewport.margin }}
        variants={{
          hidden: {},
          visible: {
            transition: {
              delayChildren,
              staggerChildren,
            },
          },
        }}
        className={className}
      >
        {children}
      </motion.div>
    );
  },
);

export function StaggerItem({
  children,
  className,
  y = 24,
  scale = 1,
}: StaggerItemProps) {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      variants={createRevealVariants({ y, scale })}
      className={cn("h-full", className)}
    >
      {children}
    </motion.div>
  );
}
