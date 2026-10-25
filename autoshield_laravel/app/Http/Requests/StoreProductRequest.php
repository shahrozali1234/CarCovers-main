<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreProductRequest extends FormRequest
{
    public function authorize(): bool
    {
        return auth()->check() && auth()->user()->isAdmin();
    }

    public function rules(): array
    {
        return [
            'name' => ['required', 'string', 'max:255'],
            'cat' => ['required', 'string', 'max:100'],
            'price' => ['required', 'numeric', 'min:1'],
            'old_price' => ['nullable', 'numeric', 'min:0'],
            'badge' => ['nullable', 'string', 'max:50'],
            'fit_make' => ['nullable', 'string', 'max:100'],
            'fit_model' => ['nullable', 'string', 'max:100'],
            'body_style' => ['nullable', 'string', 'max:50'],
            'short_desc' => ['nullable', 'string', 'max:1000'],
            'fabric_specs' => ['nullable', 'string', 'max:500'],
            'waterproof_rating' => ['nullable', 'string', 'max:100'],
            'uv_protection' => ['nullable', 'string', 'max:100'],
            'guarantee' => ['nullable', 'string', 'max:100'],
            'sizes_available' => ['nullable', 'string'],
            'stock' => ['nullable', 'integer', 'min:0'],
            'image_file' => ['nullable', 'image', 'mimes:jpeg,png,jpg,webp', 'max:5120'], // strictly validated image
        ];
    }
}
