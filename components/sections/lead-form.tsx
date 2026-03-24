"use client";

import { useEffect, useRef, useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { submitLeadForm } from "@/app/actions/lead-form";
import { trackEvent } from "@/lib/analytics";

const leadFormSchema = z.object({
  name: z.string().trim().min(2),
  phone: z.string().trim().regex(/^[+\d][\d\s()-]{7,20}$/),
  telegram: z.string().trim().max(120).optional().or(z.literal("")),
  niche: z.string().trim().max(160).optional().or(z.literal("")),
});

type LeadFormValues = z.infer<typeof leadFormSchema>;

export type LeadFormCopy = {
  formTitle: string;
  formDescription: string;
  fields: {
    name: string;
    phone: string;
    telegram: string;
    niche: string;
  };
  placeholders: {
    name: string;
    phone: string;
    telegram: string;
    niche: string;
  };
  helper: {
    required: string;
    optional: string;
  };
  button: {
    idle: string;
    pending: string;
  };
  success: {
    title: string;
    description: string;
  };
  modal: {
    close: string;
    errorTitle: string;
    openTitle: string;
  };
  errors: {
    requiredName: string;
    requiredPhone: string;
    invalidPhone: string;
    submitFailed: string;
  };
};

type LeadFormProps = {
  locale: string;
  copy: LeadFormCopy;
  trackingSection?: string;
  trackOnMount?: boolean;
  onStatusClose?: () => void;
  selectedTariff?: string | null;
};

function FieldError({ message }: { message?: string }) {
  if (!message) {
    return null;
  }

  return <p className="mt-2 text-[12px] leading-[1.45] text-[#f2a8a8]">{message}</p>;
}

export function LeadForm({
  locale,
  copy,
  trackingSection = "lead",
  trackOnMount = false,
  onStatusClose,
  selectedTariff,
}: LeadFormProps) {
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [statusModal, setStatusModal] = useState<"success" | "error" | null>(
    null,
  );
  const [isPending, startTransition] = useTransition();
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const hasTrackedViewRef = useRef(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setError,
  } = useForm<LeadFormValues>({
    resolver: zodResolver(leadFormSchema),
    defaultValues: {
      name: "",
      phone: "",
      telegram: "",
      niche: "",
    },
  });

  useEffect(() => {
    if (trackOnMount && !hasTrackedViewRef.current) {
      hasTrackedViewRef.current = true;
      trackEvent("form_view", { section: trackingSection });
      return;
    }

    const sectionNode = sectionRef.current;

    if (!sectionNode || hasTrackedViewRef.current) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;

        if (!entry?.isIntersecting || hasTrackedViewRef.current) {
          return;
        }

        hasTrackedViewRef.current = true;
        trackEvent("form_view", { section: trackingSection });
        observer.disconnect();
      },
      { threshold: 0.35 },
    );

    observer.observe(sectionNode);

    return () => observer.disconnect();
  }, [trackOnMount, trackingSection]);

  const onSubmit = handleSubmit((values) => {
    setSubmitError(null);

    startTransition(async () => {
      trackEvent("form_submit", { section: trackingSection });

      try {
        const result = await submitLeadForm({
          locale,
          tariff: selectedTariff ?? "",
          ...values,
        });

        if (!result.ok) {
          if (result.fieldErrors?.name?.length) {
            setError("name", {
              type: "server",
              message: copy.errors.requiredName,
            });
          }

          if (result.fieldErrors?.phone?.length) {
            setError("phone", {
              type: "server",
              message: copy.errors.invalidPhone,
            });
          }

          setSubmitError(
            result.fieldErrors?.name?.length || result.fieldErrors?.phone?.length
              ? null
              : copy.errors.submitFailed,
          );
          return;
        }

        trackEvent("form_success", {
          section: trackingSection,
          destination: result.destination,
        });
        setStatusModal("success");
        reset();
      } catch {
        setSubmitError(copy.errors.submitFailed);
        setStatusModal("error");
      }
    });
  });

  return (
    <div ref={sectionRef} className="relative h-full">
      <div className="flex h-full flex-col rounded-[26px] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.06)_0%,rgba(255,255,255,0.02)_100%)] p-5 shadow-[0_24px_56px_rgba(0,0,0,0.18)] backdrop-blur-xl sm:rounded-[30px] sm:p-7">
        <div className="pointer-events-none absolute inset-x-6 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(241,204,107,0.42),transparent)]" />

        <div>
          <h3 className="font-[var(--font-manrope)] text-[24px] font-medium leading-[1.08] tracking-[-0.04em] text-white sm:text-[27px]">
            {copy.formTitle}
          </h3>
          <p className="mt-3 max-w-[48ch] text-[14px] leading-[1.68] text-white/62 sm:text-[15px]">
            {copy.formDescription}
          </p>
        </div>

        <form onSubmit={onSubmit} className="mt-6 grid gap-4">
          <label className="block">
            <span className="text-[13px] font-medium text-white/76">
              {copy.fields.name}{" "}
              <span className="text-[#efcb65]">{copy.helper.required}</span>
            </span>
            <input
              {...register("name", {
                required: copy.errors.requiredName,
              })}
              autoComplete="name"
              className="mt-2 h-12 w-full rounded-[14px] border border-white/10 bg-[#12100e]/82 px-4 text-[15px] text-white outline-none transition-colors duration-200 placeholder:text-white/28 focus:border-[#8a7030]/70"
              placeholder={copy.placeholders.name}
            />
            <FieldError
              message={errors.name ? copy.errors.requiredName : undefined}
            />
          </label>

          <label className="block">
            <span className="text-[13px] font-medium text-white/76">
              {copy.fields.phone}{" "}
              <span className="text-[#efcb65]">{copy.helper.required}</span>
            </span>
            <input
              {...register("phone", {
                required: copy.errors.requiredPhone,
              })}
              autoComplete="tel"
              className="mt-2 h-12 w-full rounded-[14px] border border-white/10 bg-[#12100e]/82 px-4 text-[15px] text-white outline-none transition-colors duration-200 placeholder:text-white/28 focus:border-[#8a7030]/70"
              placeholder={copy.placeholders.phone}
            />
            <FieldError
              message={
                errors.phone
                  ? errors.phone.type === "required"
                    ? copy.errors.requiredPhone
                    : copy.errors.invalidPhone
                  : undefined
              }
            />
          </label>

          <label className="block">
            <span className="text-[13px] font-medium text-white/76">
              {copy.fields.telegram}{" "}
              <span className="text-white/34">{copy.helper.optional}</span>
            </span>
            <input
              {...register("telegram")}
              autoComplete="off"
              className="mt-2 h-12 w-full rounded-[14px] border border-white/10 bg-[#12100e]/82 px-4 text-[15px] text-white outline-none transition-colors duration-200 placeholder:text-white/28 focus:border-[#8a7030]/70"
              placeholder={copy.placeholders.telegram}
            />
          </label>

          <label className="block">
            <span className="text-[13px] font-medium text-white/76">
              {copy.fields.niche}{" "}
              <span className="text-white/34">{copy.helper.optional}</span>
            </span>
            <input
              {...register("niche")}
              autoComplete="organization-title"
              className="mt-2 h-12 w-full rounded-[14px] border border-white/10 bg-[#12100e]/82 px-4 text-[15px] text-white outline-none transition-colors duration-200 placeholder:text-white/28 focus:border-[#8a7030]/70"
              placeholder={copy.placeholders.niche}
            />
          </label>

          <button
            type="submit"
            disabled={isPending}
            className="mt-2 inline-flex min-h-12 items-center justify-center rounded-[14px] bg-[linear-gradient(180deg,#efcb65_0%,#d7b24c_100%)] px-6 py-3 text-[15px] font-semibold text-[#30260d] shadow-[0_18px_30px_rgba(212,175,74,0.2)] transition-all duration-200 ease-out hover:-translate-y-0.5 hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {isPending ? copy.button.pending : copy.button.idle}
          </button>
        </form>
      </div>

      {statusModal ? (
        <div className="absolute inset-0 z-20 flex items-center justify-center rounded-[26px] bg-[#080706]/74 p-4 backdrop-blur-sm sm:rounded-[30px] sm:p-6">
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="lead-form-status-title"
            className={`w-full max-w-[440px] rounded-[24px] border p-6 shadow-[0_30px_80px_rgba(0,0,0,0.42)] sm:p-7 ${
              statusModal === "success"
                ? "border-[#8a7030]/35 bg-[linear-gradient(180deg,rgba(24,21,17,0.98)_0%,rgba(16,14,12,0.98)_100%)]"
                : "border-[#8f403b]/35 bg-[linear-gradient(180deg,rgba(33,18,17,0.98)_0%,rgba(20,12,11,0.98)_100%)]"
            }`}
          >
            <span
              className={`inline-flex rounded-full px-3 py-1 text-[12px] font-semibold uppercase tracking-[0.14em] ${
                statusModal === "success"
                  ? "border border-[#8a7030]/45 bg-[#efcb65]/10 text-[#f3d986]"
                  : "border border-[#8f403b]/45 bg-[#6a2a24]/20 text-[#f4b7b1]"
              }`}
            >
              {statusModal === "success" ? "OK" : "Error"}
            </span>
            <h3
              id="lead-form-status-title"
              className="mt-5 font-[var(--font-manrope)] text-[28px] font-medium leading-[1.06] tracking-[-0.04em] text-white sm:text-[32px]"
            >
              {statusModal === "success"
                ? copy.success.title
                : copy.modal.errorTitle}
            </h3>
            <p className="mt-4 text-[15px] leading-[1.7] text-white/68">
              {statusModal === "success"
                ? copy.success.description
                : submitError}
            </p>
            <button
              type="button"
              onClick={() => {
                setStatusModal(null);
                setSubmitError(null);
                onStatusClose?.();
              }}
              className="mt-6 inline-flex min-h-11 items-center justify-center rounded-[14px] border border-white/10 bg-white/[0.03] px-5 py-3 text-[15px] font-semibold text-white/88 transition-all duration-200 ease-out hover:-translate-y-0.5 hover:border-[#8a7030]/60 hover:text-white"
            >
              {copy.modal.close}
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
}
