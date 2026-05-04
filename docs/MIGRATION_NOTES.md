# Migration Notes For Framer And Figma

These notes separate what should import cleanly as visual structure from what should be rebuilt as interactive code. The current app is a static HTML/CSS/JS prototype with Leaflet maps, local browser storage, and browser-session admin authentication.

## Should Import Cleanly Into Framer

- Public header and brand bar: Use the existing static `header.topbar` structure as the visual source.
- Search/filter card: The fields and toggle should import cleanly as controls, but will need behavior rewiring.
- Quick stats strip: Import as two stat cards using the `--font-stats` and `--type-stat` tokens.
- Category chip strip: Import one chip as a reusable component, then create default and active variants.
- Resource card chassis: Import as a reusable card with dot, title, metadata, status pill, and service tags.
- Map toolbar: Import as static chrome above the map.
- Detail panel anatomy: Import the panel, heading, category tags, sections, and action-button hierarchy as components.
- Admin modal visual shell: Import rounded modal, tab pills, cards, form fields, and action rows.
- Inline editor chrome: Import floating toolbar, panel sections, reset buttons, and input controls as visual components.

## Should Be Manually Rebuilt

- Leaflet map canvas, tiles, zoom controls, marker layer, marker offsets, and popups.
- Map marker rendering and selected-marker ring behavior.
- Search, category, sort, and open-now filtering.
- Resource list selected state syncing with the map and detail pane.
- Geolocation and directions URL generation.
- Open-now schedule calculation.
- Admin password setup/login and admin-only "Edit page" availability.
- Resource CRUD, category CRUD, import/export, and unsaved-change prompts.
- Inline edit mode save/discard buffer.
- Inline text editing, live token preview, color pickers, per-control reset, visibility toggles, resize handles, and drag-and-drop ordering.
- Local-storage persistence. For production, replace this with a real backend or Framer CMS/custom-code storage.

## Interactions That May Not Survive Visual Import

- `Use my location`: Depends on the browser Geolocation API and directions URL rebuilding.
- `Reset view`: Clears filters, resets sort, resets selected resource, and refits the map.
- Category chips: Update filter state, category dropdown, list, marker layer, stats, and detail panel.
- Resource cards: Select a resource, scroll it into view, pan/open the matching Leaflet marker, and update details.
- Map pins: Select resources, open popups, and maintain selected state.
- Detail actions: `tel:`, `mailto:`, external website, Google Maps directions, and Google Maps search links.
- Admin modal tabs: Depend on per-tab dirty state and prompt flow.
- Resource/category forms: Mutate structured resource/category data and then rerender the public page.
- Import/export: Reads and writes full JSON app state.
- Inline editor: Depends on edit-mode state, draft settings, DOM annotations, drag/drop events, resize mouse events, and before-unload prompts.

## Figma Build Guidance

- Create Figma Variables from `theme.css` before importing screens.
- Keep color variables named after the CSS tokens where possible, especially `color-bg`, `color-surface`, `color-primary`, `color-text`, and category colors.
- Create text styles from the CSS typography tokens:
  - Page title: `--font-headings`, `--type-title`, `--weight-bold`.
  - Detail title: `--font-detail-pane`, `--type-detail-title`, `--weight-bold`.
  - Stat number: `--font-stats`, `--type-stat`, `--weight-bold`.
  - Body: `--font-body`, `--type-body`, `--weight-regular`.
  - Metadata: `--type-meta`, `--weight-medium`.
  - Micro label: `--type-micro`, uppercase, `--tracking-micro`.
- Build components from the page map rather than importing every nested DOM element as-is.
- Use variants for chips, buttons, resource cards, status pills, detail actions, and admin cards.

## Framer Build Guidance

- Use the public header, left panel, stats, chips, cards, map toolbar, and detail panel as normal Framer sections/components.
- Use a custom code component or embed for the Leaflet map. A static visual import will only give you a map snapshot, not the interactive map.
- If using Framer CMS, model resources with fields that match `normalizeResource()` in `app.js`: name, categories, address, coordinates, contact fields, schedule, services, requirements, sources, visibility, and pin overrides.
- Keep the admin modal and inline editor as custom code functionality. Framer's visual import is unlikely to preserve the edit buffer, admin gating, or drag/resize behavior.
- Keep route/page structure simple: this app is one page plus modal/editor overlays.

## Code-Dependent Data Model

Primary resource fields are normalized in `normalizeResource()`:

- Identity: `id`, `name`, `visible`
- Category: `category`, `categories`, `subcategory`
- Location: `address`, `lat`, `lng`, `approximate`, `directionQuery`
- Contact: `phone`, `email`, `website`
- Availability: `hoursText`, `schedule`, `alwaysOpen`, `emergency`
- Presentation: `pinIcon`, `pinColor`, `pinSize`
- Detail content: `description`, `services`, `requirements`, `lastVerified`, `sources`

Primary design settings are normalized in `normalizeSettings()`:

- Text content: `title`, `subtitle`, `mapLabel`
- Colors: `accent`, `background`, `surface`, `text`
- Fonts: `fonts.global`, `fonts.headings`, `fonts.body`, `fonts.detailPane`, `fonts.listCards`, `fonts.stats`
- Shape and spacing: `design`
- Layout: `layout`
- Visibility: `features`
- Order: `layoutOrder`
- Categories: `categories`

## Structural Notes From This Prep Pass

- The public resource card, detail sections, detail contact actions, admin resource cards, admin category cards, and related resource chips now have named render helpers in `app.js`.
- Major page sections and component regions are labeled with code comments in `index.html`, `styles.css`, `theme.css`, and `app.js`.
- Remaining wrappers are mostly semantic landmarks, layout containers, or stateful DOM targets used by JavaScript. Avoid removing them before migration unless the matching JS selectors are updated.
- The current admin authentication is intentionally browser-local for the prototype. Production migration should enforce admin permissions server-side before saving design or resource changes.

