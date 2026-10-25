// ==========================================================================
// AUTOSHIELD MULTI-PAGE APPLICATION LOGIC
// ==========================================================================

const BASE_URL = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
  ? (window.location.pathname.includes('/autoshield') ? '/autoshield/api.php' : 'api.php')
  : 'api.php';
const WHATSAPP_NUMBER = '923072818652'; // AutoShield Support WhatsApp

// Expanded 12+ Distinct Product Catalog (Loaded from MySQL with offline fallback)
let productsData = [
  {
    id: 1,
    name: 'AutoShield Non-Woven Lightweight Cover',
    cat: 'Car Covers',
    price: 3499,
    old: 4499,
    image: 'images/fabrics/fabric_nonwoven_cover_1792064701054.jpg',
    hoverImage: 'images/fabrics/fabric_nonwoven_detail_1792064761313.jpg',
    rating: 4.9,
    reviews: 48,
    badge: 'BUDGET FRIENDLY',
    fitMake: 'Honda',
    fitModel: 'Civic',
    bodyStyle: 'Sedan',
    shortDesc: 'Lightweight and affordable indoor car cover. Protects completely against dust and light surface scratches.',
    fabricSpecs: 'Lightweight Non-Woven Spunbond Fabric + Dust & Scratch Barrier',
    waterproofRating: 'Dustproof / Light Indoor',
    uvProtection: 'Basic Garage Protection',
    guarantee: '6-Month Stitching Warranty',
    sizesAvailable: ['Small (Civic / City)', 'Medium (Corolla / Yaris)', 'Large (Accord / Sonata)', 'Custom Tailored']
  },
  {
    id: 2,
    name: 'AutoShield Silver Reflective Heat Deflector',
    cat: 'Car Covers',
    price: 5999,
    old: 7499,
    image: 'images/cover_sedan_silver.png',
    hoverImage: 'images/fabrics/fabric_silver_detail_1792065510922.jpg',
    rating: 4.8,
    reviews: 35,
    badge: 'UV HEAT SHIELD',
    fitMake: 'Toyota',
    fitModel: 'Corolla',
    bodyStyle: 'Sedan',
    shortDesc: 'High-performance solar heat reflector cover. Deflects intense sunlight and keeps interior cabin cool during peak summer heat.',
    fabricSpecs: 'Reflective Silver-Coated Aluminum Foil + High-Density Micro-Pores',
    waterproofRating: '8,500mm Hydrostatic Head',
    uvProtection: '99.5% Solar Heat & UV Reflector',
    guarantee: '2-Year UV Anti-Degradation Warranty',
    sizesAvailable: ['Medium (Corolla / Elantra)', 'Large (Camry / Accord)', 'XL (Mercedes S-Class)']
  },
  {
    id: 3,
    name: 'AutoShield Oxford Polyester (600D) Heavy Armor',
    cat: 'SUV Covers',
    price: 6499,
    old: 8499,
    image: 'images/cover_sedan_black.png',
    hoverImage: 'images/fabrics/fabric_oxford_detail_1792065033171.jpg',
    rating: 5.0,
    reviews: 62,
    badge: 'ALL-WEATHER BEAST',
    fitMake: 'Toyota',
    fitModel: 'Fortuner',
    bodyStyle: 'SUV',
    shortDesc: 'Strong and durable woven fabric with water-resistant coating. Best suited for monsoon rains and outdoor street parking.',
    fabricSpecs: '600D Heavy Duty Oxford Polyester + Hydrophobic PU Coating',
    waterproofRating: '10,000mm Rainproof Barrier',
    uvProtection: '99% Sun UV Shield',
    guarantee: '2-Year Extreme Durability Warranty',
    sizesAvailable: ['Fortuner Fit', 'Prado Fit', 'Land Cruiser / Patrol Fit']
  },
  {
    id: 4,
    name: 'AutoShield Multi-Layer Composite All-Weather Armor',
    cat: 'SUV Covers',
    price: 8499,
    old: 10999,
    image: 'images/fabrics/fabric_multilayer_cover_1792065264013.jpg',
    hoverImage: 'images/fabrics/fabric_multilayer_detail_1792065321993.jpg',
    rating: 4.9,
    reviews: 29,
    badge: 'FLAGSHIP PROTECTION',
    fitMake: 'Hyundai',
    fitModel: 'Tucson',
    bodyStyle: 'SUV',
    shortDesc: 'Multi-layer composite flagship cover engineered for optimal balance of water resistance, dust defense, and breathability.',
    fabricSpecs: '3-Layer Composite (Aluminum Film + PE Waterproof Membrane + Soft Fleece)',
    waterproofRating: '12,000mm Hydrostatic Head',
    uvProtection: '99.9% Solar Heat Reflection',
    guarantee: '3-Year All-Weather Guarantee',
    sizesAvailable: ['Crossover M (Tucson / Sportage)', 'Crossover L (Haval H6 / MG HS)']
  },
  {
    id: 5,
    name: 'AutoShield Polyester Taffeta Daily Hatchback Cover',
    cat: 'Car Covers',
    price: 4299,
    old: 5499,
    image: 'images/fabrics/fabric_taffeta_cover_1792065077696.jpg',
    hoverImage: 'images/fabrics/fabric_taffeta_detail_1792065132708.jpg',
    rating: 4.7,
    reviews: 22,
    badge: 'DAILY ESSENTIAL',
    fitMake: 'Suzuki',
    fitModel: 'Swift',
    bodyStyle: 'Hatchback',
    shortDesc: 'Lightweight and easily foldable everyday cover. The ideal choice for daily commuters and everyday office parking.',
    fabricSpecs: 'Polyester Taffeta + Fast-Folding Compact + Sunlight Deflector',
    waterproofRating: 'Water Repellent (Light Rain)',
    uvProtection: '95% Sunlight Blocker',
    guarantee: '1-Year Daily Use Warranty',
    sizesAvailable: ['Micro (Alto / Every)', 'Compact (Swift / Cultus / Vitz)', 'Hatchback (Aqua / Note)']
  },
  {
    id: 6,
    name: 'AutoShield Waterproof Ripstop Nylon Superbike Cover',
    cat: 'Bike Covers',
    price: 2999,
    old: 3999,
    image: 'images/cat_bike_cover.png',
    hoverImage: 'images/fabrics/fabric_ripstop_detail.svg',
    rating: 4.9,
    reviews: 41,
    badge: 'MILITARY TOUGH',
    fitMake: 'Yamaha',
    fitModel: 'Heavy Bike',
    bodyStyle: 'Bike',
    shortDesc: 'Lightweight and tear-resistant tactical grid construction. Resists strong windstorms and tearing during travel.',
    fabricSpecs: '210T Ripstop Nylon Tactical Grid + 10,000mm Hydrophobic PU Barrier',
    waterproofRating: '10,000mm Hydrostatic Head',
    uvProtection: '98.5% UV & Wind Shield',
    guarantee: '2-Year Anti-Tear Guarantee',
    sizesAvailable: ['Standard (70cc - 150cc)', 'Heavy Bike (250cc - 1000cc)', 'Touring Adventure Bike']
  },
  {
    id: 7,
    name: 'AutoShield Cotton / Flannel-Lined Paint Preserver Cover',
    cat: 'SUV Covers',
    price: 7499,
    old: 9499,
    image: 'images/fabrics/fabric_flannel_cover_1792065585097.jpg',
    hoverImage: 'images/fabrics/fabric_flannel_detail_1792065659011.jpg',
    rating: 4.9,
    reviews: 38,
    badge: 'PAINT PRESERVER',
    fitMake: 'Toyota',
    fitModel: 'Hilux Revo',
    bodyStyle: 'SUV',
    shortDesc: 'Ultra-soft inner flannel lining shields paint against friction and swirl marks. Ideal for garage storage and paint preservation.',
    fabricSpecs: 'Cloud-Soft White Cotton Flannel Inner Lining + Paint Scratch Guard',
    waterproofRating: 'Composite Outer / Soft Cotton Inner',
    uvProtection: '98% Garage Dust & Sun Guard',
    guarantee: '2-Year Soft-Lining Guarantee',
    sizesAvailable: ['Revo / D-Max Pickup', 'Jeep Wrangler / FJ Cruiser', 'Full Size 4x4']
  },
  {
    id: 8,
    name: 'AutoShield Microfiber Anti-Scratch Luxury Sports Cover',
    cat: 'Car Covers',
    price: 7999,
    old: 9999,
    image: 'images/fabrics/fabric_microfiber_cover_1792064890140.jpg',
    hoverImage: 'images/fabrics/fabric_microfiber_detail_1792064925457.jpg',
    rating: 5.0,
    reviews: 54,
    badge: 'PREMIUM LUXURY',
    fitMake: 'Audi',
    fitModel: 'A6',
    bodyStyle: 'Sedan',
    shortDesc: 'Silky soft texture with a smooth luxury finish. Prevents paint scratching on delicate clear-coats. Premium option for indoor protection.',
    fabricSpecs: 'Plush Velvet Microfiber Weave + Breathable Satin Luxury Finish',
    waterproofRating: 'Semi-Breathable / Indoor',
    uvProtection: '98% Indoor UV & Glare Block',
    guarantee: '2-Year Showroom Finish Warranty',
    sizesAvailable: ['Luxury Sedan (Audi A4/A6, BMW 3/5 Series)', 'Sports Coupe (Mustang, C-Class Coupe)']
  },
  {
    id: 9,
    name: 'AutoShield Anti-Theft Steel Cable & Lock Set',
    cat: 'Accessories',
    price: 1299,
    old: 1799,
    image: 'images/hero_car_cover.png',
    rating: 4.8,
    reviews: 31,
    badge: 'SECURITY',
    fitMake: 'Universal',
    fitModel: 'All Cars',
    bodyStyle: 'Accessory',
    shortDesc: 'PVC-coated heavy steel cable with brass padlock to secure your cover against theft and high wind blow-away.',
    fabricSpecs: 'Galvanized Steel Wire + Rustproof Brass Padlock + 2 Keys',
    waterproofRating: '100% Rustproof',
    uvProtection: 'N/A',
    guarantee: 'Lifetime Lock Mechanism Warranty',
    sizesAvailable: ['Universal Fit (Fits all car cover grommets)']
  },
  {
    id: 10,
    name: 'AutoShield Heavy Duty Reinforced Storage Bag',
    cat: 'Accessories',
    price: 1499,
    old: 1999,
    image: 'images/cat_suv_cover.png',
    rating: 4.7,
    reviews: 18,
    badge: 'CONVENIENCE',
    fitMake: 'Universal',
    fitModel: 'All Covers',
    bodyStyle: 'Accessory',
    shortDesc: 'Zippered carry bag for easy folding, storage, and trunk transport of your AutoShield body cover.',
    fabricSpecs: 'Waterproof Heavy Canvas + Reinforced Nylon Handles',
    waterproofRating: 'Repellent Canvas',
    uvProtection: 'N/A',
    guarantee: '1-Year Zipper Guarantee',
    sizesAvailable: ['Standard Bag (Car & Bike)', 'Extra Large Bag (SUV Covers)']
  },
  {
    id: 11,
    name: 'AutoShield Microfiber Auto Detailing Cloth Set',
    cat: 'Accessories',
    price: 999,
    old: 1499,
    image: 'images/cover_sedan_silver.png',
    rating: 4.9,
    reviews: 67,
    badge: 'CARE KIT',
    fitMake: 'Universal',
    fitModel: 'All Vehicles',
    bodyStyle: 'Accessory',
    shortDesc: 'Pack of 3 ultra-plush 800 GSM dual-sided microfiber towels for dust wiping before covering your vehicle.',
    fabricSpecs: '80% Polyester + 20% Polyamide (800 GSM Density)',
    waterproofRating: 'Super Absorbent',
    uvProtection: 'N/A',
    guarantee: '100% Scratch-Free Guarantee',
    sizesAvailable: ['40cm x 40cm (3 Pack)']
  },
  {
    id: 12,
    name: 'AutoShield Heavy Wind Lock Strap Extension',
    cat: 'Accessories',
    price: 899,
    old: 1299,
    image: 'images/cover_sedan_black.png',
    rating: 4.6,
    reviews: 14,
    badge: 'WINDPROOF',
    fitMake: 'Universal',
    fitModel: 'All Cars',
    bodyStyle: 'Accessory',
    shortDesc: 'Adjustable heavy-duty webbed buckle straps designed to secure cover ends during severe coastal or mountain storms.',
    fabricSpecs: 'High-Tensile Nylon Webbing + ABS Quick Release Clips',
    waterproofRating: 'Weatherproof Nylon',
    uvProtection: 'N/A',
    guarantee: '2-Year Clip Warranty',
    sizesAvailable: ['Universal Length (Adjustable up to 3 meters)']
  }
];

// App State
let cart = JSON.parse(localStorage.getItem('autoshield_cart')) || [];
let wishlist = JSON.parse(localStorage.getItem('autoshield_wishlist')) || [];
let currentCategory = 'all';
let currentSearch = '';
let currentSort = 'featured';

// ===== PAKISTAN COMPREHENSIVE VEHICLE DATABASE (50+ MODELS) =====
const PAKISTAN_CARS_DATABASE = [
  // --- SUZUKI ---
  { make: 'Suzuki', model: 'Alto', body: 'Hatchback', size: 'Small Hatchback (3.4m - 3.6m)', years: 'All Models (660cc, VXR, VXL, AGS & 1000cc)', desc: 'Pakistan’s #1 top-selling car. Custom mirror pockets, scratch-free cotton lining, and snug windproof elastic hem.', productId: 5 },
  { make: 'Suzuki', model: 'Cultus', body: 'Hatchback', size: 'Medium Hatchback (3.6m - 3.9m)', years: 'Old Shape (2000-2016) & New AGS / VXL (2017-2024)', desc: 'Tailored fit for both old EFI Cultus and modern 1.0L shape with antenna slot.', productId: 5 },
  { make: 'Suzuki', model: 'Wagon R', body: 'Hatchback', size: 'Tallboy Hatchback (3.6m - 3.8m)', years: 'VXR & VXL (2014-2024)', desc: 'Engineered with tall roof allowance for Wagon R cabin with front & rear buckle straps.', productId: 5 },
  { make: 'Suzuki', model: 'Swift', body: 'Hatchback', size: 'Sport Hatchback (3.8m - 4.0m)', years: 'DLX (2010-2021) & New GL / GLX (2022-2024)', desc: 'Aerodynamic sporty fit with antenna allowance and deep side mirror pockets.', productId: 5 },
  { make: 'Suzuki', model: 'Mehran', body: 'Hatchback', size: 'Small Hatchback (3.3m)', years: '1989-2019 (VX, VXR, Boss)', desc: 'Classic compact pattern engineered specifically for Suzuki Mehran with soft paint lining.', productId: 5 },
  { make: 'Suzuki', model: 'Bolan (Carry Daba)', body: 'Van', size: 'Micro Van (3.3m - 3.5m)', years: 'All Model Years', desc: 'Boxy tall roof van cover equipped with bottom wind tie-downs.', productId: 3 },
  { make: 'Suzuki', model: 'Every', body: 'Van', size: 'Kei Micro Van (3.4m)', years: 'DA64V & DA17V JDM Imports', desc: 'Precision Japanese Kei micro van fit with rear spoiler clearance.', productId: 5 },
  { make: 'Suzuki', model: 'Ravi', body: 'Pickup', size: 'Mini Truck', years: 'All Model Years', desc: 'Heavy weather protection for Suzuki pickup.', productId: 5 },
  { make: 'Suzuki', model: 'Baleno / Liana / Margalla / Khyber', body: 'Sedan', size: 'Classic Medium', years: 'Classic Generations', desc: 'Guaranteed custom dimensions for vintage and legacy Suzuki models.', productId: 1 },
  { make: 'Suzuki', model: 'Ciaz', body: 'Sedan', size: 'Standard Sedan (4.5m)', years: '2017-2020 Automatic / Manual', desc: 'Full length executive sedan cut with mirror moldings.', productId: 1 },
  { make: 'Suzuki', model: 'Jimny', body: 'SUV', size: 'Compact 4x4 (3.6m)', years: 'Sierra & New JB74', desc: 'Rugged cover with spare tire cover relief.', productId: 4 },
  { make: 'Suzuki', model: 'Hustler / Spacia / Lapin', body: 'Hatchback', size: 'Kei Small (3.4m)', years: 'JDM Imports (660cc)', desc: 'Japanese import micro car tailored cover.', productId: 5 },

  // --- TOYOTA ---
  { make: 'Toyota', model: 'Corolla', body: 'Sedan', size: 'Standard Sedan (4.6m)', years: 'GLi, XLi, Altis 1.6, Grande 1.8 (2002-2024)', desc: 'Pakistan’s most popular sedan. Precision mirror pockets, shark fin antenna relief & plush fleece interior.', productId: 1 },
  { make: 'Toyota', model: 'Yaris', body: 'Sedan', size: 'Compact Sedan (4.4m)', years: 'ATIV / ATIV X (1.3L & 1.5L)', desc: 'Tailored specifically for Indus Toyota Yaris with aerodynamic front taper and mirror covers.', productId: 1 },
  { make: 'Toyota', model: 'Corolla Cross', body: 'SUV', size: 'Crossover SUV (4.5m)', years: 'Hybrid 1.8L & Non-Hybrid', desc: 'Roof rail allowance, mirror pockets, and bottom clip strap system.', productId: 4 },
  { make: 'Toyota', model: 'Fortuner', body: 'SUV', size: 'Full-Size SUV (4.8m)', years: 'Sigma 4, 2.7G, Legender (2017-2024)', desc: 'Heavy-duty 400D composite armor engineered for Fortuner height, bull-bars & roof rails.', productId: 3 },
  { make: 'Toyota', model: 'Hilux Revo / Rocco / Vigo', body: 'Pickup', size: 'Heavy Pickup XL (5.3m)', years: 'Double Cabin 4x4 (All Years)', desc: 'Extended length full truck cover covering double cabin and rear deck.', productId: 7 },
  { make: 'Toyota', model: 'Land Cruiser / Prado', body: 'SUV', size: 'Luxury 4x4 XXL (4.9m - 5.0m)', years: 'Prado 120/150/250, LC 200, LC 300', desc: 'Supreme oversized heavy protection with maximum UV-heat deflection.', productId: 3 },
  { make: 'Toyota', model: 'Vitz / Passo', body: 'Hatchback', size: 'Medium Hatchback (3.9m - 4.1m)', years: '1.0L & 1.3L JDM Imports', desc: 'Tailored fit for imported Japanese compacts with side mirror moldings.', productId: 5 },
  { make: 'Toyota', model: 'Aqua / Prius', body: 'Hatchback', size: 'Hybrid Medium (4.0m - 4.5m)', years: 'Prius Hybrid & Aqua (1.5L)', desc: 'Aerodynamic wedge pattern with reflective silver thermal heat deflector.', productId: 2 },
  { make: 'Toyota', model: 'Premio / Allion', body: 'Sedan', size: 'Executive Sedan (4.6m)', years: '2002-2020 JDM Luxury Sedans', desc: 'Custom tailored executive fit.', productId: 1 },
  { make: 'Toyota', model: 'Mark X / Crown / Camry', body: 'Sedan', size: 'Luxury Sedan XL (4.8m - 4.9m)', years: 'All Generations', desc: 'Soft fleece interior specifically protecting luxury multi-coat paint.', productId: 8 },
  { make: 'Toyota', model: 'Raize / Rush / C-HR', body: 'SUV', size: 'Compact Crossover (4.0m - 4.4m)', years: 'All Models', desc: 'Compact crossover cover with spoiler clearance.', productId: 4 },
  { make: 'Toyota', model: 'Hiace / Grand Cabin', body: 'Van', size: 'Full-Size Van (4.7m - 5.4m)', years: 'Standard & High-Roof Grand Cabin', desc: 'Commercial heavy-duty weather guard.', productId: 3 },

  // --- HONDA ---
  { make: 'Honda', model: 'Civic', body: 'Sedan', size: 'Standard Sedan (4.6m - 4.7m)', years: 'Reborn (8th), Rebirth (9th), Turbo/Oriel (10th), RS (11th Gen)', desc: 'Laser-cut cover pattern for every Civic generation with shark fin antenna pocket and mirror molds.', productId: 1 },
  { make: 'Honda', model: 'City', body: 'Sedan', size: 'Compact Sedan (4.4m)', years: 'i-DSI, Aspire (2009-2020), New 6th Gen (2021-2024)', desc: 'Custom pattern matching City dimensions with double-stitched reinforced seams.', productId: 1 },
  { make: 'Honda', model: 'BR-V', body: 'SUV', size: 'Compact SUV / MPV (4.5m)', years: 'i-VTEC 7-Seater (2017-2024)', desc: 'Extended roof height cut for 7-seater body with roof-rail clearance.', productId: 4 },
  { make: 'Honda', model: 'HR-V / Vezel', body: 'SUV', size: 'Crossover SUV (4.3m)', years: 'Vezel Hybrid & New HR-V (VTi / VTi-S)', desc: 'Curved crossover cut with mirror pockets and belly clip lock.', productId: 4 },
  { make: 'Honda', model: 'Accord', body: 'Sedan', size: 'Executive Sedan (4.9m)', years: 'CL7, CL9, CF, CR (All Years)', desc: 'Executive luxury full-length cover.', productId: 8 },
  { make: 'Honda', model: 'CR-V / Freed', body: 'SUV', size: 'Mid-Size SUV / MPV', years: 'All Models', desc: 'All-weather composite protective cover.', productId: 4 },
  { make: 'Honda', model: 'N-One / N-Box / N-WGN', body: 'Hatchback', size: 'Kei Car Small (3.4m)', years: 'Japanese 660cc imports', desc: 'Kei car tailored fit.', productId: 5 },

  // --- HYUNDAI ---
  { make: 'Hyundai', model: 'Tucson', body: 'SUV', size: 'Crossover SUV (4.5m)', years: 'GLS / FWD / AWD (2020-2024)', desc: 'Heavy weather armor matching Tucson’s muscular body contours and roof rails.', productId: 4 },
  { make: 'Hyundai', model: 'Elantra', body: 'Sedan', size: 'Standard Sedan (4.6m)', years: 'GL 1.6L & GLS 2.0L (2021-2024)', desc: 'Aerodynamic fit with mirror pockets and soft cotton backing.', productId: 1 },
  { make: 'Hyundai', model: 'Sonata', body: 'Sedan', size: 'Luxury Sedan XL (4.9m)', years: '2.0L & 2.5L (2021-2024)', desc: 'Flagship full-size sedan cover with dual windproof buckle locks.', productId: 8 },
  { make: 'Hyundai', model: 'Santa Fe', body: 'SUV', size: 'Luxury 7-Seater SUV (4.8m)', years: 'Hybrid AWD / FWD (2023-2024)', desc: 'Oversized SUV cut with maximum outdoor sun & rain protection.', productId: 3 },
  { make: 'Hyundai', model: 'Santro', body: 'Hatchback', size: 'Small Hatchback (3.5m)', years: 'Club / Exec / Prime (2000-2014)', desc: 'Classic compact hatchback fit.', productId: 5 },
  { make: 'Hyundai', model: 'Porter H-100 / Staria', body: 'Commercial', size: 'Commercial / Luxury MPV', years: 'All Models', desc: 'Heavy-duty weather protection.', productId: 3 },

  // --- KIA ---
  { make: 'Kia', model: 'Sportage', body: 'SUV', size: 'Crossover SUV (4.5m)', years: 'Alpha, FWD, AWD, Black Edition (2019-2024)', desc: 'Pakistan’s premier crossover. Exact mirror pockets, roof rail relief, and belly buckle straps.', productId: 4 },
  { make: 'Kia', model: 'Picanto', body: 'Hatchback', size: 'Small Hatchback (3.6m)', years: '1.0L MT & AT (2019-2024)', desc: 'Snug custom fit for urban hatchback with elastic corners.', productId: 5 },
  { make: 'Kia', model: 'Stonic', body: 'SUV', size: 'Subcompact SUV (4.1m)', years: 'EX / EX+ (2021-2024)', desc: 'Compact crossover cover with double-stitched waterproof seams.', productId: 4 },
  { make: 'Kia', model: 'Sorento', body: 'SUV', size: '7-Seater Mid-Size SUV (4.8m)', years: '2.4L FWD & 3.5L V6 AWD', desc: 'Heavy multi-layer cover engineered for large family SUVs.', productId: 3 },
  { make: 'Kia', model: 'Carnival / Grand Carnival', body: 'Van', size: 'Luxury MPV (5.1m)', years: '11-Seater Grand Carnival (All Years)', desc: 'Full length executive minivan shield.', productId: 3 },

  // --- CHANGAN ---
  { make: 'Changan', model: 'Alsvin', body: 'Sedan', size: 'Compact Sedan (4.4m)', years: '1.3L Comfort, 1.5L DCT, Lumiere (2021-2024)', desc: 'Precision engineered cover tailored specifically for Changan Alsvin body lines.', productId: 1 },
  { make: 'Changan', model: 'Oshan X7', body: 'SUV', size: 'Mid-Size SUV (4.7m)', years: 'Comfort & FutureSense 7-Seater (2022-2024)', desc: 'Expansive height & width pattern for Changan Oshan X7 with roof rails.', productId: 3 },
  { make: 'Changan', model: 'Karvaan / Karvaan Plus', body: 'Van', size: 'Family MPV (4.0m)', years: 'All Models (2018-2024)', desc: 'Tall roof van fit engineered for Karvaan with side-zipper access.', productId: 3 },

  // --- MG (MORRIS GARAGES) & HAVAL ---
  { make: 'MG', model: 'MG HS', body: 'SUV', size: 'Crossover SUV (4.6m)', years: '1.5T, Excite, Essence, Trophy, PHEV (2020-2024)', desc: 'Premium velvet fleece interior lining protecting MG’s metallic lacquer paint.', productId: 4 },
  { make: 'MG', model: 'MG ZS / ZS EV', body: 'SUV', size: 'Compact SUV (4.3m)', years: 'Petrol & EV Models', desc: 'Custom crossover fit.', productId: 4 },
  { make: 'MG', model: 'MG GT', body: 'Sedan', size: 'Sport Fastback Sedan (4.7m)', years: '1.5L Turbo Fastback (2023-2024)', desc: 'Aerodynamic sport sedan fit.', productId: 1 },
  { make: 'Haval', model: 'Haval H6', body: 'SUV', size: 'Premium SUV (4.7m)', years: '1.5T, 2.0T AWD, HEV Hybrid (2021-2024)', desc: 'Heavy-duty 3-layer cover matching Haval H6 dimensions with mirror pockets.', productId: 3 },
  { make: 'Haval', model: 'Haval Jolion', body: 'SUV', size: 'Compact Crossover (4.5m)', years: '1.5T & Jolion HEV Hybrid (2021-2024)', desc: 'Tailored fit with belly clips and elastic hems.', productId: 4 },

  // --- JDM KEI CARS (DAIHATSU & NISSAN) ---
  { make: 'Daihatsu', model: 'Mira', body: 'Hatchback', size: 'Kei Small (3.4m)', years: 'ES, Custom, L275 (2007-2024)', desc: 'Japan Kei car compact fit with antenna and side mirror covers.', productId: 5 },
  { make: 'Daihatsu', model: 'Move / Move Custom', body: 'Hatchback', size: 'Kei Tallboy (3.4m)', years: 'All Generations', desc: 'Tall roof Kei hatchback tailored cover.', productId: 5 },
  { make: 'Daihatsu', model: 'Cuore', body: 'Hatchback', size: 'Small Hatchback (3.4m)', years: 'CX, CX Automatic (2000-2012)', desc: 'Classic compact fit with scratch-free lining.', productId: 5 },
  { make: 'Nissan', model: 'Dayz / Highway Star', body: 'Hatchback', size: 'Kei Small (3.4m)', years: 'All Generations (660cc)', desc: 'Kei hatchback custom fit with mirror covers.', productId: 5 },
  { make: 'Nissan', model: 'Note / Note e-Power', body: 'Hatchback', size: 'Medium Hatchback (4.1m)', years: 'Hybrid e-Power (2013-2024)', desc: 'Aerodynamic hatchback protective cover.', productId: 5 },

  // --- OTHER POPULAR BRANDS IN PAKISTAN ---
  { make: 'Proton', model: 'Saga', body: 'Sedan', size: 'Compact Sedan (4.3m)', years: 'Standard & Ace (2021-2024)', desc: 'Tailored Malaysian compact sedan pattern.', productId: 1 },
  { make: 'Proton', model: 'X70', body: 'SUV', size: 'Crossover SUV (4.5m)', years: 'Executive & Premium AWD (2020-2024)', desc: 'Heavy all-weather cover.', productId: 4 },
  { make: 'Chery', model: 'Tiggo 4 Pro / 8 Pro', body: 'SUV', size: 'SUV (4.3m - 4.7m)', years: 'Tiggo 4 & 7-Seater Tiggo 8 Pro', desc: 'Custom SUV weather shield with roof rail allowance.', productId: 3 },
  { make: 'DFSK', model: 'Glory 580 / 580 Pro', body: 'SUV', size: '7-Seater SUV (4.7m)', years: '1.5 Turbo & Pro (2020-2024)', desc: 'Large 7-seater SUV cover with roof rail clearance.', productId: 3 },
  { make: 'Prince', model: 'Prince Pearl', body: 'Hatchback', size: 'Small Hatchback (3.5m)', years: '800cc (2020-2024)', desc: 'Compact city car fit.', productId: 5 },
  { make: 'BAIC', model: 'BJ40 Plus / D20', body: 'SUV', size: 'Rugged 4x4 / Compact', years: 'Off-Road 4x4 & Sedan', desc: 'Heavy duty military-grade cover.', productId: 7 },
  { make: 'Peugeot', model: 'Peugeot 2008', body: 'SUV', size: 'European Crossover (4.3m)', years: 'Active & Allure (2022-2024)', desc: 'Tailored European compact crossover fit.', productId: 4 },
  { make: 'Mitsubishi', model: 'Pajero / Lancer / Ek Wagon', body: 'SUV', size: '4x4 & Sedans', years: 'All Generations', desc: 'Classic 4x4 and sedan weather protection.', productId: 3 },
  { make: 'Audi', model: 'A4 / A6 / e-tron / Q5 / Q7', body: 'Sedan', size: 'Luxury Executive (4.7m - 5.1m)', years: 'All Generations', desc: 'Ultra-soft fleece backing protecting high-end German ceramic paint.', productId: 8 },
  { make: 'BMW', model: '3 Series / 5 Series / X5 / X7', body: 'Sedan', size: 'Luxury Executive', years: 'All Generations', desc: 'Engineered breathable fabric.', productId: 8 },
  { make: 'Mercedes-Benz', model: 'C-Class / E-Class / S-Class / G-Wagon', body: 'Sedan', size: 'Luxury Prestige', years: 'All Generations', desc: 'Triple layer weather barrier.', productId: 8 },
  { make: 'United', model: 'Bravo / Alpha', body: 'Hatchback', size: 'Small Hatchback (3.4m - 3.6m)', years: '800cc & 1000cc', desc: 'Custom compact fit.', productId: 5 },
  { make: 'FAW', model: 'V2 / X-PV', body: 'Hatchback', size: 'Medium Hatch / Van', years: 'All Models', desc: 'Durable weather shield.', productId: 5 },
  { make: 'Isuzu', model: 'D-Max', body: 'Pickup', size: 'Heavy Pickup XL (5.3m)', years: 'Hi-Spark / V-Cross 4x4', desc: 'Full length double cabin truck cover.', productId: 7 }
];

// Full Vehicle Model Mapping for Fit Finder Dropdowns
const vehicleModels = {
  Suzuki: ['Alto (660cc/1000cc)', 'Cultus (Old/New)', 'Wagon R', 'Swift', 'Mehran', 'Bolan (Carry)', 'Every (JDM)', 'Ravi', 'Baleno', 'Liana', 'Ciaz', 'Jimny', 'Hustler'],
  Toyota: ['Corolla (GLi/Grande)', 'Yaris (ATIV)', 'Corolla Cross', 'Fortuner', 'Hilux Revo / Rocco', 'Land Cruiser / Prado', 'Aqua', 'Prius', 'Vitz', 'Passo', 'Premio', 'Mark X / Crown', 'Camry', 'Raize / C-HR', 'Hiace'],
  Honda: ['Civic (Reborn/Turbo/RS)', 'City (Aspire/New)', 'BR-V', 'HR-V', 'Vezel Hybrid', 'Accord', 'CR-V', 'N-WGN / N-One'],
  Hyundai: ['Tucson', 'Elantra', 'Sonata', 'Santa Fe', 'Santro', 'Porter H-100', 'Staria'],
  Kia: ['Sportage', 'Picanto', 'Stonic', 'Sorento', 'Grand Carnival'],
  Changan: ['Alsvin', 'Oshan X7', 'Karvaan', 'M9 Pickup'],
  MG: ['MG HS', 'MG ZS / ZS EV', 'MG GT', 'MG 4 EV'],
  Haval: ['Haval H6 (HEV)', 'Haval Jolion'],
  Daihatsu: ['Mira (ES/Custom)', 'Move', 'Cuore', 'Hijet', 'Terios Kid'],
  Nissan: ['Dayz', 'Note e-Power', 'Sunny', 'Clipper', 'Juke', 'Patrol'],
  DFSK: ['Glory 580', 'Glory 580 Pro'],
  Prince: ['Prince Pearl'],
  Proton: ['Saga', 'X70'],
  Chery: ['Tiggo 4 Pro', 'Tiggo 8 Pro'],
  BAIC: ['BJ40 Plus', 'D20'],
  Peugeot: ['Peugeot 2008'],
  Mitsubishi: ['Pajero', 'Ek Wagon', 'Lancer'],
  Audi: ['A4', 'A6', 'A8', 'e-tron', 'Q5', 'Q7'],
  BMW: ['3 Series', '5 Series', '7 Series', 'X5', 'X7'],
  'Mercedes-Benz': ['C-Class', 'E-Class', 'S-Class', 'GLC', 'G-Wagon'],
  United: ['Bravo', 'Alpha'],
  FAW: ['V2', 'X-PV'],
  Isuzu: ['D-Max V-Cross']
};


// INITIALIZATION
document.addEventListener('DOMContentLoaded', () => {
  // ===== ULTRA-FAST PAGE LOADER =====
  const loader = document.getElementById('page-loader');
  if (loader) {
    const dismissLoader = () => {
      loader.classList.add('loaded');
      setTimeout(() => {
        if (loader.parentNode) loader.style.display = 'none';
      }, 300);
    };
    // Fast fadeout after brief smooth entrance
    setTimeout(dismissLoader, 180);
    window.addEventListener('load', dismissLoader);
  }

  // ===== HEADER SCROLL EFFECT =====
  const header = document.getElementById('mainHeader');
  if (header) {
    const onScroll = () => {
      header.classList.toggle('scrolled', window.scrollY > 50);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  // ===== SCROLL REVEAL ANIMATIONS =====
  const revealEls = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
  if (revealEls.length) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

    revealEls.forEach(el => observer.observe(el));
  }

  // ===== STATS COUNTER ANIMATION =====
  const statNumbers = document.querySelectorAll('.stat-number[data-target]');
  if (statNumbers.length) {
    const counterObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const target = parseInt(el.getAttribute('data-target'), 10);
          const suffix = el.querySelector('.stat-suffix')?.outerHTML || '';
          const duration = 1800;
          const step = 16;
          const increment = target / (duration / step);
          let current = 0;
          
          const timer = setInterval(() => {
            current = Math.min(current + increment, target);
            el.innerHTML = Math.floor(current).toLocaleString('en-PK') + suffix;
            if (current >= target) clearInterval(timer);
          }, step);
          
          counterObserver.unobserve(el);
        }
      });
    }, { threshold: 0.3 });
    
    statNumbers.forEach(el => counterObserver.observe(el));
  }

  // ===== TESTIMONIALS =====
  renderTestimonials();

  updateBadges();
  renderCart();
  
  // Page specific renderers
  const path = window.location.pathname.toLowerCase();
  
  if (path.includes('shop.html')) {
    initShopPage();
  } else if (path.includes('product-detail.html')) {
    initProductDetailPage();
  } else if (path.includes('categories.html')) {
    initCategoriesPage();
  } else if (path.includes('cart.html')) {
    initCartPage();
  } else {
    // Default Home Page rendering
    renderHomeProducts();
  }

  // Sync latest products from MySQL database
  syncProductsFromBackend();

  // Render Top 8 Fabrics Showcase if on page
  renderFabricsShowcase();

  // Global Search Input
  const searchInput = document.getElementById('searchInput');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      currentSearch = e.target.value;
      if (path.includes('shop.html')) {
        renderShopGrid();
      } else {
        renderHomeProducts();
      }
    });
  }

  // ===== CART BACKDROP =====
  const backdrop = document.getElementById('cartBackdrop');
  if (backdrop) {
    backdrop.addEventListener('click', closeCartDrawer);
  }
});

// ===== DYNAMIC MYSQL PRODUCT SYNC =====
async function syncProductsFromBackend() {
  try {
    const res = await fetch(`${BASE_URL}?action=get_products`);
    if (!res.ok) return;
    const data = await res.json();
    if (data && data.status === 'success' && Array.isArray(data.products) && data.products.length > 0) {
      productsData = data.products;
      const curPath = window.location.pathname.toLowerCase();
      if (curPath.includes('shop.html')) {
        renderShopGrid();
      } else if (curPath.includes('product-detail.html')) {
        initProductDetailPage();
      } else if (!curPath.includes('cart.html') && !curPath.includes('categories.html')) {
        renderHomeProducts();
      }
    }
  } catch (err) {
    console.info('AutoShield: Operating with local catalog fallback.');
  }
}


// ==========================================================================
// TOP 8 CAR COVER FABRICS SHOWCASE — AUTOSHIELD SHOWROOM DATA & LOGIC
// ==========================================================================
const fabricsData = [
  {
    id: 'fabric-1',
    number: 1,
    name: 'Non-Woven Fabric',
    urduTitle: 'Non-Woven Fabric — Lightweight & Budget Friendly',
    category: 'indoor',
    badge: 'BUDGET FRIENDLY',
    price: 3499,
    oldPrice: 4499,
    priceRange: 'PKR 2,499 – PKR 4,500',
    bestFor: 'Indoor Garage & Light Scratch Protection',
    coverImg: 'images/fabrics/fabric_nonwoven_1.jpg',
    detailImg: 'images/fabrics/fabric_nonwoven_2.jpg',
    points: [
      'Lightweight and budget-friendly.',
      'Reliable dust and light scratch protection.',
      'Ideal for cost-effective indoor vehicle parking.'
    ],
    materials: 'Breathable spunbond polypropylene with dust-barrier micropores',
    features: ['Lightweight Spunbond', 'Dust Barrier', 'Soft Surface'],
    specs: {
      waterproof: 'Dustproof / Light Indoor',
      uvProtection: 'Basic Garage Protection',
      warranty: '6-Month Stitching Warranty',
      climateNote: 'Best for covered garages and car porches in Lahore; shields from daily dust without trapping heat.'
    }
  },
  {
    id: 'fabric-2',
    number: 2,
    name: 'Microfiber Fabric',
    urduTitle: 'Microfiber Fabric — Ultra-Soft Paint Protection',
    category: 'indoor',
    badge: 'PREMIUM LUXURY',
    price: 18500,
    oldPrice: 24500,
    priceRange: 'PKR 15,500 – PKR 32,500',
    bestFor: 'Luxury Clear-Coat Care & Anti-Swirl',
    coverImg: 'images/fabrics/fabric_microfiber_1.jpg',
    detailImg: 'images/fabrics/fabric_microfiber_2.jpg',
    points: [
      'Silky soft texture and smooth gloss finish.',
      'Helps protect clear-coat paint surfaces from scratches and swirl marks.',
      'Top-rated choice for premium indoor vehicle storage.'
    ],
    materials: 'High-grade ultra-soft micro-filaments & velvety fleece backing',
    features: ['Velvet Microfiber', 'Anti-Scratch & Anti-Swirl', 'Gentle on Clear-Coats'],
    specs: {
      waterproof: 'Semi-Breathable Luxury',
      uvProtection: '99% Indoor UV & Glare Block',
      warranty: '3-Year Showroom Finish Warranty',
      climateNote: 'Popular choice at PakWheels & SehgalMotors. Gentle on clear-coats; custom-fit for Toyota, Honda, BMW, Audi, and Kia.'
    }
  },
  {
    id: 'fabric-3',
    number: 3,
    name: 'Oxford Polyester (210D / 300D / 600D)',
    urduTitle: 'Oxford Polyester — Heavy Duty & Water-Resistant',
    category: 'outdoor',
    badge: 'ALL-WEATHER BEAST',
    price: 6499,
    oldPrice: 8499,
    priceRange: 'PKR 3,250 – PKR 7,700',
    bestFor: 'Heavy Rain, Monsoon & Rough Outdoor Parking',
    coverImg: 'images/fabrics/fabric_oxford_1.jpg',
    detailImg: 'images/fabrics/fabric_oxford_2.jpg',
    points: [
      'High-strength, durable heavy-woven fabric.',
      'Water-resistant coated for reliable outdoor weather protection.',
      'Long-lasting durability based on denier thickness and PU coating.'
    ],
    materials: 'Outer 210 GSM waterproof/dustproof PVC with a soft white inner cotton lining to prevent scratches',
    features: ['Heavy Woven Oxford', 'Hydrophobic PU Coating', 'Wind Straps & Mirror Pockets'],
    specs: {
      waterproof: '10,000mm Rainproof Barrier',
      uvProtection: '99% Sun UV Shield',
      warranty: '2-Year Extreme Durability Warranty',
      climateNote: 'Equipped with side-mirror pockets, door zipper access, and anti-wind under-car buckle straps for sudden Lahore gusts.'
    }
  },
  {
    id: 'fabric-4',
    number: 4,
    name: 'Polyester Taffeta',
    urduTitle: 'Polyester Taffeta — Lightweight Everyday Cover',
    category: 'outdoor',
    badge: 'DAILY ESSENTIAL',
    price: 4299,
    oldPrice: 5499,
    priceRange: 'PKR 2,399 – PKR 5,800',
    bestFor: 'Everyday Commuter & Quick Daily Folding',
    coverImg: 'images/fabrics/fabric_taffeta_1.jpg',
    detailImg: 'images/fabrics/fabric_taffeta_2.jpg',
    points: [
      'Lightweight and easily foldable for quick handling.',
      'Specialized surface coating shields against dust and sunlight.',
      'Most popular option for daily commute and office parking.'
    ],
    materials: 'High-density lightweight polyester taffeta with UV & dust barrier coating',
    features: ['Easy Compact Fold', 'Dust & Sun Coating', 'Smooth Trunk Storage'],
    specs: {
      waterproof: 'Water Repellent (Light Rain)',
      uvProtection: '96% Sunlight Blocker',
      warranty: '1-Year Daily Use Warranty',
      climateNote: 'Recommended for daily office cars; lightweight design enables quick single-person folding in 60 seconds.'
    }
  },
  {
    id: 'fabric-5',
    number: 5,
    name: 'Multi-Layer Fabric',
    urduTitle: 'Multi-Layer Fabric — 5-Layer Composite Weather Armor',
    category: 'outdoor',
    badge: 'FLAGSHIP PROTECTION',
    price: 8999,
    oldPrice: 11999,
    priceRange: 'PKR 6,500 – PKR 13,500',
    bestFor: 'Complete All-Weather, Water & Heat Defense',
    coverImg: 'images/fabrics/fabric_multilayer_1.jpg',
    detailImg: 'images/fabrics/fabric_multilayer_2.jpg',
    points: [
      'Engineered with 5 high-performance composite layers.',
      'Delivers optimal balance of water repellency, dust protection, and breathability.',
      'Premium choice for all-weather outdoor protection.'
    ],
    materials: '5-Layer Composite (Waterproof PE + Aluminum Thermal + Microporous Membrane + EVA + Soft Cotton Fleece)',
    features: ['5-Layer Composite Armor', 'Driver Door Zipper', 'Under-Car Buckle Straps'],
    specs: {
      waterproof: '12,000mm Hydrostatic Head',
      uvProtection: '99.9% Solar Heat Reflection',
      warranty: '3-Year All-Weather Guarantee',
      climateNote: 'Semi-breathable structure prevents morning condensation under Lahore sun; heavy wind buckles keep cover firmly locked.'
    }
  },
  {
    id: 'fabric-6',
    number: 6,
    name: 'Reflective Silver-Coated Fabric',
    urduTitle: 'Reflective Silver-Coated Fabric — Solar Heat & UV Deflector',
    category: 'uv',
    badge: 'UV HEAT SHIELD',
    price: 5999,
    oldPrice: 7499,
    priceRange: 'PKR 3,850 – PKR 7,200',
    bestFor: 'Pakistan Scorching Summer & Cabin Heat Reduction',
    coverImg: 'images/fabrics/fabric_silver_1.jpg',
    detailImg: 'images/fabrics/fabric_silver_2.jpg',
    points: [
      'Reflects intense solar rays and reduces cabin heat build-up.',
      'Highly effective in intense summer heat and sunny climates.',
      'Premium UV-resistant aluminized coating protects dashboard and interiors.'
    ],
    materials: 'Aluminized micro-foil outer layer with insulated cotton heat barrier backing',
    features: ['Aluminum Foil Coating', 'Cabin Cool (-25°C)', 'UV-Proof Reflective Seal'],
    specs: {
      waterproof: '100% Water Resistant',
      uvProtection: '99.9% Solar Heat & UV Reflector',
      warranty: '2-Year Heat Shield Guarantee',
      climateNote: 'Crucial for 45°C+ summer sun in Lahore, Multan, Faisalabad & Sindh; prevents dashboard cracking and seat leather peeling.'
    }
  },
  {
    id: 'fabric-7',
    number: 7,
    name: 'Cotton / Flannel-Lined Fabric',
    urduTitle: 'Cotton / Flannel-Lined Fabric — Ultra-Soft Anti-Scratch Inner Lining',
    category: 'indoor',
    badge: 'PAINT PRESERVER',
    price: 7499,
    oldPrice: 9499,
    priceRange: 'PKR 5,500 – PKR 11,800',
    bestFor: 'Zero Paint Rubbing & Garage Luxury Storage',
    coverImg: 'images/fabrics/fabric_flannel_1.jpg',
    detailImg: 'images/fabrics/fabric_flannel_2.jpg',
    points: [
      'Soft inner cotton flannel lining protects paint against friction and rubbing.',
      'Perfect for sheltered garages and luxury detailing preservation.',
      'Soft lining paired with protective water-resistant outer composite.'
    ],
    materials: 'Plush cloud-soft white cotton flannel lining with composite outer protective shell',
    features: ['Cloud-Soft Flannel Lining', 'Zero Clear-Coat Rubbing', 'Anti-Swirl Polish Guard'],
    specs: {
      waterproof: 'Composite Outer / Soft Cotton Inner',
      uvProtection: '98% Garage Dust & Sun Guard',
      warranty: '2-Year Soft-Lining Guarantee',
      climateNote: 'Top choice for sheltered parking & garages in Lahore where luxury ceramic coats and mirror polishes must be preserved.'
    }
  },
  {
    id: 'fabric-8',
    number: 8,
    name: 'Ripstop Nylon',
    urduTitle: 'Ripstop Nylon — Tear-Resistant & Heavy Duty',
    category: 'outdoor',
    badge: 'MILITARY TOUGH',
    price: 6999,
    oldPrice: 8999,
    priceRange: 'PKR 4,200 – PKR 8,900',
    bestFor: 'High Wind, Anti-Tear Travel & Camping',
    coverImg: 'images/fabrics/fabric_ripstop_1.png',
    detailImg: 'images/fabrics/fabric_ripstop_2.svg',
    points: [
      'Lightweight tactical crosshatched tear-resistant construction.',
      'Ideal for long-distance travel, highway parking, and outdoor exposure.',
      'Hydrophobic PU coating delivers dependable water resistance.'
    ],
    materials: '210T High-Tensile Ripstop Nylon with square reinforcement grid and PU waterproof film',
    features: ['Interlocking Grid Weave', 'High-Tensile Anti-Tear', 'Travel Compression Pouch'],
    specs: {
      waterproof: '10,000mm PU Coated',
      uvProtection: '98.5% UV & Wind Shield',
      warranty: '2-Year Anti-Tear Guarantee',
      climateNote: 'Engineered for extreme travel; crosshatched square grid stops tears from spreading during severe winds.'
    }
  }
];

let currentFabricFilter = 'all';

function renderFabricsShowcase(cat = 'all') {
  const grid = document.getElementById('fabricsGrid');
  if (!grid) return;

  const filtered = cat === 'all' 
    ? fabricsData 
    : fabricsData.filter(f => f.category === cat || (cat === 'uv' && (f.id === 'fabric-6' || f.id === 'fabric-5')));

  grid.innerHTML = filtered.map(f => {
    const pointsHTML = f.points.map(p => `
      <li>
        <span class="fabric-point-check">✔</span>
        <span>${p}</span>
      </li>
    `).join('');

    return `
      <article class="fabric-card" data-fabric-id="${f.id}" id="card-${f.id}">
        <!-- Showroom Stage: Dual-Image on Hover with Macro Detail HUD -->
        <div class="fabric-stage" onclick="toggleFabricDetail('${f.id}')" title="Hover or tap to switch between Showroom Cover and 100x Texture Detail">
          <div class="fabric-stage-top">
            <span class="fabric-pill-num">FABRIC #${f.number}</span>
            <span class="fabric-pill-badge">${f.badge}</span>
          </div>

          <div class="fabric-view-pill">
            <span>⇄</span>
            <span>Hover: Macro Detail</span>
          </div>

          <!-- Primary: Showroom Vehicle View -->
          <img class="fabric-img-main" src="${f.coverImg}" alt="${f.name} on Car" loading="lazy" decoding="async">

          <!-- Secondary: Fabric Detail Macro / Cross-section on Hover -->
          <img class="fabric-img-hover" src="${f.detailImg}" alt="${f.name} Microscopic Detail Texture" loading="lazy" decoding="async">

          <!-- Technical HUD Overlay on the Second Image (Fulfills: aus image may aus fabric ki sari details ho) -->
          <div class="fabric-stage-hud">
            <div class="hud-tag">🔬 100x Macro Texture Inspection</div>
            <div class="hud-title">${f.name}</div>
            
            <div class="hud-specs-row">
              <div class="hud-spec-chip">
                <span class="h-label">Material Structure</span>
                <span class="h-val">${f.features[0]}</span>
              </div>
              <div class="hud-spec-chip">
                <span class="h-label">Protection Level</span>
                <span class="h-val">${f.specs.waterproof}</span>
              </div>
              <div class="hud-spec-chip">
                <span class="h-label">UV Heat Shield</span>
                <span class="h-val">${f.specs.uvProtection}</span>
              </div>
              <div class="hud-spec-chip">
                <span class="h-label">Price Range</span>
                <span class="h-val">${f.priceRange}</span>
              </div>
            </div>

            <div class="hud-action-row">
              <button class="hud-order-btn" onclick="event.stopPropagation(); openFabricOrderModal('${f.id}')">
                ⚡ Order ${f.name} Now
              </button>
            </div>
          </div>
        </div>

        <!-- Card Body Details -->
        <div class="fabric-body">
          <div class="fabric-title-wrap">
            <h3 class="fabric-title">${f.number}. ${f.name}</h3>
            <div class="fabric-urdu-title">${f.urduTitle}</div>
          </div>

          <div class="fabric-bestfor-pill">
            <span>🎯 Best For:</span>
            <strong>${f.bestFor}</strong>
          </div>

          <!-- Verbatim Points from User Prompt -->
          <ul class="fabric-points">
            ${pointsHTML}
          </ul>

          <!-- Materials & Construction Specs -->
          <div class="fabric-materials-box" style="background:rgba(255,255,255,0.03); border:1px solid var(--border); border-radius:var(--radius-sm); padding:8px 10px; margin-bottom:12px; font-size:0.78rem; color:var(--text-secondary);">
            <strong style="color:#38bdf8; display:block; margin-bottom:2px;">🧵 Materials & Features:</strong>
            ${f.materials}. Includes side-mirror pockets, door zipper access & underbody wind straps.
          </div>

          <!-- Lahore Climate Suitability -->
          <div class="fabric-climate-box">
            <strong>🇵🇰 Lahore Climate Guide:</strong> ${f.specs.climateNote}
          </div>

          <!-- Footer Actions & Pricing -->
          <div class="fabric-footer">
            <div class="fabric-price-row">
              <div>
                <span class="fabric-price-val">${formatMoney(f.price)}</span>
                <span class="fabric-price-old">${formatMoney(f.oldPrice)}</span>
              </div>
              <span class="fabric-warranty-badge">🛡️ ${f.specs.warranty}</span>
            </div>

            <div class="fabric-actions">
              <button class="fabric-btn-order" onclick="openFabricOrderModal('${f.id}')" title="Order ${f.name} with custom car sizing">
                <span>⚡ Order Fabric</span>
              </button>
              <button class="fabric-btn-cart" onclick="addFabricToCart('${f.id}')" title="Add ${f.name} to Cart">
                <span>+ Cart</span>
              </button>
              <button class="fabric-btn-wa" onclick="orderFabricViaWhatsApp('${f.id}')" title="Direct WhatsApp Order for ${f.name}" aria-label="Order on WhatsApp">
                <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.66 2.59 15.36 3.45 16.86L2.05 22L7.3 20.62C8.75 21.41 10.38 21.83 12.04 21.83C17.5 21.83 21.95 17.38 21.95 11.92C21.95 9.27 20.92 6.78 19.05 4.91C17.18 3.03 14.69 2 12.04 2M12.05 3.67C14.25 3.67 16.31 4.53 17.87 6.09C19.42 7.65 20.28 9.72 20.28 11.92C20.28 16.46 16.58 20.15 12.04 20.15C10.56 20.15 9.11 19.76 7.85 19.01L7.55 18.83L4.43 19.65L5.26 16.61L5.06 16.29C4.24 14.99 3.8 13.47 3.8 11.91C3.81 7.37 7.5 3.67 12.05 3.67Z"/></svg>
              </button>
            </div>
          </div>
        </div>
      </article>
    `;
  }).join('');
}

function filterFabrics(cat, btn) {
  currentFabricFilter = cat;
  document.querySelectorAll('.fabric-tab-btn').forEach(b => b.classList.remove('active'));
  if (btn) btn.classList.add('active');
  renderFabricsShowcase(cat);
}

function toggleFabricDetail(fabricId) {
  const card = document.getElementById(`card-${fabricId}`);
  if (card) {
    card.classList.toggle('active-alt');
  }
}

// ===== QUICK FABRIC ORDER MODAL CONTROLLERS =====
function openFabricOrderModal(fabricId) {
  const f = fabricsData.find(x => x.id === fabricId) || fabricsData[0];
  const modal = document.getElementById('fabricOrderModal');
  if (!modal) return;

  const headingEl = document.getElementById('modalFabricHeading');
  const titleEl = document.getElementById('modalFabricTitle');
  const thumbEl = document.getElementById('modalFabricThumb');
  const priceEl = document.getElementById('modalFabricPrice');
  const hiddenIdEl = document.getElementById('modalSelectedFabricId');

  if (headingEl) headingEl.textContent = `Order ${f.name} Cover`;
  if (titleEl) titleEl.textContent = `${f.number}. ${f.name} — ${f.badge}`;
  if (thumbEl) thumbEl.src = f.coverImg;
  if (priceEl) priceEl.textContent = `Price: ${formatMoney(f.price)} (${f.priceRange}) • Free Nationwide Delivery`;
  if (hiddenIdEl) hiddenIdEl.value = f.id;

  // Pre-fill model if user previously searched in search bar
  const searched = document.getElementById('searchInput')?.value.trim() || document.getElementById('carDirectorySearch')?.value.trim();
  const carModelInput = document.getElementById('modalCarModel');
  if (searched && carModelInput && !carModelInput.value) {
    carModelInput.value = searched;
  }

  modal.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeFabricOrderModal(event) {
  if (event && event.target && event.target.id !== 'fabricOrderModal' && !event.target.classList.contains('modal-close-btn')) {
    return;
  }
  const modal = document.getElementById('fabricOrderModal');
  if (modal) {
    modal.classList.remove('open');
    document.body.style.overflow = '';
  }
}

function handleModalMakeChange(make) {
  const modelInput = document.getElementById('modalCarModel');
  if (!modelInput) return;
  const placeholders = {
    'Suzuki': 'e.g. Alto 660cc / Cultus / Swift / Wagon R',
    'Toyota': 'e.g. Corolla Grande / Yaris / Fortuner Sigma 4',
    'Honda': 'e.g. Civic Oriel / RS / City Aspire / BR-V',
    'Hyundai': 'e.g. Tucson / Elantra GLS / Sonata',
    'Kia': 'e.g. Sportage FWD/AWD / Picanto / Stonic',
    'Changan': 'e.g. Alsvin Lumiere / Oshan X7',
    'MG': 'e.g. MG HS / ZS EV',
    'Haval': 'e.g. Haval H6 / Jolion',
    'Audi': 'e.g. Audi A4 / A6 / Q7',
    'BMW': 'e.g. BMW 3 Series / 5 Series',
    'Mercedes-Benz': 'e.g. Mercedes C200 / E200 / S-Class'
  };
  modelInput.placeholder = placeholders[make] || 'e.g. Car Model, Generation & Year';
}

function submitFabricOrderViaWhatsApp() {
  const fabricId = document.getElementById('modalSelectedFabricId')?.value || 'fabric-3';
  const f = fabricsData.find(x => x.id === fabricId) || fabricsData[2];

  const make = document.getElementById('modalCarMake')?.value.trim() || 'Custom Vehicle';
  const model = document.getElementById('modalCarModel')?.value.trim() || 'Standard Fitment';
  const name = document.getElementById('modalCustName')?.value.trim() || 'Valued Customer';
  const phone = document.getElementById('modalCustPhone')?.value.trim() || '';
  const city = document.getElementById('modalCustCity')?.value.trim() || 'Lahore';
  const address = document.getElementById('modalCustAddress')?.value.trim() || '';
  const payment = document.getElementById('modalPayment')?.value || 'Cash on Delivery (COD)';

  const orderId = 'AS-FAB-' + Math.floor(100000 + Math.random() * 900000);
  const orderDate = new Date().toLocaleString('en-PK', { dateStyle: 'medium', timeStyle: 'short' });

  let msg = `🛡️ *NEW FABRIC ORDER — AUTOSHIELD CAR COVERS*\n`;
  msg += `━━━━━━━━━━━━━━━━━━━━━\n`;
  msg += `📋 *Order ID:* #${orderId}\n`;
  msg += `📅 *Date:* ${orderDate}\n\n`;
  msg += `🧵 *SELECTED FABRIC:* ${f.name}\n`;
  msg += `🏷️ *Fabric Tier:* #${f.number} • ${f.badge}\n`;
  msg += `✨ *Best For:* ${f.bestFor}\n`;
  msg += `💰 *Fabric Price:* ${formatMoney(f.price)} (${f.priceRange})\n`;
  msg += `🛡️ *Warranty:* ${f.specs.warranty}\n\n`;
  msg += `🚘 *VEHICLE DETAILS:*\n`;
  msg += `• *Make & Model:* ${make} ${model}\n`;
  msg += `• *City:* ${city}\n\n`;
  msg += `👤 *CUSTOMER DETAILS:*\n`;
  msg += `• *Name:* ${name}\n`;
  if (phone) msg += `• *Phone:* ${phone}\n`;
  if (address) msg += `• *Delivery Address:* ${address}\n`;
  msg += `• *Payment Method:* ${payment}\n`;
  msg += `━━━━━━━━━━━━━━━━━━━━━\n`;
  msg += `_Please confirm my custom ${f.name} cover order and share dispatch tracking._`;

  const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;
  window.open(url, '_blank', 'noopener,noreferrer');
  closeFabricOrderModal();
  showToast(`📋 Order for ${f.name} initiated on WhatsApp!`);
}

function handleFabricModalSubmit(event) {
  event.preventDefault();

  const fabricId = document.getElementById('modalSelectedFabricId')?.value || 'fabric-3';
  const f = fabricsData.find(x => x.id === fabricId) || fabricsData[2];

  const make = document.getElementById('modalCarMake')?.value.trim();
  const model = document.getElementById('modalCarModel')?.value.trim();
  const name = document.getElementById('modalCustName')?.value.trim();
  const phone = document.getElementById('modalCustPhone')?.value.trim();
  const city = document.getElementById('modalCustCity')?.value.trim();
  const address = document.getElementById('modalCustAddress')?.value.trim();
  const payment = document.getElementById('modalPayment')?.value || 'Cash on Delivery (COD)';

  if (!make || !model || !name || !phone || !city || !address) {
    showToast('⚠️ Please fill out all required fields');
    return;
  }

  const orderId = 'AS-FAB-' + Math.floor(100000 + Math.random() * 900000);
  const orderDate = new Date().toLocaleString('en-PK', { dateStyle: 'medium', timeStyle: 'short' });

  // Create order item with explicit fabric name
  const orderItem = {
    id: 300 + f.number,
    name: `AutoShield ${f.name} Cover`,
    cat: 'Fabric Custom Cover',
    fabric: f.name,
    price: f.price,
    qty: 1,
    image: f.coverImg,
    fitMake: make,
    fitModel: model
  };

  const orderData = {
    orderId,
    orderDate,
    customer: { name, phone, city, address, payment, vehicle: `${make} ${model}`, fabric: f.name },
    items: [orderItem],
    total: f.price
  };

  // Save to history
  try {
    const ordersHistory = JSON.parse(localStorage.getItem('autoshield_orders') || '[]');
    ordersHistory.unshift(orderData);
    localStorage.setItem('autoshield_orders', JSON.stringify(ordersHistory));
  } catch (err) {}

  closeFabricOrderModal();

  // Also initiate WhatsApp message for confirmation
  submitFabricOrderViaWhatsApp();
  showToast(`✅ Order Confirmed for ${f.name}!`);
}

function orderFabricViaWhatsApp(fabricId) {
  const f = fabricsData.find(x => x.id === fabricId);
  if (!f) return;
  const carName = document.getElementById('searchInput')?.value.trim() || document.getElementById('carDirectorySearch')?.value.trim() || 'My Car';
  
  let text = `Hello AutoShield Pakistan! 🛡️\n\n`;
  text += `I would like to order an *AutoShield Fabric Cover*:\n`;
  text += `━━━━━━━━━━━━━━━━━━━━━\n`;
  text += `🧵 *Selected Fabric:* #${f.number}. ${f.name}\n`;
  text += `🏷️ *Fabric Class:* ${f.badge}\n`;
  text += `💰 *Showroom Price:* ${formatMoney(f.price)} (${f.priceRange})\n`;
  text += `✨ *Best For:* ${f.bestFor}\n`;
  text += `🛡️ *Warranty:* ${f.specs.warranty}\n`;
  text += `🚘 *Car Model:* ${carName !== 'My Car' ? carName : '[Write your car make / model here]'}\n`;
  text += `━━━━━━━━━━━━━━━━━━━━━\n`;
  text += `Please confirm the exact size recommendation and delivery schedule. Thank you!`;

  const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
  window.open(url, '_blank', 'noopener,noreferrer');
}

function addFabricToCart(fabricId) {
  const f = fabricsData.find(x => x.id === fabricId);
  if (!f) return;
  const carSearched = document.getElementById('searchInput')?.value.trim() || document.getElementById('carDirectorySearch')?.value.trim() || 'Custom Tailored';
  
  const cartItem = {
    id: 300 + f.number,
    name: `AutoShield ${f.name} Cover`,
    cat: 'Fabric Custom Cover',
    fabric: f.name,
    price: f.price,
    old: f.oldPrice,
    image: f.coverImg,
    fitMake: carSearched,
    fitModel: f.name,
    qty: 1
  };
  
  const existing = cart.find(i => i.id === cartItem.id);
  if (existing) {
    existing.qty += 1;
  } else {
    cart.push(cartItem);
  }
  
  updateBadges();
  saveCart();
  renderCart();
  openCartDrawer();
  showToast(`✅ ${f.name} added to cart!`);
}


// ===== TESTIMONIALS DATA & RENDER =====
const testimonialsData = [
  { name: 'Ahmed Raza', city: 'Lahore', stars: 5, text: 'Outstanding build quality! Ordered a custom cover for my Honda Civic and received a perfectly snug fit. Protects paint from dust and scratches.' },
  { name: 'Sana Malik', city: 'Karachi', stars: 5, text: 'Delivered in just 3 days with Cash on Delivery. Both the stitching and material quality are top-notch. Highly recommended!' },
  { name: 'Muhammad Bilal', city: 'Islamabad', stars: 5, text: 'Got the heavy-duty all-weather cover for Toyota Fortuner. The car stayed completely dry during heavy rainfall. Worth every rupee!' },
  { name: 'Zainab Khan', city: 'Rawalpindi', stars: 5, text: 'Bought covers for two vehicles at home. Both fits are spot-on. The silver heat deflector significantly lowers AC cooling load!' },
  { name: 'Ali Hassan', city: 'Multan', stars: 4, text: 'Great cover quality and snug fit. Packaging was very secure and WhatsApp support provided immediate guidance.' },
  { name: 'Farhan Sheikh', city: 'Faisalabad', stars: 5, text: 'Previously bought a local cover that degraded in 2 months. Using AutoShield for over 6 months now and it still looks brand new.' },
  { name: 'Hira Baig', city: 'Peshawar', stars: 5, text: 'Purchased for Suzuki Alto. Snug tailored fit. Protects against scorching sunlight and keeps the cabin cool. Very happy with it!' },
  { name: 'Omar Siddiqui', city: 'Quetta', stars: 5, text: 'Fast delivery time and excellent product finish. The soft inner lining preserves clear-coat wax and polish. 5 stars!' },
  { name: 'Nadia Iqbal', city: 'Lahore', stars: 5, text: 'Ordered for Corolla Cross. Looks very sleek and professional; fabric is thick, durable and premium. Truly satisfied.' },
  { name: 'Tariq Mehmood', city: 'Sialkot', stars: 4, text: 'Selected the SUV size cover for Kia Sportage. Fitment is precise and water repellency performs brilliantly. Will definitely order again!' },
];

function renderTestimonials() {
  const track = document.getElementById('testimonialsTrack');
  if (!track) return;

  // Duplicate for infinite scroll effect
  const allCards = [...testimonialsData, ...testimonialsData];
  track.innerHTML = allCards.map(t => {
    const initials = t.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
    const stars = '★'.repeat(t.stars) + '☆'.repeat(5 - t.stars);
    return `
      <div class="testimonial-card">
        <div class="testimonial-stars">${stars}</div>
        <p class="testimonial-text">"${t.text}"</p>
        <div class="testimonial-author">
          <div class="testimonial-avatar">${initials}</div>
          <div>
            <div class="testimonial-name">${t.name}</div>
            <div class="testimonial-city">📍 ${t.city}</div>
          </div>
        </div>
      </div>
    `;
  }).join('');
}

// ===== RENDER HOME PAGE BESTSELLERS =====
function renderHomeProducts() {
  const grid = document.getElementById('productGrid');
  if (grid) {
    const featured = productsData.slice(0, 8); // Top 8 featured products
    grid.innerHTML = featured.map(p => createProductCardHTML(p)).join('');
    
    // Animate product cards on load with instant snappiness
    requestAnimationFrame(() => {
      grid.querySelectorAll('.product-card').forEach((card, i) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(12px)';
        setTimeout(() => {
          card.style.transition = 'opacity 0.28s ease, transform 0.28s ease';
          card.style.opacity = '1';
          card.style.transform = 'translateY(0)';
        }, i * 35);
      });
    });
  }

  // Render Pakistan Car Directory if present
  if (document.getElementById('carDirectoryGrid')) {
    renderPakistanCarDirectory('all', '');
  }
}

// ===== SHOP PAGE LOGIC =====
function initShopPage() {
  const sortSelect = document.getElementById('sortSelect');
  if (sortSelect) {
    sortSelect.addEventListener('change', (e) => {
      currentSort = e.target.value;
      renderShopGrid();
    });
  }

  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentCategory = btn.getAttribute('data-cat') || 'all';
      renderShopGrid();
    });
  });

  renderShopGrid();
}

function renderShopGrid() {
  const grid = document.getElementById('shopProductGrid');
  if (!grid) return;

  let filtered = [...productsData];

  if (currentCategory !== 'all') {
    filtered = filtered.filter(p => p.cat === currentCategory);
  }

  if (currentSearch.trim()) {
    const q = currentSearch.toLowerCase();
    filtered = filtered.filter(p => p.name.toLowerCase().includes(q) || p.cat.toLowerCase().includes(q) || (p.fitModel && p.fitModel.toLowerCase().includes(q)));
  }

  if (currentSort === 'price-low') {
    filtered.sort((a, b) => a.price - b.price);
  } else if (currentSort === 'price-high') {
    filtered.sort((a, b) => b.price - a.price);
  } else if (currentSort === 'rating') {
    filtered.sort((a, b) => b.rating - a.rating);
  }

  const countEl = document.getElementById('productCountLabel');
  if (countEl) countEl.textContent = `Showing ${filtered.length} products`;

  if (filtered.length === 0) {
    grid.innerHTML = `
      <div style="grid-column: 1 / -1; text-align: center; padding: 48px; color: var(--text-muted);">
        <div style="font-size: 3rem; margin-bottom: 12px;">🔍</div>
        <h3>No covers match your search</h3>
        <p>Try searching for a different car model or category.</p>
        <button class="btn btn-outline btn-sm" onclick="resetFilters()" style="margin-top:16px">Reset Filters</button>
      </div>
    `;
    return;
  }

  grid.innerHTML = filtered.map(p => createProductCardHTML(p)).join('');
}

// ===== PRODUCT CARD HTML GENERATOR (ULTRA-ATTRACTIVE LUXURY EDITION) =====
function switchCardColor(event, cardId, imgUrl) {
  if (event) event.stopPropagation();
  const card = document.querySelector(`.decent-card[data-id="${cardId}"]`);
  if (!card) return;
  const img = card.querySelector('.decent-img');
  if (img && imgUrl) {
    img.style.opacity = '0.35';
    img.style.transform = 'scale(0.97)';
    setTimeout(() => {
      img.src = imgUrl;
      img.style.opacity = '1';
      img.style.transform = '';
    }, 120);
  }
  const swatches = card.querySelectorAll('.swatch-dot');
  swatches.forEach(s => s.classList.remove('active'));
  if (event && event.currentTarget) {
    event.currentTarget.classList.add('active');
  }
}

function createProductCardHTML(p) {
  const discount = p.old && p.price ? Math.round((1 - p.price / p.old) * 100) : 0;
  const isWishlisted = wishlist.includes(p.id);
  const vehicle = getVehicleName(p);
  const ratingScore = p.rating ? p.rating.toFixed(1) : '4.9';

  const isBike = p.cat === 'Bike Covers' || (p.body_style && p.body_style.toLowerCase() === 'motorcycle');
  const isSUV = p.cat === 'SUV Covers' || (p.body_style && p.body_style.toLowerCase() === 'suv');
  const blackImg = isBike ? 'images/covers/motorcycle_ripstop_pro.jpg' : (isSUV ? 'images/covers/fortuner_armor_suv.jpg' : 'images/covers/civic_velvet_bespoke.jpg');
  const silverImg = isBike ? 'images/covers/motorcycle_ripstop_pro.jpg' : (isSUV ? 'images/covers/prado_landcruiser_armor.jpg' : 'images/covers/corolla_silver_shield.jpg');
  const redImg = 'images/covers/hero_luxury_bespoke.jpg';

  const chips = isBike 
    ? `<div class="decent-chips">
        <span class="decent-chip"><span class="chip-icon">💧</span>Rainproof</span>
        <span class="decent-chip"><span class="chip-icon">🔥</span>Heat Guard</span>
        <span class="decent-chip"><span class="chip-icon">🔒</span>Lock Ready</span>
      </div>`
    : (p.cat === 'Accessories'
      ? `<div class="decent-chips">
          <span class="decent-chip"><span class="chip-icon">🛡️</span>Anti-Theft</span>
          <span class="decent-chip"><span class="chip-icon">⚡</span>Heavy Duty</span>
          <span class="decent-chip"><span class="chip-icon">⭐</span>Original</span>
        </div>`
      : `<div class="decent-chips">
          <span class="decent-chip"><span class="chip-icon">💧</span>Waterproof</span>
          <span class="decent-chip"><span class="chip-icon">🛡️</span>Anti-Scratch</span>
          <span class="decent-chip"><span class="chip-icon">☀️</span>UV Shield</span>
        </div>`);

  return `
    <article class="decent-card" data-id="${p.id}">
      <!-- Visual Showcase Stage -->
      <div class="decent-thumb" onclick="navigateToDetail(${p.id})">
        <!-- Floating Discount / Status Badge -->
        ${discount > 0 ? `
          <span class="decent-badge">
            <span class="badge-spark">🔥</span>-${discount}%
          </span>` : (p.badge ? `<span class="decent-badge">${p.badge}</span>` : '')}
        
        <!-- Wishlist Heart Trigger -->
        <button class="decent-wishlist ${isWishlisted ? 'active' : ''}" 
                onclick="event.stopPropagation(); toggleWishlist(${p.id})" 
                title="${isWishlisted ? 'Remove from Wishlist' : 'Add to Wishlist'}"
                aria-label="Wishlist">
          <span>${isWishlisted ? '♥' : '♡'}</span>
        </button>

        <!-- Studio Light Beams & Pedestal -->
        <div class="decent-spotlight"></div>
        <div class="decent-pedestal"></div>
        
        <!-- Car Cover Dual Image: Main View + Hover Texture -->
        <img class="decent-img decent-img-main" src="${p.image}" alt="${p.name}" loading="lazy" decoding="async">
        <img class="decent-img decent-img-hover" src="${p.hoverImage || p.image}" alt="${p.name} Texture Detail" loading="lazy" decoding="async">
        
        <!-- Hover Hint Tag -->
        <span class="decent-hover-pill">
          <span class="pill-flip">🔄</span>
          <span class="pill-lbl">Hover: Texture</span>
        </span>

        <!-- Floating Quick View Pill -->
        <span class="decent-quickview">Quick View →</span>
      </div>

      <!-- Clean Info Body -->
      <div class="decent-body">
        <!-- Vehicle Subtitle & Interactive Swatches -->
        <div class="decent-sub-row">
          <span class="decent-fit-badge">
            <span class="fit-dot"></span>
            <span>${vehicle !== 'Universal' ? `Fits ${vehicle}` : p.cat}</span>
          </span>
          <div class="decent-swatches" title="Switch finish preview">
            <span class="swatch-dot swatch-black active" title="Stealth Black" onclick="switchCardColor(event, ${p.id}, '${blackImg}')"></span>
            <span class="swatch-dot swatch-silver" title="Silver Heat Deflector" onclick="switchCardColor(event, ${p.id}, '${silverImg}')"></span>
            <span class="swatch-dot swatch-red" title="Crimson Sport" onclick="switchCardColor(event, ${p.id}, '${redImg}')"></span>
          </div>
        </div>
        
        <!-- Title -->
        <h3 class="decent-title" onclick="navigateToDetail(${p.id})" title="${p.name}">
          ${p.name}
        </h3>

        <!-- Sleek Feature Micro-Chips (Zero Wall of Text) -->
        ${chips}

        <!-- Price & Trust Rating Row -->
        <div class="decent-meta">
          <div class="decent-price-group">
            <span class="decent-price">${formatMoney(p.price)}</span>
            ${p.old ? `<span class="decent-old">${formatMoney(p.old)}</span>` : ''}
          </div>
          <div class="decent-rating-box">
            <span class="rating-pill">★ ${ratingScore}</span>
          </div>
        </div>

        <!-- Action Row -->
        <div class="decent-actions">
          <button class="decent-btn-cart" onclick="addToCart(${p.id})">
            <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12.9-1.63h7.45c.75 0 1.41-.41 1.75-1.03l3.58-6.49c.08-.14.12-.31.12-.48 0-.55-.45-1-1-1H5.21l-.94-2H1zm16 16c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z"/></svg>
            <span>Add to Cart</span>
          </button>
          <button class="decent-btn-wa" onclick="orderViaWhatsApp(${p.id})" title="Order directly on WhatsApp" aria-label="Order on WhatsApp">
            <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.66 2.59 15.36 3.45 16.86L2.05 22L7.3 20.62C8.75 21.41 10.38 21.83 12.04 21.83C17.5 21.83 21.95 17.38 21.95 11.92C21.95 9.27 20.92 6.78 19.05 4.91C17.18 3.03 14.69 2 12.04 2M12.05 3.67C14.25 3.67 16.31 4.53 17.87 6.09C19.42 7.65 20.28 9.72 20.28 11.92C20.28 16.46 16.58 20.15 12.04 20.15C10.56 20.15 9.11 19.76 7.85 19.01L7.55 18.83L4.43 19.65L5.26 16.61L5.06 16.29C4.24 14.99 3.8 13.47 3.8 11.91C3.81 7.37 7.5 3.67 12.05 3.67Z"/></svg>
          </button>
        </div>
      </div>
    </article>
  `;
}

function getVehicleName(item) {
  return [item.fitMake, item.fitModel].filter(Boolean).join(' ') || 'Universal';
}

// ===== PRODUCT DETAILS PAGE BINDER =====
function initProductDetailPage() {
  const params = new URLSearchParams(window.location.search);
  const id = Number(params.get('id')) || 1;
  const p = productsData.find(item => item.id === id) || productsData[0];

  document.title = `${p.name} — AutoShield Car Top Covers`;

  // Populate UI
  const imgEl = document.getElementById('detailImage');
  const titleEl = document.getElementById('detailTitle');
  const catEl = document.getElementById('detailCat');
  const fitEl = document.getElementById('detailFit');
  const priceEl = document.getElementById('detailPrice');
  const oldPriceEl = document.getElementById('detailOldPrice');
  const descEl = document.getElementById('detailDesc');
  const fabEl = document.getElementById('detailFabSpecs');
  const waterEl = document.getElementById('detailWater');
  const uvEl = document.getElementById('detailUv');
  const warrantyEl = document.getElementById('detailWarranty');
  const sizeSelect = document.getElementById('detailSizeSelect');

  if (imgEl) imgEl.src = p.image;
  if (titleEl) titleEl.textContent = p.name;
  if (catEl) catEl.textContent = p.cat;
  if (fitEl) fitEl.textContent = `Fits: ${getVehicleName(p)}`;
  if (priceEl) priceEl.textContent = formatMoney(p.price);
  if (oldPriceEl) oldPriceEl.textContent = formatMoney(p.old);
  if (descEl) descEl.textContent = p.shortDesc;
  if (fabEl) fabEl.textContent = p.fabricSpecs;
  if (waterEl) waterEl.textContent = p.waterproofRating;
  if (uvEl) uvEl.textContent = p.uvProtection;
  if (warrantyEl) warrantyEl.textContent = p.guarantee;

  if (sizeSelect && p.sizesAvailable) {
    sizeSelect.innerHTML = p.sizesAvailable.map(s => `<option value="${s}">${s}</option>`).join('');
  }

  // Setup Actions
  const addBtn = document.getElementById('detailAddToCartBtn');
  if (addBtn) addBtn.onclick = () => addToCart(p.id);

  const waBtn = document.getElementById('detailWhatsAppBtn');
  if (waBtn) waBtn.onclick = () => orderViaWhatsApp(p.id);
}

function navigateToDetail(id) {
  window.location.href = `product-detail.html?id=${id}`;
}

// ===== FIT FINDER & PAKISTAN VEHICLE DIRECTORY LOGIC =====
let currentCarBrandFilter = 'all';

function updateFitModels() {
  const makeSelect = document.getElementById('fitMake');
  const modelSelect = document.getElementById('fitModel');
  if (!makeSelect || !modelSelect) return;

  const selectedMake = makeSelect.value;
  modelSelect.innerHTML = '<option value="">2. Select Model</option>';

  if (selectedMake && vehicleModels[selectedMake]) {
    vehicleModels[selectedMake].forEach(m => {
      modelSelect.innerHTML += `<option value="${m}">${m}</option>`;
    });
  }
}

function searchFitCover() {
  const make = document.getElementById('fitMake')?.value;
  const model = document.getElementById('fitModel')?.value;

  if (!make && !model) {
    showToast('Please select a Make and Model first!');
    return;
  }

  const directorySection = document.getElementById('pakistan-cars');
  if (directorySection) {
    directorySection.scrollIntoView({ behavior: 'smooth' });
    const searchInput = document.getElementById('carDirectorySearch');
    if (searchInput) {
      searchInput.value = model || make;
      handleCarSearch(model || make);
    }
  } else {
    window.location.href = `shop.html?search=${encodeURIComponent(model || make)}`;
  }
}

function filterCarsByBrand(brand) {
  currentCarBrandFilter = brand;
  document.querySelectorAll('.car-chip').forEach(chip => {
    chip.classList.toggle('active', chip.textContent.trim().toLowerCase() === brand.toLowerCase() || (brand === 'all' && chip.textContent.includes('All')));
  });
  const searchInput = document.getElementById('carDirectorySearch');
  renderPakistanCarDirectory(currentCarBrandFilter, searchInput ? searchInput.value : '');
}

function syncCarDirectoryVisibility(query = '') {
  const chips = document.getElementById('carFilterChips');
  const container = document.getElementById('carDirectoryGrid');
  const hasSearch = (query || '').trim().length > 0;

  if (chips) {
    chips.style.display = hasSearch ? '' : 'none';
  }

  if (!hasSearch && container) {
    container.innerHTML = '';
  }
}

function handleCarSearch(query) {
  syncCarDirectoryVisibility(query);
  renderPakistanCarDirectory(currentCarBrandFilter, query);
}

function renderPakistanCarDirectory(brand = 'all', query = '') {
  const container = document.getElementById('carDirectoryGrid');
  if (!container) return;

  const q = (query || '').toLowerCase().trim();
  if (!q) {
    syncCarDirectoryVisibility(q);
    container.innerHTML = '';
    return;
  }

  let list = PAKISTAN_CARS_DATABASE;

  if (brand && brand !== 'all') {
    if (brand === 'Japanese Kei') {
      list = list.filter(c => c.size.toLowerCase().includes('kei') || ['Mira', 'Move', 'Dayz / Highway Star', 'Every', 'Hustler / Spacia / Lapin', 'Cuore'].includes(c.model));
    } else if (brand === 'Luxury') {
      list = list.filter(c => ['Audi', 'BMW', 'Mercedes-Benz'].includes(c.make));
    } else if (brand === 'MG') {
      list = list.filter(c => c.make === 'MG' || c.make === 'Haval');
    } else {
      list = list.filter(c => c.make.toLowerCase() === brand.toLowerCase());
    }
  }

  if (q) {
    list = list.filter(c => 
      c.make.toLowerCase().includes(q) ||
      c.model.toLowerCase().includes(q) ||
      c.body.toLowerCase().includes(q) ||
      c.size.toLowerCase().includes(q) ||
      c.desc.toLowerCase().includes(q)
    );
  }

  if (list.length === 0) {
    container.innerHTML = `
      <div style="grid-column: 1 / -1; text-align: center; padding: 48px; color: var(--text-muted); background:var(--card-bg); border-radius:var(--radius-lg); border:1px solid var(--border);">
        <div style="font-size: 3rem; margin-bottom: 12px;">🚗</div>
        <h3>No car found matching "${query}"</h3>
        <p style="margin-bottom:16px;">Don't worry! We can tailor-stitch a custom cover for any vehicle in Pakistan.</p>
        <button class="btn btn-whatsapp" onclick="orderViaWhatsApp()">💬 Contact on WhatsApp for Custom Fit</button>
      </div>
    `;
    return;
  }

  container.innerHTML = list.map(car => `
    <div class="car-card">
      <div class="car-card-header">
        <div>
          <span class="car-brand-pill">${car.make}</span>
          <div class="car-model-title">${car.model}</div>
        </div>
        <span class="car-body-badge">${car.body}</span>
      </div>

      <div class="car-years-label">📅 ${car.years}</div>

      <div class="car-size-box">
        <strong>Guaranteed Fit:</strong> ${car.size}
      </div>

      <p class="car-features-list">
        🛡️ ${car.desc}
      </p>

      <div class="car-actions-row">
        <button type="button" class="btn btn-whatsapp" onclick="orderCustomCarCoverViaWhatsApp('${car.make.replace(/'/g, "\\'")}', '${car.model.replace(/'/g, "\\'")}', '${car.size.replace(/'/g, "\\'")}', '${car.body.replace(/'/g, "\\'")}')">
          💬 WhatsApp Fit
        </button>
        <a href="product-detail.html?id=${car.productId || 1}" class="btn btn-primary">
          🛒 View Cover
        </a>
      </div>
    </div>
  `).join('');
}

function orderCustomCarCoverViaWhatsApp(make, model, size, body) {
  let msg = `🛡️ *AUTOSHIELD CUSTOM FIT CAR COVER INQUIRY*\n`;
  msg += `━━━━━━━━━━━━━━━━━━━━━\n`;
  msg += `🚗 *Car Make:* ${make}\n`;
  msg += `🚘 *Car Model:* ${model}\n`;
  msg += `📐 *Body Style:* ${body}\n`;
  msg += `📏 *Recommended Cover Size:* ${size}\n`;
  msg += `━━━━━━━━━━━━━━━━━━━━━\n`;
  msg += `Hello AutoShield! I need a guaranteed custom-fit protective cover for my ${make} ${model}. Please confirm availability, price and cash on delivery.\n`;

  const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;
  window.open(url, '_blank');
}

function handleCarSelectChange(selectEl) {
  const val = selectEl.value;
  const notesEl = document.getElementById('custNotes');
  if (notesEl && val) {
    if (notesEl.value) {
      notesEl.value = `Vehicle: ${val} | ` + notesEl.value.replace(/^Vehicle:\s*[^|]+\|\s*/, '');
    } else {
      notesEl.value = `Vehicle: ${val}`;
    }
    showToast(`🚗 Selected: ${val}`);
  }
}

function initCategoriesPage() {
  syncCarDirectoryVisibility('');
  renderPakistanCarDirectory('all', '');
}


// ===== CART & WISHLIST MANAGERS =====
function addToCart(id) {
  const item = productsData.find(p => p.id === id);
  if (!item) return;

  const existing = cart.find(c => c.id === id);
  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({ ...item, qty: 1 });
  }

  saveCart();
  updateBadges();
  renderCart();
  openCartDrawer();
  showToast(`Added ${item.name} to Cart! 🛒`);
}

function updateCartQty(id, delta) {
  const item = cart.find(c => c.id === id);
  if (!item) return;

  item.qty += delta;
  if (item.qty <= 0) {
    cart = cart.filter(c => c.id !== id);
  }
  saveCart();
  updateBadges();
  renderCart();
  if (window.location.pathname.includes('cart.html')) initCartPage();
}

function removeFromCart(id) {
  cart = cart.filter(c => c.id !== id);
  saveCart();
  updateBadges();
  renderCart();
  if (window.location.pathname.includes('cart.html')) initCartPage();
  showToast('Item removed from cart');
}

function renderCart() {
  const container = document.getElementById('cartItems');
  const subtotalEl = document.getElementById('cartSubtotal');
  if (!container || !subtotalEl) return;

  if (cart.length === 0) {
    container.innerHTML = `
      <div style="text-align:center; padding: 48px 0; color: var(--text-muted);">
        <div style="font-size: 3rem; margin-bottom: 12px;">🛒</div>
        <p>Your cart is empty.</p>
        <a href="shop.html" class="btn btn-outline btn-sm" style="margin-top:16px; display:inline-block;">Explore Catalogue</a>
      </div>
    `;
    subtotalEl.textContent = formatMoney(0);
    return;
  }

  let total = 0;
  container.innerHTML = cart.map(item => {
    const itemTotal = item.price * item.qty;
    total += itemTotal;

    return `
      <div class="cart-item">
        <img src="${item.image}" alt="${item.name}" style="width: 60px; height: 60px; object-fit: cover; border-radius: 8px;">
        <div style="flex:1;">
          <div class="cart-item-title">${item.name}</div>
          ${item.fabric ? `<div class="cart-item-fabric" style="font-size:0.76rem; color:#38bdf8; font-weight:700; margin-top:1px;">🧵 Fabric: ${item.fabric}</div>` : ''}
          <div class="cart-item-fit">Fits: ${getVehicleName(item)}</div>
          <div class="cart-item-price">${formatMoney(item.price)}</div>
          <div style="display:flex; align-items:center; gap:8px; margin-top:8px;">
            <button onclick="updateCartQty(${item.id}, -1)" style="background:var(--dark-bg); color:#fff; width:24px; height:24px; border-radius:4px; border:1px solid var(--border);">-</button>
            <span style="font-weight:700; font-size:0.9rem;">${item.qty}</span>
            <button onclick="updateCartQty(${item.id}, 1)" style="background:var(--dark-bg); color:#fff; width:24px; height:24px; border-radius:4px; border:1px solid var(--border);">+</button>
            <button onclick="removeFromCart(${item.id})" style="margin-left:auto; color:var(--red); font-size:0.8rem;">Remove</button>
          </div>
        </div>
      </div>
    `;
  }).join('');

  subtotalEl.textContent = formatMoney(total);
}

function initCartPage() {
  const tableContainer = document.getElementById('cartPageItems');
  const subtotalEl = document.getElementById('cartPageSubtotal');
  const grandTotalEl = document.getElementById('cartPageGrandTotal');

  if (!tableContainer) return;

  if (cart.length === 0) {
    tableContainer.innerHTML = `
      <div style="text-align:center; padding: 64px 0; color: var(--text-muted);">
        <div style="font-size: 3.5rem; margin-bottom: 16px;">🛒</div>
        <h2>Your Cart is Currently Empty</h2>
        <p style="margin-bottom: 24px;">Add protective covers for your car to proceed with checkout.</p>
        <a href="shop.html" class="btn btn-primary">Browse Catalogue →</a>
      </div>
    `;
    if (subtotalEl) subtotalEl.textContent = formatMoney(0);
    if (grandTotalEl) grandTotalEl.textContent = formatMoney(0);
    return;
  }

  let total = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);

  tableContainer.innerHTML = `
    <table class="cart-table">
      <thead>
        <tr>
          <th>Product</th>
          <th>Price</th>
          <th>Quantity</th>
          <th>Total</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        ${cart.map(item => `
          <tr>
            <td style="display:flex; align-items:center; gap:16px;">
              <img src="${item.image}" alt="${item.name}" style="width: 70px; height: 70px; object-fit: cover; border-radius: 8px;">
              <div>
                <strong>${item.name}</strong>
                ${item.fabric ? `<div style="font-size:0.8rem; color:#38bdf8; font-weight:700; margin-top:2px;">🧵 Fabric: ${item.fabric}</div>` : ''}
                <div class="cart-item-fit">Fits: ${getVehicleName(item)}</div>
                <div style="font-size:0.8rem; color:var(--text-muted);">${item.cat}</div>
              </div>
            </td>
            <td><strong>${formatMoney(item.price)}</strong></td>
            <td>
              <div style="display:flex; align-items:center; gap:8px;">
                <button onclick="updateCartQty(${item.id}, -1)" style="padding:4px 10px; background:var(--card-bg); color:#fff; border:1px solid var(--border); border-radius:4px;">-</button>
                <span>${item.qty}</span>
                <button onclick="updateCartQty(${item.id}, 1)" style="padding:4px 10px; background:var(--card-bg); color:#fff; border:1px solid var(--border); border-radius:4px;">+</button>
              </div>
            </td>
            <td><strong style="color:var(--red);">${formatMoney(item.price * item.qty)}</strong></td>
            <td><button onclick="removeFromCart(${item.id})" style="color:var(--red); border:0; background:none;">Remove</button></td>
          </tr>
        `).join('')}
      </tbody>
    </table>
  `;

  if (subtotalEl) subtotalEl.textContent = formatMoney(total);
  if (grandTotalEl) grandTotalEl.textContent = formatMoney(total);

  // Populate Pakistan Car Quick Selector in checkout form
  const carSelect = document.getElementById('custCarSelect');
  if (carSelect && carSelect.options.length <= 1) {
    PAKISTAN_CARS_DATABASE.forEach(c => {
      const opt = document.createElement('option');
      opt.value = `${c.make} ${c.model} (${c.size})`;
      opt.textContent = `${c.make} ${c.model} — ${c.body} (${c.size})`;
      carSelect.appendChild(opt);
    });
  }
}

function toggleWishlist(id) {
  const idx = wishlist.indexOf(id);
  if (idx > -1) {
    wishlist.splice(idx, 1);
    showToast('Removed from Wishlist');
  } else {
    wishlist.push(id);
    showToast('Added to Wishlist ♥');
  }
  saveCart();
  localStorage.setItem('autoshield_wishlist', JSON.stringify(wishlist));
  updateBadges();
  if (window.location.pathname.includes('shop.html')) renderShopGrid();
  else renderHomeProducts();
}

function saveCart() {
  localStorage.setItem('autoshield_cart', JSON.stringify(cart));
}

function updateBadges() {
  const cartBadge = document.getElementById('cartCount');
  const wishBadge = document.getElementById('wishCount');

  const totalCartCount = cart.reduce((sum, item) => sum + item.qty, 0);

  if (cartBadge) {
    cartBadge.textContent = totalCartCount;
    cartBadge.classList.add('bump');
    setTimeout(() => cartBadge.classList.remove('bump'), 350);
  }
  if (wishBadge) wishBadge.textContent = wishlist.length;
}

function openCartDrawer() {
  const drawer = document.getElementById('cartDrawer');
  const backdrop = document.getElementById('cartBackdrop');
  if (drawer) drawer.classList.add('open');
  if (backdrop) backdrop.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeCartDrawer() {
  const drawer = document.getElementById('cartDrawer');
  const backdrop = document.getElementById('cartBackdrop');
  if (drawer) drawer.classList.remove('open');
  if (backdrop) backdrop.classList.remove('open');
  document.body.style.overflow = '';
}

// ===== WHATSAPP ORDER & CONFIRMATION SYSTEM =====
let lastOrderData = null;

function formatWhatsAppPhone(phone) {
  if (!phone) return '';
  let clean = phone.replace(/[^0-9]/g, '');
  if (clean.startsWith('0')) {
    clean = '92' + clean.slice(1);
  } else if (!clean.startsWith('92') && clean.length === 10) {
    clean = '92' + clean;
  }
  return clean;
}

function ensureOrderModalExists() {
  let modal = document.getElementById('orderConfirmModal');
  if (!modal) {
    modal = document.createElement('div');
    modal.className = 'modal-backdrop';
    modal.id = 'orderConfirmModal';
    modal.innerHTML = `
      <div class="order-modal">
        <div class="order-modal-header">
          <div class="order-success-icon">✓</div>
          <h2 style="font-size:1.6rem; margin-bottom:4px;">Order Confirmed! 🎉</h2>
          <p style="color:var(--text-secondary); font-size:0.9rem;">Thank you! Your AutoShield order has been received.</p>
          <div class="order-id-badge" id="modalOrderNumber">#AS-000000</div>
        </div>
        <div class="order-receipt-card" id="modalReceiptContent"></div>
        <div class="order-actions-stack">
          <a href="#" id="modalStoreWaBtn" target="_blank" class="btn btn-whatsapp btn-full" style="text-decoration:none; display:flex; align-items:center; justify-content:center; gap:8px;">
            💬 Open WhatsApp to Send Order to Store
          </a>
          <a href="#" id="modalCustomerWaBtn" target="_blank" class="btn btn-secondary-action btn-full" style="text-decoration:none;">
            📲 Send Confirmation to Customer WhatsApp
          </a>
          <button type="button" class="btn-secondary-action btn-full" onclick="copyOrderSummary()">
            📋 Copy Order Details to Clipboard
          </button>
          <button type="button" class="btn btn-outline btn-full" onclick="closeOrderModal()" style="margin-top:4px;">
            Continue Shopping
          </button>
        </div>
        <p class="whatsapp-notice">
          🔒 An automated text summary has been generated for WhatsApp. You can review and send it anytime.
        </p>
      </div>
    `;
    document.body.appendChild(modal);
  }
  return modal;
}

function showOrderConfirmationModal(orderData) {
  lastOrderData = orderData;
  const modal = ensureOrderModalExists();

  const numEl = document.getElementById('modalOrderNumber');
  if (numEl) numEl.textContent = '#' + orderData.orderId;

  const receipt = document.getElementById('modalReceiptContent');
  if (receipt) {
    const custCleanPhone = formatWhatsAppPhone(orderData.customer.phone);

    receipt.innerHTML = `
      <div class="order-receipt-section">
        <div class="order-receipt-row">
          <span>Customer:</span>
          <span>${orderData.customer.name}</span>
        </div>
        <div class="order-receipt-row">
          <span>Contact / WhatsApp:</span>
          <span>${orderData.customer.phone}</span>
        </div>
        <div class="order-receipt-row">
          <span>Delivery City:</span>
          <span>${orderData.customer.city}</span>
        </div>
        <div class="order-receipt-row">
          <span>Delivery Address:</span>
          <span style="max-width: 280px; word-break: break-word;">${orderData.customer.address}</span>
        </div>
        <div class="order-receipt-row">
          <span>Payment Method:</span>
          <span>${orderData.customer.payment}</span>
        </div>
        ${orderData.customer.notes ? `
          <div class="order-receipt-row">
            <span>Special Notes:</span>
            <span>${orderData.customer.notes}</span>
          </div>
        ` : ''}
      </div>

      <div class="order-receipt-section">
        <div style="font-weight:700; font-size:0.85rem; color:var(--text-secondary); margin-bottom:8px;">ITEMS ORDERED (${orderData.items.length})</div>
        <div class="order-items-list">
          ${orderData.items.map(item => `
            <div class="order-item-entry">
              <span>
                <strong>${item.name}</strong>
                <span class="order-item-fit">Fits: ${getVehicleName(item)}</span>
                <strong style="color:var(--text-secondary);">× ${item.qty}</strong>
              </span>
              <span style="color:var(--red); font-weight:700;">${formatMoney(item.price * item.qty)}</span>
            </div>
          `).join('')}
        </div>
      </div>

      <div class="order-receipt-section">
        <div class="order-receipt-row" style="font-size:1.15rem; font-weight:900; margin-bottom:0;">
          <span style="color:var(--text-primary);">Grand Total:</span>
          <span style="color:var(--red);">${formatMoney(orderData.total)}</span>
        </div>
      </div>
    `;

    const storeWaBtn = document.getElementById('modalStoreWaBtn');
    if (storeWaBtn) {
      storeWaBtn.href = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(orderData.storeMsg)}`;
    }

    const custWaBtn = document.getElementById('modalCustomerWaBtn');
    if (custWaBtn) {
      if (custCleanPhone) {
        custWaBtn.href = `https://wa.me/${custCleanPhone}?text=${encodeURIComponent(orderData.customerMsg)}`;
        custWaBtn.style.display = 'flex';
      } else {
        custWaBtn.style.display = 'none';
      }
    }
  }

  modal.classList.add('active');
}

function closeOrderModal() {
  const modal = document.getElementById('orderConfirmModal');
  if (modal) modal.classList.remove('active');
}

function copyOrderSummary() {
  if (!lastOrderData) return;
  const textToCopy = lastOrderData.customerMsg || lastOrderData.storeMsg;
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(textToCopy).then(() => {
      showToast('📋 Order confirmation copied to clipboard!');
    }).catch(() => {
      promptCopyFallback(textToCopy);
    });
  } else {
    promptCopyFallback(textToCopy);
  }
}

function promptCopyFallback(text) {
  const ta = document.createElement('textarea');
  ta.value = text;
  document.body.appendChild(ta);
  ta.select();
  try {
    document.execCommand('copy');
    showToast('📋 Order confirmation copied to clipboard!');
  } catch (e) {
    showToast('Unable to copy text.');
  }
  document.body.removeChild(ta);
}

// Order Via WhatsApp Function
function orderViaWhatsApp(productId) {
  const item = productId ? productsData.find(p => p.id === productId) : null;
  let itemsToOrder = [];

  if (item) {
    itemsToOrder = [{ ...item, qty: 1 }];
  } else if (cart.length > 0) {
    itemsToOrder = [...cart];
  } else {
    showToast('⚠️ Your cart is empty! Please choose a product to order.');
    return;
  }

  const name = document.getElementById('custName')?.value.trim() || '';
  const phone = document.getElementById('custPhone')?.value.trim() || '';
  const city = document.getElementById('custCity')?.value.trim() || '';
  const address = document.getElementById('custAddress')?.value.trim() || '';
  const payment = document.getElementById('custPayment')?.value || 'Cash on Delivery (COD)';
  const notes = document.getElementById('custNotes')?.value.trim() || '';

  const orderId = 'AS-' + Math.floor(100000 + Math.random() * 900000);
  const orderDate = new Date().toLocaleString('en-PK', { dateStyle: 'medium', timeStyle: 'short' });
  const total = itemsToOrder.reduce((sum, i) => sum + (i.price * i.qty), 0);

  let msg = `🛡️ *NEW ORDER - AUTOSHIELD CAR COVERS*\n`;
  msg += `━━━━━━━━━━━━━━━━━━━━━\n`;
  msg += `📋 *Order ID:* #${orderId}\n`;
  msg += `📅 *Date:* ${orderDate}\n\n`;

  if (name || phone || city || address) {
    msg += `👤 *CUSTOMER DETAILS:*\n`;
    if (name) msg += `• *Name:* ${name}\n`;
    if (phone) msg += `• *Phone:* ${phone}\n`;
    if (city) msg += `• *City:* ${city}\n`;
    if (address) msg += `• *Address:* ${address}\n`;
    msg += `• *Payment Method:* ${payment}\n`;
    if (notes) msg += `• *Notes:* ${notes}\n`;
    msg += `\n`;
  }

  msg += `📦 *ORDERED ITEMS:*\n`;
  itemsToOrder.forEach((it, idx) => {
    msg += `${idx + 1}. *${it.name}*\n`;
    if (it.fabric) msg += `   🧵 Fabric Material: *${it.fabric}*\n`;
    msg += `   Fits: ${getVehicleName(it)}\n   Qty: ${it.qty} × ${formatMoney(it.price)} = ${formatMoney(it.price * it.qty)}\n`;
  });
  msg += `━━━━━━━━━━━━━━━━━━━━━\n`;
  msg += `💰 *Grand Total:* ${formatMoney(total)}\n`;
  msg += `🚚 *Delivery:* Cash on Delivery (Nationwide)\n`;
  msg += `━━━━━━━━━━━━━━━━━━━━━\n`;
  msg += `_Please confirm my order and share dispatch details._`;

  const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;
  window.open(url, '_blank');
}

// ===== CHECKOUT SUBMISSION =====
function handleCheckoutSubmit(e) {
  e.preventDefault();

  if (!cart || cart.length === 0) {
    showToast('⚠️ Your shopping cart is empty! Please add products before placing an order.');
    return;
  }

  const name = document.getElementById('custName')?.value.trim();
  const phone = document.getElementById('custPhone')?.value.trim();
  const city = document.getElementById('custCity')?.value.trim();
  const address = document.getElementById('custAddress')?.value.trim();
  const payment = document.getElementById('custPayment')?.value || 'Cash on Delivery (COD)';
  const notes = document.getElementById('custNotes')?.value.trim() || '';

  if (!name || !phone || !city || !address) {
    showToast('⚠️ Please fill out all required shipping fields');
    return;
  }

  const orderId = 'AS-' + Math.floor(100000 + Math.random() * 900000);
  const orderDate = new Date().toLocaleString('en-PK', {
    dateStyle: 'medium',
    timeStyle: 'short'
  });

  const orderedItems = [...cart];
  const total = orderedItems.reduce((sum, item) => sum + (item.price * item.qty), 0);

  // 1. Store WhatsApp Message
  let storeMsg = `🛡️ *NEW ORDER - AUTOSHIELD CAR COVERS*\n`;
  storeMsg += `━━━━━━━━━━━━━━━━━━━━━\n`;
  storeMsg += `📋 *Order ID:* #${orderId}\n`;
  storeMsg += `📅 *Date:* ${orderDate}\n\n`;
  storeMsg += `👤 *CUSTOMER DETAILS:*\n`;
  storeMsg += `• *Name:* ${name}\n`;
  storeMsg += `• *Phone / WhatsApp:* ${phone}\n`;
  storeMsg += `• *City:* ${city}\n`;
  storeMsg += `• *Address:* ${address}\n`;
  storeMsg += `• *Payment Method:* ${payment}\n`;
  if (notes) {
    storeMsg += `• *Notes:* ${notes}\n`;
  }
  storeMsg += `\n📦 *ORDER ITEMS:*\n`;
  orderedItems.forEach((item, index) => {
    storeMsg += `${index + 1}. *${item.name}*\n`;
    if (item.fabric) storeMsg += `   🧵 Fabric Material: *${item.fabric}*\n`;
    storeMsg += `   Fits: ${getVehicleName(item)}\n   Qty: ${item.qty} × ${formatMoney(item.price)} = ${formatMoney(item.price * item.qty)}\n`;
  });
  storeMsg += `━━━━━━━━━━━━━━━━━━━━━\n`;
  storeMsg += `💰 *Grand Total:* ${formatMoney(total)}\n`;
  storeMsg += `🚚 *Delivery:* Cash on Delivery Nationwide\n`;
  storeMsg += `━━━━━━━━━━━━━━━━━━━━━\n`;
  storeMsg += `_Order placed via AutoShield Web Store_`;

  // 2. Customer Order Confirmation Message
  let customerMsg = `✅ *ORDER CONFIRMED — AUTOSHIELD CAR COVERS*\n`;
  customerMsg += `━━━━━━━━━━━━━━━━━━━━━\n`;
  customerMsg += `Dear *${name}*,\n\n`;
  customerMsg += `Thank you! Your AutoShield order has been successfully confirmed.\n\n`;
  customerMsg += `📋 *Order ID:* #${orderId}\n`;
  customerMsg += `📅 *Order Date:* ${orderDate}\n\n`;
  customerMsg += `📦 *ORDERED ITEMS:*\n`;
  orderedItems.forEach((item, index) => {
    customerMsg += `${index + 1}. ${item.name} ${item.fabric ? `[Fabric: ${item.fabric}]` : ''} — Fits: ${getVehicleName(item)} (${item.qty}x) - ${formatMoney(item.price * item.qty)}\n`;
  });
  customerMsg += `\n💰 *Total Amount:* ${formatMoney(total)} (${payment})\n`;
  customerMsg += `📍 *Delivery Address:* ${address}, ${city}\n\n`;
  customerMsg += `🚚 *Delivery Status:* Your parcel will be delivered to your address within 2 to 4 working days. The delivery rider will contact you prior to dispatch.\n\n`;
  customerMsg += `If you have any questions, feel free to contact us on WhatsApp: +92 307 2818652\n`;
  customerMsg += `AutoShield Pakistan 🛡️`;

  const orderData = {
    orderId,
    orderDate,
    customer: { name, phone, city, address, payment, notes },
    items: orderedItems,
    total,
    storeMsg,
    customerMsg
  };

  // Save order to LocalStorage history
  try {
    const ordersHistory = JSON.parse(localStorage.getItem('autoshield_orders') || '[]');
    ordersHistory.unshift(orderData);
    localStorage.setItem('autoshield_orders', JSON.stringify(ordersHistory));
  } catch (err) {}

  // Attempt async save to MySQL API backend
  try {
    fetch(`${BASE_URL}?action=create_order`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        order_number: orderId,
        customer_name: name,
        phone: phone,
        city: city,
        address: address,
        payment_method: payment,
        total_amount: total,
        items: orderedItems,
        notes: notes
      })
    }).then(res => res.json()).then(resData => {
      console.log('Order successfully synced to MySQL database:', resData);
    }).catch(() => {});
  } catch (err) {}

  // Clear shopping cart
  cart = [];
  saveCart();
  updateBadges();
  renderCart();

  const checkoutForm = document.querySelector('form');
  if (checkoutForm) checkoutForm.reset();

  showToast(`🎉 Order #${orderId} confirmed! Opening WhatsApp...`);

  // Open modal receipt
  showOrderConfirmationModal(orderData);

  // Automatically trigger WhatsApp in background/new window to send order details
  const storeUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(storeMsg)}`;
  window.open(storeUrl, '_blank');
}

// ===== CONTACT FORM =====
function handleContactSubmit(e) {
  e.preventDefault();
  showToast('📩 Thank you for your inquiry! Our AutoShield team will respond shortly.');
  e.target.reset();
}

// ===== HELPERS =====
function formatMoney(num) {
  return 'Rs. ' + Number(num).toLocaleString('en-PK');
}

function showToast(msg) {
  const container = document.getElementById('toastContainer');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `🛡 <span>${msg}</span>`;
  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateX(100%)';
    setTimeout(() => toast.remove(), 300);
  }, 3500);
}

function resetFilters() {
  currentCategory = 'all';
  currentSearch = '';
  if (document.getElementById('searchInput')) document.getElementById('searchInput').value = '';
  renderShopGrid();
}