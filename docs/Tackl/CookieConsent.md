# Cookie Consent

`CookieBar` is a working consent manager, not just a notice. It is rendered from `app/(site)/Providers.tsx` in production builds.

- **First visit:** a panel with **Accept All**, **Accept Necessary** and **Let me choose**. "Let me choose" shows per-category checkboxes and a **Save Choices** button.
- **Nothing is pre-selected.** Rejecting is one click, the same as accepting, and both buttons are the same size.
- **The choice is stored** in `localStorage` (`tackl-cookie-consent`), one flag per category. It expires after a year, or as soon as you bump `CONSENT_VERSION`, and visitors are asked again.
- **Visitors can change their mind** through `openCookieSettings()`. Withdrawing a category clears readable cookies and reloads the page, so scripts that already ran are gone.
- **Accessible:** a labelled region, a real `<fieldset>` of checkboxes, focus moves into the choices, and Escape closes a reopened panel.
- **No layout jank or LCP penalty:** the panel is server-rendered so it paints with the page. A tiny inline `<head>` script hides it before first paint for visitors who have already chosen.

## Categories

| Category | Granted |
| --- | --- |
| `necessary` | Always. It needs no consent. |
| `analytics` | Only after consent |
| `marketing` | Only after consent |

To add a category:

1. Add it to `OPTIONAL_CATEGORIES` in `src/components/CookieBar/consent.ts`.
2. Give it a label and description in `CATEGORIES` in `src/components/CookieBar/index.tsx`.
3. Bump `CONSENT_VERSION`.

## Gating scripts and embeds

Load anything that sets non-essential cookies (analytics, pixels, video embeds) only behind consent.

**In JSX**, use `ConsentGate`. It renders its children once the category is granted, and immediately when the visitor grants it, with no reload:

```tsx
import ConsentGate from '@parts/ConsentGate';
import Script from 'next/script';

<ConsentGate category='analytics'>
	<Script src='https://www.googletagmanager.com/gtag/js?id=G-XXXX' />
</ConsentGate>

<ConsentGate category='marketing' fallback={<p>Accept marketing cookies to watch this video.</p>}>
	<iframe src='https://www.youtube.com/embed/…' title='Showreel' />
</ConsentGate>
```

**In code:**

```ts
import { hasConsent, onConsentChange } from '@parts/CookieBar/consent';

if (hasConsent('analytics')) initAnalytics();

const unsubscribe = onConsentChange(consent => {
	if (consent.analytics) initAnalytics();
});
```

**In CSS**, `<html data-cookie-consent>` lists the granted categories (`'analytics marketing'`, or `'necessary'`):

```scss
:global(html:not([data-cookie-consent~='marketing'])) .embed { display: none; }
```

## Google Analytics, ready to switch on

`src/components/Analytics` (rendered in `app/(site)/layout.tsx`) is GA4, wired the right way:

- **Off by default:** it renders nothing until `NEXT_PUBLIC_GA_ID` is set (e.g. `G-XXXXXXX`).
- **When set:**
  - it loads only after the visitor accepts analytics cookies, and starts the moment they do;
  - the Content-Security-Policy opens up to Google's domains automatically (see [Security.md](./Security.md));
  - GA4's enhanced measurement records client-side navigations as page views.

Using a different tool? Copy the pattern: wrap the script in `ConsentGate` with its category, and add its origins to the CSP.

## Cookie settings link

Put this somewhere permanent, usually the footer:

```tsx
'use client';
import { openCookieSettings } from '@parts/CookieBar/consent';

<button type='button' onClick={openCookieSettings}>Cookie settings</button>
```

## Customising

- **Copy:** `CookieBar` takes `title`, `message` and `privacyHref` (default `/privacy-policy/`). Category copy lives in `CATEGORIES`.
- **Look:** edit `src/components/CookieBar/styles.module.scss`. The heading uses `--font-serif`, a system stack, so it costs no font download.
- **Withdrawal clean-up:** list cookies that must survive in `NECESSARY_COOKIES`. httpOnly cookies, such as session cookies, are out of reach of JavaScript anyway.

Tackl gives you the mechanics. Your privacy policy, and which tools count as "necessary", are still yours to get right for your jurisdiction.
