# Design Brief

**Aesthetic Direction**: Modern technical minimalism — professional portfolio with editorial typography restraint. Premium tech vibe (Stripe documentation meets design-forward engineering).

**Tone**: Authoritative yet approachable. Clean and focused. Celebrates technical depth without noise.

**Visual Differentiation**: Bold sans-serif display typography (Space Grotesk) paired with refined body font (Plus Jakarta Sans). Intentional color restraint: navy primary + warm rust accent breaks monotony only on CTAs and highlights. No gradients. Functional elegance over decoration.

**Target Audience**: Recruiters scanning for technical credibility; technical panels reviewing project depth.

| Element | Value |
| --- | --- |
| **Light BG** | `0.97 0 0` (near-white, warmth) |
| **Dark BG** | `0.12 0.01 0` (deep charcoal) |
| **Primary** | `0.32 0.11 260` (navy) / `0.72 0.13 265` dark |
| **Accent** | `0.58 0.16 30` (burnt orange) / `0.63 0.18 28` dark |
| **Muted** | `0.88 0.02 0` / `0.2 0.01 0` dark |
| **Foreground Light** | `0.22 0 0` |
| **Foreground Dark** | `0.93 0 0` |

**Typography**:
- **Display**: Space Grotesk (geometric, bold, 500–700 weight for headlines)
- **Body**: Plus Jakarta Sans (neutral, readable, 400 weight)
- **Type Scale**: xl (5xl), lg (4xl), md (2xl), body-lg (18px), body-sm (14px)

**Shape Language**: Subtle rounded corners (`0.5rem` base radius). Cards use soft borders (not prominent). No sharp angles; minimal decoration.

**Structural Zones**:

| Zone | Surface | Styling |
| --- | --- | --- |
| **Header/Nav** | `bg-card` | Sticky, border-bottom, logo + nav links |
| **Hero** | `bg-background` | Large display text, generous v-margin, call-to-action button (accent) |
| **Projects Grid** | `bg-background` | Card-based layout, 3-col on desktop, 1-col on mobile, subtle borders, hover lift |
| **Skills Section** | `bg-muted/10` | Semantic chip badges (muted colors), grid or flex layout |
| **Footer** | `bg-card` | Social links (LinkedIn, GitHub, Twitter), centered, border-top |
| **Admin Panel** | `bg-background` | Password-gated, card-based forms, accent CTA buttons |

**Spacing & Rhythm**: Generous whitespace between sections (6–8 units vertical). Cards use 4-unit padding. Consistent 8px grid.

**Component Patterns**:
- **Project Card**: Title, description, video thumbnail, tech badges (3–5 tags), subtle shadow on hover.
- **Skill Badge**: Semantic chip, small pill-shaped, muted background.
- **Button (Primary/Accent)**: Rounded, full-height padding, opacity on hover (no color shift).
- **Link (Social)**: Icon + text, hover: underline + accent color.

**Motion & Interaction**:
- Entrance: Fade-in + subtle scale on page load (0.3s ease-out).
- Hover: Card lift (shadow increase), button opacity 90%.
- Smooth transition on all interactive elements (0.3s cubic-bezier).

**Dark Mode**: Intentional — navy primary shifts to lighter blue, burnt orange remains warm, backgrounds darken to deep charcoal with minimal transparency. No color inversion.

**Constraints**:
- No gradients or complex overlays (maintain simplicity).
- No decorative animations (motion serves UX, not aesthetics).
- Palette locked: 5 core colors max (primary, secondary, accent, muted, destructive).
- Typography: 2 families only (display + body).

**Signature Detail**: Rust orange accent used sparingly — only on admin CTA, project "Featured" badge, hover state for key links. This restraint makes the accent feel intentional and premium rather than arbitrary.

