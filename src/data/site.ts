/**
 * Every string here is lifted from the live silverplay.in storefront so the
 * revamp stays copy-accurate. Section components read from this file only.
 */

export const brand = {
  name: "Silver Play",
  tagline: "Think Silver. Think Silver Play",
  descriptor:
    "Handcrafted sterling silver jewellery, forged for the woman who wears her story",
  footerStatement:
    "Handcrafted sterling silver jewellery, forged in the ancient tradition",
  curator: "Curated By Dalljiet Kaur",
  copyright:
    "© 2026 Silver Play. All rights reserved. Crafted with devotion in India.",
  logo: "https://silverplay.in/cdn/shop/files/SP_logo_1.png",
  logoMark: "https://silverplay.in/cdn/shop/files/SP_WHite_log_SHort.png",
  email: "care@silverplay.in",
  social: [
    { label: "Instagram", href: "https://instagram.com" },
    { label: "Facebook", href: "https://facebook.com" },
  ],
};

export const nav = [
  { label: "Shop", href: "/shop" },
  {
    label: "Collections",
    href: "/collections",
    children: [
      { label: "Earrings", href: "/collections/earrings" },
      { label: "Pendants", href: "/collections/pendants" },
      { label: "All Jewellery", href: "/collections/gift-collection" },
    ],
  },
  { label: "About", href: "/about" },
  { label: "Journal", href: "/journal" },
  { label: "Stone Guide", href: "/stone-guide" },
  { label: "Contact", href: "/contact" },
];

/**
 * The "Collections" mega-menu: tabs down the left (matching Silver Play's
 * real catalogue split — Earrings / Pendants / Rakhi), a column of real
 * collection links per tab, and a small real-product preview on the right —
 * the same three-part layout the live site's own mega-menu uses, and the
 * standard e-commerce mega-nav pattern (category rail + links + featured
 * products) generally.
 */
export const megaNav = {
  tabs: [
    {
      key: "earrings",
      label: "Earrings",
      href: "/collections/earrings",
      links: [
        { label: "All Earrings", href: "/collections/earrings" },
        { label: "Bali Collection", href: "/collections/baali-collection" },
        { label: "Jhumka Earrings", href: "/collections/jhumka-earrings" },
        { label: "Hoop Earrings", href: "/collections/hoop-earrings" },
        { label: "Stud Earrings", href: "/collections/stud-earrings-tops" },
        { label: "Long Earrings", href: "/collections/long-earrings" },
        { label: "Gen-Z Edit", href: "/collections/gen-z-edit-everyday-silver" },
      ],
      featuredLabel: "Bestsellers",
      products: [
        {
          handle: "sterling-silver-silver-cascade-chains-earring",
          title: "Sterling Silver Silver Cascade Chains Earring",
          price: 5450,
          image:
            "https://cdn.shopify.com/s/files/1/0702/4456/5101/files/sterling-silver-cascade-chains-earring.png?v=1786310334",
        },
        {
          handle: "sterling-silver-designer-monarch-elegance-drop-earring",
          title: "Sterling Silver Designer Monarch Elegance Drop Earring",
          price: 4999,
          image:
            "https://cdn.shopify.com/s/files/1/0702/4456/5101/files/sterling-silver-designer-monarch-elegance-drop-earring.png?v=1786310352",
        },
        {
          handle: "sterling-silver-floral-radiance-indo-western-earring",
          title: "Sterling Silver Floral Radiance Indo Western Earring",
          price: 13500,
          image:
            "https://cdn.shopify.com/s/files/1/0702/4456/5101/files/sterling-silver-floral-radiance-indo-western-earring.png?v=1786310330",
        },
        {
          handle:
            "sterling-silver-heritage-anarkali-rani-style-earring-with-self-antique-design",
          title: "Sterling Silver Heritage Anarkali Rani Style Earring",
          price: 29999,
          image:
            "https://cdn.shopify.com/s/files/1/0702/4456/5101/files/sterling-silver-heritage-anarkali-rani-style-earring-with-self-antique-design.png?v=1786310368",
        },
      ],
    },
    {
      key: "pendants",
      label: "Pendants",
      href: "/collections/pendants",
      links: [
        { label: "All Pendants", href: "/collections/pendants" },
        { label: "Kavach", href: "/collections/kavach" },
        { label: "Moonlight Sparkle", href: "/collections/moonlit-sparkle" },
        {
          label: "Lakshmi Ratna",
          href: "/collections/lakshmi-ratna-wealth-prosperity-abundance",
        },
        {
          label: "Shakti Kavach",
          href: "/collections/shakti-kavach-protection-strength-grounding",
        },
        { label: "Gemstone", href: "/collections/gemstone-jewellery" },
      ],
      featuredLabel: "Best of Pendants",
      products: [
        {
          handle: "sterling-silver-royal-medallion-pyrite-pendant",
          title: "Sterling Silver Royal Medallion Pyrite Pendant",
          price: 25000,
          image:
            "https://cdn.shopify.com/s/files/1/0702/4456/5101/files/SterlingSilverRoyalMedallionPyritePendant.png?v=1787114961",
        },
        {
          handle: "sterling-silver-divine-lakshmi-pyrite-pendant",
          title: "Sterling Silver Divine Lakshmi Pyrite Pendant",
          price: 25000,
          image:
            "https://cdn.shopify.com/s/files/1/0702/4456/5101/files/LaxmiPendant.png?v=1786971061",
        },
        {
          handle: "sterling-silver-trishul-naga-amethyst-pendant",
          title: "Sterling Silver Trishul Naga Amethyst Pendant",
          price: 21000,
          image:
            "https://cdn.shopify.com/s/files/1/0702/4456/5101/files/amethyst-trishul.png?v=1785367993",
        },
        {
          handle: "sterling-silver-trinetra-naga-sunstone-pendant",
          title: "Sterling Silver Trinetra Naga Sunstone Pendant",
          price: 25000,
          image:
            "https://cdn.shopify.com/s/files/1/0702/4456/5101/files/sunstone-serpent.png?v=1785367993",
        },
      ],
    },
    {
      key: "rakhi",
      label: "Rakhi",
      href: "/collections/rakhi",
      links: [
        { label: "All Rakhi", href: "/collections/rakhi" },
        { label: "For the Special Bond", href: "/collections/for-the-special-bond" },
        { label: "Gift for Her", href: "/collections/gift-for-her" },
      ],
      featuredLabel: "Rakhi Edit",
      products: [
        {
          handle: "sterling-silver-ek-onkar-golden-rakhi",
          title: "Sterling Silver Ek Onkar Golden Rakhi",
          price: 1250,
          image:
            "https://cdn.shopify.com/s/files/1/0702/4456/5101/files/silver-play-gift-box-ek-onkar-golden-rakhi.png?v=1785833719",
        },
        {
          handle: "sterling-silver-golden-trishul-rakhi",
          title: "Sterling Silver Golden Trishul Rakhi",
          price: 1250,
          image:
            "https://cdn.shopify.com/s/files/1/0702/4456/5101/files/sterling-silver-golden-trishul-rakhi-closeup.png?v=1785833718",
        },
        {
          handle: "sterling-silver-floral-om-rakhi",
          title: "Sterling Silver Floral Om Rakhi",
          price: 1250,
          image:
            "https://cdn.shopify.com/s/files/1/0702/4456/5101/files/sterling-silver-floral-om-rakhi-closeup.png?v=1785833698",
        },
        {
          handle: "sterling-silver-shiva-trishul-rakhi",
          title: "Sterling Silver Shiva Trishul Rakhi",
          price: 1250,
          image:
            "https://cdn.shopify.com/s/files/1/0702/4456/5101/files/sterling-silver-shiva-trishul-rakhi-gift-box.png?v=1785833712",
        },
      ],
    },
  ],
} as const;

export const hero = {
  headline: "Think Silver. Think Silver Play",
  sub: "Handcrafted sterling silver jewellery, forged for the woman who wears her story",
  ctas: [
    { label: "Explore Silver Treasure", href: "/collections/earrings" },
    { label: "Explore Regal Pendants", href: "/collections/pendants" },
  ],
  media: [
    "https://silverplay.in/cdn/shop/articles/ChatGPT_Image_Jun_24_2026_11_11_09_AM.png",
    "https://silverplay.in/cdn/shop/articles/ChatGPT_Image_Jun_20_2026_10_39_39_AM_2.png",
    "https://silverplay.in/cdn/shop/files/ChatGPT_Image_Jun_5_2026_05_07_07_PM.png",
    "https://silverplay.in/cdn/shop/files/ChatGPT_Image_Jul_29_2026_10_19_34_PM.png",
  ],
};

/**
 * Copy for the scroll-scrubbed cinematic hero. Chapters crossfade in/out as
 * the visitor scrolls; `range` is a [start, end] window in percent of the
 * hero's total scroll track. Deliberately sparse — the video carries the
 * scene, text is a caption layered over it, not a headline competing with it.
 */
export const cinematicHero = {
  /** Drop the exported video file at this path to activate scroll-scrubbing. */
  videoSrc: "/hero/silverplay-cinematic.mp4",
  videoSrcMobile: "/hero/silverplay-cinematic-mobile.mp4",
  poster:
    "https://silverplay.in/cdn/shop/articles/ChatGPT_Image_Jun_24_2026_11_11_09_AM.png",
  /**
   * The supplied cut has a baked-in end card (title text) starting ~6.7s in.
   * Scroll progress maps only up to this timestamp — never further — so the
   * visitor never scrubs into that card; our own "final" chapter takes over
   * instead. Re-check this by scrubbing the file frame-by-frame if it's ever
   * replaced.
   */
  videoTrimEndSeconds: 6.5,
  chapters: [
    { id: "mark", range: [0, 8], title: "Silverplay" },
    {
      id: "opening",
      range: [8, 15],
      title: "Timeless Silver.",
      sub: "Crafted as Heritage.",
    },
    {
      id: "craft",
      range: [17, 33],
      title: "925 Sterling Silver",
      sub: "Artisan crafted in India",
    },
    {
      id: "karigari",
      range: [36, 54],
      deva: "कारीगरी",
      sub: "Crafted by hand. Made to be treasured.",
    },
    {
      id: "virasat",
      range: [56, 74],
      deva: "विरासत",
      sub: "Stories of silver, carried forward.",
    },
    {
      id: "final",
      range: [93, 100],
      // The last stretch of footage holds the jewellery box mid-frame —
      // dock this chapter to the bottom so the CTA never sits on top of it.
      dock: "bottom",
      title: "Discover Silverplay",
      cta: { label: "Explore Collection", href: "/collections/earrings" },
    },
  ],
} as const;

/** The repeating trust banner. */
export const assurances = [
  "BIS Certified",
  "925 Sterling Silver",
  "Purity Guaranteed",
  "Artisan Crafted in India",
  "Savings With Every Purchase",
  "The Silver Play Exchange Policy",
  "Free Shipping on Prepaid Orders",
  "Skin-Friendly",
];

/** Editorial edits — each maps to a real collection handle. */
export const edits = [
  {
    handle: "gen-z",
    title: "Gen Z — It Girl",
    copy: "For the girl who makes silver look effortless and new. Fresh, playful 925 silver for brunches, reels, college fits, coffee dates and casual glam days.",
    picks: [
      "sterling-silver-feathered-sparrow-earrings",
      "sterling-silver-butterfly-flutter-earrings",
      "sterling-silver-triangular-sword-earrings",
      "sterling-silver-dragonfly-whisper-earrings",
    ],
  },
  {
    handle: "minimalist-collection",
    title: "Her Royal Simplicity",
    copy: "For the woman who loves jewellery that feels effortless, personal and quietly beautiful.",
    picks: [
      "sterling-silver-turquoise-blossom-grace-earring",
      "sterling-silver-emerald-sunburst-jewel-earring",
      "sterling-silver-flower-stud-earrings",
      "sterling-silver-half-moon-sophistication-earrings",
      "sterling-silver-twin-line-minimalist-earrings",
    ],
  },
  {
    handle: "quiet-luxury-2",
    title: "Cool Girl Silver",
    copy: "Easy silver with a little attitude. Made for denim days, street style, casual outfits and experimental fashion moods.",
  },
  {
    handle: "spotlight-glam",
    title: "Spotlight Glam",
    copy: "Statement silver made for nights, events and moments that need presence.",
  },
  {
    handle: "festive-wedding-collection",
    title: "Effortless Elegance",
    copy: "Perfect for women who love Indian silhouettes, celebrity inspired ethnic styling, statement silver and looks that feel graceful but not predictable.",
    picks: [
      "sterling-silver-peridot-designer-earring",
      "sterling-silver-green-western-dangler-green-onyx-earring",
      "sterling-silver-crimson-elara-drops-earring",
      "sterling-silver-crimson-elegance-drops-earring-mix-of-pink-and-green",
    ],
  },
];

export const occasions = [
  {
    handle: "party-wear",
    title: "Party Wear",
    copy: "Make every moment unforgettable.",
    image:
      "https://silverplay.in/cdn/shop/files/sterling-silver-rough-aqua-marine-party-earring.png?v=1786310319",
  },
  {
    handle: "baali-collection",
    title: "Bali Collection",
    copy: "Effortless elegance, every day.",
    image:
      "https://silverplay.in/cdn/shop/files/SterlingSilverGlimmerSevenBeadHoops.png?v=1778141554",
  },
  {
    handle: "office-muse",
    title: "Office Muse",
    copy: "Subtle. Sophisticated. Always you.",
    image:
      "https://silverplay.in/cdn/shop/files/SterlingSilverDewDropsPartyWearEarrings.png?v=1777716865",
  },
  {
    handle: "everyday-elegance",
    title: "Everyday Elegance",
    copy: "Bold by design. Made for him.",
    image:
      "https://silverplay.in/cdn/shop/files/SterlingSilverGaneshTempleHeritageEarring_Jhumka_2.png?v=1779279620",
  },
];

/** Archive Silver Treasure — Hindi-named heritage collections. */
export const heritage = [
  {
    handle: "virasat",
    deva: "विरासत",
    title: "Heritage",
    image:
      "https://silverplay.in/cdn/shop/files/Rajsi_SP_Website_41ccae1d-7e58-4695-b942-459bc0411093_800x1200_crop_center.png?v=1781610360",
  },
  {
    handle: "karigari-1",
    deva: "कारीगरी",
    title: "Craftsmanship",
    image:
      "https://silverplay.in/cdn/shop/files/8_66ed8200-edb7-48db-85c0-60bc06df74ca_800x1200_crop_center.png?v=1781618694",
  },
  {
    handle: "ratna-virasat-1",
    deva: "रत्न विरासत",
    title: "Gemstone Heritage",
    image:
      "https://silverplay.in/cdn/shop/files/5_800x1200_crop_center.png?v=1780901024",
  },
  {
    handle: "nazakat-1",
    deva: "नज़ाकत",
    title: "Elegance",
    image:
      "https://silverplay.in/cdn/shop/files/10_bd25934c-b7a1-4db5-adaf-80994f406f55_800x1200_crop_center.png?v=1781618694",
  },
  {
    handle: "raajsi-shahi",
    deva: "शाही",
    title: "Regal",
    image:
      "https://silverplay.in/cdn/shop/files/SP_Website_Banners_10_800x1200_crop_center.png?v=1783577220",
  },
  {
    handle: "chandini",
    deva: "चांदनी",
    title: "Lunar Glow",
    image:
      "https://silverplay.in/cdn/shop/files/SP_Website_Banners_9_800x1200_crop_center.png?v=1783577220",
  },
];

/** Shop By Intention — stone meanings. */
export const intentions = [
  {
    handle: "gulabi-noor-love-softness-healing",
    deva: "प्रेम मोह",
    title: "Love & Softness",
    copy: "For love, attraction, softness and emotional warmth",
  },
  {
    handle: "nayi-shuruaat-new-beginnings-transformation",
    deva: "नई शुरुआत",
    title: "New Beginnings",
    copy: "For fresh starts, renewal, hope and moving into a new chapter",
  },
  {
    handle: "lakshmi-ratna-wealth-prosperity-abundance",
    deva: "लक्ष्मी रत्न",
    title: "Prosperity",
    copy: "For abundance, luck, prosperity, growth and new opportunities",
  },
  {
    handle: "sankat-mochan-ratna-protection-problem-solving",
    deva: "संकट मोचन रत्न",
    title: "Protection",
    copy: "For protection, courage, grounding and strength during difficult phases",
  },
  {
    handle: "sankalp-shakti-willpower-determination",
    deva: "संकल्प शक्ति",
    title: "Willpower",
    copy: "For focus, discipline, determination and strong decision-making",
  },
  {
    handle: "mann-shanti-calm-clarity-spiritual-balance",
    deva: "मन शांति",
    title: "Calm",
    copy: "For calm, emotional balance, peace of mind and inner stillness",
  },
];

/** The Treasures — a filmstrip of standout pieces from across the catalogue. */
export const treasures = {
  title: "The Treasures",
  eyebrow: "As Seen & Loved",
  picks: [
    "sterling-silver-silver-cascade-chains-earring",
    "sterling-silver-designer-monarch-elegance-drop-earring",
    "sterling-silver-royal-medallion-pyrite-pendant",
    "sterling-silver-floral-radiance-indo-western-earring",
    "sterling-silver-peacock-kundan-jhumka-earrings",
    "sterling-silver-heritage-anarkali-rani-style-earring-with-self-antique-design",
    "sterling-silver-divine-lakshmi-pyrite-pendant",
    "sterling-silver-gothic-spider-drop-earrings",
  ],
};

export const faqs = [
  {
    q: "How long does delivery take?",
    a: "Orders are dispatched within 2–3 business days. Delivery typically takes 5–7 business days across India. Prepaid orders ship free. You'll receive a tracking link via WhatsApp/email once your order is shipped.",
  },
  {
    q: "What is the return policy?",
    a: "Silver Play does not accept returns or exchanges for change of mind. We only replace or refund an item if it arrives damaged, defective, or not matching what you ordered — reported within 24 hours of delivery with photos or an unboxing video shared to care@silverplay.in.",
  },
  {
    q: "How do I care for my silver jewellery?",
    a: "Store in the anti-tarnish pouch provided. Avoid contact with perfume, lotions, and water. Wipe gently with a soft cloth after wearing. For deep cleaning, use a mild silver polishing cloth. With proper care, your Silver Play pieces will last a lifetime.",
  },
  {
    q: "Why is silver called sterling silver?",
    a: "Pure silver is too soft to wear every day, so it is blended with a small amount of another metal — usually copper — for strength. 'Sterling' silver is the standard that is 92.5% pure silver and 7.5% other metals, which is why every piece is stamped '925'.",
  },
];

/**
 * Real Silver Play statements — the brand descriptor, the founder's own
 * Rakhi-box note, and lines from published Journal posts and policy pages.
 * No live review app is active on the storefront, so this stands in for
 * customer testimonials without inventing any: every line here is copy the
 * brand has actually published, just gathered from across the site.
 */
export const brandVoices = [
  {
    id: "descriptor",
    quote:
      "Handcrafted sterling silver jewellery, forged for the woman who wears her story.",
    attribution: "Silver Play",
  },
  {
    id: "founder-note",
    quote:
      "Every piece is made with a belief that you deserve beautiful things around you.",
    attribution: "Dalljiet Kaur, Founder",
  },
  {
    id: "atelier",
    quote:
      "A single pendant can pass through five pairs of hands before it reaches yours.",
    attribution: "Inside the Jaipur Atelier",
  },
  {
    id: "intention",
    quote:
      "Jewellery can be more than beautiful — it can be intentional.",
    attribution: "How to Wear Meaning",
  },
  {
    id: "care",
    quote:
      "With proper care, your Silver Play pieces will last a lifetime.",
    attribution: "Jewellery Care",
  },
  {
    id: "heritage",
    quote:
      "Handcrafted sterling silver jewellery, forged in the ancient tradition.",
    attribution: "Silver Play",
  },
] as const;

export const journal = [
  {
    slug: "raksha-bandhan-silver-gifts-2026",
    title: "Raksha Bandhan Silver Gifts 2026",
    excerpt:
      "Celebrate Raksha Bandhan 2026 with handcrafted 92.5% sterling silver rakhis, Kavach pendants and 5% off the Rakhi earring edit",
    date: "2026-08-10",
    image:
      "https://silverplay.in/cdn/shop/articles/sterling-silver-shiva-trishul-rakhi-closeup.png",
  },
  {
    slug: "how-to-wear-meaning",
    title: "How to Wear Meaning: Choosing Stones for Love, Calm & Courage",
    excerpt:
      "Jewellery can be more than beautiful — it can be intentional. A simple guide to choosing a stone for the chapter you are in.",
    date: "2026-06-13",
    image:
      "https://silverplay.in/cdn/shop/articles/ChatGPT_Image_Jun_20_2026_10_39_39_AM_2.png",
  },
  {
    slug: "inside-the-jaipur-atelier",
    title: "Inside the Jaipur Atelier: A Day With Our Karigars",
    excerpt:
      "A single pendant can pass through five pairs of hands before it reaches yours. We spent a day in the workshop where heritage is made.",
    date: "2026-06-13",
    image:
      "https://silverplay.in/cdn/shop/articles/ChatGPT_Image_Jun_24_2026_11_11_09_AM.png",
  },
];

export const offers = [
  { label: "Buy Rakhi For Him", value: "₹1,250", href: "/collections/rakhi" },
  { label: "Gift For Her", value: "5% Off", href: "/collections/gift-for-her" },
];

export const footerNav = [
  {
    heading: "Explore",
    links: [
      { label: "All Jewellery", href: "/collections/gift-collection" },
      { label: "Earrings", href: "/collections/earrings" },
      { label: "Pendants", href: "/collections/pendants" },
      { label: "Journal", href: "/journal" },
    ],
  },
  {
    heading: "Care & Policy",
    links: [
      { label: "Jewellery Care", href: "/pages/jewellery-care" },
      { label: "Shipping Policy", href: "/pages/shipping-policy" },
      { label: "Returns & Refunds", href: "/pages/returns" },
      { label: "FAQs", href: "/pages/faqs" },
      { label: "Privacy Policy", href: "/pages/privacy" },
      { label: "Terms of Service", href: "/pages/terms" },
    ],
  },
  {
    heading: "Connect",
    links: [
      { label: "Contact Us", href: "/contact" },
      { label: "Our Story", href: "/about" },
    ],
  },
];
