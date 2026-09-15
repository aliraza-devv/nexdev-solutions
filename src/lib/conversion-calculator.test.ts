import { describe, expect, it } from "vitest";
import {
  BUSINESS_TYPES,
  SCRATCH_LAUNCH_RANGES,
  calculateConversionImpact,
  calculateScratchProjection,
  formatCappedCurrency,
  formatCurrency,
  formatCurrencyRange,
  roundConversions,
  roundRevenue,
  type CalculatorInput,
} from "./conversion-calculator";

const baseInput: CalculatorInput = {
  businessType: "service",
  visitors: 5000,
  avgValue: 3000,
  currentCR: 1.5,
  currency: "USD",
};

describe("calculateConversionImpact: normal case", () => {
  it("matches the worked example from the spec: 1.0% CR projects to 1.4%-2.0%", () => {
    const result = calculateConversionImpact({ ...baseInput, currentCR: 1.0 });
    expect(result.isEmpty).toBe(false);
    expect(result.lowCR).toBeCloseTo(1.4, 5);
    expect(result.highCR).toBeCloseTo(2.0, 5);
  });

  it("computes current conversions and revenue from visitors x CR x avg value", () => {
    const result = calculateConversionImpact(baseInput);
    // 5000 * 1.5% = 75 conversions, 75 * 3000 = 225000 revenue
    expect(result.currentConversions).toBe(75);
    expect(result.currentRevenue).toBe(225000);
  });

  it("projects revenue above current revenue and additional revenue is positive", () => {
    const result = calculateConversionImpact(baseInput);
    expect(result.projectedRevenueLow).toBeGreaterThan(result.currentRevenue);
    expect(result.projectedRevenueHigh).toBeGreaterThan(result.projectedRevenueLow);
    expect(result.additionalRevenueLow).toBeGreaterThan(0);
    expect(result.additionalRevenueHigh).toBeGreaterThan(result.additionalRevenueLow);
  });

  it("is not flagged above benchmark when current CR is below the ceiling", () => {
    const result = calculateConversionImpact(baseInput);
    expect(result.isAboveBenchmark).toBe(false);
  });
});

describe("calculateConversionImpact: ceiling caps the projection", () => {
  it("matches the worked example: 2.0% CR on a 3.2% ceiling projects to 2.8%-3.2%", () => {
    const result = calculateConversionImpact({
      ...baseInput,
      businessType: "ecommerce",
      currentCR: 2.0,
    });
    expect(BUSINESS_TYPES.ecommerce.ceiling).toBe(3.2);
    expect(result.lowCR).toBeCloseTo(2.8, 5);
    expect(result.highCR).toBeCloseTo(3.2, 5);
  });
});

describe("calculateConversionImpact: above-benchmark case", () => {
  it("matches the worked example: 5.0% CR still projects to 5.5%-5.75% via the floors", () => {
    const result = calculateConversionImpact({ ...baseInput, currentCR: 5.0 });
    expect(result.lowCR).toBeCloseTo(5.5, 5);
    expect(result.highCR).toBeCloseTo(5.75, 5);
  });

  it("flags isAboveBenchmark when current CR is at or above the business type ceiling", () => {
    const atCeiling = calculateConversionImpact({ ...baseInput, currentCR: 4.0 });
    const aboveCeiling = calculateConversionImpact({ ...baseInput, currentCR: 5.0 });
    expect(atCeiling.isAboveBenchmark).toBe(true);
    expect(aboveCeiling.isAboveBenchmark).toBe(true);
  });

  it("still returns a positive range above benchmark, never a negative or zero range", () => {
    const result = calculateConversionImpact({ ...baseInput, currentCR: 8.0 });
    expect(result.additionalRevenueLow).toBeGreaterThanOrEqual(0);
    expect(result.additionalRevenueHigh).toBeGreaterThanOrEqual(result.additionalRevenueLow);
  });
});

describe("calculateConversionImpact: zero and empty inputs", () => {
  it("returns a neutral empty result when visitors is zero", () => {
    const result = calculateConversionImpact({ ...baseInput, visitors: 0 });
    expect(result.isEmpty).toBe(true);
    expect(result.currentRevenue).toBe(0);
    expect(result.additionalRevenueLow).toBe(0);
    expect(result.additionalRevenueHigh).toBe(0);
  });

  it("returns a neutral empty result when avgValue is zero", () => {
    const result = calculateConversionImpact({ ...baseInput, avgValue: 0 });
    expect(result.isEmpty).toBe(true);
  });

  it("returns a neutral empty result when currentCR is zero", () => {
    const result = calculateConversionImpact({ ...baseInput, currentCR: 0 });
    expect(result.isEmpty).toBe(true);
  });

  it("never produces NaN or Infinity for negative or non-finite inputs", () => {
    const negative = calculateConversionImpact({ ...baseInput, visitors: -100 });
    const notANumber = calculateConversionImpact({ ...baseInput, avgValue: NaN });
    const infinite = calculateConversionImpact({ ...baseInput, visitors: Infinity });

    for (const result of [negative, notANumber, infinite]) {
      expect(result.isEmpty).toBe(true);
      expect(Number.isFinite(result.currentRevenue)).toBe(true);
      expect(Number.isFinite(result.additionalRevenueHigh)).toBe(true);
    }
  });
});

describe("calculateConversionImpact: display cap", () => {
  it("caps additional revenue at $500,000/month for an absurd input combination", () => {
    const result = calculateConversionImpact({
      businessType: "saas",
      visitors: 200000,
      avgValue: 50000,
      currentCR: 0.5,
      currency: "USD",
    });
    expect(result.additionalRevenueHigh).toBe(500000);
    expect(result.additionalRevenueHighCapped).toBe(true);
  });

  it("does not cap realistic figures under $500,000/month", () => {
    const result = calculateConversionImpact(baseInput);
    expect(result.additionalRevenueHighCapped).toBe(false);
    expect(result.additionalRevenueLowCapped).toBe(false);
  });

  it("formatCappedCurrency appends a plus sign only when capped", () => {
    expect(formatCappedCurrency(500000, true, "USD")).toBe("$500,000+");
    expect(formatCappedCurrency(250000, false, "USD")).toBe("$250,000");
  });

  it("formatCurrencyRange collapses to a single capped figure when both ends are capped", () => {
    const range = formatCurrencyRange(500000, 500000, true, true, "USD");
    expect(range).toBe("$500,000+");
  });
});

describe("business type defaults", () => {
  it("service defaults match the spec: $3,000 avg value, 1.5% conversion rate, 4.0% ceiling", () => {
    expect(BUSINESS_TYPES.service.defaultAvgValue).toBe(3000);
    expect(BUSINESS_TYPES.service.defaultConversionRate).toBe(1.5);
    expect(BUSINESS_TYPES.service.ceiling).toBe(4.0);
  });

  it("ecommerce defaults match the spec: $85 avg value, 1.8% conversion rate, 3.2% ceiling", () => {
    expect(BUSINESS_TYPES.ecommerce.defaultAvgValue).toBe(85);
    expect(BUSINESS_TYPES.ecommerce.defaultConversionRate).toBe(1.8);
    expect(BUSINESS_TYPES.ecommerce.ceiling).toBe(3.2);
  });

  it("saas defaults match the spec: $500 avg value, 2.2% conversion rate, 3.5% ceiling", () => {
    expect(BUSINESS_TYPES.saas.defaultAvgValue).toBe(500);
    expect(BUSINESS_TYPES.saas.defaultConversionRate).toBe(2.2);
    expect(BUSINESS_TYPES.saas.ceiling).toBe(3.5);
  });
});

describe("rounding rules", () => {
  it("rounds revenue to the nearest $100 below $100k", () => {
    expect(roundRevenue(54321)).toBe(54300);
    expect(roundRevenue(54350)).toBe(54400);
  });

  it("rounds revenue to the nearest $1,000 at or above $100k", () => {
    expect(roundRevenue(225499)).toBe(225000);
    expect(roundRevenue(225500)).toBe(226000);
  });

  it("rounds revenue to the nearest whole unit below $1,000", () => {
    expect(roundRevenue(542.4)).toBe(542);
    expect(roundRevenue(542.6)).toBe(543);
  });

  it("rounds conversions to whole numbers", () => {
    expect(roundConversions(74.6)).toBe(75);
    expect(roundConversions(74.4)).toBe(74);
  });

  it("falls back to 0 for non-finite values instead of propagating NaN", () => {
    expect(roundRevenue(NaN)).toBe(0);
    expect(roundRevenue(Infinity)).toBe(0);
    expect(roundConversions(NaN)).toBe(0);
  });
});

describe("calculateScratchProjection: no current site, projection only", () => {
  it("uses the conservative launch range, entirely separate from the have-a-website ceiling", () => {
    const result = calculateScratchProjection({ businessType: "ecommerce", visitors: 5000, avgValue: 85 });
    expect(result.lowRate).toBe(SCRATCH_LAUNCH_RANGES.ecommerce.low);
    expect(result.highRate).toBe(SCRATCH_LAUNCH_RANGES.ecommerce.high);
    expect(result.lowRate).not.toBe(BUSINESS_TYPES.ecommerce.ceiling);
  });

  it("matches the spec's conservative launch ranges per business type", () => {
    expect(SCRATCH_LAUNCH_RANGES.service).toEqual({ low: 2.0, high: 3.0 });
    expect(SCRATCH_LAUNCH_RANGES.ecommerce).toEqual({ low: 1.5, high: 2.5 });
    expect(SCRATCH_LAUNCH_RANGES.saas).toEqual({ low: 2.0, high: 3.0 });
  });

  it("computes the headline customers and revenue from the LOW end of the range", () => {
    const result = calculateScratchProjection({ businessType: "service", visitors: 5000, avgValue: 3000 });
    // 5000 * 2.0% = 100 customers, 100 * 3000 = 300000 revenue
    expect(result.customers).toBe(100);
    expect(result.revenue).toBe(300000);
    expect(result.revenueCapped).toBe(false);
  });

  it("also computes the HIGH end of the range as context, never as the headline", () => {
    const result = calculateScratchProjection({ businessType: "service", visitors: 5000, avgValue: 3000 });
    // 5000 * 3.0% = 150 customers, 150 * 3000 = 450000 revenue
    expect(result.customersHigh).toBe(150);
    expect(result.revenueHigh).toBe(450000);
    expect(result.customersHigh).toBeGreaterThan(result.customers);
    expect(result.revenueHigh).toBeGreaterThan(result.revenue);
  });

  it("never returns a negative figure and has no notion of a current or today value", () => {
    const result = calculateScratchProjection({ businessType: "saas", visitors: 5000, avgValue: 500 });
    expect(result.customers).toBeGreaterThanOrEqual(0);
    expect(result.revenue).toBeGreaterThanOrEqual(0);
    expect(result).not.toHaveProperty("currentRevenue");
    expect(result).not.toHaveProperty("additionalRevenueLow");
  });

  it("returns a neutral empty result when visitors or avgValue is zero", () => {
    expect(calculateScratchProjection({ businessType: "service", visitors: 0, avgValue: 3000 }).isEmpty).toBe(true);
    expect(calculateScratchProjection({ businessType: "service", visitors: 5000, avgValue: 0 }).isEmpty).toBe(true);
  });

  it("never produces NaN or Infinity for non-finite inputs", () => {
    const result = calculateScratchProjection({ businessType: "service", visitors: NaN, avgValue: 3000 });
    expect(result.isEmpty).toBe(true);
    expect(Number.isFinite(result.revenue)).toBe(true);
    expect(Number.isFinite(result.revenueHigh)).toBe(true);
  });
});

describe("currency formatting", () => {
  it("formats USD with a dollar sign and no decimals", () => {
    expect(formatCurrency(225000, "USD")).toBe("$225,000");
  });

  it("formats each supported currency without throwing", () => {
    const currencies = ["USD", "GBP", "AUD", "AED", "PKR"] as const;
    for (const currency of currencies) {
      expect(() => formatCurrency(1000, currency)).not.toThrow();
      expect(formatCurrency(1000, currency).length).toBeGreaterThan(0);
    }
  });
});
