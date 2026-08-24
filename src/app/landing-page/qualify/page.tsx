"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { useReducedMotion } from "framer-motion";
import styles from "./Qualify.module.css";
import QualifyStepper from "../_components/QualifyStepper";
import { OPTION_QUESTIONS, type QuestionKey } from "./questions";
import type { QualifyOption, QualifyPayload, QualifyResponse, QualifySelections } from "./types";

// Ported from reference/qualification-form.html. State (which step,
// which options are selected, the qualified/disqualified verdict) is
// React useState driving conditional classNames, not the reference's
// vanilla-JS display toggling on static divs.
const TOTAL_STEPS = 1 + OPTION_QUESTIONS.length;
const EMAIL_RE = /.+@.+\..+/;
const BOOK_CALL_PATH = "/landing-page/book-call";
// Long enough to read "You're a great fit" before the auto-redirect.
const QUALIFIED_REDIRECT_MS = 1600;

type Phase = "form" | "qualified" | "disqualified";

export default function QualifyPage() {
  const router = useRouter();
  const reduceMotion = useReducedMotion();
  const [step, setStep] = useState(0);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [honeypot, setHoneypot] = useState("");
  const [selections, setSelections] = useState<QualifySelections>({
    type: null,
    problem: null,
    budget: null,
    timeline: null,
  });
  const [phase, setPhase] = useState<Phase>("form");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // A qualified lead sees the confirmation for a moment, then moves on
  // to booking automatically - the "Book your call" link still works
  // immediately for anyone who doesn't want to wait.
  useEffect(() => {
    if (phase !== "qualified") return;
    if (reduceMotion) {
      router.push(BOOK_CALL_PATH);
      return;
    }
    const timer = window.setTimeout(() => router.push(BOOK_CALL_PATH), QUALIFIED_REDIRECT_MS);
    return () => window.clearTimeout(timer);
  }, [phase, reduceMotion, router]);

  const isContactStep = step === 0;
  const question = isContactStep ? null : OPTION_QUESTIONS[step - 1];

  const isValid = isContactStep
    ? name.trim().length > 1 && EMAIL_RE.test(email.trim())
    : Boolean(question && selections[question.key]);

  function selectOption(key: QuestionKey, option: QualifyOption) {
    setSelections((prev) => ({ ...prev, [key]: option }));
  }

  async function submit() {
    setSubmitting(true);
    setError(null);
    const payload: QualifyPayload = { name: name.trim(), email: email.trim(), honeypot, ...selections };
    try {
      const res = await fetch("/api/qualify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const detail = await res.text().catch(() => "");
        throw new Error(`Request failed (${res.status}) ${detail}`);
      }
      const data = (await res.json()) as QualifyResponse;
      setPhase(data.qualified ? "qualified" : "disqualified");
    } catch (err) {
      console.error("Qualify submit failed:", err);
      setError("Something went wrong sending that. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  function handleNext() {
    if (!isValid || submitting) return;
    if (step < TOTAL_STEPS - 1) {
      setStep((s) => s + 1);
      return;
    }
    submit();
  }

  function handleBack() {
    if (step > 0) setStep((s) => s - 1);
  }

  return (
    <div className={styles.page}>
      {/* Bare logo, not a link, no footer - this page has exactly one
          job, same convention as /book-call. */}
      <nav className={styles.nav}>
        <div className="relative h-7 w-36 md:h-8 md:w-40">
          <Image
            src="/assets/nexdev-full-logo.png"
            alt="NeXDev Logo"
            fill
            className="object-contain object-center"
            priority
          />
        </div>
      </nav>

      <QualifyStepper
        step1={phase === "form" ? "active" : "done"}
        step2={phase === "qualified" ? "active" : "waiting"}
        connectorFilled={phase === "qualified"}
        dark
      />

      <div className={styles.stage}>
        <div className={styles.card}>
          {phase === "form" && (
            <div>
              <div className={styles.countRow}>
                <span className={styles.count}>
                  Question {step + 1} of {TOTAL_STEPS}
                </span>
              </div>
              <div className={styles.qbar}>
                <span className={styles.qbarFill} style={{ width: `${((step + 1) / TOTAL_STEPS) * 100}%` }} />
              </div>

              <div key={step} className={`${styles.step} ${reduceMotion ? styles.stepNoMotion : ""}`}>
                {isContactStep ? (
                  <>
                    <h2 className={styles.stepHeading}>First, who are we talking to?</h2>
                    <p className={styles.stepHint}>Your name and best work email.</p>
                    <div className={styles.fields}>
                      <input
                        type="text"
                        className={styles.input}
                        placeholder="Full name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                      />
                      <input
                        type="email"
                        className={styles.input}
                        placeholder="Work email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                      {/* Honeypot: invisible to real visitors, bots that
                          fill every field trip it. */}
                      <input
                        type="text"
                        name="company"
                        autoComplete="off"
                        tabIndex={-1}
                        className={`${styles.honeypot} sr-only`}
                        value={honeypot}
                        onChange={(e) => setHoneypot(e.target.value)}
                        aria-hidden="true"
                      />
                    </div>
                  </>
                ) : question ? (
                  <>
                    <h2 className={styles.stepHeading}>{question.heading}</h2>
                    <p className={styles.stepHint}>{question.hint}</p>
                    <div className={styles.opts}>
                      {question.options.map((option) => {
                        const selected = selections[question.key]?.label === option.label;
                        return (
                          <label key={option.label} className={`${styles.opt} ${selected ? styles.sel : ""}`}>
                            <span className={styles.tick} />
                            <span className={styles.lab}>{option.label}</span>
                            <input
                              type="radio"
                              name={question.key}
                              className="sr-only"
                              checked={selected}
                              onChange={() => selectOption(question.key, option)}
                            />
                          </label>
                        );
                      })}
                    </div>
                  </>
                ) : null}
              </div>

              {error && <p className={styles.error}>{error}</p>}

              <div className={styles.navRow}>
                <button type="button" className={styles.back} onClick={handleBack} hidden={step === 0}>
                  &larr; Back
                </button>
                <button type="button" className={styles.next} onClick={handleNext} disabled={!isValid || submitting}>
                  {submitting ? "Sending…" : step === TOTAL_STEPS - 1 ? "See my result " : "Continue "}
                  <i>&rarr;</i>
                </button>
              </div>
            </div>
          )}

          {phase === "qualified" && (
            <div className={styles.end}>
              <div className={styles.picon}>
                <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M5 12.5l4.5 4.5L19 7"
                    stroke="#fff"
                    strokeWidth="2.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <h2>You&apos;re a great fit.</h2>
              <p>Grab a time and we&apos;ll map out exactly how we&apos;d get you there. No pitch, just a plan.</p>
              <Link href={BOOK_CALL_PATH} className={styles.go}>
                Book your call <span>&rarr;</span>
              </Link>
            </div>
          )}

          {phase === "disqualified" && (
            <div className={styles.end}>
              <div className={`${styles.picon} ${styles.piconNo}`}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M12 8v5M12 16.5v.5" stroke="#a89bff" strokeWidth="2.2" strokeLinecap="round" />
                  <circle cx="12" cy="12" r="9" stroke="#a89bff" strokeWidth="1.6" />
                </svg>
              </div>
              <h2>Let&apos;s start smaller.</h2>
              <p>
                A full build isn&apos;t the right move at this budget yet, but a paid SYNC Audit is. We&apos;ll
                pinpoint exactly why your site loses visitors and hand you a fix list you can act on, with us or
                not.
              </p>
              {/* Placeholder destination per spec - lands back on the
                  landing page until a dedicated audit page exists. */}
              <Link href="/landing-page" className={styles.go}>
                Tell me about the audit <span>&rarr;</span>
              </Link>
              {/* FLAGGED: no destination yet, intentionally not a link. */}
              <span className={styles.alt}>Just send me the free checklist</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
