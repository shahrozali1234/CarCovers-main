<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Order extends Model
{
    use HasFactory;

    protected $fillable = [
        'order_number',
        'user_id',
        'customer_name',
        'phone',
        'city',
        'address',
        'payment_method',
        'payment_status',
        'subtotal',
        'shipping_fee',
        'discount',
        'total_amount',
        'items_json',
        'notes',
        'status',
        'tracking_number',
    ];

    protected $casts = [
        'items_json' => 'array',
        'subtotal' => 'decimal:2',
        'shipping_fee' => 'decimal:2',
        'discount' => 'decimal:2',
        'total_amount' => 'decimal:2',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function items(): HasMany
    {
        return $this->hasMany(OrderItem::class);
    }

    public function getFormattedTotalAttribute(): string
    {
        return 'Rs. ' . number_format($this->total_amount);
    }

    public function getCleanPhoneAttribute(): string
    {
        $num = preg_replace('/[^0-9]/', '', $this->phone);
        if (str_starts_with($num, '0')) {
            $num = '92' . substr($num, 1);
        } elseif (!str_starts_with($num, '92')) {
            $num = '92' . $num;
        }
        return $num;
    }

    public function getWhatsappLinkAttribute(): string
    {
        $msg = rawurlencode("Salam {$this->customer_name}, AutoShield Pakistan se aapka Order #{$this->order_number} confirm karne ke liye rabta kar rahe hain.");
        return "https://wa.me/{$this->clean_phone}?text={$msg}";
    }

    public function getSupportWhatsappLinkAttribute(): string
    {
        $msg = rawurlencode("Salam AutoShield! Main ne Order #{$this->order_number} place kiya hai ({$this->formatted_total}). Kindly dispatch confirm kar dein. Name: {$this->customer_name}, City: {$this->city}");
        return "https://wa.me/923072818652?text={$msg}";
    }
}
