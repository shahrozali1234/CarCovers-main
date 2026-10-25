@extends('layouts.admin')

@section('title', "Edit Cover: {$product->name}")

@section('admin_content')
<div style="margin-bottom: 24px;">
    <a href="{{ route('admin.products') }}" style="color: #94a3b8; text-decoration: none; font-size: 0.85rem;">&larr; Back to Products</a>
    <h1 style="font-size: 1.8rem; font-weight: 800; color: #fff; margin-top: 8px;">Edit Cover: {{ $product->name }}</h1>
</div>

<div class="admin-card" style="max-width: 800px;">
    @if($errors->any())
        <div style="background: rgba(239, 68, 68, 0.15); border: 1px solid #ef4444; border-radius: 10px; padding: 14px 18px; margin-bottom: 24px; color: #ef4444; font-size: 0.85rem;">
            <strong>Please correct the following errors:</strong>
            <ul style="margin: 8px 0 0 18px; padding: 0;">
                @foreach ($errors->all() as $error)
                    <li>{{ $error }}</li>
                @endforeach
            </ul>
        </div>
    @endif

    <form action="{{ route('admin.products.update', $product) }}" method="POST" enctype="multipart/form-data">
        @csrf
        @method('PUT')

        <div style="display: grid; grid-template-columns: 2fr 1fr; gap: 20px; margin-bottom: 20px;">
            <div>
                <label style="display: block; font-weight: 600; color: #cbd5e1; margin-bottom: 6px; font-size: 0.85rem;">Cover Name *</label>
                <input type="text" name="name" value="{{ old('name', $product->name) }}" required
                       style="width: 100%; padding: 12px; background: #161b26; border: 1px solid rgba(255,255,255,0.15); border-radius: 8px; color: #fff; font-size: 0.95rem; box-sizing: border-box;">
            </div>

            <div>
                <label style="display: block; font-weight: 600; color: #cbd5e1; margin-bottom: 6px; font-size: 0.85rem;">Category *</label>
                <select name="cat" required style="width: 100%; padding: 12px; background: #161b26; border: 1px solid rgba(255,255,255,0.15); border-radius: 8px; color: #fff; font-size: 0.95rem; box-sizing: border-box;">
                    @foreach(['Car Covers', 'SUV Covers', 'Hatchback Covers', 'Bike Covers', 'Accessories'] as $c)
                        <option value="{{ $c }}" {{ old('cat', $product->cat) === $c ? 'selected' : '' }}>{{ $c }}</option>
                    @endforeach
                </select>
            </div>
        </div>

        <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 20px; margin-bottom: 20px;">
            <div>
                <label style="display: block; font-weight: 600; color: #cbd5e1; margin-bottom: 6px; font-size: 0.85rem;">Selling Price (Rs.) *</label>
                <input type="number" step="0.01" name="price" value="{{ old('price', $product->price) }}" required
                       style="width: 100%; padding: 12px; background: #161b26; border: 1px solid rgba(255,255,255,0.15); border-radius: 8px; color: #fff; font-size: 0.95rem; box-sizing: border-box;">
            </div>

            <div>
                <label style="display: block; font-weight: 600; color: #cbd5e1; margin-bottom: 6px; font-size: 0.85rem;">Original Price (Rs.)</label>
                <input type="number" step="0.01" name="old_price" value="{{ old('old_price', $product->old_price) }}"
                       style="width: 100%; padding: 12px; background: #161b26; border: 1px solid rgba(255,255,255,0.15); border-radius: 8px; color: #fff; font-size: 0.95rem; box-sizing: border-box;">
            </div>

            <div>
                <label style="display: block; font-weight: 600; color: #cbd5e1; margin-bottom: 6px; font-size: 0.85rem;">Stock Units</label>
                <input type="number" name="stock" value="{{ old('stock', $product->stock) }}"
                       style="width: 100%; padding: 12px; background: #161b26; border: 1px solid rgba(255,255,255,0.15); border-radius: 8px; color: #fff; font-size: 0.95rem; box-sizing: border-box;">
            </div>
        </div>

        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 20px;">
            <div>
                <label style="display: block; font-weight: 600; color: #cbd5e1; margin-bottom: 6px; font-size: 0.85rem;">Promotional Badge</label>
                <input type="text" name="badge" value="{{ old('badge', $product->badge) }}"
                       style="width: 100%; padding: 12px; background: #161b26; border: 1px solid rgba(255,255,255,0.15); border-radius: 8px; color: #fff; font-size: 0.95rem; box-sizing: border-box;">
            </div>

            <div>
                <label style="display: block; font-weight: 600; color: #cbd5e1; margin-bottom: 6px; font-size: 0.85rem;">Body Style</label>
                <select name="body_style" style="width: 100%; padding: 12px; background: #161b26; border: 1px solid rgba(255,255,255,0.15); border-radius: 8px; color: #fff; font-size: 0.95rem; box-sizing: border-box;">
                    @foreach(['Sedan', 'SUV', 'Hatchback', 'Motorcycle', 'Universal'] as $b)
                        <option value="{{ $b }}" {{ old('body_style', $product->body_style) === $b ? 'selected' : '' }}>{{ $b }}</option>
                    @endforeach
                </select>
            </div>
        </div>

        <div style="margin-bottom: 20px;">
            @php
                $sizesStr = is_array($product->sizes_available) ? implode(', ', $product->sizes_available) : $product->sizes_available;
            @endphp
            <label style="display: block; font-weight: 600; color: #cbd5e1; margin-bottom: 6px; font-size: 0.85rem;">Available Sizes / Models (Comma Separated)</label>
            <input type="text" name="sizes_available" value="{{ old('sizes_available', $sizesStr) }}"
                   style="width: 100%; padding: 12px; background: #161b26; border: 1px solid rgba(255,255,255,0.15); border-radius: 8px; color: #fff; font-size: 0.95rem; box-sizing: border-box;">
        </div>

        <div style="margin-bottom: 20px;">
            <label style="display: block; font-weight: 600; color: #cbd5e1; margin-bottom: 6px; font-size: 0.85rem;">Short Marketing Description</label>
            <textarea name="short_desc" rows="3"
                      style="width: 100%; padding: 12px; background: #161b26; border: 1px solid rgba(255,255,255,0.15); border-radius: 8px; color: #fff; font-size: 0.95rem; box-sizing: border-box;">{{ old('short_desc', $product->short_desc) }}</textarea>
        </div>

        <div style="margin-bottom: 24px;">
            <label style="display: block; font-weight: 600; color: #cbd5e1; margin-bottom: 6px; font-size: 0.85rem;">Change Cover Image (Optional)</label>
            <div style="display: flex; gap: 16px; align-items: center; margin-bottom: 8px;">
                <img src="{{ asset($product->image) }}" alt="Current Cover" style="height: 60px; width: 60px; object-fit: contain; background: #161b26; border-radius: 8px; padding: 4px;">
                <span style="font-size: 0.85rem; color: #94a3b8;">Current: {{ $product->image }}</span>
            </div>
            <input type="file" name="image_file" accept="image/jpeg,image/png,image/webp"
                   style="padding: 10px; background: #161b26; border: 1px solid rgba(255,255,255,0.15); border-radius: 8px; color: #fff; font-size: 0.9rem; width: 100%; box-sizing: border-box;">
        </div>

        <div style="display: flex; gap: 12px;">
            <button type="submit" class="btn btn-primary" style="padding: 12px 24px; font-weight: 700; border: none; cursor: pointer; border-radius: 8px;">
                💾 Update Product
            </button>
            <a href="{{ route('admin.products') }}" class="btn btn-outline" style="padding: 12px 24px; border-radius: 8px; text-decoration: none;">
                Cancel
            </a>
        </div>
    </form>
</div>
@endsection
