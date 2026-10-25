@extends('layouts.admin')

@section('title', 'Manage Products Catalog')

@section('admin_content')
<div style="display: flex; justify-content: space-between; align-items: flex-end; margin-bottom: 24px; flex-wrap: wrap; gap: 16px;">
    <div>
        <h1 style="font-size: 1.8rem; font-weight: 800; color: #fff; margin-bottom: 6px;">Vehicle Covers Catalog</h1>
        <p style="color: #94a3b8; font-size: 0.9rem; margin: 0;">Manage stock, prices, descriptions, and cover imagery.</p>
    </div>
    <a href="{{ route('admin.products.create') }}" class="btn-table btn-table-primary" style="padding: 10px 18px; font-size: 0.9rem;">
        ➕ Add New Product
    </a>
</div>

<!-- Filters -->
<div class="admin-card" style="padding: 18px 24px;">
    <form action="{{ route('admin.products') }}" method="GET" style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 14px;">
        <div style="display: flex; gap: 8px; flex-wrap: wrap;">
            <a href="{{ route('admin.products', ['search' => request('search')]) }}" 
               class="btn-table {{ empty(request('cat')) ? 'btn-table-primary' : 'btn-table-outline' }}">
                All Categories
            </a>
            @foreach($categories as $c)
                <a href="{{ route('admin.products', ['cat' => $c, 'search' => request('search')]) }}" 
                   class="btn-table {{ request('cat') === $c ? 'btn-table-primary' : 'btn-table-outline' }}">
                    {{ $c }}
                </a>
            @endforeach
        </div>

        <div style="display: flex; gap: 8px;">
            <input type="text" name="search" value="{{ request('search') }}" placeholder="Search products..."
                   style="padding: 8px 12px; background: #161b26; border: 1px solid rgba(255,255,255,0.15); border-radius: 8px; color: #fff; font-size: 0.85rem; min-width: 220px;">
            <button type="submit" class="btn-table btn-table-primary">Filter</button>
        </div>
    </form>
</div>

<!-- Products Table -->
<div class="admin-card">
    @if($products->isEmpty())
        <div style="text-align: center; padding: 50px 20px; color: #94a3b8;">
            <div style="font-size: 2.5rem; margin-bottom: 10px;">📦</div>
            <h3 style="color: #fff; font-size: 1.2rem; margin-bottom: 6px;">No Products Found</h3>
            <p style="font-size: 0.85rem;">Click 'Add New Product' to list a new cover.</p>
        </div>
    @else
        <div style="overflow-x: auto;">
            <table class="admin-table">
                <thead>
                    <tr>
                        <th>Cover</th>
                        <th>Product Details</th>
                        <th>Category</th>
                        <th>Price</th>
                        <th>Stock</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    @foreach($products as $p)
                        <tr>
                            <td style="width: 70px;">
                                <img src="{{ asset($p->image) }}" alt="{{ $p->name }}" style="width: 60px; height: 60px; object-fit: contain; background: #161b26; border-radius: 8px; padding: 4px;">
                            </td>
                            <td>
                                <strong style="color: #fff; font-size: 0.95rem; display: block;">{{ $p->name }}</strong>
                                <span style="color: #94a3b8; font-size: 0.78rem;">Slug: {{ $p->slug }}</span>
                                @if($p->badge)
                                    <span style="display: inline-block; background: #e11d48; color: #fff; font-size: 0.68rem; font-weight: 800; padding: 2px 6px; border-radius: 4px; margin-left: 6px;">{{ $p->badge }}</span>
                                @endif
                            </td>
                            <td>
                                <span style="background: rgba(255,255,255,0.05); color: #cbd5e1; padding: 4px 10px; border-radius: 6px; font-size: 0.8rem; font-weight: 600;">
                                    {{ $p->cat }}
                                </span>
                            </td>
                            <td>
                                <strong style="color: #fff; font-size: 1rem; display: block;">{{ $p->formatted_price }}</strong>
                                @if($p->formatted_old_price)
                                    <span style="color: #94a3b8; font-size: 0.78rem; text-decoration: line-through;">{{ $p->formatted_old_price }}</span>
                                @endif
                            </td>
                            <td>
                                <span style="color: {{ $p->stock > 10 ? '#10b981' : '#f59e0b' }}; font-weight: 700;">
                                    {{ $p->stock }} units
                                </span>
                            </td>
                            <td>
                                <div style="display: flex; gap: 8px; align-items: center;">
                                    <a href="{{ route('admin.products.edit', $p) }}" class="btn-table btn-table-outline" title="Edit">
                                        ✏️ Edit
                                    </a>
                                    <form action="{{ route('admin.products.delete', $p) }}" method="POST" onsubmit="return confirm('Are you sure you want to permanently delete this cover?')">
                                        @csrf
                                        @method('DELETE')
                                        <button type="submit" class="btn-table btn-table-danger" title="Delete">
                                            🗑️
                                        </button>
                                    </form>
                                </div>
                            </td>
                        </tr>
                    @endforeach
                </tbody>
            </table>
        </div>

        <div style="margin-top: 24px;">
            {{ $products->links() }}
        </div>
    @endif
</div>
@endsection
