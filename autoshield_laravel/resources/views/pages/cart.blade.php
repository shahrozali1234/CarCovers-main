@extends('layouts.app')

@section('title', 'Shopping Cart & Checkout — AutoShield Car Top Covers')

@section('content')
<!-- Page Banner -->
<section class="page-banner">
    <div class="container">
        <div class="eyebrow">Your Items</div>
        <h1>SHOPPING CART & <span class="text-gradient">CHECKOUT</span></h1>
        <p>Review your selected protective covers and fill out shipping details for Cash on Delivery shipment.</p>
    </div>
</section>

<!-- Cart Items & Order Form Layout -->
<section class="specs-section">
    <div class="container">

        <!-- Breadcrumb -->
        <div class="breadcrumb" style="margin-bottom: 28px;">
            <a href="{{ route('home') }}">Home</a>
            <span class="breadcrumb-sep">/</span>
            <a href="{{ route('shop.index') }}">Shop</a>
            <span class="breadcrumb-sep">/</span>
            <span class="breadcrumb-current">Cart & Checkout</span>
        </div>

        <div style="display:grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap:40px; align-items: start;">
        
        <!-- Cart Items Table Container -->
        <div>
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
                <h2>Cart Summary</h2>
                <a href="{{ route('shop.index') }}" class="btn btn-outline btn-sm">+ Add More Items</a>
            </div>

            @if(empty($cart))
                <div style="background: var(--card-bg); border: 1px dashed var(--border); border-radius: var(--radius-lg); padding: 50px 20px; text-align: center;">
                    <div style="font-size: 3rem; margin-bottom: 12px;">🛒</div>
                    <h3 style="font-size: 1.25rem; color: #fff; margin-bottom: 8px;">Your Shopping Cart Is Empty</h3>
                    <p style="color: var(--text-muted); font-size: 0.9rem; margin-bottom: 24px;">
                        Explore our high-performance car, SUV, and motorcycle covers.
                    </p>
                    <a href="{{ route('shop.index') }}" class="btn btn-primary btn-sm">Explore All Covers →</a>
                </div>
            @else
                <div style="background: var(--card-bg); border: 1px solid var(--border); border-radius: var(--radius-lg); overflow: hidden; margin-bottom: 24px;">
                    <table style="width: 100%; border-collapse: collapse; font-size: 0.9rem;">
                        <thead>
                            <tr style="border-bottom: 1px solid var(--border); background: rgba(255,255,255,0.02);">
                                <th style="padding: 14px 16px; text-align: left; color: var(--text-muted); font-size: 0.78rem; text-transform: uppercase;">Product</th>
                                <th style="padding: 14px 16px; text-align: center; color: var(--text-muted); font-size: 0.78rem; text-transform: uppercase;">Qty</th>
                                <th style="padding: 14px 16px; text-align: right; color: var(--text-muted); font-size: 0.78rem; text-transform: uppercase;">Total</th>
                                <th style="padding: 14px 16px; text-align: center; width: 40px;"></th>
                            </tr>
                        </thead>
                        <tbody>
                            @foreach($cart as $key => $item)
                                <tr style="border-bottom: 1px solid var(--border);">
                                    <td style="padding: 16px; display: flex; align-items: center; gap: 14px;">
                                        <img src="{{ asset($item['image']) }}" alt="{{ $item['name'] }}" style="width: 52px; height: 52px; object-fit: contain; background: var(--dark-bg); border-radius: 8px; padding: 4px;">
                                        <div>
                                            <div style="font-weight: 700; color: #fff; margin-bottom: 4px;">{{ $item['name'] }}</div>
                                            <div style="font-size: 0.78rem; color: var(--gold);">Fit: {{ $item['size'] }}</div>
                                            <div style="font-size: 0.8rem; color: var(--text-secondary);">Rs. {{ number_format($item['price']) }}</div>
                                        </div>
                                    </td>
                                    <td style="padding: 16px; text-align: center;">
                                        <form action="{{ route('cart.update') }}" method="POST" style="display:inline-flex; align-items:center; gap:6px;">
                                            @csrf
                                            <input type="hidden" name="cart_key" value="{{ $key }}">
                                            <input type="number" name="quantity" value="{{ $item['quantity'] }}" min="1" max="10" onchange="this.form.submit()"
                                                   style="width: 50px; padding: 6px; background: var(--dark-bg); color:#fff; border: 1px solid var(--border); border-radius: 6px; text-align: center;">
                                        </form>
                                    </td>
                                    <td style="padding: 16px; text-align: right; font-weight: 700; color: #fff;">
                                        Rs. {{ number_format($item['price'] * $item['quantity']) }}
                                    </td>
                                    <td style="padding: 16px; text-align: center;">
                                        <form action="{{ route('cart.remove', $key) }}" method="POST">
                                            @csrf
                                            @method('DELETE')
                                            <button type="submit" style="color: var(--red); font-size: 1.1rem; cursor: pointer; background:none; border:none;" title="Remove">✕</button>
                                        </form>
                                    </td>
                                </tr>
                            @endforeach
                        </tbody>
                    </table>
                </div>

                <div style="background: var(--bg-card); border: 1px solid var(--border-color); border-radius: var(--radius-lg); padding: 24px; margin-bottom: 24px;">
                    <div style="display: flex; justify-content: space-between; margin-bottom: 12px; font-size: 0.95rem;">
                        <span style="color: var(--text-secondary);">Subtotal:</span>
                        <strong style="color: var(--text-primary);">Rs. {{ number_format($subtotal) }}</strong>
                    </div>
                    <div style="display: flex; justify-content: space-between; margin-bottom: 12px; font-size: 0.95rem;">
                        <span style="color: var(--text-secondary);">Nationwide Delivery:</span>
                        <span style="color: #22c55e; font-weight: 700;">FREE (COD)</span>
                    </div>
                    <div style="display: flex; justify-content: space-between; padding-top: 14px; border-top: 1px solid var(--border-color); font-size: 1.25rem; margin-bottom: 20px;">
                        <strong>Total Amount:</strong>
                        <strong style="color: var(--gold-accent);">Rs. {{ number_format($subtotal) }}</strong>
                    </div>

                    @php
                        $cartMsg = "Salam AutoShield! I want to order the following covers from my cart:%0A";
                        foreach($cart as $cItem) {
                            $cartMsg .= "• " . urlencode($cItem['name']) . " (" . urlencode($cItem['size']) . ") x" . $cItem['quantity'] . " = Rs. " . number_format($cItem['price'] * $cItem['quantity']) . "%0A";
                        }
                        $cartMsg .= "%0ATotal Bill: Rs. " . number_format($subtotal) . " (Cash on Delivery)";
                    @endphp
                    <a href="https://wa.me/923072818652?text={{ $cartMsg }}" target="_blank" class="btn btn-whatsapp" style="width: 100%; text-align: center; justify-content: center; padding: 14px; font-size: 0.92rem;">
                        💬 Quick Order Cart via WhatsApp
                    </a>
                </div>
            @endif
        </div>

        <!-- Shipping & Checkout Address Form -->
        <div style="background:var(--bg-card); padding:32px; border-radius:var(--radius-lg); border:1px solid var(--border-color); height:fit-content;">
            <h3 style="font-family: var(--font-serif); font-size: 1.6rem; color: var(--text-primary); margin-bottom:8px; font-weight: 400;">Shipping Address</h3>
            <p style="color:var(--text-muted); font-size:0.85rem; margin-bottom:24px;">Cash on Delivery nationwide across 150+ cities in Pakistan.</p>

            <form action="{{ route('checkout.place') }}" method="POST">
                @csrf
                <div class="form-group-pro">
                    <label class="form-label-pro">
                        <svg viewBox="0 0 20 20" width="13" fill="currentColor" style="color:var(--gold-accent)"><path d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"/></svg>
                        Full Name *
                    </label>
                    <input type="text" name="customer_name" required placeholder="e.g. Muhammad Ali" value="{{ old('customer_name') }}" class="input-professional">
                </div>

                <div class="form-group-pro">
                    <label class="form-label-pro">
                        <svg viewBox="0 0 20 20" width="13" fill="currentColor" style="color:var(--gold-accent)"><path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"/></svg>
                        Mobile Phone / WhatsApp *
                    </label>
                    <input type="tel" name="phone" required placeholder="0300 1234567" value="{{ old('phone', old('customer_phone')) }}" class="input-professional">
                </div>

                <div class="form-group-pro">
                    <label class="form-label-pro">
                        <svg viewBox="0 0 20 20" width="13" fill="currentColor" style="color:var(--gold-accent)"><path fill-rule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd"/></svg>
                        Delivery City *
                    </label>
                    <input type="text" name="city" required placeholder="e.g. Lahore, Karachi, Islamabad" value="{{ old('city') }}" class="input-professional">
                </div>

                <div class="form-group-pro">
                    <label class="form-label-pro">
                        <svg viewBox="0 0 20 20" width="13" fill="currentColor" style="color:var(--gold-accent)"><path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"/></svg>
                        Complete Shipping Address *
                    </label>
                    <textarea name="address" required rows="3" placeholder="House #, Street #, Sector/Area..." class="input-professional" style="resize:vertical;">{{ old('address') }}</textarea>
                </div>

                <div class="form-group-pro">
                    <label class="form-label-pro">
                        <svg viewBox="0 0 20 20" width="13" fill="currentColor" style="color:var(--gold-accent)"><path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4z"/><path fill-rule="evenodd" d="M18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z" clip-rule="evenodd"/></svg>
                        Payment Method
                    </label>
                    <select name="payment_method" class="input-professional">
                        <option value="cod">Cash on Delivery (COD) — Pay when courier arrives</option>
                        <option value="bank">Bank Transfer / JazzCash / EasyPaisa</option>
                    </select>
                </div>

                <div class="form-group-pro" style="margin-bottom:28px;">
                    <label class="form-label-pro">
                        <svg viewBox="0 0 20 20" width="13" fill="currentColor" style="color:var(--gold-accent)"><path d="M8 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM15 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM3 4h14l-1.68 7.39a2 2 0 01-1.95 1.61H6.63a2 2 0 01-1.95-1.61L3 4z"/></svg>
                        Car Model / Special Notes (Optional)
                    </label>
                    <input type="text" name="notes" placeholder="e.g. Honda Civic 2022, call before delivery" value="{{ old('notes', old('car_model')) }}" class="input-professional">
                </div>

                <button type="submit" class="btn btn-primary btn-full" style="padding: 16px; font-size: 0.95rem; width: 100%;">
                    CONFIRM CASH ON DELIVERY ORDER →
                </button>
            </form>
        </div>
    </div>
    </div>
</section>
@endsection
