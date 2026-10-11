// ==========================================================================
// AUTOSHIELD MULTI-PAGE APPLICATION LOGIC
// ==========================================================================

const BASE_URL = 'http://localhost/autoshield/api.php';
const WHATSAPP_NUMBER = '923285154975'; // AutoShield Support WhatsApp

// Expanded 12+ Distinct Product Catalog with Unique Cover Photography
const productsData = [
  {
    id: 1,
    name: 'AutoShield Black Armor 3-Layer Sedan Cover',
    cat: 'Car Covers',
    price: 6999,
    old: 8999,
    image: 'images/cover_sedan_black.png',
    rating: 4.9,
    reviews: 48,
    badge: 'BESTSELLER',
    fitMake: 'Honda',
    fitModel: 'Civic',
    bodyStyle: 'Sedan',
    shortDesc: 'Ultra heavy-duty 3-layer waterproof car top cover designed for Honda Civic, Toyota Corolla & mid-size sedans.',
    fabricSpecs: '3-Layer Composite (Aluminum Film + PE Waterproof Membrane + Soft Cotton Fleece)',
    waterproofRating: '10,000mm Hydrostatic Head',
    uvProtection: '99.5% UV-B & UV-A Deflector',
    guarantee: '2-Year Fabric Stitching Warranty',
    sizesAvailable: ['Small (Civic / City)', 'Medium (Corolla / Yaris)', 'Large (Accord / Sonata)', 'Custom Tailored']
  },
  {
    id: 2,
    name: 'AutoShield Silver Reflective Heat Deflector',
    cat: 'Car Covers',
    price: 7499,
    old: 8999,
    image: 'images/cover_sedan_silver.png',
    rating: 4.8,
    reviews: 35,
    badge: 'UV HEAT SHIELD',
    fitMake: 'Toyota',
    fitModel: 'Corolla',
    bodyStyle: 'Sedan',
    shortDesc: 'Reflective aluminum exterior layer blocks 99% UV radiation and reduces interior cabin temperature by up to 25°C.',
    fabricSpecs: 'Reflective Aluminum Foil + High-Density Micro-Pores + Fleece',
    waterproofRating: '8,500mm Hydrostatic Head',
    uvProtection: '99.9% Thermal Heat Reflector',
    guarantee: '1-Year Heat Resistance Warranty',
    sizesAvailable: ['Medium (Corolla / Elantra)', 'Large (Camry / Accord)', 'XL (Mercedes S-Class)']
  },
  {
    id: 3,
    name: 'AutoShield Fortuner 4x4 Heavy Duty SUV Cover',
    cat: 'SUV Covers',
    price: 8999,
    old: 10999,
    image: 'images/cat_suv_cover.png',
    rating: 5.0,
    reviews: 62,
    badge: 'HEAVY DUTY',
    fitMake: 'Toyota',
    fitModel: 'Fortuner',
    bodyStyle: 'SUV',
    shortDesc: 'Designed specifically for full-size 7-seater SUVs. Extra height profile with heavy windproof buckle straps.',
    fabricSpecs: '400D Heavy Duty Oxford Polyester + Rubber Coating + Plush Inner Velvet',
    waterproofRating: '12,000mm Hydrostatic Head',
    uvProtection: '98.8% Sun Block',
    guarantee: '3-Year Heavy Duty Warranty',
    sizesAvailable: ['Fortuner Fit', 'Prado Fit', 'Land Cruiser / Patrol Fit']
  },
  {
    id: 4,
    name: 'AutoShield Tucson All-Weather Crossover Cover',
    cat: 'SUV Covers',
    price: 8499,
    old: 9999,
    image: 'images/hero_car_cover.png',
    rating: 4.7,
    reviews: 29,
    badge: 'ALL WEATHER',
    fitMake: 'Hyundai',
    fitModel: 'Tucson',
    bodyStyle: 'SUV',
    shortDesc: 'Custom tailored cover for mid-size compact crossovers like Tucson, Sportage, MG HS, and Haval Jolion.',
    fabricSpecs: 'Triple-Layered WeatherGuard Fabric + Reinforced Mirror Pockets',
    waterproofRating: '9,500mm Hydrostatic Head',
    uvProtection: '99.0% UV Deflector',
    guarantee: '2-Year Stitching Warranty',
    sizesAvailable: ['Crossover M (Tucson / Sportage)', 'Crossover L (Haval H6 / MG HS)']
  },
  {
    id: 5,
    name: 'AutoShield Swift Hatchback Tailored Cover',
    cat: 'Car Covers',
    price: 5999,
    old: 7499,
    image: 'images/cover_sedan_black.png',
    rating: 4.6,
    reviews: 22,
    badge: 'COMPACT FIT',
    fitMake: 'Suzuki',
    fitModel: 'Swift',
    bodyStyle: 'Hatchback',
    shortDesc: 'Precision contoured cover for hatchbacks like Swift, Alto, Cultus, Vitz, and Picanto with fast zip access.',
    fabricSpecs: 'Soft-Touch Weather-Tite Fabric + Double Stitched Hems',
    waterproofRating: '8,000mm Hydrostatic Head',
    uvProtection: '97.5% UV Block',
    guarantee: '1-Year Replacement Guarantee',
    sizesAvailable: ['Micro (Alto / Every)', 'Compact (Swift / Cultus / Vitz)', 'Hatchback (Aqua / Note)']
  },
  {
    id: 6,
    name: 'AutoShield Waterproof Superbike Body Cover',
    cat: 'Bike Covers',
    price: 2999,
    old: 3999,
    image: 'images/cat_bike_cover.png',
    rating: 4.9,
    reviews: 41,
    badge: 'BIKE SHIELD',
    fitMake: 'Yamaha',
    fitModel: 'Heavy Bike',
    bodyStyle: 'Bike',
    shortDesc: '100% waterproof motorcycle body cover with elastic double-stitched bottom hem and lock grommets.',
    fabricSpecs: '210T Ripstop Nylon + Heat Shield Exhaust Panel',
    waterproofRating: '10,000mm Hydrostatic Head',
    uvProtection: '98.0% UV Shield',
    guarantee: '1-Year Tearproof Guarantee',
    sizesAvailable: ['Standard (70cc - 150cc)', 'Heavy Bike (250cc - 1000cc)', 'Touring Adventure Bike']
  },
  {
    id: 7,
    name: 'AutoShield Tactical Camo All-Terrain Cover',
    cat: 'SUV Covers',
    price: 9499,
    old: 11999,
    image: 'images/cat_suv_cover.png',
    rating: 4.9,
    reviews: 19,
    badge: 'TACTICAL EDITION',
    fitMake: 'Toyota',
    fitModel: 'Hilux Revo',
    bodyStyle: 'SUV',
    shortDesc: 'Military-grade camouflage pattern water repellant body cover for 4x4 offroad jeeps and pickup trucks.',
    fabricSpecs: '600D Military Grade Camo Polyester + Polyurethane Coating',
    waterproofRating: '15,000mm Hydrostatic Head',
    uvProtection: '99.9% Military Sun Block',
    guarantee: '3-Year Extreme Conditions Warranty',
    sizesAvailable: ['Revo / D-Max Pickup', 'Jeep Wrangler / FJ Cruiser', 'Full Size 4x4']
  },
  {
    id: 8,
    name: 'AutoShield Matte Black Luxury Sports Cover',
    cat: 'Car Covers',
    price: 9999,
    old: 12999,
    image: 'images/product_silver_cover.png',
    rating: 5.0,
    reviews: 54,
    badge: 'LUXURY EDITION',
    fitMake: 'Audi',
    fitModel: 'A6',
    bodyStyle: 'Sedan',
    shortDesc: 'Showroom grade indoor & outdoor satin-touch stretch cover for luxury sports coupes and executive sedans.',
    fabricSpecs: 'Breathable Velvet Stretch Lycra + Satin Finish Outer',
    waterproofRating: '7,000mm Hydrostatic Head',
    uvProtection: '99.0% UV Shield',
    guarantee: '3-Year Showroom Coating Protection Warranty',
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
});

// ===== RENDER HOME PAGE BESTSELLERS =====
function renderHomeProducts() {
  const grid = document.getElementById('productGrid');
  if (grid) {
    const featured = productsData.slice(0, 8); // Top 8 featured products
    grid.innerHTML = featured.map(p => createProductCardHTML(p)).join('');
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

// ===== PRODUCT CARD HTML GENERATOR =====
function createProductCardHTML(p) {
  const discount = Math.round((1 - p.price / p.old) * 100);
  const isWishlisted = wishlist.includes(p.id);

  return `
    <article class="product-card">
      ${discount > 0 ? `<span class="badge-discount">-${discount}% OFF</span>` : ''}
      <button class="wishlist-btn ${isWishlisted ? 'active' : ''}" onclick="toggleWishlist(${p.id})">
        ${isWishlisted ? '♥' : '♡'}
      </button>
      <div class="product-thumb" onclick="navigateToDetail(${p.id})" style="cursor:pointer;">
        <img src="${p.image}" alt="${p.name}" loading="lazy">
        <div class="quick-view-overlay">
          <button class="btn btn-outline btn-sm" onclick="event.stopPropagation(); navigateToDetail(${p.id})">Full Details →</button>
        </div>
      </div>
      <div class="product-info">
        <div class="product-cat-tag">${p.cat}</div>
        <h3 class="product-title" onclick="navigateToDetail(${p.id})" style="cursor:pointer;">${p.name}</h3>
        <div class="product-rating">
          ★★★★★ <span>(${p.reviews} reviews)</span>
        </div>
        <div class="product-price-row">
          <span class="current-price">${formatMoney(p.price)}</span>
          <span class="old-price">${formatMoney(p.old)}</span>
        </div>
        <div style="display:flex; gap:8px; margin-top: auto;">
          <button class="add-cart-btn" style="flex:1;" onclick="addToCart(${p.id})">
            🛒 Add to Cart
          </button>
          <button class="btn btn-whatsapp" style="padding:10px 14px;" onclick="orderViaWhatsApp(${p.id})" title="Order via WhatsApp">
            💬
          </button>
        </div>
      </div>
    </article>
  `;
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

  if (cartBadge) cartBadge.textContent = totalCartCount;
  if (wishBadge) wishBadge.textContent = wishlist.length;
}

function openCartDrawer() {
  const drawer = document.getElementById('cartDrawer');
  if (drawer) drawer.classList.add('open');
}

function closeCartDrawer() {
  const drawer = document.getElementById('cartDrawer');
  if (drawer) drawer.classList.remove('open');
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
              <span>${item.name} <strong style="color:var(--text-secondary);">× ${item.qty}</strong></span>
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
    msg += `${idx + 1}. *${it.name}*\n   Qty: ${it.qty} × ${formatMoney(it.price)} = ${formatMoney(it.price * it.qty)}\n`;
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
    storeMsg += `${index + 1}. *${item.name}*\n   Qty: ${item.qty} × ${formatMoney(item.price)} = ${formatMoney(item.price * item.qty)}\n`;
  });
  storeMsg += `━━━━━━━━━━━━━━━━━━━━━\n`;
  storeMsg += `💰 *Grand Total:* ${formatMoney(total)}\n`;
  storeMsg += `🚚 *Delivery:* Cash on Delivery Nationwide\n`;
  storeMsg += `━━━━━━━━━━━━━━━━━━━━━\n`;
  storeMsg += `_Order placed via AutoShield Web Store_`;

  // 2. Customer Order Confirmation Message
  let customerMsg = `✅ *ORDER CONFIRMED — AUTOSHIELD CAR COVERS*\n`;
  customerMsg += `━━━━━━━━━━━━━━━━━━━━━\n`;
  customerMsg += `Assalam-o-Alaikum *${name}*,\n\n`;
  customerMsg += `Shukriya! Aap ka AutoShield order kamyabi se confirm ho gaya hai.\n\n`;
  customerMsg += `📋 *Order ID:* #${orderId}\n`;
  customerMsg += `📅 *Order Date:* ${orderDate}\n\n`;
  customerMsg += `📦 *ORDERED ITEMS:*\n`;
  orderedItems.forEach((item, index) => {
    customerMsg += `${index + 1}. ${item.name} (${item.qty}x) - ${formatMoney(item.price * item.qty)}\n`;
  });
  customerMsg += `\n💰 *Total Amount:* ${formatMoney(total)} (${payment})\n`;
  customerMsg += `📍 *Delivery Address:* ${address}, ${city}\n\n`;
  customerMsg += `🚚 *Delivery Status:* 2 se 4 working days mein parcel apke address par deliver ho jayega. Delivery rider dispatch se pehle apko rabta karega.\n\n`;
  customerMsg += `Koi bhi sawal ho to hum se WhatsApp par rabta karein: +92 328 5154975\n`;
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

  // Attempt async save to API backend if available
  try {
    fetch('api.php/orders', {
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