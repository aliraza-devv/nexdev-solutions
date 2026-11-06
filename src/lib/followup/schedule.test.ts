import { describe, expect, it } from "vitest";
import { DAY_MS, MAX_SCHEDULE_AHEAD_MS } from "./config";
import { DUE_EARLY_MS, formatWhen, isMondayIn, nextNurtureStep, scheduleDecision } from "./schedule";

const T0 = Date.UTC(2026, 10, 2, 12, 0, 0);

describe("nextNurtureStep", () => {
  it("waits until about day 2 for the first tip", () => {
    expect(nextNurtureStep(T0, 0, T0 + DAY_MS)).toBeNull();
    expect(nextNurtureStep(T0, 0, T0 + 2 * DAY_MS - DUE_EARLY_MS - 1)).toBeNull();
    expect(nextNurtureStep(T0, 0, T0 + 2 * DAY_MS - DUE_EARLY_MS)?.key).toBe("tip");
    expect(nextNurtureStep(T0, 0, T0 + 3 * DAY_MS)?.key).toBe("tip");
  });

  it("sends the steps in order, one per count", () => {
    expect(nextNurtureStep(T0, 1, T0 + 3 * DAY_MS)).toBeNull();
    expect(nextNurtureStep(T0, 1, T0 + 5 * DAY_MS)?.key).toBe("checkin");
    expect(nextNurtureStep(T0, 2, T0 + 9 * DAY_MS)).toBeNull();
    expect(nextNurtureStep(T0, 2, T0 + 10 * DAY_MS)?.key).toBe("last");
  });

  it("never goes past the last nudge", () => {
    expect(nextNurtureStep(T0, 3, T0 + 365 * DAY_MS)).toBeNull();
  });

  it("does not skip ahead when a run was missed", () => {
    // Twelve days late, nothing sent yet: still the first step, not the last.
    expect(nextNurtureStep(T0, 0, T0 + 12 * DAY_MS)?.key).toBe("tip");
  });
});

describe("scheduleDecision", () => {
  const now = T0;

  it("treats the past and the next minute as past", () => {
    expect(scheduleDecision(now - 1000, now)).toBe("past");
    expect(scheduleDecision(now + 60_000, now)).toBe("past");
  });

  it("schedules anything up to 29 days ahead", () => {
    expect(scheduleDecision(now + 60_001, now)).toBe("now");
    expect(scheduleDecision(now + MAX_SCHEDULE_AHEAD_MS, now)).toBe("now");
  });

  it("leaves anything further out for a later run", () => {
    expect(scheduleDecision(now + MAX_SCHEDULE_AHEAD_MS + 1, now)).toBe("later");
  });
});

describe("formatWhen", () => {
  it("writes the day, the time and the time zone", () => {
    // 14:00 UTC on Tuesday November 10 2026 is 9:00 AM in New York (EST).
    expect(formatWhen(Date.UTC(2026, 10, 10, 14, 0), "America/New_York")).toBe(
      "Tuesday, November 10 at 9:00 AM (America/New_York)",
    );
  });

  it("falls back to an ISO date for an unknown time zone", () => {
    expect(formatWhen(Date.UTC(2026, 10, 10, 14, 0), "Not/AZone")).toBe("2026-11-10T14:00:00.000Z");
  });
});

describe("isMondayIn", () => {
  it("uses the day in the given time zone", () => {
    // 20:00 UTC on Sunday November 8 2026 is already Monday 01:00 in Karachi.
    const sundayEveningUtc = Date.UTC(2026, 10, 8, 20, 0);
    expect(isMondayIn(sundayEveningUtc, "Asia/Karachi")).toBe(true);
    expect(isMondayIn(sundayEveningUtc, "UTC")).toBe(false);
  });

  it("is true for the daily run time on a Monday", () => {
    expect(isMondayIn(Date.UTC(2026, 10, 9, 5, 0), "Asia/Karachi")).toBe(true);
    expect(isMondayIn(Date.UTC(2026, 10, 10, 5, 0), "Asia/Karachi")).toBe(false);
  });
});
