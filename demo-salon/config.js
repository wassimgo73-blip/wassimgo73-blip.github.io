/* =====================================================================
   SITE CONFIG — the ONLY file you need to edit for a new client.
   Every text field has a French (fr) and English (en) version.
   ===================================================================== */
window.SITE_CONFIG = {

  /* ---------- 1. Business identity ---------- */
  business: {
    name: "Atelier Lumière",
    tagline: {
      fr: "Coiffure, ongles et soins du visage à Ixelles, dans un salon baigné de lumière.",
      en: "Hair, nails and facials in Ixelles, in a salon full of daylight."
    },
    city: "Bruxelles",
    demoNotice: {
      fr: "Site de démonstration — salon fictif.",
      en: "Demo website — fictional salon."
    }
  },

  /* ---------- 2. Colors & fonts ---------- */
  theme: {
    background: "#ffffff",   // page ground
    surface:    "#f5f2f0",   // cards and panels (one tone step from white)
    accent:     "#f2d3c7",   // soft blush: buttons and the booking band only
    text:       "#1f1c1b",   // ink
    muted:      "#6b6460",   // secondary notes
    // Google Fonts (free). One sans-serif family for headings and text.
    fontUrl: "https://fonts.googleapis.com/css2?family=Archivo:wdth,wght@100,300..600&display=swap",
    font: "'Archivo', system-ui, -apple-system, 'Segoe UI', sans-serif"
  },

  /* ---------- 3. Contact & booking ---------- */
  contact: {
    // WhatsApp number in international format, digits only (no +, no spaces).
    // Demo number — replace with the client's real number.
    whatsapp: "32470000000",
    phoneDisplay: "+32 470 00 00 00",
    email: "bonjour@atelierlumiere-demo.be",
    address: "7 rue des Lilas, 1050 Ixelles",
    // Free link (no API key). Opens the area in OpenStreetMap.
    mapLink: "https://www.openstreetmap.org/search?query=Ixelles%2C%20Bruxelles",
    // {list} is replaced by the treatments the visitor picked on the page.
    whatsappMessageWith: {
      fr: "Bonjour Atelier Lumière, je souhaite prendre rendez-vous pour : {list}. Jour souhaité : __, vers __h. Merci !",
      en: "Hello Atelier Lumière, I would like to book: {list}. Preferred day: __, around __. Thank you!"
    },
    // Used when nothing is picked.
    whatsappMessage: {
      fr: "Bonjour Atelier Lumière, je souhaite prendre rendez-vous pour : __ (soin), le __ vers __h. Merci !",
      en: "Hello Atelier Lumière, I would like to book: __ (treatment), on __ around __. Thank you!"
    }
  },

  currency: "€",

  /* ---------- 4. Hero ---------- */
  hero: {
    image: "images/hero-salon.webp",
    imageAlt: {
      fr: "Une coiffeuse coiffe une cliente dans un salon clair et lumineux",
      en: "A hairdresser styling a client in a bright, airy salon"
    },
    // The page title (h1) is the salon name; this line says what it is.
    title: { fr: "Prendre soin de soi, en pleine lumière", en: "Time for yourself, in full light" },
    // Optional extra photos: the hero slowly crossfades through them.
    slides: ["images/hero-salon.webp"],
    ctaServices: { fr: "Voir les soins", en: "See treatments" },
    badge: { fr: "Sur rendez-vous, du mardi au samedi", en: "By appointment, Tuesday to Saturday" }
  },

  /* ---------- 5. Services & prices ---------- */
  // Each category becomes a card in a horizontal row. Visitors tap treatments to add them
  // to their WhatsApp booking message. "from: true" shows "dès 145 €" / "from €145".
  services: {
    intro: {
      fr: "Touchez un soin pour l’ajouter à votre demande de rendez-vous.",
      en: "Tap a treatment to add it to your booking request."
    },
    title: { fr: "Les soins & les tarifs", en: "Treatments & prices" },
    note: {
      fr: "Tarifs TVA comprise. Le prix des couleurs dépend de la longueur des cheveux.",
      en: "Prices include VAT. Colour prices depend on hair length."
    },
    categories: [
      { name: { fr: "Cheveux", en: "Hair" }, items: [
        { name: { fr: "Coupe & brushing", en: "Cut & blow-dry" }, duration: 60, price: 58 },
        { name: { fr: "Brushing", en: "Blow-dry" }, duration: 45, price: 35 },
        { name: { fr: "Couleur racines", en: "Root colour" }, duration: 90, price: 65 },
        { name: { fr: "Balayage lumière", en: "Soft balayage" }, duration: 150, price: 145, from: true,
          desc: { fr: "Notre signature : un blond doux et naturel.", en: "Our signature: a soft, natural blonde." } },
        { name: { fr: "Soin profond à la kératine", en: "Deep keratin treatment" }, duration: 30, price: 45 }
      ]},
      { name: { fr: "Ongles", en: "Nails" }, items: [
        { name: { fr: "Manucure russe", en: "Russian manicure" }, duration: 60, price: 45 },
        { name: { fr: "Vernis semi-permanent", en: "Gel polish" }, duration: 45, price: 40 },
        { name: { fr: "Pose gel complète", en: "Full gel extensions" }, duration: 90, price: 65 },
        { name: { fr: "Beauté des pieds", en: "Pedicure" }, duration: 60, price: 50 }
      ]},
      { name: { fr: "Visage & regard", en: "Face & eyes" }, items: [
        { name: { fr: "Soin éclat Lumière", en: "Lumière glow facial" }, duration: 60, price: 75,
          desc: { fr: "Nettoyage, exfoliation douce, masque et massage.", en: "Cleanse, gentle peel, mask and massage." } },
        { name: { fr: "Soin hydratation intense", en: "Deep hydration facial" }, duration: 45, price: 62 },
        { name: { fr: "Rehaussement de cils", en: "Lash lift" }, duration: 60, price: 55 },
        { name: { fr: "Restructuration des sourcils", en: "Brow shaping" }, duration: 20, price: 22 }
      ]},
      { name: { fr: "Maquillage", en: "Make-up" }, items: [
        { name: { fr: "Maquillage jour ou soirée", en: "Day or evening make-up" }, duration: 45, price: 45 },
        { name: { fr: "Mariée, essai compris", en: "Bridal, trial included" }, duration: 150, price: 180 },
        { name: { fr: "Cours d’auto-maquillage", en: "Self make-up lesson" }, duration: 90, price: 90 }
      ]}
    ]
  },

  /* ---------- 6. Gallery (6 photos work best) ---------- */
  // Demo photos: free Unsplash License — credits in README.md.
  // "position" (optional) sets which part of the photo stays visible, e.g. "center 30%".
  gallery: {
    text: {
      fr: "Un salon clair au rez-de-chaussée, des plantes, et le temps de bien faire.",
      en: "A bright ground-floor salon, plants, and time to do things properly."
    },
    title: { fr: "L’atelier en images", en: "The salon in pictures" },
    items: [
      { src: "images/gallery-ongles.webp", caption: { fr: "Ongles nude", en: "Nude nails" },
        alt: { fr: "Mains aux ongles nude sur un plaid blanc", en: "Hands with nude nails on a white throw" } },
      { src: "images/gallery-blond.webp", caption: { fr: "Ondulations souples", en: "Soft waves" }, position: "center 35%",
        alt: { fr: "Une coiffeuse ondule de longs cheveux au fer", en: "A hairdresser waving long hair with an iron" } },
      { src: "images/gallery-soin.webp", caption: { fr: "Soin du visage", en: "Facial" },
        alt: { fr: "Une cliente reçoit un soin du visage", en: "A client receiving a facial" } },
      { src: "images/gallery-maquillage.webp", caption: { fr: "Maquillage", en: "Make-up" },
        alt: { fr: "Pinceaux et produits de maquillage aux tons rosés", en: "Make-up brushes and products in rosy tones" } },
      { src: "images/gallery-boucles.webp", caption: { fr: "Mise en forme", en: "Styling" },
        alt: { fr: "Une coiffeuse boucle les cheveux d’une cliente", en: "A hairdresser curling a client’s hair" } }
    ]
  },

  /* ---------- 7. Team (fictional names for the demo) ---------- */
  team: {
    title: { fr: "Celles qui prennent soin de vous", en: "The people who look after you" },
    disclaimer: { fr: "Équipe fictive, photos d’illustration.", en: "Fictional team, illustration photos." },
    members: [
      { name: "Camille", photo: "images/team-coiffure.webp", position: "72% center",
        role: { fr: "Coiffeuse & coloriste", en: "Hairdresser & colourist" },
        bio: { fr: "Spécialiste des blonds lumineux et des coupes faciles à vivre.", en: "Expert in luminous blondes and easy-going cuts." } },
      { name: "Inès", photo: "images/team-ongles.webp",
        role: { fr: "Prothésiste ongulaire", en: "Nail artist" },
        bio: { fr: "Manucure russe, nail art minimaliste, patience infinie.", en: "Russian manicures, minimalist nail art, endless patience." } },
      { name: "Sofia", photo: "images/team-soins.webp", position: "center 30%",
        role: { fr: "Esthéticienne", en: "Beauty therapist" },
        bio: { fr: "Soins du visage sur mesure et rehaussement de cils.", en: "Tailored facials and lash lifts." } },
      { name: "Léa", photo: "images/team-maquillage.webp", position: "center 30%",
        role: { fr: "Maquilleuse", en: "Make-up artist" },
        bio: { fr: "Mariées, shootings et cours pour apprendre les bons gestes.", en: "Brides, shoots and lessons to learn the right moves." } }
    ]
  },

  /* ---------- 8. Opening hours (Monday first) ---------- */
  hours: {
    title: { fr: "Horaires", en: "Opening hours" },
    closedLabel: { fr: "Fermé", en: "Closed" },
    days: [
      { day: { fr: "Lundi",    en: "Monday" },    hours: "" },
      { day: { fr: "Mardi",    en: "Tuesday" },   hours: "09:30–19:00" },
      { day: { fr: "Mercredi", en: "Wednesday" }, hours: "09:30–19:00" },
      { day: { fr: "Jeudi",    en: "Thursday" },  hours: "09:30–20:30" },
      { day: { fr: "Vendredi", en: "Friday" },    hours: "09:30–19:00" },
      { day: { fr: "Samedi",   en: "Saturday" },  hours: "09:00–17:00" },
      { day: { fr: "Dimanche", en: "Sunday" },    hours: "" }
    ],
    access: {
      fr: "Tram 81 — arrêt Flagey, à 4 minutes à pied. Parking public place Flagey.",
      en: "Tram 81 — Flagey stop, 4 minutes’ walk. Public car park at Place Flagey."
    }
  },

  /* ---------- 9. Booking via WhatsApp ---------- */
  booking: {
    title: { fr: "Réserver, en un message", en: "Book in one message" },
    text: {
      fr: "Pas d’application, pas de compte : écrivez-nous sur WhatsApp, nous confirmons votre créneau dans l’heure (aux heures d’ouverture).",
      en: "No app, no account: message us on WhatsApp and we confirm your slot within the hour (during opening hours)."
    },
    steps: [
      { fr: "Choisissez votre soin dans la liste ci-dessus.", en: "Pick your treatment from the list above." },
      { fr: "Envoyez-nous le message pré-rempli avec le jour qui vous arrange.", en: "Send the pre-filled message with the day that suits you." },
      { fr: "Recevez la confirmation et un rappel la veille.", en: "Get a confirmation and a reminder the day before." }
    ],
    button: { fr: "Écrire sur WhatsApp", en: "Message on WhatsApp" }
  },

  /* ---------- 10. Contact ---------- */
  contactSection: {
    image: "images/gallery-espace.webp",
    imageAlt: { fr: "Le bac à shampoing du salon, plantes vertes et murs blancs", en: "The salon’s wash area, green plants and white walls" },
    title: { fr: "Nous trouver", en: "Find us" },
    phoneLabel: { fr: "Téléphone", en: "Phone" },
    emailLabel: { fr: "E-mail", en: "Email" },
    addressLabel: { fr: "Adresse", en: "Address" },
    mapButton: { fr: "Ouvrir le plan", en: "Open the map" }
  },

  /* ---------- 11. Small interface labels ---------- */
  ui: {
    nav: {
      services: { fr: "Soins", en: "Treatments" },
      gallery:  { fr: "Galerie", en: "Gallery" },
      team:     { fr: "Équipe", en: "Team" },
      hours:    { fr: "Horaires", en: "Hours" },
      contact:  { fr: "Contact", en: "Contact" }
    },
    book: { fr: "Prendre rendez-vous", en: "Book now" },
    bookShort: { fr: "Rendez-vous", en: "Book" },
    today: { fr: "Aujourd’hui", en: "Today" },
    from: { fr: "dès", en: "from" },
    minutes: { fr: "min", en: "min" },
    picked: { fr: "Votre sélection", en: "Your selection" },
    pickedNone: { fr: "Aucun soin choisi pour l’instant : nous vous conseillerons.", en: "Nothing picked yet: we’ll advise you." },
    add: { fr: "Ajouter", en: "Add" },
    added: { fr: "Ajouté", en: "Added" },
    clear: { fr: "Tout retirer", en: "Clear" },
    total: { fr: "Total estimé", en: "Estimated total" },
    prev: { fr: "Soins précédents", en: "Previous treatments" },
    next: { fr: "Soins suivants", en: "Next treatments" },
    photoCredits: { fr: "Photos : Unsplash (voir README)", en: "Photos: Unsplash (see README)" },
    rights: { fr: "Tous droits réservés.", en: "All rights reserved." }
  }
};
