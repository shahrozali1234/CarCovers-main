<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreProductRequest;
use App\Models\Order;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class AdminController extends Controller
{
    /**
     * Admin Dashboard Overview & Metrics
     */
    public function dashboard()
    {
        $totalProducts = Product::count();
        $totalOrders = Order::count();
        $totalRevenue = Order::where('status', '!=', 'Cancelled')->sum('total_amount');
        $pendingOrders = Order::whereIn('status', ['Confirmed', 'Pending'])->count();

        $recentOrders = Order::latest()->take(6)->get();
        $recentProducts = Product::latest()->take(5)->get();

        return view('admin.dashboard', compact(
            'totalProducts',
            'totalOrders',
            'totalRevenue',
            'pendingOrders',
            'recentOrders',
            'recentProducts'
        ));
    }

    /**
     * Product Management: List
     */
    public function products(Request $request)
    {
        $query = Product::query();

        if ($request->filled('cat')) {
            $query->where('cat', $request->cat);
        }

        if ($request->filled('search')) {
            $query->where('name', 'like', "%{$request->search}%");
        }

        $products = $query->latest()->paginate(15)->withQueryString();
        $categories = Product::distinct()->pluck('cat');

        return view('admin.products.index', compact('products', 'categories'));
    }

    /**
     * Product Management: Create Form
     */
    public function createProduct()
    {
        return view('admin.products.create');
    }

    /**
     * Product Management: Store New Product
     */
    public function storeProduct(StoreProductRequest $request)
    {
        $data = $request->validated();
        $data['slug'] = Str::slug($data['name']) . '-' . rand(100, 999);

        // Parse sizes into array
        if (!empty($data['sizes_available'])) {
            $data['sizes_available'] = array_map('trim', explode(',', $data['sizes_available']));
        } else {
            $data['sizes_available'] = ['Standard Fit'];
        }

        // Handle Secure Image Upload
        if ($request->hasFile('image_file')) {
            $file = $request->file('image_file');
            $fileName = 'cover_' . time() . '_' . rand(100, 999) . '.' . $file->getClientOriginalExtension();
            $file->move(public_path('images'), $fileName);
            $data['image'] = 'images/' . $fileName;
        } else {
            $data['image'] = 'images/cover_sedan_silver.png';
        }

        $product = Product::create($data);

        return redirect()->route('admin.products')->with('success', "Product '{$product->name}' created successfully!");
    }

    /**
     * Product Management: Edit Form
     */
    public function editProduct(Product $product)
    {
        return view('admin.products.edit', compact('product'));
    }

    /**
     * Product Management: Update
     */
    public function updateProduct(StoreProductRequest $request, Product $product)
    {
        $data = $request->validated();

        if (!empty($data['sizes_available'])) {
            $data['sizes_available'] = array_map('trim', explode(',', $data['sizes_available']));
        }

        if ($request->hasFile('image_file')) {
            $file = $request->file('image_file');
            $fileName = 'cover_' . time() . '_' . rand(100, 999) . '.' . $file->getClientOriginalExtension();
            $file->move(public_path('images'), $fileName);
            $data['image'] = 'images/' . $fileName;
        }

        $product->update($data);

        return redirect()->route('admin.products')->with('success', "Product '{$product->name}' updated successfully!");
    }

    /**
     * Product Management: Delete
     */
    public function deleteProduct(Product $product)
    {
        $name = $product->name;
        $product->delete();

        return redirect()->route('admin.products')->with('success', "Product '{$name}' deleted successfully.");
    }

    /**
     * Order Management: List
     */
    public function orders(Request $request)
    {
        $query = Order::query();

        if ($request->filled('status')) {
            $query->where('status', $request->status);
        }

        if ($request->filled('search')) {
            $term = $request->search;
            $query->where(function ($q) use ($term) {
                $q->where('order_number', 'like', "%{$term}%")
                  ->orWhere('customer_name', 'like', "%{$term}%")
                  ->orWhere('phone', 'like', "%{$term}%")
                  ->orWhere('city', 'like', "%{$term}%");
            });
        }

        $orders = $query->latest()->paginate(15)->withQueryString();

        return view('admin.orders.index', compact('orders'));
    }

    /**
     * Order Management: Update Status
     */
    public function updateOrderStatus(Request $request, Order $order)
    {
        $validated = $request->validate([
            'status' => ['required', 'string', 'in:Confirmed,Processing,Shipped,Delivered,Cancelled'],
        ]);

        $order->update(['status' => $validated['status']]);

        return back()->with('success', "Order #{$order->order_number} status changed to {$validated['status']}.");
    }

    /**
     * Order Management: View Order Details
     */
    public function showOrder(Order $order)
    {
        return view('admin.orders.show', compact('order'));
    }
}
