# Omni-Web-Craft Skill Test Issues

Build target: Zane财经 (Zane Finance) – A-share stock learning platform  
Date: 2026-04-17

---

## 1. Missing guidance on SPA localStorage timing in Playwright tests

**Problem:** The skill mentions Playwright screenshot testing but does not cover the race condition between `page.goto()` and SPA `window.onload` handlers that read `localStorage`. In our project, the onboarding modal is triggered inside `window.addEventListener('load', ...)` if `zfinance_onboarding` is absent. Setting `localStorage` after `page.goto()` is too late; the modal already rendered.

**Fix used:** `page.addInitScript(() => localStorage.setItem('zfinance_onboarding', '1'))` *before* `page.goto()`.

**Skill gap:** Add an explicit SPA-testing tip: "For hash-router SPAs that gate UI on `localStorage`, use `addInitScript` to seed storage before navigation."

---

## 2. No troubleshooting for JSONP / CORS financial APIs

**Problem:** The skill recommends "fetch data from public APIs" but does not address the fact that many Chinese financial APIs (e.g. Tencent Finance `qt.gtimg.cn`) only support JSONP, not `fetch`/CORS. A naive `fetch()` fails with a CORS error.

**Fix used:** Dynamic `<script>` injection with `window[varName]` parsing and a timeout/ cleanup wrapper.

**Skill gap:** Add a subsection on "JSONP fallback for finance/data APIs" with a minimal script-injection pattern.

---

## 3. Incomplete stock-code validation logic led to silent data failures

**Problem:** The generated `data.js` initially produced bare 6-digit codes (e.g. `688981` instead of `sh688981`). The Tencent API silently returns no data for these, so all 220 stock cards showed "同步中...".

**Fix used:** A manual `fix-codes.js` script to prefix all codes with `sh`/`sz`/`bj` based on exchange rules, and update `findStockCode()` regex.

**Skill gap:** When generating domain-specific identifiers (stock codes, ISINs, etc.), the skill should prompt the user to verify exchange-prefix conventions or auto-insert them based on numeric ranges.

---

## 4. Generated regex fix was broken and duplicated strings

**Problem:** An auto-generated `findStockCode` fix produced:
```js
input.replace(/^(?!sh|sz|bj)/, () => 'sh' + code)
```
This duplicated the code (`600519` → `sh600519600519`).

**Fix used:** Replaced with straightforward prefix logic:
```js
const code = input.replace(/^(sh|sz|bj)/, '');
if (code.startsWith('6') || code.startsWith('68')) return 'sh' + code;
...
```

**Skill gap:** The skill should validate generated regex replacements with a small unit-test snippet before applying them, especially for user-input parsers.

---

## 5. API field index mapping was wrong for turnover / market cap

**Problem:** The initial `parseTencentData()` guessed field indices for `turnover`, `marketCap`, and `volumeMoney`. Live data showed these were off by several positions.

**Fix used:** Inspected a live `curl http://qt.gtimg.cn/q=sh600519` response and corrected indices:
- `high` → `parts[33]`
- `low` → `parts[34]`
- `changeAmount` → `parts[31]`
- `changePercent` → `parts[32]`
- `turnover` → `parts[38]`
- `pe` → `parts[39]`
- `marketCap` → `parts[44]`
- `volumeMoney` → `parts[37]`

**Skill gap:** When integrating a third-party API, the skill should suggest a "live sample validation" step before hard-coding parsers.

---

## 6. Learning page content did not render because init function was never called

**Problem:** `showSection()` in `app.js` called `renderLevelList()` for `#learning` but omitted `renderLevelContent()`. The page appeared blank below the header.

**Fix used:** Changed line 22 of `app.js` to:
```js
if (id === 'learning') { renderLevelList(); renderLevelContent(); }
```

**Skill gap:** The skill should generate a simple "section init checklist" or verify that every routed section has both list/header and content renderers wired up.

---

## 7. Deployment guide assumes repo-root serving, ignoring subfolder projects

**Problem:** The skill's GitHub Pages deployment steps assume the static files are at the repository root. Our project lives in `html_test0417/`. GitHub Pages native folder sources only support `/` or `/docs`, so a direct branch-source deployment would break.

**Fix used:** Added a GitHub Actions workflow (`actions/deploy-pages`) that uploads `./html_test0417` as the artifact root.

**Skill gap:** Add an alternative deployment path: "If your site is inside a subfolder, use a GitHub Actions workflow with `actions/upload-pages-artifact` pointing to the subfolder."

---

## 8. No mention of corporate-network PAT-based auth

**Problem:** The deployment section assumes `gh` CLI or browser OAuth is available. In this environment, `gh` is not installed and the corporate proxy blocks interactive flows.

**Fix used:** Used a stored GitHub PAT with `git remote set-url origin https://TOKEN@github.com/...` and created the repo via `curl` to the GitHub REST API.

**Skill gap:** Include a "headless / CI / corporate network" deployment variant that uses a PAT and `curl`/raw `git` commands.

---

## 9. Playwright examples lack SPA hash-routing navigation patterns

**Problem:** The skill's testing snippets focus on link-clicking. For a hash-router SPA, clicking a nav link changes `window.location.hash`, but Playwright screenshots require waiting for async section renders (charts, API polling, etc.).

**Fix used:** Used `page.evaluate(() => window.location.hash = 'section')` combined with explicit `page.waitForTimeout()` delays per section (2s default, 10s for market data, 3s for K-line charts).

**Skill gap:** Provide a hash-router screenshot recipe: `addInitScript` → `goto` → `evaluate(hash)` → `waitForTimeout(sectionSpecificDelay)` → `screenshot`.

---

## 10. HTTP server root was accidentally set to parent directory

**Problem:** A background Python server was started from `D:\kimi code` instead of `D:\kimi code\html_test0417`, causing 404s for relative asset paths during Playwright tests.

**Fix used:** Killed processes on port 8080 and restarted `python -m http.server 8080` from inside `html_test0417`.

**Skill gap:** Add a pre-test checklist: "Verify the HTTP server root matches the directory containing `index.html`."

---

---

## 11. HTTPS mixed-content blocking on GitHub Pages

**Problem:** After deploying to GitHub Pages (HTTPS), the real-time market data stopped loading and all stocks showed "同步中...". The browser's DevTools console showed `Mixed Content` errors. The generated `api.js` used `http://qt.gtimg.cn/q=...`, and modern browsers block HTTP requests from HTTPS pages.

**Fix used:** Changed the API URL to `https://qt.gtimg.cn/q=...`. Tencent's API endpoint already supports HTTPS; only the generated code defaulted to HTTP.

**Skill gap:** Add a deployment-readiness checklist item: "Verify all external API calls use HTTPS when deploying to HTTPS hosts (GitHub Pages, Vercel, Netlify, etc.)."

---

## 12. AI module over-engineering vs. simple iframe embedding

**Problem:** The skill-generated AI analysis module included a full DeepSeek API integration with JSON parsing, structured output rendering, and multiple fallback layers. In practice, the DeepSeek API requires a private key (CORS + auth issues in browser), and the fallback iframe to 同花顺问财 was more reliable and useful.

**Fix used:** Removed all DeepSeek code and kept only a single 问财 iframe query. Increased iframe height from `h-96` (384px) to `70vh` / `min-height: 520px` for better readability.

**Skill gap:** When suggesting AI integrations, the skill should warn that serverless browser-side calls to LLM APIs usually fail due to CORS + API key exposure. Recommend iframe-embedding existing financial tools (问财, 雪球, etc.) as a practical alternative for static sites.

---

## 13. Frontend aesthetics need explicit attention beyond "make it look good"

**Problem:** The initial build produced a functional but visually plain interface — flat white cards, basic borders, minimal visual hierarchy. User feedback explicitly requested beautification while keeping a professional financial look.

**Fix used:**
- Added a gradient hero section with decorative blur orbs
- Switched cards from `rounded-xl shadow border` to `rounded-2xl shadow-lg border-gray-100` with hover lifts
- Added gradient buttons (`bg-gradient-to-r`) with hover scale/shadow
- Added backdrop-blur to the navbar for a glassmorphism effect
- Added subtle gradient background to `body` for depth
- Improved tab pills, inputs with focus rings, and icon accents

**Skill gap:** The skill's design phase should include a "visual polish checklist" with concrete Tailwind patterns: gradients on primary CTAs, larger border-radius (`rounded-2xl` vs `rounded-lg`), hover micro-interactions (`hover:-translate-y-1`, `hover:shadow-xl`), and glassmorphism (`backdrop-blur`, `bg-white/80`).

---

## Summary

The `omni-web-craft` skill successfully scaffolded the project and provided a solid 6-phase workflow, but it lacked depth in four areas that caused real bugs:

1. **Domain data correctness** (stock codes, API field mapping)
2. **SPA-specific testing patterns** (localStorage seeding, hash routing, async waits)
3. **Non-standard deployment constraints** (subfolder sites, headless PAT auth)
4. **Validation of generated string/regex transforms**

**Additional post-deployment issues discovered:**
5. **HTTPS enforcement** on static hosts breaking HTTP API calls
6. **AI module pragmatism** — iframe embeds are often more reliable than client-side LLM calls
7. **Visual polish** needs concrete patterns, not just "make it look good"

Adding targeted subsections for these scenarios would significantly reduce the manual debugging required on future builds.
