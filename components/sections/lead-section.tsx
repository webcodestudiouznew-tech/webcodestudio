import { getTranslations } from "next-intl/server";
import { LeadForm } from "@/components/sections/lead-form";
import { TrackedContactLink } from "@/components/shared/tracked-contact-link";
import { contactLinks } from "@/lib/contact-links";

export async function LeadSection({ locale }: { locale: string }) {
  const t = await getTranslations({ locale, namespace: "LeadSection" });

  return (
    <section
      id="lead"
      className="relative w-full overflow-hidden bg-[linear-gradient(180deg,#100e0c_0%,#0b0907_100%)] py-16 text-white sm:py-20 lg:py-24"
    >
      <div className="absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(212,175,74,0.34),transparent)]" />
      <div className="absolute left-[-5%] top-[8%] h-[300px] w-[300px] rounded-full bg-[#d4af4a]/8 blur-[140px]" />
      <div className="absolute bottom-[-12%] right-[-4%] h-[320px] w-[320px] rounded-full bg-[#d4af4a]/7 blur-[160px]" />

      <div className="relative z-10 mx-auto grid w-full max-w-[1280px] items-stretch gap-8 px-4 sm:px-6 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:gap-10 lg:px-0">
        <div className="hidden h-full flex-col rounded-[28px] border border-[#8a7030]/20 bg-[radial-gradient(circle_at_top,rgba(212,175,74,0.14),transparent_38%),linear-gradient(180deg,rgba(255,255,255,0.045)_0%,rgba(255,255,255,0.015)_100%)] p-6 shadow-[0_28px_70px_rgba(0,0,0,0.22)] sm:p-8 lg:flex">
          <span className="inline-flex w-fit rounded-full border border-[#8a7030]/40 bg-[#efcb65]/10 px-3 py-1 text-[12px] font-semibold uppercase tracking-[0.14em] text-[#f3d986]">
            {t("eyebrow")}
          </span>

          <h2 className="mt-5 font-[var(--font-manrope)] text-[32px] font-medium leading-[1.06] tracking-[-0.04em] text-white sm:text-[40px] lg:text-[44px]">
            {t("title")}
          </h2>

          <p className="mt-5 w-full text-[15px] leading-[1.72] text-white/68 sm:text-[16px]">
            {t("description")}
          </p>

          <div className="mt-auto pt-8 flex flex-col gap-3">
            <TrackedContactLink
              href={contactLinks.telegramUrl}
              eventName="telegram_click"
              eventPayload={{ section: "lead" }}
              target="_blank"
              rel="noreferrer"
              className="inline-flex min-h-12 w-full items-center justify-center rounded-[14px] border border-white/10 bg-white/[0.03] px-5 py-3 text-center text-[15px] font-semibold text-white/88 transition-all duration-200 ease-out hover:-translate-y-0.5 hover:border-[#8a7030]/60 hover:text-white"
            >
              {t("cta.telegram")}
            </TrackedContactLink>

            <TrackedContactLink
              href={contactLinks.whatsappUrl}
              eventName="whatsapp_click"
              eventPayload={{ section: "lead" }}
              target="_blank"
              rel="noreferrer"
              className="inline-flex min-h-12 w-full items-center justify-center rounded-[14px] bg-[linear-gradient(180deg,#efcb65_0%,#d7b24c_100%)] px-5 py-3 text-center text-[15px] font-semibold text-[#30260d] shadow-[0_18px_30px_rgba(212,175,74,0.18)] transition-all duration-200 ease-out hover:-translate-y-0.5 hover:brightness-110"
            >
              {t("cta.whatsapp")}
            </TrackedContactLink>
          </div>
        </div>

        <LeadForm
          locale={locale}
          copy={{
            formTitle: t("form.title"),
            formDescription: t("form.description"),
            fields: {
              name: t("form.fields.name"),
              phone: t("form.fields.phone"),
              telegram: t("form.fields.telegram"),
              niche: t("form.fields.niche"),
            },
            placeholders: {
              name: t("form.placeholders.name"),
              phone: t("form.placeholders.phone"),
              telegram: t("form.placeholders.telegram"),
              niche: t("form.placeholders.niche"),
            },
            helper: {
              required: t("form.helper.required"),
              optional: t("form.helper.optional"),
            },
            button: {
              idle: t("form.button.idle"),
              pending: t("form.button.pending"),
            },
            success: {
              title: t("form.success.title"),
              description: t("form.success.description"),
            },
            modal: {
              close: t("form.modal.close"),
              errorTitle: t("form.modal.errorTitle"),
            },
            errors: {
              requiredName: t("form.errors.requiredName"),
              requiredPhone: t("form.errors.requiredPhone"),
              invalidPhone: t("form.errors.invalidPhone"),
              submitFailed: t("form.errors.submitFailed"),
            },
          }}
        />
      </div>
    </section>
  );
}
