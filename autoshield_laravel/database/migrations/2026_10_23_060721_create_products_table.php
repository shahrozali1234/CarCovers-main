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
        Schema::create('products', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('slug')->unique();
            $table->string('cat')->default('Car Covers');
            $table->decimal('price', 10, 2);
            $table->decimal('old_price', 10, 2)->nullable();
            $table->string('image')->default('images/cover_sedan_silver.png');
            $table->string('hover_image')->nullable();
            $table->string('badge')->nullable()->default('BEST SELLER');
            $table->string('fit_make')->nullable()->default('Universal');
            $table->string('fit_model')->nullable()->default('All Models');
            $table->string('body_style')->nullable()->default('Sedan');
            $table->text('short_desc')->nullable();
            $table->text('fabric_specs')->nullable();
            $table->string('waterproof_rating')->nullable()->default('100% Waterproof');
            $table->string('uv_protection')->nullable()->default('99% UV Block');
            $table->string('guarantee')->nullable()->default('1-Year Warranty');
            $table->json('sizes_available')->nullable();
            $table->integer('stock')->default(100);
            $table->decimal('rating', 3, 1)->default(4.9);
            $table->integer('reviews_count')->default(48);
            $table->boolean('is_featured')->default(true);
            $table->boolean('is_active')->default(true);
            $table->timestamps();

            $table->index(['cat', 'is_active']);
            $table->index('is_featured');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('products');
    }
};
