/*
 * Conversion tracking. Loaded on every page from app/layout.js.
 * Pushes to window.dataLayer only; GTM decides what to do with each event.
 * Every event, trigger and parameter is listed in TRACKING_PLAN.md.
 *
 * Delegation only: two document listeners, no per-element listeners. Events
 * that cannot be seen from a click (a fetch resolving, Cal.com confirming a
 * booking) arrive as window CustomEvents dispatched by src/lib/track.ts.
 *
 * PII rule: params come from a fixed set of keys. Values are short, trimmed
 * strings; any value that looks like an email address or a phone number is
 * dropped. Input values, link targets and message text are never read.
 */
(function () {
  "use strict";

  if (window.__nexdevTrackingLoaded) return;
  window.__nexdevTrackingLoaded = true;
  window.dataLayer = window.dataLayer || [];

  var MAX_TEXT_LENGTH = 60;
  var IDENTIFIER_RE = /^[a-z0-9_]{1,40}$/;
  var WHATSAPP_RE = /^https?:\/\/(wa\.me|api\.whatsapp\.com|web\.whatsapp\.com)\//i;
  var BOOKING_RE = /^https?:\/\/([a-z0-9-]+\.)?(cal\.com|calendly\.com)\//i;

  var startedForms = {};
  var firedLeads = {};

  function clean(value) {
    return String(value == null ? "" : value)
      .replace(/\s+/g, " ")
      .trim()
      .slice(0, MAX_TEXT_LENGTH);
  }

  function looksSensitive(value) {
    return /@/.test(value) || /\d{7,}/.test(value.replace(/[\s().+-]/g, ""));
  }

  function safeText(value) {
    var text = clean(value);
    return text && !looksSensitive(text) ? text : "";
  }

  function identifier(value) {
    return typeof value === "string" && IDENTIFIER_RE.test(value) ? value : "";
  }

  function push(eventName, params) {
    var payload = { event: eventName };
    for (var key in params) {
      if (!Object.prototype.hasOwnProperty.call(params, key)) continue;
      var value = params[key];
      if (value === undefined || value === null || value === "") continue;
      payload[key] = value;
    }
    window.dataLayer.push(payload);
  }

  function clarityEvent(name) {
    if (typeof window.clarity === "function") {
      try {
        window.clarity("event", name);
      } catch (err) {
        // Clarity must never break the page.
      }
    }
  }

  function locationOf(el) {
    var tagged = el.closest("[data-track-location]");
    if (tagged) return tagged.getAttribute("data-track-location");
    if (el.closest("footer")) return "footer";
    if (el.closest("nav")) return "nav";
    return "page";
  }

  function startForm(form) {
    var name = identifier(form.getAttribute("data-track-form"));
    if (!name || startedForms[name]) return;
    startedForms[name] = true;
    push("form_start", { form_name: name });
  }

  function onClick(e) {
    var target = e.target;
    if (!(target instanceof Element)) return;

    var form = target.closest("[data-track-form]");
    if (form) startForm(form);

    var cta = target.closest('[data-track="cta"]');
    if (cta) {
      push("cta_click", {
        cta_text: safeText(cta.getAttribute("data-track-text") || cta.textContent),
        cta_location: identifier(cta.getAttribute("data-track-location")) || locationOf(cta),
      });
    } else {
      var nav = target.closest('[data-track="nav"]');
      if (nav) push("nav_click", { link_text: safeText(nav.textContent) });
    }

    var link = target.closest("a[href]");
    if (!link) return;
    var href = link.getAttribute("href") || "";
    var place = locationOf(link);

    if (/^mailto:/i.test(href)) {
      push("email_click", { click_location: place });
    } else if (/^tel:/i.test(href)) {
      push("phone_click", { click_location: place });
    } else if (WHATSAPP_RE.test(href)) {
      push("whatsapp_click", { click_location: place });
    } else if (BOOKING_RE.test(href) || link.getAttribute("data-track") === "booking") {
      push("booking_click", { click_location: place });
      clarityEvent("booking_click");
    }
  }

  function onFocusIn(e) {
    var target = e.target;
    if (!(target instanceof Element)) return;
    var form = target.closest("[data-track-form]");
    if (form) startForm(form);
  }

  // Capture phase so a handler that stops propagation cannot hide a click.
  document.addEventListener("click", onClick, true);
  document.addEventListener("focusin", onFocusIn, true);

  // Fired by the app only after the server or Cal.com confirmed success.
  // At most one generate_lead per lead_type per page load.
  window.addEventListener("nexdev:generate_lead", function (e) {
    var detail = (e && e.detail) || {};
    var formName = identifier(detail.form_name);
    var leadType = identifier(detail.lead_type);
    if (!formName || !leadType || firedLeads[leadType]) return;
    firedLeads[leadType] = true;
    push("generate_lead", { form_name: formName, lead_type: leadType });
    clarityEvent("generate_lead");
  });

  window.addEventListener("nexdev:qualify_complete", function (e) {
    var detail = (e && e.detail) || {};
    push("qualify_complete", { qualified: detail.qualified === true });
  });
})();
