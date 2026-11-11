# Beauty salon one-page template — Atelier Lumière (demo)

Plain HTML + CSS + a little JavaScript. No build step, no framework, no paid service.
Open `index.html` in a browser to view it. French by default, **EN** button for English.

| File | Edit it? |
|---|---|
| `config.js` | **Yes — everything a client changes lives here** |
| `index.html`, `styles.css`, `main.js` | Normally no |
| `images/` | The client's photos |

## New client in under 10 minutes

1. **Copy the folder** — e.g. `demo-salon` → `salon-dupont`.
2. **Identity** — `business`: name, tagline, city. For a real client set both `demoNotice` texts to `""`.
3. **Colors & font** — `theme`: `background` (white), `surface` (cards, one tone step darker),
   `accent` (the one soft colour: buttons and the booking band), `text`, `muted`. One sans-serif family:
   pick one on fonts.google.com, paste its URL into `fontUrl` and update `font`
   (also update the font `<link>` in `index.html` so it loads early).
4. **Contact** — `contact`:
   - `whatsapp`: international format, digits only (`32470123456`, no `+`, no spaces).
   - `phoneDisplay`, `email`, `address`, `mapLink` (search the address on openstreetmap.org and paste the URL).
   - `whatsappMessageWith`: the booking text when the visitor picked treatments (`{list}` is replaced by them);
     `whatsappMessage`: the text when nothing is picked. FR and EN.
5. **Hero** — the salon name is the big title. `hero.image` / `hero.slides` (several photos slowly
   crossfade), `hero.imageAlt`, `badge`, `ctaServices`. `hero.title` is the line in the footer.
6. **Services & prices** — `services.categories`: each category becomes a card in a horizontal row;
   each item has `name`, `duration` (minutes), `price` (a number), optional `desc`, and `from: true`
   for "dès 145 €". Visitors tap treatments to add them to their WhatsApp request; the page adds up
   time and price.
7. **Gallery** — `gallery.items`: 5 photos with `src`, `alt`, optional `position` (e.g. `"center 30%"`),
   placed around the heading. `[]` hides the section.
8. **Team** — `team.members`: `name`, `photo` (shown round), `role`, `bio`, optional `position`.
   Remove `team.disclaimer` for a real team.
9. **Hours & contact** — `hours.days`, Monday first; `""` shows "Fermé / Closed". `hours.access` for
   transport. `contactSection.image` is the photo behind the visit card.
10. **Booking** — `booking.steps` and texts.
11. **Check** — open `index.html`, tap two treatments, click **EN**, then a booking button to confirm
    the number and the message.

Every text field is `{ fr: "...", en: "..." }`. If a client only needs French, copy the French text
into `en` too (or leave `en` empty — it falls back to French).

## Demo photos

Free photos under the [Unsplash License](https://unsplash.com/license), converted to WebP and stored in `images/`.
For a real client, replace them with the client's own photos. Team names are fictional.

| File | Photo | Photographer | Source |
|---|---|---|---|
| `images/hero-salon.webp` | Woman getting her hair styled in a bright salon | Daniel | https://unsplash.com/photos/PnDr2j28gXA |
| `images/gallery-espace.webp` (visit section) | Room with a chair, a wash basin and a plant | Daniel | https://unsplash.com/photos/Ui6DZ9A1eXU |
| `images/gallery-ongles.webp` | Hands with nude nails on white textile | Chelson Tamares | https://unsplash.com/photos/SyCC0GQi5S4 |
| `images/gallery-blond.webp` | Long hair being waved with an iron | Baylee Gramling | https://unsplash.com/photos/a3xr2mVjT5M |
| `images/gallery-soin.webp` | Woman receiving a facial treatment | kimia kazemi | https://unsplash.com/photos/u93nTfWqR9w |
| `images/gallery-maquillage.webp` | Pink and brown make-up brush set | Shamblen Studios | https://unsplash.com/photos/xwM61TPMlYk |
| `images/gallery-boucles.webp` | Hairdresser curling hair in a salon | Giorgio Trovato | https://unsplash.com/photos/wSpkThmoZQc |
| `images/team-coiffure.webp` | Hairdresser holding a hair dryer | Adam Winger | https://unsplash.com/photos/WXmHwPcFamo |
| `images/team-ongles.webp` | Woman holding nail scissors and a nail drill | Hananeh Reisi | https://unsplash.com/photos/XQ-JLcLE1V0 |
| `images/team-soins.webp` | Woman standing next to a treatment bed | Omar Lopez | https://unsplash.com/photos/BbXW495zeB4 |
| `images/team-maquillage.webp` | Make-up artist smiling while applying make-up | Alexander Mass | https://unsplash.com/photos/t3vYxCdxwAM |

Also update the matching `alt` texts in `config.js` when you change a photo.

## Notes
- Currency symbol: `currency` in `config.js`.
- Language choice is remembered per visitor (browser storage); default is French.
- The floating WhatsApp button shows on phones only; on larger screens the top bar has its own button.
- Picked treatments are remembered for the visit only (session storage) and the page works without it.
- Design: one sans-serif (Archivo), white with one soft blush accent, pill buttons, square photos,
  round team portraits. No section numbers, no italic accent words.
- Content is rendered by JavaScript. For best SEO on a real client site, consider pasting final
  texts into the HTML as well.
