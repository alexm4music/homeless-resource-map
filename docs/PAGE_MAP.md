# Elgin Homeless Resource Map Page Map

This page map is organized for Framer and Figma migration. Code comments in `index.html`, `styles.css`, `theme.css`, and `app.js` use the same section/component names where practical.

## File Inventory

- `index.html`: Static page shell, semantic landmarks, admin modal mount, inline editor mount, empty-state template.
- `theme.css`: Design tokens for color, typography, spacing, radii, elevation, layout, and admin/editor controls.
- `styles.css`: Public, admin, inline editor, map, and responsive component styles.
- `app.js`: Data, rendering, filtering, map integration, admin editing, inline design editing, persistence.
- `vendor/leaflet/`: Third-party map library files.

## Public Page Sections

### Public App Shell

- Code: `#app.app-shell`
- Purpose: Whole-page wrapper and page padding.
- Primary tokens: `--app-padding`, `--color-bg`, `--font-body`.
- Migration note: Import as the root Framer page frame or Figma top-level frame.

### Public Header / Brand Bar

- Code: `.topbar`
- Components:
  - `.brand-lockup`: pictographic mark plus title block.
  - `.brand-mark`: house/pin SVG mark.
  - `#siteTitle`: dashboard title.
  - `#siteSubtitle`: dashboard subtitle.
  - `.top-actions`: `Use my location`, `Edit page`, `Admin`.
- JS settings: `title`, `subtitle`, `brandMarkStyle`, `layoutOrder.header`, `layoutOrder.topActions`.
- Migration note: Import cleanly as static header chrome, but `Use my location`, admin auth, and edit-mode entry need code.

### Three-Panel Resource Dashboard

- Code: `.dashboard`
- Columns:
  - `.sidebar`: left discovery panel.
  - `.map-area`: central map panel.
  - `#detailPanel.detail-panel`: selected resource detail panel.
- JS settings: `layout.sidebarWidth`, `layout.detailWidth`, `layout.panelGap`, `layoutOrder.dashboard`.
- Migration note: Recreate as a responsive three-column layout with matching constraints. The live map and selected-state syncing require custom code.

## Left Discovery Panel Components

### Search and Filter Card

- Code: `.search-panel`
- Controls:
  - `#searchInput`
  - `#categoryFilter`
  - `#sortFilter`
  - `#openNowFilter`
- JS behavior: Query filtering, category filtering, sort mode, open-now filtering.
- Migration note: Imports visually, but all filtering requires code or a Framer data component.

### Quick Stats Strip

- Code: `.quick-stats`
- Values:
  - `#totalCount`
  - `#openCount`
- JS renderer: `renderStats(filtered)`.
- Migration note: Static design imports cleanly; live counts require code.

### Category Chip Strip

- Code: `#categoryStrip.category-strip`
- JS renderer: `renderCategoryControls()`, `categoryChip()`.
- Component anatomy:
  - `.chip`
  - `.chip-dot`
  - `.chip-label`
  - `.chip-count`
- Migration note: Build one reusable chip component with states: default, hover, active.

### Scrollable Resource Card List

- Code: `.resource-list`, `#resourceList.cards`
- JS renderers: `renderList()`, `renderResourceCard()`, `renderServiceTags()`.
- Component anatomy:
  - `.resource-card`
  - `.card-title-row`
  - `.card-dot`
  - `.card-title`
  - `.card-meta`
  - `.status-pill`
  - `.service-tag`
  - `.resource-list-fade`
  - `.scroll-more-cue`
- Migration note: Resource cards import well as reusable variants. List scrolling, selected state, and search results require code.

## Center Map Panel Components

### Map Toolbar

- Code: `.map-toolbar`
- Components:
  - `#mapLabel`
  - `#mapStatus`
  - `#resetViewBtn`
- JS settings: `mapLabel`.
- Migration note: Imports cleanly as static chrome; reset behavior requires code.

### Leaflet Map Canvas

- Code: `.map-wrap`, `#map.real-map`
- JS renderers: `initializeMap()`, `renderMapMarkers()`, `renderMarkerPopup()`.
- Component anatomy:
  - `.resource-marker`
  - `.marker-popup`
  - Leaflet tile layer and controls.
- Migration note: Manually rebuild or embed as a code component. Visual import will not preserve Leaflet behavior.

## Right Detail Panel Components

### Resource Detail Panel

- Code: `#detailPanel.detail-panel`
- JS renderers:
  - `renderDetails()`
  - `renderDetailCategoryTags()`
  - `renderDetailSection()`
  - `renderContactLinks()`
  - `renderSourceLinks()`
- Component anatomy:
  - `.detail-heading`
  - `.detail-category`
  - `.category-tag`
  - `.detail-section`
  - `.contact-grid`
  - `.contact-link`
  - `.source-link`
  - `.detail-empty`
- Migration note: Rebuild as reusable detail sections and action buttons. Selected-resource data binding requires code.

## Admin Sections

### Admin Modal / Data Management

- Code: `#adminDialog.admin-dialog`, `#adminBody.admin-body`
- JS renderers:
  - `renderAdmin()`
  - `renderAdminLock()`
  - `renderContentTab()`
  - `renderAdminResourceCard()`
  - `renderCategoriesTab()`
  - `renderAdminCategoryCard()`
  - `renderRelatedResourceChip()`
  - `renderImportTab()`
- Tabs:
  - Resources
  - Categories
  - Import/Export
  - Lock panel
- Migration note: Visual structure can be recreated, but CRUD, unsaved prompts, import/export, and local persistence are code-heavy.

### Inline Page Editor / Design Controls

- Code: `#inlineEditor.inline-editor`
- JS renderers and handlers:
  - `enterInlineEditMode()`
  - `renderInlineEditor()`
  - `applyInlineEditableBlocks()`
  - `handleInlineEditorInput()`
  - `handleInlineResizeStart/Move/End()`
  - `handleInlineDragStart/Over/Drop/End()`
- Panel groups:
  - Typography
  - Colors
  - Spacing
  - Mark
- Migration note: Rebuild manually as product functionality. Visual import will not preserve drag, resize, save-buffer, or admin-only behavior.

## Design Token Map

### Typography

- `--font-global`
- `--font-headings`
- `--font-body`
- `--font-detail-pane`
- `--font-list-cards`
- `--font-stats`
- `--type-title`
- `--type-detail-title`
- `--type-stat`
- `--type-admin-title`
- `--type-section`
- `--type-body`
- `--type-meta`
- `--type-micro`

### Spacing

- `--space-1`: 4px
- `--space-2`: 8px
- `--space-3`: 12px
- `--space-4`: 16px
- `--space-5`: 24px
- `--space-6`: 32px
- `--space-7`: 48px

### Shape And Surface

- `--radius-control`
- `--radius-card`
- `--radius-pane`
- `--radius-pill`
- `--border-hairline`
- `--border-soft`
- `--shadow-card`
- `--shadow-card-hover`
- `--shadow-pane`
- `--shadow-popover`

### Color

- `--color-bg`
- `--color-surface`
- `--color-surface-raised`
- `--color-surface-muted`
- `--color-text`
- `--color-text-soft`
- `--color-muted`
- `--color-primary`
- `--color-primary-hover`
- `--color-primary-ring`
- `--color-success`
- `--color-crisis`
- Category tokens: `--category-*` and `--category-*-fill`.

## Recommended Figma Components

- Header / Brand Bar
- Brand Mark
- Button: primary, ghost, tertiary, danger, icon
- Category Chip: default, active
- Resource Card: default, hover, selected
- Status Pill: open, closed, call
- Service Tag / Category Tag
- Panel Surface
- Map Toolbar
- Marker Pin
- Marker Popup
- Detail Header
- Detail Section
- Contact Action Button
- Admin Resource Card
- Admin Category Card
- Inline Editor Toolbar

