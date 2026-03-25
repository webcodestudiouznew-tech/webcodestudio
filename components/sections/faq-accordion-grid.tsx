"use client";

import { useEffect, useState } from "react";
import { CasesAccordionItem } from "@/components/sections/cases-accordion-item";
import { StaggerGroup, StaggerItem } from "@/components/ui/scroll-reveal";

const DESKTOP_BREAKPOINT = 1024;

type FaqAccordionGridItem = {
  answer: string;
  question: string;
};

type FaqAccordionGridProps = {
  items: FaqAccordionGridItem[];
};

export function FaqAccordionGrid({ items }: FaqAccordionGridProps) {
  const [openItems, setOpenItems] = useState<Record<number, boolean>>({});
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia(`(min-width: ${DESKTOP_BREAKPOINT}px)`);

    const update = () => setIsDesktop(mediaQuery.matches);
    update();

    mediaQuery.addEventListener("change", update);
    return () => mediaQuery.removeEventListener("change", update);
  }, []);

  const toggleItem = (index: number) => {
    if (isDesktop) {
      const pairStart = index % 2 === 0 ? index : index - 1;
      const pairIndices = [pairStart, pairStart + 1].filter(
        (itemIndex) => itemIndex < items.length,
      );
      const nextOpenState = !pairIndices.every((itemIndex) => openItems[itemIndex]);

      setOpenItems((current) => {
        const next = { ...current };

        for (const itemIndex of pairIndices) {
          next[itemIndex] = nextOpenState;
        }

        return next;
      });

      return;
    }

    setOpenItems((current) => ({
      ...current,
      [index]: !current[index],
    }));
  };

  return (
    <StaggerGroup
      className="grid gap-1.5 lg:grid-cols-2 lg:gap-2"
      delayChildren={0.05}
      staggerChildren={0.05}
    >
      {items.map((item, index) => (
        <StaggerItem key={item.question}>
          <CasesAccordionItem
            buttonClassName="transition-all duration-200 ease-out hover:bg-white/[0.05]"
            className="rounded-none transition-all duration-200 ease-out hover:border-[#8a7030]/38 hover:bg-white/[0.03]"
            onToggle={() => toggleItem(index)}
            open={Boolean(openItems[index])}
            titleClassName="transition-colors duration-200 ease-out hover:text-white"
            title={item.question}
          >
            <p className="text-[14px] leading-[1.62] text-white/66">{item.answer}</p>
          </CasesAccordionItem>
        </StaggerItem>
      ))}
    </StaggerGroup>
  );
}
