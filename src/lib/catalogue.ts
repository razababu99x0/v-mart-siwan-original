export type Gender = "men" | "women" | "kids" | "infants";
export type Badge = "new" | "bestseller" | "sale" | "limited" | "trending";

export interface ColorOption {
  name: string;
  hex: string;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  gender: Gender;
  category: string; // Men / Women / Kids / Infants
  subcategory: string; // Ethnic, Western, Footwear...
  price: number;
  salePrice?: number;
  currency: "INR";
  colors: ColorOption[];
  sizes: string[];
  rating: number;
  reviews: number;
  badges: Badge[];
  fabric: string;
  care: string;
  description: string;
  image: string; // primary
  gallery: string[];
  stock: number;
}

const base = "https://picsum.photos/seed";

function img(seed: string) {
  return `${base}/${encodeURIComponent(seed)}/900/1100`;
}

const RED = { name: "V-Mart Red", hex: "#e11d48" };
const BLACK = { name: "Charcoal", hex: "#18181b" };
const WHITE = { name: "Pearl", hex: "#f4f4f5" };
const GOLD = { name: "Soft Gold", hex: "#e7c989" };
const NAVY = { name: "Midnight", hex: "#1e293b" };
const BEIGE = { name: "Sand", hex: "#d6c3a5" };
const GREEN = { name: "Pine", hex: "#14532d" };
const BLUE = { name: "Cobalt", hex: "#1d4ed8" };

interface Seed {
  id: string;
  name: string;
  gender: Gender;
  subcategory: string;
  price: number;
  salePrice?: number;
  colors: ColorOption[];
  sizes: string[];
  rating: number;
  reviews: number;
  badges: Badge[];
  fabric: string;
  care: string;
  description: string;
  seed: string;
}

const seeds: Seed[] = [
  {
    id: "m-tshirt-classic",
    name: "Signature Oversized Tee",
    gender: "men",
    subcategory: "Western",
    price: 599,
    salePrice: 449,
    colors: [RED, BLACK, WHITE],
    sizes: ["S", "M", "L", "XL", "XXL"],
    rating: 4.7,
    reviews: 1284,
    badges: ["bestseller", "sale"],
    fabric: "100% Combed Cotton, 240 GSM",
    care: "Machine wash cold · Do not bleach · Tumble dry low",
    description:
      "A heavyweight oversized tee with a structured drape. The Siwan-exclusive V-Mart stamp sits at the hem for that standout everyday look.",
    seed: "vmtshirt",
  },
  {
    id: "m-kurta-festive",
    name: "Ivory Festive Kurta",
    gender: "men",
    subcategory: "Ethnic",
    price: 1299,
    salePrice: 999,
    colors: [WHITE, GOLD, NAVY],
    sizes: ["S", "M", "L", "XL", "XXL"],
    rating: 4.8,
    reviews: 642,
    badges: ["new", "trending"],
    fabric: "Pure Cotton Cambric with self-embroidery",
    care: "Hand wash · Dry in shade · Warm iron",
    description:
      "Festive-ready straight kurta with subtle tonal embroidery. Paired with a churidar, it is the Chhath & wedding season essential.",
    seed: "vmkurta",
  },
  {
    id: "m-joggers",
    name: "Tapered Tech Joggers",
    gender: "men",
    subcategory: "Western",
    price: 899,
    colors: [BLACK, NAVY, { name: "Slate", hex: "#64748b" }],
    sizes: ["S", "M", "L", "XL"],
    rating: 4.6,
    reviews: 410,
    badges: ["bestseller"],
    fabric: "French terry, 300 GSM",
    care: "Machine wash 30° · Do not iron print",
    description: "Sculpted tapered joggers with zip pockets and a snatched ankle cuff.",
    seed: "vmjogger",
  },
  {
    id: "m-jacket-leather",
    name: "Matte Biker Jacket",
    gender: "men",
    subcategory: "Outerwear",
    price: 3499,
    salePrice: 2799,
    colors: [BLACK, RED],
    sizes: ["M", "L", "XL"],
    rating: 4.9,
    reviews: 221,
    badges: ["limited", "sale"],
    fabric: "PU matte body with cotton lining",
    care: "Wipe clean · Store on wide hanger",
    description: "An editors' favourite — clean matte lines with a soft red interior pop.",
    seed: "vmjacket",
  },
  {
    id: "w-dress-wrap",
    name: "Crimson Wrap Dress",
    gender: "women",
    subcategory: "Western",
    price: 1599,
    salePrice: 1199,
    colors: [RED, BLACK, NAVY],
    sizes: ["XS", "S", "M", "L", "XL"],
    rating: 4.8,
    reviews: 918,
    badges: ["bestseller", "sale"],
    fabric: "Viscose blend crepe",
    care: "Machine wash gentle · Hang dry",
    description: "A flattering wrap silhouette in our signature crimson. Date night to diwali party.",
    seed: "vwdress",
  },
  {
    id: "w-saree-soft",
    name: "Soft Silk Festive Saree",
    gender: "women",
    subcategory: "Ethnic",
    price: 2499,
    salePrice: 1999,
    colors: [RED, GOLD, GREEN],
    sizes: ["Free Size"],
    rating: 4.9,
    reviews: 503,
    badges: ["new", "limited"],
    fabric: "Art silk with woven border",
    care: "Dry clean only",
    description: "Lightweight art-silk saree with zari border — drapes like a dream.",
    seed: "vwsaree",
  },
  {
    id: "w-kurti-anarkali",
    name: "Anarkali Kurta Set",
    gender: "women",
    subcategory: "Ethnic",
    price: 1899,
    salePrice: 1499,
    colors: [RED, BEIGE, NAVY],
    sizes: ["S", "M", "L", "XL", "XXL"],
    rating: 4.7,
    reviews: 377,
    badges: ["trending"],
    fabric: "Rayon with cotton palazzo",
    care: "Hand wash cold",
    description: "Flowy Anarkali with matching palazzo — effortless festive elegance.",
    seed: "vwankali",
  },
  {
    id: "w-top-crop",
    name: "Ribbed Crop Top",
    gender: "women",
    subcategory: "Western",
    price: 499,
    colors: [RED, WHITE, BLACK, BEIGE],
    sizes: ["XS", "S", "M", "L"],
    rating: 4.5,
    reviews: 712,
    badges: ["bestseller"],
    fabric: "Ribbed cotton-modal",
    care: "Machine wash cold",
    description: "Second-skin ribbed crop that layers under everything.",
    seed: "vwtop",
  },
  {
    id: "w-coord-set",
    name: "Pastel Co-ord Set",
    gender: "women",
    subcategory: "Western",
    price: 1399,
    salePrice: 1099,
    colors: [BEIGE, NAVY, RED],
    sizes: ["S", "M", "L", "XL"],
    rating: 4.6,
    reviews: 256,
    badges: ["new"],
    fabric: "Linen-cotton blend",
    care: "Machine wash gentle",
    description: "A breezy two-piece co-ord for Siwan summers.",
    seed: "vwcoord",
  },
  {
    id: "k-tee-dino",
    name: "Dino Graphic Tee",
    gender: "kids",
    subcategory: "Western",
    price: 399,
    salePrice: 299,
    colors: [RED, BLUE, WHITE],
    sizes: ["4-5Y", "6-7Y", "8-9Y", "10-11Y", "12-13Y"],
    rating: 4.7,
    reviews: 540,
    badges: ["bestseller", "sale"],
    fabric: "Bio-washed cotton",
    care: "Machine wash cold",
    description: "Play-hard graphic tee with a glow-in-the-dark dino print.",
    seed: "vktee",
  },
  {
    id: "k-frock",
    name: "Tiered Party Frock",
    gender: "kids",
    subcategory: "Western",
    price: 899,
    colors: [RED, GOLD, NAVY],
    sizes: ["3-4Y", "5-6Y", "7-8Y"],
    rating: 4.8,
    reviews: 311,
    badges: ["new", "trending"],
    fabric: "Soft tulle over cotton",
    care: "Hand wash",
    description: "Twirl-ready tiered frock for birthdays and functions.",
    seed: "vkfrock",
  },
  {
    id: "k-kurta-boy",
    name: "Pathani Kurta Set",
    gender: "kids",
    subcategory: "Ethnic",
    price: 799,
    salePrice: 599,
    colors: [WHITE, NAVY, RED],
    sizes: ["4-5Y", "6-7Y", "8-9Y", "10-11Y"],
    rating: 4.6,
    reviews: 198,
    badges: ["sale"],
    fabric: "Cotton slub",
    care: "Machine wash cold",
    description: "Mini pathani set for the little gentleman.",
    seed: "vkkurta",
  },
  {
    id: "i-bodysuit",
    name: "Cotton Bodysuit 3-pack",
    gender: "infants",
    subcategory: "Essentials",
    price: 599,
    salePrice: 449,
    colors: [WHITE, RED, BEIGE],
    sizes: ["0-3M", "3-6M", "6-9M", "9-12M"],
    rating: 4.9,
    reviews: 880,
    badges: ["bestseller", "sale"],
    fabric: "Organic cotton, super-soft",
    care: "Machine wash gentle · No harsh detergent",
    description: "Buttery-soft envelope-neck bodysuits, gentle on newborn skin.",
    seed: "vibody",
  },
  {
    id: "i-romper",
    name: "Little Star Romper",
    gender: "infants",
    subcategory: "Western",
    price: 499,
    colors: [RED, WHITE, NAVY],
    sizes: ["0-3M", "3-6M", "6-9M"],
    rating: 4.7,
    reviews: 264,
    badges: ["new"],
    fabric: "Interlock cotton",
    care: "Machine wash cold",
    description: "Snap-crotch romper with a tiny star appliqué.",
    seed: "viromper",
  },
  {
    id: "a-sneaker",
    name: "Air Cushion Sneakers",
    gender: "men",
    subcategory: "Footwear",
    price: 1999,
    salePrice: 1599,
    colors: [WHITE, BLACK, RED],
    sizes: ["7", "8", "9", "10", "11"],
    rating: 4.8,
    reviews: 1340,
    badges: ["bestseller", "sale"],
    fabric: "Mesh + TPR sole",
    care: "Wipe with damp cloth",
    description: "Cloud-soft everyday sneaker with a red energy stripe.",
    seed: "vasneak",
  },
  {
    id: "a-heels",
    name: "Sculpt Stiletto Heels",
    gender: "women",
    subcategory: "Footwear",
    price: 1799,
    salePrice: 1399,
    colors: [RED, BLACK, GOLD],
    sizes: ["5", "6", "7", "8"],
    rating: 4.6,
    reviews: 421,
    badges: ["trending", "sale"],
    fabric: "Faux leather + cushioned insole",
    care: "Wipe clean",
    description: "A confident stiletto with an all-day cushioned footbed.",
    seed: "vaheel",
  },
  {
    id: "a-cap",
    name: "Embroidered Dad Cap",
    gender: "men",
    subcategory: "Accessories",
    price: 349,
    colors: [BLACK, RED, NAVY],
    sizes: ["One Size"],
    rating: 4.5,
    reviews: 602,
    badges: ["bestseller"],
    fabric: "Washed cotton twill",
    care: "Spot clean",
    description: "Low-profile cap with a raised V-Mart Siwan embroidery.",
    seed: "vacap",
  },
  {
    id: "a-bag",
    name: "Quilted Sling Bag",
    gender: "women",
    subcategory: "Accessories",
    price: 899,
    salePrice: 699,
    colors: [BLACK, RED, BEIGE],
    sizes: ["One Size"],
    rating: 4.7,
    reviews: 355,
    badges: ["new", "sale"],
    fabric: "Quilted faux leather",
    care: "Wipe clean",
    description: "Hands-free quilted sling with a hidden red lining.",
    seed: "vabag",
  },
  {
    id: "w-jacket-denim",
    name: "Oversized Denim Jacket",
    gender: "women",
    subcategory: "Outerwear",
    price: 1699,
    salePrice: 1299,
    colors: [BLUE, BLACK],
    sizes: ["S", "M", "L", "XL"],
    rating: 4.6,
    reviews: 289,
    badges: ["trending", "sale"],
    fabric: "Rigid cotton denim",
    care: "Machine wash inside out",
    description: "Boxy vintage-wash denim jacket for layering season.",
    seed: "vwdenim",
  },
  {
    id: "m-shorts",
    name: "Pleated Tailored Shorts",
    gender: "men",
    subcategory: "Western",
    price: 699,
    salePrice: 549,
    colors: [BEIGE, NAVY, BLACK],
    sizes: ["S", "M", "L", "XL"],
    rating: 4.4,
    reviews: 167,
    badges: ["sale"],
    fabric: "Twill cotton",
    care: "Machine wash cold",
    description: "Smart pleated shorts that dress up or down.",
    seed: "vmshort",
  },
];

export const products: Product[] = seeds.map((s) => {
  const gallery = [
    img(s.seed),
    img(`${s.seed}-2`),
    img(`${s.seed}-3`),
    img(`${s.seed}-4`),
  ];
  return {
    id: s.id,
    slug: s.id,
    name: s.name,
    gender: s.gender,
    category: s.gender.charAt(0).toUpperCase() + s.gender.slice(1),
    subcategory: s.subcategory,
    price: s.price,
    salePrice: s.salePrice,
    currency: "INR",
    colors: s.colors,
    sizes: s.sizes,
    rating: s.rating,
    reviews: s.reviews,
    badges: s.badges,
    fabric: s.fabric,
    care: s.care,
    description: s.description,
    image: gallery[0],
    gallery,
    stock: 40 + (s.id.length * 7) % 60,
  };
});

export function getProduct(id: string) {
  return products.find((p) => p.id === id || p.slug === id);
}

export function relatedProducts(p: Product, count = 4) {
  return products
    .filter((x) => x.id !== p.id && (x.gender === p.gender || x.subcategory === p.subcategory))
    .slice(0, count);
}

/* ---------------- Store info ---------------- */
export const store = {
  name: "V-Mart Siwan",
  branch: "Siwan, Bihar",
  address:
    "Rajender Path, Babunia More, Chhapra Road, Near Fatehpur Bypass Rd, Pal Nagar, Siwan, Bihar 841226",
  landmark: "Babunia More, Siwan",
  phone: "+91 72900 36224",
  phoneHref: "tel:+917290036224",
  hours: "10:00 AM – 10:00 PM",
  mapsQuery:
    "https://www.google.com/maps?q=Rajender+Path+Babunia+More+Chhapra+Road+Siwan+Bihar+841226&output=embed",
  directions:
    "https://www.google.com/maps/dir/?api=1&destination=Rajender+Path+Babunia+More+Chhapra+Road+Siwan+Bihar+841226",
};

/* ---------------- Categories (bento) ---------------- */
export const categories = [
  { key: "men", label: "Men", tag: "Sharp & street", href: "/?c=men", image: img("vmcat-men"), span: "lg:col-span-2 lg:row-span-2 lg:h-[37rem]" },
  { key: "women", label: "Women", tag: "Festive & fierce", href: "/?c=women", image: img("vmcat-women"), span: "lg:col-span-2 lg:h-[18rem]" },
  { key: "kids", label: "Kids", tag: "Play-hard edits", href: "/?c=kids", image: img("vmcat-kids"), span: "lg:h-[18rem]" },
  { key: "infants", label: "Infants", tag: "Newborn soft", href: "/?c=infants", image: img("vmcat-infants"), span: "lg:h-[18rem]" },
] as const;

/* ---------------- Budget tiers ---------------- */
export const budgetTiers = [
  { key: "u299", label: "Under ₹299", min: 0, max: 299 },
  { key: "299-499", label: "₹299 – ₹499", min: 299, max: 499 },
  { key: "499-999", label: "₹499 – ₹999", min: 499, max: 999 },
  { key: "999+", label: "₹999 & above", min: 999, max: Infinity },
];

export function productsByBudget(tier: (typeof budgetTiers)[number]) {
  return products.filter((p) => {
    const price = p.salePrice ?? p.price;
    return price >= tier.min && price <= tier.max;
  });
}

/* ---------------- Deliverable PINs (PIN-code check) ---------------- */
export const deliverablePins = new Set([
  "841226", "841301", "841302", "841303", "841304", "841305", "841306",
  "841201", "841202", "841203", "841204", "841205", "841206", "841207",
  "841208", "841209", "841210", "841211", "841212", "841213", "841214",
  "841215", "841216", "841217", "841218", "841219", "841220", "841221",
  "841222", "841223", "841224", "841225", "841227", "841228", "841229",
  "841230", "841231", "841232", "841233", "841234", "841235", "841236",
  "841237", "841238", "841239", "841240", "841241", "841242", "841243",
  "841501", "841502", "841503", "841504", "841505", "841506", "841507",
  "841508", "841509", "841510", "842001", "842002", "842003", "842004",
  "842005", "842006", "842007", "842008", "842009", "842010", "800001",
  "800002", "800003", "801503", "801504", "841419", "841420", "841421",
  "841422", "841423", "841424", "841425",
]);

export function checkPin(pin: string) {
  const clean = pin.trim();
  if (!/^\d{6}$/.test(clean)) {
    return { ok: false, message: "Enter a valid 6-digit PIN code." };
  }
  if (deliverablePins.has(clean)) {
    return {
      ok: true,
      message: `Yay! We deliver to ${clean} — usually in 2–4 days.`,
    };
  }
  return {
    ok: false,
    message: `PIN ${clean} is outside our current Siwan network. Try store pickup!`,
  };
}

/* ---------------- Offers ---------------- */
export const offers = [
  { code: "SIWAN100", title: "₹100 OFF", sub: "On orders above ₹999", color: RED },
  { code: "FIRST50", title: "Flat ₹50", sub: "For first-time shoppers", color: GOLD },
  { code: "FESTIVE25", title: "25% OFF", sub: "Ethnic & festive wear", color: NAVY },
];
