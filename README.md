# Elgin Homeless Resource Map

Interactive local prototype for homelessness-related resources in Elgin, Illinois. The map uses Leaflet with OpenStreetMap street tiles and custom category markers.

## Open the prototype

Use the local server:

```text
http://127.0.0.1:4173
```

The app is static HTML, CSS, and JavaScript, so it can also be opened from `index.html`.

## Admin panel

Click `Admin` in the top right.

On first use, create an admin password. The prototype stores the password hash and all edits in this browser only. That keeps casual users out of the admin controls on this local prototype, but a public version should use a real server login before launch.

Admin controls include:

- Create, edit, duplicate, hide, and delete resources
- Edit service details, hours, contact info, coordinates, source links, requirements, category tags, main/default category, and per-pin icon/color/size overrides
- Sort the public and admin resource lists alphabetically by name or category
- Add, rename, recolor, re-icon, delete, reset, and save defaults for categories
- Edit dashboard title, subtitle, colors, map label, and default pin size with color bubbles, custom hex fields, slider/number controls, per-field reset buttons, and saved design defaults
- Edit panel widths, spacing, map sizing, resource list height, and visibility for search, stats, category chips, resource list, map toolbar, and detail panel with per-option reset buttons and saved panel defaults
- Export a full JSON backup
- Import a JSON backup
- Reset to the seeded defaults

## Testing

The local browser smoke test is:

```text
osascript -l JavaScript tests/wk-smoke.jxa
```

It tests public search, sorting, filters, multi-category resources, square map layout, real map markers, detail panels, primary call/directions actions, Google Maps links, location-aware directions, low-emphasis admin styling, admin lock state, design edits, category create/edit/delete/default reset, panel settings/default reset, resource create/delete/default reset, per-pin styling, export, import, reset, and mobile map presence without horizontal overflow.

## Data notes

Seed data was built from the provided Homeless Services Brochure PDF, the coordinates supplied in the request, and current web checks where official or credible local pages were available. Many hours can change quickly, so each resource includes source and last-checked fields in the detail panel.
