/**
 * AutoShield Premier E-Commerce Engine
 * Features: Slide-Out Cart Drawer, Dynamic Fit Finder, 5-Layer Tech Cutaway, Quick View Modal, WhatsApp Fast Order
 */

document.addEventListener('DOMContentLoaded', function () {
    initFitFinder();
    initSlideCart();
    initTechCutaway();
    initQuickView();
    initWhatsAppModal();
    initFaqAccordion();
    initStickyPdpBar();
    initWishlist();
    initVeloxConfigurator();
    initHeaderSearch();
    initMobileNav();
});

/* ==========================================================================
   1. VEHICLE FIT FINDER ENGINE
   ========================================================================== */
const VEHICLE_DATA = {
    'Porsche': ['911 Coupe (992 / 991)', '718 Cayman', '718 Boxster', 'Taycan', 'Panamera', 'Macan', 'Cayenne', '911 GT3 / GT3 RS'],
    'BMW': ['3 Series (G20 / F30)', '5 Series (G30 / G60)', '7 Series', '4 Series Gran Coupe', 'M2 / M3 / M4', 'M5', 'X1 / X3', 'X5 / X7', 'Z4 Roadster'],
    'Mercedes-Benz': ['C-Class (W206 / W205)', 'E-Class (W213 / W214)', 'S-Class (W223 / W222)', 'CLA Coupe', 'CLS 4-Door', 'AMG GT Coupe', 'G-Wagon (G63)', 'GLC / GLE'],
    'Audi': ['A4 Sedan', 'A5 Sportback', 'A6', 'A7 Sportback', 'A8', 'e-tron GT', 'RS5 / RS6', 'R8 V10', 'Q5 / Q7 / Q8'],
    'Toyota': ['Corolla (Altis / Grande / 1.6)', 'Yaris (Ativ / GLI)', 'Camry', 'Fortuner / Legender', 'Hilux Revo / Rocco', 'Land Cruiser LC300 / LC200', 'Prado TX / TZ', 'Prius / Aqua', 'Crown'],
    'Honda': ['Civic (11th Gen RS / Turbo)', 'Civic X (2016-2021)', 'Civic Reborn / Rebirth', 'City (Aspire / 1.5)', 'Accord', 'Vezel / HR-V', 'BR-V', 'CR-V'],
    'Suzuki': ['Alto (660cc)', 'Cultus (New Auto Gear)', 'Swift (New 1.2 / DLX)', 'Wagon R', 'Mehran', 'Jimny 4x4'],
    'Kia': ['Sportage (Alpha / FWD / AWD)', 'Sorento', 'Picanto', 'Stinger', 'Carnival'],
    'Hyundai': ['Elantra (1.6 / 2.0)', 'Sonata (2.0 / 2.5)', 'Tucson (FWD / AWD)', 'Santa Fe', 'Ioniq 5 / Ioniq 6'],
    'MG': ['MG HS (Exclusive / PHEV)', 'MG ZS', 'MG GT', 'MG4 EV'],
    'Haval': ['H6 HEV', 'H6 2.0T', 'Jolion'],
    'Changan': ['Alsvin (Lumiere)', 'Oshan X7', 'Karvaan'],
    'Lexus': ['ES350 / ES300h', 'LS500', 'LC500 Coupe', 'LX600 / LX570', 'RX350'],
    'Nissan': ['GT-R R35', 'Patrol Y62', 'Sunny', 'Kicks', 'Note e-Power'],
    'Volkswagen': ['Golf / Golf GTI', 'Passat', 'Arteon', 'Tiguan', 'Touareg'],
    'Daihatsu': ['Mira', 'Move', 'Cuore', 'Cast', 'Taft']
};

function initFitFinder() {
    const makeSelect = document.getElementById('fitMake');
    const modelSelect = document.getElementById('fitModel');
    const guaranteeBadge = document.getElementById('fitGuaranteeBadge');

    if (!makeSelect || !modelSelect) return;

    makeSelect.addEventListener('change', function () {
        const selectedMake = this.value;
        modelSelect.innerHTML = '<option value="">2. Select Model (e.g. Civic, Corolla)</option>';

        if (selectedMake && VEHICLE_DATA[selectedMake]) {
            VEHICLE_DATA[selectedMake].forEach(model => {
                const opt = document.createElement('option');
                opt.value = model.split(' ')[0]; // use clean query keyword
                opt.textContent = `${selectedMake} ${model}`;
                modelSelect.appendChild(opt);
            });
            modelSelect.disabled = false;
        }

        updateGuaranteePill();
    });

    modelSelect.addEventListener('change', updateGuaranteePill);

    function updateGuaranteePill() {
        if (!guaranteeBadge) return;
        const make = makeSelect.value;
        const model = modelSelect.value;
        if (make && model) {
            guaranteeBadge.innerHTML = `<span class="pulse-green"></span> 100% Guaranteed Exact Fit for ${make} ${model}`;
            guaranteeBadge.style.display = 'inline-flex';
        } else if (make) {
            guaranteeBadge.innerHTML = `<span class="pulse-green"></span> Guaranteed Custom Pattern for ${make}`;
            guaranteeBadge.style.display = 'inline-flex';
        } else {
            guaranteeBadge.innerHTML = `<span class="pulse-green"></span> 100% Exact Fitment Guarantee`;
        }
    }

    // Quick chip buttons
    document.querySelectorAll('.quick-chip').forEach(chip => {
        chip.addEventListener('click', function () {
            const make = this.getAttribute('data-make');
            const model = this.getAttribute('data-model');
            if (makeSelect) {
                makeSelect.value = make;
                makeSelect.dispatchEvent(new Event('change'));
                setTimeout(() => {
                    if (modelSelect) {
                        modelSelect.value = model;
                        modelSelect.dispatchEvent(new Event('change'));
                        const form = makeSelect.closest('form');
                        if (form) form.submit();
                    }
                }, 100);
            }
        });
    });
}

/* ==========================================================================
   2. SLIDE-OUT CART DRAWER (Offcanvas AJAX Cart)
   ========================================================================== */
function initSlideCart() {
    const overlay = document.getElementById('cartDrawerOverlay');
    const drawer = document.getElementById('cartDrawer');
    const closeBtn = document.getElementById('cartDrawerClose');
    const cartTriggers = document.querySelectorAll('[data-cart-trigger], .icon-btn[title="Shopping Cart"]');

    if (!drawer) return;

    // Open Cart Drawer
    window.openCartDrawer = function () {
        drawer.classList.add('active');
        if (overlay) overlay.classList.add('active');
        document.body.style.overflow = 'hidden';
        refreshCartDrawer();
    };

    // Close Cart Drawer
    window.closeCartDrawer = function () {
        drawer.classList.remove('active');
        if (overlay) overlay.classList.remove('active');
        document.body.style.overflow = '';
    };

    if (closeBtn) closeBtn.addEventListener('click', closeCartDrawer);
    if (overlay) overlay.addEventListener('click', closeCartDrawer);

    cartTriggers.forEach(btn => {
        btn.addEventListener('click', function (e) {
            e.preventDefault();
            openCartDrawer();
        });
    });

    // Intercept standard Add-To-Cart forms for smooth AJAX slide-in
    document.addEventListener('submit', function (e) {
        const form = e.target;
        if (form.action && form.action.includes('/cart/add')) {
            e.preventDefault();
            const submitBtn = form.querySelector('button[type="submit"]');
            const originalText = submitBtn ? submitBtn.innerHTML : '';
            if (submitBtn) {
                submitBtn.disabled = true;
                submitBtn.innerHTML = 'Adding... ⏳';
            }

            const formData = new FormData(form);
            const csrfToken = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content');

            fetch(form.action, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'X-Requested-With': 'XMLHttpRequest',
                    'X-CSRF-TOKEN': csrfToken || ''
                },
                body: formData
            })
            .then(res => res.json())
            .then(data => {
                if (data.status === 'success') {
                    renderCartItems(data);
                    openCartDrawer();
                } else {
                    form.submit(); // fallback
                }
            })
            .catch(() => form.submit())
            .finally(() => {
                if (submitBtn) {
                    submitBtn.disabled = false;
                    submitBtn.innerHTML = originalText;
                }
            });
        }
    });
}

function refreshCartDrawer() {
    fetch('/cart/data', {
        headers: { 'Accept': 'application/json', 'X-Requested-With': 'XMLHttpRequest' }
    })
    .then(res => res.json())
    .then(data => renderCartItems(data))
    .catch(err => console.error('Cart refresh error:', err));
}

function renderCartItems(data) {
    const list = document.getElementById('drawerCartList');
    const subtotalEl = document.getElementById('drawerSubtotal');
    const cartCountEls = document.querySelectorAll('#cartCount, .cart-count-badge');
    const fillBar = document.getElementById('shippingProgressFill');
    const fillText = document.getElementById('shippingBarText');
    const waCheckoutBtn = document.getElementById('drawerWaCheckout');

    // Update cart counts
    if (cartCountEls) {
        cartCountEls.forEach(el => el.textContent = data.cartCount || 0);
    }

    // Update free shipping bar (Threshold: Rs 5,000)
    const subtotal = data.subtotal || 0;
    const threshold = 5000;
    const progressPct = Math.min(100, Math.round((subtotal / threshold) * 100));

    if (fillBar) fillBar.style.width = `${progressPct}%`;
    if (fillText) {
        if (subtotal >= threshold) {
            fillText.innerHTML = `🎉 <strong>FREE Nationwide Delivery Unlocked!</strong> (Orders over Rs. 5,000 ship free)`;
        } else {
            const needed = threshold - subtotal;
            fillText.innerHTML = `🚚 Add <strong>Rs. ${needed.toLocaleString()}</strong> more to unlock <strong>FREE Delivery!</strong>`;
        }
    }

    if (subtotalEl) {
        subtotalEl.textContent = `Rs. ${subtotal.toLocaleString()}`;
    }

    if (!list) return;

    if (!data.cart || data.cart.length === 0) {
        list.innerHTML = `
            <div class="cart-drawer-empty">
                <div>🛒</div>
                <p>Your protective cover cart is currently empty.</p>
                <a href="/shop" class="btn btn-outline btn-sm" style="margin-top: 14px;" onclick="closeCartDrawer()">Browse Catalogue →</a>
            </div>
        `;
        if (waCheckoutBtn) waCheckoutBtn.style.display = 'none';
        return;
    }

    if (waCheckoutBtn) waCheckoutBtn.style.display = 'flex';

    let html = '';
    let waSummary = 'Salam AutoShield! I want to order the following covers:%0A';

    data.cart.forEach(item => {
        waSummary += `• ${item.name} (${item.size}) x${item.quantity} = Rs. ${(item.price * item.quantity).toLocaleString()}%0A`;
        html += `
            <div class="cart-drawer-item">
                <img src="/${item.image}" alt="${item.name}" class="drawer-item-thumb">
                <div class="drawer-item-details">
                    <div class="drawer-item-title">${item.name}</div>
                    <div class="drawer-item-size">Fit: ${item.size}</div>
                    <div class="drawer-item-row">
                        <div class="drawer-item-price">Rs. ${(item.price * item.quantity).toLocaleString()}</div>
                        <div class="drawer-qty-group">
                            <button type="button" class="drawer-qty-btn" onclick="updateItemQuantity('${item.cart_key}', ${item.quantity - 1})">-</button>
                            <span class="drawer-qty-num">${item.quantity}</span>
                            <button type="button" class="drawer-qty-btn" onclick="updateItemQuantity('${item.cart_key}', ${item.quantity + 1})">+</button>
                        </div>
                        <button type="button" class="drawer-remove-btn" title="Remove cover" onclick="removeItemFromCart('${item.cart_key}')">🗑️</button>
                    </div>
                </div>
            </div>
        `;
    });

    waSummary += `%0ATotal Bill: Rs. ${subtotal.toLocaleString()} (Cash on Delivery)`;
    if (waCheckoutBtn) {
        waCheckoutBtn.href = `https://wa.me/923072818652?text=${waSummary}`;
    }

    list.innerHTML = html;
}

window.updateItemQuantity = function (cartKey, newQty) {
    if (newQty <= 0) {
        removeItemFromCart(cartKey);
        return;
    }
    const csrfToken = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content');
    fetch('/cart/update', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'X-Requested-With': 'XMLHttpRequest',
            'X-CSRF-TOKEN': csrfToken || ''
        },
        body: JSON.stringify({ cart_key: cartKey, quantity: newQty })
    })
    .then(res => res.json())
    .then(data => renderCartItems(data))
    .catch(err => console.error(err));
};

window.removeItemFromCart = function (cartKey) {
    const csrfToken = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content');
    fetch(`/cart/remove/${cartKey}`, {
        method: 'DELETE',
        headers: {
            'Accept': 'application/json',
            'X-Requested-With': 'XMLHttpRequest',
            'X-CSRF-TOKEN': csrfToken || ''
        }
    })
    .then(res => res.json())
    .then(data => renderCartItems(data))
    .catch(err => console.error(err));
};

/* ==========================================================================
   3. 5-LAYER FABRIC ARMOR CUTAWAY INTERACTION
   ========================================================================== */
const LAYER_SPECS = [
    {
        num: 1,
        title: 'Layer 1: Reflective Aluminum UV Shield',
        subtitle: 'Reflects 99.5% Solar Radiation',
        badge: 'UV 99.5% BLOCK',
        details: 'Micro-thin diamond foil reflects intense sun & UV rays, stopping clear-coat fade and dashboard cracking.',
        specs: [
            ['Solar Heat Deflection:', '99.5% Solar Heat Reflected'],
            ['Surface Finish:', 'Diamond Anodized Foil'],
            ['Max Temp Resistance:', 'Rated up to 65°C']
        ]
    },
    {
        num: 2,
        title: 'Layer 2: Hydro-Tough™ Waterproof Membrane',
        subtitle: '10,000mm Hydrostatic Waterproof Seal',
        badge: '100% MONSOON SAFE',
        details: 'Seamless high-pressure PE barrier with ultrasonic welds ensures zero water penetration in heavy torrential rains.',
        specs: [
            ['Hydrostatic Head:', '10,000 mm Pressure Rating'],
            ['Seam Construction:', 'Heat-Sealed Ultrasonic Welds'],
            ['Penetration Test:', 'Zero Droplet Seepage']
        ]
    },
    {
        num: 3,
        title: 'Layer 3: Impact-Absorbing EVA Cushion',
        subtitle: 'Shock Absorption & Scratch Prevention',
        badge: 'SHOCK ABSORBER',
        details: 'Elastic closed-cell foam absorbs impacts from falling twigs, gravel, hailstones, and abrasive cat claws.',
        specs: [
            ['Impact Absorption:', 'High-Density Elastic EVA Foam'],
            ['Memory Recovery:', '98% Shape Retention'],
            ['Tear Resistance:', 'Cross-Stitched Ripstop Grid']
        ]
    },
    {
        num: 4,
        title: 'Layer 4: Micro-Porous Breathable Scrim',
        subtitle: 'Prevents Trapped Vapor & Mildew',
        badge: 'AIRFLOW ACTIVE',
        details: 'Engineered micro-pores allow trapped engine heat and condensation to evaporate outward, preventing paint rust.',
        specs: [
            ['Vapor Transmission:', '8,000 g/m²/24hr Vapor Rate'],
            ['Condensation Defense:', 'Zero Trapped Moisture'],
            ['Ventilation:', 'Dual Underbody Wind Flaps']
        ]
    },
    {
        num: 5,
        title: 'Layer 5: Scratch-Free Cotton FleeceGuard™ Lining',
        subtitle: 'Gentle on Clear Coats & Ceramic Wax',
        badge: 'CERAMIC SAFE',
        details: 'Ultra-soft spun cotton velvet hugs your vehicle body with zero friction marks, 100% safe for ceramic & PPF.',
        specs: [
            ['Lining Material:', '100% Spun Cotton Micro-Velvet'],
            ['Friction Rating:', 'Zero Swirl Marks / Zero Scuff'],
            ['Compatibility:', 'Safe for Wax, Polish, Ceramic & PPF']
        ]
    }
];

function initTechCutaway() {
    const layerRows = document.querySelectorAll('.layer-row');
    const detailCard = document.getElementById('techDetailCard');

    if (!layerRows.length || !detailCard) return;

    layerRows.forEach((row, idx) => {
        row.addEventListener('click', function () {
            layerRows.forEach(r => r.classList.remove('active'));
            this.classList.add('active');
            renderLayerDetail(idx);
        });
    });

    function renderLayerDetail(idx) {
        const item = LAYER_SPECS[idx];
        if (!item) return;

        let specsHtml = '';
        item.specs.forEach(s => {
            specsHtml += `
                <div class="tech-spec-row">
                    <span>${s[0]}</span>
                    <span>${s[1]}</span>
                </div>
            `;
        });

        detailCard.innerHTML = `
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:14px;">
                <span class="eyebrow">${item.badge}</span>
                <span style="font-size:0.85rem; color:var(--text-muted); font-weight:700;">SPECIFICATION #0${item.num}</span>
            </div>
            <h3 style="font-size: 1.4rem; color: #fff; margin-bottom: 8px;">${item.title}</h3>
            <p style="color: var(--text-secondary); font-size: 0.92rem; line-height: 1.7; margin-bottom: 24px;">
                ${item.details}
            </p>
            <div style="background: rgba(0,0,0,0.3); border: 1px solid var(--border); border-radius: var(--radius-md); padding: 18px; margin-bottom: 24px;">
                ${specsHtml}
            </div>
            <div style="display:flex; gap:12px; align-items:center; flex-wrap:wrap;">
                <a href="/shop" class="btn btn-primary btn-sm">Find Cover With This Tech →</a>
                <button type="button" class="btn btn-whatsapp btn-sm" onclick="openWhatsAppOrderModal()">Ask Expert on WhatsApp 💬</button>
            </div>
        `;
    }
}

/* ==========================================================================
   4. QUICK VIEW MODAL
   ========================================================================== */
function initQuickView() {
    const modal = document.getElementById('quickViewModal');
    const closeBtn = document.getElementById('quickViewClose');

    if (!modal) return;

    window.openQuickView = function (product) {
        document.getElementById('qvImage').src = '/' + product.image;
        document.getElementById('qvTitle').textContent = product.name;
        document.getElementById('qvCategory').textContent = product.cat + (product.body_style ? ' • ' + product.body_style : '');
        document.getElementById('qvPrice').textContent = product.formatted_price || ('Rs. ' + Number(product.price).toLocaleString());
        document.getElementById('qvOldPrice').textContent = product.formatted_old_price || (product.old_price ? 'Rs. ' + Number(product.old_price).toLocaleString() : '');
        document.getElementById('qvDesc').textContent = product.short_desc || 'High-durability all-weather vehicle cover engineered for Pakistani climate with heat shield backing.';
        document.getElementById('qvProductId').value = product.id;
        document.getElementById('qvDetailLink').href = `/products/${product.slug}`;

        // WhatsApp link update
        const waLink = document.getElementById('qvWaBtn');
        if (waLink) {
            waLink.href = `https://wa.me/923072818652?text=Hello%20AutoShield!%20I%20want%20to%20order%20${encodeURIComponent(product.name)}`;
        }

        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    };

    window.closeQuickView = function () {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    };

    if (closeBtn) closeBtn.addEventListener('click', closeQuickView);
    modal.addEventListener('click', function (e) {
        if (e.target === modal) closeQuickView();
    });

    // Delegate click on product quick view buttons
    document.addEventListener('click', function (e) {
        const btn = e.target.closest('[data-quickview]');
        if (btn) {
            e.preventDefault();
            const dataStr = btn.getAttribute('data-quickview');
            try {
                const product = JSON.parse(dataStr);
                openQuickView(product);
            } catch (err) {
                console.error('Invalid quickview data', err);
            }
        }
    });
}

/* ==========================================================================
   5. FAST WHATSAPP DIRECT ORDER MODAL
   ========================================================================== */
function initWhatsAppModal() {
    const modal = document.getElementById('waOrderModal');
    const closeBtn = document.getElementById('waOrderClose');

    if (!modal) return;

    window.openWhatsAppOrderModal = function (presetVehicle = '') {
        const vInput = document.getElementById('waVehicleModel');
        if (vInput && presetVehicle) vInput.value = presetVehicle;
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    };

    window.closeWhatsAppOrderModal = function () {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    };

    if (closeBtn) closeBtn.addEventListener('click', closeWhatsAppOrderModal);
    modal.addEventListener('click', function (e) {
        if (e.target === modal) closeWhatsAppOrderModal();
    });

    const waForm = document.getElementById('waOrderForm');
    if (waForm) {
        waForm.addEventListener('submit', function (e) {
            e.preventDefault();
            const car = document.getElementById('waVehicleModel').value.trim();
            const grade = document.getElementById('waCoverGrade').value;
            const city = document.getElementById('waCity').value.trim();
            const name = document.getElementById('waCustomerName').value.trim();

            if (!car || !city) {
                alert('Please enter your Vehicle Model and Delivery City.');
                return;
            }

            const msg = `Salam AutoShield! I want to order a cover via WhatsApp:%0A` +
                        `🚗 Vehicle: ${encodeURIComponent(car)}%0A` +
                        `🛡️ Fabric Tier: ${encodeURIComponent(grade)}%0A` +
                        `📍 City: ${encodeURIComponent(city)}%0A` +
                        `👤 Name: ${encodeURIComponent(name || 'Customer')}%0A` +
                        `💳 Payment: Cash on Delivery`;

            window.open(`https://wa.me/923072818652?text=${msg}`, '_blank');
            closeWhatsAppOrderModal();
        });
    }
}

/* ==========================================================================
   6. INTERACTIVE FAQ ACCORDION
   ========================================================================== */
function initFaqAccordion() {
    document.querySelectorAll('.faq-question').forEach(btn => {
        btn.addEventListener('click', function () {
            const item = this.closest('.faq-item');
            const isActive = item.classList.contains('active');

            // Close all
            document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('active'));

            if (!isActive) {
                item.classList.add('active');
            }
        });
    });
}

/* ==========================================================================
   7. STICKY ACTION BAR FOR PRODUCT DETAIL PAGE
   ========================================================================== */
function initStickyPdpBar() {
    const bar = document.getElementById('stickyPdpBar');
    const heroBtn = document.querySelector('.detail-layout .btn-primary');

    if (!bar || !heroBtn) return;

    window.addEventListener('scroll', function () {
        const rect = heroBtn.getBoundingClientRect();
        if (rect.bottom < 0) {
            bar.classList.add('visible');
        } else {
            bar.classList.remove('visible');
        }
    });
}

/* ==========================================================================
   8. WISHLIST / LIKE SYSTEM ENGINE
   ========================================================================== */
function initWishlist() {
    let wishlist = [];
    try {
        wishlist = JSON.parse(localStorage.getItem('autoshield_wishlist')) || [];
        if (!Array.isArray(wishlist)) wishlist = [];
    } catch(e) {
        wishlist = [];
    }

    const navBtn = document.getElementById('wishlistHeaderBtn');
    const badge = document.getElementById('wishlistCount');
    const drawer = document.getElementById('wishlistDrawer');
    const overlay = document.getElementById('wishlistDrawerOverlay');
    const closeBtn = document.getElementById('wishlistDrawerClose');
    const drawerCount = document.getElementById('wishlistDrawerCount');
    const drawerBody = document.getElementById('wishlistDrawerBody');

    // Synchronize UI on load
    syncWishlistUI();

    // Drawer Open / Close
    window.openWishlistDrawer = function() {
        if (!drawer) return;
        renderWishlistDrawer();
        drawer.classList.add('active');
        if (overlay) overlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    };

    window.closeWishlistDrawer = function() {
        if (!drawer) return;
        drawer.classList.remove('active');
        if (overlay) overlay.classList.remove('active');
        document.body.style.overflow = '';
    };

    if (navBtn) {
        navBtn.addEventListener('click', function(e) {
            e.preventDefault();
            openWishlistDrawer();
        });
    }

    if (closeBtn) closeBtn.addEventListener('click', closeWishlistDrawer);
    if (overlay) overlay.addEventListener('click', closeWishlistDrawer);

    // Event Delegation for All Card Like Buttons
    document.addEventListener('click', function(e) {
        const btn = e.target.closest('.card-like-btn, .card-like-btn-pdp, .wishlist-btn');
        if (!btn) return;
        e.preventDefault();
        e.stopPropagation();

        const id = btn.getAttribute('data-product-id');
        const name = btn.getAttribute('data-product-name') || 'Vehicle Top Cover';
        const price = btn.getAttribute('data-product-price') || '';
        const img = btn.getAttribute('data-product-img') || '';
        const url = btn.getAttribute('data-product-url') || '#';

        toggleWishlistItem({ id: String(id), name, price, img, url });
    });

    function toggleWishlistItem(item) {
        const index = wishlist.findIndex(x => String(x.id) === String(item.id));
        let added = false;

        if (index > -1) {
            wishlist.splice(index, 1);
            showWishlistToast(`Removed "${item.name}" from Liked Covers`, '💔');
        } else {
            wishlist.push(item);
            added = true;
            showWishlistToast(`Added "${item.name}" to Liked Covers!`, '❤️');
        }

        try {
            localStorage.setItem('autoshield_wishlist', JSON.stringify(wishlist));
        } catch(e) {}

        syncWishlistUI(added ? item.id : null);
        if (drawer && drawer.classList.contains('active')) {
            renderWishlistDrawer();
        }
    }

    window.removeWishlistItem = function(id) {
        const index = wishlist.findIndex(x => String(x.id) === String(id));
        if (index > -1) {
            const removed = wishlist.splice(index, 1)[0];
            try {
                localStorage.setItem('autoshield_wishlist', JSON.stringify(wishlist));
            } catch(e) {}
            syncWishlistUI();
            renderWishlistDrawer();
            showWishlistToast(`Removed from Liked Covers`, '💔');
        }
    };

    function syncWishlistUI(bumpId) {
        const count = wishlist.length;

        // Header Badge
        if (badge) {
            badge.textContent = count;
            badge.style.display = count > 0 ? 'flex' : 'none';
        }
        if (drawerCount) drawerCount.textContent = count;

        if (navBtn) {
            if (count > 0) {
                navBtn.classList.add('has-items');
            } else {
                navBtn.classList.remove('has-items');
            }
            if (bumpId) {
                navBtn.classList.add('bump');
                setTimeout(() => navBtn.classList.remove('bump'), 400);
            }
        }

        // Synchronize all cards on current page
        document.querySelectorAll('.card-like-btn, .card-like-btn-pdp, .wishlist-btn').forEach(btn => {
            const btnId = String(btn.getAttribute('data-product-id'));
            const isLiked = wishlist.some(x => String(x.id) === btnId);
            const textSpan = btn.querySelector('.like-btn-text');

            if (isLiked) {
                btn.classList.add('liked');
                btn.setAttribute('title', 'Remove from Liked Covers');
                btn.setAttribute('aria-label', 'Remove from Liked Covers');
                if (textSpan) textSpan.textContent = 'Liked ❤️';
            } else {
                btn.classList.remove('liked');
                btn.setAttribute('title', 'Save to Liked Covers');
                btn.setAttribute('aria-label', 'Save to Liked Covers');
                if (textSpan) textSpan.textContent = 'Wishlist';
            }
        });
    }

    function renderWishlistDrawer() {
        if (!drawerBody) return;

        if (wishlist.length === 0) {
            drawerBody.innerHTML = `
                <div class="cart-drawer-empty" style="padding: 40px 10px; text-align: center;">
                    <div style="font-size: 3.5rem; margin-bottom: 16px;">🤍</div>
                    <h4 style="color: #fff; margin-bottom: 8px;">No Liked Covers Yet</h4>
                    <p style="color: var(--text-secondary); font-size: 0.88rem; line-height: 1.6; max-width: 280px; margin: 0 auto 20px;">
                        Click the heart icon on any car or bike cover to save it here for quick access later!
                    </p>
                    <a href="/shop" class="btn btn-outline btn-sm" onclick="closeWishlistDrawer()">
                        Explore Top Covers →
                    </a>
                </div>
            `;
            return;
        }

        let html = '';
        wishlist.forEach(item => {
            html += `
                <div class="cart-drawer-item wishlist-item" id="wishlist-item-${item.id}">
                    <img src="${item.img}" alt="${item.name}" class="drawer-item-thumb" onerror="this.src='/placeholder.jpg'">
                    <div class="drawer-item-details">
                        <div class="drawer-item-title">${item.name}</div>
                        <div class="drawer-item-price" style="margin-bottom: 10px;">${item.price}</div>
                        <div style="display:flex; gap:8px;">
                            <a href="${item.url}" class="btn btn-primary btn-sm" style="padding: 6px 12px; font-size: 0.78rem;">
                                View Details
                            </a>
                            <button type="button" class="btn btn-outline btn-sm" style="padding: 6px 10px; font-size: 0.78rem; color: #ff5566;" onclick="removeWishlistItem('${item.id}')">
                                Remove ✕
                            </button>
                        </div>
                    </div>
                </div>
            `;
        });

        drawerBody.innerHTML = html;
    }

    function showWishlistToast(msg, icon) {
        const toast = document.getElementById('wishlistToast');
        const toastMsg = document.getElementById('wishlistToastMsg');
        const toastIcon = document.getElementById('wishlistToastIcon');
        if (!toast || !toastMsg) return;

        toastMsg.textContent = msg;
        if (toastIcon && icon) toastIcon.textContent = icon;

        toast.classList.add('show');
        clearTimeout(window.__wishlistToastTimer);
        window.__wishlistToastTimer = setTimeout(() => {
            toast.classList.remove('show');
        }, 3000);
    }
}

/* ==========================================================================
   9. VELOX 4-STEP BESPOKE VEHICLE CONFIGURATOR ENGINE
   ========================================================================== */
function initVeloxConfigurator() {
    const form = document.getElementById('veloxConfigForm');
    if (!form) return;

    const makeSelect = document.getElementById('veloxMake');
    const modelSelect = document.getElementById('veloxModel');
    const yearSelect = document.getElementById('veloxYear');
    const modsSelect = document.getElementById('veloxMods');
    const basePriceInput = document.getElementById('veloxBasePrice');
    const displayPrice = document.getElementById('veloxDisplayPrice');

    const sumVehicle = document.getElementById('veloxSumVehicleText');
    const sumFinish = document.getElementById('veloxSumFinishText');
    const sumLogo = document.getElementById('veloxSumLogoText');
    const sumExtras = document.getElementById('veloxSumExtrasText');
    const sumTotal = document.getElementById('veloxSumTotalDisplay');
    const finishLabel = document.getElementById('veloxFinishLabel');

    const hiddenVehicle = document.getElementById('hiddenVehicle');
    const hiddenFinish = document.getElementById('hiddenFinish');
    const hiddenLogo = document.getElementById('hiddenLogo');
    const hiddenExtras = document.getElementById('hiddenExtras');
    const waBtn = document.getElementById('veloxWaOrderBtn');

    let basePrice = parseInt(basePriceInput?.value || 6999, 10);
    let extraPrice = 0;
    let selectedColor = 'Obsidian Black';
    let selectedLogo = 'Emblem Only';
    let hasEmbroidery = false;

    // 01 — Make & Model Dynamic Cascading
    if (makeSelect && modelSelect) {
        makeSelect.addEventListener('change', function () {
            const make = this.value;
            modelSelect.innerHTML = '<option value="">Select Model</option>';

            if (make && typeof VEHICLE_DATA !== 'undefined' && VEHICLE_DATA[make]) {
                VEHICLE_DATA[make].forEach(model => {
                    const opt = document.createElement('option');
                    opt.value = model.split(' ')[0];
                    opt.textContent = `${make} ${model}`;
                    modelSelect.appendChild(opt);
                });
            } else if (make) {
                const opt = document.createElement('option');
                opt.value = 'Custom';
                opt.textContent = `${make} Custom Pattern`;
                modelSelect.appendChild(opt);
            }
            updateSummary();
        });

        modelSelect.addEventListener('change', updateSummary);
        if (yearSelect) yearSelect.addEventListener('change', updateSummary);
        if (modsSelect) modsSelect.addEventListener('change', updateSummary);
    }

    // 02 — Finish (Color Swatches)
    document.querySelectorAll('.velox-swatch-btn').forEach(btn => {
        btn.addEventListener('click', function () {
            document.querySelectorAll('.velox-swatch-btn').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            selectedColor = this.getAttribute('data-color') || 'Custom Color';
            if (finishLabel) finishLabel.textContent = selectedColor;
            updateSummary();
        });
    });

    // 03 — Front Hood Logo Radio Cards
    document.querySelectorAll('.velox-option-card[data-type="logo"]').forEach(card => {
        card.addEventListener('click', function () {
            document.querySelectorAll('.velox-option-card[data-type="logo"]').forEach(c => c.classList.remove('active'));
            this.classList.add('active');
            selectedLogo = this.getAttribute('data-value') || 'Emblem Only';
            updateSummary();
        });
    });

    // 04 — Extras Checkbox Card
    const extraCard = document.getElementById('veloxExtraEmbroidery');
    if (extraCard) {
        extraCard.addEventListener('click', function () {
            hasEmbroidery = !hasEmbroidery;
            if (hasEmbroidery) {
                this.classList.add('active');
                extraPrice = 500;
            } else {
                this.classList.remove('active');
                extraPrice = 0;
            }
            updateSummary();
        });
    }

    function updateSummary() {
        const make = makeSelect?.value || '';
        const model = modelSelect?.value || '';
        const year = yearSelect?.value || '';
        const mods = modsSelect?.value || 'Stock Body';

        let vehicleStr = 'Not selected';
        if (make && model) {
            vehicleStr = `${make} ${model} • ${year}`;
            if (mods && mods !== 'Stock Body') vehicleStr += ` (${mods})`;
        } else if (make) {
            vehicleStr = `${make} (Model Pending)`;
        }

        if (sumVehicle) sumVehicle.textContent = vehicleStr;
        if (hiddenVehicle) hiddenVehicle.value = vehicleStr;

        if (sumFinish) sumFinish.textContent = selectedColor;
        if (hiddenFinish) hiddenFinish.value = selectedColor;

        if (sumLogo) sumLogo.textContent = selectedLogo;
        if (hiddenLogo) hiddenLogo.value = selectedLogo;

        const extraStr = hasEmbroidery ? 'Personalized Embroidery (+Rs. 500)' : 'None';
        if (sumExtras) sumExtras.textContent = extraStr;
        if (hiddenExtras) hiddenExtras.value = extraStr;

        const total = basePrice + extraPrice;
        const formattedTotal = 'Rs. ' + total.toLocaleString();

        if (sumTotal) sumTotal.textContent = formattedTotal;
        if (displayPrice) displayPrice.textContent = formattedTotal;

        // WhatsApp fast order link with full configuration specs
        if (waBtn) {
            const prodName = document.querySelector('.velox-title')?.textContent.trim() || 'Vehicle Cover';
            const msg = `Salam AutoShield! I want to order a custom-tailored cover:%0A` +
                        `🛡️ Cover: ${encodeURIComponent(prodName)}%0A` +
                        `🚗 Vehicle: ${encodeURIComponent(vehicleStr)}%0A` +
                        `🎨 Finish: ${encodeURIComponent(selectedColor)}%0A` +
                        `✨ Front Logo: ${encodeURIComponent(selectedLogo)}%0A` +
                        `🧵 Extras: ${encodeURIComponent(extraStr)}%0A` +
                        `💰 Total: ${encodeURIComponent(formattedTotal)} (Cash on Delivery)`;
            waBtn.href = `https://wa.me/923072818652?text=${msg}`;
        }
    }

    // Initialize summary on page load
    updateSummary();
}

/* ==========================================================================
   HEADER SEARCH MODAL & MOBILE NAVIGATION DRAWER
   ========================================================================== */
function initHeaderSearch() {
    const searchToggle = document.getElementById('headerSearchToggle');
    const searchModal = document.getElementById('searchModalOverlay');
    const searchClose = document.getElementById('searchModalClose');
    const searchInput = document.getElementById('modalSearchInput');

    if (!searchModal) return;

    if (searchToggle) {
        searchToggle.addEventListener('click', function (e) {
            e.preventDefault();
            searchModal.classList.add('open');
            setTimeout(() => {
                if (searchInput) searchInput.focus();
            }, 100);
        });
    }

    if (searchClose) {
        searchClose.addEventListener('click', function () {
            searchModal.classList.remove('open');
        });
    }

    searchModal.addEventListener('click', function (e) {
        if (e.target === searchModal) {
            searchModal.classList.remove('open');
        }
    });

    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && searchModal.classList.contains('open')) {
            searchModal.classList.remove('open');
        }
    });
}

function initMobileNav() {
    const mobileToggle = document.getElementById('mobileNavToggle');
    const mobileDrawer = document.getElementById('mobileNavDrawer');
    const mobileOverlay = document.getElementById('mobileNavOverlay');
    const mobileClose = document.getElementById('mobileNavClose');

    if (!mobileDrawer) return;

    function openMobileMenu() {
        mobileDrawer.classList.add('open');
        if (mobileOverlay) mobileOverlay.classList.add('open');
        document.body.style.overflow = 'hidden';
    }

    function closeMobileMenu() {
        mobileDrawer.classList.remove('open');
        if (mobileOverlay) mobileOverlay.classList.remove('open');
        document.body.style.overflow = '';
    }

    if (mobileToggle) {
        mobileToggle.addEventListener('click', function (e) {
            e.preventDefault();
            openMobileMenu();
        });
    }

    if (mobileClose) {
        mobileClose.addEventListener('click', closeMobileMenu);
    }

    if (mobileOverlay) {
        mobileOverlay.addEventListener('click', closeMobileMenu);
    }

    // Close on any link click
    mobileDrawer.querySelectorAll('a').forEach(function (link) {
        link.addEventListener('click', closeMobileMenu);
    });

    // Close on Escape key
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && mobileDrawer.classList.contains('open')) {
            closeMobileMenu();
        }
    });
}


