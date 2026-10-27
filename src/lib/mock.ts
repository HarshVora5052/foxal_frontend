export interface Product {
  id: number;
  slug: string;
  name: string;
  subtitle: string;
  category: 'sticks' | 'cones';
  category_name: 'Incense Sticks' | 'Incense Cones';
  variant_label: string; // e.g. "250g Pack" or "60 Cones / Box"
  mrp: number; // 199
  price: number; // 149
  discount_percent: number; // 25
  rating: number;
  reviews_count: number;
  in_stock: boolean;
  burn_time: string;
  fragrance_notes: string[];
  ingredients: string[];
  description: string;
  benefits: string[];
  badge?: string;
  is_bestseller: boolean;
  is_featured: boolean;
  images: string[];
}

export interface Category {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  description: string;
  specs: string;
  item_count: number;
  starting_price: number;
  image: string;
}

export interface Review {
  id: number;
  name: string;
  location: string;
  rating: number;
  date: string;
  product_name: string;
  headline: string;
  comment: string;
  verified: boolean;
}

export interface FaqItem {
  id: number;
  question: string;
  answer: string;
  category: 'product' | 'health' | 'shipping';
}

// -------------------------------------------------------------
// EXACT PRODUCTS AS SPECIFIED
// 1) Incense Sticks (250g): Kasturi, Woods, Oudh, Sukhad, Mogra, Gugal
// 2) Incense Cones (60 cones/box): Sandalwood, Lavender, Rose, Jasmine
// Pricing: MRP Rs.199, sale price Rs.149
// -------------------------------------------------------------

export const PRODUCTS: Product[] = [
  // --- Category 1: Incense Sticks (250g) ---
  {
    id: 1,
    slug: 'sukhad-premium-incense-sticks-250g',
    name: 'FOXAL Sukhad Premium Incense Sticks',
    subtitle: 'Tradition in Every Fragrance · 100% Charcoal Free',
    category: 'sticks',
    category_name: 'Incense Sticks',
    variant_label: '250g (Approx. 130-140 Sticks)',
    mrp: 199,
    price: 149,
    discount_percent: 25,
    rating: 5.0,
    reviews_count: 246,
    in_stock: true,
    burn_time: '45 - 50 Minutes',
    fragrance_notes: [],
    ingredients: ['Mysore Sandalwood Dust', 'Sacred Temple Blossoms', 'Desi Gir Cow Dung Ash', 'Natural Herbal Gums'],
    description:
      'Tradition in Every Fragrance. FOXAL Sukhad Premium Incense Sticks are 100% charcoal-free, hand-rolled with consecrated temple flowers and genuine sandalwood. Packed in our signature transparent cylindrical container with a regal gold cap.',
    benefits: ['Deepens prayer & meditation', '100% charcoal free pure white ash', 'Tradition in every fragrance', 'Hypoallergenic soothing smoke'],
    badge: 'Best Seller',
    is_bestseller: true,
    is_featured: true,
    images: [
      '/images/products/foxal-sukhad-premium-incense-sticks.jpg',
    ],
  },
  {
    id: 2,
    slug: 'oudh-incense-sticks-250g',
    name: 'Royal Oudh Incense Sticks',
    subtitle: 'Rare Agarwood Resin & Deep Amber Woods',
    category: 'sticks',
    category_name: 'Incense Sticks',
    variant_label: '250g (Approx. 130-140 Sticks)',
    mrp: 199,
    price: 149,
    discount_percent: 25,
    rating: 5.0,
    reviews_count: 219,
    in_stock: true,
    burn_time: '45 - 50 Minutes',
    fragrance_notes: [],
    ingredients: ['Pure Oudh Essential Extracts', 'Crushed Temple Petals', 'Jigat Powder', 'Organic Resins'],
    description:
      'Known as the "Liquid Gold" of perfumery, Oudh brings a regal, deeply meditative ambience into your home. Each charcoal-free stick releases slow, aromatic wisps that linger long after extinguishing.',
    benefits: ['Elevates mood & spiritual presence', 'Relieves mental fatigue', '100% Carbon-monoxide reduced', 'Rich lingering sillage'],
    badge: 'Royal Blend',
    is_bestseller: true,
    is_featured: true,
    images: [
      '/images/products/foxal-oudh-premium-incense-sticks.jpg',
    ],
  },
  {
    id: 3,
    slug: 'woods-incense-sticks-250g',
    name: 'Ancient Woods Incense Sticks',
    subtitle: 'Cedarwood, Pine Bark & Sacred Vetiver',
    category: 'sticks',
    category_name: 'Incense Sticks',
    variant_label: '250g (Approx. 130-140 Sticks)',
    mrp: 199,
    price: 149,
    discount_percent: 25,
    rating: 4.8,
    reviews_count: 142,
    in_stock: true,
    burn_time: '45 - 50 Minutes',
    fragrance_notes: [],
    ingredients: ['Ground Forest Bark', 'Temple Marigold Petals', 'Vetiver Roots', 'Ayurvedic Gums'],
    description:
      'Step into a mist-laden sacred forest. Ancient Woods harmonizes Himalayan cedar with earthy vetiver for a tranquil, grounding experience. Naturally purified air without burning synthetic chemicals.',
    benefits: ['Grounds anxious minds', 'Repels indoor insects naturally', 'Zero synthetic dipping', 'Pure botanical base'],
    badge: 'Staff Pick',
    is_bestseller: false,
    is_featured: true,
    images: [
      '/images/products/foxal-woods-premium-incense-sticks.jpg',
    ],
  },
  {
    id: 4,
    slug: 'sukhad-incense-sticks-250g',
    name: 'Sukhad (Pure Chandan) Sticks',
    subtitle: 'Golden Mysore Sandalwood & Sacred Basil',
    category: 'sticks',
    category_name: 'Incense Sticks',
    variant_label: '250g (Approx. 130-140 Sticks)',
    mrp: 199,
    price: 149,
    discount_percent: 25,
    rating: 4.9,
    reviews_count: 198,
    in_stock: true,
    burn_time: '45 - 50 Minutes',
    fragrance_notes: [],
    ingredients: ['Mysore Sandalwood Dust', 'Temple Rose Petals', 'Sacred Herbs', 'Natural Gums'],
    description:
      'Sukhad embodies timeless Indian devotion. Crafted with sustainably sourced sandalwood powder and consecrated temple blooms. A soft, soothing fragrance that creates an aura of sacred peace in every corner.',
    benefits: ['Deepens prayer & meditation', 'Soothes irritability', 'Clean burning white ash', 'Hypoallergenic fragrance'],
    badge: 'Sacred Ritual',
    is_bestseller: true,
    is_featured: true,
    images: [
      '/images/products/foxal-sukhad-premium-incense-sticks.jpg',
    ],
  },
  {
    id: 5,
    slug: 'mogra-incense-sticks-250g',
    name: 'Mogra (Arabian Jasmine) Sticks',
    subtitle: 'Night-blooming Jasmine & Fresh Dew',
    category: 'sticks',
    category_name: 'Incense Sticks',
    variant_label: '250g (Approx. 130-140 Sticks)',
    mrp: 199,
    price: 149,
    discount_percent: 25,
    rating: 4.9,
    reviews_count: 167,
    in_stock: true,
    burn_time: '45 - 50 Minutes',
    fragrance_notes: [],
    ingredients: ['Fresh Jasmine Extracts', 'Recycled Temple Floral Base', 'Natural Tree Resin', 'Essential Extracts'],
    description:
      'The uplifting essence of pristine Indian Mogra flowers. Captures the fresh sweetness of morning blossoms, uplifting heavy moods and filling living spaces with welcoming, natural floral energy.',
    benefits: ['Invigorates daily energy', 'Neutralizes foul indoor odors', 'Non-irritant to eyes', 'Slow even burning'],
    badge: 'Pure Floral',
    is_bestseller: false,
    is_featured: false,
    images: [
      '/images/products/foxal-mogra-premium-incense-sticks.jpg',
    ],
  },
  {
    id: 6,
    slug: 'gugal-incense-sticks-250g',
    name: 'Gugal (Commiphora Mukul) Sticks',
    subtitle: 'Vedic Sambrani & Purifying Tree Resin',
    category: 'sticks',
    category_name: 'Incense Sticks',
    variant_label: '250g (Approx. 130-140 Sticks)',
    mrp: 199,
    price: 149,
    discount_percent: 25,
    rating: 5.0,
    reviews_count: 245,
    in_stock: true,
    burn_time: '45 - 50 Minutes',
    fragrance_notes: [],
    ingredients: ['Pure Indian Gugal Resin', 'Desi Gir Cow Dung Ash', 'Neem Leaves', 'Herbal Binders'],
    description:
      'Used for millennia in Vedic Hawan rituals, Gugal resin is revered for its antimicrobial and air-cleansing properties. Made strictly with pure tree sap and Gir cow dung powder, without coal or petroleum accelerants.',
    benefits: ['Air purification as per Ayurveda', 'Clears negative planetary energies', 'Natural germicidal smoke', 'Authentic temple scent'],
    badge: 'Vedic Pure',
    is_bestseller: true,
    is_featured: true,
    images: [
      '/images/products/foxal-gugal-premium-incense-sticks.jpg',
    ],
  },

  // --- Category 2: Incense Cones (60 cones/box) ---
  {
    id: 7,
    slug: 'sandalwood-incense-cones-60pcs',
    name: 'FOXAL Sandalwood Natural Incense Cones',
    subtitle: 'Sacred Mysore Chandan with Ceramic Holder',
    category: 'cones',
    category_name: 'Incense Cones',
    variant_label: '60 Cones / Box + Free Holder',
    mrp: 199,
    price: 149,
    discount_percent: 25,
    rating: 4.9,
    reviews_count: 176,
    in_stock: true,
    burn_time: '35 - 40 Minutes per Cone',
    fragrance_notes: [],
    ingredients: ['Mysore Sandal Bark', 'Temple Flower Composite', 'Gir Cow Ghee', 'Vegetable Gums'],
    description:
      'Compact, dense and fragrant. FOXAL Sandalwood Natural Incense Cones release concentrated plumes of sacred chandan aroma. Packed in a luxury gift box with a ceramic holder included.',
    benefits: ['Ideal for home puja & hawan', 'Intense fragrance dispersion', 'Includes ceramic burner plate', 'Leaves non-staining white ash'],
    badge: 'Popular Cones',
    is_bestseller: true,
    is_featured: true,
    images: [
      '/uploads/products/foxal-sandalwood-natural-incense-cones-thumb.jpg',
      '/uploads/products/foxal-sandalwood-natural-incense-cones-2.jpg',
      '/uploads/products/foxal-sandalwood-natural-incense-cones-3.jpg',
      '/uploads/products/foxal-sandalwood-natural-incense-cones-4.jpg',
    ],
  },
  {
    id: 8,
    slug: 'lavender-incense-cones-60pcs',
    name: 'FOXAL Lavender Natural Incense Cones',
    subtitle: 'Kashmir French Lavender & Soothing Chamomile',
    category: 'cones',
    category_name: 'Incense Cones',
    variant_label: '60 Cones / Box + Free Holder',
    mrp: 199,
    price: 149,
    discount_percent: 25,
    rating: 4.8,
    reviews_count: 134,
    in_stock: true,
    burn_time: '35 - 40 Minutes per Cone',
    fragrance_notes: [],
    ingredients: ['Kashmir Lavender Essential Oil', 'Sun-cured Temple Petals', 'Natural Binders'],
    description:
      'Designed specifically for sleep, relaxation and restorative yoga. The gentle herbaceous notes of Kashmir lavender soothe nervous tension and prepare the mind for deep, unbothered rest.',
    benefits: ['Promotes restorative sleep', 'Reduces evening stress', 'Gentle non-pungent floral plume', 'Zero toxic chemicals'],
    badge: 'Sleep & Calm',
    is_bestseller: false,
    is_featured: true,
    images: [
      '/uploads/products/foxal-lavender-natural-incense-cones-thumb.jpg',
      '/uploads/products/foxal-lavender-natural-incense-cones-2.jpg',
      '/uploads/products/foxal-lavender-natural-incense-cones-3.jpg',
      '/uploads/products/foxal-lavender-natural-incense-cones-4.jpg',
    ],
  },
  {
    id: 9,
    slug: 'rose-incense-cones-60pcs',
    name: 'FOXAL Rose Natural Incense Cones',
    subtitle: 'Pure Damascus Rose & Sacred Marigold',
    category: 'cones',
    category_name: 'Incense Cones',
    variant_label: '60 Cones / Box + Free Holder',
    mrp: 199,
    price: 149,
    discount_percent: 25,
    rating: 5.0,
    reviews_count: 204,
    in_stock: true,
    burn_time: '35 - 40 Minutes per Cone',
    fragrance_notes: [],
    ingredients: ['Kannauj Desi Gulab Extracts', 'Temple Rose Petals', 'Natural Organic Resins'],
    description:
      'Inspired by the legendary attar artisans of Kannauj. Packed with real petal extracts from sacred offerings, creating a gentle floral sanctuary that opens the heart chakra and invites positive abundance.',
    benefits: ['Opens heart chakra', 'Warm welcoming home fragrance', 'Charcoal-free clean cone base', 'Includes brass/ceramic stand'],
    badge: 'Heart Chakra',
    is_bestseller: true,
    is_featured: true,
    images: [
      '/uploads/products/foxal-rose-natural-incense-cones-thumb.jpg',
      '/uploads/products/foxal-rose-natural-incense-cones-2.jpg',
      '/uploads/products/foxal-rose-natural-incense-cones-3.jpg',
      '/uploads/products/foxal-rose-natural-incense-cones-4.jpg',
    ],
  },
  {
    id: 10,
    slug: 'jasmine-incense-cones-60pcs',
    name: 'FOXAL Jasmine Natural Incense Cones',
    subtitle: 'Fresh Indian Bela & Sacred Herbs',
    category: 'cones',
    category_name: 'Incense Cones',
    variant_label: '60 Cones / Box + Free Holder',
    mrp: 199,
    price: 149,
    discount_percent: 25,
    rating: 4.8,
    reviews_count: 118,
    in_stock: true,
    burn_time: '35 - 40 Minutes per Cone',
    fragrance_notes: [],
    ingredients: ['Madurai Jasmine Extracts', 'Temple Floral Blend', 'Natural Plant Gums'],
    description:
      'Exquisite and revitalizing. Each Bela cone is handcrafted to burn with a steady, serene plume that fills larger rooms effortlessly without suffocating heaviness or coal smoke.',
    benefits: ['Dispels lethargy and dullness', 'Long lasting room coverage', '100% biodegradable packaging', 'Natural aromatic therapy'],
    badge: 'Floral Bliss',
    is_bestseller: false,
    is_featured: false,
    images: [
      '/uploads/products/foxal-jasmine-natural-incense-cones-thumb.jpg',
      '/uploads/products/foxal-jasmine-natural-incense-cones-2.jpg',
      '/uploads/products/foxal-jasmine-natural-incense-cones-3.jpg',
      '/uploads/products/foxal-jasmine-natural-incense-cones-4.jpg',
    ],
  },
];

// -------------------------------------------------------------
// CATEGORIES OVERVIEW
// -------------------------------------------------------------

export const CATEGORIES: Category[] = [
  {
    id: 'sticks',
    slug: 'incense-sticks',
    name: 'Incense Sticks',
    tagline: 'Hand-rolled 250g Value Packs',
    description: 'Long-burning charcoal-free bamboo sticks crafted with pure temple flowers, herbs, and Ayurvedic oils.',
    specs: '250g (~135 Sticks) · 45-50 Min Burn',
    item_count: 6,
    starting_price: 149,
    image: '/images/products/sticks/foxal-sukhad-premium-incense-sticks.jpg',
  },
  {
    id: 'cones',
    slug: 'incense-cones',
    name: 'Incense Cones',
    tagline: 'Pure Dhoop 60 Cones with Ceramic Stand',
    description: 'Dense aromatic pyramids that release rich sacred smoke without bamboo or chemical binders.',
    specs: '60 Cones Box · 35-40 Min Burn · Free Stand',
    item_count: 4,
    starting_price: 149,
    image: '/images/products/cones/foxal-sandalwood-natural-incense-cones.jpg',
  },
];

// -------------------------------------------------------------
// TRUST STRIP PILLARS
// -------------------------------------------------------------

export const TRUST_PILLARS = [
  {
    title: '100% Charcoal Free',
    subtitle: 'Zero toxic black smoke or respiratory irritation. Pure white ash only.',
    icon: 'ShieldCheck',
  },
  {
    title: 'Temple Flower Upcycling',
    subtitle: 'Rescuing sacred temple offerings from rivers to handcraft pure dhoop.',
    icon: 'Sparkles',
  },
  {
    title: 'Pure Ayurvedic Ingredients',
    subtitle: 'Formulated with Gir cow dung, camphor, raw herbs & therapeutic essential oils.',
    icon: 'Leaf',
  },
  {
    title: '45+ Mins Long Lasting',
    subtitle: 'Slow, steady combustion delivering authentic lingering Indian fragrances.',
    icon: 'Clock',
  },
];

// -------------------------------------------------------------
// VERIFIED CUSTOMER REVIEWS
// -------------------------------------------------------------

export const REVIEWS: Review[] = [
  {
    id: 1,
    name: 'Aarav Mehta',
    location: 'Mumbai, Maharashtra',
    rating: 5,
    date: '14 Oct 2026',
    product_name: 'Gugal Vedic Incense Sticks',
    headline: 'Finally, an agarbatti that does not trigger my asthma!',
    comment:
      'Regular market incense gives me immediate sneezes and headaches due to coal. FOXAL is a godsend. The Gugal aroma feels like walking into an ancient temple in Varanasi. Clean, uplifting, and soot-free.',
    verified: true,
  },
  {
    id: 2,
    name: 'Pooja Venkatesh',
    location: 'Bengaluru, Karnataka',
    rating: 5,
    date: '21 Oct 2026',
    product_name: 'Sandalwood Dhoop Cones',
    headline: 'Real Mysore Sandalwood aroma, not cheap perfume.',
    comment:
      'The 60 cone pack is incredible value at Rs.149. The ceramic holder included in the box is so thoughtful. Each cone burns for nearly 40 minutes and leaves the whole living room smelling peaceful for hours.',
    verified: true,
  },
  {
    id: 3,
    name: 'Vikramaditya Sharma',
    location: 'New Delhi',
    rating: 5,
    date: '02 Oct 2026',
    product_name: 'Royal Oudh Incense Sticks',
    headline: 'Luxury fragrance at everyday accessible pricing.',
    comment:
      'The Oudh aroma is deeply sophisticated — smoky, woody, and sweet. Knowing that holy temple flowers are being preserved and repurposed rather than polluting the Ganga makes this brand truly special.',
    verified: true,
  },
  {
    id: 4,
    name: 'Ananya Mukherjee',
    location: 'Kolkata, West Bengal',
    rating: 5,
    date: '19 Oct 2026',
    product_name: 'Gulab Kannauj Rose Cones',
    headline: 'Pure bliss for evening meditation & puja.',
    comment:
      'The rose fragrance is authentic desi damask rose. Absolutely love the gentle smoke and the beautiful luxury box it comes in. Have already gifted 4 boxes to my family.',
    verified: true,
  },
];

// -------------------------------------------------------------
// FREQUENTLY ASKED QUESTIONS
// -------------------------------------------------------------

export const FAQS: FaqItem[] = [
  {
    id: 1,
    category: 'health',
    question: 'Why is charcoal-free incense better for my home?',
    answer:
      'Traditional commercial incense uses powdered coal/charcoal to burn cheaply. When burned, charcoal releases carbon monoxide, sulfur dioxide and toxic particulate matter into indoor air, frequently causing eye-watering, headaches, and respiratory allergies. FOXAL uses an Ayurvedic composite of temple flowers, Gir cow dung, plant gums, and pure resins that burns clean without harmful toxins.',
  },
  {
    id: 2,
    category: 'product',
    question: 'How do you upcycle temple flowers?',
    answer:
      'Across Indian temples, millions of tons of sacred floral offerings (marigolds, roses, jasmine) end up discarded in rivers daily. Our team collects these holy flowers respectfully, sun-dries them, and pulverizes them into fine organic flower powder that forms the aromatic base of every FOXAL stick and cone.',
  },
  {
    id: 3,
    category: 'product',
    question: 'What is included in the packaging?',
    answer:
      'Incense Sticks come in a generous 250g pack containing approximately 130 to 140 premium long sticks (45-50 min burn each). Incense Cones come in a luxury sealed rigid box containing 60 dhoop cones plus a complimentary reusable ceramic burner holder.',
  },
  {
    id: 4,
    category: 'shipping',
    question: 'What are the delivery charges and delivery times?',
    answer:
      'We offer FREE Express Shipping on all orders above ₹499 across India. For orders below ₹499, a nominal flat shipping fee of ₹49 is applied. Orders are dispatched within 24 hours from our workshop and typically arrive in 3-5 business days.',
  },
  {
    id: 5,
    category: 'product',
    question: 'Are FOXAL products safe around pets and infants?',
    answer:
      'Yes! Because our formula is completely free from sulfur, coal, phthalates, and synthetic chemical binders, the smoke is gentle and does not irritate sensitive canine noses or infants when used in normally ventilated spaces.',
  },
];

// -------------------------------------------------------------
// CHARCOAL VS FOXAL COMPARISON
// -------------------------------------------------------------

export const COMPARISONS = [
  {
    feature: 'Core Material',
    charcoal: 'Black Coal Dust & Petrochemical Fillers',
    foxal: '100% Upcycled Temple Flowers & Ayurvedic Gums',
    winner: 'foxal',
  },
  {
    feature: 'Smoke Quality',
    charcoal: 'Dense, pungent black smoke with soot',
    foxal: 'Whispering, clean white aromatic smoke',
    winner: 'foxal',
  },
  {
    feature: 'Health & Lungs',
    charcoal: 'Causes coughing, eye burning & indoor PM2.5 spikes',
    foxal: 'Hypoallergenic, safe for daily prayer & yoga',
    winner: 'foxal',
  },
  {
    feature: 'Fragrance Source',
    charcoal: 'Synthetic dipping with alcohol & artificial oils',
    foxal: 'Pure therapeutic essential oils & natural resins',
    winner: 'foxal',
  },
  {
    feature: 'Spiritual Purity',
    charcoal: 'Non-traditional synthetic burning',
    foxal: 'Vedic tradition: Desi cow dung & sacred flowers',
    winner: 'foxal',
  },
];
