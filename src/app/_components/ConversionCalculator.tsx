"use client";

// ============================================================================
// Conversion gap calculator. Ported from reference/calculator-v2.html: one
// dark surface for both panels, one dominant "left on the table" number on
// the right, everything else behind a "Show the working" disclosure. All
// math lives in lib/conversion-calculator.ts; this file only renders state
// and never computes a result itself.
// ============================================================================

import React, {
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import Link from "next/link";
import {
  motion,
  useMotionValue,
  animate,
  useReducedMotion,
  useInView,
} from "framer-motion";
import { ArrowRight } from "lucide-react";
import { track } from "@vercel/analytics";
import styles from "./ConversionCalculator.module.css";
import {
  BUSINESS_TYPES,
  BUSINESS_TYPE_ORDER,
  CURRENCY_ORDER,
  calculateConversionImpact,
  formatCappedCurrency,
  formatCurrency,
  formatPercent,
  type BusinessType,
  type CalculatorInput,
  type CalculatorResult,
  type CurrencyCode,
} from "@/lib/conversion-calculator";

const EASE = [0.16, 1, 0.3, 1] as const;
const CALC_DEBOUNCE_MS = 150;
const ANALYTICS_DEBOUNCE_MS = 400;
const LIVE_SUMMARY_DEBOUNCE_MS = 500;
const BIG_NUMBER_DURATION_MS = 420;

const VISITOR_MIN = 100;
const VISITOR_MAX = 200_000;
const AVG_VALUE_MIN = 20;
const AVG_VALUE_MAX = 50_000;
const SLIDER_STEPS = 1000;

const BENCHMARK_NAME: Record<BusinessType, string> = {
  service: "service",
  ecommerce: "e-commerce",
  saas: "SaaS",
};

function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
}

// Both the visitors and average-value sliders use a log scale so the low
// end (where most small businesses actually live) isn't crushed into the
// first few pixels of a linear track.
function logSliderPosition(value: number, min: number, max: number): number {
  const clamped = clamp(value, min, max);
  const t = Math.log(clamped / min) / Math.log(max / min);
  return Math.round(t * SLIDER_STEPS);
}

function logSliderValue(position: number, min: number, max: number): number {
  const t = position / SLIDER_STEPS;
  return min * Math.pow(max / min, t);
}

function getCurrencySymbol(currency: CurrencyCode): string {
  return formatCurrency(0, currency).replace(/[0-9.,\s]/g, "");
}

// Animates a number from its previous displayed value to the new target,
// never from zero. Reduced motion snaps straight to the target.
function useAnimatedNumber(target: number, durationMs = BIG_NUMBER_DURATION_MS): number {
  const reduceMotion = useReducedMotion();
  const motionValue = useMotionValue(target);
  const [display, setDisplay] = useState(target);
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      motionValue.set(target);
      setDisplay(target);
      return;
    }
    if (reduceMotion) {
      motionValue.set(target);
      setDisplay(target);
      return;
    }
    const controls = animate(motionValue, target, {
      duration: durationMs / 1000,
      ease: EASE,
      onUpdate: (v) => setDisplay(v),
    });
    return () => controls.stop();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [target, reduceMotion, durationMs]);

  return display;
}

function useDebouncedValue<T>(value: T, delayMs: number): T {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const id = window.setTimeout(() => setDebounced(value), delayMs);
    return () => window.clearTimeout(id);
  }, [value, delayMs]);
  return debounced;
}

// ----------------------------------------------------------------------------
// One slider + linked, editable chip input. The slider updates the shared
// value live on every drag frame; the chip input debounces by ~150ms so
// typing a full figure doesn't recalculate on every keystroke.
// ----------------------------------------------------------------------------
function RangeField({
  label,
  ariaLabel,
  value,
  min,
  max,
  step = 1,
  onChange,
  formatDisplay,
  toSliderPosition,
  fromSliderPosition,
  disabled = false,
  inputPrefix,
  labelRight,
}: {
  label: string;
  ariaLabel: string;
  value: number;
  min: number;
  max: number;
  step?: number;
  onChange: (value: number) => void;
  formatDisplay: (value: number) => string;
  toSliderPosition?: (value: number) => number;
  fromSliderPosition?: (position: number) => number;
  disabled?: boolean;
  inputPrefix?: string;
  labelRight?: React.ReactNode;
}) {
  const [numberText, setNumberText] = useState(String(value));
  const debounceRef = useRef<number | null>(null);

  useEffect(() => {
    setNumberText(String(value));
  }, [value]);

  useEffect(
    () => () => {
      if (debounceRef.current) window.clearTimeout(debounceRef.current);
    },
    [],
  );

  const sliderPosition = toSliderPosition ? toSliderPosition(value) : value;
  const sliderMax = toSliderPosition ? SLIDER_STEPS : max;

  const handleSliderChange = (raw: number) => {
    const next = fromSliderPosition ? fromSliderPosition(raw) : raw;
    onChange(clamp(next, min, max));
  };

  const handleNumberChange = (text: string) => {
    setNumberText(text);
    const parsed = Number(text);
    if (Number.isNaN(parsed)) return;
    if (debounceRef.current) window.clearTimeout(debounceRef.current);
    debounceRef.current = window.setTimeout(() => {
      onChange(clamp(parsed, min, max));
    }, CALC_DEBOUNCE_MS);
  };

  return (
    <div className={`mb-[26px] last-of-type:mb-2 ${disabled ? "opacity-50 pointer-events-none" : ""}`}>
      <div className="flex items-baseline justify-between gap-3 mb-3">
        <label className="text-[14.5px] font-semibold tracking-[-0.01em] text-white/[0.66]">
          {label}
        </label>
        <div className="flex items-center gap-2">
          {labelRight}
          <div className="flex items-center gap-1 rounded-lg bg-[#26262e] px-[11px] py-[5px]">
            {inputPrefix && (
              <span className="font-mono text-[15px] text-white/40">{inputPrefix}</span>
            )}
            <input
              type="number"
              inputMode="numeric"
              value={numberText}
              disabled={disabled}
              onChange={(e) => handleNumberChange(e.target.value)}
              aria-label={`${ariaLabel}, type a value`}
              data-cursor="input"
              className="w-20 bg-transparent text-right font-mono text-[15px] font-medium text-[#f5f5f5] outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
            />
          </div>
        </div>
      </div>
      <input
        type="range"
        min={0}
        max={sliderMax}
        step={toSliderPosition ? 1 : step}
        value={sliderPosition}
        disabled={disabled}
        onChange={(e) => handleSliderChange(Number(e.target.value))}
        aria-label={ariaLabel}
        aria-valuenow={value}
        aria-valuetext={formatDisplay(value)}
        aria-valuemin={min}
        aria-valuemax={max}
        data-cursor="input"
        className={styles.range}
      />
    </div>
  );
}

// ----------------------------------------------------------------------------
// The gap, as two bars sharing one scale so the visual gap is honest: the
// purple "after" bar is always 100%, the grey "today" bar is scaled against
// it, so the gap reads before any number is even read.
// ----------------------------------------------------------------------------
function GapLine({
  label,
  hot,
  amountDisplay,
  widthPct,
  reduceMotion,
}: {
  label: string;
  hot: boolean;
  amountDisplay: string;
  widthPct: number;
  reduceMotion: boolean;
}) {
  return (
    <div className="mb-[18px] last:mb-0">
      <div className="mb-[9px] flex items-baseline justify-between">
        <span
          className={`text-[12.5px] font-bold uppercase tracking-[0.08em] ${
            hot ? "text-[#a89bff]" : "text-white/[0.38]"
          }`}
        >
          {label}
        </span>
        <span className={`font-mono text-sm ${hot ? "text-[#f5f5f5]" : "text-white/[0.66]"}`}>
          {amountDisplay}
        </span>
      </div>
      <div className="h-3 overflow-hidden rounded-md bg-[#26262e]">
        <motion.div
          initial={false}
          animate={{ width: `${widthPct}%` }}
          transition={{ duration: reduceMotion ? 0 : 0.48, ease: EASE }}
          className={`h-full rounded-md ${hot ? "bg-[#5c45fd]" : "bg-[#31313b]"}`}
        />
      </div>
    </div>
  );
}

export default function ConversionCalculator() {
  const reduceMotion = useReducedMotion() ?? false;
  const sectionRef = useRef<HTMLElement>(null);
  const isSectionInView = useInView(sectionRef, { margin: "-20% 0px -20% 0px" });

  const [businessType, setBusinessType] = useState<BusinessType>("service");
  const [visitors, setVisitors] = useState(5000);
  const [avgValue, setAvgValue] = useState(BUSINESS_TYPES.service.defaultAvgValue);
  const [currentCR, setCurrentCR] = useState(BUSINESS_TYPES.service.defaultConversionRate);
  const [crTouched, setCrTouched] = useState(false);
  const [hintVisible, setHintVisible] = useState(false);
  const [currency, setCurrency] = useState<CurrencyCode>("USD");
  const [detailOpen, setDetailOpen] = useState(false);

  const hasTrackedFirstInteraction = useRef(false);
  const analyticsDebounceRef = useRef<number | null>(null);

  const config = BUSINESS_TYPES[businessType];

  const input: CalculatorInput = useMemo(
    () => ({ businessType, visitors, avgValue, currentCR, currency }),
    [businessType, visitors, avgValue, currentCR, currency],
  );

  const result: CalculatorResult = useMemo(() => calculateConversionImpact(input), [input]);

  // Tracks analytics from the interaction handlers directly, not from a
  // useEffect watching derived state: an effect fires on mount (and, in
  // React 18 dev double-invoke, can fire again even after a "skip the
  // first run" guard, since refs persist across the simulated
  // mount/unmount/remount). Calling this only from real event handlers
  // guarantees it never fires from a render Next.js triggered on its own.
  const trackInteraction = (nextInput: CalculatorInput) => {
    if (!hasTrackedFirstInteraction.current) {
      hasTrackedFirstInteraction.current = true;
      track("calculator_first_interaction", { ...nextInput });
    }
    if (analyticsDebounceRef.current) window.clearTimeout(analyticsDebounceRef.current);
    analyticsDebounceRef.current = window.setTimeout(() => {
      track("calculator_input_change", { ...nextInput });
    }, ANALYTICS_DEBOUNCE_MS);
  };

  useEffect(
    () => () => {
      if (analyticsDebounceRef.current) window.clearTimeout(analyticsDebounceRef.current);
    },
    [],
  );

  const handleBusinessTypeChange = (next: BusinessType) => {
    const nextAvgValue = BUSINESS_TYPES[next].defaultAvgValue;
    const nextCR = crTouched ? currentCR : BUSINESS_TYPES[next].defaultConversionRate;
    setBusinessType(next);
    setAvgValue(nextAvgValue);
    setCurrentCR(nextCR);
    trackInteraction({ ...input, businessType: next, avgValue: nextAvgValue, currentCR: nextCR });
  };

  const handleVisitorsChange = (v: number) => {
    setVisitors(v);
    trackInteraction({ ...input, visitors: v });
  };

  const handleAvgValueChange = (v: number) => {
    setAvgValue(v);
    trackInteraction({ ...input, avgValue: v });
  };

  const handleCurrentCrChange = (v: number) => {
    setCurrentCR(v);
    setCrTouched(true);
    setHintVisible(false);
    trackInteraction({ ...input, currentCR: v });
  };

  const handleDunno = () => {
    const nextCR = config.defaultConversionRate;
    setCurrentCR(nextCR);
    setCrTouched(false);
    setHintVisible(true);
    trackInteraction({ ...input, currentCR: nextCR });
  };

  const handleCurrencyChange = (code: CurrencyCode) => {
    setCurrency(code);
    trackInteraction({ ...input, currency: code });
  };

  const handleCtaClick = () => {
    track("calculator_cta_click", { ...input, additionalRevenueLow: result.additionalRevenueLow });
  };

  const handleToggleDetail = () => {
    setDetailOpen((open) => !open);
  };

  const animatedAdditionalLow = useAnimatedNumber(result.additionalRevenueLow);

  const bigNumberText = result.isEmpty
    ? formatCurrency(0, currency)
    : formatCappedCurrency(
        Math.round(animatedAdditionalLow),
        result.additionalRevenueLowCapped,
        currency,
      );

  // Debounced plain-text summary for the aria-live region, so screen
  // readers announce the settled result rather than every drag frame.
  const liveSummary = result.isEmpty
    ? "Move a slider to see your numbers."
    : `Left on the table, every month: at least ${formatCappedCurrency(
        result.additionalRevenueLow,
        result.additionalRevenueLowCapped,
        currency,
      )}.`;
  const debouncedLiveSummary = useDebouncedValue(liveSummary, LIVE_SUMMARY_DEBOUNCE_MS);

  const gapScaleMax = Math.max(result.projectedRevenueLow, result.currentRevenue, 1);
  const todayWidthPct = clamp((result.currentRevenue / gapScaleMax) * 100, 0, 100);

  return (
    <section
      ref={sectionRef}
      id="calculator"
      className="relative bg-[#0A0A0E] pt-16 pb-24 lg:pt-20 lg:pb-28 overflow-hidden"
    >
      <div className="bg-grain absolute inset-0 opacity-10 pointer-events-none" />

      <div className="mx-auto max-w-[1280px] px-6 md:px-12 relative z-10">
        <div className="mb-12 lg:mb-16 max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center px-4 py-1.5 rounded-full border border-[#5C45FD]/40 bg-[#5C45FD]/10 text-[#C1B9FF] text-[11px] font-bold uppercase tracking-[0.2em] mb-6"
          >
            The Math
          </motion.div>
          <motion.h2
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.08 } },
            }}
            className="text-left text-white max-w-4xl"
            style={{
              fontFamily: "Arial, sans-serif",
              fontSize: "clamp(28px, 5vw, 46px)",
              fontWeight: 400,
              lineHeight: "1.1",
              letterSpacing: "-0.02em",
            }}
          >
            <span
              className="block overflow-hidden pb-1"
              data-cursor="text"
              data-cursor-on-dark=""
              data-text={
                result.isEmpty || !result.isAboveBenchmark
                  ? "Your traffic is worth"
                  : "You're converting well."
              }
            >
              <motion.span
                className="block"
                variants={{
                  hidden: { y: "100%" },
                  visible: { y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } },
                }}
              >
                {result.isEmpty || !result.isAboveBenchmark
                  ? "Your traffic is worth"
                  : "You're converting well."}
              </motion.span>
            </span>
            <span
              className="block overflow-hidden pb-1"
              data-cursor="text"
              data-cursor-on-dark=""
              data-text={
                result.isEmpty || !result.isAboveBenchmark
                  ? "more than it pays you."
                  : "The upside is what's next."
              }
            >
              <motion.span
                className="block text-white/40"
                variants={{
                  hidden: { y: "100%" },
                  visible: { y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } },
                }}
              >
                {result.isEmpty || !result.isAboveBenchmark
                  ? "more than it pays you."
                  : "The upside is what's next."}
              </motion.span>
            </span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, delay: 0.1, ease: EASE }}
            className="mt-4 text-lg text-white/50"
          >
            {!result.isEmpty && result.isAboveBenchmark
              ? "The bigger lever now: better leads and higher deal value."
              : "Move three sliders. See your monthly gap."}
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.08fr] gap-6 items-stretch">
          {/* Left · inputs */}
          <div className="rounded-[22px] border border-white/10 bg-[#1e1e24] p-[30px_30px_32px]">
            <p className="mb-6 font-mono text-[10px] uppercase tracking-[0.18em] text-white/[0.38]">
              Your numbers
            </p>

            <div
              role="group"
              aria-label="Business type"
              className="mb-7 grid grid-cols-3 gap-1 rounded-xl bg-[#26262e] p-1"
            >
              {BUSINESS_TYPE_ORDER.map((type) => (
                <button
                  key={type}
                  type="button"
                  aria-pressed={businessType === type}
                  onClick={() => handleBusinessTypeChange(type)}
                  data-cursor="button"
                  className={`rounded-[9px] px-1.5 py-2.5 text-[13px] font-semibold tracking-[-0.01em] transition-colors duration-[180ms] ${
                    businessType === type
                      ? "bg-[#31313b] text-[#f5f5f5]"
                      : "text-white/[0.38] hover:text-white/[0.66]"
                  }`}
                >
                  {BUSINESS_TYPES[type].label}
                </button>
              ))}
            </div>

            <RangeField
              label="Monthly website visitors"
              ariaLabel="Monthly website visitors"
              value={visitors}
              min={VISITOR_MIN}
              max={VISITOR_MAX}
              onChange={handleVisitorsChange}
              formatDisplay={(v) => v.toLocaleString()}
              toSliderPosition={(v) => logSliderPosition(v, VISITOR_MIN, VISITOR_MAX)}
              fromSliderPosition={(p) => Math.round(logSliderValue(p, VISITOR_MIN, VISITOR_MAX) / 100) * 100}
            />

            <RangeField
              label={`${config.valueLabel[0].toUpperCase()}${config.valueLabel.slice(1)}`}
              ariaLabel={config.valueLabel}
              value={avgValue}
              min={AVG_VALUE_MIN}
              max={AVG_VALUE_MAX}
              onChange={handleAvgValueChange}
              formatDisplay={(v) => formatCurrency(v, currency)}
              toSliderPosition={(v) => logSliderPosition(v, AVG_VALUE_MIN, AVG_VALUE_MAX)}
              fromSliderPosition={(p) => Math.round(logSliderValue(p, AVG_VALUE_MIN, AVG_VALUE_MAX) / 5) * 5}
              inputPrefix={getCurrencySymbol(currency)}
              labelRight={
                <select
                  value={currency}
                  onChange={(e) => handleCurrencyChange(e.target.value as CurrencyCode)}
                  aria-label="Currency"
                  data-cursor="input"
                  className="cursor-pointer rounded-full border-0 bg-[#26262e] px-2.5 py-1 text-xs font-bold text-white/[0.66] outline-none"
                >
                  {CURRENCY_ORDER.map((code) => (
                    <option key={code} value={code} className="bg-[#1e1e24] text-white">
                      {code}
                    </option>
                  ))}
                </select>
              }
            />

            <div>
              <RangeField
                label="Your conversion rate"
                ariaLabel="Current conversion rate"
                value={currentCR}
                min={0.1}
                max={10}
                step={0.1}
                onChange={handleCurrentCrChange}
                formatDisplay={(v) => formatPercent(v)}
                inputPrefix="%"
              />
              <button
                type="button"
                onClick={handleDunno}
                data-cursor="button"
                className="mt-3 inline-block text-[12.5px] text-white/[0.38] underline underline-offset-[3px] hover:text-[#a89bff]"
              >
                I don&apos;t know my conversion rate
              </button>
              {hintVisible && (
                <p className="mt-2.5 text-[12.5px] leading-relaxed text-white/[0.38]">
                  We&apos;ve used the {BENCHMARK_NAME[businessType]} average of{" "}
                  {formatPercent(config.defaultConversionRate)}. Most sites we audit come in
                  below it.
                </p>
              )}
            </div>
          </div>

          {/* Right · one answer */}
          <div className="flex flex-col rounded-[22px] border border-white/10 bg-[#1e1e24] p-[34px_34px_30px]">
            <span aria-live="polite" className="sr-only">
              {debouncedLiveSummary}
            </span>

            <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#a89bff]">
              Left on the table, every month
            </p>

            <p className="mt-4 flex items-baseline gap-1 text-white" style={{ fontFamily: "Arial, sans-serif" }}>
              <span
                className="font-medium leading-[0.92] tracking-[-0.05em]"
                style={{ fontSize: "clamp(46px, 6.4vw, 86px)" }}
              >
                {bigNumberText}
              </span>
              <span className="pb-2.5 text-base font-semibold tracking-[-0.01em] text-white/[0.38]">
                at least
              </span>
            </p>

            <p className="mt-3.5 max-w-[34ch] text-[15.5px] leading-[1.55] text-white/[0.66]">
              {!result.isEmpty && result.isAboveBenchmark
                ? `You already convert above the ${formatPercent(
                    result.ceiling,
                  )} benchmark. The bigger lever now is deal value and lead quality, which is a conversation for a call.`
                : "That is the revenue your traffic is already capable of, and is not producing."}
            </p>

            <div className="mt-[30px] border-t border-white/10 pt-[26px]">
              <GapLine
                label="Today"
                hot={false}
                amountDisplay={formatCurrency(result.currentRevenue, currency)}
                widthPct={todayWidthPct}
                reduceMotion={reduceMotion}
              />
              <GapLine
                label="After SYNC"
                hot
                amountDisplay={formatCurrency(result.projectedRevenueLow, currency)}
                widthPct={100}
                reduceMotion={reduceMotion}
              />
            </div>

            <div className="mt-auto flex flex-wrap items-start gap-6 pt-7">
              <div className="flex flex-col items-start gap-2">
                <Link href="/qualify" onClick={handleCtaClick} data-cursor="cta">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="group inline-flex items-center justify-center gap-2 rounded-full bg-[#5C45FD] px-5 py-3 sm:py-2.5 text-sm font-bold text-white shadow-lg shadow-[#5C45FD]/25 transition-all hover:bg-[#4a36e0]"
                  >
                    See how we&apos;d close that gap
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </motion.button>
                </Link>
                <p className="text-[13px] text-[rgba(245,245,245,0.5)]">
                  Free. 30 minutes. We&apos;ll show you the numbers.
                </p>
              </div>
              <button
                type="button"
                onClick={handleToggleDetail}
                aria-expanded={detailOpen}
                aria-controls="calculator-detail"
                className="mt-3 text-[13px] text-white/[0.38] underline underline-offset-[3px] hover:text-[#a89bff]"
              >
                {detailOpen ? "Hide the working" : "Show the working"}
              </button>
            </div>

            <div
              id="calculator-detail"
              className={`grid transition-[grid-template-rows,opacity,margin-top] duration-[380ms] ease-[cubic-bezier(0.23,1,0.32,1)] ${
                detailOpen ? "mt-6 grid-rows-[1fr] opacity-100" : "mt-0 grid-rows-[0fr] opacity-0"
              }`}
            >
              <div className="overflow-hidden">
                <table className="w-full border-collapse border-t border-white/10">
                  <tbody>
                    <tr className="border-b border-white/10">
                      <td className="py-[11px] text-[13.5px] text-white/[0.66]">Customers today</td>
                      <td className="py-[11px] text-right font-mono text-[13.5px] text-[#f5f5f5]">
                        {result.currentConversions.toLocaleString()} / month
                      </td>
                    </tr>
                    <tr className="border-b border-white/10">
                      <td className="py-[11px] text-[13.5px] text-white/[0.66]">Customers after</td>
                      <td className="py-[11px] text-right font-mono text-[13.5px] text-[#f5f5f5]">
                        {result.projectedConversionsLow.toLocaleString()} to{" "}
                        {result.projectedConversionsHigh.toLocaleString()} / month
                      </td>
                    </tr>
                    <tr className="border-b border-white/10">
                      <td className="py-[11px] text-[13.5px] text-white/[0.66]">Conversion rate today</td>
                      <td className="py-[11px] text-right font-mono text-[13.5px] text-[#f5f5f5]">
                        {formatPercent(currentCR)}
                      </td>
                    </tr>
                    <tr className="border-b border-white/10">
                      <td className="py-[11px] text-[13.5px] text-white/[0.66]">Conversion rate after</td>
                      <td className="py-[11px] text-right font-mono text-[13.5px] text-[#f5f5f5]">
                        {formatPercent(result.lowCR)} to {formatPercent(result.highCR)}
                      </td>
                    </tr>
                    <tr>
                      <td className="py-[11px] text-[13.5px] text-white/[0.66]">Extra revenue, per year</td>
                      <td className="py-[11px] text-right font-mono text-[13.5px] text-[#f5f5f5]">
                        {formatCappedCurrency(result.annualLow, result.additionalRevenueLowCapped, currency)}
                      </td>
                    </tr>
                  </tbody>
                </table>
                <p className="mt-4 text-[12.5px] leading-[1.55] text-white/[0.38]">
                  Assumes lifting your conversion rate toward the {BENCHMARK_NAME[businessType]}{" "}
                  benchmark of {formatPercent(result.ceiling)}. The headline figure uses the low
                  end of that range on purpose. Our last four builds averaged a{" "}
                  <Link
                    href="/case-studies/case-study-reality-cheque"
                    data-cursor="button"
                    className="text-[#a89bff] underline underline-offset-2 hover:text-white transition-colors"
                  >
                    51% conversion lift
                  </Link>
                  . Currency changes formatting only. Figures are not converted.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile sticky summary bar, visible only while the section is in view */}
      {!result.isEmpty && isSectionInView && (
        <motion.div
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 80, opacity: 0 }}
          transition={{ duration: reduceMotion ? 0 : 0.3, ease: EASE }}
          className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#0A0A0E]/95 backdrop-blur border-t border-white/10 px-5 py-3 flex items-center justify-between gap-3"
        >
          <div className="min-w-0">
            <p className="text-[10px] font-bold uppercase tracking-wide text-white/40 truncate">
              Left on the table, every month
            </p>
            <p className="text-white font-bold text-sm truncate">{bigNumberText} at least</p>
          </div>
          <Link
            href="/qualify"
            onClick={handleCtaClick}
            className="shrink-0 inline-flex items-center gap-1.5 rounded-full bg-[#5C45FD] px-4 py-2.5 text-xs font-bold text-white"
          >
            See how
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </motion.div>
      )}
    </section>
  );
}
