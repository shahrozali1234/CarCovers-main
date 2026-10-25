<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Support\Str;

class Product extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'slug',
        'cat',
        'price',
        'old_price',
        'image',
        'hover_image',
        'badge',
        'fit_make',
        'fit_model',
        'body_style',
        'short_desc',
        'fabric_specs',
        'waterproof_rating',
        'uv_protection',
        'guarantee',
        'sizes_available',
        'stock',
        'rating',
        'reviews_count',
        'is_featured',
        'is_active',
    ];

    protected $casts = [
        'sizes_available' => 'array',
        'price' => 'decimal:2',
        'old_price' => 'decimal:2',
        'rating' => 'float',
        'stock' => 'integer',
        'reviews_count' => 'integer',
        'is_featured' => 'boolean',
        'is_active' => 'boolean',
    ];

    protected static function boot()
    {
        parent::boot();
        static::creating(function ($product) {
            if (empty($product->slug)) {
                $product->slug = Str::slug($product->name) . '-' . rand(100, 999);
            }
        });
    }

    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }

    public function scopeFeatured($query)
    {
        return $query->where('is_featured', true);
    }

    public function scopeCategory($query, ?string $category)
    {
        if (!empty($category) && $category !== 'all') {
            return $query->where('cat', $category);
        }
        return $query;
    }

    public function getDiscountPercentageAttribute(): ?int
    {
        if ($this->old_price && $this->old_price > $this->price) {
            return (int)round((($this->old_price - $this->price) / $this->old_price) * 100);
        }
        return null;
    }

    public function getFormattedPriceAttribute(): string
    {
        return 'Rs. ' . number_format($this->price);
    }

    public function getFormattedOldPriceAttribute(): ?string
    {
        return $this->old_price ? 'Rs. ' . number_format($this->old_price) : null;
    }

    public function orderItems(): HasMany
    {
        return $this->hasMany(OrderItem::class);
    }
}
