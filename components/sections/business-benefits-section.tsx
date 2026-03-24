import { getTranslations } from "next-intl/server";
import { LeadModalTrigger } from "@/components/shared/lead-modal-trigger";

type BenefitKey =
  | "presentation"
  | "path"
  | "leads"
  | "services"
  | "growth"
  | "launch";

const benefitKeys: BenefitKey[] = [
  "presentation",
  "path",
  "leads",
  "services",
  "growth",
  "launch",
];

function BenefitIcon({ type }: { type: BenefitKey }) {
  const iconClassName = "h-[18px] w-[18px]";

  if (type === "presentation") {
    return (
      <svg
        viewBox="0 0 24 24"
        className={iconClassName}
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <rect x="4" y="5" width="16" height="14" rx="3" />
        <path d="M8 10h8" />
        <path d="M8 14h5" />
      </svg>
    );
  }

  if (type === "path") {
    return (
      <svg
        viewBox="0 0 24 24"
        className={iconClassName}
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M5 18c2.5-5.5 5.5-8.5 14-12" />
        <path d="M13 6h6v6" />
      </svg>
    );
  }

  if (type === "leads") {
    return (
      <svg
        viewBox="0 0 24 24"
        className={iconClassName}
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M12 20s-6-3.8-6-9V6.5L12 4l6 2.5V11c0 5.2-6 9-6 9Z" />
        <path d="m9.5 12 1.7 1.7 3.3-3.7" />
      </svg>
    );
  }

  if (type === "services") {
    return (
      <svg
        viewBox="0 0 24 24"
        className={iconClassName}
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <rect x="4" y="5" width="7" height="6" rx="1.5" />
        <rect x="13" y="5" width="7" height="6" rx="1.5" />
        <rect x="4" y="13" width="7" height="6" rx="1.5" />
        <rect x="13" y="13" width="7" height="6" rx="1.5" />
      </svg>
    );
  }

  if (type === "growth") {
    return (
      <svg
        viewBox="0 0 24 24"
        className={iconClassName}
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M5 18h14" />
        <path d="M7 15.5 11 11l3 3 5-6" />
      </svg>
    );
  }

  return (
    <svg
      viewBox="0 0 24 24"
      className={iconClassName}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M12 4v4" />
      <path d="M12 16v4" />
      <path d="M4 12h4" />
      <path d="M16 12h4" />
      <circle cx="12" cy="12" r="3.5" />
    </svg>
  );
}

export async function BusinessBenefitsSection({ locale }: { locale: string }) {
  const t = await getTranslations({ locale, namespace: "BusinessBenefits" });

  return (
    <section
      id="business-benefits"
      className="relative w-full overflow-hidden bg-[linear-gradient(180deg,#1c1a17_0%,#171512_100%)] py-16 text-white sm:py-20 lg:py-24"
    >
      <div className="absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(212,175,74,0.4),transparent)]" />
      <div className="absolute left-[-5%] top-[12%] h-[280px] w-[280px] rounded-full bg-[#d4af4a]/8 blur-[130px]" />
      <div className="absolute bottom-[-8%] right-[-6%] h-[320px] w-[320px] rounded-full bg-[#d4af4a]/10 blur-[150px]" />

      <div className="relative z-10 mx-auto flex w-full max-w-[1280px] flex-col gap-10 px-4 sm:px-6 lg:gap-14 lg:px-0">
        <div className="flex max-w-[720px] flex-col items-center text-center lg:items-start lg:text-left">
          <h2 className="w-full max-w-none font-[var(--font-manrope)] text-[30px] font-medium leading-[1.06] tracking-[-0.04em] text-white max-[380px]:text-[27px] sm:text-[38px] lg:text-[40px]">
            {t("title")}
          </h2>

          <p className="mt-5 text-[15px] leading-[1.68] text-white/72 sm:text-[16px] lg:text-[18px]">
            {t("description")}
          </p>
        </div>

        <div className="grid items-stretch gap-4 md:grid-cols-2 xl:grid-cols-3">
          {benefitKeys.map((item, index) => (
            <article
              key={item}
              className="group relative flex h-full flex-col overflow-hidden rounded-[24px] border border-white/8 bg-[linear-gradient(180deg,rgba(255,255,255,0.04)_0%,rgba(255,255,255,0.02)_100%)] px-5 py-5 shadow-[0_18px_40px_rgba(0,0,0,0.16)] backdrop-blur-[10px] transition-all duration-300 ease-out hover:-translate-y-1 hover:border-[#8a7030]/80 hover:bg-[linear-gradient(180deg,rgba(255,255,255,0.06)_0%,rgba(61,50,27,0.16)_100%)] hover:shadow-[0_24px_54px_rgba(0,0,0,0.24)] sm:px-6 sm:py-6"
            >
              <div className="pointer-events-none absolute inset-x-5 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(212,175,74,0.16),transparent)] transition-all duration-300 ease-out group-hover:bg-[linear-gradient(90deg,transparent,rgba(212,175,74,0.5),transparent)]" />
              <div className="pointer-events-none absolute right-[-12%] top-[10%] h-24 w-24 rounded-full bg-[#d4af4a]/0 blur-3xl transition-all duration-300 ease-out group-hover:bg-[#d4af4a]/12" />

              <div className="flex items-start justify-between gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[14px] bg-[linear-gradient(180deg,rgba(239,203,101,0.18)_0%,rgba(215,178,76,0.08)_100%)] text-[#efcb65] shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] transition-all duration-300 ease-out group-hover:scale-[1.04] group-hover:bg-[linear-gradient(180deg,rgba(239,203,101,0.24)_0%,rgba(215,178,76,0.14)_100%)] group-hover:text-[#f4d87e] group-hover:shadow-[0_10px_24px_rgba(212,175,74,0.16),inset_0_1px_0_rgba(255,255,255,0.08)]">
                  <BenefitIcon type={item} />
                </div>

                <span className="text-[13px] font-medium tracking-[-0.02em] text-white/34 transition-colors duration-300 ease-out group-hover:text-[#efcb65]/78">
                  {String(index + 1).padStart(2, "0")}
                </span>
              </div>

              <div className="mt-5 flex flex-col">
                <h3 className="max-w-[18ch] font-[var(--font-manrope)] text-[20px] font-medium leading-[1.12] tracking-[-0.035em] text-white transition-colors duration-300 ease-out group-hover:text-[#f5df9a] sm:text-[21px]">
                  {t(`items.${item}.title`)}
                </h3>

                <p className="mt-3 text-[14px] leading-[1.66] text-white/62 transition-colors duration-300 ease-out group-hover:text-white/72 sm:text-[15px]">
                  {t(`items.${item}.description`)}
                </p>
              </div>
            </article>
          ))}
        </div>

        <div className="relative overflow-hidden rounded-[28px] border border-[#8a7030]/28 bg-[radial-gradient(circle_at_top,rgba(212,175,74,0.14),transparent_38%),linear-gradient(180deg,#302712_0%,#211d17_56%,#181612_100%)] px-5 py-9 shadow-[0_28px_70px_rgba(0,0,0,0.24)] sm:rounded-[32px] sm:px-8 sm:py-11">
          <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(241,204,107,0.52),transparent)]" />
          <div className="pointer-events-none absolute left-[-40px] top-[-30px] h-[140px] w-[140px] rounded-full border-[16px] border-[#d4af4a]/90 border-r-transparent border-b-transparent opacity-90 blur-[12px]" />
          <div className="pointer-events-none absolute right-[-54px] top-[-20px] h-[152px] w-[152px] rounded-full border-[16px] border-[#d4af4a]/85 border-l-transparent border-b-transparent opacity-85 blur-[14px]" />
          <div className="relative flex flex-col items-center gap-6 text-center lg:flex-row lg:items-center lg:justify-between lg:gap-8 lg:text-left">
            <div className="max-w-[640px]">
              <h3 className="font-[var(--font-manrope)] text-[24px] font-medium leading-[1.08] tracking-[-0.04em] text-white sm:text-[28px] lg:text-[30px]">
                {t("cta")}
              </h3>

              <p className="mt-3 max-w-[520px] text-[14px] leading-[1.68] text-white/64 sm:text-[15px]">
                {t("ctaDescription")}
              </p>
            </div>

            <LeadModalTrigger
              className="inline-flex min-h-12 w-full items-center justify-center rounded-[12px] bg-[linear-gradient(180deg,#efcb65_0%,#d7b24c_100%)] px-6 py-3 text-center text-[15px] font-semibold text-[#30260d] shadow-[0_18px_30px_rgba(212,175,74,0.22)] transition-all duration-200 ease-out hover:-translate-y-0.5 hover:brightness-110 sm:w-auto sm:min-w-[220px]"
            >
              {t("ctaButton")}
            </LeadModalTrigger>
          </div>
        </div>
      </div>
    </section>
  );
}
