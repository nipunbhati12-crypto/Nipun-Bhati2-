import { Product, Review } from '../types';

export const PRODUCTS: Product[] = [
  {
    id: "501-original-fit-mens-jeans",
    name: "501® Original Fit Men's Jeans",
    price: 108.00,
    originalPrice: 128.00,
    description: "The blueprint for every pair of jeans in existence since 1873. Crafted in high-density premium cotton with straight-leg classic fit, clean copper rivets, and signature leather patch. These are washed to a rugged mid-indigo shade with pre-distressed accents.",
    category: "Denim Collection",
    fit: "Original Straight",
    colors: [
      { name: "Raw Indigo", hex: "#1A2E40" },
      { name: "Washed Blue", hex: "#4A7091" },
      { name: "Coal Black", hex: "#1C1C1C" }
    ],
    sizes: ["29x30", "30x30", "31x32", "32x32", "33x32", "34x32", "36x34"],
    image: "https://images.unsplash.com/photo-1542272604-787c3835535d?q=80&w=600",
    rating: 4.8,
    reviewsCount: 324,
    isBestSeller: true,
    isNew: false,
    inStock: true
  },
  {
    id: "sherpa-trucker-jacket-mens",
    name: "Classic Sherpa Trucker Jacket",
    price: 128.00,
    description: "An absolute street staple. Our iconic denim jacket lined with plush, insulating faux-sherpa for cold days. Features classic metallic snap closures, dual flap chest pockets, and adjustable waist tabs for that customized vintage boxy streetwear look.",
    category: "New Arrivals",
    fit: "Boxy Trucker",
    colors: [
      { name: "Denim Stonewash", hex: "#5C7E9D" },
      { name: "Pitch Black", hex: "#1F1F21" },
      { name: "Rustic Corduroy", hex: "#785335" }
    ],
    sizes: ["S", "M", "L", "XL", "XXL"],
    image: "https://images.unsplash.com/photo-1576995853123-5a10305d93c0?q=80&w=600",
    rating: 4.9,
    reviewsCount: 189,
    isBestSeller: true,
    isNew: true,
    inStock: true
  },
  {
    id: "ribcage-straight-ankle-womens-jeans",
    name: "Ribcage Straight Ankle Women's Jeans",
    price: 118.00,
    originalPrice: 148.00,
    description: "Levi's highest high rise with a classic straight leg. Defined by an ultra-flattering 12-inch rise that cinches the waist and elongates the silhouette. Made with authentic low-stretch denim that breaks in perfectly over time.",
    category: "Women",
    fit: "Ultra High Rise Straight",
    colors: [
      { name: "Mid Denim Wash", hex: "#6D8FA3" },
      { name: "Light Bleach Wash", hex: "#9EBDD1" },
      { name: "Carbon Black", hex: "#2B2B2C" }
    ],
    sizes: ["24", "25", "26", "27", "28", "29", "30", "31"],
    image: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?q=80&w=600",
    rating: 4.7,
    reviewsCount: 247,
    isBestSeller: false,
    isNew: true,
    inStock: true
  },
  {
    id: "ex-boyfriend-trucker-jacket-womens",
    name: "Ex-Boyfriend Trucker Jacket",
    price: 98.00,
    description: "The oversized denim jacket everyone steals from their boyfriend's closet. Designed with an extra-relaxed silhouette and elongated hem to create an effortless, cool street style statement. Versatile layer for any season.",
    category: "Women",
    fit: "Loose Boyfriend",
    colors: [
      { name: "Faded Vintage Indigo", hex: "#7E9CB3" },
      { name: "Chalk White", hex: "#ECECE4" }
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=600",
    rating: 4.6,
    reviewsCount: 154,
    isBestSeller: true,
    isNew: false,
    inStock: true
  },
  {
    id: "511-slim-fit-mens-jeans",
    name: "511™ Slim Fit Men's Jeans",
    price: 98.00,
    originalPrice: 118.00,
    description: "A modern slim with room to move. The 511™ Slim Fit is an elegant alternative to the straight jean. Cut close through the thigh and straight down to the ankle, designed with advanced stretch denim for maximum active comfort.",
    category: "Men",
    fit: "Slim Fit",
    colors: [
      { name: "Dark Indigo Star", hex: "#1D2B3A" },
      { name: "Smoky Black", hex: "#2F2F31" },
      { name: "Timber Grey", hex: "#5C5C5E" }
    ],
    sizes: ["30x30", "31x30", "32x32", "33x32", "34x32", "36x32"],
    image: "https://images.unsplash.com/photo-1604176354204-9268737828e4?q=80&w=600",
    rating: 4.5,
    reviewsCount: 412,
    isBestSeller: false,
    isNew: false,
    inStock: true
  },
  {
    id: "vintage-batwing-logo-tee",
    name: "Housemark Graphic Tee",
    price: 29.50,
    originalPrice: 35.00,
    description: "The world-famous signature batwing tee. Made with super soft, breathable premium cotton jersey for a classic comfortable sportswear outline. A daily wardrobe building block featuring our iconic screenprinted logo across the chest.",
    category: "Accessories", // Or apparel, let's keep in accessories / apparel hybrid
    fit: "Standard Fit",
    colors: [
      { name: "Sportswear White", hex: "#F3F4F6" },
      { name: "Classic Navy Blue", hex: "#1E3A8A" },
      { name: "Levis Red", hex: "#D61A3C" },
      { name: "Heather Grey", hex: "#9CA3AF" }
    ],
    sizes: ["S", "M", "L", "XL", "XXL"],
    image: "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?q=80&w=600",
    rating: 4.7,
    reviewsCount: 518,
    isBestSeller: true,
    isNew: false,
    inStock: true
  },
  {
    id: "leather-batwing-plaque-belt",
    name: "Full-Grain Utility Leather Belt",
    price: 48.00,
    description: "Crafted in 100% genuine full-grain bridle leather, designed to develop a rich organic patina over years of heavy wear. Features a heavy-duty gunmetal steel buckle detailed with an engraved Levi's branding imprint.",
    category: "Accessories",
    fit: "Standard Width",
    colors: [
      { name: "Chestnut Brown", hex: "#543C2E" },
      { name: "Onyx Black", hex: "#1A1A1A" }
    ],
    sizes: ["32", "34", "36", "38", "40"],
    image: "https://images.unsplash.com/photo-1511405901232-a7e4443b82cd?q=80&w=600",
    rating: 4.6,
    reviewsCount: 95,
    isBestSeller: false,
    isNew: false,
    inStock: true
  },
  {
    id: "levis-relaxed-fit-hoodie",
    name: "Classic Overdyed Hoodie",
    price: 85.00,
    originalPrice: 98.00,
    description: "The ultimate cozy lounge knit. Our streetwear-inspired overdyed fleece hoodie features extra-dropped shoulders, double-lined spacious hood, and deep pouch pocket. Pre-shrunk for the ideal boxy, heavy weight silhouette.",
    category: "Sale",
    fit: "Oversized Street",
    colors: [
      { name: "Faded Charcoal", hex: "#2F3136" },
      { name: "Desert Sage", hex: "#7E857C" },
      { name: "Denim Blue", hex: "#4C6B8B" }
    ],
    sizes: ["S", "M", "L", "XL"],
    image: "https://images.unsplash.com/photo-1488161628813-04466f872be2?q=80&w=600",
    rating: 4.8,
    reviewsCount: 167,
    isBestSeller: true,
    isNew: true,
    inStock: true
  },
  {
    id: "70s-high-flare-womens-jeans",
    name: "70s High Flare Women's Jeans",
    price: 128.00,
    description: "Take it back to the golden age of denim. These high-waisted flare jeans feature a slim-fitting silhouette through the hips and thighs before breaking into a dramatic, sweeping retro flare. Made with sustainable eco-concious hemp fiber blend.",
    category: "Denim Collection",
    fit: "High Flare",
    colors: [
      { name: "Oceanic Indigo", hex: "#2E5875" },
      { name: "Retro Stonewash", hex: "#6389A3" }
    ],
    sizes: ["25", "26", "27", "28", "29", "30", "31", "32"],
    image: "https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=600",
    rating: 4.9,
    reviewsCount: 112,
    isBestSeller: false,
    isNew: true,
    inStock: true
  },
  {
    id: "classic-denim-totebag",
    name: "Heavy Canvas Denim Tote",
    price: 39.00,
    description: "An everyday carry tote built from ultra-durable denim twill with reinforced webbing handles. Features double external compartments, an interior laptop slip pocket, and red Levi’s label stitched onto the rim.",
    category: "Accessories",
    fit: "One Size",
    colors: [
      { name: "Classic Indigo", hex: "#304D6B" },
      { name: "Washed Black", hex: "#29292B" }
    ],
    sizes: ["OS"],
    image: "https://images.unsplash.com/photo-1582533561751-ef6f6ab93a2e?q=80&w=600",
    rating: 4.4,
    reviewsCount: 78,
    isBestSeller: false,
    isNew: true,
    inStock: true
  }
];

export const REVIEWS: Review[] = [
  {
    id: "rev-1",
    author: "Alexander K.",
    rating: 5,
    date: "2026-04-12",
    title: "Best denim investment ever",
    comment: "These 501s fit exactly like my vintage pairs but with the benefit of being fresh out of the package. The mid-weight denim breaks in after just a few wears. Highly recommend raw or stonewashed!",
    verified: true,
    likes: 42
  },
  {
    id: "rev-2",
    author: "Jessica T.",
    rating: 5,
    date: "2026-05-02",
    title: "Flattering beyond words!",
    comment: "The Ribcage high rise jeans changed my life. They hide everything and pull you in perfectly. They have virtually zero stretch which means they hold their gorgeous shape all day without turning saggy.",
    verified: true,
    likes: 81
  },
  {
    id: "rev-3",
    author: "Devon M.",
    rating: 4,
    date: "2026-05-18",
    title: "Unbelievable street aesthetic",
    comment: "Bought the Sherpa Trucker. Perfect boxy drop-shoulder visual outline. It is definitely warm. Docked a star just because sizes run a bit snug if you want to wear a thick hoodie underneath. Size up for streetwear!",
    verified: true,
    likes: 19
  },
  {
    id: "rev-4",
    author: "Sarah P.",
    rating: 5,
    date: "2026-05-24",
    title: "Beautiful quality & timeless appeal",
    comment: "I absolute love how structured the Ex-Boyfriend denim jacket feels. Durable denim texture that matches everything. The white shade looks extremely expensive and crisp.",
    verified: true,
    likes: 11
  }
];
