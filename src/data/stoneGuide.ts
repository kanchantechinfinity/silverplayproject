export type StoneGuideEntry = {
  handle: string; // matches the collection handle exactly, e.g. "rose-quartz"
  name: string; // display name, e.g. "Rose Quartz"
  tagline: string;
  meaning: string;
  properties: string[];
  howToWear: string;
  care: string;
  whenToWear: string;
};

export const stoneGuide: StoneGuideEntry[] = [
  {
    handle: "rose-quartz",
    name: "Rose Quartz",
    tagline: "The stone of gentle love and the open heart.",
    meaning:
      "Rose Quartz embodies tenderness, self-acceptance, and emotional healing. Associated with the heart chakra, it promotes friendship and calm energy. Historically valued as a symbol of love across ancient civilizations.",
    properties: [
      "Encourages emotional healing and self-love",
      "Promotes tenderness and softness in relationships",
      "Supports calm and peaceful meditation practices",
      "Enhances skin vitality (historical belief)",
      "Strengthens friendship and compassion",
    ],
    howToWear:
      "Position closer to the heart using longer chains, or layer with delicate silver pieces for romantic everyday styling.",
    care: "Wipe with a soft dry cloth regularly. Protect from perfume, hairspray, and extended water exposure, and store separately from harder stones.",
    whenToWear: "Weddings, anniversaries, first dates, romantic gifts, self-care rituals",
  },
  {
    handle: "ocean-jasper",
    name: "Ocean Jasper",
    tagline: "Orbs of the sea, captured in stone.",
    meaning:
      "Ocean Jasper promotes calm and renewal, encouraging a positive, adaptable outlook. Its natural orbicular rings inspire patience and joy while grounding the wearer.",
    properties: [
      "Encourages patience and joy",
      "Promotes calm and renewal",
      "Supports a positive, go-with-the-flow perspective",
      "Each piece is naturally unique",
      "Suits travel and new beginnings",
    ],
    howToWear:
      "Let the stone's lively patterns be the focal point; pair with simple jewelry to avoid competing aesthetics.",
    care: "Use a soft cloth, dry or slightly damp, and dry immediately after contact with water. Avoid soaking and harsh cleaners.",
    whenToWear: "Travel, new beginnings, holidays, everyday grounding",
  },
  {
    handle: "tiger-eye",
    name: "Tiger Eye",
    tagline: "Golden bands of courage and focus.",
    meaning:
      "Tiger Eye channels confidence and willpower, grounding scattered energy into decisive action. Prized since antiquity for promoting self-assurance and steady determination.",
    properties: [
      "Enhances focus and clear decision-making",
      "Builds confidence and courage",
      "Grounds dispersed energy into purposeful action",
      "Offers protection and bravery",
      "Creates a bold, polished presence",
    ],
    howToWear: "Pair with sterling silver in both ethnic and contemporary styles for striking warmth and impact.",
    care: "Wipe with a soft, dry cloth regularly. Avoid harsh chemicals and store separately from softer stones.",
    whenToWear: "Interviews, presentations, exams, important meetings",
  },
  {
    handle: "scolecite",
    name: "Scolecite",
    tagline: "Quiet light for a peaceful mind.",
    meaning:
      "Scolecite promotes inner peace and restful sleep through its gentle, calming energy. This delicate zeolite mineral offers serene clarity for reflective moments and meditative practices.",
    properties: [
      "Supports inner peace and emotional calm",
      "Encourages restful, quality sleep",
      "Provides gentle mental clarity",
      "Aids meditation and mindfulness",
      "Offers refined, understated elegance",
    ],
    howToWear: "Its soft white luminescence pairs effortlessly with any outfit for a minimal, sophisticated aesthetic.",
    care: "Handle gently and clean only with a dry, soft cloth. Store separately from harder gemstones and keep away from water and chemicals.",
    whenToWear: "Evenings, meditation, bedtime routines, calm reflective days",
  },
  {
    handle: "blue-opal",
    name: "Blue Opal",
    tagline: "The serene blue of calm waters.",
    meaning:
      "Blue Opal promotes soothing communication and emotional calm. This stone encourages gentle self-expression and has symbolized hope and imagination across cultures for centuries.",
    properties: [
      "Supports tranquil communication",
      "Cultivates emotional serenity",
      "Enhances creative expression",
      "Associated with hope and imagination",
      "Ideal for grounding and peaceful energy",
    ],
    howToWear:
      "Showcase its tranquil blue during daytime or summer occasions; wear solo or pair with cool-toned silver.",
    care: "Clean only with a soft, slightly damp cloth and dry gently. Avoid heat, harsh chemicals, and prolonged water exposure, as opal retains natural moisture.",
    whenToWear: "Holidays, beach days, creative pursuits, calm conversations",
  },
  {
    handle: "dragon-blood",
    name: "Dragon Blood",
    tagline: "Earthy green and fiery red, like ancient lore.",
    meaning:
      "Dragon Blood stone embodies courage and vitality, channeling grounded strength through its striking natural coloration. Associated with bold energy, it serves as a powerful ally for those seeking fortitude and rooted presence.",
    properties: [
      "Enhances courage and personal strength",
      "Promotes vitality and energizing force",
      "Grounds and stabilizes during challenging periods",
      "Supports bold action and new ventures",
      "Builds resilience and determination",
    ],
    howToWear:
      "Pair the rich green-and-red marbling with simple silver settings to let the stone's natural character dominate.",
    care: "Wipe with a soft, dry cloth regularly. Avoid harsh chemicals and store separately to maintain its polish.",
    whenToWear: "Demanding workdays, physical training, new projects",
  },
  {
    handle: "maligano-jasper",
    name: "Maligano Jasper",
    tagline: "Painterly swirls from the Indonesian earth.",
    meaning:
      "Maligano Jasper channels creativity and imagination while grounding the wearer in calm. Each stone's unique patterns inspire artistic expression and mindful presence.",
    properties: [
      "Stimulates creativity and imagination",
      "Provides grounded, centering energy",
      "Enhances artistic vision and inspiration",
      "Collectible thanks to its unique druzy sparkle",
      "Supports statement-making confidence",
    ],
    howToWear: "Let the dramatic patterns shine — wear as a standalone pendant with minimal additional jewelry.",
    care: "Clean with a soft, dry cloth only. Store separately from harder stones to preserve surface integrity.",
    whenToWear: "Creative projects, gallery visits, everyday statement wear",
  },
  {
    handle: "red-jasper",
    name: "Red Jasper",
    tagline: "The warm red of steady strength.",
    meaning:
      "Red Jasper grounds energy and builds courage. Ancient civilizations valued it as a protective amulet linked to stamina and endurance, making it a stone for quiet, steady confidence.",
    properties: [
      "Enhances stamina and endurance",
      "Promotes grounding and stability",
      "Builds courage and confidence",
      "Offers protection",
      "Supports everyday resilience",
    ],
    howToWear: "The deep brick-red pairs timelessly with silver in both ethnic and casual styles.",
    care: "Wipe with a soft cloth and avoid harsh chemicals; jasper is highly durable and low-maintenance.",
    whenToWear: "Long workdays, travel, training, grounded everyday wear",
  },
  {
    handle: "chevron-amethyst",
    name: "Chevron Amethyst",
    tagline: "Purple and white in striking V-bands.",
    meaning:
      "Chevron Amethyst promotes calm focus and mental clarity. Historically valued by royalty and clergy, it's linked to intuition and a settled mind.",
    properties: [
      "Enhances mental clarity and focus",
      "Supports intuitive insight",
      "Promotes calm and emotional balance",
      "Natural V-shaped banding creates visual distinction",
      "Connects to meditative states",
    ],
    howToWear: "The crisp purple-and-white banding suits both formal occasions and relaxed everyday styling.",
    care: "Avoid prolonged direct sunlight to prevent fading; wipe with a soft dry cloth and keep away from harsh chemicals.",
    whenToWear: "Study, meditation, evening events, focused work days",
  },
  {
    handle: "shattuckite",
    name: "Shattuckite",
    tagline: "Deep celestial blue, rare and prized.",
    meaning:
      "Associated with clear communication, intuition, and truthful expression, this rare stone promotes authentic self-expression and inner clarity.",
    properties: [
      "Enhances clear communication",
      "Strengthens intuition",
      "Supports truthful expression",
      "Rare, collector-grade stone",
      "Luxurious aesthetic appeal",
    ],
    howToWear: "Wear as a refined pendant centerpiece against silver for maximum impact and elegance.",
    care: "Clean with a soft, dry cloth only; avoid water and chemicals. Store separately due to its softer nature.",
    whenToWear: "Special occasions, creative work, speaking engagements",
  },
  {
    handle: "black-banded-agate",
    name: "Black Banded Agate",
    tagline: "Bold monochrome bands of grounding calm.",
    meaning:
      "Black Banded Agate promotes grounding, protection, and steady balance. Its naturally formed bands create a unique pattern in each stone, making it a versatile companion for cultivating calm confidence.",
    properties: [
      "Grounding and stabilizing energy",
      "Protective qualities",
      "Promotes steady balance and confidence",
      "Hard-wearing, suitable for daily wear",
      "Naturally unique band patterns",
    ],
    howToWear: "The neutral monochrome design pairs effortlessly with any outfit, day or evening.",
    care: "Wipe with a soft, dry cloth and avoid harsh chemicals to maintain its polish.",
    whenToWear: "Work, travel, everyday occasions",
  },
  {
    handle: "wild-horse-magnesite",
    name: "Wild Horse Magnesite",
    tagline: "Earthy freedom in brown and white patterns.",
    meaning:
      "Wild Horse Magnesite embodies grounding energy and emotional balance. Named for its striking pinto markings, it connects wearers to freedom and stability, ideal for natural, centered wellness.",
    properties: [
      "Promotes grounding and emotional equilibrium",
      "Encourages free, uninhibited energy",
      "Enhances connection to earth elements",
      "Supports relaxation and natural rhythms",
      "Aids stress relief during transitions",
    ],
    howToWear: "Pair with bohemian or natural aesthetic pieces; its soft brown-and-cream palette suits earthy, casual styling.",
    care: "Wipe gently with a soft, dry cloth only. Avoid water, perfume, and oils, since magnesite is porous and delicate.",
    whenToWear: "Travel, outdoor activities, relaxed weekends, grounding rituals",
  },
  {
    handle: "amazonite",
    name: "Amazonite",
    tagline: "The soothing turquoise-green of still water.",
    meaning:
      "Amazonite embodies courage and truth, fostering calm communication and emotional balance. Its gentle energy promotes honest expression and inner peace during challenging conversations.",
    properties: [
      "Encourages truthful communication",
      "Promotes emotional calm and serenity",
      "Enhances courage and self-expression",
      "Balances energy and reduces stress",
      "Supports creative endeavors",
    ],
    howToWear: "Pair with silver for a fresh color accent; its blue-green hue suits daytime elegance.",
    care: "Wipe with a soft dry cloth; avoid chemicals and water. Store separately from harder gemstones to prevent scratches.",
    whenToWear: "Daytime, travel, creative work, calm conversations",
  },
  {
    handle: "noreena-jasper",
    name: "Noreena Jasper",
    tagline: "Ancient desert strength grounded in earth.",
    meaning:
      "Noreena Jasper connects you to earth's resilience and grounding energy. This stone from Australia's ancient Pilbara region embodies stability and natural strength for daily centering.",
    properties: [
      "Grounding and stabilizing energy",
      "Promotes resilience and durability",
      "Enhances connection to nature",
      "Supports everyday wear with strength",
      "Unique, one-of-a-kind patterns",
    ],
    howToWear: "Let its warm desert tones anchor earthy, layered looks as a focal statement piece.",
    care: "Wipe with a soft, dry cloth; avoid harsh chemicals to preserve the finish on this durable stone.",
    whenToWear: "Travel, outdoor adventures, grounded everyday moments",
  },
  {
    handle: "mother-of-pearl",
    name: "Mother of Pearl",
    tagline: "Iridescent shimmer from the sea.",
    meaning:
      "Associated with calm, intuition, and gentle protection, Mother of Pearl embodies a soothing, feminine energy that brings emotional balance and nurturing support.",
    properties: [
      "Promotes intuition and emotional clarity",
      "Offers gentle protective energy",
      "Creates a luminous, timeless aesthetic",
      "Supports calm and tranquility",
      "Enhances refined elegance",
    ],
    howToWear: "Its pearly shimmer is timeless and bridal-friendly, ideal for soft, elegant looks.",
    care: "Wipe with a soft, dry cloth only. Avoid water, perfume, acids, chemicals, and contact with harder stones.",
    whenToWear: "Weddings, festivities, gifting, refined everyday elegance",
  },
  {
    handle: "pyrite",
    name: "Pyrite",
    tagline: "Golden 'fool's gold' with a metallic gleam.",
    meaning:
      "Pyrite symbolizes abundance and confidence, channeling protective, energizing drive. Used since ancient times, from Incan mirrors to early fire-starting tools, this metallic stone has captivated civilizations for millennia.",
    properties: [
      "Attracts abundance and prosperity",
      "Boosts confidence and personal power",
      "Provides protection and energetic shielding",
      "Enhances ambition and drive",
      "Distinctive metallic gold appearance",
    ],
    howToWear: "Wear as a standout pendant against silver for bold, modern impact.",
    care: "Wipe only with a soft, dry cloth. Keep completely dry, as iron content causes tarnishing with moisture exposure.",
    whenToWear: "Work days, ambitious ventures, new projects, bold evening looks",
  },
  {
    handle: "nellite",
    name: "Nellite",
    tagline: "Rare blend of two soothing minerals.",
    meaning:
      "Nellite promotes insight and calm focus through grounded intuition. Its unique combination of minerals offers collectors a stone valued for both its rarity and subtle sophistication.",
    properties: [
      "Enhances insight and clarity",
      "Supports calm focus and emotional balance",
      "Encourages grounded intuition",
      "Ideal for reflective and creative pursuits",
      "Prized by collectors for its uniqueness",
    ],
    howToWear: "Its muted, swirling patterns suit understated statement pieces that don't overpower personal style.",
    care: "Wipe with a soft, dry cloth; avoid water and chemicals, and store apart from harder stones to preserve polish.",
    whenToWear: "Reflective days, creative work sessions",
  },
  {
    handle: "pinolith-jasper",
    name: "Pinolith Jasper",
    tagline: "Snowfall white scattered on dark stone.",
    meaning:
      "Pinolith embodies calm, self-reliance, and quiet strength. Its distinctive appearance grounds the wearer in composed, focused energy.",
    properties: [
      "Promotes calm and composure",
      "Enhances self-reliance",
      "Supports quiet inner strength",
      "Visually grounding with striking contrast",
    ],
    howToWear: "The dramatic black-and-white pattern works beautifully with sterling silver for modern, monochrome looks.",
    care: "Wipe gently with a soft, dry cloth; avoid water and chemicals as the stone contains soft, porous elements.",
    whenToWear: "Monochrome outfits, work settings, focused days",
  },
  {
    handle: "purpurite",
    name: "Purpurite",
    tagline: "Vivid violet, a collector's delight.",
    meaning:
      "Associated with confidence, freedom, and breaking from old patterns, Purpurite embodies transformation and bold self-expression through its intense natural violet color.",
    properties: [
      "Intense natural violet color from manganese content",
      "Rare and collectible gemstone",
      "Symbolizes confidence and liberation",
      "Unique tonal variation in every piece",
      "Luxurious aesthetic appeal",
    ],
    howToWear: "Wear as a bold, collectible centerpiece for special occasions and evening looks.",
    care: "Clean gently with a soft, dry cloth; avoid water and chemicals, and protect from impact as it is relatively soft.",
    whenToWear: "Special occasions, bold evening looks, collector pieces",
  },
  {
    handle: "blue-opal-eye",
    name: "Blue Opal Eye",
    tagline: "A serene blue gaze in stone.",
    meaning:
      "Blue Opal Eye promotes calm, protection, and clear insight. Its distinctive eye pattern makes each piece uniquely captivating and meaningful for personal reflection.",
    properties: [
      "Enhances tranquility and emotional calm",
      "Offers protective energy",
      "Supports gentle, clear perception",
      "Encourages creative expression",
      "Ideal for mindful moments",
    ],
    howToWear: "Showcase as a pendant where its striking eye-like pattern becomes the focal point.",
    care: "Clean with a soft, damp cloth and dry gently. Avoid heat and chemicals, since opal is delicate and water-sensitive.",
    whenToWear: "Calm days, creative work, travel, meaningful gifts",
  },
  {
    handle: "black-moonstone",
    name: "Black Moonstone",
    tagline: "Smoky shimmer of new-moon nights.",
    meaning:
      "Associated with new beginnings, intuition, and gentle grounding, this stone's layered feldspar structure creates an adularescent glow, connecting it to lunar energy and inner reflection.",
    properties: [
      "Supports new beginnings and fresh starts",
      "Enhances intuition and inner knowing",
      "Provides gentle grounding energy",
      "Versatile for both evening and daily wear",
      "Each piece is uniquely patterned",
    ],
    howToWear: "Its smoky shimmer works beautifully as a pendant for evening occasions or everyday styling.",
    care: "Wipe with a soft, dry cloth; avoid knocks, chemicals, and prolonged water exposure, since moonstone is moderately delicate.",
    whenToWear: "New starts, evening wear, reflective moments, gifting",
  },
  {
    handle: "zebra-jasper",
    name: "Zebra Jasper",
    tagline: "Bold black-and-white stripes of balance.",
    meaning:
      "Associated with equilibrium, motivation, and grounded optimism, Zebra Jasper promotes stability and positive energy in daily life.",
    properties: [
      "Enhances balance and grounding",
      "Boosts motivation and drive",
      "Promotes optimism",
      "Naturally durable for everyday wear",
      "Universally flattering aesthetic",
    ],
    howToWear: "The monochromatic striping pairs effortlessly with silver and any outfit, casual or formal.",
    care: "Wipe gently with a soft, dry cloth. Avoid harsh chemicals; this stone is durable and designed for everyday wear.",
    whenToWear: "Active days, work, travel",
  },
  {
    handle: "petrified-wood-jasper",
    name: "Petrified Wood Jasper",
    tagline: "Ancient forests turned to stone.",
    meaning:
      "Petrified Wood connects wearers to deep time and earth's patience. It grounds energy and fosters mindfulness through its preserved natural history.",
    properties: [
      "Grounding and stabilizing energy",
      "Encourages patience and inner peace",
      "Strengthens connection to nature",
      "Promotes mindfulness and presence",
      "Durable for everyday spiritual support",
    ],
    howToWear: "Pair with natural styling for earthy elegance; its warm grain patterns suit organic fashion aesthetics.",
    care: "Wipe gently with a soft, dry cloth. Avoid harsh chemicals to preserve the stone's natural finish.",
    whenToWear: "Travel, everyday grounding, nature appreciation, mindful days",
  },
  {
    handle: "lace-agate",
    name: "Lace Agate",
    tagline: "Delicate lace-like patterns in stone.",
    meaning:
      "Lace Agate embodies joy and gentle encouragement. It promotes calm balance and uplifting energy, making it ideal for those seeking light-hearted positivity and emotional grounding.",
    properties: [
      "Intricate, unique lace-like banding patterns",
      "Hard-wearing and durable for daily wear",
      "Promotes joy and gentle encouragement",
      "Supports calm and emotional balance",
      "Low-maintenance and easy to care for",
    ],
    howToWear: "Pair with silver jewelry to enhance its delicate charm; the fine patterning suits soft, detailed designs.",
    care: "Wipe with a soft, dry cloth regularly. Avoid harsh chemicals; agate is naturally hardy and requires minimal maintenance.",
    whenToWear: "Everyday wear, gifting occasions, uplifting light-hearted days",
  },
];
