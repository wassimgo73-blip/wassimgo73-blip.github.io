/* =====================================================================
   SITE CONFIG — the ONLY file you need to edit for a new client.
   Every text field has a French (fr) and English (en) version.
   ===================================================================== */
window.SITE_CONFIG = {

  /* ---------- 1. Business identity ---------- */
  business: {
    name: "Le Petit Jardin",
    tagline: {
      fr: "Cuisine lyonnaise de saison, au cœur de la Croix-Rousse",
      en: "Seasonal Lyon cooking in the heart of the Croix-Rousse"
    },
    city: "Lyon",
    demoNotice: {
      fr: "Site de démonstration — restaurant fictif.",
      en: "Demo website — fictional restaurant."
    }
  },

  /* ---------- 2. Colors & fonts ---------- */
  theme: {
    primary:   "#2f4a3a",   // deep garden green (headings, buttons)
    accent:    "#c26a32",   // warm terracotta (booking button, prices, "today")
    background:"#f6f2ea",   // cream page background
    surface:   "#fffdf8",   // cards
    dark:      "#1f3128",   // background of the menu section
    text:      "#1c241f",
    muted:     "#5f665f",
    // Google Fonts (free). Change the URL + the two family names together.
    fontUrl: "https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Inter:wght@400;500;600&display=swap",
    fontHeading: "'Instrument Serif', Georgia, serif",
    fontBody: "'Inter', system-ui, -apple-system, 'Segoe UI', sans-serif"
  },

  /* ---------- 3. Contact & booking ---------- */
  contact: {
    // WhatsApp number in international format, digits only (no +, no spaces).
    // Demo number — replace with the client's real number.
    whatsapp: "33600000000",
    phoneDisplay: "+33 6 00 00 00 00",
    email: "bonjour@lepetitjardin-demo.fr",
    address: "12 rue des Tilleuls, 69004 Lyon",
    // Free link (no API key). Opens the address in OpenStreetMap.
    mapLink: "https://www.openstreetmap.org/search?query=Croix-Rousse%2C%20Lyon",
    instagram: "https://instagram.com/",
    whatsappMessage: {
      fr: "Bonjour Le Petit Jardin, je souhaite réserver une table pour __ personnes le __ à __h. Merci !",
      en: "Hello Le Petit Jardin, I would like to book a table for __ people on __ at __. Thank you!"
    }
  },

  /* ---------- 4. Images (leave "" to show an elegant placeholder) ---------- */
  images: {
    // Demo photos: free Unsplash License — sources and credits in README.md.
    // For a real client, replace with the client's own photos.
    hero: "images/hero-courtyard.webp",
    story: "images/story-chef.jpg",
    // Short descriptions for screen readers (describe what the photo shows).
    heroAlt: { fr: "Des convives attablés dans une cour pavée ensoleillée, sous les arbres", en: "Diners at wooden tables in a sunny cobbled courtyard under the trees" },
    storyAlt: { fr: "Un chef nappe de sauce un magret et sa pomme fondante", en: "A chef spooning sauce over duck breast and a fondant potato" }
  },

  /* ---------- 5. Hero ---------- */
  hero: {
    eyebrow: { fr: "Bistrot · Lyon 4e", en: "Bistro · Lyon 4th" },
    // Wrap words in *asterisks* to set them in italic accent style.
    title: {
      fr: "Le goût du *marché*, servi comme à la maison",
      en: "The taste of the *market*, served like at home"
    },
    ctaMenu: { fr: "Voir la carte", en: "See the menu" },
    photoCaption: { fr: "La cour pavée, à l'ombre des arbres", en: "The cobbled courtyard, in the shade of the trees" }
  },

  /* ---------- 6. Story ---------- */
  story: {
    title: { fr: "Notre histoire", en: "Our story" },
    text: {
      fr: "Ouvert en 2014 par Camille et Julien, Le Petit Jardin est né d’une idée simple : cuisiner chaque matin ce que les producteurs des monts du Lyonnais apportent au marché. En cuisine, Julien monte ses jus dans des casseroles en cuivre et dresse chaque assiette à la main, cuillère après cuillère. Une petite salle de 28 couverts, et une carte qui change avec les saisons.",
      en: "Opened in 2014 by Camille and Julien, Le Petit Jardin was born from a simple idea: cook each morning whatever the farmers of the Monts du Lyonnais bring to the market. In the kitchen, Julien reduces his sauces in copper pans and finishes every plate by hand, spoon by spoon. A small 28-seat dining room, and a menu that follows the seasons."
    },
    highlights: [
      { value: "2014", label: { fr: "Depuis",            en: "Since" } },
      { value: "28",   label: { fr: "Couverts",          en: "Seats" } },
      { value: "90%",  label: { fr: "Produits locaux",   en: "Local produce" } }
    ]
  },

  /* ---------- 7. Menu ---------- */
  currency: "€",
  menu: {
    title: { fr: "La carte", en: "The menu" },
    note: {
      fr: "Prix nets, service compris. Carte susceptible d’évoluer selon le marché.",
      en: "Prices include service. The menu may change with the market."
    },
    categories: [
      {
        name: { fr: "Entrées", en: "Starters" },
        items: [
          { name: { fr: "Œuf parfait, crème de cèpes", en: "Slow-cooked egg, porcini cream" }, desc: { fr: "Noisettes torréfiées, pain de campagne", en: "Toasted hazelnuts, country bread" }, price: 11 },
          { name: { fr: "Salade lyonnaise", en: "Lyonnaise salad" }, desc: { fr: "Frisée, lardons, croûtons, œuf poché", en: "Frisée, bacon, croutons, poached egg" }, price: 10 },
          { name: { fr: "Velouté de potimarron", en: "Red kuri squash velouté" }, desc: { fr: "Huile de noix, graines grillées", en: "Walnut oil, roasted seeds" }, price: 9, tag: { fr: "Végétarien", en: "Vegetarian" } }
        ]
      },
      {
        name: { fr: "Plats", en: "Mains" },
        items: [
          { name: { fr: "Quenelle de brochet, sauce Nantua", en: "Pike quenelle, Nantua sauce" }, desc: { fr: "Riz pilaf aux herbes", en: "Herb pilaf rice" }, price: 22, tag: { fr: "Spécialité", en: "Signature" } },
          { name: { fr: "Volaille de Bresse rôtie", en: "Roast Bresse chicken" }, desc: { fr: "Jus au vin jaune, gratin dauphinois", en: "Vin jaune jus, gratin dauphinois" }, price: 26 },
          { name: { fr: "Risotto d’épeautre aux champignons", en: "Spelt & mushroom risotto" }, desc: { fr: "Parmesan affiné 24 mois", en: "24-month aged parmesan" }, price: 19, tag: { fr: "Végétarien", en: "Vegetarian" } }
        ]
      },
      {
        name: { fr: "Desserts", en: "Desserts" },
        items: [
          { name: { fr: "Tarte aux pralines roses", en: "Pink praline tart" }, desc: { fr: "La douceur lyonnaise par excellence", en: "Lyon’s signature sweet" }, price: 9 },
          { name: { fr: "Cervelle de canut", en: "Cervelle de canut" }, desc: { fr: "Fromage blanc aux herbes, ciboulette", en: "Herbed fromage blanc, chives" }, price: 7 },
          { name: { fr: "Moelleux chocolat", en: "Warm chocolate cake" }, desc: { fr: "Cœur coulant, glace vanille", en: "Molten centre, vanilla ice cream" }, price: 9 }
        ]
      },
      {
        name: { fr: "Menus", en: "Set menus" },
        items: [
          { name: { fr: "Formule déjeuner", en: "Lunch set" }, desc: { fr: "Entrée + plat ou plat + dessert, du mardi au vendredi midi", en: "Starter + main or main + dessert, Tue–Fri lunch" }, price: 21 },
          { name: { fr: "Menu du jardin", en: "Garden tasting menu" }, desc: { fr: "Entrée, plat, dessert", en: "Starter, main, dessert" }, price: 36 }
        ]
      }
    ]
  },

  /* ---------- 7b. Gallery (5–6 photos; the first one is shown large) ---------- */
  // Put files in images/. Set gallery.items to [] to hide the section.
  // Demo photos: free Unsplash License — credits in README.md.
  gallery: {
    title: { fr: "Une table, *une ambiance*", en: "A table, *a mood*" },
    text: {
      fr: "La salle, la brigade, les assiettes : un aperçu de ce qui vous attend.",
      en: "The room, the kitchen team, the plates: a glimpse of what awaits you."
    },
    items: [
      { src: "images/gallery-salle.webp",
        alt: { fr: "Salle lumineuse aux tables en bois et chaises bistrot", en: "Bright dining room with wooden tables and bistro chairs" },
        caption: { fr: "La salle", en: "The dining room" } },
      { src: "images/gallery-moules.webp",
        alt: { fr: "Cocotte de moules et frites sur une table en marbre", en: "Pot of mussels and fries on a marble table" },
        caption: { fr: "Moules-frites", en: "Mussels & fries" } },
      { src: "images/gallery-vin.webp",
        alt: { fr: "Verre de vin rouge sur une table, lumière chaude", en: "Glass of red wine on a table in warm light" },
        caption: { fr: "Vins au verre", en: "Wine by the glass" } },
      { src: "images/gallery-escargots.webp",
        alt: { fr: "Escargots au beurre persillé servis à table", en: "Snails in parsley butter served at the table" },
        caption: { fr: "Escargots persillés", en: "Parsley-butter snails" } },
      { src: "images/gallery-brigade.webp",
        alt: { fr: "Cuisiniers au travail sous des lampes chauffantes en cuivre", en: "Cooks at work under copper heat lamps" },
        caption: { fr: "La brigade", en: "The kitchen team" } },
      { src: "images/gallery-dressage.webp",
        alt: { fr: "Un chef dresse une assiette avec soin", en: "A chef carefully plating a dish" },
        caption: { fr: "Le dressage", en: "Plating" } }
    ]
  },

  /* ---------- 8. Opening hours (Monday first) ---------- */
  hours: {
    title: { fr: "Horaires", en: "Opening hours" },
    closedLabel: { fr: "Fermé", en: "Closed" },
    days: [
      { day: { fr: "Lundi",    en: "Monday" },    hours: "" },
      { day: { fr: "Mardi",    en: "Tuesday" },   hours: "12:00–14:00 · 19:00–22:00" },
      { day: { fr: "Mercredi", en: "Wednesday" }, hours: "12:00–14:00 · 19:00–22:00" },
      { day: { fr: "Jeudi",    en: "Thursday" },  hours: "12:00–14:00 · 19:00–22:00" },
      { day: { fr: "Vendredi", en: "Friday" },    hours: "12:00–14:00 · 19:00–22:30" },
      { day: { fr: "Samedi",   en: "Saturday" },  hours: "12:00–14:30 · 19:00–22:30" },
      { day: { fr: "Dimanche", en: "Sunday" },    hours: "" }
    ]
  },

  /* ---------- 9. Location ---------- */
  location: {
    title: { fr: "Nous trouver", en: "Find us" },
    access: {
      fr: "Métro C — arrêt Croix-Rousse, à 3 minutes à pied.",
      en: "Metro C — Croix-Rousse stop, 3 minutes’ walk."
    },
    mapButton: { fr: "Ouvrir le plan", en: "Open the map" }
  },

  /* ---------- 10. Reviews (fictional, for the demo) ---------- */
  reviews: {
    title: { fr: "Ils en parlent", en: "What guests say" },
    disclaimer: {
      fr: "Avis fictifs, rédigés pour cette démonstration.",
      en: "Fictional reviews, written for this demo."
    },
    items: [
      { author: "Sophie M.", rating: 5, text: { fr: "La quenelle est la meilleure que j’aie mangée à Lyon. Accueil adorable.", en: "The best quenelle I’ve had in Lyon. Lovely welcome." } },
      { author: "Thomas R.", rating: 5, text: { fr: "Terrasse charmante, produits frais, prix honnêtes. On reviendra !", en: "Charming terrace, fresh produce, fair prices. We’ll be back!" } },
      { author: "Emma L.",   rating: 4, text: { fr: "Formule déjeuner parfaite pour une pause au calme.", en: "The lunch set is perfect for a quiet break." } }
    ]
  },

  /* ---------- 11. Contact section ---------- */
  contactSection: {
    title: { fr: "Contact", en: "Contact" },
    text: {
      fr: "Une question, un groupe, un événement privé ? Écrivez-nous, nous répondons dans la journée.",
      en: "A question, a group booking, a private event? Message us — we reply the same day."
    },
    whatsappLabel: { fr: "Écrire sur WhatsApp", en: "Message on WhatsApp" },
    phoneLabel: { fr: "Téléphone", en: "Phone" },
    emailLabel: { fr: "E-mail", en: "Email" },
    addressLabel: { fr: "Adresse", en: "Address" }
  },

  /* ---------- 12. Small interface labels ---------- */
  ui: {
    nav: {
      story: { fr: "Histoire", en: "Story" },
      menu:  { fr: "Carte",    en: "Menu" },
      hours: { fr: "Horaires", en: "Hours" },
      contact: { fr: "Contact", en: "Contact" }
    },
    book: { fr: "Réserver", en: "Book a table" },
    today: { fr: "Aujourd’hui", en: "Today" },
    openToday: { fr: "Aujourd’hui", en: "Today" },
    sectionLabels: {
      story:   { fr: "Histoire", en: "Story" },
      menu:    { fr: "Carte", en: "Menu" },
      gallery: { fr: "En images", en: "Gallery" },
      hours:   { fr: "Infos pratiques", en: "Visit" },
      reviews: { fr: "Avis", en: "Reviews" },
      contact: { fr: "Contact", en: "Contact" }
    },
    photoPlaceholder: { fr: "Photo à venir", en: "Photo coming soon" },
    mapPlaceholder: { fr: "Plan", en: "Map" },
    rights: { fr: "Tous droits réservés.", en: "All rights reserved." }
  }
};
