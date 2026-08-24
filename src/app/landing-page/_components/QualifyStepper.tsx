import type { CSSProperties } from "react";
import styles from "./QualifyStepper.module.css";

type StepStatus = "waiting" | "active" | "done";

interface QualifyStepperProps {
  step1: StepStatus;
  step2: StepStatus;
  connectorFilled: boolean;
  /** Use on a dark page background (/qualify). Omit on white pages
   * (/book-call). */
  dark?: boolean;
}

// The two-step parent stepper from reference/qualification-form.html.
// Reused on both /qualify (step 1 active) and /book-call (step 1 done,
// step 2 active) so the funnel reads as one continuous flow.
export default function QualifyStepper({ step1, step2, connectorFilled, dark = false }: QualifyStepperProps) {
  const statusClass = (status: StepStatus) =>
    status === "done" ? styles.done : status === "active" ? styles.active : "";

  return (
    <div className={`${styles.parent} ${dark ? styles.dark : ""}`}>
      <div className={`${styles.pstep} ${statusClass(step1)}`}>
        <span className={styles.dot}>1</span>
        <span className={styles.txt}>Quick questions</span>
      </div>
      <div className={styles.pconn}>
        <i style={{ "--f": connectorFilled ? 1 : 0 } as CSSProperties} />
      </div>
      <div className={`${styles.pstep} ${statusClass(step2)}`}>
        <span className={styles.dot}>2</span>
        <span className={styles.txt}>Book your call</span>
      </div>
    </div>
  );
}
