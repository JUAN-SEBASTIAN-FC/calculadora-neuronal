# Converge — Design System

> **Converge** is a premium, **light-mode**, interactive web app that makes numerical
> root-finding *visible*. It is a step-by-step simulator for the **Bisection** and
> **Newton–Raphson** methods: enter a function, pick a method, and scrub through the
> iterations like a video — a synchronized graph, transport controls, and a numeric
> table show exactly how the algorithm converges toward a root.

This repository is the design system behind that product: brand, tokens, foundation
specimens, reusable React primitives, and a full UI-kit recreation of the app.

---

## 1. Product context

Converge is an **educational, high-precision** tool. The whole point is the *journey*,
not the answer. The interface is a single-screen workspace (SPA — no page nav) split
into three synchronized zones, rendered in a bright, **high-contrast light** palette:

| Zone | Role |
|---|---|
| **Config rail** (left) | Function input · method tabs (Bisección / Newton–Raphson) · method-adaptive parameter form · live display of the computed derivative f′(x) |
| **Canvas** (center, hero) | Glassmorphic plot of f(x) with per-iteration overlay layers (interval shading + midpoint for Bisection; tangent line for Newton), zoom/pan viewport, and the media **transport bar** below it |
| **Iterations table** (right / bottom) | Monospace table — iteration #, approximation, f(x), absolute & relative error — with the active step row highlighted in sync with the transport |

**Core principle:** reveal the math one step at a time. Never dump the final root as a
static calculator would. Never crowd the canvas with all iterations at once — the active
step is bright; prior steps fade to a low-opacity ghost. Always show the derivative
equation for Newton. Always degrade gracefully on invalid input with a clear error state.

### Sources & references provided
- `assets/logo-orbit.*` — primary brand mark: an orbit ring + parabola converging through
  a row of fading dots to a glowing cyan **root** on the x-axis. (Derived from the uploaded
  `logo (2).jpeg`.)
- `assets/logo-lens.*` — alternate mark: an eye/lens of intersecting axes & convergence
  dots. (Derived from the uploaded `Design_an_iconic…jpeg`.)
- `assets/reference-premium-dark-ui.png` — a **mood reference only** (a premium dark sci-fi
  game launcher). Used purely to calibrate the "premium tech / glass / high-contrast" feel
  (the precision + restraint, not the darkness) — *not* a product to recreate, and none of
  its branding is reused. The shipped system is **light mode** per the brand owner's request.

> Brand name **"Converge"** was derived from the product concept (convergence to a root).
> If the real product has a different name, rename and I'll propagate it.

---

## 2. Content fundamentals (voice & copy)

Converge speaks like a **precise, encouraging lab instrument** — clear, technical, never
chatty. It is bilingual-ready; the reference app is **Spanish-first** (Bisección,
Tolerancia, Iteraciones) with English-friendly tokens.

- **Person:** Address the user as *you* / *tú* for guidance ("Drag to pan the plot"), but
  keep system status impersonal and factual ("Converged in 7 iterations", "Sign change
  detected on [a, b]").
- **Tone:** Confident and exact. Numbers are first-class — quote them with their units and
  precision ("error 4.2 × 10⁻⁶", "tol = 1e-6"). Prefer the verb that describes the math:
  *converge, evaluate, bracket, step, bisect, iterate.*
- **Casing:** Sentence case for everything in-product (labels, buttons, headings). Reserve
  ALL-CAPS + wide tracking strictly for tiny **eyebrow labels** ("ITERACIÓN ACTUAL",
  "MÉTODO"). Never all-caps a full sentence.
- **Math typesetting:** Functions and variables are monospace: `x^3 - x - 2`, `f(x)`,
  `f'(x)`, `[a, b]`, `x₀`, `xₙ`. Use real Unicode for sub/superscripts where possible.
- **Buttons:** Short imperative verbs — "Calcular" / "Run", "Reiniciar" / "Reset",
  "Avanzar paso". Transport buttons are icon-only with tooltips.
- **Errors:** Specific and corrective, never scolding. "Función inválida — revisa la
  sintaxis cerca de '·'." / "No hay cambio de signo en [a, b]. Prueba otro intervalo."
- **Emoji:** None. This is an instrument. Iconography carries all the affordance.
- **Numbers everywhere is the *point*** — but each number must be meaningful (iteration,
  approximation, error). No decorative stat-slop.

**Example microcopy**
> Eyebrow: `MÉTODO`  ·  Tab: `Bisección` `Newton–Raphson`
> Helper: "Introduce un intervalo donde f(a) y f(b) tengan signos opuestos."
> Status pill: `Convergió · 7 iter · err 8.1e-7`
> Error: `Sintaxis inválida en la función.`

---

## 3. Visual foundations

**Overall vibe:** *Premium tech · light · high-contrast · scientific.*
Think modern lab instrument meets observatory readout: a bright, cool, paper-white
workspace, crisp solid panels with soft cool shadows, electric-blue actions, and a single
**cyan glow** reserved for the converged root — the emotional payoff of the whole app. The
plot is a pure-white "sheet" the math is drawn on. (Glassmorphic translucency is used
sparingly, on genuinely floating overlays only — never on scroll containers.)

### Color
- **Background** is a pale cool wash (`--surface-base #EBF0F7`) with a faint blue/cyan
  radial **aura** (`--grad-aura`) behind the canvas hero. Panels and the plot are solid
  **white** (`--surface-panel`, `--surface-canvas #FFFFFF`); fields are a slightly sunken
  cool tint (`--surface-sunken #E1E8F2`).
- **Primary** = electric blue `--blue-500 #2D7FF9` (buttons, active states, interval edges).
- **Accent** = convergence cyan `--cyan-500 #12A6D6` (deepened from the mark so it reads on
  white), used sparingly for the **root**, midpoints, focus glints, and the brand wordmark.
- **Method differentiation:** Bisection layers are **blue/cyan** (interval shade + midpoint);
  Newton's **tangent line is amber** `--amber-400 #E8902A` — the one warm hue, earning high
  contrast against the cool field and white plot.
- **Semantics:** success emerald `#12A66B`, warning/Newton amber `#E8902A`, danger coral
  `#F0455E` (invalid function). Text ramps from ink `--text-primary #142136` down through
  three cooler grays. The plot curve itself is dark ink (`--viz-curve`) on white.
- **Imagery vibe:** cool, blue, luminous; line-art over flat — no warm or grainy photography.

### Type
- **Space Grotesk** (display + UI) — a geometric grotesk with a technical, almost
  engineering-drawing character; great for headings and labels.
- **JetBrains Mono** (data) — every number, function string, derivative, and table cell.
  Tabular figures (`font-variant-numeric: tabular-nums`) keep decimal columns dead-aligned.
- Scale runs 11 → 60px. **Eyebrows** are 11px uppercase, tracking `0.16em`. Headings use
  tight tracking (`-0.015em`); display is tighter still.

### Space, radius, borders
- **4px base grid.** Generous breathing room in the rail; dense, tight rhythm in the table.
- **Radii:** controls/cards `--radius-md 10px` to `--radius-lg 14px`; the hero canvas panel
  `--radius-xl 20px`; pills fully round. Nothing sharp-cornered.
- **Borders** are 1px **hairline ink strokes at low alpha** (`rgba(22,35,60,.07–.20)`) —
  quiet separators, not hard rules. Focus uses a blue ring + glow.

### Elevation, glass & glow
- Light UI builds hierarchy with **soft cool shadows + solid white**, not heavy borders.
  Shadows are low-opacity navy (`--shadow-sm/md/lg`), tight and ambient.
- **Solid panels** are the rule (rail, canvas, table, transport). A glossy **top inset
  highlight** (`--inset-highlight`) gives cards a subtle lit edge.
- **Glass** (`--glass-fill` white + `--blur-md`) is reserved for true floating overlays
  (tooltips, popovers, the StatPills). ⚠️ **Never put `backdrop-filter` on a scrolling
  container** — this renderer drops the children. Use a solid background there instead.
- **Glow** (`--glow-cyan`, `--glow-cyan-lg`) is reserved: the converged root, primary-button
  hover, focus rings, the slider thumb. Restraint makes the cyan glow feel earned.

### Motion
- Transitions are **deliberate and traceable** — the user must physically follow the tangent
  or interval moving toward the root. Step advances use `--dur-step 600ms` with `--ease-trace`
  (an S-curve) for path drawing and `--ease-out` for fades.
- New overlays **draw/fade in**, never pop. Prior iterations **fade to `--viz-ghost`**.
- Hover: lighten + faint glow. Press: subtle scale-down (~0.97) + darker fill. Easing
  `--ease-standard` for controls, `--ease-spring` for the occasional playful confirm.
- All motion respects `prefers-reduced-motion`.

### Layout rules
- **Single screen, three synced zones** (rail · canvas+transport · table). No routing.
- Transport bar lives **outside** the scaled plot so it stays usable at any size.
- Canvas is the protagonist — the largest, brightest (pure white), most-elevated element.

---

## 4. Iconography

- **Library:** [**Lucide**](https://lucide.dev) — consistent ~1.75px rounded-stroke outline
  icons that match Converge's technical-but-friendly geometry. Loaded from CDN
  (`https://unpkg.com/lucide@latest`); the `IconButton` / `Button` components accept a Lucide
  icon name. **This is a substitution choice** (no bundled icon set was provided) — flagged
  for review; swap to a custom set by changing one import if desired.
- **Transport controls** map to Lucide glyphs: `skip-back` (reiniciar), `chevron-left`
  (retroceder paso), `play` / `pause` (auto), `chevron-right` (avanzar paso), `skip-forward`.
- **Style rules:** outline only, never filled except `play`/`pause` triangles; stroke inherits
  `currentColor`; sized in 16 / 18 / 20 / 24 steps; never recolor an icon with more than one
  hue. Decorative math marks (∑, ∂, ƒ, ×10⁻ⁿ) are set in JetBrains Mono, not icons.
- **No emoji, ever.** No multicolor or 3D icons.

---

## 5. Index / manifest

**Root**
- `styles.css` — global entry (link this; `@import`s only)
- `readme.md` — this guide · `SKILL.md` — portable Agent-Skill version

**Tokens** (`tokens/`) — `colors.css` · `typography.css` · `spacing.css` · `effects.css` ·
`motion.css` · `base.css` (resets + `.tabular`, `.eyebrow`, `.scroll-thin` utilities)

**Fonts** (`fonts/fonts.css`) — Space Grotesk + JetBrains Mono (Google Fonts CDN — see note)

**Assets** (`assets/`) — `logo-orbit-mark.png` (color, on-light) · `logo-orbit-light.png`
(cyan mono, on-dark) · `logo-lens-mark.png` / `logo-lens-light.png` · original JPEGs ·
`reference-premium-dark-ui.png` (mood ref only)

**Guidelines** (`guidelines/`) — foundation specimen cards (Type · Colors · Spacing ·
Effects · Brand) rendered in the Design System tab

**Components** (`components/`) — see each `*.prompt.md`:
- `core/` — Button, IconButton, Badge, Card
- `forms/` — Input, Select, Tabs, Switch, Slider, NumberField
- `data/` — IterationTable, StatPill
- `feedback/` — Tooltip, Alert

**UI kits** (`ui_kits/`) — `converge-app/` — full single-screen visualizer recreation

### Notes / substitutions to confirm
1. **Brand name** "Converge" is inferred — confirm or replace.
2. **Mode** is **light** per your request (the dark game-launcher upload was used only as a
   premium-feel mood reference, not a target). A dark theme could be added later as a token
   swap if you want both.
3. **Fonts** are loaded from Google Fonts CDN (Space Grotesk + JetBrains Mono), not bundled
   binaries — confirm or provide files to self-host.
4. **Icons** are Lucide (CDN) as a substitution — confirm or provide a custom set.
