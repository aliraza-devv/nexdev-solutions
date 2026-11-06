import { afterEach, describe, expect, it, vi } from "vitest";
import { leadKeyFromUnsubscribeToken, signToken, unsubscribeUrls, verifyToken } from "./tokens";

afterEach(() => {
  vi.unstubAllEnvs();
});

describe("signToken and verifyToken", () => {
  it("round-trips a payload", () => {
    const token = signToken({ k: "abc", p: "unsubscribe" }, "secret");
    expect(verifyToken(token, "secret")).toEqual({ k: "abc", p: "unsubscribe" });
  });

  it("rejects a token signed with another secret", () => {
    const token = signToken({ k: "abc" }, "secret");
    expect(verifyToken(token, "other")).toBeNull();
  });

  it("rejects a token whose body was changed", () => {
    const token = signToken({ k: "abc" }, "secret");
    const [, signature] = token.split(".");
    const forged = `${Buffer.from(JSON.stringify({ k: "xyz" })).toString("base64url")}.${signature}`;
    expect(verifyToken(forged, "secret")).toBeNull();
  });

  it("rejects junk", () => {
    expect(verifyToken("", "secret")).toBeNull();
    expect(verifyToken("nodot", "secret")).toBeNull();
    expect(verifyToken("a.b", "secret")).toBeNull();
    expect(verifyToken(signToken({ k: "abc" }, "secret"), "")).toBeNull();
  });
});

describe("unsubscribe links", () => {
  it("are not built without the secret", () => {
    vi.stubEnv("LEAD_TOKEN_SECRET", "");
    expect(unsubscribeUrls("key123")).toBeNull();
    expect(leadKeyFromUnsubscribeToken("anything")).toBeNull();
  });

  it("point at the site and carry no email address", () => {
    vi.stubEnv("LEAD_TOKEN_SECRET", "test-secret");
    const urls = unsubscribeUrls("key123");
    expect(urls).not.toBeNull();
    expect(urls!.page.startsWith("https://www.nexdevsolutions.net/unsubscribe?t=")).toBe(true);
    expect(urls!.post.startsWith("https://www.nexdevsolutions.net/api/unsubscribe?t=")).toBe(true);
    expect(urls!.page).not.toContain("@");
  });

  it("give back the same lead key", () => {
    vi.stubEnv("LEAD_TOKEN_SECRET", "test-secret");
    const urls = unsubscribeUrls("key123")!;
    const token = new URL(urls.page).searchParams.get("t")!;
    expect(leadKeyFromUnsubscribeToken(token)).toBe("key123");
  });

  it("do not accept a token made for another purpose", () => {
    vi.stubEnv("LEAD_TOKEN_SECRET", "test-secret");
    const token = signToken({ k: "key123", p: "something-else" }, "test-secret");
    expect(leadKeyFromUnsubscribeToken(token)).toBeNull();
  });

  it("do not accept a token signed with a different secret", () => {
    vi.stubEnv("LEAD_TOKEN_SECRET", "test-secret");
    const token = signToken({ k: "key123", p: "unsubscribe" }, "not-the-secret");
    expect(leadKeyFromUnsubscribeToken(token)).toBeNull();
  });
});
