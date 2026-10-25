<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Invoice #{{ $order->order_number }} — AutoShield Pakistan</title>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet">
    <style>
        body {
            font-family: 'Inter', sans-serif;
            background: #f8fafc;
            color: #0f172a;
            margin: 0;
            padding: 30px;
        }
        .invoice-card {
            background: #fff;
            max-width: 800px;
            margin: 0 auto;
            border: 1px solid #e2e8f0;
            border-radius: 12px;
            padding: 40px;
            box-shadow: 0 4px 20px rgba(0,0,0,0.05);
        }
        .invoice-header {
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            border-bottom: 2px solid #e2e8f0;
            padding-bottom: 24px;
            margin-bottom: 24px;
        }
        .logo-img {
            height: 48px;
            width: auto;
        }
        .invoice-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 24px;
            margin-bottom: 30px;
        }
        .table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 30px;
        }
        .table th {
            text-align: left;
            background: #f1f5f9;
            padding: 12px 14px;
            font-size: 0.8rem;
            text-transform: uppercase;
            border-bottom: 1px solid #cbd5e1;
        }
        .table td {
            padding: 14px;
            border-bottom: 1px solid #e2e8f0;
            font-size: 0.9rem;
        }
        .totals-box {
            margin-left: auto;
            width: 300px;
            border-top: 2px solid #0f172a;
            padding-top: 14px;
        }
        .total-row {
            display: flex;
            justify-content: space-between;
            margin-bottom: 8px;
            font-size: 0.9rem;
        }
        .btn-print {
            background: #e11d48;
            color: #fff;
            border: none;
            padding: 12px 24px;
            border-radius: 8px;
            font-weight: 700;
            cursor: pointer;
            font-size: 0.95rem;
            display: inline-flex;
            align-items: center;
            gap: 8px;
            margin-bottom: 20px;
        }
        @media print {
            body { background: #fff; padding: 0; }
            .invoice-card { box-shadow: none; border: none; padding: 0; max-width: 100%; }
            .no-print { display: none !important; }
        }
    </style>
</head>
<body>

    <div style="max-width: 800px; margin: 0 auto;" class="no-print">
        <button class="btn-print" onclick="window.print()">🖨️ Print Dispatch Slip</button>
        <button onclick="window.close()" style="background:#cbd5e1; border:none; padding:12px 20px; border-radius:8px; font-weight:600; cursor:pointer;">Close</button>
    </div>

    <div class="invoice-card">
        <!-- Header -->
        <div class="invoice-header">
            <div>
                <img src="{{ asset('autoshield-logo.png') }}" alt="AutoShield" class="logo-img">
                <div style="font-size: 0.82rem; color: #64748b; margin-top: 8px;">
                    Pakistan's #1 Premium Vehicle Top Covers<br>
                    Helpline: 0307-2818652 | www.autoshield.pk
                </div>
            </div>
            <div style="text-align: right;">
                <h2 style="font-size: 1.6rem; font-weight: 900; color: #e11d48; margin: 0 0 6px;">DISPATCH SLIP</h2>
                <div style="font-weight: 800; font-size: 1rem;">Order #{{ $order->order_number }}</div>
                <div style="font-size: 0.85rem; color: #64748b;">Date: {{ $order->created_at->format('F d, Y') }}</div>
            </div>
        </div>

        <!-- Addresses -->
        <div class="invoice-grid">
            <div>
                <strong style="color: #64748b; font-size: 0.78rem; text-transform: uppercase;">Customer Delivery Details:</strong>
                <div style="font-weight: 700; font-size: 1.1rem; margin-top: 4px;">{{ $order->customer_name }}</div>
                <div style="font-weight: 600; color: #0284c7; margin-top: 2px;">Phone: {{ $order->phone }}</div>
                <div style="margin-top: 6px; font-size: 0.9rem; line-height: 1.4;">
                    {{ $order->address }}<br>
                    <strong>City:</strong> {{ $order->city }}, Pakistan
                </div>
                @if($order->notes)
                    <div style="background: #fef3c7; border: 1px solid #fde047; padding: 6px 10px; border-radius: 6px; margin-top: 8px; font-size: 0.82rem; color: #854d0e;">
                        <strong>Car Details / Notes:</strong> {{ $order->notes }}
                    </div>
                @endif
            </div>

            <div style="text-align: right;">
                <strong style="color: #64748b; font-size: 0.78rem; text-transform: uppercase;">Payment & Status:</strong>
                <div style="font-size: 0.95rem; font-weight: 700; margin-top: 4px;">
                    Method: <span style="color: #e11d48;">{{ $order->payment_method }}</span>
                </div>
                <div style="font-size: 0.88rem; color: #64748b; margin-top: 4px;">
                    Order Status: <strong>{{ $order->status }}</strong>
                </div>
                <div style="font-size: 0.88rem; color: #16a34a; font-weight: 700; margin-top: 4px;">
                    Nationwide Cash on Delivery
                </div>
            </div>
        </div>

        <!-- Items Table -->
        <table class="table">
            <thead>
                <tr>
                    <th>Item Description</th>
                    <th style="text-align: center;">Size / Fitment</th>
                    <th style="text-align: center;">Qty</th>
                    <th style="text-align: right;">Unit Price</th>
                    <th style="text-align: right;">Subtotal</th>
                </tr>
            </thead>
            <tbody>
                @if(is_array($order->items_json))
                    @foreach($order->items_json as $item)
                        <tr>
                            <td>
                                <strong>{{ $item['product_name'] ?? ($item['name'] ?? 'AutoShield Cover') }}</strong>
                            </td>
                            <td style="text-align: center;">{{ $item['size'] ?? 'Standard Fit' }}</td>
                            <td style="text-align: center;">{{ $item['quantity'] ?? ($item['qty'] ?? 1) }}</td>
                            <td style="text-align: right;">Rs. {{ number_format($item['price'] ?? 0) }}</td>
                            <td style="text-align: right; font-weight: 700;">
                                Rs. {{ number_format(($item['price'] ?? 0) * ($item['quantity'] ?? ($item['qty'] ?? 1))) }}
                            </td>
                        </tr>
                    @endforeach
                @else
                    <tr>
                        <td>Standard Protective Cover</td>
                        <td style="text-align: center;">Universal Fit</td>
                        <td style="text-align: center;">1</td>
                        <td style="text-align: right;">{{ $order->formatted_total }}</td>
                        <td style="text-align: right; font-weight: 700;">{{ $order->formatted_total }}</td>
                    </tr>
                @endif
            </tbody>
        </table>

        <!-- Totals -->
        <div class="totals-box">
            <div class="total-row">
                <span>Subtotal:</span>
                <span>Rs. {{ number_format($order->subtotal > 0 ? $order->subtotal : $order->total_amount) }}</span>
            </div>
            <div class="total-row">
                <span>Nationwide Shipping:</span>
                <span style="color: #16a34a; font-weight: 600;">FREE</span>
            </div>
            <div class="total-row" style="font-size: 1.25rem; font-weight: 900; color: #e11d48; margin-top: 8px;">
                <span>Total Amount:</span>
                <span>{{ $order->formatted_total }}</span>
            </div>
        </div>

        <!-- Footer / Instructions -->
        <div style="border-top: 1px dashed #cbd5e1; margin-top: 36px; padding-top: 16px; font-size: 0.8rem; color: #64748b; text-align: center;">
            Thank you for choosing AutoShield Pakistan. Inspect package upon delivery before paying courier rider.<br>
            For any queries or 1-Year Warranty claims, WhatsApp: <strong>0307-2818652</strong>.
        </div>
    </div>

</body>
</html>
