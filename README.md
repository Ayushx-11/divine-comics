# Divine Comics

Marketing site for **Divine Comics** — original Indian-history-inspired comics. Cinematic storytelling, drawn line by line.

Live: _(deploy to Vercel — URL added on first push)_

## Stack

Pure static HTML / CSS / vanilla JS. No build step.

```
index.html       Markup
styles.css       Design system + layout (Apple-design-language)
app.js           Scroll reveal, mobile nav, hero parallax
images/          Character art, covers, brand assets
```

## Local dev

Any static server works:

```
npx serve .
# or
python -m http.server 5173
```

Then visit `http://localhost:5173`.

## Deploy

```
npm i -g vercel
vercel
```

Or click "Import Project" on vercel.com and select this repo — no settings needed.

## Credits

- Art & story © Divine Comics
- Design — Apple HIG-inspired type, spacing, motion
- Type — Inter (system-font fallback)

## Contact

- Email · contact@divinecomics.in
- UPI   · `omkarbarwase-1@oksbi`
