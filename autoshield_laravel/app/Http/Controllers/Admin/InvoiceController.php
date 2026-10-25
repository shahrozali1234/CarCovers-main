<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Order;
use Illuminate\Http\Request;

class InvoiceController extends Controller
{
    /**
     * Display printable/exportable invoice for an order
     */
    public function show(Order $order)
    {
        return view('admin.orders.invoice', compact('order'));
    }
}
