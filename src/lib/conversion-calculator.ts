// Pure math and formatting for the "Conversion Impact Calculator" section
// on the homepage. No React, no side effects, safe to unit test in
// isolation. The component that renders this only calls these functions,
// it does not compute anything itself.

export type BusinessType = "service" | "ecommerce" | "saas";
export type CurrencyCode = "USD" | "GBP" | "AUD" | "AED" | "PKR";

export interface BusinessTypeConfig {
  label: string;
  volumeLabel: string;
  valueLabel: string;
  ceiling: number;
  defaultVisitors: number;
  defaultAvgValue: number;
  defaultConversionRate: number;
}

export const BUSINESS_TYPES: Record<BusinessType, BusinessTypeConfig> = {
  service: {
    label: "Service / B2B",
    volumeLabel: "leads per month",
    valueLabel: "average deal value",
    ceiling: 4.0,
    defaultVisitors: 5000,
    defaultAvgValue: 3000,
    defaultConversionRate: 1.5,
  },
  ecommerce: {
    label: "E-commerce",
    volumeLabel: "orders per month",
    valueLabel: "average order value",
    ceiling: 3.2,
    defaultVisitors: 5000,
    defaultAvgValue: 85,
    defaultConversionRate: 1.8,
  },
  saas: {
    label: "SaaS / Digital",
    volumeLabel: "signups per month",
    valueLabel: "average customer value",
    ceiling: 3.5,
    defaultVisitors: 5000,
    defaultAvgValue: 500,
    defaultConversionRate: 2.2,
  },
};

export const BUSINESS_TYPE_ORDER: BusinessType[] = ["service", "ecommerce", "saas"];

interface CurrencyConfig {
  locale: string;
}

// Formatting only, no FX conversion: the underlying number is unchanged,
// only the symbol and locale-appropriate grouping/decimal style change.
export const CURRENCIES: Record<CurrencyCode, CurrencyConfig> = {
  USD: { locale: "en-US" },
  GBP: { locale: "en-GB" },
  AUD: { locale: "en-AU" },
  AED: { locale: "en-AE" },
  PKR: { locale: "en-PK" },
};

export const CURRENCY_ORDER: CurrencyCode[] = ["USD", "GBP", "AUD", "AED", "PKR"];

export interface CalculatorInput {
  businessType: BusinessType;
  visitors: number;
  avgValue: number;
  currentCR: number;
  currency: CurrencyCode;
}

export interface CalculatorResult {
  isEmpty: boolean;
  isAboveBenchmark: boolean;
  ceiling: number;
  currentConversions: number;
  currentRevenue: number;
  lowCR: number;
  highCR: number;
  projectedConversionsLow: number;
  projectedConversionsHigh: number;
  projectedRevenueLow: number;
  projectedRevenueHigh: number;
  additionalRevenueLow: number;
  additionalRevenueHigh: number;
  additionalRevenueLowCapped: boolean;
  additionalRevenueHighCapped: boolean;
  annualLow: number;
  annualHigh: number;
}

const DISPLAY_CAP = 500_000;

function isFiniteNumber(value: number): boolean {
  return typeof value === "number" && Number.isFinite(value);
}

// Revenue rounds to the nearest $1,000 at or above $100k, nearest $100
// between $1k and $100k, and to the nearest whole unit below $1k. Conversions
// round to whole numbers. Both guard against NaN/Infinity by falling back to
// 0 rather than letting a bad value reach the UI.
export function roundRevenue(value: number): number {
  if (!isFiniteNumber(value)) return 0;
  const magnitude = Math.abs(value);
  const step = magnitude >= 100_000 ? 1000 : magnitude >= 1000 ? 100 : 1;
  return Math.round(value / step) * step;
}

export function roundConversions(value: number): number {
  if (!isFiniteNumber(value)) return 0;
  return Math.round(value);
}

function capForDisplay(value: number): { value: number; capped: boolean } {
  if (value > DISPLAY_CAP) return { value: DISPLAY_CAP, capped: true };
  return { value, capped: false };
}

const EMPTY_RESULT: CalculatorResult = {
  isEmpty: true,
  isAboveBenchmark: false,
  ceiling: 0,
  currentConversions: 0,
  currentRevenue: 0,
  lowCR: 0,
  highCR: 0,
  projectedConversionsLow: 0,
  projectedConversionsHigh: 0,
  projectedRevenueLow: 0,
  projectedRevenueHigh: 0,
  additionalRevenueLow: 0,
  additionalRevenueHigh: 0,
  additionalRevenueLowCapped: false,
  additionalRevenueHighCapped: false,
  annualLow: 0,
  annualHigh: 0,
};

export function calculateConversionImpact(input: CalculatorInput): CalculatorResult {
  const { businessType, visitors, avgValue, currentCR } = input;

  if (
    !isFiniteNumber(visitors) ||
    !isFiniteNumber(avgValue) ||
    !isFiniteNumber(currentCR) ||
    visitors <= 0 ||
    avgValue <= 0 ||
    currentCR <= 0
  ) {
    return { ...EMPTY_RESULT };
  }

  const ceiling = BUSINESS_TYPES[businessType].ceiling;

  const currentConversions = visitors * (currentCR / 100);
  const currentRevenue = currentConversions * avgValue;

  const highCR = Math.max(currentCR * 1.15, Math.min(currentCR * 2.0, ceiling));
  const lowCR = Math.max(currentCR * 1.1, Math.min(currentCR * 1.4, ceiling));

  const projectedConversionsLow = visitors * (lowCR / 100);
  const projectedConversionsHigh = visitors * (highCR / 100);
  const projectedRevenueLow = projectedConversionsLow * avgValue;
  const projectedRevenueHigh = projectedConversionsHigh * avgValue;

  const rawAdditionalLow = Math.max(0, projectedRevenueLow - currentRevenue);
  const rawAdditionalHigh = Math.max(0, projectedRevenueHigh - currentRevenue);

  const roundedAdditionalLow = roundRevenue(rawAdditionalLow);
  const roundedAdditionalHigh = roundRevenue(rawAdditionalHigh);

  const cappedLow = capForDisplay(roundedAdditionalLow);
  const cappedHigh = capForDisplay(roundedAdditionalHigh);

  return {
    isEmpty: false,
    isAboveBenchmark: currentCR >= ceiling,
    ceiling,
    currentConversions: roundConversions(currentConversions),
    currentRevenue: roundRevenue(currentRevenue),
    lowCR,
    highCR,
    projectedConversionsLow: roundConversions(projectedConversionsLow),
    projectedConversionsHigh: roundConversions(projectedConversionsHigh),
    projectedRevenueLow: roundRevenue(projectedRevenueLow),
    projectedRevenueHigh: roundRevenue(projectedRevenueHigh),
    additionalRevenueLow: cappedLow.value,
    additionalRevenueHigh: cappedHigh.value,
    additionalRevenueLowCapped: cappedLow.capped,
    additionalRevenueHighCapped: cappedHigh.capped,
    annualLow: cappedLow.value * 12,
    annualHigh: cappedHigh.value * 12,
  };
}

export function formatCurrency(value: number, currency: CurrencyCode): string {
  const safeValue = isFiniteNumber(value) ? value : 0;
  return new Intl.NumberFormat(CURRENCIES[currency].locale, {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(safeValue);
}

// Appends "+" when the underlying value was capped for display, per the
// $500k/month display cap rule: the real number can be larger, but we
// never print an unbelievable figure without qualifying it.
export function formatCappedCurrency(value: number, capped: boolean, currency: CurrencyCode): string {
  const formatted = formatCurrency(value, currency);
  return capped ? `${formatted}+` : formatted;
}

export function formatCurrencyRange(
  low: number,
  high: number,
  lowCapped: boolean,
  highCapped: boolean,
  currency: CurrencyCode,
): string {
  if (lowCapped && highCapped) return formatCappedCurrency(low, true, currency);
  return `${formatCurrency(low, currency)} to ${formatCappedCurrency(high, highCapped, currency)}`;
}

export function formatPercent(value: number, decimals = 1): string {
  if (!isFiniteNumber(value)) return "0%";
  return `${value.toFixed(decimals)}%`;
}

export function formatPercentRange(low: number, high: number, decimals = 1): string {
  return `${formatPercent(low, decimals)} to ${formatPercent(high, decimals)}`;
}
