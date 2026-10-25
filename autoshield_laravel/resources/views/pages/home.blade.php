@extends('layouts.app')

@section('title', "AutoShield — Premium Car & Vehicle Top Covers in Pakistan")
@section('meta_description', "Shop custom-fit 100% waterproof, solar UV heat deflector, and heavy-duty 5-layer car top covers in Pakistan. Cash on delivery nationwide.")

@section('content')
<!-- Hero Section -->
<section class="hero">
    <div class="container hero-grid">
        <div class="hero-content">
            <div class="hero-badge">
                <span class="hero-badge-dot"></span>
                Pakistan's #1 Bespoke Cover Brand
            </div>
            <h1 style="font-family: var(--font-serif); font-weight: 400; letter-spacing: 0.02em;">
                BESPOKE PROTECTION <br><span class="text-gradient">TAILORED TO PERFECTION</span>
            </h1>
            <p style="color: var(--text-secondary); font-size: 1.1rem; line-height: 1.7; margin-bottom: 32px;">
                Hand-crafted luxury vehicle covers engineered for discerning owners. Combining 5-layer composite weather armor with ultra-soft VelvetGuard™ inner lining to protect against blistering 48°C+ summer heat, torrential monsoon rains, UV paint oxidation, and fine dust scratches.
            </p>

            <div class="hero-actions">
                <a href="{{ route('shop.index') }}" class="btn btn-primary">EXPLORE THE COLLECTION →</a>
                <a href="#fit-finder" class="btn btn-outline">SELECT YOUR VEHICLE ▾</a>
            </div>

            <div style="display:flex; align-items:center; gap:16px; margin-top:24px; font-size:0.85rem; color:var(--text-secondary); flex-wrap:wrap;">
                <span style="display:inline-flex; align-items:center; gap:6px;">
                    <span style="color: var(--gold-accent);">★★★★★</span> 
                    <strong>4.9 / 5.0 Rating</strong> (1,400+ Reviews)
                </span>
                <span style="color: var(--border-color);">•</span>
                <span>🛡️ <strong>1-Year Warranty</strong></span>
                <span style="color: var(--border-color);">•</span>
                <span>🚚 <strong>Cash on Delivery Nationwide</strong></span>
            </div>
        </div>

        <div class="hero-visual">
            <img src="{{ asset('images/covers/hero_luxury_bespoke.jpg') }}" alt="AutoShield Bespoke Vehicle Cover" style="border-radius: var(--radius-lg); box-shadow: 0 25px 50px rgba(0,0,0,0.85), 0 0 25px rgba(184,148,69,0.2); border: 1px solid var(--border-color); width: 100%; max-height: 440px; object-fit: cover;">
        </div>
    </div>

    <!-- Advanced Vehicle Fit Finder Bar -->
    <div class="container" id="fit-finder">
        <div class="fit-finder-box">
            <div class="fit-finder-top">
                <div class="fit-finder-title">
                    <span>🚗</span> <strong>Vehicle Fitment Guarantee — Select Your Car:</strong>
                </div>
                <div class="fit-guarantee-pill" id="fitGuaranteeBadge">
                    <span class="pulse-green"></span> 100% Guaranteed Exact Fit
                </div>
            </div>

            <form action="{{ route('shop.index') }}" method="GET">
                <div class="fit-finder-grid">
                    <div class="fit-input-group">
                        <label for="fitMake">1. Select Make</label>
                        <select name="make" id="fitMake">
                            <option value="">Choose Brand (Make)</option>
                            <option value="Porsche">Porsche</option>
                            <option value="BMW">BMW</option>
                            <option value="Mercedes-Benz">Mercedes-Benz</option>
                            <option value="Audi">Audi</option>
                            <option value="Lexus">Lexus</option>
                            <option value="Toyota">Toyota</option>
                            <option value="Honda">Honda</option>
                            <option value="Suzuki">Suzuki</option>
                            <option value="Kia">Kia</option>
                            <option value="Hyundai">Hyundai</option>
                            <option value="MG">MG</option>
                            <option value="Haval">Haval</option>
                            <option value="Changan">Changan</option>
                            <option value="Volkswagen">Volkswagen</option>
                            <option value="Nissan">Nissan</option>
                            <option value="Daihatsu">Daihatsu</option>
                        </select>
                    </div>

                    <div class="fit-input-group">
                        <label for="fitModel">2. Select Model</label>
                        <select name="search" id="fitModel">
                            <option value="">Choose Model (e.g. Civic, Corolla, Alto)</option>
                            <option value="Civic">Honda Civic (11th Gen / RS / Turbo / Rebirth)</option>
                            <option value="Corolla">Toyota Corolla (Altis / Grande / GLi)</option>
                            <option value="Alto">Suzuki Alto (660cc VX / VXR / VXL)</option>
                            <option value="Fortuner">Toyota Fortuner (Legender / Sigma 4)</option>
                            <option value="City">Honda City (1.2 / 1.5 Aspire)</option>
                            <option value="Sportage">Kia Sportage (Alpha / FWD / AWD)</option>
                            <option value="Prado">Toyota Land Cruiser & Prado</option>
                            <option value="Yaris">Toyota Yaris (ATIV / ATIV X)</option>
                            <option value="Cultus">Suzuki Cultus & Swift</option>
                            <option value="Tucson">Hyundai Tucson & Elantra</option>
                            <option value="MG">MG HS & Haval H6</option>
                            <option value="Bike">Honda CG 125 & Yamaha YBR</option>
                        </select>
                    </div>

                    <div class="fit-input-group">
                        <label for="fitBody">3. Body Style</label>
                        <select name="category" id="fitBody">
                            <option value="">All Body Categories</option>
                            <option value="Car Covers">Sedan (Civic, Corolla, City, Yaris)</option>
                            <option value="Hatchback Covers">Hatchback (Alto, Cultus, Swift)</option>
                            <option value="SUV Covers">SUV & 4x4 (Fortuner, Sportage, Prado, MG)</option>
                            <option value="Bike Covers">Motorcycle (125cc, 70cc, Heavy Bike)</option>
                        </select>
                    </div>

                    <div class="fit-input-group" style="margin-top:auto;">
                        <button type="submit" class="btn btn-primary" style="width: 100%; padding: 13px; font-weight:800; font-size:0.88rem;">
                            FIND COVER 🔍
                        </button>
                    </div>
                </div>
            </form>

            <!-- Quick Popular Model Tags -->
            <div class="quick-make-chips">
                <span class="quick-chip-label">Popular in Pakistan:</span>
                <button type="button" class="quick-chip" data-make="Suzuki" data-model="Alto">Suzuki Alto</button>
                <button type="button" class="quick-chip" data-make="Honda" data-model="Civic">Honda Civic</button>
                <button type="button" class="quick-chip" data-make="Toyota" data-model="Corolla">Toyota Corolla</button>
                <button type="button" class="quick-chip" data-make="Toyota" data-model="Fortuner">Toyota Fortuner</button>
                <button type="button" class="quick-chip" data-make="Kia" data-model="Sportage">Kia Sportage</button>
                <button type="button" class="quick-chip" data-make="Toyota" data-model="Prado">Toyota Prado</button>
                <button type="button" class="quick-chip" data-make="Honda" data-model="City">Honda City</button>
                <button type="button" class="quick-chip" data-make="Honda" data-model="125">Honda 125</button>
            </div>
        </div>
    </div>
</section>

<!-- Trust Highlights Bar -->
<section class="trust-bar">
    <div class="container trust-grid">
        <div class="trust-item">
            <div class="trust-icon">🛡️</div>
            <div class="trust-info">
                <strong>5-Layer Armor Fabric</strong>
                <span>Aerospace-grade composite shield</span>
            </div>
        </div>

        <div class="trust-item">
            <div class="trust-icon">💧</div>
            <div class="trust-info">
                <strong>100% Monsoon Proof</strong>
                <span>10,000mm hydrostatic rating</span>
            </div>
        </div>

        <div class="trust-item">
            <div class="trust-icon">✨</div>
            <div class="trust-info">
                <strong>FleeceGuard™ Lining</strong>
                <span>Zero swirl marks — PPF & ceramic safe</span>
            </div>
        </div>

        <div class="trust-item">
            <div class="trust-icon">🚚</div>
            <div class="trust-info">
                <strong>Cash on Delivery (COD)</strong>
                <span>Nationwide in 2–4 business days</span>
            </div>
        </div>
    </div>
</section>

<!-- Animated Stats Row -->
<section style="background: #0B0B0B; padding: 48px 0; border-bottom: 1px solid var(--border-color);">
    <div class="container">
        <div class="stats-row">
            <div class="stat-block">
                <div class="stat-num"><span data-target="15000" data-suffix="+">15,000+</span></div>
                <div class="stat-label">Happy Customers</div>
            </div>
            <div class="stat-block">
                <div class="stat-num"><span data-target="150" data-suffix="+">150+</span></div>
                <div class="stat-label">Cities Covered</div>
            </div>
            <div class="stat-block">
                <div class="stat-num"><span data-target="4.9" data-float="true" data-suffix="★">4.9★</span></div>
                <div class="stat-label">Average Rating</div>
            </div>
            <div class="stat-block">
                <div class="stat-num"><span data-target="1" data-suffix="-Year Warranty">1-Year Warranty</span></div>
                <div class="stat-label">On All Products</div>
            </div>
        </div>
    </div>
</section>

<!-- 5-Layer Composite Armor Cutaway & Technology Showcase -->
<section class="tech-section">
    <div class="container">
        <div class="section-head">
            <div class="eyebrow">AEROSPACE-GRADE TEXTILE ENGINEERING</div>
            <h2>5-Layer Composite Armor Technology</h2>
            <p>Why AutoShield covers outperform conventional tarpaulins and parachute covers: an exploded view of our multi-stage protection layers.</p>
        </div>

        <div class="tech-grid">
            <!-- Left: Interactive Layer Stack -->
            <div class="layer-cutaway-display">
                <div class="layer-row active" data-layer="0">
                    <div class="layer-num">1</div>
                    <div class="layer-info">
                        <strong>Outer Solar & UV Deflector</strong>
                        <span>Reflective Aluminum Foil • Deflects 99.5% Heat & UV Rays</span>
                    </div>
                    <span class="layer-badge">HEAT SHIELD</span>
                </div>

                <div class="layer-row" data-layer="1">
                    <div class="layer-num">2</div>
                    <div class="layer-info">
                        <strong>Hydro-Tough™ Waterproof Membrane</strong>
                        <span>10,000mm Hydrostatic Rating • High-pressure PE barrier</span>
                    </div>
                    <span class="layer-badge">100% RAINPROOF</span>
                </div>

                <div class="layer-row" data-layer="2">
                    <div class="layer-num">3</div>
                    <div class="layer-info">
                        <strong>Impact-Absorbing EVA Cushion</strong>
                        <span>Shock Absorption • Guards against hail, twigs & claws</span>
                    </div>
                    <span class="layer-badge">SHOCKPROOF</span>
                </div>

                <div class="layer-row" data-layer="3">
                    <div class="layer-num">4</div>
                    <div class="layer-info">
                        <strong>Micro-Porous Breathable Scrim</strong>
                        <span>Ventilated Airflow • Eliminates trapped condensation & rust</span>
                    </div>
                    <span class="layer-badge">BREATHABLE</span>
                </div>

                <div class="layer-row" data-layer="4">
                    <div class="layer-num">5</div>
                    <div class="layer-info">
                        <strong>FleeceGuard™ Non-Scratch Lining</strong>
                        <span>100% Cotton Velvet • Safe for Ceramic Coating & PPF</span>
                    </div>
                    <span class="layer-badge">ZERO SWIRLS</span>
                </div>
            </div>

            <!-- Right: Dynamic Spec Card -->
            <div class="tech-detail-card" id="techDetailCard">
                <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:14px;">
                    <span class="eyebrow">UV 99.5% BLOCK</span>
                    <span style="font-size:0.85rem; color:var(--text-muted); font-weight:700;">SPECIFICATION #01</span>
                </div>
                <h3 style="font-size: 1.4rem; color: #fff; margin-bottom: 8px;">Layer 1: Reflective Aluminum Solar & UV Deflector</h3>
                <p style="color: var(--text-secondary); font-size: 0.92rem; line-height: 1.7; margin-bottom: 24px;">
                    High-density micro-thin aluminum foil bonded to polymer mesh. Deflects extreme ultraviolet rays, preventing vehicle clear coat fade, dashboard cracks, and cabin heat buildup even in 48°C+ summer weather.
                </p>
                <div style="background: rgba(0,0,0,0.3); border: 1px solid var(--border); border-radius: var(--radius-md); padding: 18px; margin-bottom: 24px;">
                    <div class="tech-spec-row">
                        <span>Solar Heat Deflection:</span>
                        <span>99.5% Heat Reflection</span>
                    </div>
                    <div class="tech-spec-row">
                        <span>Surface Finish:</span>
                        <span>Diamond Anodized Foil</span>
                    </div>
                    <div class="tech-spec-row">
                        <span>Max Temperature Shield:</span>
                        <span>Guaranteed up to 65°C</span>
                    </div>
                </div>
                <div style="display:flex; gap:12px; align-items:center; flex-wrap:wrap;">
                    <a href="{{ route('shop.index') }}" class="btn btn-primary btn-sm">Find Cover With This Tech →</a>
                    <button type="button" class="btn btn-whatsapp btn-sm" onclick="openWhatsAppOrderModal()">Ask Expert on WhatsApp 💬</button>
                </div>
            </div>
        </div>
    </div>
</section>



<!-- Featured Curated Collections -->
<section class="categories-section">
    <div class="container">
        <div class="section-head">
            <div class="eyebrow">Curated Collections</div>
            <h2>Protective Covers For Every Vehicle</h2>
            <p>Browse custom protective covers tailored for sedans, SUVs, hatchbacks, and motorcycles.</p>
        </div>

        <div class="categories-grid">
            <a href="{{ route('shop.index', ['body' => 'sedan']) }}" class="category-card">
                <div class="category-img">
                    <img src="{{ asset('images/covers/civic_velvet_bespoke.jpg') }}" alt="Sedan Car Covers">
                    <div class="category-overlay"></div>
                </div>
                <div class="category-content">
                    <div>
                        <h3>Sedan & Coupe Covers</h3>
                        <p>Civic, Corolla, City, Yaris & more</p>
                    </div>
                    <div class="category-arrow">→</div>
                </div>
            </a>

            <a href="{{ route('shop.index', ['body' => 'suv']) }}" class="category-card">
                <div class="category-img">
                    <img src="{{ asset('images/covers/fortuner_armor_suv.jpg') }}" alt="SUV & 4x4 Covers">
                    <div class="category-overlay"></div>
                </div>
                <div class="category-content">
                    <div>
                        <h3>SUV & 4x4 Heavy Shield</h3>
                        <p>Fortuner, Tucson, Sportage, MG, Haval</p>
                    </div>
                    <div class="category-arrow">→</div>
                </div>
            </a>

            <a href="{{ route('shop.index', ['body' => 'bike']) }}" class="category-card">
                <div class="category-img">
                    <img src="{{ asset('images/covers/motorcycle_ripstop_pro.jpg') }}" alt="Bike Body Covers">
                    <div class="category-overlay"></div>
                </div>
                <div class="category-content">
                    <div>
                        <h3>Motorcycle Armor</h3>
                        <p>Standard & Superbike body covers</p>
                    </div>
                    <div class="category-arrow">→</div>
                </div>
            </a>

            <a href="{{ route('shop.index', ['search' => 'Silver']) }}" class="category-card">
                <div class="category-img">
                    <img src="{{ asset('images/covers/corolla_silver_shield.jpg') }}" alt="Heat Deflectors">
                    <div class="category-overlay"></div>
                </div>
                <div class="category-content">
                    <div>
                        <h3>Solar Heat Deflectors</h3>
                        <p>Aluminum solar UV heat deflectors</p>
                    </div>
                    <div class="category-arrow">→</div>
                </div>
            </a>
        </div>
    </div>
</section>

<!-- Top Bestsellers Showcase -->
<section class="shop-section">
    <div class="container">
        <div class="section-head">
            <div class="eyebrow">Top Bestsellers</div>
            <h2>Featured Protective Covers</h2>
            <p>Hand-crafted for extreme durability, guaranteed size fitment, and complete paint protection.</p>
        </div>

        <div class="product-grid">
            @foreach($featuredProducts as $product)
                <article class="product-card">
                    @if($product->badge)
                        <span class="badge-discount">{{ $product->badge }}</span>
                    @endif
                    <div class="product-thumb">
                        <button type="button" class="card-like-btn" data-product-id="{{ $product->id }}" data-product-name="{{ $product->name }}" data-product-price="{{ $product->formatted_price }}" data-product-img="{{ asset($product->image) }}" data-product-url="{{ route('shop.show', $product->slug) }}" title="Save to Wishlist" aria-label="Like cover">
                            <svg class="like-heart-icon" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"></path>
                            </svg>
                        </button>
                        <a href="{{ route('shop.show', $product->slug) }}">
                            <img src="{{ asset($product->image) }}" alt="{{ $product->name }}" loading="lazy">
                        </a>
                        <div class="quick-view-overlay">
                            <button type="button" class="btn btn-outline btn-sm" data-quickview='@json($product)'>
                                Quick View 👁️
                            </button>
                        </div>
                    </div>
                    <div class="product-info">
                        <div class="product-cat-tag">{{ $product->cat }}</div>
                        <h3 class="product-title" style="font-family: var(--font-serif); font-size: 1.35rem; font-weight: 400; line-height: 1.25;">
                            <a href="{{ route('shop.show', $product->slug) }}">{{ $product->name }}</a>
                        </h3>
                        <div class="product-rating">
                            ★★★★★ <span>({{ $product->reviews_count ?? 45 }} reviews)</span>
                        </div>
                        <div class="product-price-row">
                            <span class="current-price" style="color: var(--gold); font-family: var(--font-sans); font-weight: 700;">From {{ $product->formatted_price }}</span>
                            @if($product->formatted_old_price)
                                <span class="old-price">{{ $product->formatted_old_price }}</span>
                            @endif
                        </div>

                        <table class="velox-spec-table" style="margin-top: 4px; margin-bottom: 14px;">
                            <tr><td>USE</td><td>All-Weather Armor</td></tr>
                            <tr><td>LINING</td><td>Soft Cotton Velvet</td></tr>
                            <tr><td>PROTECTION</td><td>100% Monsoon Proof</td></tr>
                            <tr><td>FINISH</td><td>Custom Tailored Fit</td></tr>
                        </table>

                        <div style="display:flex; gap:8px; margin-top: auto;">
                            <a href="{{ route('shop.show', $product->slug) }}" class="btn btn-primary" style="flex:1; padding:12px; font-size:0.8rem; text-align:center;">
                                VIEW & CONFIGURE →
                            </a>
                            <a href="https://wa.me/923072818652?text=Hello%20AutoShield!%20I%20want%20to%20order%20{{ urlencode($product->name) }}" target="_blank" class="btn btn-whatsapp" style="padding:10px 14px;" title="Order via WhatsApp">
                                💬
                            </a>
                        </div>
                    </div>
                </article>
            @endforeach
        </div>

        <div style="text-align: center; margin-top: 48px;">
            <a href="{{ route('shop.index') }}" class="btn btn-primary">VIEW ALL PRODUCTS IN CATALOGUE →</a>
        </div>
    </div>
</section>

<!-- Verified Customer Reviews Section -->
<section class="reviews-section">
    <div class="container">
        <div class="section-head">
            <div class="eyebrow">VERIFIED REVIEWS</div>
            <h2>Trusted by 15,000+ Drivers in Pakistan</h2>
            <p>Real experiences from real car enthusiasts protecting their vehicles with AutoShield.</p>
        </div>

        <div class="reviews-grid">
            <div class="review-card">
                <div class="review-user-row">
                    <div class="review-avatar">HT</div>
                    <div>
                        <div class="review-author">Hamza Tariq</div>
                        <div class="review-meta">✔ Verified Buyer • Lahore</div>
                    </div>
                </div>
                <div class="review-stars">★★★★★</div>
                <p class="review-quote">
                    "Soft cotton fleece lining keeps my ceramic coated Civic completely swirl-free. High quality fabric!"
                </p>
                <div class="review-vehicle-tag">
                    🚗 <strong>Covered Vehicle:</strong> Honda Civic 2022 (Sedan)
                </div>
            </div>

            <div class="review-card">
                <div class="review-user-row">
                    <div class="review-avatar">BS</div>
                    <div>
                        <div class="review-author">Bilal Shah</div>
                        <div class="review-meta">✔ Verified Buyer • Karachi</div>
                    </div>
                </div>
                <div class="review-stars">★★★★★</div>
                <p class="review-quote">
                    "100% waterproof in heavy Karachi monsoon rains. Car stayed bone dry under the cover for 3 straight days."
                </p>
                <div class="review-vehicle-tag">
                    🚗 <strong>Covered Vehicle:</strong> Toyota Corolla Altis 1.6
                </div>
            </div>

            <div class="review-card">
                <div class="review-user-row">
                    <div class="review-avatar">AR</div>
                    <div>
                        <div class="review-author">Adeel Rehman</div>
                        <div class="review-meta">✔ Verified Buyer • Islamabad</div>
                    </div>
                </div>
                <div class="review-stars">★★★★★</div>
                <p class="review-quote">
                    "Exact snug fit on my Sportage with mirror pockets. Wind buckle straps kept it firmly locked during a storm."
                </p>
                <div class="review-vehicle-tag">
                    🚙 <strong>Covered Vehicle:</strong> Kia Sportage AWD
                </div>
            </div>
        </div>
    </div>
</section>

<!-- Interactive FAQ Accordion Section -->
<section class="faq-section">
    <div class="container">
        <div class="section-head">
            <div class="eyebrow">COMMON QUESTIONS</div>
            <h2>Frequently Asked Questions</h2>
            <p>Everything you need to know about size fitment, weather protection, and delivery across Pakistan.</p>
        </div>

        <div class="faq-wrap">
            <div class="faq-item active">
                <div class="faq-question">
                    <span>1. Will this cover scratch or leave swirl marks on my car's paint?</span>
                    <span class="faq-chevron">▼</span>
                </div>
                <div class="faq-answer">
                    <strong>Zero Swirl Marks Guaranteed:</strong> Lined with proprietary FleeceGuard™ spun-cotton velvet. 100% safe for factory clear coats, ceramic coatings, car wax, and PPF wraps.
                </div>
            </div>

            <div class="faq-item">
                <div class="faq-question">
                    <span>2. Is the cover 100% waterproof in heavy monsoon rains?</span>
                    <span class="faq-chevron">▼</span>
                </div>
                <div class="faq-answer">
                    <strong>10,000mm Hydrostatic Rating:</strong> High-density polyethylene membrane with ultrasonic heat-welded seams keeps your vehicle bone dry during continuous days of heavy monsoon downpours.
                </div>
            </div>

            <div class="faq-item">
                <div class="faq-question">
                    <span>3. How does the cover stay secure during strong windstorms?</span>
                    <span class="faq-chevron">▼</span>
                </div>
                <div class="faq-answer">
                    <strong>Dual Wind-Lock Straps:</strong> Features heavy-duty click-buckle straps that fasten beneath the chassis plus front/rear elastic hems, holding firm in winds up to 70 km/h.
                </div>
            </div>

            <div class="faq-item">
                <div class="faq-question">
                    <span>4. What if the cover does not fit my car properly?</span>
                    <span class="faq-chevron">▼</span>
                </div>
                <div class="faq-answer">
                    <strong>100% Exact Fit Guarantee:</strong> If the size does not match your car model accurately, we dispatch a free replacement size or provide a 100% refund within 7 days.
                </div>
            </div>

            <div class="faq-item">
                <div class="faq-question">
                    <span>5. What are the payment methods and delivery timeline?</span>
                    <span class="faq-chevron">▼</span>
                </div>
                <div class="faq-answer">
                    <strong>Cash on Delivery (COD) Nationwide:</strong> Delivered in 2-4 business days across all 150+ cities in Pakistan via TCS / Leopard. Orders over Rs. 5,000 ship completely free!
                </div>
            </div>
        </div>
    </div>
</section>
@endsection
