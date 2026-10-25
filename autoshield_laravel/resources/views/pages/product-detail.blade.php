@extends('layouts.app')

@section('title', "{$product->name} — Custom Fit Vehicle Cover | AutoShield")
@section('meta_description', Str::limit($product->short_desc, 150))

@section('content')
<main class="container" style="padding-top: 36px; padding-bottom: 80px;">
    <!-- Velox Style Luxury Breadcrumbs -->
    <div style="font-family: var(--font-sans); font-size: 0.8rem; text-transform: uppercase; letter-spacing: 1.5px; color: var(--text-muted); margin-bottom: 28px;">
        <a href="{{ route('home') }}" style="color: inherit; text-decoration: none;">Home</a> /
        <a href="{{ route('shop.index', ['category' => $product->cat]) }}" style="color: inherit; text-decoration: none;">{{ $product->cat }}</a> /
        <span style="color: var(--gold);">{{ $product->name }}</span>
    </div>

    <!-- Main Velox 2-Column Product Configurator Layout -->
    <div class="velox-pdp-layout">
        <!-- LEFT: Sticky Gallery with Main Image & Thumbnails -->
        <div class="velox-gallery-wrap">
            <div class="velox-main-img-box" id="veloxImgContainer">
                <img src="{{ asset($product->image) }}" alt="{{ $product->name }}" id="veloxMainImg">
                <div class="velox-color-tint-overlay" id="veloxColorTint"></div>
                <div class="velox-zoom-badge" title="High Definition Vehicle Cover">🔍</div>
            </div>

            <!-- Thumbnail Selector Strip -->
            <div class="velox-thumb-strip">
                <div class="velox-thumb-item active" onclick="selectVeloxThumb(this, '{{ asset($product->image) }}')">
                    <img src="{{ asset($product->image) }}" alt="{{ $product->name }}">
                </div>
                <div class="velox-thumb-item" onclick="selectVeloxThumb(this, '{{ asset('images/covers/corolla_silver_shield.jpg') }}')">
                    <img src="{{ asset('images/covers/corolla_silver_shield.jpg') }}" alt="Silver Deflector Finish">
                </div>
                <div class="velox-thumb-item" onclick="selectVeloxThumb(this, '{{ asset('images/covers/fortuner_armor_suv.jpg') }}')">
                    <img src="{{ asset('images/covers/fortuner_armor_suv.jpg') }}" alt="Tailored SUV Fit Profile">
                </div>
                <div class="velox-thumb-item" onclick="selectVeloxThumb(this, '{{ asset('images/covers/civic_velvet_bespoke.jpg') }}')">
                    <img src="{{ asset('images/covers/civic_velvet_bespoke.jpg') }}" alt="Obsidian Velvet Texture">
                </div>
            </div>
        </div>

        <!-- RIGHT: Velox 4-Step Bespoke Configurator -->
        <div class="velox-configurator">
            <div class="velox-cat-tag">{{ $product->cat }} COLLECTION</div>
            <h1 class="velox-title">{{ $product->name }}</h1>

            <div class="velox-price-row">
                <span class="velox-price-prefix">From</span>
                <span class="velox-price-val" id="veloxDisplayPrice">{{ $product->formatted_price }}</span>
            </div>

            <div class="velox-collection-sub">Collection 01 — Bespoke Custom Tailored.</div>
            <p class="velox-intro-desc">
                {{ $product->short_desc }} Handcrafted from aerospace-grade composite armor fabric with ultra-soft spun cotton velvet inner lining. Designed without an abrasive inner lining, it's the perfect choice for climate-controlled garages, daily outdoor monsoon weather, and vehicles that deserve a refined finishing touch.
            </p>

            <div class="velox-best-for">
                <strong>Best for:</strong> Showrooms · Private collections · Daily outdoor sun & rain protection · Paint swirl & dust prevention.
            </div>

            <a href="{{ route('shop.index') }}" class="velox-alt-link">
                Looking for SUV or Motorcycle fitment? See all collections →
            </a>

            <form action="{{ route('cart.add') }}" method="POST" id="veloxConfigForm">
                @csrf
                <input type="hidden" name="product_id" value="{{ $product->id }}">
                <input type="hidden" name="base_price" id="veloxBasePrice" value="{{ $product->price }}">
                <input type="hidden" name="quantity" value="1">
                <input type="hidden" name="selected_vehicle" id="hiddenVehicle" value="Stock Pattern">
                <input type="hidden" name="selected_finish" id="hiddenFinish" value="Obsidian Black">
                <input type="hidden" name="selected_logo" id="hiddenLogo" value="Emblem Only">
                <input type="hidden" name="selected_extras" id="hiddenExtras" value="None">

                <!-- 01 — VEHICLE SELECTION -->
                <div class="velox-step-block">
                    <div class="velox-step-label">01 — VEHICLE</div>
                    <div class="velox-select-grid">
                        <select id="veloxMake" class="velox-select-field">
                            <option value="">Select Vehicle Make</option>
                            <option value="Toyota">Toyota (Corolla, Yaris, Fortuner, Prado, LC)</option>
                            <option value="Honda">Honda (Civic, City, Vezel, BR-V)</option>
                            <option value="Suzuki">Suzuki (Alto, Cultus, Swift, Wagon R)</option>
                            <option value="Kia">Kia (Sportage, Sorento, Picanto)</option>
                            <option value="Hyundai">Hyundai (Tucson, Elantra, Sonata)</option>
                            <option value="MG">MG (HS, ZS, GT)</option>
                            <option value="Haval">Haval (H6, Jolion)</option>
                            <option value="Changan">Changan (Alsvin, Oshan X7)</option>
                            <option value="Mercedes-Benz">Mercedes-Benz</option>
                            <option value="BMW">BMW</option>
                            <option value="Audi">Audi</option>
                            <option value="Porsche">Porsche</option>
                            <option value="Other">Other / Custom Build</option>
                        </select>

                        <select id="veloxModel" class="velox-select-field">
                            <option value="">Select Model</option>
                            <option value="Standard Fit">Standard Factory Pattern</option>
                        </select>
                    </div>

                    <!-- Custom Model Field (Revealed if 'Other' is chosen) -->
                    <div class="velox-custom-model-box" id="veloxCustomModelBox">
                        <input type="text" id="veloxCustomModelInput" class="velox-custom-model-input" placeholder="Type your vehicle Make & Model (e.g. Mazda RX-8 or Ferrari 488)">
                    </div>

                    <div class="velox-select-grid single-col" style="margin-top: 12px;">
                        <select id="veloxYear" class="velox-select-field">
                            <option value="2026 Model">Model Year: 2026 (Latest Pattern)</option>
                            <option value="2025 Model">Model Year: 2025</option>
                            <option value="2024 Model">Model Year: 2024</option>
                            <option value="2023 Model">Model Year: 2023</option>
                            <option value="2022 Model">Model Year: 2022</option>
                            <option value="2020-2021 Model">Model Year: 2020 — 2021</option>
                            <option value="2016-2019 Model">Model Year: 2016 — 2019</option>
                            <option value="Classic / Earlier Pattern">Model Year: Earlier / Classic Pattern</option>
                        </select>
                    </div>

                    <div class="velox-select-grid single-col">
                        <select id="veloxMods" class="velox-select-field">
                            <option value="Stock Body">Any body modifications? None / Stock Body (Default)</option>
                            <option value="Aftermarket Rear Spoiler / Wing">Aftermarket Rear Spoiler / Wing</option>
                            <option value="Front Lip / Bodykit / Splitter">Custom Front Lip / Side Skirts / Splitter</option>
                            <option value="Roof Rack / Carrier Bars">Roof Rack / Carrier Bars</option>
                        </select>
                    </div>

                    <p class="velox-reassurance-note">
                        Pattern is cut to your exact vehicle. Mirror caps, wings and any body modifications mentioned are accounted for at no charge. Can't find your vehicle? We can still make a cover for you — <a href="https://wa.me/923072818652?text=Hello%20AutoShield!%20I%20have%20a%20custom%20vehicle%20model%20and%20need%20a%20tailored%20cover." target="_blank">contact us</a> and we'll tailor one for you.
                    </p>
                </div>

                <!-- 02 — FINISH (16 EXACT VELOX SWATCHES) -->
                <div class="velox-step-block">
                    <div class="velox-step-label">02 — FINISH</div>
                    <div class="velox-swatches-grid">
                        <!-- Row 1 (8 Colors) -->
                        <button type="button" class="velox-swatch-btn" style="background:#f3f4f6;" data-color="Pearl Ivory" data-tint="rgba(243, 244, 246, 0.4)" title="Pearl Ivory"></button>
                        <button type="button" class="velox-swatch-btn" style="background:#2d4f4f;" data-color="Slate Teal" data-tint="rgba(45, 79, 79, 0.5)" title="Slate Teal"></button>
                        <button type="button" class="velox-swatch-btn" style="background:#475569;" data-color="Graphite Grey" data-tint="rgba(71, 85, 105, 0.45)" title="Graphite Grey"></button>
                        <button type="button" class="velox-swatch-btn active" style="background:#111111;" data-color="Obsidian Black" data-tint="none" title="Obsidian Black"></button>
                        <button type="button" class="velox-swatch-btn" style="background:#991b1b;" data-color="Guards Red" data-tint="rgba(153, 27, 27, 0.55)" title="Guards Red"></button>
                        <button type="button" class="velox-swatch-btn" style="background:#1d4ed8;" data-color="Royal Sapphire" data-tint="rgba(29, 78, 216, 0.55)" title="Royal Sapphire"></button>
                        <button type="button" class="velox-swatch-btn" style="background:#4782b4;" data-color="Steel Blue" data-tint="rgba(71, 130, 180, 0.45)" title="Steel Blue"></button>
                        <button type="button" class="velox-swatch-btn" style="background:#15803d;" data-color="British Racing Green" data-tint="rgba(21, 128, 61, 0.55)" title="British Racing Green"></button>

                        <!-- Row 2 (8 Colors) -->
                        <button type="button" class="velox-swatch-btn" style="background:#c2b9a7;" data-color="Champagne Sand" data-tint="rgba(194, 185, 167, 0.45)" title="Champagne Sand"></button>
                        <button type="button" class="velox-swatch-btn" style="background:#eab308;" data-color="Speed Yellow" data-tint="rgba(234, 179, 8, 0.5)" title="Speed Yellow"></button>
                        <button type="button" class="velox-swatch-btn" style="background:#1e293b;" data-color="Midnight Navy" data-tint="rgba(30, 41, 59, 0.6)" title="Midnight Navy"></button>
                        <button type="button" class="velox-swatch-btn" style="background:#4a154b;" data-color="Deep Plum" data-tint="rgba(74, 21, 75, 0.55)" title="Deep Plum"></button>
                        <button type="button" class="velox-swatch-btn" style="background:#78716c;" data-color="Nardo Grey" data-tint="rgba(120, 113, 108, 0.45)" title="Nardo Grey"></button>
                        <button type="button" class="velox-swatch-btn" style="background:#fbcfe8;" data-color="Blush Rose" data-tint="rgba(251, 207, 232, 0.45)" title="Blush Rose"></button>
                        <button type="button" class="velox-swatch-btn" style="background:#ea580c;" data-color="Racing Orange" data-tint="rgba(234, 88, 12, 0.55)" title="Racing Orange"></button>
                        <button type="button" class="velox-swatch-btn" style="background:#701a75;" data-color="Burgundy Wine" data-tint="rgba(112, 26, 117, 0.55)" title="Burgundy Wine"></button>
                    </div>
                    <div class="velox-swatch-title">
                        Selected Finish: <strong id="veloxFinishLabel">Obsidian Black</strong>
                    </div>
                </div>

                <!-- 03 — FRONT HOOD LOGO -->
                <div class="velox-step-block">
                    <div class="velox-step-label">03 — FRONT HOOD LOGO</div>
                    <div class="velox-radio-group">
                        <div class="velox-option-card active" data-type="logo" data-value="Emblem Only">
                            <div class="velox-option-left">
                                <div class="velox-radio-indicator"></div>
                                <div class="velox-option-text">
                                    <strong>Emblem Only</strong>
                                    <span>Car brand emblem, centered on the hood</span>
                                </div>
                            </div>
                            <span class="velox-option-badge">Included</span>
                        </div>

                        <div class="velox-option-card" data-type="logo" data-value="Emblem & Logo">
                            <div class="velox-option-left">
                                <div class="velox-radio-indicator"></div>
                                <div class="velox-option-text">
                                    <strong>Emblem & Logo</strong>
                                    <span>Added logo write-up under the emblem</span>
                                </div>
                            </div>
                            <span class="velox-option-badge">Included</span>
                        </div>

                        <div class="velox-option-card" data-type="logo" data-value="Emblem, Logo & Model Line">
                            <div class="velox-option-left">
                                <div class="velox-radio-indicator"></div>
                                <div class="velox-option-text">
                                    <strong>Emblem, Logo & Model Line</strong>
                                    <span>Emblem, brand logo and your vehicle model line</span>
                                </div>
                            </div>
                            <span class="velox-option-badge">Included</span>
                        </div>
                    </div>
                </div>

                <!-- 04 — EXTRAS -->
                <div class="velox-step-block">
                    <div class="velox-step-label">04 — EXTRAS</div>
                    <div class="velox-option-card" id="veloxExtraEmbroideryCard" data-type="extra" data-price="500">
                        <div class="velox-option-left">
                            <div class="velox-radio-indicator" id="veloxExtraIndicator"></div>
                            <div class="velox-option-text">
                                <strong>Personalized Vehicle Embroidery</strong>
                                <span>Placed on the front grille / registration plate</span>
                            </div>
                        </div>
                        <span class="velox-option-badge">+Rs. 500</span>
                    </div>

                    <!-- Expandable Embroidery Text Input -->
                    <div class="velox-embroidery-box" id="veloxEmbroideryBox">
                        <input type="text" id="veloxEmbroideryInput" class="velox-embroidery-input" placeholder="Enter custom embroidery text (e.g. CIVIC RS or Registration #)">
                    </div>
                </div>

                <!-- DYNAMIC ORDER SUMMARY BOX (VELOX 1:1 REPLICATION) -->
                <div class="velox-summary-box">
                    <div class="velox-summary-row">
                        <span>Cover · {{ $product->name }}</span>
                        <span>{{ $product->formatted_price }}</span>
                    </div>
                    <div class="velox-summary-row">
                        <span>Vehicle · <span id="veloxSumVehicle">Not selected</span></span>
                        <span>—</span>
                    </div>
                    <div class="velox-summary-row">
                        <span>Finish · <span id="veloxSumFinish">Obsidian Black</span></span>
                        <span>—</span>
                    </div>
                    <div class="velox-summary-row">
                        <span>Front logo · <span id="veloxSumLogo">Emblem Only</span></span>
                        <span>—</span>
                    </div>
                    <div class="velox-summary-row">
                        <span>Extras · <span id="veloxSumExtras">None</span></span>
                        <span id="veloxSumExtrasPrice">—</span>
                    </div>

                    <div class="velox-summary-divider"></div>

                    <div class="velox-summary-total-row">
                        <span class="total-label">TOTAL</span>
                        <span class="total-amount" id="veloxSumTotalDisplay">From {{ $product->formatted_price }}</span>
                    </div>
                </div>

                <!-- CTA ACTION BUTTONS -->
                <div style="display:flex; flex-direction:column; gap:12px; margin-bottom: 24px;">
                    <button type="submit" class="btn btn-primary" id="veloxAddToCartBtn" style="width:100%; padding:17px; font-size:0.95rem; font-weight:700;">
                        ADD TO CART
                    </button>
                    <a href="#" id="veloxWaOrderBtn" target="_blank" class="btn btn-whatsapp" style="width:100%; padding:15px; font-size:0.92rem; text-decoration:none;">
                        💬 ORDER CONFIGURATION VIA WHATSAPP
                    </a>
                </div>
            </form>

            <!-- VELOX TRUST GUARANTEE BOX -->
            <div class="velox-guarantee-box">
                <p>
                    <strong>Made to order for your car.</strong> Handcrafted tailoring takes about 2–3 days, then express delivery across all 150+ cities in Pakistan with Cash on Delivery (COD).
                </p>
                <p>
                    <strong>1-year guarantee</strong> against material defects, tearing, and seam failures. <a href="{{ route('about') }}">Warranty details</a>
                </p>
                <p>
                    <strong>Doesn't fit because of an error on our side?</strong> We remake it 100% free of charge. You can cancel for a full refund until custom production starts. <a href="{{ route('contact') }}">Refund & Returns Policy</a>
                </p>
                <p style="margin-bottom:0;">
                    Questions before you order? WhatsApp <a href="https://wa.me/923072818652" target="_blank">+92 307 2818652</a> · <a href="mailto:support@autoshield.pk">support@autoshield.pk</a>
                </p>
            </div>

            <div style="margin-top: 18px; font-family: var(--font-sans); font-size: 0.78rem; color: var(--text-muted); display:flex; gap:20px;">
                <span>SKU: <strong style="color:var(--text-secondary);">SV-{{ strtoupper($product->slug) }}</strong></span>
                <span>Category: <strong style="color:var(--text-secondary);">{{ $product->cat }}</strong></span>
            </div>
        </div>
    </div>

    <!-- VELOX TABS SECTION -->
    <div class="velox-tabs-wrapper">
        <div class="velox-tab-nav">
            <div class="velox-tab-btn active" onclick="switchVeloxTab('desc', this)">Description</div>
            <div class="velox-tab-btn" onclick="switchVeloxTab('specs', this)">Additional information</div>
            <div class="velox-tab-btn" onclick="switchVeloxTab('reviews', this)">Reviews ({{ $product->reviews_count ?? 52 }})</div>
        </div>

        <div class="velox-tab-pane active" id="tab-desc">
            <h3>The Lightest Touch</h3>
            <p>
                Our lightest indoor car cover: soft-touch, unlined and tailored to your coupe or sedan's exact make, model and year. Made to order in 16 colours.
            </p>
            <p>
                Designed for vehicles that rarely leave protected environments or face harsh Pakistani monsoon downpours and blazing summer solar rays. The {{ $product->name }} is built on a single philosophy: the only thing that should ever touch your paintwork is silence and cotton velvet.
            </p>
            <p>
                Constructed from a multi-layer composite textile, it drapes over every body panel the way fabric should — without argument. The paint-safe inner lining prevents swirl marks on ceramic coatings and PPF, while the anti-static treatment actively repels dust particles.
            </p>

            <h4 style="font-family:var(--font-serif); font-size:1.4rem; color:#fff; margin-top:24px; margin-bottom:12px;">Key Properties:</h4>
            <ul class="velox-key-properties-list">
                <li>Bespoke custom-cut silhouette pattern engineered for your exact vehicle</li>
                <li>100% paint-safe FleeceGuard™ soft spun cotton velvet inner lining</li>
                <li>99.5% Solar heat and UV deflection layer preventing clear coat fade</li>
                <li>10,000mm hydrostatic head waterproof barrier against monsoon rains</li>
                <li>Dual click-lock wind straps with reinforced mirror pockets and antenna relief</li>
                <li>Includes luxury matching storage duffle bag with embroidered seal</li>
            </ul>
        </div>

        <div class="velox-tab-pane" id="tab-specs">
            <h3>Technical Specifications</h3>
            <table class="specs-table" style="max-width:700px;">
                <tbody>
                    <tr>
                        <td>Fabric Architecture:</td>
                        <td>{{ $product->fabric_specs ?? '5-Layer Composite Polyethylene Armor' }}</td>
                    </tr>
                    <tr>
                        <td>Waterproof Rating:</td>
                        <td>{{ $product->waterproof_rating ?? '10,000mm Hydrostatic Head (100% Monsoon Proof)' }}</td>
                    </tr>
                    <tr>
                        <td>UV Rejection:</td>
                        <td>{{ $product->uv_protection ?? '99.5% Solar & Thermal Radiation Deflector' }}</td>
                    </tr>
                    <tr>
                        <td>Inner Lining:</td>
                        <td>Soft Scratch-Free Spun-Cotton FleeceGuard™ Velvet</td>
                    </tr>
                    <tr>
                        <td>Wind Resistance:</td>
                        <td>Dual Click-Lock Straps (Rated up to 70 km/h wind gusts)</td>
                    </tr>
                    <tr>
                        <td>Warranty:</td>
                        <td>{{ $product->guarantee ?? '1-Year Comprehensive Replacement Guarantee' }}</td>
                    </tr>
                </tbody>
            </table>
        </div>

        <div class="velox-tab-pane" id="tab-reviews">
            <div style="display:flex; justify-content:space-between; align-items:baseline; margin-bottom: 24px;">
                <h3 style="margin-bottom:0;">Customer Reviews (5.00 out of 5)</h3>
                <span style="color:var(--gold); font-size:1.1rem;">★★★★★</span>
            </div>

            <div style="display:flex; flex-direction:column; gap:16px; max-width:820px;">
                <div style="background:#111115; border:1px solid var(--border); border-radius:var(--radius-sm); padding:22px;">
                    <div style="display:flex; justify-content:space-between; margin-bottom:8px;">
                        <div>
                            <strong style="color:#fff; font-size:0.95rem;">Faiz Shafiq</strong>
                            <span style="font-size:0.75rem; color:var(--text-muted); margin-left:8px;">(BMW M8 Competition)</span>
                        </div>
                        <span style="color:var(--gold);">★★★★★</span>
                    </div>
                    <p style="font-size:0.88rem; color:var(--text-secondary); line-height:1.6; margin-bottom:0;">
                        "One of the best decisions I've made to protect my car. Not just against the sun but even while it's indoors it still keeps my car wash intact for weeks without getting any dust or condensation marks on my BMW M8 Competition."
                    </p>
                </div>

                <div style="background:#111115; border:1px solid var(--border); border-radius:var(--radius-sm); padding:22px;">
                    <div style="display:flex; justify-content:space-between; margin-bottom:8px;">
                        <div>
                            <strong style="color:#fff; font-size:0.95rem;">Jaspreet S Bhatia</strong>
                            <span style="font-size:0.75rem; color:var(--text-muted); margin-left:8px;">(Porsche Carrera Turbo S)</span>
                        </div>
                        <span style="color:var(--gold);">★★★★★</span>
                    </div>
                    <p style="font-size:0.88rem; color:var(--text-secondary); line-height:1.6; margin-bottom:0;">
                        "I bought a Velox cover for my Carrera Turbo S and my word it's so silky and so intelligently made. Putting the cover on is intuitive and highly recommend this product!"
                    </p>
                </div>

                <div style="background:#111115; border:1px solid var(--border); border-radius:var(--radius-sm); padding:22px;">
                    <div style="display:flex; justify-content:space-between; margin-bottom:8px;">
                        <div>
                            <strong style="color:#fff; font-size:0.95rem;">Hamza Tariq (Lahore)</strong>
                            <span style="font-size:0.75rem; color:var(--text-muted); margin-left:8px;">(Honda Civic RS 2024)</span>
                        </div>
                        <span style="color:var(--gold);">★★★★★</span>
                    </div>
                    <p style="font-size:0.88rem; color:var(--text-secondary); line-height:1.6; margin-bottom:0;">
                        "The cotton fleece inside is so silky and doesn't leave a single swirl mark on my ceramic coating. The fitment around the side mirrors is 100% exact. Truly bespoke level quality."
                    </p>
                </div>
            </div>
        </div>
    </div>

    <!-- RELATED PRODUCTS (VELOX 4-ROW SPEC MATRIX STYLE) -->
    <div style="margin-top: 60px;">
        <h2 style="font-family: var(--font-serif); font-size: 2.2rem; font-weight: 300; margin-bottom: 28px; color: #fff;">
            Related products
        </h2>

        <div class="velox-related-grid">
            <article class="velox-related-card">
                <div class="velox-related-thumb">
                    <a href="{{ route('shop.index') }}">
                        <img src="{{ asset('images/covers/civic_velvet_bespoke.jpg') }}" alt="Honda Civic Bespoke Velvet Armor">
                    </a>
                </div>
                <div class="velox-related-body">
                    <div class="velox-related-cat">Indoor & Outdoor</div>
                    <h3 class="velox-related-title">
                        <a href="{{ route('shop.index') }}">Civic Bespoke Velvet Armor</a>
                    </h3>
                    <div class="velox-related-price">From Rs. 7,499</div>

                    <table class="velox-spec-table">
                        <tr><td>USE</td><td>All-Weather</td></tr>
                        <tr><td>LINING</td><td>Soft Cotton Fleece</td></tr>
                        <tr><td>PROTECTION</td><td>10,000mm Rainproof</td></tr>
                        <tr><td>FINISH</td><td>5-Layer Composite</td></tr>
                    </table>
                </div>
            </article>

            <article class="velox-related-card">
                <div class="velox-related-thumb">
                    <a href="{{ route('shop.index') }}">
                        <img src="{{ asset('images/covers/corolla_silver_shield.jpg') }}" alt="Toyota Corolla Silver Shield">
                    </a>
                </div>
                <div class="velox-related-body">
                    <div class="velox-related-cat">Solar Deflection</div>
                    <h3 class="velox-related-title">
                        <a href="{{ route('shop.index') }}">Corolla Altis All-Weather Shield</a>
                    </h3>
                    <div class="velox-related-price">From Rs. 7,499</div>

                    <table class="velox-spec-table">
                        <tr><td>USE</td><td>Solar UV Guard</td></tr>
                        <tr><td>LINING</td><td>Brushed Cotton</td></tr>
                        <tr><td>PROTECTION</td><td>99.5% UV Barrier</td></tr>
                        <tr><td>FINISH</td><td>Aluminum Foil</td></tr>
                    </table>
                </div>
            </article>

            <article class="velox-related-card">
                <div class="velox-related-thumb">
                    <a href="{{ route('shop.index') }}">
                        <img src="{{ asset('images/covers/fortuner_armor_suv.jpg') }}" alt="Toyota Fortuner SUV Armor Shield">
                    </a>
                </div>
                <div class="velox-related-body">
                    <div class="velox-related-cat">Heavy 4x4 Shield</div>
                    <h3 class="velox-related-title">
                        <a href="{{ route('shop.index') }}">Fortuner Heavy Armor SUV Cover</a>
                    </h3>
                    <div class="velox-related-price">From Rs. 9,999</div>

                    <table class="velox-spec-table">
                        <tr><td>USE</td><td>SUV & Crossover</td></tr>
                        <tr><td>LINING</td><td>Thick Velvet Layer</td></tr>
                        <tr><td>PROTECTION</td><td>Submersion Sealed</td></tr>
                        <tr><td>FINISH</td><td>Oxford Heavy Duty</td></tr>
                    </table>
                </div>
            </article>
        </div>
    </div>
</main>

<!-- VELOX STICKY BOTTOM QUICK BUY BAR -->
<div class="velox-sticky-bar" id="veloxStickyBar">
    <div class="velox-sticky-container">
        <div class="velox-sticky-info">
            <img src="{{ asset($product->image) }}" class="velox-sticky-thumb" id="veloxStickyThumb" alt="{{ $product->name }}">
            <div>
                <div class="velox-sticky-title">{{ $product->name }}</div>
                <div class="velox-sticky-meta">
                    <span class="velox-sticky-dot" id="veloxStickyDot" style="background:#111111;"></span>
                    <span id="veloxStickyMetaText">Obsidian Black · Stock Pattern</span>
                </div>
            </div>
        </div>
        <div class="velox-sticky-actions">
            <div class="velox-sticky-price" id="veloxStickyPrice">{{ $product->formatted_price }}</div>
            <button type="button" class="velox-sticky-btn" id="veloxStickyAddBtn">ADD TO CART</button>
        </div>
    </div>
</div>
@endsection

@push('scripts')
<script>
    // Car Makes & Corresponding Popular Models Database
    const vehicleModelsData = {
        'Porsche': ['911 Coupe (992 / 991)', '718 Cayman', '718 Boxster', 'Taycan', 'Panamera', 'Macan', 'Cayenne', '911 GT3 / GT3 RS'],
        'BMW': ['3 Series (G20 / F30)', '5 Series (G30 / G60)', '7 Series', '4 Series Gran Coupe', 'M2 / M3 / M4', 'M5', 'X1 / X3', 'X5 / X7', 'Z4 Roadster'],
        'Mercedes-Benz': ['C-Class (W206 / W205)', 'E-Class (W213 / W214)', 'S-Class (W223 / W222)', 'CLA Coupe', 'CLS 4-Door', 'AMG GT Coupe', 'G-Wagon (G63)', 'GLC / GLE'],
        'Audi': ['A4 Sedan', 'A5 Sportback', 'A6', 'A7 Sportback', 'A8', 'e-tron GT', 'RS5 / RS6', 'R8 V10', 'Q5 / Q7 / Q8'],
        'Toyota': ['Corolla (Altis / Grande / 1.6)', 'Yaris (Ativ / GLI)', 'Camry', 'Fortuner / Legender', 'Hilux Revo / Rocco', 'Land Cruiser LC300 / LC200', 'Prado TX / TZ', 'Prius / Aqua', 'Crown'],
        'Honda': ['Civic (11th Gen RS / Turbo)', 'Civic X (2016-2021)', 'Civic Reborn / Rebirth', 'City (Aspire / 1.5)', 'Accord', 'Vezel / HR-V', 'BR-V', 'CR-V'],
        'Suzuki': ['Alto (660cc)', 'Cultus (New Auto Gear)', 'Swift (New 1.2 / DLX)', 'Wagon R', 'Mehran', 'Jimny 4x4'],
        'Hyundai': ['Elantra (1.6 / 2.0)', 'Sonata (2.0 / 2.5)', 'Tucson (FWD / AWD)', 'Santa Fe', 'Ioniq 5 / Ioniq 6'],
        'Kia': ['Sportage (Alpha / FWD / AWD)', 'Sorento', 'Stinger', 'Picanto', 'Carnival'],
        'MG': ['MG HS (Exclusive / PHEV)', 'MG ZS', 'MG GT', 'MG4 EV'],
        'Haval': ['H6 HEV', 'H6 2.0T', 'Jolion'],
        'Changan': ['Alsvin (Lumiere)', 'Oshan X7', 'Karvaan'],
        'Lexus': ['ES350 / ES300h', 'LS500', 'LC500 Coupe', 'LX600 / LX570', 'RX350'],
        'Nissan': ['GT-R R35', 'Patrol Y62', 'Sunny', 'Kicks', 'Note e-Power'],
        'Volkswagen': ['Golf / Golf GTI', 'Passat', 'Arteon', 'Tiguan', 'Touareg'],
        'Other': ['Custom Vehicle Pattern (Specify below)']
    };

    // State Variables
    let currentBasePrice = {{ (float)$product->price }};
    let extraPrice = 0;
    let selectedMake = '';
    let selectedModel = '';
    let selectedYear = '2026 Model';
    let selectedMods = 'Stock Body';
    let selectedFinishName = 'Obsidian Black';
    let selectedFinishColor = '#111111';
    let selectedLogo = 'Emblem Only';
    let isEmbroiderySelected = false;
    let customEmbroideryText = '';

    // Initialize Configurator Once DOM is Ready
    document.addEventListener('DOMContentLoaded', function() {
        initVehicleSelector();
        initSwatches();
        initLogoOptions();
        initExtrasOption();
        initFormSubmission();
        initStickyBar();
        updateFullSummary();
    });

    // 01 — Vehicle Dropdowns Setup
    function initVehicleSelector() {
        const makeSelect = document.getElementById('veloxMake');
        const modelSelect = document.getElementById('veloxModel');
        const yearSelect = document.getElementById('veloxYear');
        const modsSelect = document.getElementById('veloxMods');
        const customBox = document.getElementById('veloxCustomModelBox');
        const customInput = document.getElementById('veloxCustomModelInput');

        if (!makeSelect || !modelSelect) return;

        makeSelect.addEventListener('change', function() {
            selectedMake = this.value;
            modelSelect.innerHTML = '<option value="">Select Model</option>';

            if (selectedMake === 'Other') {
                customBox.classList.add('open');
                modelSelect.innerHTML = '<option value="Custom Fit">Custom / Other Model</option>';
                selectedModel = customInput.value || 'Custom Fit';
            } else if (vehicleModelsData[selectedMake]) {
                customBox.classList.remove('open');
                vehicleModelsData[selectedMake].forEach(function(mod) {
                    const opt = document.createElement('option');
                    opt.value = mod;
                    opt.textContent = mod;
                    modelSelect.appendChild(opt);
                });
                const otherOpt = document.createElement('option');
                otherOpt.value = 'Other';
                otherOpt.textContent = 'Other ' + selectedMake + ' Model...';
                modelSelect.appendChild(otherOpt);
                selectedModel = '';
            } else {
                customBox.classList.remove('open');
                selectedModel = '';
            }
            updateFullSummary();
        });

        modelSelect.addEventListener('change', function() {
            if (this.value === 'Other') {
                customBox.classList.add('open');
                selectedModel = customInput.value || 'Custom Model';
            } else {
                if (selectedMake !== 'Other') customBox.classList.remove('open');
                selectedModel = this.value;
            }
            updateFullSummary();
        });

        if (customInput) {
            customInput.addEventListener('input', function() {
                selectedModel = this.value.trim() || 'Custom Vehicle Pattern';
                updateFullSummary();
            });
        }

        if (yearSelect) {
            yearSelect.addEventListener('change', function() {
                selectedYear = this.value;
                updateFullSummary();
            });
        }

        if (modsSelect) {
            modsSelect.addEventListener('change', function() {
                selectedMods = this.value;
                updateFullSummary();
            });
        }
    }

    // 02 — Finish (Color Swatches) Setup
    function initSwatches() {
        const swatches = document.querySelectorAll('.velox-swatch-btn');
        const finishLabel = document.getElementById('veloxFinishLabel');
        const colorTint = document.getElementById('veloxColorTint');

        swatches.forEach(function(btn) {
            btn.addEventListener('click', function() {
                swatches.forEach(el => el.classList.remove('active'));
                this.classList.add('active');

                selectedFinishName = this.getAttribute('data-color');
                selectedFinishColor = this.style.backgroundColor || '#111111';
                const tint = this.getAttribute('data-tint');

                if (finishLabel) finishLabel.textContent = selectedFinishName;

                // Visual live cover tint effect on vehicle photo
                if (colorTint) {
                    if (tint && tint !== 'none') {
                        colorTint.style.backgroundColor = tint;
                        colorTint.style.opacity = '0.55';
                    } else {
                        colorTint.style.opacity = '0';
                    }
                }

                updateFullSummary();
            });
        });
    }

    // 03 — Front Hood Logo Options Setup
    function initLogoOptions() {
        const logoCards = document.querySelectorAll('.velox-option-card[data-type="logo"]');
        logoCards.forEach(function(card) {
            card.addEventListener('click', function() {
                logoCards.forEach(c => c.classList.remove('active'));
                this.classList.add('active');
                selectedLogo = this.getAttribute('data-value');
                updateFullSummary();
            });
        });
    }

    // 04 — Extras (Personalized Embroidery) Setup
    function initExtrasOption() {
        const extraCard = document.getElementById('veloxExtraEmbroideryCard');
        const extraBox = document.getElementById('veloxEmbroideryBox');
        const extraInput = document.getElementById('veloxEmbroideryInput');

        if (!extraCard) return;

        extraCard.addEventListener('click', function(e) {
            if (e.target === extraInput) return; // Prevent toggle when clicking inside text input
            isEmbroiderySelected = !isEmbroiderySelected;

            if (isEmbroiderySelected) {
                this.classList.add('active');
                extraBox.classList.add('open');
                extraPrice = 500;
                if (extraInput) extraInput.focus();
            } else {
                this.classList.remove('active');
                extraBox.classList.remove('open');
                extraPrice = 0;
            }
            updateFullSummary();
        });

        if (extraInput) {
            extraInput.addEventListener('input', function() {
                customEmbroideryText = this.value.trim();
                updateFullSummary();
            });
        }
    }

    // Global Order Summary & Dynamic Price Calculation
    function updateFullSummary() {
        const total = currentBasePrice + extraPrice;
        const formattedTotal = 'Rs. ' + total.toLocaleString('en-US');

        // 1. Vehicle String
        let vehicleString = 'Stock Pattern';
        if (selectedMake && selectedModel) {
            vehicleString = selectedMake + ' ' + selectedModel + ' (' + selectedYear + (selectedMods !== 'Stock Body' ? ', ' + selectedMods : '') + ')';
        } else if (selectedMake) {
            vehicleString = selectedMake + ' (' + selectedYear + ')';
        }

        // 2. Extras String
        let extrasString = 'None';
        if (isEmbroiderySelected) {
            extrasString = 'Personalized Embroidery' + (customEmbroideryText ? ' ("' + customEmbroideryText + '")' : '');
        }

        // 3. Update Summary Display Elements
        const sumVehicle = document.getElementById('veloxSumVehicle');
        const sumFinish = document.getElementById('veloxSumFinish');
        const sumLogo = document.getElementById('veloxSumLogo');
        const sumExtras = document.getElementById('veloxSumExtras');
        const sumExtrasPrice = document.getElementById('veloxSumExtrasPrice');
        const sumTotal = document.getElementById('veloxSumTotalDisplay');
        const displayPrice = document.getElementById('veloxDisplayPrice');

        if (sumVehicle) sumVehicle.textContent = vehicleString !== 'Stock Pattern' ? vehicleString : 'Not selected';
        if (sumFinish) sumFinish.textContent = selectedFinishName;
        if (sumLogo) sumLogo.textContent = selectedLogo;
        if (sumExtras) sumExtras.textContent = extrasString;
        if (sumExtrasPrice) sumExtrasPrice.textContent = isEmbroiderySelected ? '+Rs. 500' : '—';
        if (sumTotal) sumTotal.textContent = (vehicleString === 'Stock Pattern' ? 'From ' : '') + formattedTotal;
        if (displayPrice) displayPrice.textContent = formattedTotal;

        // 4. Update Hidden Form Inputs
        document.getElementById('hiddenVehicle').value = vehicleString;
        document.getElementById('hiddenFinish').value = selectedFinishName;
        document.getElementById('hiddenLogo').value = selectedLogo;
        document.getElementById('hiddenExtras').value = isEmbroiderySelected ? extrasString : 'None';

        // 5. Update Sticky Bar Elements
        const stickyDot = document.getElementById('veloxStickyDot');
        const stickyMeta = document.getElementById('veloxStickyMetaText');
        const stickyPrice = document.getElementById('veloxStickyPrice');

        if (stickyDot) stickyDot.style.backgroundColor = selectedFinishColor;
        if (stickyMeta) stickyMeta.textContent = selectedFinishName + ' · ' + (selectedMake ? selectedMake : 'Custom Tailored');
        if (stickyPrice) stickyPrice.textContent = formattedTotal;

        // 6. Update WhatsApp Direct Order Link
        const waBtn = document.getElementById('veloxWaOrderBtn');
        if (waBtn) {
            const waMsg = encodeURIComponent(
                "Hello AutoShield! I would like to order a bespoke vehicle cover:\n\n" +
                "• Cover: {{ $product->name }}\n" +
                "• Vehicle: " + vehicleString + "\n" +
                "• Finish Color: " + selectedFinishName + "\n" +
                "• Front Hood Logo: " + selectedLogo + "\n" +
                "• Extras: " + extrasString + "\n" +
                "• Total Price: " + formattedTotal + "\n\n" +
                "Please confirm my order. Thank you!"
            );
            waBtn.href = "https://wa.me/923072818652?text=" + waMsg;
        }
    }

    // Form Submission & AJAX Cart Addition
    function initFormSubmission() {
        const form = document.getElementById('veloxConfigForm');
        const stickyAddBtn = document.getElementById('veloxStickyAddBtn');
        const submitBtn = document.getElementById('veloxAddToCartBtn');

        if (stickyAddBtn && form) {
            stickyAddBtn.addEventListener('click', function() {
                form.requestSubmit();
            });
        }

        if (form) {
            form.addEventListener('submit', function(e) {
                e.preventDefault();

                // Gentle validation reassurance
                if (!selectedMake) {
                    const makeSelect = document.getElementById('veloxMake');
                    makeSelect.style.borderColor = 'var(--gold)';
                    makeSelect.focus();
                    if (window.showWishlistToast) {
                        window.showWishlistToast('Please select your vehicle make to ensure exact tailored fitment.');
                    }
                    return;
                }

                if (submitBtn) {
                    submitBtn.disabled = true;
                    submitBtn.textContent = 'ADDING TO CART...';
                }

                const formData = new FormData(form);

                fetch(form.action, {
                    method: 'POST',
                    headers: {
                        'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content'),
                        'Accept': 'application/json'
                    },
                    body: formData
                })
                .then(res => res.json())
                .then(data => {
                    if (submitBtn) {
                        submitBtn.disabled = false;
                        submitBtn.textContent = 'ADD TO CART';
                    }

                    if (data.status === 'success') {
                        // Update cart count badges
                        document.querySelectorAll('#cartCount, .cart-count-badge').forEach(function(badge) {
                            badge.textContent = data.cartCount;
                            badge.style.display = data.cartCount > 0 ? 'inline-block' : 'none';
                        });

                        // Populate and slide open cart drawer
                        if (typeof window.renderCartDrawer === 'function') {
                            window.renderCartDrawer(data);
                        } else if (typeof window.openCartDrawer === 'function') {
                            window.openCartDrawer();
                        } else {
                            const drawer = document.getElementById('cartDrawer');
                            const overlay = document.getElementById('cartDrawerOverlay');
                            if (drawer) drawer.classList.add('open');
                            if (overlay) overlay.classList.add('open');
                        }

                        if (typeof window.showWishlistToast === 'function') {
                            window.showWishlistToast('✓ ' + data.message);
                        }
                    }
                })
                .catch(err => {
                    console.error('Cart add error:', err);
                    if (submitBtn) {
                        submitBtn.disabled = false;
                        submitBtn.textContent = 'ADD TO CART';
                    }
                    form.submit(); // Standard fallback
                });
            });
        }
    }

    // Sticky Quick Buy Bar Behavior
    function initStickyBar() {
        const stickyBar = document.getElementById('veloxStickyBar');
        const triggerBtn = document.getElementById('veloxAddToCartBtn');

        if (!stickyBar || !triggerBtn) return;

        window.addEventListener('scroll', function() {
            const rect = triggerBtn.getBoundingClientRect();
            if (rect.bottom < 0) {
                stickyBar.classList.add('visible');
            } else {
                stickyBar.classList.remove('visible');
            }
        });
    }

    // Gallery Thumbnail Selection
    function selectVeloxThumb(elem, imgSrc) {
        document.querySelectorAll('.velox-thumb-item').forEach(el => el.classList.remove('active'));
        elem.classList.add('active');
        const mainImg = document.getElementById('veloxMainImg');
        const stickyThumb = document.getElementById('veloxStickyThumb');
        if (mainImg) mainImg.src = imgSrc;
        if (stickyThumb) stickyThumb.src = imgSrc;
    }

    // Tab Navigation
    function switchVeloxTab(tabKey, btnElem) {
        document.querySelectorAll('.velox-tab-btn').forEach(btn => btn.classList.remove('active'));
        document.querySelectorAll('.velox-tab-pane').forEach(pane => pane.classList.remove('active'));
        btnElem.classList.add('active');
        const pane = document.getElementById('tab-' + tabKey);
        if (pane) pane.classList.add('active');
    }
</script>
@endpush
