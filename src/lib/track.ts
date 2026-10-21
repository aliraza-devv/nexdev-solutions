// Thin bridge from React code to public/tracking.js. Success points that
// event delegation cannot observe (a fetch resolving, Cal.com confirming a
// booking) dispatch one of these window events and tracking.js turns it into
// the dataLayer push. The parameter types are fixed string unions on purpose,
// so no name, email, phone number or message text can be passed through.
// The event names below must match the ones in public/tracking.js.
type FormName = "qualify" | "book_call";
type LeadType = "nurture" | "booked_call";

export function emitGenerateLead(formName: FormName, leadType: LeadType): void {
  window.dispatchEvent(
    new CustomEvent("nexdev:generate_lead", {
      detail: { form_name: formName, lead_type: leadType },
    }),
  );
}

export function emitQualifyComplete(qualified: boolean): void {
  window.dispatchEvent(
    new CustomEvent("nexdev:qualify_complete", { detail: { qualified } }),
  );
}
