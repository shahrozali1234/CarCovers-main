<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('orders', function (Blueprint $table) {
            $table->id();
            $table->string('order_number')->unique();
            $table->foreignId('user_id')->nullable()->constrained('users')->nullOnDelete();
            $table->string('customer_name');
            $table->string('phone');
            $table->string('city')->default('Lahore');
            $table->text('address');
            $table->string('payment_method')->default('Cash on Delivery (COD)');
            $table->string('payment_status')->default('Pending'); // Pending, Paid, Refunded
            $table->decimal('subtotal', 10, 2)->default(0);
            $table->decimal('shipping_fee', 10, 2)->default(0); // Free delivery in Pakistan
            $table->decimal('discount', 10, 2)->default(0);
            $table->decimal('total_amount', 10, 2);
            $table->json('items_json');
            $table->text('notes')->nullable();
            $table->string('status')->default('Confirmed'); // Confirmed, Processing, Shipped, Delivered, Cancelled
            $table->string('tracking_number')->nullable();
            $table->timestamps();

            $table->index(['status', 'created_at']);
            $table->index('phone');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('orders');
    }
};
