# No-code content editor for WG St. Pauli — design

## Problem

On 2026-07-05 a manual edit to `data/series.js` introduced a JavaScript syntax
error (a line break inside a double-quoted string). Because every page loads
`data/series.js` as a plain `<script>` tag, the syntax error broke script
execution site-wide — every episode disappeared from every page, not just the
one being edited.

Root cause investigation found this was not really a one-off content-entry
mistake: `werkzeug.html`'s code generator escapes quotes and backslashes in
form input but never escapes newlines, so any multi-line `<textarea>` value
(the "Beschreibung" field) that contains a line break will always produce
invalid JavaScript. The tool itself has a latent bug that guarantees this
recurs the next time someone presses Enter while typing a summary.

The site is maintained by a non-technical owner using a copy-paste-into-GitHub
workflow described in `PFLEGE.md`. The goal of this change is to remove the
entire class of "broke the whole site with a typo" failures, not just this one
instance of it.

## Goals

- She edits text in form fields only — never sees or hand-edits code.
- A bad save can, at worst, fail to publish. It can never take down the live
  site.
- Covers all of the content she currently maintains: episodes, characters,
  links, season titles/taglines.
- No new backend/server. Stays a static GitHub Pages site.

## Non-goals

- Image uploads stay on the existing manual GitHub drag-and-drop flow — that
  path has no comma/JSON risk today.
- No general-purpose CMS (Decap/Netlify CMS) — would require an OAuth proxy
  backend for a content model that's ~250 lines of data. Out of proportion to
  the problem.

## Architecture

```
data/series.json              pure data (new) — characters, creator, reporter,
                               seasons, links, urlMap
data/series.js                rewritten as a small loader: fetches
                               series.json, computes derived fields
                               (allEpisodes, byDateDesc, latest, findEpisode),
                               sets window.WG — same shape as today
werkzeug.html                 rewritten as a forms editor that reads and
                               writes series.json directly via GitHub's
                               Contents API
.github/workflows/deploy.yml  validates series.json on every push; only
                               deploys (via GitHub Pages' Actions-based
                               deploy) if validation passes
```

No other file changes. `app.js` and all 7 HTML pages keep loading
`data/series.js` exactly as today; the loader preserves the same
synchronous "`window.WG` is ready the instant the script tag finishes"
contract they depend on, via a same-origin synchronous request for the small
local JSON file.

## Data flow

**Rendering:** page loads → `data/series.js` loader fetches
`data/series.json` synchronously → computes derived fields → sets
`window.WG` → `app.js` renders. Identical to today from a reader's
perspective.

**Editing:** she opens `werkzeug.html` → tool fetches the live
`data/series.json` via the Contents API (using a saved access token) → she
picks a mode and fills fields → "Veröffentlichen" updates the in-memory data
object, serializes with `JSON.stringify()`, and commits back via the
Contents API using the fetched file's `sha` for optimistic concurrency.
Every save is machine-generated JSON — the "broken comma/quote/newline"
failure class becomes structurally impossible.

## Components

- **`data/series.json`** — direct JSON translation of today's `characters`,
  `creator`, `reporter`, `seasons`, `links`, `urlMap`. No functions, no
  comments (JSON doesn't support them).
- **`data/series.js`** (~30 lines) — loads the JSON, rebuilds `allEpisodes`,
  `byDateDesc`, `latest`, `findEpisode` exactly as today's IIFE. On fetch or
  parse failure, logs to console and falls back to an empty-but-valid shape
  so pages degrade instead of hard-crashing.
- **`werkzeug.html`** — adds:
  - A one-time "Zugang einrichten" section: paste a GitHub fine-grained
    personal access token (contents read/write, scoped to this repo only),
    stored in `localStorage`. Includes a pre-filled GitHub token-creation
    link so the repo/permission are already selected where GitHub's UI
    supports it, plus a written fallback walkthrough in the same tone as
    `UEBERGABE.md`.
  - The existing 3 modes (Neue Folge / Folge bearbeiten / Texte & Bilder),
    with Texte & Bilder extended to real forms for Bewohner (characters),
    Links, and Staffel-Texte (title/tagline per season) — not just prose
    instructions.
  - A live preview panel reusing the site's own card CSS, so she sees what
    the episode/bio card will look like before publishing.
  - A status indicator on load: checks the last GitHub Actions run for
    `main` and shows a plain ✓ or ⚠, so a failed publish is surfaced by the
    tool itself instead of relying on her noticing the live site looks wrong.
  - "Veröffentlichen" replaces every "Code kopieren" step; commits directly
    with an auto-generated descriptive commit message (e.g. `Folge
    hinzugefügt: S2F5 "Titel" (via Werkzeug)`).
- **`.github/workflows/deploy.yml`** — on push to `main`: a validation step
  parses `data/series.json` and checks required fields are present and
  episode ids are unique; a deploy step (GitHub Pages Actions-based deploy)
  runs only if validation passed.

## Error handling

- **Save conflict** (stale `sha`, someone else saved in between): tool shows
  "Jemand hat gerade dazwischen gespeichert — bitte Seite neu laden und
  nochmal versuchen."
- **Bad/expired token** (401/403): tool shows a message pointing back to the
  setup guide to generate a new token.
- **Missing required field:** caught client-side before the API call, same
  inline red-hint style the tool already uses for Vimeo link detection.
- **CI validation fails** (defense in depth — e.g. a future manual GitHub-web
  edit that isn't valid JSON): the Actions run shows a red ✗, GitHub emails
  her, and the previous good deploy stays live.

## Rollout

GitHub Pages' deploy source (branch vs. Actions) can only be changed by
someone with **admin** rights on the repo. The maintaining collaborator has
push access but not admin, so the one-time Settings → Pages → Source →
"GitHub Actions" flip must be done by the repo owner. This will be documented
as a short numbered guide, matching the style of `UEBERGABE.md`.

`PFLEGE.md` and `UEBERGABE.md` will be rewritten to reflect the new
single-step "fill fields → Veröffentlichen" workflow, replacing the
find-the-block-and-paste instructions, and to add the one-time token setup
and Pages-source-switch steps.

## Testing

No test framework exists in this repo and none will be added, consistent
with the project's existing simplicity choices. Verification instead:

1. Visual diff of all 7 pages before/after the `series.js` rewrite — same
   rendered output.
2. Exercise the CI guard: push deliberately invalid JSON on a branch, confirm
   the Action fails and blocks deploy; fix it, confirm deploy proceeds.
3. Verify the GitHub Contents API request shape (auth, `sha` handling,
   base64 encoding) directly against a scratch file on a branch.
4. Exercise `werkzeug.html`'s form logic (field population, validation,
   preview panel) in a local preview browser.

A full end-to-end pass with a real token from Rike's own account happens
once she does the one-time setup after this ships — noted explicitly in the
handover so nobody assumes it was already verified with her real credentials.
