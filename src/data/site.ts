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
  { label: "Women", href: "/collections/gift-collection" },
  { label: "Men", href: "/collections/mens-collection" },
  { label: "About", href: "/about" },
  { label: "Journal", href: "/journal" },
  { label: "Stone Guide", href: "/stone-guide" },
  { label: "Contact", href: "/contact" },
];

/**
 * The "Shop" mega-menu — one panel, not per-tab content: a row of featured
 * category cards (real product photos), a two-column set of real collection
 * links grouped by type and by intention, and a video promo panel on the
 * right. Every image, link and price below is real Silver Play data.
 */
export const megaNav = {
  featured: [
    {
      label: "Earrings",
      href: "/collections/earrings",
      image:
        "https://cdn.shopify.com/s/files/1/0702/4456/5101/files/sterling-silver-cascade-chains-earring.png?v=1786310334",
    },
    {
      label: "Pendants",
      href: "/collections/pendants",
      image:
        "https://cdn.shopify.com/s/files/1/0702/4456/5101/files/SterlingSilverRoyalMedallionPyritePendant.png?v=1787114961",
    },
    {
      label: "Gemstone",
      href: "/collections/gemstone-jewellery",
      image:
        "https://cdn.shopify.com/s/files/1/0702/4456/5101/files/sterling-silver-rose-quartz-teardrop-filigree-pendant.jpg?v=1786310371",
    },
    {
      label: "Rakhi",
      href: "/collections/rakhi",
      image:
        "https://cdn.shopify.com/s/files/1/0702/4456/5101/files/sterling-silver-shiva-trishul-rakhi-gift-box.png?v=1785833712",
    },
  ],
  viewAllHref: "/collections/gift-collection",
  // Each real product type keeps its own sub-category column — the same
  // groupings the previous tabbed version had, just all visible together
  // instead of hidden behind a tab switch.
  linkGroups: [
    {
      heading: "Earrings",
      links: [
        { label: "All Earrings", href: "/collections/earrings" },
        { label: "Bali Collection", href: "/collections/baali-collection" },
        { label: "Jhumka Earrings", href: "/collections/jhumka-earrings" },
        { label: "Hoop Earrings", href: "/collections/hoop-earrings" },
        { label: "Gen-Z Edit", href: "/collections/gen-z-edit-everyday-silver" },
      ],
    },
    {
      heading: "Pendants",
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
      ],
    },
    {
      heading: "Rakhi",
      links: [
        { label: "All Rakhi", href: "/collections/rakhi" },
        { label: "For the Special Bond", href: "/collections/for-the-special-bond" },
        { label: "Gift for Her", href: "/collections/gift-for-her" },
      ],
    },
  ],
  promo: {
    eyebrow: "Handcrafted in Jaipur",
    heading: "Discover The Bestsellers",
    video:
      "https://silverplay.in/cdn/shop/videos/c/vp/795bd6985e5643f08a2165c41724b695/795bd6985e5643f08a2165c41724b695.HD-720p-2.1Mbps-88732573.mp4",
    poster:
      "https://silverplay.in/cdn/shop/articles/ChatGPT_Image_Jun_24_2026_11_11_09_AM.png",
    ctaLabel: "Discover Now",
    ctaHref: "/collections/earrings",
  },
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

/** Real copy + portrait from the live "Our Story" page (silverplay.in/pages/about). */
export const founder = {
  eyebrow: "The Founder",
  heading: "A Timeless Curation by",
  bio: "Dalljiet Kaur believes jewellery should make people feel seen, valued and connected. Her vision for Silver Play is to create a brand where silver feels luxurious, meaningful and relevant for modern life. A brand where people can find jewellery for themselves, for someone special and for moments that deserve to be remembered. Through Silver Play, she wants to bring back the charm of thoughtful jewellery in a modern way. Pieces that feel personal. Pieces that carry beauty. Pieces that become part of everyday life and lasting memories.",
  name: "Dalljiet Kaur",
  title: "Founder, Silver Play",
  image: "https://silverplay.in/cdn/shop/files/Dalljiet_Kaur_in_Silver.jpg?v=1781853368",
};

/** Real copy + images from silverplay.in/pages/about ("Our Story"). */
export const aboutPage = {
  hero: {
    eyebrow: "Our Story",
    heading: "The Soul of Indian Silver",
    image:
      "https://silverplay.in/cdn/shop/files/Screenshot_2026-05-20_at_1.11.35_PM.png?v=1779293036",
    badges: [
      { glyph: "✿", label: "925", sub: "Sterling Silver" },
      { glyph: "◈", label: "Handcrafted", sub: "By Skilled Karigars" },
      { glyph: "❖", label: "Stone-Led", sub: "Jewellery" },
      { glyph: "✦", label: "Gift-Ready", sub: "Premium Packaging" },
    ],
  },
  craft: {
    eyebrow: "The Hands Behind The Craft",
    heading: "The Karigars of India",
    image:
      "https://silverplay.in/cdn/shop/files/ChatGPT_Image_Jun_20_2026_06_07_08_PM.png?v=1781968003",
    paragraphs: [
      "Every Silver Play piece is handcrafted in 925 sterling silver — the international standard for fine silver jewellery. We work with natural, lightly finished stones wherever possible, because we believe the earth's imperfections are part of the beauty, not a flaw to be hidden. No two stones are identical. That means no two Silver Play pieces are ever truly alike. What you receive is genuinely one of a kind.",
      "Our collection spans a wide range of natural gemstones — each chosen for its visual character and the story it carries. We work with Jaspers from across the world, Opals in colours that shift with the light, grounding stones like Pyrite and Tiger Eye, and rare finds like Scolecite and Purpurite. Each stone is hand-selected. Each has its own mood.",
    ],
  },
  values: {
    eyebrow: "What We Stand For",
    heading: "Slow Making, Honest Materials",
    paragraph:
      "We are an independent Indian jewellery brand. We believe in slow making over mass production, in natural over synthetic, in stories over trends. We take pride in being transparent about what goes into each piece — the metal grade, the stone type, the craft involved. When you wear a Silver Play piece, you are wearing a moment of craft: a connection between the person who made it, the stone that was chosen, and you. We ship from India to jewellery lovers around the world, and we welcome questions, custom conversations, and customers who want to know what they are wearing and why it matters. Thank you for being here.",
  },
  closing: {
    heading: "Wear Your Story",
    paragraph:
      "Silver Play promises jewellery that is elegant, expressive and thoughtfully made. We create 925 silver pieces that feel premium, meaningful and easy to wear — jewellery that adds beauty to everyday moments, grace to celebrations and emotion to gifting. Because silver is not just something you wear. It is something you feel.",
    ctaLabel: "Explore The Collection",
    ctaHref: "/shop",
  },
};

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

/** Real published Journal posts — titles, dates, excerpts, categories and
 *  full body copy are all taken from the live silverplay.in/blogs/journal
 *  articles (trimmed for length in a couple of the longer ones). */
export const journal = [
  {
    slug: "raksha-bandhan-silver-gifts-2026",
    title: "Raksha Bandhan Silver Gifts 2026: Rakhis, Pendants & More",
    excerpt:
      "Celebrate Raksha Bandhan 2026 with handcrafted 92.5% sterling silver rakhis, Kavach pendants and 5% off the Rakhi earring edit",
    date: "2026-08-10",
    readTime: "11 min read",
    category: "925 Silver",
    image:
      "https://silverplay.in/cdn/shop/articles/sterling-silver-shiva-trishul-rakhi-closeup.png",
    body: [
      {
        text: "A rakhi thread lasts a week, maybe two if you're careful with it. Silver lasts a lot longer. That's really the idea behind this guide: everything worth knowing about silver before you buy a gift this Raksha Bandhan, from what \"925\" actually means to which pendant suits a brother, a sister, or yourself.",
      },
      {
        text: "Raksha Bandhan falls on Friday, 28 August 2026. This guide covers three things: why silver as a metal is worth choosing over almost anything else, how to shop silver pendants (including the spiritual Kavach pendants people search for around this festival), and the details of Silver Play's Rakhi edit, including the 5% off currently running on Rakhi collection earrings.",
      },
      {
        heading: "What Is Silver Jewellery, Really?",
        text: "Sterling silver jewellery is silver alloyed with about 7.5% other metal, usually copper, to make it strong enough to actually wear. Pure silver on its own is too soft to hold its shape in a ring or an earring hook. That alloy is what the \"925\" stamp means: 925 parts silver out of 1,000, or 92.5% pure silver by weight — the same standard jewellers use worldwide. At Silver Play, every piece, from a ₹1,250 rakhi charm to a statement Kavach pendant, is handcrafted in 92.5% pure sterling silver and carries a BIS Hallmark certification.",
      },
      {
        heading: "Why Choose Silver Over Other Metals?",
        text: "It's genuinely affordable without feeling cheap — silver costs a fraction of gold per gram, so a Raksha Bandhan budget that buys one modest gold charm can buy a full, considered gift in silver. It's the metal of the Moon: in Indian tradition, silver is associated with Chandra, considered cooling, calming and purifying, which is part of why it's the metal of choice for spiritual and protective jewellery like Kavach pendants. It's kind to skin — a low-reactivity metal most people wear comfortably every day. And it tarnishes, and that's fine: it's a natural reaction with sulphur compounds in the air, not a sign of poor quality, easily reversed with a soft polishing cloth.",
      },
      {
        heading: "Silver vs. Gold vs. Artificial Jewellery",
        text: "None of this is meant to talk anyone out of gold — it has its own place, especially for milestone gifts. But for a yearly festival like Raksha Bandhan, where the gesture matters more than the carat weight, silver tends to be the more honest choice: real metal, real craftsmanship, at a price that doesn't force you to buy something too small to feel generous.",
      },
    ],
  },
  {
    slug: "how-to-wear-meaning",
    title: "How to Wear Meaning: Choosing Stones for Love, Calm & Courage",
    excerpt:
      "Jewellery can be more than beautiful — it can be intentional. A simple guide to choosing a stone for the chapter you are in.",
    date: "2026-06-13",
    readTime: "10 min read",
    category: "Gifting",
    image:
      "https://silverplay.in/cdn/shop/articles/ChatGPT_Image_Jun_20_2026_10_39_39_AM_2.png",
    body: [
      {
        text: "There is a quiet moment, most mornings, when you reach for a piece of jewellery without quite knowing why. A particular ring. A pendant you keep coming back to. It is rarely about how it looks. More often, it is about how you want to feel — steadier, softer, braver, lighter. To wear jewellery this way is to wear meaning, and it is one of the oldest human habits we have.",
      },
      {
        text: "At Silver Play, we hold this tradition gently. We do not promise that a stone will heal a body or change a fate. What we believe is simpler and, perhaps, truer: that choosing a piece with intention changes how you move through your day. It becomes a small daily ritual, a reminder set against your skin.",
      },
      {
        heading: "When You Need Love & Healing",
        text: "In the language of gemstone meanings, this is the territory of rose quartz, the gentle pink stone long associated with compassion and unconditional love, and of moonstone and pink tourmaline, which tradition links to emotional comfort and quiet repair. Our Prem Moh collection gathers these soft-hearted stones into pieces meant to be worn through tender seasons — not a cure, but a comfort.",
      },
      {
        heading: "When You Need Calm & Clarity",
        text: "The stones tied to calm in tradition are some of the most beloved in the world: amethyst, with its violet stillness; aquamarine, cool as clear water; blue chalcedony and labradorite, long associated with a settled, spacious mind. Our Mann Shanti collection is built entirely around this need for stillness and spiritual balance — the name itself means peace of mind.",
      },
      {
        heading: "When You Need Strength & Protection",
        text: "There are days that feel like walking into wind — a difficult conversation ahead, a problem that will not loosen, a stretch of life where you simply need to feel shielded. This is where our Kavach collections live: pieces designed to be worn like a quiet armour, a reminder that you are held.",
      },
    ],
  },
  {
    slug: "inside-the-jaipur-atelier",
    title: "Inside the Jaipur Atelier: A Day With Our Karigars",
    excerpt:
      "A single pendant can pass through five pairs of hands before it reaches yours. We spent a day in the workshop where heritage is made.",
    date: "2026-06-13",
    readTime: "11 min read",
    category: "Behind-the-Scenes",
    image:
      "https://silverplay.in/cdn/shop/articles/ChatGPT_Image_Jun_24_2026_11_11_09_AM.png",
    body: [
      {
        text: "Before the city is fully awake, before the first auto-rickshaw clears its throat on the lane outside, the atelier has already begun to hum. In Jaipur, the day for a silversmith does not start with a bell or a screen. It starts with a quiet ritual: the unlocking of a worn wooden cabinet, the laying out of tools that have outlived the men who first held them, and the slow warming of a small furnace whose blue flame will, by mid-morning, coax solid silver into a glowing, obedient liquid.",
      },
      {
        text: "This is where our jewellery is born. Not in a factory, not on a conveyor belt, but in a modest room thick with the smell of borax and beeswax, where the loudest sound is the patient tapping of a hammer and the brightest light is the one bouncing off a freshly burnished bangle.",
      },
      {
        heading: "First Light: The City That Taught Silver to Sing",
        text: "Jaipur has been a jeweller's city for centuries. The skill did not arrive overnight; it was layered down, generation upon generation, like the fine sediment of a riverbed. Today the Jaipur jewellery artisans who work with us are the inheritors of that long apprenticeship — men and women who learned not from manuals but from watching a father's wrist, a grandfather's thumb.",
      },
      {
        heading: "The Karigar: A Word That Carries a World",
        text: "The Hindi word karigar translates loosely as \"craftsman\" or \"artisan,\" but the translation flattens something important. A karigar is not simply someone who performs a task. He is a custodian of a method — a person who has internalised the temperament of metal so completely that his hands seem to think for him. Ask a master karigar how he knows when the silver is hot enough to pour, and he will not quote a temperature. He will tell you it is in the colour, the shimmer, the way the molten metal moves.",
      },
    ],
  },
  {
    slug: "a-map-of-stones",
    title: "A Map of Stones: Where Your Jewellery Was Born",
    excerpt:
      "Rose Quartz from Madagascar. Tiger Eye from South Africa. Amethyst from Uruguay. Every stone we set has travelled oceans to reach your wrist.",
    date: "2026-06-13",
    readTime: "10 min read",
    category: "Origins",
    image:
      "https://silverplay.in/cdn/shop/articles/ChatGPT_Image_Jun_20_2026_10_39_42_AM_3.png",
    body: [
      {
        text: "Every stone we set has a birthplace. Long before it rested against your collarbone or caught the light at your wrist, it was growing in the dark — pressed into being by heat, water and time inside the body of the earth. To wear a gemstone is to carry a small fragment of geography with you: a piece of a Brazilian hillside, a Sri Lankan riverbed, a Rajasthani quarry warmed by centuries of sun.",
      },
      {
        text: "At Silver Play, we set natural gemstone jewellery in 925 BIS-hallmarked sterling silver, each piece handcrafted in Jaipur, so that the stone's journey continues quietly in yours.",
      },
      {
        heading: "Rose Quartz: Born in Granite, Worn for Love",
        text: "Rose quartz forms deep within pegmatites — coarse-grained pockets of granite where minerals cool slowly enough to grow large and unhurried. Its blush comes from faint traces of titanium, iron or manganese threaded through the crystal. The finest material has long been associated with Brazil, particularly Minas Gerais, alongside deposits in Madagascar, South Africa and parts of India. This is the spirit behind our Prem Moh collection — gulabi noor, the pink light of love and softness.",
      },
      {
        heading: "Tiger Eye: Banded Light and the Courage to Stand Firm",
        text: "Few stones are as quietly dramatic as tiger eye. It belongs to the quartz family and earns its shifting golden bands through a phenomenon called chatoyancy — light rolling across fibrous structures within the stone, so that a band of brightness seems to slide as you tilt it, like the eye of a great cat catching the sun. Much of the world's finest tiger eye comes from South Africa, with deposits also found in Western Australia and India.",
      },
    ],
  },
  {
    slug: "the-quiet-power-of-925-silver",
    title: "The Quiet Power of 925 Silver: Why Our Grandmothers Were Right",
    excerpt:
      "Before silver was fashion, it was medicine, memory and protection. A short history of the metal that has wrapped Indian wrists for a thousand years.",
    date: "2026-06-13",
    readTime: "12 min read",
    category: "Care",
    image:
      "https://silverplay.in/cdn/shop/articles/ChatGPT_Image_Jun_20_2026_10_39_45_AM_4.png",
    body: [
      {
        text: "There is a particular drawer in almost every Indian home. You know the one. It opens with a small creak, and inside, wrapped in soft cloth or tucked into a velvet pouch, lie pieces that have outlived weddings, festivals, and the people who first wore them. These were not bought to be replaced. They were bought to be kept.",
      },
      {
        text: "Our grandmothers understood something that the fast-fashion era nearly made us forget: that real silver is not a trend but an inheritance. At Silver Play, every piece is handcrafted in Jaipur from genuine 925 sterling silver, hallmarked and often set with natural gemstones. This is our small ode to the metal our grandmothers trusted.",
      },
      {
        heading: "What 925 Sterling Silver Actually Means",
        text: "Pure silver, in its raw form, is too soft for everyday life. So for centuries, silversmiths have blended silver with a small measure of another metal, usually copper, to give it strength without sacrificing its character. The number 925 tells you the recipe precisely: 92.5% pure silver, with the remaining 7.5% made up of copper or other metals that lend durability — the international standard for fine silver jewellery.",
      },
      {
        heading: "The BIS Hallmark: A Quiet Stamp of Trust",
        text: "In India, the surest way to know your silver is genuine is the hallmark. BIS hallmarked silver jewellery carries the mark of the Bureau of Indian Standards, the national body that certifies purity — a quiet promise stamped into every piece, so you always know exactly what you're wearing.",
      },
    ],
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
