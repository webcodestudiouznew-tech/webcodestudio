import { getTranslations } from "next-intl/server";

type WhyWebCodeKey =
  | "system"
  | "structure"
  | "languages"
  | "market"
  | "contractor"
  | "support";

const whyWebCodeCards: Array<{
  key: WhyWebCodeKey;
  gridClassName: string;
  cardClassName: string;
  articleClassName: string;
  iconWrapClassName: string;
  contentClassName: string;
  contentWrapClassName: string;
  contentPositionClassName: string;
  titleClassName: string;
  descriptionClassName: string;
}> = [
  {
    key: "system",
    gridClassName: "xl:col-span-2 xl:row-span-1",
    cardClassName:
      "min-h-0 md:min-h-[220px] xl:min-h-0 bg-[radial-gradient(circle_at_top_right,rgba(241,204,107,0.16),transparent_26%),linear-gradient(135deg,#2f2a22_0%,#25211c_56%,#1f1b17_100%)]",
    articleClassName: "p-4 sm:p-5 xl:px-7 xl:py-5",
    iconWrapClassName:
      "bg-[linear-gradient(180deg,rgba(239,203,101,0.24)_0%,rgba(215,178,76,0.1)_100%)] text-[#efcb65]",
    contentClassName: "w-full xl:max-w-[56%]",
    contentWrapClassName: "mt-4",
    contentPositionClassName: "justify-start",
    titleClassName: "w-full xl:max-w-[24ch] xl:whitespace-nowrap",
    descriptionClassName: "mt-2.5 w-full xl:max-w-[58ch] xl:whitespace-nowrap",
  },
  {
    key: "structure",
    gridClassName: "xl:col-span-1 xl:row-span-2",
    cardClassName:
      "min-h-0 md:min-h-[240px] xl:min-h-0 bg-[radial-gradient(circle_at_top,rgba(212,175,74,0.14),transparent_28%),linear-gradient(180deg,#24211d_0%,#1a1815_100%)]",
    articleClassName: "p-4 sm:p-5 xl:px-7 xl:py-5",
    iconWrapClassName:
      "bg-[linear-gradient(180deg,rgba(255,255,255,0.08)_0%,rgba(241,204,107,0.08)_100%)] text-[#f3d982]",
    contentClassName: "w-full",
    contentWrapClassName: "mt-4",
    contentPositionClassName: "justify-start xl:justify-end",
    titleClassName: "w-full xl:min-h-[2.08em]",
    descriptionClassName: "mt-2.5 w-full",
  },
  {
    key: "languages",
    gridClassName: "xl:col-span-1 xl:row-span-2",
    cardClassName:
      "min-h-0 md:min-h-[240px] xl:min-h-0 bg-[radial-gradient(circle_at_50%_22%,rgba(241,204,107,0.12),transparent_24%),linear-gradient(180deg,#2b261f_0%,#1e1a16_100%)]",
    articleClassName: "p-4 sm:p-5 xl:px-7 xl:py-5",
    iconWrapClassName:
      "bg-[linear-gradient(180deg,rgba(239,203,101,0.18)_0%,rgba(215,178,76,0.06)_100%)] text-[#efcb65]",
    contentClassName: "w-full",
    contentWrapClassName: "mt-4",
    contentPositionClassName: "justify-start xl:justify-end",
    titleClassName: "w-full xl:min-h-[2.08em]",
    descriptionClassName: "mt-2.5 w-full",
  },
  {
    key: "market",
    gridClassName: "xl:col-span-1 xl:row-span-2",
    cardClassName:
      "min-h-0 md:min-h-[240px] xl:min-h-0 bg-[radial-gradient(circle_at_bottom_right,rgba(241,204,107,0.12),transparent_26%),linear-gradient(135deg,#26211b_0%,#1d1915_100%)]",
    articleClassName: "p-4 sm:p-5 xl:px-7 xl:py-6",
    iconWrapClassName:
      "bg-[linear-gradient(180deg,rgba(239,203,101,0.2)_0%,rgba(215,178,76,0.08)_100%)] text-[#f0cf6b]",
    contentClassName: "w-full",
    contentWrapClassName: "mt-4",
    contentPositionClassName: "justify-start xl:justify-end",
    titleClassName: "w-full xl:min-h-[2.08em]",
    descriptionClassName: "mt-2.5 w-full",
  },
  {
    key: "contractor",
    gridClassName: "xl:col-span-1 xl:row-span-2",
    cardClassName:
      "min-h-0 md:min-h-[240px] xl:min-h-0 bg-[radial-gradient(circle_at_top_left,rgba(241,204,107,0.12),transparent_24%),linear-gradient(180deg,#231f1a_0%,#191613_100%)]",
    articleClassName: "p-4 sm:p-5 xl:px-7 xl:py-6",
    iconWrapClassName:
      "bg-[linear-gradient(180deg,rgba(255,255,255,0.08)_0%,rgba(241,204,107,0.08)_100%)] text-[#f4d87e]",
    contentClassName: "w-full",
    contentWrapClassName: "mt-4",
    contentPositionClassName: "justify-start xl:justify-end",
    titleClassName: "w-full xl:min-h-[2.08em]",
    descriptionClassName: "mt-2.5 w-full",
  },
  {
    key: "support",
    gridClassName: "xl:col-span-2 xl:row-span-1",
    cardClassName:
      "min-h-0 md:min-h-[220px] xl:min-h-0 bg-[radial-gradient(circle_at_bottom_left,rgba(241,204,107,0.12),transparent_26%),linear-gradient(135deg,#2d261e_0%,#221d18_48%,#1b1713_100%)]",
    articleClassName: "p-4 sm:p-5 xl:px-7 xl:py-5",
    iconWrapClassName:
      "bg-[linear-gradient(180deg,rgba(239,203,101,0.22)_0%,rgba(215,178,76,0.08)_100%)] text-[#efcb65]",
    contentClassName: "w-full xl:max-w-[56%]",
    contentWrapClassName: "mt-4",
    contentPositionClassName: "justify-start",
    titleClassName: "w-full xl:max-w-[24ch] xl:whitespace-nowrap",
    descriptionClassName: "mt-2.5 w-full xl:max-w-[58ch] xl:whitespace-nowrap",
  },
];

function WhyWebCodeIcon({ type }: { type: WhyWebCodeKey }) {
  if (type === "system") {
    return (
      <svg
        viewBox="0 0 24 24"
        className="h-[18px] w-[18px]"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <rect x="3.5" y="4.5" width="7" height="6" rx="1.5" />
        <rect x="13.5" y="4.5" width="7" height="6" rx="1.5" />
        <rect x="8.5" y="13.5" width="7" height="6" rx="1.5" />
        <path d="M7 10.5v2h10v-2" />
      </svg>
    );
  }

  if (type === "structure") {
    return (
      <svg
        viewBox="0 0 24 24"
        className="h-[18px] w-[18px]"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M5 6.5h14" />
        <path d="M5 12h9" />
        <path d="M5 17.5h7" />
        <path d="m16 14 3 3-3 3" />
      </svg>
    );
  }

  if (type === "languages") {
    return (
      <svg
        viewBox="0 0 24 24"
        className="h-[18px] w-[18px]"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M4 7h10" />
        <path d="M9 4v3c0 4-1.8 7.3-5 10" />
        <path d="M6 11c1.1 1.9 2.8 3.8 5 5.5" />
        <path d="M14 20l3.2-9 3.3 9" />
        <path d="M15.1 17h4.3" />
      </svg>
    );
  }

  if (type === "market") {
    return (
      <svg
        viewBox="0 0 24 24"
        className="h-[18px] w-[18px]"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M12 20s-6-2.7-6-8V7l6-3 6 3v5c0 5.3-6 8-6 8Z" />
        <path d="M9.5 12.5h5" />
        <path d="M12 10v5" />
      </svg>
    );
  }

  if (type === "contractor") {
    return (
      <svg
        viewBox="0 0 24 24"
        className="h-[18px] w-[18px]"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <rect x="4" y="5" width="16" height="14" rx="3" />
        <path d="M8 9h8" />
        <path d="M8 13h8" />
        <path d="M8 17h5" />
      </svg>
    );
  }

  return (
    <svg
      viewBox="0 0 24 24"
      className="h-[18px] w-[18px]"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M12 21s-5.5-3.5-5.5-8.5A3.5 3.5 0 0 1 10 9a3.8 3.8 0 0 1 2 0 3.8 3.8 0 0 1 2 0 3.5 3.5 0 0 1 3.5 3.5C17.5 17.5 12 21 12 21Z" />
      <path d="M9.5 13.2h5" />
      <path d="M12 10.7v5" />
    </svg>
  );
}

export async function WhyWebCodeSection({ locale }: { locale: string }) {
  const t = await getTranslations({ locale, namespace: "WhyWebCode" });

  return (
    <section
      id="why-webcode"
      className="relative w-full overflow-hidden bg-[linear-gradient(180deg,#1f1d1a_0%,#1b1916_100%)] py-14 text-white sm:py-20 lg:py-24"
    >
      <div className="absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(212,175,74,0.42),transparent)]" />
      <div className="absolute right-[-4%] top-[10%] h-[320px] w-[320px] rounded-full bg-[#d4af4a]/10 blur-[140px]" />
      <div className="absolute bottom-[-10%] left-[-7%] h-[300px] w-[300px] rounded-full bg-[#d4af4a]/8 blur-[140px]" />

      <div className="relative z-10 mx-auto flex w-full max-w-[1280px] flex-col gap-8 px-4 sm:px-6 lg:gap-14 lg:px-0">
        <div className="flex max-w-[760px] flex-col items-center text-center lg:max-w-[1040px] lg:items-start lg:text-left">
          <h2 className="w-full max-w-none whitespace-nowrap font-[var(--font-manrope)] text-[30px] font-semibold leading-[1.02] tracking-[-0.05em] text-white max-[380px]:text-[27px] sm:text-[38px] lg:text-[38px]">
            {t("title")}
          </h2>

          <p className="mt-4 max-w-[680px] text-[15px] leading-[1.7] text-white/72 sm:mt-5 sm:text-[16px] lg:max-w-[960px] lg:text-[18px]">
            {t("description")}
          </p>
        </div>

        <div className="grid items-stretch gap-3 sm:gap-4 md:grid-cols-2 xl:grid-cols-4 xl:auto-rows-[148px]">
          {whyWebCodeCards.map((card, index) => (
            <div key={card.key} className={`h-full ${card.gridClassName}`}>
              <article
                className={`group relative flex h-full flex-col overflow-hidden rounded-[28px] border border-[#8a7030]/28 shadow-[0_24px_56px_rgba(0,0,0,0.2)] transition-all duration-300 ease-out hover:-translate-y-1 hover:border-[#a5873d]/54 hover:shadow-[0_30px_64px_rgba(0,0,0,0.26)] ${card.articleClassName} ${card.cardClassName}`}
              >
                <div className="pointer-events-none absolute inset-x-6 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(241,204,107,0.22),transparent)] transition-all duration-300 ease-out group-hover:bg-[linear-gradient(90deg,transparent,rgba(241,204,107,0.6),transparent)]" />
                <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.02),transparent_26%,transparent)]" />
                <div className="pointer-events-none absolute -right-10 top-[-8%] h-28 w-28 rounded-full bg-[#d4af4a]/0 blur-3xl transition-all duration-300 ease-out group-hover:bg-[#d4af4a]/12" />

                <div className="relative flex items-start justify-between gap-4">
                  <div
                    className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-[14px] shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] transition-all duration-300 ease-out group-hover:scale-[1.04] ${card.iconWrapClassName}`}
                  >
                    <WhyWebCodeIcon type={card.key} />
                  </div>

                  <span className="pr-0.5 text-[13px] font-medium tracking-[-0.02em] text-white/28 transition-colors duration-300 ease-out group-hover:text-[#efcb65]/72">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>

                <div
                  className={`relative flex flex-1 flex-col ${card.contentPositionClassName} ${card.contentWrapClassName} ${card.contentClassName}`}
                >
                  <h3
                    className={`font-[var(--font-manrope)] text-[18px] font-semibold leading-[1.08] tracking-[-0.04em] text-white transition-colors duration-300 ease-out group-hover:text-[#f5df9a] sm:text-[20px] sm:leading-[1.04] sm:tracking-[-0.045em] ${card.titleClassName}`}
                  >
                    {t(`items.${card.key}.title`)}
                  </h3>

                  <p
                    className={`text-[14px] leading-[1.64] text-white/62 transition-colors duration-300 ease-out group-hover:text-white/74 sm:text-[15px] sm:leading-[1.66] ${card.descriptionClassName}`}
                  >
                    {t(`items.${card.key}.description`)}
                  </p>
                </div>
              </article>
            </div>
          ))}
        </div>

        <div className="relative overflow-hidden rounded-[28px] bg-[radial-gradient(circle_at_top,rgba(212,175,74,0.16),transparent_36%),linear-gradient(180deg,#312811_0%,#211d18_58%,#181613_100%)] px-4 py-9 text-center shadow-[0_34px_80px_rgba(0,0,0,0.28)] sm:rounded-[32px] sm:px-8 sm:py-12">
          <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(241,204,107,0.62),transparent)]" />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-[linear-gradient(90deg,transparent,rgba(241,204,107,0.2),transparent)]" />
          <div className="pointer-events-none absolute left-[-58px] top-[-40px] h-[156px] w-[156px] rounded-full border-[18px] border-[#d4af4a]/95 border-r-transparent border-b-transparent opacity-95 blur-[12px]" />
          <div className="pointer-events-none absolute right-[-64px] top-[-18px] h-[164px] w-[164px] rounded-full border-[18px] border-[#d4af4a]/92 border-l-transparent border-b-transparent opacity-92 blur-[14px]" />
          <div className="pointer-events-none absolute left-1/2 top-1/2 h-[240px] w-[240px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#d4af4a]/10 blur-[120px]" />

          <div className="relative mx-auto flex max-w-[680px] flex-col items-center">
            <h3 className="w-full max-w-none text-center font-[var(--font-manrope)] text-[28px] font-semibold leading-[1] tracking-[-0.06em] text-white max-[380px]:text-[25px] sm:max-w-[14ch] sm:text-[36px] lg:max-w-[15ch] lg:text-[34px]">
              <span className="flex flex-col items-center gap-1 sm:hidden">
                <span className="block whitespace-nowrap">{t("ctaLine1")}</span>
                <span className="block whitespace-nowrap">{t("ctaLine2")}</span>
              </span>
              <span className="hidden sm:inline">{t("cta")}</span>
            </h3>

            <p className="mt-3.5 max-w-[520px] text-[14px] leading-[1.68] text-white/62 sm:mt-4 sm:text-[15px]">
              {t("ctaDescription")}
            </p>

            <a
              href="#lead"
              className="mt-6 inline-flex min-h-12 w-full items-center justify-center rounded-[12px] bg-[linear-gradient(180deg,#efcb65_0%,#d7b24c_100%)] px-6 py-3 text-center text-[15px] font-semibold text-[#30260d] shadow-[0_18px_30px_rgba(212,175,74,0.22)] transition-all duration-200 ease-out hover:-translate-y-0.5 hover:brightness-110 sm:mt-7 sm:w-auto sm:min-w-[220px]"
            >
              {t("ctaButton")}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
