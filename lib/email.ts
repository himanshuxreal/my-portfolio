/**
 * Email compose hand-off.
 *
 * Mobile: Gmail's *web* compose (mail.google.com/?view=cm) is broken inside
 * mobile browsers — it loads a dead page. Instead we navigate to a `mailto:`
 * URL, which the OS routes to the default mail app (the Gmail app when it's set
 * as the handler, as it is on most Android phones), pre-filling every field.
 *
 * Desktop: Gmail web compose is reliable and needs no configured mail client,
 * so we keep opening it in a new tab, falling back to `mailto:` if a popup
 * blocker stops the tab.
 */

export function isMobileDevice(): boolean {
  if (typeof window === "undefined") return false;
  const coarse = window.matchMedia?.("(pointer: coarse)").matches ?? false;
  const ua = navigator.userAgent || "";
  return coarse || /Android|iPhone|iPad|iPod|Opera Mini|IEMobile|Mobile/i.test(ua);
}

export function buildMailto(to: string, subject: string, body: string): string {
  return `mailto:${to}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

export function buildGmailCompose(to: string, subject: string, body: string): string {
  return (
    "https://mail.google.com/mail/?view=cm&fs=1" +
    `&to=${encodeURIComponent(to)}` +
    `&su=${encodeURIComponent(subject)}` +
    `&body=${encodeURIComponent(body)}`
  );
}

/**
 * Open a pre-filled compose window. On mobile this opens the native Gmail/mail
 * app; on desktop it opens Gmail web compose (with a mailto fallback).
 */
export function openEmailCompose(to: string, subject: string, body = ""): void {
  if (isMobileDevice()) {
    window.location.href = buildMailto(to, subject, body);
    return;
  }
  const win = window.open(buildGmailCompose(to, subject, body), "_blank", "noopener,noreferrer");
  if (!win) window.location.href = buildMailto(to, subject, body);
}
