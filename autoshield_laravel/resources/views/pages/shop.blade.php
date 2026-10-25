@extends('layouts.app')

@section('title', 'The Collection — Bespoke Automotive Protective Covers | AutoShield')
@section('meta_description', 'Browse our complete collection of bespoke automotive covers for SUVs, sedans, coupes, hatchbacks, and motorcycles. 100% waterproof, solar UV deflector, velvet fleece lining.')

@section('content')
<!-- Page Banner -->
<section class="page-banner">
    <div class="container">
        <div class="eyebrow">Bespoke Collection</div>
        <h1>THE AUTOMOTIVE <span class="text-gradient">COVER COLLECTION</span></h1>
        <p>Bespoke tailored indoor and outdoor protection engineered with composite weather armor and soft velvet lining.</p>
        <div style="margin-top: 18px;">
            <span class="fit-guarantee-pill">
                <span class="pulse-green"></span> 100% Guaranteed Exact Fitment • Cash on Delivery Nationwide
            </span>
        </div>
    </div>
</section>

<!-- Shop Filter & Product Grid -->
<section class="shop-section">
    <div class="container">

        <!-- Breadcrumb -->
        <div class="breadcrumb">
            <a href="{{ route('home') }}">Home</a>
            <span class="breadcrumb-sep">/</span>
            @if(!empty($make) && !empty($search))
                <a href="{{ route('shop.index') }}">The Collection</a>
                <span class="breadcrumb-sep">/</span>
                <span class="breadcrumb-current">{{ $make }} — {{ $search }}</span>
            @elseif(!empty($make))
                <a href="{{ route('shop.index') }}">The Collection</a>
                <span class="breadcrumb-sep">/</span>
                <span class="breadcrumb-current">{{ $make }} Covers</span>
            @elseif(!empty($body))
                <a href="{{ route('shop.index') }}">The Collection</a>
                <span class="breadcrumb-sep">/</span>
                <span class="breadcrumb-current">{{ ucfirst($body) }} Covers</span>
            @elseif(!empty($search))
                <a href="{{ route('shop.index') }}">The Collection</a>
                <span class="breadcrumb-sep">/</span>
                <span class="breadcrumb-current">Search: "{{ $search }}"</span>
            @else
                <span class="breadcrumb-current">The Complete Collection</span>
            @endif
        </div>

        <div class="shop-filter-bar">
            <!-- Velox Body Style Tabs -->
            <div class="filter-tabs">
                <a href="{{ route('shop.index') }}" 
                   class="tab-btn {{ empty($body) && (empty($category) || $category === 'all') ? 'active' : '' }}">
                    All Covers
                </a>
                <a href="{{ route('shop.index', ['body' => 'suv']) }}" 
                   class="tab-btn {{ $body === 'suv' ? 'active' : '' }}">
                    SUV & 4x4 Covers
                </a>
                <a href="{{ route('shop.index', ['body' => 'sedan']) }}" 
                   class="tab-btn {{ $body === 'sedan' || $body === 'coupe' ? 'active' : '' }}">
                    Coupe & Sedan
                </a>
                <a href="{{ route('shop.index', ['body' => 'hatchback']) }}" 
                   class="tab-btn {{ $body === 'hatchback' ? 'active' : '' }}">
                    Hatchback Covers
                </a>
                <a href="{{ route('shop.index', ['body' => 'bike']) }}" 
                   class="tab-btn {{ $body === 'bike' || $body === 'motorcycle' ? 'active' : '' }}">
                    Motorcycle Covers
                </a>
            </div>

            <!-- Search and Sorting Filter Form -->
            <form action="{{ route('shop.index') }}" method="GET" style="display:flex; align-items:center; gap: 12px; flex-wrap: wrap;">
                @if($make)
                    <input type="hidden" name="make" value="{{ $make }}">
                @endif
                @if($body)
                    <input type="hidden" name="body" value="{{ $body }}">
                @elseif($category && $category !== 'all')
                    <input type="hidden" name="category" value="{{ $category }}">
                @endif
                <input type="text" name="search" value="{{ $search }}" placeholder="Search car model..." class="shop-search-input">
                <select name="sort" onchange="this.form.submit()" class="sort-select">
                    <option value="newest" {{ $sort === 'newest' ? 'selected' : '' }}>Featured</option>
                    <option value="price_low" {{ $sort === 'price_low' ? 'selected' : '' }}>Price: Low to High</option>
                    <option value="price_high" {{ $sort === 'price_high' ? 'selected' : '' }}>Price: High to Low</option>
                    <option value="rating" {{ $sort === 'rating' ? 'selected' : '' }}>Highest Rated</option>
                </select>
                @if(!$products->isEmpty())
                    <span class="product-count-badge">{{ $products->total() }} products</span>
                @endif
            </form>
        </div>

        @if($products->isEmpty())
            <div style="background: var(--bg-card); border: 1px dashed var(--border-color); border-radius: var(--radius-md); padding: 60px 20px; text-align: center; margin: 40px 0;">
                <div style="font-size: 3rem; margin-bottom: 12px;">🛡️</div>
                <h3 style="font-family: var(--font-serif); font-size: 1.5rem; color: var(--text-primary); margin-bottom: 8px;">No Covers Found Matching Your Query</h3>
                <p style="color: var(--text-muted); font-size: 0.95rem; margin-bottom: 24px;">
                    Try checking for spelling variations or browse our full catalogue without filters.
                </p>
                <a href="{{ route('shop.index') }}" class="btn btn-outline btn-sm">Clear Active Filters</a>
            </div>
        @else
            <!-- Full Shop Product Grid -->
            <div class="product-grid" style="margin-bottom: 48px;">
                @foreach($products as $product)
                    <article class="product-card">
                        @if($product->badge)
                            <span class="badge-discount">{{ $product->badge }}</span>
                        @endif
                        <div class="product-thumb">
                            <button type="button" class="card-like-btn" data-product-id="{{ $product->id }}" data-product-name="{{ $product->name }}" data-product-price="{{ $product->formatted_price }}" data-product-img="{{ asset($product->image) }}" data-product-url="{{ route('shop.show', $product->slug) }}" title="Save to Wishlist" aria-label="Like cover">
                                <svg class="like-heart-icon" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"></path>
                                </svg>
                            </button>
                            <a href="{{ route('shop.show', $product->slug) }}">
                                <img src="{{ asset($product->image) }}" alt="{{ $product->name }}" loading="lazy">
                            </a>
                            <div class="quick-view-overlay" style="display:flex; gap:8px;">
                                <button type="button" class="btn btn-outline btn-sm" data-quickview='@json($product)'>
                                    Quick View 👁️
                                </button>
                                <a href="{{ route('shop.show', $product->slug) }}" class="btn btn-outline btn-sm">Details →</a>
                            </div>
                        </div>
                        <div class="product-info">
                            <div class="product-cat-tag" style="color: var(--gold-accent); letter-spacing: 1.5px; font-weight: 600;">{{ $product->cat }}</div>
                            <h3 class="product-title" style="font-family: var(--font-serif); font-size: 1.35rem; font-weight: 400; line-height: 1.25;">
                                <a href="{{ route('shop.show', $product->slug) }}">{{ $product->name }}</a>
                            </h3>
                            <div class="product-rating" style="color: var(--gold-accent);">
                                ★★★★★ <span>({{ $product->reviews_count ?? 45 }} reviews)</span>
                            </div>
                            <div class="product-price-row">
                                <span class="current-price" style="color: var(--gold-accent); font-family: var(--font-sans); font-weight: 700;">From {{ $product->formatted_price }}</span>
                                @if($product->formatted_old_price)
                                    <span class="old-price">{{ $product->formatted_old_price }}</span>
                                @endif
                            </div>

                            <table class="velox-spec-table" style="margin-top: 4px; margin-bottom: 14px;">
                                <tr><td>USE</td><td>All-Weather Protection</td></tr>
                                <tr><td>LINING</td><td>Cotton Velvet Guard</td></tr>
                                <tr><td>PROTECTION</td><td>100% Monsoon Proof</td></tr>
                                <tr><td>FINISH</td><td>Custom Tailored Pattern</td></tr>
                            </table>

                            <div style="display:flex; gap:8px; margin-top: auto;">
                                <a href="{{ route('shop.show', $product->slug) }}" class="btn btn-primary" style="flex:1; padding:12px; font-size:0.8rem; text-align:center;">
                                    VIEW & CONFIGURE →
                                </a>
                                <a href="https://wa.me/923072818652?text=Hello%20AutoShield!%20I%20want%20to%20order%20{{ urlencode($product->name) }}" target="_blank" class="btn btn-whatsapp" style="padding:10px 14px;" title="Order via WhatsApp">
                                    💬
                                </a>
                            </div>
                        </div>
                    </article>
                @endforeach
            </div>

            <!-- Pagination -->
            <div style="display:flex; justify-content:center; margin-bottom: 40px;">
                {{ $products->links() }}
            </div>
        @endif
    </div>
</section>
@endsection
