<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;

class HomeController extends Controller
{
    /**
     * Display AutoShield Homepage
     */
    public function index()
    {
        $featuredProducts = Product::active()->featured()->latest()->take(8)->get();
        $categories = [
            [
                'name' => 'Sedan Covers',
                'slug' => 'Car Covers',
                'count' => Product::active()->where('body_style', 'Sedan')->count(),
                'icon' => '🚗',
                'desc' => 'Corolla, Civic, City, Yaris, Elantra',
                'image' => 'images/covers/civic_velvet_bespoke.jpg'
            ],
            [
                'name' => 'SUV & 4x4 Covers',
                'slug' => 'SUV Covers',
                'count' => Product::active()->where('cat', 'SUV Covers')->count(),
                'icon' => '🚙',
                'desc' => 'Fortuner, Sportage, Tucson, Prado',
                'image' => 'images/covers/fortuner_armor_suv.jpg'
            ],
            [
                'name' => 'Hatchback Covers',
                'slug' => 'Hatchback Covers',
                'count' => Product::active()->where('cat', 'Hatchback Covers')->count(),
                'icon' => '🚘',
                'desc' => 'Alto, Cultus, WagonR, Vitz, Swift',
                'image' => 'images/covers/alto_city_guard.jpg'
            ],
            [
                'name' => 'Motorcycle Covers',
                'slug' => 'Bike Covers',
                'count' => Product::active()->where('cat', 'Bike Covers')->count(),
                'icon' => '🏍️',
                'desc' => 'CD70, CG125, YBR, Heavy Bikes',
                'image' => 'images/covers/motorcycle_ripstop_pro.jpg'
            ],
        ];

        return view('pages.home', compact('featuredProducts', 'categories'));
    }

    /**
     * Contact Us page
     */
    public function contact()
    {
        return view('pages.contact');
    }

    /**
     * About Us page
     */
    public function about()
    {
        return view('pages.about');
    }
}
