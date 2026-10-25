<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreOrderRequest;
use App\Models\Order;
use App\Models\OrderItem;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class CheckoutController extends Controller
{
    /**
     * Show Checkout View (Cart page includes complete order placement)
     */
    public function index()
    {
        return redirect()->route('cart.index');
    }

    /**
     * Process Order Placement with Transaction, Sanitization & CSRF Security
     */
    public function placeOrder(StoreOrderRequest $request)
    {
        $cart = session()->get('cart', []);

        // Fallback: If checkout was submitted directly via single product quick-order
        if (empty($cart) && $request->filled('product_id')) {
            $product = Product::findOrFail($request->input('product_id'));
            $qty = max(1, (int)$request->input('quantity', 1));
            $size = $request->input('size', 'Standard Fit');
            $cart[] = [
                'id' => $product->id,
                'name' => $product->name,
                'price' => (float)$product->price,
                'quantity' => $qty,
                'size' => $size,
            ];
        }

        if (empty($cart)) {
            return redirect()->route('shop.index')->with('error', 'Unable to place order: Cart is empty.');
        }

        $subtotal = 0;
        $orderItemsData = [];

        foreach ($cart as $item) {
            $lineTotal = $item['price'] * $item['quantity'];
            $subtotal += $lineTotal;
            $orderItemsData[] = [
                'product_id' => $item['id'] ?? null,
                'product_name' => $item['name'],
                'price' => $item['price'],
                'quantity' => $item['quantity'],
                'size' => $item['size'] ?? 'Standard Fit',
                'subtotal' => $lineTotal,
            ];
        }

        $shipping = 0;
        $total = $subtotal + $shipping;

        // Generate distinct random Order Number
        $orderNumber = 'AS-' . strtoupper(substr(uniqid(), -4)) . rand(10, 99);

        DB::beginTransaction();
        try {
            $order = Order::create([
                'order_number' => $orderNumber,
                'user_id' => auth()->id(),
                'customer_name' => $request->validated('customer_name'),
                'phone' => $request->validated('phone'),
                'city' => $request->validated('city'),
                'address' => $request->validated('address'),
                'payment_method' => $request->validated('payment_method') ?? 'Cash on Delivery (COD)',
                'payment_status' => 'Pending',
                'subtotal' => $subtotal,
                'shipping_fee' => $shipping,
                'total_amount' => $total,
                'items_json' => $orderItemsData,
                'notes' => $request->validated('notes'),
                'status' => 'Confirmed',
            ]);

            foreach ($orderItemsData as $item) {
                OrderItem::create([
                    'order_id' => $order->id,
                    'product_id' => $item['product_id'],
                    'product_name' => $item['product_name'],
                    'price' => $item['price'],
                    'quantity' => $item['quantity'],
                    'size' => $item['size'],
                    'subtotal' => $item['subtotal'],
                ]);
            }

            DB::commit();

            // Clear session cart
            session()->forget('cart');

            return redirect()->route('order.success', $order->order_number)->with('success', 'Your order has been placed successfully!');
        } catch (\Exception $e) {
            DB::rollBack();
            Log::error('Order placement failed: ' . $e->getMessage());
            return back()->withInput()->with('error', 'Something went wrong while placing your order. Please try again or order via WhatsApp.');
        }
    }

    /**
     * Order Confirmation Page
     */
    public function success(string $orderNumber)
    {
        $order = Order::where('order_number', $orderNumber)->firstOrFail();
        return view('pages.order-success', compact('order'));
    }
}
