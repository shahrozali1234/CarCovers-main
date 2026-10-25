<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;

class CartController extends Controller
{
    /**
     * View shopping cart
     */
    public function index()
    {
        $cart = session()->get('cart', []);
        $subtotal = 0;
        foreach ($cart as $item) {
            $subtotal += $item['price'] * $item['quantity'];
        }

        $shipping = 0; // Free nationwide shipping promotion
        $total = $subtotal + $shipping;

        return view('pages.cart', compact('cart', 'subtotal', 'shipping', 'total'));
    }

    /**
     * Add product to cart
     */
    public function add(Request $request)
    {
        $validated = $request->validate([
            'product_id' => ['required', 'exists:products,id'],
            'quantity' => ['nullable', 'integer', 'min:1', 'max:20'],
            'size' => ['nullable', 'string', 'max:150'],
            'selected_vehicle' => ['nullable', 'string', 'max:200'],
            'selected_finish' => ['nullable', 'string', 'max:100'],
            'selected_logo' => ['nullable', 'string', 'max:100'],
            'selected_extras' => ['nullable', 'string', 'max:150'],
        ]);

        $product = Product::findOrFail($validated['product_id']);
        $quantity = (int)($validated['quantity'] ?? 1);

        // Build Bespoke Fitment Spec if provided by Velox Configurator
        $customParts = [];
        if (!empty($validated['selected_vehicle']) && $validated['selected_vehicle'] !== 'Stock Pattern') {
            $customParts[] = $validated['selected_vehicle'];
        }
        if (!empty($validated['selected_finish'])) {
            $customParts[] = "Finish: " . $validated['selected_finish'];
        }
        if (!empty($validated['selected_logo']) && $validated['selected_logo'] !== 'Emblem Only') {
            $customParts[] = "Logo: " . $validated['selected_logo'];
        }
        if (!empty($validated['selected_extras']) && $validated['selected_extras'] !== 'None') {
            $customParts[] = $validated['selected_extras'];
        }

        $size = !empty($customParts)
            ? implode(' | ', $customParts)
            : ($validated['size'] ?? ($product->sizes_available[0] ?? 'Custom Fit'));

        $unitPrice = (float)$product->price;
        if (!empty($validated['selected_extras']) && str_contains(strtolower($validated['selected_extras']), 'embroidery')) {
            $unitPrice += 500;
        }

        $cart = session()->get('cart', []);
        $cartKey = $product->id . '_' . md5($size . '_' . $unitPrice);

        if (isset($cart[$cartKey])) {
            $cart[$cartKey]['quantity'] += $quantity;
        } else {
            $cart[$cartKey] = [
                'id' => $product->id,
                'cart_key' => $cartKey,
                'name' => $product->name,
                'slug' => $product->slug,
                'price' => $unitPrice,
                'old_price' => $product->old_price ? (float)$product->old_price : null,
                'image' => $product->image,
                'size' => $size,
                'quantity' => $quantity,
            ];
        }

        session()->put('cart', $cart);

        if ($request->wantsJson()) {
            $subtotal = array_sum(array_map(fn($item) => $item['price'] * $item['quantity'], $cart));
            return response()->json([
                'status' => 'success',
                'message' => "{$product->name} added to cart!",
                'cartCount' => array_sum(array_column($cart, 'quantity')),
                'cart' => array_values($cart),
                'subtotal' => $subtotal,
                'formatted_subtotal' => 'Rs. ' . number_format($subtotal),
                'free_shipping_reached' => $subtotal >= 5000,
                'amount_needed' => max(0, 5000 - $subtotal),
            ]);
        }

        return redirect()->route('cart.index')->with('success', "{$product->name} added to cart!");
    }

    /**
     * Get JSON data for cart drawer
     */
    public function data()
    {
        $cart = session()->get('cart', []);
        $subtotal = 0;
        foreach ($cart as $item) {
            $subtotal += $item['price'] * $item['quantity'];
        }
        $cartCount = array_sum(array_column($cart, 'quantity'));

        return response()->json([
            'status' => 'success',
            'cart' => array_values($cart),
            'cartCount' => $cartCount,
            'subtotal' => $subtotal,
            'formatted_subtotal' => 'Rs. ' . number_format($subtotal),
            'free_shipping_threshold' => 5000,
            'free_shipping_reached' => $subtotal >= 5000,
            'amount_needed' => max(0, 5000 - $subtotal),
        ]);
    }

    /**
     * Update item quantity in cart
     */
    public function update(Request $request)
    {
        $key = $request->input('cart_key') ?? $request->input('cartKey');
        $validated = $request->validate([
            'quantity' => ['required', 'integer', 'min:1', 'max:20'],
        ]);

        $cart = session()->get('cart', []);
        if ($key && isset($cart[$key])) {
            $cart[$key]['quantity'] = $validated['quantity'];
            session()->put('cart', $cart);
        }

        if ($request->wantsJson()) {
            $subtotal = array_sum(array_map(fn($item) => $item['price'] * $item['quantity'], $cart));
            return response()->json([
                'status' => 'success',
                'cartCount' => array_sum(array_column($cart, 'quantity')),
                'cart' => array_values($cart),
                'subtotal' => $subtotal,
                'formatted_subtotal' => 'Rs. ' . number_format($subtotal),
                'free_shipping_reached' => $subtotal >= 5000,
                'amount_needed' => max(0, 5000 - $subtotal),
            ]);
        }

        return redirect()->route('cart.index')->with('success', 'Cart updated successfully.');
    }

    /**
     * Remove item from cart
     */
    public function remove(Request $request, string $cartKey)
    {
        $cart = session()->get('cart', []);
        if (isset($cart[$cartKey])) {
            unset($cart[$cartKey]);
            session()->put('cart', $cart);
        }

        if ($request->wantsJson()) {
            $subtotal = array_sum(array_map(fn($item) => $item['price'] * $item['quantity'], $cart));
            return response()->json([
                'status' => 'success',
                'cartCount' => array_sum(array_column($cart, 'quantity')),
                'cart' => array_values($cart),
                'subtotal' => $subtotal,
                'formatted_subtotal' => 'Rs. ' . number_format($subtotal),
                'free_shipping_reached' => $subtotal >= 5000,
                'amount_needed' => max(0, 5000 - $subtotal),
            ]);
        }

        return redirect()->route('cart.index')->with('info', 'Item removed from cart.');
    }

    /**
     * Clear all items from cart
     */
    public function clear()
    {
        session()->forget('cart');
        return redirect()->route('cart.index')->with('info', 'Cart cleared.');
    }
}
