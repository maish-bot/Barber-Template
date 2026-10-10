# Barber template – how to customise

Everything is plain HTML and CSS. No build tools needed: edit, upload, done.

## 1. Shop details (5 minutes)
Open **assets/config.js** and change:
- shop name, phone, WhatsApp, email, address
- opening hours (these also drive the "Open now / Closed" badge)
- **bookingUrl** – paste your Booksy / Fresha / Square link. Every "Book" button
  on the site will use it. Leave it empty to use the built-in booking request form.
- **formEndpoint** – free form link from formspree.io so booking requests arrive
  in your inbox. Leave it empty and the form opens the visitor's email app.
- Google rating and number of reviews (set rating to "" to hide)
- Instagram / TikTok / Facebook links (leave "" to hide an icon)

These details update on every page automatically.

## 2. Colours and fonts (2 minutes)
Open **assets/style.css**. The first block (`:root`) has the brand colours:
- `--accent` – buttons and highlights (default brass `#b5813f`)
- `--ink` – dark sections and text
- `--paper` – light background

Fonts are `--font-display` (headings) and `--font-body` (text). If you change
fonts, also change the Google Fonts link in the `<head>` of each page.

## 3. Photos
Put photos in the **images** folder using the names in
`images/PUT-PHOTOS-HERE.txt`. Missing photos show a labelled grey box.

## 4. Prices and services
- Full price list and packages: **Pricing.html** (search for the service name).
- The home page shows a preview of the same prices: **index.html**, section "The menu".
- Service descriptions and FAQ: **Services.html**.
- The service list in the booking form: **Contacts.html** (`<select id="f-service">`).

## 5. Wording that mentions the shop name or area
Use Find & Replace across all five pages:
- "Northside Barbers" → your shop name (page titles and Google info)
- "Oldbury, Birmingham" → your area
Also update the address, phone and hours in the `application/ld+json`
block in each page's `<head>` (this is what Google reads).

## 6. Barbers and reviews
Home page (**index.html**): sections "Meet your barbers" and "What clients say".
Copy a block to add one, delete a block to remove one.
Booking form barber list: **Contacts.html** (`<select id="f-barber">`).

## Files
| File | What it is |
|---|---|
| index.html | Home |
| Services.html | Services, what to expect, FAQ |
| Pricing.html | Packages and full price list |
| Gallery.html | Photo gallery with filters |
| Contacts.html | Contact details, hours, map, booking form |
| assets/config.js | Shop details (edit this) |
| assets/style.css | Colours, fonts, layout |
| assets/main.js | Site behaviour (no need to edit) |
| images/ | Your photos |
