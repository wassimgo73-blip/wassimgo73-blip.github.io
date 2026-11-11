# Restaurant one-page template

Plain HTML + CSS + a little JavaScript. No build step, no framework, no paid service.
Open `index.html` in a browser to view it.

| File | Edit it? |
|---|---|
| `config.js` | **Yes — everything a client changes lives here** |
| `index.html`, `styles.css`, `main.js` | Normally no |
| `images/` (create it) | Drop the client's photos here |

## New client in under 10 minutes

1. **Copy the folder** (30 s) — e.g. `demo-restaurant` → `bistro-dupont`.
2. **Identity** (1 min) — in `config.js` → `business`: name, tagline, city.
   Delete `demoNotice` text (set both to `""`) for a real client.
3. **Colors & fonts** (1 min) — `theme`: change `primary`, `accent`, `background`,
   and `dark` (the menu section background).
   For another font, pick one on fonts.google.com, paste its URL into `fontUrl`
   and update `fontHeading` / `fontBody`.
4. **Contact** (1 min) — `contact`:
   - `whatsapp`: international format, digits only (`33612345678`, no `+`, no spaces).
   - `phoneDisplay`, `email`, `address`.
   - `mapLink`: search the address on openstreetmap.org (or Google Maps) and paste the URL.
   - `whatsappMessage`: the pre-filled booking text, FR and EN.
5. **Photos** (1 min) — put files in `images/` and set `images.hero` / `images.story`
   (e.g. `"images/hero.jpg"`) and describe them in `heroAlt` / `storyAlt`.
   Leave `""` to show the drawn-branch placeholder instead.
6. **Texts** (2 min) — `hero`, `story` (incl. the 3 `highlights`), `location.access`.
   In `hero.title`, wrap one word in `*asterisks*` to set it in italic (e.g. `*marché*`).
   `hero.photoCaption` labels the hero photo. Section labels (01 Histoire…) are in `ui.sectionLabels`.
7. **Menu** (2–3 min) — `menu.categories`: each category has `items` with
   `name`, `desc`, `price` (a number, e.g. `12.5`) and optional `tag`.
   Add or remove categories freely; tabs are generated automatically.
8. **Gallery** (1 min) — `gallery.items`: 5 or 6 photos with `src`, `alt` and `caption`.
   The first one is shown large. Use `[]` to hide the section.
9. **Hours** (30 s) — `hours.days`, Monday first. Empty `hours: ""` shows "Fermé / Closed".
10. **Reviews** (30 s) — replace with real reviews **only with the client's permission**,
   and then remove the `disclaimer` text. Keep them marked fictional for demos.
11. **Check** — open `index.html`, click **EN**, tap **Réserver** to confirm the
    WhatsApp number and message.

Every text field is `{ fr: "...", en: "..." }`. If a client only needs French,
just copy the French text into `en` too (or leave `en` empty — it falls back to French).

## Demo photos

Free photos under the [Unsplash License](https://unsplash.com/license), stored in `images/`.
For a real client, replace them with the client's own photos.

| File | Photo | Photographer | Source |
|---|---|---|---|
| `images/hero-courtyard.webp` | People dining at tables in a cobbled courtyard under a tree (Prague) | Maria Lupan | https://unsplash.com/photos/GIbbMO7mboc |
| `images/story-chef.jpg` | Chef pouring sauce over a plated dish | Urban Gyllström | https://unsplash.com/photos/a-plate-of-food-MaWMfm-HCqQ |
| `images/gallery-salle.webp` | Bright café dining room with wooden tables (Bremen) | Janosch Lino | https://unsplash.com/photos/k6w8miMpfUI |
| `images/gallery-moules.webp` | Pot of mussels and fries on a table (Oslo) | Cathrine Skovly | https://unsplash.com/photos/GHD_ec2-L1w |
| `images/gallery-vin.webp` | Glass of red wine on a table | Ambitious Studio* — Rick Barrett | https://unsplash.com/photos/-icAkJbdFZs |
| `images/gallery-escargots.webp` | Plate of escargots in a bistro (Oslo) | Cathrine Skovly | https://unsplash.com/photos/dcGiDmGjyaU |
| `images/gallery-brigade.webp` | Chefs preparing food under copper lamps | Louis Hansel | https://unsplash.com/photos/0sYLBZjgTTw |
| `images/gallery-dressage.webp` | Chef plating a dish | Jason Leung | https://unsplash.com/photos/-eKZLpj7U0E |

Images are WebP (hero under 250 KB, gallery photos 35–65 KB) to keep the page fast.
Also update `images.heroAlt` / `images.storyAlt` and each `gallery.items[].alt` in `config.js` when you change a photo.

## Notes
- Currency symbol: `currency` in `config.js`.
- Language choice is remembered per visitor (browser storage); default is French.
- Content is rendered by JavaScript. For best SEO on a real client site, consider
  pasting final texts into the HTML as well.
