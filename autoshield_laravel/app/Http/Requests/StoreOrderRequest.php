<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreOrderRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    protected function prepareForValidation(): void
    {
        if ($this->filled('customer_phone') && !$this->filled('phone')) {
            $this->merge(['phone' => $this->input('customer_phone')]);
        }
        if ($this->filled('car_model') && !$this->filled('notes')) {
            $this->merge(['notes' => $this->input('car_model')]);
        }
    }

    public function rules(): array
    {
        return [
            'customer_name' => ['required', 'string', 'min:3', 'max:100'],
            'phone' => ['required', 'string', 'min:10', 'max:20'],
            'city' => ['required', 'string', 'max:60'],
            'address' => ['required', 'string', 'min:5', 'max:500'],
            'payment_method' => ['nullable', 'string', 'max:100'],
            'notes' => ['nullable', 'string', 'max:500'],
            'items' => ['nullable', 'array'],
        ];
    }

    public function messages(): array
    {
        return [
            'customer_name.required' => 'Please enter your full name.',
            'phone.required' => 'A valid mobile phone number is required for delivery confirmation.',
            'city.required' => 'Please specify your city.',
            'address.required' => 'Complete delivery address is required.',
        ];
    }
}
