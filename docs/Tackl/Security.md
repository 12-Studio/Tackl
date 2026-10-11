# Security Headers

Every page is served with a set of security headers, configured in `next.config.js` under "Security headers". The embedded Sanity Studio at `/studio` is excluded, because it loads its own scripts and APIs.

| Header | Value | Why |
| --- | --- | --- |
| `Content-Security-Policy` | See below | Limits where scripts, styles, images, frames and connections can come from |
| `Strict-Transport-Security` | `max-age=63072000` | Browsers only use HTTPS for two years. Add `includeSubDomains` once every subdomain is HTTPS. |
| `X-Content-Type-Options` | `nosniff` | No MIME-type guessing |
| `X-Frame-Options` | `SAMEORIGIN` | Other sites can't frame the site (the legacy twin of `frame-ancestors`) |
| `Referrer-Policy` | `strict-origin-when-cross-origin` | Other sites only see your origin, never full URLs |
| `Permissions-Policy` | `camera=(), microphone=(), geolocation=(), browsing-topics=()` | Switches off powerful APIs the site doesn't use |

`tests/pages.spec.ts` checks they're served.

## The Content-Security-Policy

```
default-src 'self';
script-src 'self' 'unsafe-inline';      + Google's domains when NEXT_PUBLIC_GA_ID is set
style-src 'self' 'unsafe-inline';
img-src 'self' blob: data: https:;
media-src 'self' blob: https:;
font-src 'self';
connect-src 'self';                     + Google Analytics endpoints when NEXT_PUBLIC_GA_ID is set
frame-src 'self';
object-src 'none';
base-uri 'self';
form-action 'self';
frame-ancestors 'self';
upgrade-insecure-requests
```

**What it blocks:** scripts from any other origin, plugins (`<object>`/`<embed>`), `<base>` tag hijacking, forms posting to other sites, and other sites framing yours.

**Why inline scripts are allowed.** Next streams each page's data to the browser in inline `<script>` tags. A policy without `'unsafe-inline'` needs a fresh nonce on every request. Next can only add one when every page renders per request, which switches off static rendering and Partial Prerendering. Next's experimental SRI mode doesn't help either: it hashes script files, not those inline scripts, and in testing the page never hydrated. For a marketing site, static rendering is worth more than a nonce. The Next.js docs give this same policy for apps without nonces.

**Why `frame-ancestors 'self'` rather than `'none'`:** so the site can preview inside its own embedded Studio (Sanity's Presentation tool).

## Adding a third-party service

Add its origins to `contentSecurityPolicy` in `next.config.js`, in the directive it needs:

| Service | Add |
| --- | --- |
| YouTube embed | `frame-src https://www.youtube-nocookie.com` |
| Vimeo embed | `frame-src https://player.vimeo.com` |
| A third-party script | its origin in `script-src`, plus its API in `connect-src` |
| Web fonts from a CDN | the CDN in `font-src` (and `style-src` if it serves CSS) |

Google Analytics is wired up already: setting `NEXT_PUBLIC_GA_ID` opens the policy to Google's domains automatically.

**Checking for violations:** a blocked request logs `Refused to … because it violates the following Content Security Policy directive` in the browser console. The smoke test fails on console errors, so a policy that's too tight shows up in `bun run test`.
