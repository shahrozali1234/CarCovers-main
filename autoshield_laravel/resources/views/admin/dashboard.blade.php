@extends('layouts.admin')

@section('title', 'Admin Dashboard Overview')

@section('admin_content')
<div style="margin-bottom: 28px;">
    <h1 style="font-size: 1.8rem; font-weight: 800; color: #fff; margin-bottom: 6px;">Executive Dashboard</h1>
    <p style="color: #94a3b8; font-size: 0.9rem;">Store metrics, real-time sales overview and order fulfillment queue.</p>
</div>

<!-- 4 Key Metric Cards -->
<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 20px; margin-bottom: 32px;">
    <div class="admin-card" style="margin-bottom: 0;">
        <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 12px;">
            <span style="font-size: 0.8rem; color: #94a3b8; text-transform: uppercase; font-weight: 700;">Total Revenue</span>
            <span style="background: rgba(16, 185, 129, 0.15); color: #10b981; padding: 4px 8px; border-radius: 6px; font-size: 0.8rem; font-weight: 800;">COD</span>
        </div>
        <div style="font-size: 1.8rem; font-weight: 900; color: #fff;">Rs. {{ number_format($totalRevenue) }}</div>
        <div style="font-size: 0.78rem; color: #10b981; margin-top: 6px;">Excluding cancelled orders</div>
    </div>

    <div class="admin-card" style="margin-bottom: 0;">
        <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 12px;">
            <span style="font-size: 0.8rem; color: #94a3b8; text-transform: uppercase; font-weight: 700;">Total Orders</span>
            <span style="background: rgba(59, 130, 246, 0.15); color: #3b82f6; padding: 4px 8px; border-radius: 6px; font-size: 0.8rem; font-weight: 800;">Orders</span>
        </div>
        <div style="font-size: 1.8rem; font-weight: 900; color: #fff;">{{ $totalOrders }}</div>
        <div style="font-size: 0.78rem; color: #94a3b8; margin-top: 6px;">All nationwide bookings</div>
    </div>

    <div class="admin-card" style="margin-bottom: 0;">
        <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 12px;">
            <span style="font-size: 0.8rem; color: #94a3b8; text-transform: uppercase; font-weight: 700;">Pending Confirmation</span>
            <span style="background: rgba(245, 158, 11, 0.15); color: #f59e0b; padding: 4px 8px; border-radius: 6px; font-size: 0.8rem; font-weight: 800;">Action Req.</span>
        </div>
        <div style="font-size: 1.8rem; font-weight: 900; color: #f59e0b;">{{ $pendingOrders }}</div>
        <div style="font-size: 0.78rem; color: #94a3b8; margin-top: 6px;">Need dispatch verification</div>
    </div>

    <div class="admin-card" style="margin-bottom: 0;">
        <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 12px;">
            <span style="font-size: 0.8rem; color: #94a3b8; text-transform: uppercase; font-weight: 700;">Active Products</span>
            <span style="background: rgba(139, 92, 246, 0.15); color: #8b5cf6; padding: 4px 8px; border-radius: 6px; font-size: 0.8rem; font-weight: 800;">In Stock</span>
        </div>
        <div style="font-size: 1.8rem; font-weight: 900; color: #fff;">{{ $totalProducts }}</div>
        <div style="font-size: 0.78rem; color: #94a3b8; margin-top: 6px;">Catalog covers ready</div>
    </div>
</div>

<!-- Recent Orders Table Card -->
<div class="admin-card">
    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 18px;">
        <div>
            <h2 style="font-size: 1.25rem; font-weight: 800; color: #fff; margin-bottom: 4px;">Recent Customer Bookings</h2>
            <p style="color: #94a3b8; font-size: 0.85rem; margin: 0;">Latest customer orders placed via the online store</p>
        </div>
        <a href="{{ route('admin.orders') }}" class="btn-table btn-table-primary">View All Orders &rarr;</a>
    </div>

    @if($recentOrders->isEmpty())
        <div style="text-align: center; padding: 40px; color: #94a3b8;">
            No customer orders recorded yet. Place a test order from the checkout page!
        </div>
    @else
        <div style="overflow-x: auto;">
            <table class="admin-table">
                <thead>
                    <tr>
                        <th>Order #</th>
                        <th>Customer</th>
                        <th>City / Address</th>
                        <th>Amount</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    @foreach($recentOrders as $order)
                        <tr>
                            <td>
                                <strong style="color: #fff; display: block;">#{{ $order->order_number }}</strong>
                                <span style="color: #94a3b8; font-size: 0.75rem;">{{ $order->created_at->diffForHumans() }}</span>
                            </td>
                            <td>
                                <strong style="color: #fff; display: block;">{{ $order->customer_name }}</strong>
                                <a href="{{ $order->whatsapp_link }}" target="_blank" class="btn-table btn-table-whatsapp" style="margin-top: 4px;">
                                    💬 {{ $order->phone }}
                                </a>
                            </td>
                            <td>
                                <strong style="color: #cbd5e1; display: block;">{{ $order->city }}</strong>
                                <span style="color: #94a3b8; font-size: 0.8rem;">{{ Str::limit($order->address, 40) }}</span>
                            </td>
                            <td>
                                <strong style="color: var(--red); font-size: 1rem;">{{ $order->formatted_total }}</strong>
                                <span style="display: block; font-size: 0.72rem; color: #94a3b8;">{{ $order->payment_method }}</span>
                            </td>
                            <td>
                                <span class="badge-status status-{{ strtolower($order->status) }}">{{ $order->status }}</span>
                            </td>
                            <td>
                                <div style="display: flex; gap: 6px;">
                                    <a href="{{ route('admin.orders.invoice', $order) }}" target="_blank" class="btn-table btn-table-outline" title="Print Invoice">
                                        🖨️
                                    </a>
                                    <a href="{{ route('admin.orders.show', $order) }}" class="btn-table btn-table-primary">
                                        Manage
                                    </a>
                                </div>
                            </td>
                        </tr>
                    @endforeach
                </tbody>
            </table>
        </div>
    @endif
</div>
@endsection
