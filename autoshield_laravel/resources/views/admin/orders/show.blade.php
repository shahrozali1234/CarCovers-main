@extends('layouts.admin')

@section('title', "Manage Order #{$order->order_number}")

@section('admin_content')
<div style="margin-bottom: 24px;">
    <a href="{{ route('admin.orders') }}" style="color: #94a3b8; text-decoration: none; font-size: 0.85rem;">&larr; Back to All Orders</a>
    <div style="display: flex; justify-content: space-between; align-items: flex-end; margin-top: 8px; flex-wrap: wrap; gap: 12px;">
        <div>
            <h1 style="font-size: 1.8rem; font-weight: 800; color: #fff; margin: 0;">Order #{{ $order->order_number }}</h1>
            <span style="color: #94a3b8; font-size: 0.85rem;">Placed {{ $order->created_at->format('M d, Y \a\t h:i A') }}</span>
        </div>
        <div style="display: flex; gap: 10px;">
            <a href="{{ $order->whatsapp_link }}" target="_blank" class="btn-table btn-table-whatsapp" style="padding: 10px 16px;">
                💬 Message on WhatsApp
            </a>
            <a href="{{ route('admin.orders.invoice', $order) }}" target="_blank" class="btn-table btn-table-outline" style="padding: 10px 16px;">
                🖨️ Printable Invoice
            </a>
        </div>
    </div>
</div>

<div style="display: grid; grid-template-columns: 2fr 1fr; gap: 24px; align-items: start;">
    <!-- Left: Ordered Items & Notes -->
    <div class="admin-card">
        <h2 style="font-size: 1.2rem; font-weight: 800; color: #fff; margin-bottom: 16px;">Items Ordered</h2>
        <table class="admin-table">
            <thead>
                <tr>
                    <th>Item Description</th>
                    <th style="text-align: center;">Size</th>
                    <th style="text-align: center;">Qty</th>
                    <th style="text-align: right;">Unit Price</th>
                    <th style="text-align: right;">Total</th>
                </tr>
            </thead>
            <tbody>
                @if(is_array($order->items_json))
                    @foreach($order->items_json as $item)
                        <tr>
                            <td>
                                <strong style="color: #fff;">{{ $item['product_name'] ?? ($item['name'] ?? 'Car Cover') }}</strong>
                            </td>
                            <td style="text-align: center; color: #f59e0b;">{{ $item['size'] ?? 'Standard Fit' }}</td>
                            <td style="text-align: center; font-weight: 700;">{{ $item['quantity'] ?? ($item['qty'] ?? 1) }}</td>
                            <td style="text-align: right;">Rs. {{ number_format($item['price'] ?? 0) }}</td>
                            <td style="text-align: right; font-weight: 800; color: #fff;">
                                Rs. {{ number_format(($item['price'] ?? 0) * ($item['quantity'] ?? ($item['qty'] ?? 1))) }}
                            </td>
                        </tr>
                    @endforeach
                @endif
            </tbody>
        </table>

        <div style="border-top: 1px solid rgba(255,255,255,0.08); padding-top: 18px; margin-top: 20px;">
            <div style="display: flex; justify-content: flex-end; gap: 30px; font-size: 0.9rem; margin-bottom: 6px;">
                <span style="color: #94a3b8;">Subtotal:</span>
                <span style="color: #fff; font-weight: 600;">Rs. {{ number_format($order->subtotal > 0 ? $order->subtotal : $order->total_amount) }}</span>
            </div>
            <div style="display: flex; justify-content: flex-end; gap: 30px; font-size: 0.9rem; margin-bottom: 8px;">
                <span style="color: #94a3b8;">Shipping:</span>
                <span style="color: #10b981; font-weight: 600;">FREE Nationwide</span>
            </div>
            <div style="display: flex; justify-content: flex-end; gap: 30px; font-size: 1.25rem; font-weight: 900; color: #fff;">
                <span>Total Due:</span>
                <span style="color: var(--red);">{{ $order->formatted_total }}</span>
            </div>
        </div>

        @if($order->notes)
            <div style="margin-top: 24px; background: rgba(245, 158, 11, 0.1); border: 1px solid rgba(245, 158, 11, 0.3); border-radius: 10px; padding: 14px;">
                <strong style="color: #f59e0b; display: block; margin-bottom: 4px;">Customer Car Model / Instructions:</strong>
                <div style="color: #fff; font-size: 0.9rem;">{{ $order->notes }}</div>
            </div>
        @endif
    </div>

    <!-- Right: Customer Info & Status Changer -->
    <div>
        <!-- Status Form -->
        <div class="admin-card">
            <h3 style="font-size: 1.1rem; font-weight: 800; color: #fff; margin-bottom: 12px;">Order Status</h3>
            <form action="{{ route('admin.orders.updateStatus', $order) }}" method="POST">
                @csrf
                @method('PATCH')
                <select name="status" style="width: 100%; padding: 12px; background: #161b26; border: 1px solid rgba(255,255,255,0.15); border-radius: 8px; color: #fff; font-size: 0.95rem; font-weight: 700; margin-bottom: 12px;">
                    @foreach(['Confirmed', 'Processing', 'Shipped', 'Delivered', 'Cancelled'] as $st)
                        <option value="{{ $st }}" {{ $order->status === $st ? 'selected' : '' }}>{{ $st }}</option>
                    @endforeach
                </select>
                <button type="submit" class="btn btn-primary" style="width: 100%; padding: 10px; font-weight: 700; border: none; cursor: pointer; border-radius: 8px;">
                    Update Status
                </button>
            </form>
        </div>

        <!-- Customer Card -->
        <div class="admin-card">
            <h3 style="font-size: 1.1rem; font-weight: 800; color: #fff; margin-bottom: 14px;">Customer Details</h3>
            <div style="margin-bottom: 12px;">
                <strong style="display: block; font-size: 0.8rem; color: #94a3b8; text-transform: uppercase;">Full Name:</strong>
                <span style="font-size: 1rem; color: #fff; font-weight: 600;">{{ $order->customer_name }}</span>
            </div>
            <div style="margin-bottom: 12px;">
                <strong style="display: block; font-size: 0.8rem; color: #94a3b8; text-transform: uppercase;">Mobile Phone:</strong>
                <a href="{{ $order->whatsapp_link }}" target="_blank" style="color: #22c55e; font-weight: 700; text-decoration: none;">
                    💬 {{ $order->phone }}
                </a>
            </div>
            <div style="margin-bottom: 12px;">
                <strong style="display: block; font-size: 0.8rem; color: #94a3b8; text-transform: uppercase;">Delivery City:</strong>
                <span style="color: #fff;">{{ $order->city }}</span>
            </div>
            <div style="margin-bottom: 12px;">
                <strong style="display: block; font-size: 0.8rem; color: #94a3b8; text-transform: uppercase;">Shipping Address:</strong>
                <span style="color: #cbd5e1; font-size: 0.9rem; line-height: 1.4;">{{ $order->address }}</span>
            </div>
            <div>
                <strong style="display: block; font-size: 0.8rem; color: #94a3b8; text-transform: uppercase;">Payment Mode:</strong>
                <span style="color: var(--red); font-weight: 700;">{{ $order->payment_method }}</span>
            </div>
        </div>
    </div>
</div>
@endsection
