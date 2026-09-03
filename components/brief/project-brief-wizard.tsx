"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useMemo, useRef, useState, useTransition } from "react";
import { submitProjectBrief } from "@/app/actions/project-brief";
import {
  defaultBriefAnswers,
  type BriefAnswers,
  type PackageCandidate,
} from "@/lib/brief/brief-schema";
import { contactLinks, getWhatsAppUrl } from "@/lib/contact-links";
import { getLocalizedPath, type SiteLocale } from "@/lib/seo";
import { trackEvent } from "@/lib/analytics";
import { usePathname, useRouter } from "@/i18n/navigation";

const DRAFT_KEY = "webcode:project-brief:v1";
const LOGO_SRC = "/logo_new_2.png?v=20260319";

type OptionCopy = Record<string, string>;

type BriefWizardCopy = {
  header: {
    tagline: string;
    backToSite: string;
  };
  locale: {
    label: string;
  };
  welcome: {
    eyebrow: string;
    title: string;
    description: string;
    duration: string;
    start: string;
  };
  progress: {
    step: string;
    of: string;
  };
  navigation: {
    back: string;
    next: string;
    submit: string;
    submitting: string;
  };
  success: {
    eyebrow: string;
    title: string;
    description: string;
    telegram: string;
    whatsapp: string;
    backToSite: string;
  };
  errors: {
    required: string;
    requiredChoice: string;
    maxTwo: string;
    invalidPhone: string;
    invalidUrl: string;
    invalidDate: string;
    privacy: string;
    submitFailed: string;
  };
  steps: Record<
    string,
    {
      eyebrow: string;
      title: string;
      description: string;
    }
  >;
  fields: Record<
    string,
    {
      label: string;
      placeholder?: string;
      helper?: string;
      action?: string;
    }
  >;
  options: Record<string, OptionCopy>;
};

type ProjectBriefWizardProps = {
  locale: SiteLocale;
  copy: BriefWizardCopy;
  initialAnswers: Partial<BriefAnswers>;
  queryContext: {
    leadId?: string;
    source?: string;
    utm: {
      source?: string;
      medium?: string;
      campaign?: string;
    };
  };
};

type StepKey =
  | "business"
  | "goals"
  | "offer"
  | "audience"
  | "proof"
  | "scope"
  | "timing"
  | "contacts";

type FieldConfig = {
  id: keyof BriefAnswers;
  type: "text" | "textarea" | "cards-single" | "cards-multi" | "checkbox";
  optionsKey?: string;
  required?: boolean;
  max?: number;
};

const steps: Array<{ key: StepKey; fields: FieldConfig[] }> = [
  {
    key: "business",
    fields: [
      { id: "company_name", type: "text", required: true },
      { id: "business_description", type: "textarea", required: true },
      { id: "current_links", type: "textarea" },
    ],
  },
  {
    key: "goals",
    fields: [
      {
        id: "site_goals",
        type: "cards-multi",
        optionsKey: "site_goals",
        required: true,
        max: 2,
      },
      {
        id: "primary_action",
        type: "cards-single",
        optionsKey: "primary_action",
        required: true,
      },
    ],
  },
  {
    key: "offer",
    fields: [
      { id: "offer_description", type: "textarea", required: true },
      {
        id: "service_count",
        type: "cards-single",
        optionsKey: "service_count",
        required: true,
      },
    ],
  },
  {
    key: "audience",
    fields: [
      { id: "audience_description", type: "textarea", required: true },
      { id: "geography", type: "cards-multi", optionsKey: "geography" },
      { id: "differentiators", type: "textarea" },
      { id: "needs_positioning_help", type: "checkbox" },
    ],
  },
  {
    key: "proof",
    fields: [
      { id: "proof_assets", type: "cards-multi", optionsKey: "proof_assets" },
      {
        id: "available_materials",
        type: "cards-multi",
        optionsKey: "available_materials",
      },
      { id: "materials_url", type: "textarea" },
    ],
  },
  {
    key: "scope",
    fields: [
      {
        id: "scope_preference",
        type: "cards-single",
        optionsKey: "scope_preference",
        required: true,
      },
      {
        id: "extra_features",
        type: "cards-multi",
        optionsKey: "extra_features",
      },
      {
        id: "launch_languages",
        type: "cards-multi",
        optionsKey: "launch_languages",
        required: true,
      },
    ],
  },
  {
    key: "timing",
    fields: [
      { id: "reference_sites", type: "textarea" },
      { id: "competitor_sites", type: "textarea" },
      {
        id: "desired_timeline",
        type: "cards-single",
        optionsKey: "desired_timeline",
      },
      { id: "additional_notes", type: "textarea" },
    ],
  },
  {
    key: "contacts",
    fields: [
      { id: "contact_name", type: "text", required: true },
      { id: "phone", type: "text", required: true },
      { id: "telegram", type: "text" },
      {
        id: "preferred_contact",
        type: "cards-single",
        optionsKey: "preferred_contact",
      },
      { id: "privacy_consent", type: "checkbox", required: true },
    ],
  },
];

function createBriefId() {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }

  return `brief_${Date.now()}_${Math.random().toString(36).slice(2, 10)}`;
}

function mergeAnswers(initialAnswers: Partial<BriefAnswers>) {
  return {
    ...defaultBriefAnswers,
    ...initialAnswers,
    site_goals: initialAnswers.site_goals ?? defaultBriefAnswers.site_goals,
    geography: initialAnswers.geography ?? defaultBriefAnswers.geography,
    proof_assets: initialAnswers.proof_assets ?? defaultBriefAnswers.proof_assets,
    available_materials:
      initialAnswers.available_materials ?? defaultBriefAnswers.available_materials,
    extra_features: initialAnswers.extra_features ?? defaultBriefAnswers.extra_features,
    launch_languages:
      initialAnswers.launch_languages ?? defaultBriefAnswers.launch_languages,
  };
}

function isValidUrlList(value: string) {
  const trimmed = value.trim();

  if (!trimmed) {
    return true;
  }

  return trimmed
    .split(/[\n,]+/)
    .map((item) => item.trim())
    .filter(Boolean)
    .every((item) => {
      try {
        new URL(/^https?:\/\//i.test(item) ? item : `https://${item}`);
        return item.includes(".");
      } catch {
        return false;
      }
    });
}

function isValidPhone(value: string) {
  return /^[+\d][\d\s()-]{7,20}$/.test(value.trim());
}

function getStringValue(value: BriefAnswers[keyof BriefAnswers]) {
  return typeof value === "string" ? value : "";
}

export function ProjectBriefWizard({
  locale,
  copy,
  initialAnswers,
  queryContext,
}: ProjectBriefWizardProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [answers, setAnswers] = useState<BriefAnswers>(() =>
    mergeAnswers(initialAnswers),
  );
  const [stepIndex, setStepIndex] = useState(0);
  const [briefId, setBriefId] = useState(() => createBriefId());
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isStarted, setIsStarted] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [packageCandidate, setPackageCandidate] =
    useState<PackageCandidate | null>(null);
  const [isPending, startTransition] = useTransition();
  const hasOpenedRef = useRef(false);
  const currentStep = steps[stepIndex];
  const progress = Math.round(((stepIndex + 1) / steps.length) * 100);

  useEffect(() => {
    if (hasOpenedRef.current) {
      return;
    }

    hasOpenedRef.current = true;
    trackEvent("brief_opened", {
      locale,
      source: queryContext.source || undefined,
    });
  }, [locale, queryContext.source]);

  useEffect(() => {
    const frameId = window.requestAnimationFrame(() => {
      try {
        const draft = window.localStorage.getItem(DRAFT_KEY);

        if (!draft) {
          return;
        }

        const parsed = JSON.parse(draft) as {
          briefId?: string;
          stepIndex?: number;
          isStarted?: boolean;
          answers?: Partial<BriefAnswers>;
        };

        setBriefId(parsed.briefId || createBriefId());
        setStepIndex(
          typeof parsed.stepIndex === "number"
            ? Math.min(Math.max(parsed.stepIndex, 0), steps.length - 1)
            : 0,
        );
        setIsStarted(Boolean(parsed.isStarted));
        setAnswers((current) => mergeAnswers({ ...current, ...parsed.answers }));
      } catch {
        setBriefId(createBriefId());
      }
    });

    return () => window.cancelAnimationFrame(frameId);
  }, []);

  useEffect(() => {
    if (!briefId || isSuccess) {
      return;
    }

    window.localStorage.setItem(
      DRAFT_KEY,
      JSON.stringify({
        briefId,
        stepIndex,
        isStarted,
        answers,
      }),
    );
  }, [answers, briefId, isStarted, isSuccess, stepIndex]);

  useEffect(() => {
    if (!isStarted || isSuccess) {
      return;
    }

    trackEvent("brief_step_viewed", {
      step: currentStep.key,
      step_number: stepIndex + 1,
    });
  }, [currentStep.key, isStarted, isSuccess, stepIndex]);

  const locales = useMemo(
    () => [
      { value: "ru" as const, label: "RU" },
      { value: "uz" as const, label: "UZ" },
      { value: "en" as const, label: "EN" },
    ],
    [],
  );

  function updateAnswer<Key extends keyof BriefAnswers>(
    key: Key,
    value: BriefAnswers[Key],
  ) {
    setAnswers((current) => ({ ...current, [key]: value }));
    setErrors((current) => {
      const next = { ...current };
      delete next[key];
      return next;
    });
  }

  function toggleMulti(key: keyof BriefAnswers, option: string, max?: number) {
    const current = Array.isArray(answers[key]) ? (answers[key] as string[]) : [];
    const selected = current.includes(option);
    const next = selected
      ? current.filter((item) => item !== option)
      : max && current.length >= max
        ? current
        : current.concat(option);

    updateAnswer(key, next as BriefAnswers[keyof BriefAnswers]);
  }

  function validateStep() {
    const nextErrors: Record<string, string> = {};

    currentStep.fields.forEach((field) => {
      const value = answers[field.id];

      if (field.required) {
        if (Array.isArray(value) && value.length === 0) {
          nextErrors[field.id] = copy.errors.requiredChoice;
        } else if (typeof value === "string" && value.trim().length < 2) {
          nextErrors[field.id] = copy.errors.required;
        } else if (typeof value === "boolean" && !value) {
          nextErrors[field.id] = copy.errors.privacy;
        }
      }

      if (field.id === "business_description" && answers.business_description.trim().length < 10) {
        nextErrors[field.id] = copy.errors.required;
      }

      if (field.id === "offer_description" && answers.offer_description.trim().length < 10) {
        nextErrors[field.id] = copy.errors.required;
      }

      if (field.id === "audience_description" && answers.audience_description.trim().length < 10) {
        nextErrors[field.id] = copy.errors.required;
      }

      if (field.id === "site_goals" && answers.site_goals.length > 2) {
        nextErrors[field.id] = copy.errors.maxTwo;
      }

      if (field.id === "phone" && answers.phone && !isValidPhone(answers.phone)) {
        nextErrors[field.id] = copy.errors.invalidPhone;
      }

      if (
        (field.id === "current_links" || field.id === "materials_url") &&
        !isValidUrlList(getStringValue(value))
      ) {
        nextErrors[field.id] = copy.errors.invalidUrl;
      }
    });

    if (
      currentStep.key === "timing" &&
      answers.desired_timeline === "specific_date" &&
      !/^\d{4}-\d{2}-\d{2}$/.test(answers.desired_launch_date || "")
    ) {
      nextErrors.desired_launch_date = copy.errors.invalidDate;
    }

    setErrors(nextErrors);

    if (Object.keys(nextErrors).length) {
      trackEvent("brief_validation_error", {
        step: currentStep.key,
        fields: Object.keys(nextErrors),
      });
      return false;
    }

    return true;
  }

  function handleStart() {
    setIsStarted(true);
    trackEvent("brief_started", {
      locale,
      source: queryContext.source || undefined,
    });
  }

  function handleNext() {
    if (!validateStep()) {
      return;
    }

    trackEvent("brief_step_completed", {
      step: currentStep.key,
      step_number: stepIndex + 1,
    });

    setStepIndex((current) => Math.min(current + 1, steps.length - 1));
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function handleBack() {
    setStepIndex((current) => Math.max(current - 1, 0));
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function handleSubmit() {
    if (!validateStep()) {
      return;
    }

    startTransition(async () => {
      const result = await submitProjectBrief({
        brief_id: briefId || createBriefId(),
        lead_id: queryContext.leadId || "",
        locale,
        source: queryContext.source || "",
        utm: queryContext.utm,
        referrer: document.referrer,
        answers,
      });

      if (!result.ok) {
        setErrors({ submit: copy.errors.submitFailed });
        trackEvent("brief_submit_failed", {
          reason: result.error,
          step: currentStep.key,
        });
        return;
      }

      setPackageCandidate(result.packageCandidate as PackageCandidate);
      setIsSuccess(true);
      window.localStorage.removeItem(DRAFT_KEY);
      trackEvent("brief_completed", {
        destination: result.destination,
        package_candidate: result.packageCandidate,
        telegram_alert: result.telegramAlert,
      });
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  function switchLocale(nextLocale: SiteLocale) {
    if (nextLocale === locale) {
      return;
    }

    trackEvent("brief_language_changed", {
      from: locale,
      to: nextLocale,
    });
    router.replace(pathname, { locale: nextLocale, scroll: false });
  }

  function renderField(field: FieldConfig) {
    const fieldCopy = copy.fields[field.id];
    const error = errors[field.id];

    if (field.type === "text" || field.type === "textarea") {
      const InputTag = field.type === "textarea" ? "textarea" : "input";

      return (
        <label key={field.id} className="block">
          <span className="text-[14px] font-semibold text-white/84">
            {fieldCopy.label}
            {field.required ? <span className="ml-1 text-[#efcb65]">*</span> : null}
          </span>
          {fieldCopy.helper ? (
            <span className="mt-1 block text-[13px] leading-[1.55] text-white/48">
              {fieldCopy.helper}
            </span>
          ) : null}
          <InputTag
            value={getStringValue(answers[field.id])}
            onChange={(event) =>
              updateAnswer(field.id, event.target.value as BriefAnswers[keyof BriefAnswers])
            }
            className={`mt-3 w-full rounded-[18px] border bg-[#12100e]/82 px-4 text-[15px] leading-[1.55] text-white outline-none transition-colors duration-200 placeholder:text-white/28 focus:border-[#8a7030]/78 ${
              field.type === "textarea" ? "min-h-[128px] py-3 resize-y" : "h-12"
            } ${error ? "border-[#9d4a43]" : "border-white/10"}`}
            placeholder={fieldCopy.placeholder}
            autoComplete={
              field.id === "contact_name"
                ? "name"
                : field.id === "phone"
                  ? "tel"
                  : "off"
            }
          />
          {error ? <p className="mt-2 text-[12px] text-[#f2a8a8]">{error}</p> : null}
        </label>
      );
    }

    if (field.type === "checkbox") {
      if (field.id === "privacy_consent") {
        return (
          <label
            key={field.id}
            className={`flex cursor-pointer items-start gap-3 rounded-[18px] border p-4 transition-colors ${
              errors[field.id]
                ? "border-[#9d4a43] bg-[#351916]/40"
                : "border-white/10 bg-white/[0.03]"
            }`}
          >
            <input
              type="checkbox"
              checked={Boolean(answers.privacy_consent)}
              onChange={(event) =>
                updateAnswer("privacy_consent", event.target.checked)
              }
              className="mt-1 h-4 w-4 shrink-0 accent-[#efcb65]"
            />
            <span className="text-[13px] leading-[1.65] text-white/72">
              {fieldCopy.label}{" "}
              <Link
                href={getLocalizedPath(locale, "/privacy-policy")}
                target="_blank"
                className="font-semibold text-[#efcb65] underline underline-offset-4"
              >
                {fieldCopy.action}
              </Link>
              {errors[field.id] ? (
                <span className="mt-2 block text-[12px] text-[#f2a8a8]">
                  {errors[field.id]}
                </span>
              ) : null}
            </span>
          </label>
        );
      }

      return (
        <label
          key={field.id}
          className="flex cursor-pointer items-center gap-3 rounded-[18px] border border-white/10 bg-white/[0.03] p-4"
        >
          <input
            type="checkbox"
            checked={Boolean(answers[field.id])}
            onChange={(event) =>
              updateAnswer(field.id, event.target.checked as BriefAnswers[keyof BriefAnswers])
            }
            className="h-4 w-4 accent-[#efcb65]"
          />
          <span className="text-[14px] font-semibold text-white/78">
            {fieldCopy.action || fieldCopy.label}
          </span>
        </label>
      );
    }

    const options = copy.options[field.optionsKey || field.id] || {};
    const selectedValues = Array.isArray(answers[field.id])
      ? (answers[field.id] as string[])
      : [answers[field.id] as string].filter(Boolean);

    return (
      <fieldset key={field.id} className="block">
        <legend className="text-[14px] font-semibold text-white/84">
          {fieldCopy.label}
          {field.required ? <span className="ml-1 text-[#efcb65]">*</span> : null}
        </legend>
        {fieldCopy.helper ? (
          <p className="mt-1 text-[13px] leading-[1.55] text-white/48">
            {fieldCopy.helper}
          </p>
        ) : null}
        <div className="mt-3 grid gap-3 sm:grid-cols-2">
          {Object.entries(options).map(([value, label]) => {
            const selected = selectedValues.includes(value);

            return (
              <button
                key={value}
                type="button"
                onClick={() => {
                  if (field.type === "cards-single") {
                    updateAnswer(
                      field.id,
                      value as BriefAnswers[keyof BriefAnswers],
                    );
                    if (field.id === "desired_timeline" && value !== "specific_date") {
                      updateAnswer("desired_launch_date", "");
                    }
                    return;
                  }

                  toggleMulti(field.id, value, field.max);
                }}
                className={`min-h-[58px] rounded-[18px] border px-4 py-3 text-left text-[14px] font-semibold leading-[1.35] transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#efcb65]/50 ${
                  selected
                    ? "border-[#efcb65]/75 bg-[#efcb65]/12 text-[#f6df92] shadow-[0_14px_34px_rgba(212,175,74,0.12)]"
                    : "border-white/10 bg-white/[0.035] text-white/74 hover:border-[#8a7030]/54 hover:text-white"
                }`}
              >
                {label}
              </button>
            );
          })}
        </div>
        {field.id === "desired_timeline" &&
        answers.desired_timeline === "specific_date" ? (
          <label className="mt-4 block">
            <span className="text-[13px] font-semibold text-white/72">
              {copy.fields.desired_launch_date.label}
            </span>
            <input
              type="date"
              value={answers.desired_launch_date}
              onChange={(event) =>
                updateAnswer("desired_launch_date", event.target.value)
              }
              className={`mt-2 h-12 w-full rounded-[18px] border bg-[#12100e]/82 px-4 text-[15px] text-white outline-none focus:border-[#8a7030]/78 ${
                errors.desired_launch_date ? "border-[#9d4a43]" : "border-white/10"
              }`}
            />
            {errors.desired_launch_date ? (
              <p className="mt-2 text-[12px] text-[#f2a8a8]">
                {errors.desired_launch_date}
              </p>
            ) : null}
          </label>
        ) : null}
        {error ? <p className="mt-2 text-[12px] text-[#f2a8a8]">{error}</p> : null}
      </fieldset>
    );
  }

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top_right,rgba(212,175,74,0.18),transparent_32%),linear-gradient(180deg,#1d1a16_0%,#0d0b09_100%)] text-white">
      <header className="mx-auto flex w-full max-w-[1120px] items-center justify-between gap-4 px-4 py-5 sm:px-6">
        <Link href={getLocalizedPath(locale)} className="flex min-w-0 items-center gap-2.5">
          <Image
            src={LOGO_SRC}
            alt="WebCode studio"
            width={40}
            height={40}
            className="h-9 w-9 shrink-0 object-contain"
            priority
          />
          <span className="min-w-0">
            <span className="block font-[var(--font-manrope)] text-[17px] font-semibold tracking-[-0.04em]">
              WebCode
            </span>
            <span className="block truncate text-[11px] text-white/48">
              {copy.header.tagline}
            </span>
          </span>
        </Link>

        <div className="flex shrink-0 items-center gap-2" aria-label={copy.locale.label}>
          {locales.map((item) => (
            <button
              key={item.value}
              type="button"
              onClick={() => switchLocale(item.value)}
              className={`h-9 min-w-10 rounded-[10px] px-2 text-[12px] font-semibold transition-colors ${
                item.value === locale
                  ? "bg-[#efcb65] text-[#30260d]"
                  : "border border-white/10 bg-white/[0.03] text-white/72 hover:text-white"
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </header>

      <section className="mx-auto flex w-full max-w-[1120px] flex-col px-4 pb-12 pt-4 sm:px-6 lg:pb-16">
        {!isStarted ? (
          <div className="grid min-h-[calc(100svh-140px)] items-center gap-8 lg:grid-cols-[minmax(0,1fr)_360px]">
            <div>
              <span className="inline-flex rounded-full border border-[#8a7030]/38 bg-[#efcb65]/10 px-4 py-2 text-[12px] font-semibold uppercase tracking-[0.08em] text-[#efcb65]">
                {copy.welcome.eyebrow}
              </span>
              <h1 className="mt-5 max-w-[760px] font-[var(--font-manrope)] text-[40px] font-semibold leading-[1.02] tracking-[-0.055em] text-white sm:text-[58px] lg:text-[72px]">
                {copy.welcome.title}
              </h1>
              <p className="mt-5 max-w-[680px] text-[16px] leading-[1.72] text-white/68 sm:text-[18px]">
                {copy.welcome.description}
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <button
                  type="button"
                  onClick={handleStart}
                  className="inline-flex min-h-12 items-center justify-center rounded-[14px] bg-[linear-gradient(180deg,#efcb65_0%,#d7b24c_100%)] px-7 py-3 text-[15px] font-semibold text-[#30260d] transition-all duration-200 hover:-translate-y-0.5 hover:brightness-110"
                >
                  {copy.welcome.start}
                </button>
                <Link
                  href={getLocalizedPath(locale)}
                  className="inline-flex min-h-12 items-center justify-center rounded-[14px] border border-white/10 bg-white/[0.03] px-7 py-3 text-[15px] font-semibold text-white/78 transition-all duration-200 hover:border-[#8a7030]/60 hover:text-white"
                >
                  {copy.header.backToSite}
                </Link>
              </div>
            </div>
            <div className="rounded-[28px] border border-[#8a7030]/24 bg-white/[0.035] p-6 shadow-[0_30px_80px_rgba(0,0,0,0.24)]">
              <p className="text-[13px] font-semibold uppercase tracking-[0.08em] text-[#efcb65]">
                {copy.welcome.duration}
              </p>
              <div className="mt-5 grid gap-3">
                {steps.map((step, index) => (
                  <div
                    key={step.key}
                    className="flex items-center gap-3 rounded-[16px] border border-white/8 bg-white/[0.025] px-4 py-3"
                  >
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#efcb65]/12 text-[12px] font-semibold text-[#efcb65]">
                      {index + 1}
                    </span>
                    <span className="text-[14px] font-medium text-white/72">
                      {copy.steps[step.key].title}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : isSuccess ? (
          <div className="mx-auto flex min-h-[calc(100svh-140px)] w-full max-w-[760px] flex-col items-center justify-center text-center">
            <span className="inline-flex rounded-full border border-[#8a7030]/38 bg-[#efcb65]/10 px-4 py-2 text-[12px] font-semibold uppercase tracking-[0.08em] text-[#efcb65]">
              {copy.success.eyebrow}
            </span>
            <h1 className="mt-5 font-[var(--font-manrope)] text-[40px] font-semibold leading-[1.04] tracking-[-0.055em] sm:text-[58px]">
              {copy.success.title}
            </h1>
            <p className="mt-5 max-w-[640px] text-[16px] leading-[1.72] text-white/68 sm:text-[18px]">
              {copy.success.description}
            </p>
            {packageCandidate ? (
              <span className="sr-only">{packageCandidate}</span>
            ) : null}
            <div className="mt-8 flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
              <a
                href={contactLinks.telegramUrl}
                target="_blank"
                rel="noreferrer"
                onClick={() =>
                  trackEvent("telegram_click", { section: "brief_success" })
                }
                className="inline-flex min-h-12 items-center justify-center rounded-[14px] bg-[linear-gradient(180deg,#efcb65_0%,#d7b24c_100%)] px-6 py-3 text-[15px] font-semibold text-[#30260d]"
              >
                {copy.success.telegram}
              </a>
              <a
                href={getWhatsAppUrl(locale)}
                target="_blank"
                rel="noreferrer"
                onClick={() =>
                  trackEvent("whatsapp_click", { section: "brief_success" })
                }
                className="inline-flex min-h-12 items-center justify-center rounded-[14px] border border-white/10 bg-white/[0.03] px-6 py-3 text-[15px] font-semibold text-white/78"
              >
                {copy.success.whatsapp}
              </a>
              <Link
                href={getLocalizedPath(locale)}
                className="inline-flex min-h-12 items-center justify-center rounded-[14px] border border-white/10 bg-white/[0.03] px-6 py-3 text-[15px] font-semibold text-white/78"
              >
                {copy.success.backToSite}
              </Link>
            </div>
          </div>
        ) : (
          <div className="mx-auto grid w-full max-w-[980px] gap-6">
            <div className="rounded-[28px] border border-white/10 bg-white/[0.035] p-5 shadow-[0_26px_70px_rgba(0,0,0,0.2)] sm:p-6">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-[12px] font-semibold uppercase tracking-[0.08em] text-[#efcb65]">
                    {copy.progress.step} {stepIndex + 1} {copy.progress.of} {steps.length}
                  </p>
                  <h1 className="mt-2 font-[var(--font-manrope)] text-[32px] font-semibold leading-[1.06] tracking-[-0.045em] sm:text-[44px]">
                    {copy.steps[currentStep.key].title}
                  </h1>
                  <p className="mt-3 max-w-[700px] text-[15px] leading-[1.68] text-white/62">
                    {copy.steps[currentStep.key].description}
                  </p>
                </div>
                <span className="text-[13px] font-semibold text-white/44">
                  {progress}%
                </span>
              </div>
              <div className="mt-5 h-2 overflow-hidden rounded-full bg-white/8">
                <div
                  className="h-full rounded-full bg-[linear-gradient(90deg,#efcb65,#f7e39d)] transition-[width] duration-300"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>

            <div className="rounded-[28px] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.05)_0%,rgba(255,255,255,0.02)_100%)] p-5 shadow-[0_30px_90px_rgba(0,0,0,0.26)] sm:p-7">
              <div className="grid gap-6">
                {currentStep.fields.map(renderField)}
              </div>

              {errors.submit ? (
                <p className="mt-5 rounded-[16px] border border-[#9d4a43]/50 bg-[#351916]/42 p-4 text-[14px] leading-[1.55] text-[#f2a8a8]">
                  {errors.submit}
                </p>
              ) : null}

              <div className="mt-8 flex flex-col-reverse gap-3 sm:flex-row sm:justify-between">
                <button
                  type="button"
                  onClick={handleBack}
                  disabled={stepIndex === 0 || isPending}
                  className="inline-flex min-h-12 items-center justify-center rounded-[14px] border border-white/10 bg-white/[0.03] px-6 py-3 text-[15px] font-semibold text-white/72 transition-colors hover:text-white disabled:cursor-not-allowed disabled:opacity-40"
                >
                  {copy.navigation.back}
                </button>
                <button
                  type="button"
                  onClick={
                    stepIndex === steps.length - 1 ? handleSubmit : handleNext
                  }
                  disabled={isPending}
                  className="inline-flex min-h-12 items-center justify-center rounded-[14px] bg-[linear-gradient(180deg,#efcb65_0%,#d7b24c_100%)] px-7 py-3 text-[15px] font-semibold text-[#30260d] transition-all duration-200 hover:-translate-y-0.5 hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {isPending
                    ? copy.navigation.submitting
                    : stepIndex === steps.length - 1
                      ? copy.navigation.submit
                      : copy.navigation.next}
                </button>
              </div>
            </div>
          </div>
        )}
      </section>
    </main>
  );
}
