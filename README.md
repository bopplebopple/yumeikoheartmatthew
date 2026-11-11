# yumeikoheartmatthew

A quiet, one-page letter site with a little bouldering in it. It's plain HTML/CSS/JS with no build step and no dependencies, designed for an iPhone 14 Plus.

Page order: **landing screen → one photo per screen (Mon to Sat) → the letter on paper at the bottom.**

## Edit the words
Open **`config.js`**. Every piece of text on the page is in there, with a comment above each field.

- `{to}` and `{from}` are replaced with the names at the top of the file.
- To add or remove a letter paragraph, copy or delete one `{ label, text }` block.
- The letter has a route-tag header (`routeCard`), plain paragraphs, your signature and an optional `ps`.
- Each photo is shown in a different layout, set by `style` on each day: `tag` (taped card), `panel` (bolted coloured frame), `arch` (arched frame), `editorial` (magazine), `hold` (cut into a climbing-hold shape), `topo` (guidebook page). Swap them freely.

## Add the photos
Drop photos into **`images/`** and rename them:

```
mon.png  tue.png  wed.png  thur.png  fri.png  sat.png
```

`.jpg`, `.jpeg` and `.webp` work too, e.g. `mon.jpg`. Keep the names **lowercase**, because Vercel's file names are case-sensitive. A missing photo shows a neat "photo coming soon" card. Photos are shown in portrait 4:5 and cropped to fit.

iPhone photos are often `.HEIC`, which most browsers can't show. Export or share them as JPG/PNG first (on iPhone: Settings → Camera → Formats → Most Compatible, or AirDrop/email them, which usually converts them).

## Preview locally
Double-click `index.html`, or serve the folder:

```
npx serve .
# or
python -m http.server 8000
```

## Deploy to Vercel
1. Commit and push to GitHub.
2. On vercel.com: **Add New → Project**, then import this repo.
3. Set Framework Preset to **Other**, leave the Build Command empty and the Output Directory as default. Click **Deploy**.

Every later `git push` redeploys automatically. Or, from this folder, run `npx vercel --prod`.

## Files
| File | What it is |
|---|---|
| `config.js` | all the text |
| `images/` | the six photos |
| `index.html` | page structure |
| `styles.css` | look and animations |
| `script.js` | fills in the text, builds the photo screens, landing/photo animations |
| `vercel.json` | Vercel settings (clean URLs) |
