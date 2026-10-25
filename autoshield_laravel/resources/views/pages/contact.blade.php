@extends('layouts.app')

@section('title', 'Contact Us & FAQs — AutoShield Car Top Covers')
@section('meta_description', 'Contact AutoShield for premium car cover inquiries, size fitment help, and order support. WhatsApp, phone, and email support available 9AM–9PM.')

@section('content')
<!-- Page Banner -->
<section class="page-banner">
    <div class="container">
        <div class="eyebrow">Get In Touch</div>
        <h1>CONTACT & <span class="text-gradient">SUPPORT</span></h1>
        <p>Have questions about car cover sizes, fabric materials, or order tracking? Contact our expert team anytime.</p>
        <div style="margin-top: 16px;">
            <span class="fit-guarantee-pill">
                <span class="pulse-green"></span> Live Support 9:00 AM – 9:00 PM, Mon – Sat
            </span>
        </div>
    </div>
</section>

<!-- Contact & Support Grid -->
<section class="specs-section">
    <div class="container">
        <div class="contact-grid">
            <!-- Left: Contact Form -->
            <div class="contact-glass-card">
                <div class="eyebrow" style="margin-bottom: 10px;">Send An Inquiry</div>
                <h2 style="font-family: var(--font-serif); font-size: 1.8rem; font-weight: 400; color: var(--text-primary); margin-bottom: 8px;">Talk To Our Experts</h2>
                <p style="color: var(--text-muted); font-size: 0.88rem; margin-bottom: 28px; line-height: 1.6;">Fill out the form below and our vehicle fitment specialist will reach out instantly via WhatsApp.</p>

                <form onsubmit="handleContactSubmit(event)">
                    <div class="form-group-pro">
                        <label class="form-label-pro">
                            <svg viewBox="0 0 20 20" width="13" fill="currentColor" style="color:var(--gold-accent)"><path d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"/></svg>
                            Your Full Name *
                        </label>
                        <input type="text" id="contactName" required placeholder="e.g. Muhammad Ali" class="input-professional">
                    </div>

                    <div class="form-group-pro">
                        <label class="form-label-pro">
                            <svg viewBox="0 0 20 20" width="13" fill="currentColor" style="color:var(--gold-accent)"><path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"/></svg>
                            Phone / WhatsApp *
                        </label>
                        <input type="tel" id="contactPhone" required placeholder="0300 1234567" class="input-professional">
                    </div>

                    <div class="form-group-pro">
                        <label class="form-label-pro">
                            <svg viewBox="0 0 20 20" width="13" fill="currentColor" style="color:var(--gold-accent)"><path d="M8 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM15 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM3 4h14l-1.68 7.39a2 2 0 01-1.95 1.61H6.63a2 2 0 01-1.95-1.61L3 4z"/></svg>
                            Vehicle Model & Year *
                        </label>
                        <input type="text" id="contactVehicle" required placeholder="e.g. Honda Civic 2022, Kia Sportage 2023" class="input-professional">
                    </div>

                    <div class="form-group-pro">
                        <label class="form-label-pro">
                            <svg viewBox="0 0 20 20" width="13" fill="currentColor" style="color:var(--gold-accent)"><path fill-rule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clip-rule="evenodd"/></svg>
                            Message / Inquiry (Optional)
                        </label>
                        <textarea id="contactMessage" rows="3" placeholder="Need help with size, fabric choice, or order tracking?" class="input-professional" style="resize: vertical;"></textarea>
                    </div>

                    <div style="display: flex; flex-direction: column; gap: 12px; margin-top: 8px;">
                        <button type="submit" class="btn btn-whatsapp" style="width: 100%; padding: 15px; font-weight: 800; font-size: 0.9rem; letter-spacing: 1px;">
                            💬 SEND TO WHATSAPP (+92 307 2818652)
                        </button>
                        <button type="button" onclick="alert('Thank you! Your inquiry has been logged. Our specialist will contact you shortly on WhatsApp.'); this.closest(\'form\').reset();" class="btn btn-outline" style="width: 100%; padding: 12px; font-size: 0.85rem;">
                            ✉️ Submit as Email Inquiry
                        </button>
                    </div>
                </form>
            </div>

            <!-- Right: Contact Channels + Hours -->
            <div>
                <div class="eyebrow" style="margin-bottom: 10px;">Instant Support</div>
                <h2 style="font-family: var(--font-serif); font-size: 1.8rem; font-weight: 400; color: var(--text-primary); margin-bottom: 8px;">Direct Channels</h2>
                <p style="color: var(--text-muted); font-size: 0.88rem; margin-bottom: 28px; line-height: 1.6;">Reach out directly for size verification, custom cover queries, or order tracking.</p>

                <div class="contact-channel-card">
                    <div class="contact-channel-icon wa">💬</div>
                    <div class="contact-channel-info">
                        <strong>WhatsApp Support (Fastest)</strong>
                        <small>Instant fitment assistance & order help</small>
                        <a href="https://wa.me/923072818652" target="_blank" class="wa-link">Chat Now: +92 307 2818652 →</a>
                    </div>
                </div>

                <div class="contact-channel-card">
                    <div class="contact-channel-icon ph">📞</div>
                    <div class="contact-channel-info">
                        <strong>Helpline Phone Support</strong>
                        <small>Mon – Sat (9:00 AM – 9:00 PM)</small>
                        <a href="tel:03072818652" class="ph-link">Call: 0307-2818652 →</a>
                    </div>
                </div>

                <div class="contact-channel-card">
                    <div class="contact-channel-icon loc">📍</div>
                    <div class="contact-channel-info">
                        <strong>AutoShield Headquarters</strong>
                        <small>Main Boulevard, Gulberg III, Lahore, Pakistan</small>
                        <a href="mailto:support@autoshield.pk" class="em-link">✉️ support@autoshield.pk</a>
                    </div>
                </div>

                <!-- Business Hours Box -->
                <div style="background: var(--bg-card); border: 1px solid var(--border-color); border-radius: var(--radius-md); padding: 22px; margin-top: 24px;">
                    <h4 style="font-family: var(--font-serif); font-size: 1.05rem; color: var(--text-primary); margin-bottom: 14px; font-weight: 500;">Business Hours</h4>
                    <div style="display: flex; flex-direction: column; gap: 8px; font-size: 0.85rem;">
                        <div style="display: flex; justify-content: space-between; padding-bottom: 8px; border-bottom: 1px solid var(--border-color);">
                            <span style="color: var(--text-muted);">Monday – Friday</span>
                            <span style="color: var(--text-primary); font-weight: 700;">9:00 AM – 9:00 PM</span>
                        </div>
                        <div style="display: flex; justify-content: space-between; padding-bottom: 8px; border-bottom: 1px solid var(--border-color);">
                            <span style="color: var(--text-muted);">Saturday</span>
                            <span style="color: var(--text-primary); font-weight: 700;">10:00 AM – 8:00 PM</span>
                        </div>
                        <div style="display: flex; justify-content: space-between;">
                            <span style="color: var(--text-muted);">Sunday</span>
                            <span style="color: #ef4444; font-weight: 700;">WhatsApp Only</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>

<!-- Enhanced FAQ Section -->
<section class="faq-section">
    <div class="container">
        <div class="section-head">
            <div class="eyebrow">COMMON QUESTIONS</div>
            <h2>Frequently Asked Questions</h2>
            <p>Everything you need to know about size fitment, weather protection, fabric quality, and delivery across Pakistan.</p>
        </div>

        <div class="faq-wrap">
            <div class="faq-item active">
                <div class="faq-question">
                    <span>Will this cover scratch or leave swirl marks on my car's paint?</span>
                    <span class="faq-chevron">▼</span>
                </div>
                <div class="faq-answer">
                    <strong style="color: var(--gold-accent);">Zero Swirl Marks Guaranteed:</strong> Lined with proprietary FleeceGuard™ spun-cotton velvet. 100% safe for factory clear coats, ceramic coatings, car wax, and PPF wraps. The ultra-soft inner lining floats over your paint surface without any contact friction.
                </div>
            </div>

            <div class="faq-item">
                <div class="faq-question">
                    <span>Is the cover 100% waterproof in heavy monsoon rains?</span>
                    <span class="faq-chevron">▼</span>
                </div>
                <div class="faq-answer">
                    <strong style="color: var(--gold-accent);">10,000mm Hydrostatic Rating:</strong> Our Hydro-Tough™ high-density polyethylene membrane with ultrasonic heat-welded seams keeps your vehicle bone dry during continuous days of heavy monsoon downpours. Tested in Pakistan's most intense rainfall conditions.
                </div>
            </div>

            <div class="faq-item">
                <div class="faq-question">
                    <span>How does the cover stay secure during strong windstorms?</span>
                    <span class="faq-chevron">▼</span>
                </div>
                <div class="faq-answer">
                    <strong style="color: var(--gold-accent);">Dual Wind-Lock Straps:</strong> Features heavy-duty click-buckle straps that fasten beneath the chassis plus front/rear elastic hems with mirror pockets, holding firm in winds up to 70 km/h without any flapping or displacement.
                </div>
            </div>

            <div class="faq-item">
                <div class="faq-question">
                    <span>What if the cover does not fit my car properly?</span>
                    <span class="faq-chevron">▼</span>
                </div>
                <div class="faq-answer">
                    <strong style="color: var(--gold-accent);">100% Exact Fit Guarantee:</strong> If the size does not match your car model accurately, we dispatch a free replacement size or provide a 100% refund within 7 days. Simply WhatsApp us your vehicle model and we'll verify before shipping.
                </div>
            </div>

            <div class="faq-item">
                <div class="faq-question">
                    <span>What are the payment methods and delivery timeline?</span>
                    <span class="faq-chevron">▼</span>
                </div>
                <div class="faq-answer">
                    <strong style="color: var(--gold-accent);">Cash on Delivery (COD) Nationwide:</strong> Delivered in 2–4 business days across all 150+ cities in Pakistan via TCS / Leopard Courier. Orders over Rs. 5,000 ship completely free. JazzCash & EasyPaisa also accepted.
                </div>
            </div>

            <div class="faq-item">
                <div class="faq-question">
                    <span>Can I use AutoShield covers on a freshly waxed or ceramic coated car?</span>
                    <span class="faq-chevron">▼</span>
                </div>
                <div class="faq-answer">
                    <strong style="color: var(--gold-accent);">Yes, 100% Safe for All Coatings:</strong> Our FleeceGuard™ inner lining is specifically tested to be non-abrasive on ceramic coatings, car wax, graphene coatings, PPF (paint protection film), and factory clear coats. It will not disturb or degrade your finish in any way.
                </div>
            </div>
        </div>
    </div>
</section>

@push('scripts')
<script>
function handleContactSubmit(e) {
    e.preventDefault();
    const name    = document.getElementById('contactName').value.trim();
    const phone   = document.getElementById('contactPhone').value.trim();
    const car     = document.getElementById('contactVehicle').value.trim();
    const msg     = document.getElementById('contactMessage').value.trim();

    const waMsg = `Salam AutoShield! 🛡️%0A` +
                  `👤 Name: ${encodeURIComponent(name)}%0A` +
                  `📞 Phone: ${encodeURIComponent(phone)}%0A` +
                  `🚗 Vehicle: ${encodeURIComponent(car)}%0A` +
                  `✉️ Inquiry: ${encodeURIComponent(msg || 'I need help selecting the right car cover.')}`;

    window.open(`https://wa.me/923072818652?text=${waMsg}`, '_blank');
}
</script>
@endpush
@endsection
