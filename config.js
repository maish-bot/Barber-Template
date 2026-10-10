/* =====================================================================
   SHOP DETAILS — edit this file to customise the whole website.
   Everything here is used on every page (header, footer, contact
   page, opening hours, buttons). Save, upload, done.
   ===================================================================== */

window.SITE = {
  // Shop name as it appears in the header and footer
  name: "Northside Barbers",

  // Phone number as you want it shown, and the same number in
  // international format for the "Call" buttons (no spaces, no leading 0)
  phone: "0121 555 7890",
  phoneLink: "+441215557890",

  // WhatsApp number in international format without the + (leave "" to hide)
  whatsapp: "441215557890",

  email: "hello@northsidebarbers.co.uk",

  // Address lines (shown on the contact page and in the footer)
  address: ["123 Barber Street", "Oldbury, Birmingham", "B68 0XX"],

  // What Google Maps should search for (usually the shop name + postcode)
  mapQuery: "123 Barber Street, Oldbury B68 0XX",

  // Online booking link (Booksy, Fresha, Square, Setmore…).
  // Leave "" and the Book buttons go to the contact form instead.
  bookingUrl: "",

  // Google rating shown in the hero (set rating to "" to hide)
  rating: "4.9",
  reviewCount: "212",

  // Social links (leave "" to hide an icon)
  instagram: "https://instagram.com/",
  tiktok: "https://tiktok.com/",
  facebook: "",

  // Opening hours. Days: 0 = Sunday, 1 = Monday … 6 = Saturday.
  // Times are 24-hour "HH:MM". Days not listed show as "Closed".
  hours: [
    { label: "Monday – Friday", days: [1, 2, 3, 4, 5], open: "09:00", close: "19:00" },
    { label: "Saturday",        days: [6],             open: "08:00", close: "17:00" },
    { label: "Sunday",          days: [0],             open: "",      close: "" }
  ],

  // Where the contact form sends messages. Create a free form at
  // https://formspree.io and paste its link here, e.g.
  // "https://formspree.io/f/abcdwxyz". Leave "" and the form opens
  // the visitor's email app instead.
  formEndpoint: ""
};
