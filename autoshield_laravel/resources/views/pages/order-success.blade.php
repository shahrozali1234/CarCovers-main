@extends('layouts.app')

@section('title', "Order Confirmed #{$order->order_number} — AutoShield Pakistan")

@section('content')
<section class="section" style="padding: 60px 20px; min-height: 70vh; display: flex; align-items: center; justify-content: center;">
    <div style="background: #0d1017; border: 1px solid rgba(255,255,255,0.1); border-radius: 20px; max-width: 640px; width: 100%; padding: 40px; box-shadow: 0 10px 40px rgba(0,0,0,0.5); text-align: center;">
        <div style="font-size: 3.5rem; margin-bottom: 14px;">🎉</div>
        <h1 style="font-size: 1.8rem; font-weight: 800; color: #fff; margin-bottom: 6px;">Thank You, {{ $order->customer_name }}!</h1>
        <p style="color: #10b981; font-weight: 700; font-size: 1rem; margin-bottom: 20px;">
            Your Cash on Delivery Order Has Been Successfully Booked!
        </p>

        <!-- Order Number Badge -->
        <div style="background: rgba(225, 29, 72, 0.1); border: 1px dashed var(--red); border-radius: 12px; padding: 14px; margin-bottom: 24px; display: inline-block;">
            <div style="font-size: 0.8rem; color: #94a3b8; text-transform: uppercase; font-weight: 700;">Order Reference Number</div>
            <div style="font-size: 1.5rem; font-weight: 900; color: #fff;">#{{ $order->order_number }}</div>
        </div>

        <!-- Order Details Card -->
        <div style="background: #11151f; border: 1px solid rgba(255,255,255,0.06); border-radius: 12px; padding: 20px; text-align: left; margin-bottom: 28px; font-size: 0.9rem;">
            <div style="display: flex; justify-content: space-between; margin-bottom: 8px; border-bottom: 1px solid rgba(255,255,255,0.06); padding-bottom: 8px;">
                <span style="color: #94a3b8;">Phone:</span>
                <strong style="color: #fff;">{{ $order->phone }}</strong>
            </div>
            <div style="display: flex; justify-content: space-between; margin-bottom: 8px; border-bottom: 1px solid rgba(255,255,255,0.06); padding-bottom: 8px;">
                <span style="color: #94a3b8;">Delivery City:</span>
                <strong style="color: #fff;">{{ $order->city }}</strong>
            </div>
            <div style="display: flex; justify-content: space-between; margin-bottom: 8px; border-bottom: 1px solid rgba(255,255,255,0.06); padding-bottom: 8px;">
                <span style="color: #94a3b8;">Address:</span>
                <span style="color: #cbd5e1; max-width: 320px; text-align: right;">{{ $order->address }}</span>
            </div>
            <div style="display: flex; justify-content: space-between; margin-bottom: 8px; border-bottom: 1px solid rgba(255,255,255,0.06); padding-bottom: 8px;">
                <span style="color: #94a3b8;">Payment Mode:</span>
                <strong style="color: #fff;">{{ $order->payment_method }}</strong>
            </div>
            <div style="display: flex; justify-content: space-between; font-size: 1.15rem; font-weight: 800; padding-top: 6px;">
                <span style="color: #fff;">Total Payable:</span>
                <span style="color: var(--red);">{{ $order->formatted_total }}</span>
            </div>
        </div>

        <!-- Next Steps Advice -->
        <p style="font-size: 0.88rem; color: #94a3b8; line-height: 1.5; margin-bottom: 24px;">
            Our dispatch representative will call or WhatsApp you shortly to confirm your car model and dispatch your parcel via Courier (Trax / CallCourier / TCS).
        </p>

        <!-- Actions -->
        <div style="display: flex; gap: 12px; justify-content: center; flex-wrap: wrap;">
            <a href="{{ $order->support_whatsapp_link }}" target="_blank" class="btn btn-whatsapp" style="padding: 12px 24px; text-decoration: none;">
                💬 Confirm on WhatsApp (+92 307 2818652)
            </a>
            <a href="{{ route('shop.index') }}" class="btn btn-outline" style="padding: 12px 24px; border-radius: 8px; text-decoration: none;">
                Continue Shopping
            </a>
        </div>
    </div>
</section>
@endsection
