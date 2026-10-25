@extends('layouts.admin')

@section('title', 'Manage Customer Orders')

@section('admin_content')
<div style="display: flex; justify-content: space-between; align-items: flex-end; margin-bottom: 24px; flex-wrap: wrap; gap: 16px;">
    <div>
        <h1 style="font-size: 1.8rem; font-weight: 800; color: #fff; margin-bottom: 6px;">Customer Orders</h1>
        <p style="color: #94a3b8; font-size: 0.9rem; margin: 0;">Fulfill, update status, message customers on WhatsApp, and print delivery invoices.</p>
    </div>
</div>

<!-- Filters & Search -->
<div class="admin-card" style="padding: 18px 24px;">
    <form action="{{ route('admin.orders') }}" method="GET" style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 14px;">
        <!-- Status Tabs -->
        <div style="display: flex; gap: 8px; flex-wrap: wrap;">
            @php $currentStatus = request('status'); @endphp
            <a href="{{ route('admin.orders', ['search' => request('search')]) }}" class="btn-table {{ empty($currentStatus) ? 'btn-table-primary' : 'btn-table-outline' }}">
                All Orders
            </a>
            @foreach(['Confirmed', 'Processing', 'Shipped', 'Delivered', 'Cancelled'] as $st)
                <a href="{{ route('admin.orders', ['status' => $st, 'search' => request('search')]) }}" 
                   class="btn-table {{ $currentStatus === $st ? 'btn-table-primary' : 'btn-table-outline' }}">
                    {{ $st }}
                </a>
            @endforeach
        </div>

        <!-- Search -->
        <div style="display: flex; gap: 8px;">
            <input type="text" name="search" value="{{ request('search') }}" placeholder="Search customer, phone, order #..."
                   style="padding: 8px 12px; background: #161b26; border: 1px solid rgba(255,255,255,0.15); border-radius: 8px; color: #fff; font-size: 0.85rem; min-width: 240px;">
            <button type="submit" class="btn-table btn-table-primary">Search</button>
        </div>
    </form>
</div>

<!-- Orders Table -->
<div class="admin-card">
    @if($orders->isEmpty())
        <div style="text-align: center; padding: 50px 20px; color: #94a3b8;">
            <div style="font-size: 2.5rem; margin-bottom: 10px;">📦</div>
            <h3 style="color: #fff; font-size: 1.2rem; margin-bottom: 6px;">No Orders Found</h3>
            <p style="font-size: 0.85rem;">No orders match the current filter criteria.</p>
        </div>
    @else
        <div style="overflow-x: auto;">
            <table class="admin-table">
                <thead>
                    <tr>
                        <th>Order Ref</th>
                        <th>Customer / Contact</th>
                        <th>Destination</th>
                        <th>Items Ordered</th>
                        <th>Total Amount</th>
                        <th>Update Status</th>
                        <th>Invoice</th>
                    </tr>
                </thead>
                <tbody>
                    @foreach($orders as $order)
                        <tr>
                            <td>
                                <strong style="color: #fff; display: block; font-size: 0.95rem;">#{{ $order->order_number }}</strong>
                                <span style="color: #94a3b8; font-size: 0.75rem;">{{ $order->created_at->format('d M Y, h:i A') }}</span>
                            </td>
                            <td>
                                <strong style="color: #fff; display: block;">{{ $order->customer_name }}</strong>
                                <a href="{{ $order->whatsapp_link }}" target="_blank" class="btn-table btn-table-whatsapp" style="margin-top: 4px;">
                                    💬 {{ $order->phone }}
                                </a>
                            </td>
                            <td>
                                <strong style="color: #cbd5e1; display: block;">{{ $order->city }}</strong>
                                <span style="color: #94a3b8; font-size: 0.78rem; display: block; max-width: 220px;">{{ $order->address }}</span>
                                @if($order->notes)
                                    <span style="color: #f59e0b; font-size: 0.75rem; display: block; margin-top: 2px;">📝 {{ $order->notes }}</span>
                                @endif
                            </td>
                            <td>
                                <div style="font-size: 0.82rem; color: #cbd5e1; max-width: 220px;">
                                    @if(is_array($order->items_json))
                                        @foreach($order->items_json as $it)
                                            <div>• <strong>{{ $it['product_name'] ?? ($it['name'] ?? 'Car Cover') }}</strong> × {{ $it['quantity'] ?? ($it['qty'] ?? 1) }}</div>
                                        @endforeach
                                    @else
                                        Standard Cover
                                    @endif
                                </div>
                            </td>
                            <td>
                                <strong style="color: var(--red); font-size: 1.05rem;">{{ $order->formatted_total }}</strong>
                                <span style="display: block; font-size: 0.72rem; color: #94a3b8;">{{ $order->payment_method }}</span>
                            </td>
                            <td>
                                <form action="{{ route('admin.orders.updateStatus', $order) }}" method="POST" style="display: flex; gap: 6px; align-items: center;">
                                    @csrf
                                    @method('PATCH')
                                    <select name="status" onchange="this.form.submit()"
                                            style="padding: 6px 10px; background: #161b26; border: 1px solid rgba(255,255,255,0.15); border-radius: 6px; color: #fff; font-size: 0.8rem; font-weight: 600;">
                                        <option value="Confirmed" {{ $order->status === 'Confirmed' ? 'selected' : '' }}>Confirmed</option>
                                        <option value="Processing" {{ $order->status === 'Processing' ? 'selected' : '' }}>Processing</option>
                                        <option value="Shipped" {{ $order->status === 'Shipped' ? 'selected' : '' }}>Shipped</option>
                                        <option value="Delivered" {{ $order->status === 'Delivered' ? 'selected' : '' }}>Delivered</option>
                                        <option value="Cancelled" {{ $order->status === 'Cancelled' ? 'selected' : '' }}>Cancelled</option>
                                    </select>
                                </form>
                            </td>
                            <td>
                                <a href="{{ route('admin.orders.invoice', $order) }}" target="_blank" class="btn-table btn-table-outline" title="Print Delivery Slip">
                                    🖨️ Print
                                </a>
                            </td>
                        </tr>
                    @endforeach
                </tbody>
            </table>
        </div>

        <div style="margin-top: 24px;">
            {{ $orders->links() }}
        </div>
    @endif
</div>
@endsection
