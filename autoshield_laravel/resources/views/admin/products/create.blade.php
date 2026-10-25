@extends('layouts.admin')

@section('title', 'Add New Vehicle Cover')

@section('admin_content')
<div style="margin-bottom: 24px;">
    <a href="{{ route('admin.products') }}" style="color: #94a3b8; text-decoration: none; font-size: 0.85rem;">&larr; Back to Products</a>
    <h1 style="font-size: 1.8rem; font-weight: 800; color: #fff; margin-top: 8px;">Create New Cover Listing</h1>
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

    <form action="{{ route('admin.products.store') }}" method="POST" enctype="multipart/form-data">
        @csrf

        <div style="display: grid; grid-template-columns: 2fr 1fr; gap: 20px; margin-bottom: 20px;">
            <div>
                <label style="display: block; font-weight: 600; color: #cbd5e1; margin-bottom: 6px; font-size: 0.85rem;">Cover Name *</label>
                <input type="text" name="name" value="{{ old('name') }}" required placeholder="e.g. All Weather 5-Layer Titanium Sedan Cover"
                       style="width: 100%; padding: 12px; background: #161b26; border: 1px solid rgba(255,255,255,0.15); border-radius: 8px; color: #fff; font-size: 0.95rem; box-sizing: border-box;">
            </div>

            <div>
                <label style="display: block; font-weight: 600; color: #cbd5e1; margin-bottom: 6px; font-size: 0.85rem;">Category *</label>
                <select name="cat" required style="width: 100%; padding: 12px; background: #161b26; border: 1px solid rgba(255,255,255,0.15); border-radius: 8px; color: #fff; font-size: 0.95rem; box-sizing: border-box;">
                    <option value="Car Covers">Car Covers</option>
                    <option value="SUV Covers">SUV Covers</option>
                    <option value="Hatchback Covers">Hatchback Covers</option>
                    <option value="Bike Covers">Bike Covers</option>
                    <option value="Accessories">Accessories</option>
                </select>
            </div>
        </div>

        <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 20px; margin-bottom: 20px;">
            <div>
                <label style="display: block; font-weight: 600; color: #cbd5e1; margin-bottom: 6px; font-size: 0.85rem;">Selling Price (Rs.) *</label>
                <input type="number" step="0.01" name="price" value="{{ old('price') }}" required placeholder="e.g. 7500"
                       style="width: 100%; padding: 12px; background: #161b26; border: 1px solid rgba(255,255,255,0.15); border-radius: 8px; color: #fff; font-size: 0.95rem; box-sizing: border-box;">
            </div>

            <div>
                <label style="display: block; font-weight: 600; color: #cbd5e1; margin-bottom: 6px; font-size: 0.85rem;">Original Price (Rs.)</label>
                <input type="number" step="0.01" name="old_price" value="{{ old('old_price') }}" placeholder="e.g. 9500"
                       style="width: 100%; padding: 12px; background: #161b26; border: 1px solid rgba(255,255,255,0.15); border-radius: 8px; color: #fff; font-size: 0.95rem; box-sizing: border-box;">
            </div>

            <div>
                <label style="display: block; font-weight: 600; color: #cbd5e1; margin-bottom: 6px; font-size: 0.85rem;">Stock Units</label>
                <input type="number" name="stock" value="{{ old('stock', 50) }}"
                       style="width: 100%; padding: 12px; background: #161b26; border: 1px solid rgba(255,255,255,0.15); border-radius: 8px; color: #fff; font-size: 0.95rem; box-sizing: border-box;">
            </div>
        </div>

        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 20px;">
            <div>
                <label style="display: block; font-weight: 600; color: #cbd5e1; margin-bottom: 6px; font-size: 0.85rem;">Promotional Badge</label>
                <input type="text" name="badge" value="{{ old('badge', 'NEW ARRIVAL') }}" placeholder="e.g. BEST SELLER, HOT DEAL"
                       style="width: 100%; padding: 12px; background: #161b26; border: 1px solid rgba(255,255,255,0.15); border-radius: 8px; color: #fff; font-size: 0.95rem; box-sizing: border-box;">
            </div>

            <div>
                <label style="display: block; font-weight: 600; color: #cbd5e1; margin-bottom: 6px; font-size: 0.85rem;">Body Style</label>
                <select name="body_style" style="width: 100%; padding: 12px; background: #161b26; border: 1px solid rgba(255,255,255,0.15); border-radius: 8px; color: #fff; font-size: 0.95rem; box-sizing: border-box;">
                    <option value="Sedan">Sedan</option>
                    <option value="SUV">SUV & 4x4</option>
                    <option value="Hatchback">Hatchback</option>
                    <option value="Motorcycle">Motorcycle</option>
                    <option value="Universal">Universal</option>
                </select>
            </div>
        </div>

        <div style="margin-bottom: 20px;">
            <label style="display: block; font-weight: 600; color: #cbd5e1; margin-bottom: 6px; font-size: 0.85rem;">Available Sizes / Models (Comma Separated)</label>
            <input type="text" name="sizes_available" value="{{ old('sizes_available', 'Universal Fit, Medium Sedan, Large Sedan') }}" placeholder="e.g. Standard Fit, Hatchback, SUV"
                   style="width: 100%; padding: 12px; background: #161b26; border: 1px solid rgba(255,255,255,0.15); border-radius: 8px; color: #fff; font-size: 0.95rem; box-sizing: border-box;">
        </div>

        <div style="margin-bottom: 20px;">
            <label style="display: block; font-weight: 600; color: #cbd5e1; margin-bottom: 6px; font-size: 0.85rem;">Short Marketing Description</label>
            <textarea name="short_desc" rows="3" placeholder="Describe the cover features, UV resistance, and weather protection..."
                      style="width: 100%; padding: 12px; background: #161b26; border: 1px solid rgba(255,255,255,0.15); border-radius: 8px; color: #fff; font-size: 0.95rem; box-sizing: border-box;">{{ old('short_desc') }}</textarea>
        </div>

        <div style="margin-bottom: 24px;">
            <label style="display: block; font-weight: 600; color: #cbd5e1; margin-bottom: 6px; font-size: 0.85rem;">Cover Image (JPG, PNG, WebP — Max 5MB)</label>
            <input type="file" name="image_file" accept="image/jpeg,image/png,image/webp"
                   style="padding: 10px; background: #161b26; border: 1px solid rgba(255,255,255,0.15); border-radius: 8px; color: #fff; font-size: 0.9rem; width: 100%; box-sizing: border-box;">
        </div>

        <div style="display: flex; gap: 12px;">
            <button type="submit" class="btn btn-primary" style="padding: 12px 24px; font-weight: 700; border: none; cursor: pointer; border-radius: 8px;">
                💾 Save Product
            </button>
            <a href="{{ route('admin.products') }}" class="btn btn-outline" style="padding: 12px 24px; border-radius: 8px; text-decoration: none;">
                Cancel
            </a>
        </div>
    </form>
</div>
@endsection
