import type { BriefAnswers, PackageCandidate } from "@/lib/brief/brief-schema";

const customReviewFeatures = new Set([
  "online_payment",
  "calculator",
  "external_integration",
  "account",
  "other_function",
]);

export type QualificationResult = {
  packageCandidate: PackageCandidate;
  flags: string[];
};

export function qualifyBrief(answers: BriefAnswers): QualificationResult {
  const flags: string[] = [];
  const hasCustomFeature = answers.extra_features.some((feature) =>
    customReviewFeatures.has(feature),
  );

  if (hasCustomFeature) {
    flags.push("custom_functionality");
  }

  if (answers.needs_positioning_help) {
    flags.push("positioning_help_requested");
  }

  if (answers.desired_timeline === "asap" || answers.desired_timeline === "week") {
    flags.push("urgent_timeline");
  }

  if (answers.proof_assets.includes("none")) {
    flags.push("limited_proof_assets");
  }

  if (hasCustomFeature) {
    return {
      packageCandidate: "custom_review",
      flags,
    };
  }

  const growthSignals = [
    answers.service_count === "seven_plus",
    answers.scope_preference === "multi_page",
    answers.extra_features.includes("catalog"),
    answers.site_goals.includes("sell_product"),
  ].filter(Boolean).length;

  if (growthSignals >= 2) {
    return {
      packageCandidate: "growth",
      flags: flags.concat("larger_scope"),
    };
  }

  const trustSignals = [
    answers.service_count === "two_three" || answers.service_count === "four_six",
    answers.scope_preference === "detailed_landing",
    answers.scope_preference === "refresh_existing",
    answers.site_goals.includes("increase_trust"),
    answers.proof_assets.some((asset) =>
      ["testimonials", "cases", "known_clients", "numbers", "portfolio"].includes(asset),
    ),
  ].filter(Boolean).length;

  if (trustSignals >= 2) {
    return {
      packageCandidate: "trust",
      flags: flags.concat("trust_building_needed"),
    };
  }

  return {
    packageCandidate: "launch",
    flags: flags.concat("compact_launch"),
  };
}
