import { describe, expect, it } from "vitest";
import { parseLeadInput } from "./lead-input";

describe("parseLeadInput: email", () => {
  it("accepts a normal email and trims it", () => {
    const result = parseLeadInput({ email: "  sam@example.com  " });
    expect(result).toEqual({
      ok: true,
      value: { email: "sam@example.com", whatsapp: null, cameFrom: "" },
    });
  });

  it.each(["", "no-at-sign.com", "a@b", "two words@example.com", "a@@b.com"])(
    "rejects %j",
    (email) => {
      expect(parseLeadInput({ email })).toEqual({ ok: false, error: "invalid_email" });
    },
  );

  it("rejects an email longer than 254 characters", () => {
    const email = `${"a".repeat(250)}@b.co`;
    expect(parseLeadInput({ email })).toEqual({ ok: false, error: "invalid_email" });
  });

  it("rejects a missing or non-object body", () => {
    expect(parseLeadInput(undefined)).toEqual({ ok: false, error: "invalid_email" });
    expect(parseLeadInput(null)).toEqual({ ok: false, error: "invalid_email" });
    expect(parseLeadInput("sam@example.com")).toEqual({ ok: false, error: "invalid_email" });
    expect(parseLeadInput({ email: 42 })).toEqual({ ok: false, error: "invalid_email" });
  });
});

describe("parseLeadInput: honeypot", () => {
  it("treats a filled hidden field as a bot", () => {
    expect(parseLeadInput({ email: "sam@example.com", company: "Acme" })).toEqual({
      ok: false,
      error: "bot",
    });
  });

  it("ignores an empty or whitespace-only hidden field", () => {
    expect(parseLeadInput({ email: "sam@example.com", company: "   " }).ok).toBe(true);
  });
});

describe("parseLeadInput: WhatsApp number", () => {
  it.each(["+92 308 123 4567", "03081234567", "+1 (415) 555-0132", "+44-7700-900123"])(
    "accepts %j and keeps it as typed",
    (whatsapp) => {
      const result = parseLeadInput({ email: "sam@example.com", whatsapp });
      expect(result).toEqual({
        ok: true,
        value: { email: "sam@example.com", whatsapp, cameFrom: "" },
      });
    },
  );

  it("treats an empty number as not given", () => {
    const result = parseLeadInput({ email: "sam@example.com", whatsapp: "   " });
    expect(result.ok && result.value.whatsapp).toBe(null);
  });

  it.each(["abc", "12345", "+92 308 abc 4567", "1234567890123456", "<script>1234567</script>"])(
    "rejects %j",
    (whatsapp) => {
      expect(parseLeadInput({ email: "sam@example.com", whatsapp })).toEqual({
        ok: false,
        error: "invalid_whatsapp",
      });
    },
  );
});

describe("parseLeadInput: where the visitor came from", () => {
  it.each(["/case-studies/case-study-bamper", "/", "l.instagram.com"])("keeps %j", (cameFrom) => {
    const result = parseLeadInput({ email: "sam@example.com", cameFrom });
    expect(result.ok && result.value.cameFrom).toBe(cameFrom);
  });

  it.each([
    "/page?email=sam@example.com",
    "https://example.com/page",
    "/page#section",
    `/${"a".repeat(90)}`,
    "has spaces.com",
  ])("drops %j instead of passing it on", (cameFrom) => {
    const result = parseLeadInput({ email: "sam@example.com", cameFrom });
    expect(result.ok && result.value.cameFrom).toBe("");
  });
});
