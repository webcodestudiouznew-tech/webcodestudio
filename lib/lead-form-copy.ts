import type { LeadFormCopy } from "@/components/sections/lead-form";

type TranslationGetter = (key: string) => string;

export function createLeadFormCopy(t: TranslationGetter): LeadFormCopy {
  return {
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
      openTitle: t("form.modal.openTitle"),
    },
    errors: {
      requiredName: t("form.errors.requiredName"),
      requiredPhone: t("form.errors.requiredPhone"),
      invalidPhone: t("form.errors.invalidPhone"),
      submitFailed: t("form.errors.submitFailed"),
    },
  };
}
