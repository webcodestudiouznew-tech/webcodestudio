import { getTranslations } from "next-intl/server";

type AudienceKey =
  | "service"
  | "medical"
  | "beauty"
  | "auto"
  | "food"
  | "business";

const audienceKeys: AudienceKey[] = [
  "service",
  "medical",
  "beauty",
  "auto",
  "food",
  "business",
];

function AudienceIcon({ type }: { type: AudienceKey }) {
  if (type === "service") {
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
        <path d="M14.5 5.5a3 3 0 0 0-4 4L4 16v4h4l6.5-6.5a3 3 0 0 0 4-4z" />
        <path d="m13 7 4 4" />
      </svg>
    );
  }

  if (type === "medical") {
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
        <rect x="4" y="4" width="16" height="16" rx="4" />
        <path d="M12 8v8" />
        <path d="M8 12h8" />
      </svg>
    );
  }

  if (type === "beauty") {
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
        <path d="M8 4c0 2.5 1.3 4.6 4 6 2.7-1.4 4-3.5 4-6" />
        <path d="M12 10v10" />
        <path d="M8 15h8" />
      </svg>
    );
  }

  if (type === "auto") {
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
        <path d="M5 13 7 8.5A2 2 0 0 1 8.8 7h6.4A2 2 0 0 1 17 8.5l2 4.5" />
        <path d="M4 13h16v4a1 1 0 0 1-1 1h-1" />
        <path d="M6 18H5a1 1 0 0 1-1-1v-4" />
        <circle cx="7.5" cy="16.5" r="1.5" />
        <circle cx="16.5" cy="16.5" r="1.5" />
      </svg>
    );
  }

  if (type === "food") {
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
        <path d="M7 4v8" />
        <path d="M10 4v8" />
        <path d="M7 8h3" />
        <path d="M8.5 12v8" />
        <path d="M16 4c1.7 2 1.7 6 0 8" />
        <path d="M16 12v8" />
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
      <rect x="4" y="7" width="16" height="11" rx="2" />
      <path d="M9 7V5a3 3 0 0 1 6 0v2" />
      <path d="M4 11h16" />
    </svg>
  );
}

export async function AudienceSection({ locale }: { locale: string }) {
  const t = await getTranslations({ locale, namespace: "Audience" });

  return (
    <section
      id="audience"
      className="relative w-full overflow-hidden bg-[linear-gradient(180deg,#23211e_0%,#1f1d1a_100%)] py-16 text-white sm:py-20 lg:py-24"
    >
      <div className="absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(212,175,74,0.5),transparent)]" />
      <div className="absolute left-[-6%] top-[8%] h-[280px] w-[280px] rounded-full bg-[#d4af4a]/10 blur-[120px]" />
      <div className="absolute bottom-[-8%] right-[-4%] h-[320px] w-[320px] rounded-full bg-[#d4af4a]/8 blur-[140px]" />

      <div className="relative z-10 mx-auto flex w-full max-w-[1280px] flex-col gap-10 px-4 sm:px-6 lg:gap-14 lg:px-0">
        <div className="flex max-w-[760px] flex-col items-start lg:max-w-[1040px]">
          <span className="inline-flex rounded-full border border-[#7f6930] bg-[#342f25]/58 px-4 py-2 text-[12px] font-medium tracking-[0.02em] text-[#f1d67e] shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]">
            {t("eyebrow")}
          </span>

          <h2 className="mt-5 max-w-[16ch] font-[var(--font-manrope)] text-[38px] font-semibold leading-[1.02] tracking-[-0.05em] text-white lg:max-w-none lg:whitespace-nowrap lg:text-[38px]">
            {t("title")}
          </h2>

          <p className="mt-5 max-w-[620px] text-[16px] leading-[1.68] text-white/72 lg:max-w-[980px] lg:text-[18px]">
            {t.rich("description", {
              brand: (chunks) => <span className="text-[#d4af4a]">{chunks}</span>,
            })}
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {audienceKeys.map((item, index) => (
            <article
              key={item}
              className="flex h-full flex-col rounded-[22px] border border-white/8 bg-[linear-gradient(180deg,rgba(255,255,255,0.04)_0%,rgba(255,255,255,0.02)_100%)] px-5 py-5 shadow-[0_18px_40px_rgba(0,0,0,0.16)] backdrop-blur-[10px]"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[14px] bg-[linear-gradient(180deg,rgba(239,203,101,0.18)_0%,rgba(215,178,76,0.08)_100%)] text-[#efcb65] shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]">
                  <AudienceIcon type={item} />
                </div>

                <span className="text-[13px] font-medium tracking-[-0.02em] text-white/34">
                  {String(index + 1).padStart(2, "0")}
                </span>
              </div>

              <div className="mt-5 flex flex-1 flex-col">
                <h3 className="max-w-[18ch] font-[var(--font-manrope)] text-[20px] font-semibold leading-[1.1] tracking-[-0.04em] text-white">
                  {t(`items.${item}.title`)}
                </h3>

                <p
                  className={`mt-3 text-[14px] leading-[1.66] text-white/62 sm:text-[15px] ${
                    item === "auto" || item === "business" ? "flex-1" : ""
                  }`}
                >
                  {t(`items.${item}.description`)}
                </p>

                <button
                  type="button"
                  className="mt-4 inline-flex items-center gap-1.5 self-start rounded-[10px] border border-white/8 bg-white/[0.03] px-3 py-2 text-[13px] font-medium text-white/62 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] transition-all duration-200 ease-out hover:-translate-y-0.5 hover:border-[#7a6732] hover:bg-[#302c25]/58 hover:text-[#ebcf7d]"
                >
                  <span>{t("cta")}</span>
                  <svg
                    viewBox="0 0 20 20"
                    className="h-3.5 w-3.5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M4 10h12" />
                    <path d="m11 5 5 5-5 5" />
                  </svg>
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
