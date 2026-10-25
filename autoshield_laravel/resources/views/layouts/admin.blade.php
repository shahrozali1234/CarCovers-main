<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>@yield('title', 'Admin Dashboard') — AutoShield Pakistan</title>
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <!-- Google Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Plus+Jakarta+Sans:wght@600;700;800;900&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="{{ asset('css/styles.css') }}?v=3">
    <link rel="icon" type="image/png" href="{{ asset('autoshield-logo.png') }}">

    <style>
        :root {
            --sidebar-width: 260px;
            --accent-cyan: #06b6d4;
            --accent-purple: #8b5cf6;
        }

        body {
            background-color: #07090e;
            color: var(--text-primary, #f1f5f9);
            min-height: 100vh;
            display: flex;
            flex-direction: column;
            margin: 0;
            font-family: 'Inter', sans-serif;
        }

        .admin-nav {
            background: rgba(13, 16, 23, 0.95);
            backdrop-filter: blur(16px);
            border-bottom: 1px solid rgba(255, 255, 255, 0.08);
            padding: 14px 28px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            position: sticky;
            top: 0;
            z-index: 100;
        }

        .admin-brand {
            display: flex;
            align-items: center;
            gap: 14px;
            text-decoration: none;
            color: #fff;
        }

        .admin-brand img {
            height: 38px;
            width: auto;
        }

        .admin-brand-tag {
            background: linear-gradient(135deg, #e11d48, #b91c1c);
            font-size: 0.7rem;
            font-weight: 800;
            letter-spacing: 0.08em;
            text-transform: uppercase;
            padding: 3px 8px;
            border-radius: 6px;
            color: #fff;
        }

        .admin-layout {
            display: flex;
            flex: 1;
            min-height: calc(100vh - 67px);
        }

        .admin-sidebar {
            width: var(--sidebar-width);
            background: #0d1017;
            border-right: 1px solid rgba(255, 255, 255, 0.08);
            padding: 24px 16px;
            display: flex;
            flex-direction: column;
            gap: 6px;
        }

        .admin-menu-heading {
            font-size: 0.7rem;
            text-transform: uppercase;
            letter-spacing: 0.1em;
            color: var(--text-muted, #94a3b8);
            padding: 12px 14px 6px;
            font-weight: 700;
        }

        .admin-menu-item {
            display: flex;
            align-items: center;
            gap: 12px;
            padding: 12px 16px;
            border-radius: 10px;
            color: #94a3b8;
            text-decoration: none;
            font-weight: 500;
            font-size: 0.9rem;
            transition: all 0.2s ease;
        }

        .admin-menu-item:hover, .admin-menu-item.active {
            background: rgba(225, 29, 72, 0.15);
            color: #fff;
            border-left: 3px solid #e11d48;
        }

        .admin-main {
            flex: 1;
            padding: 32px 36px;
            background: radial-gradient(circle at top right, rgba(225, 29, 72, 0.04), transparent 500px);
            overflow-y: auto;
        }

        .admin-card {
            background: #11151f;
            border: 1px solid rgba(255, 255, 255, 0.08);
            border-radius: 16px;
            padding: 24px;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
            margin-bottom: 24px;
        }

        .admin-table {
            width: 100%;
            border-collapse: collapse;
            font-size: 0.9rem;
            margin-top: 14px;
        }

        .admin-table th {
            text-align: left;
            padding: 12px 14px;
            color: #94a3b8;
            font-size: 0.78rem;
            text-transform: uppercase;
            border-bottom: 1px solid rgba(255, 255, 255, 0.08);
        }

        .admin-table td {
            padding: 14px;
            border-bottom: 1px solid rgba(255, 255, 255, 0.05);
            vertical-align: middle;
        }

        .admin-table tr:hover {
            background: rgba(255, 255, 255, 0.02);
        }

        .badge-status {
            display: inline-block;
            padding: 4px 10px;
            border-radius: 20px;
            font-size: 0.75rem;
            font-weight: 700;
            text-transform: uppercase;
        }

        .status-confirmed, .status-pending { background: rgba(245, 158, 11, 0.15); color: #f59e0b; border: 1px solid rgba(245, 158, 11, 0.3); }
        .status-processing { background: rgba(59, 130, 246, 0.15); color: #3b82f6; border: 1px solid rgba(59, 130, 246, 0.3); }
        .status-shipped { background: rgba(139, 92, 246, 0.15); color: #8b5cf6; border: 1px solid rgba(139, 92, 246, 0.3); }
        .status-delivered { background: rgba(16, 185, 129, 0.15); color: #10b981; border: 1px solid rgba(16, 185, 129, 0.3); }
        .status-cancelled { background: rgba(239, 68, 68, 0.15); color: #ef4444; border: 1px solid rgba(239, 68, 68, 0.3); }

        .btn-table {
            display: inline-flex;
            align-items: center;
            gap: 6px;
            padding: 6px 12px;
            border-radius: 6px;
            font-size: 0.8rem;
            font-weight: 600;
            text-decoration: none;
            border: none;
            cursor: pointer;
            transition: all 0.2s;
        }
        .btn-table-primary { background: #e11d48; color: #fff; }
        .btn-table-outline { background: transparent; border: 1px solid rgba(255,255,255,0.15); color: #cbd5e1; }
        .btn-table-outline:hover { background: rgba(255,255,255,0.08); color: #fff; }
        .btn-table-whatsapp { background: #0E2416; color: #E9E5DF; border: 1px solid #1B492D; }
        .btn-table-whatsapp:hover { background: #153823; color: #FFFFFF; }
        .btn-table-danger { background: rgba(239, 68, 68, 0.15); color: #ef4444; border: 1px solid rgba(239, 68, 68, 0.3); }
        .btn-table-danger:hover { background: #ef4444; color: #fff; }
    </style>
    @stack('admin-styles')
</head>
<body>

    <!-- Top Admin Navbar -->
    <header class="admin-nav">
        <div style="display: flex; align-items: center; gap: 20px;">
            <a href="{{ route('admin.dashboard') }}" class="admin-brand">
                <img src="{{ asset('autoshield-logo.png') }}" alt="AutoShield Admin">
                <span class="admin-brand-tag">Laravel RBAC</span>
            </a>
            <span style="font-size: 0.82rem; color: #10b981; background: rgba(16, 185, 129, 0.1); padding: 4px 10px; border-radius: 20px; border: 1px solid rgba(16, 185, 129, 0.2);">
                🔒 100% Secure Session Active
            </span>
        </div>

        <div style="display: flex; align-items: center; gap: 16px;">
            <a href="{{ route('home') }}" target="_blank" class="btn-table btn-table-outline">
                🌐 View Live Store
            </a>

            <div style="display: flex; align-items: center; gap: 10px; border-left: 1px solid rgba(255,255,255,0.1); padding-left: 16px;">
                <div style="text-align: right;">
                    <div style="font-weight: 600; font-size: 0.88rem; color: #fff;">{{ auth()->user()->name }}</div>
                    <div style="font-size: 0.75rem; color: #94a3b8;">Administrator</div>
                </div>
                <form action="{{ route('logout') }}" method="POST">
                    @csrf
                    <button type="submit" class="btn-table btn-table-danger" title="Logout">
                        🚪 Logout
                    </button>
                </form>
            </div>
        </div>
    </header>

    <!-- Main Layout Container -->
    <div class="admin-layout">
        <!-- Sidebar Navigation -->
        <aside class="admin-sidebar">
            <div class="admin-menu-heading">Main Navigation</div>
            <a href="{{ route('admin.dashboard') }}" class="admin-menu-item {{ request()->routeIs('admin.dashboard') ? 'active' : '' }}">
                📊 Dashboard
            </a>
            <a href="{{ route('admin.orders') }}" class="admin-menu-item {{ request()->routeIs('admin.orders*') ? 'active' : '' }}">
                🛒 Customer Orders
            </a>
            <a href="{{ route('admin.products') }}" class="admin-menu-item {{ request()->routeIs('admin.products*') ? 'active' : '' }}">
                📦 Products Catalog
            </a>
            <a href="{{ route('admin.products.create') }}" class="admin-menu-item {{ request()->routeIs('admin.products.create') ? 'active' : '' }}">
                ➕ Add New Cover
            </a>

            <div class="admin-menu-heading" style="margin-top: 20px;">System & Security</div>
            <div style="padding: 12px 14px; font-size: 0.78rem; color: #94a3b8; background: rgba(255,255,255,0.02); border-radius: 8px; border: 1px solid rgba(255,255,255,0.05);">
                <div>🛡️ CSRF Token: <strong>Active</strong></div>
                <div style="margin-top: 4px;">💉 SQL Injection: <strong>Blocked</strong></div>
                <div style="margin-top: 4px;">👤 RBAC Auth: <strong>Enforced</strong></div>
            </div>
        </aside>

        <!-- Main Workspace -->
        <main class="admin-main">
            <!-- Flash Messages inside Admin -->
            @if(session('success'))
                <div style="background: rgba(16, 185, 129, 0.15); border: 1px solid #10b981; color: #10b981; padding: 14px 18px; border-radius: 10px; margin-bottom: 20px;">
                    ✅ {{ session('success') }}
                </div>
            @endif

            @if(session('error'))
                <div style="background: rgba(239, 68, 68, 0.15); border: 1px solid #ef4444; color: #ef4444; padding: 14px 18px; border-radius: 10px; margin-bottom: 20px;">
                    ❌ {{ session('error') }}
                </div>
            @endif

            @yield('admin_content')
        </main>
    </div>

    @stack('admin-scripts')
</body>
</html>
