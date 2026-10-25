<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;

class ShopController extends Controller
{
    /**
     * Browse Product Catalog with dynamic category filtering and search
     */
    public function index(Request $request)
    {
        $category = $request->query('category', 'all');
        $body = strtolower($request->query('body', ''));
        $search = $request->query('search');
        $make = $request->query('make');
        $sort = $request->query('sort', 'newest');

        $query = Product::active();

        if ($make) {
            $query->where(function ($q) use ($make) {
                $q->where('fit_make', 'like', "%{$make}%")
                  ->orWhere('name', 'like', "%{$make}%")
                  ->orWhere('short_desc', 'like', "%{$make}%");
            });
        }

        if ($body) {
            if ($body === 'suv' || $body === '4x4') {
                $query->where(function ($q) {
                    $q->where('cat', 'like', '%SUV%')
                      ->orWhere('name', 'like', '%SUV%')
                      ->orWhere('body_style', 'like', '%SUV%')
                      ->orWhere('short_desc', 'like', '%SUV%');
                });
            } elseif ($body === 'coupe' || $body === 'sedan') {
                $query->where(function ($q) {
                    $q->where('cat', 'Car Covers')
                      ->orWhere('name', 'like', '%Sedan%')
                      ->orWhere('body_style', 'like', '%Sedan%')
                      ->orWhere('name', 'like', '%Coupe%');
                });
            } elseif ($body === 'hatchback') {
                $query->where(function ($q) {
                    $q->where('cat', 'like', '%Hatchback%')
                      ->orWhere('body_style', 'like', '%Hatchback%')
                      ->orWhere('name', 'like', '%Hatchback%');
                });
            } elseif ($body === 'bike' || $body === 'motorcycle') {
                $query->where('cat', 'Bike Covers');
            }
        } elseif ($category && $category !== 'all') {
            $query->where('cat', $category);
        }

        if ($search) {
            $query->where(function ($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                  ->orWhere('short_desc', 'like', "%{$search}%")
                  ->orWhere('fit_make', 'like', "%{$search}%")
                  ->orWhere('fit_model', 'like', "%{$search}%")
                  ->orWhere('fabric_specs', 'like', "%{$search}%");
            });
        }

        switch ($sort) {
            case 'price_low':
                $query->orderBy('price', 'asc');
                break;
            case 'price_high':
                $query->orderBy('price', 'desc');
                break;
            case 'rating':
                $query->orderBy('rating', 'desc');
                break;
            default:
                $query->latest();
                break;
        }

        $products = $query->paginate(12)->withQueryString();
        $categories = Product::active()->distinct()->pluck('cat');

        return view('pages.shop', compact('products', 'categories', 'category', 'body', 'search', 'make', 'sort'));
    }

    /**
     * View Single Product Details
     */
    public function show(string $slug)
    {
        $product = Product::active()->where('slug', $slug)->firstOrFail();
        $relatedProducts = Product::active()
            ->where('id', '!=', $product->id)
            ->where('cat', $product->cat)
            ->take(4)
            ->get();

        return view('pages.product-detail', compact('product', 'relatedProducts'));
    }
}
