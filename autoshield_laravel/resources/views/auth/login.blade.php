@extends('layouts.app')

@section('title', 'Login — AutoShield Pakistan')

@section('content')
<section class="section" style="min-height: 75vh; display: flex; align-items: center; justify-content: center; padding: 60px 20px;">
    <div style="background: #0d1017; border: 1px solid rgba(255,255,255,0.1); border-radius: 20px; max-width: 440px; width: 100%; padding: 40px; box-shadow: 0 10px 40px rgba(0,0,0,0.6);">
        <div style="text-align: center; margin-bottom: 28px;">
            <img src="{{ asset('autoshield-logo.png') }}" alt="AutoShield" style="height: 52px; margin-bottom: 16px;">
            <h2 style="font-size: 1.5rem; font-weight: 800; color: #fff; margin-bottom: 6px;">Secure Portal Access</h2>
            <p style="color: var(--text-muted, #94a3b8); font-size: 0.88rem;">Sign in to access your account or administrator panel</p>
        </div>

        @if($errors->any())
            <div style="background: rgba(239, 68, 68, 0.15); border: 1px solid #ef4444; border-radius: 10px; padding: 12px 16px; margin-bottom: 20px; color: #ef4444; font-size: 0.85rem;">
                @foreach ($errors->all() as $error)
                    <div>• {{ $error }}</div>
                @endforeach
            </div>
        @endif

        <form action="{{ route('login.post') }}" method="POST">
            @csrf

            <div style="margin-bottom: 18px;">
                <label style="display: block; font-size: 0.82rem; font-weight: 600; color: #cbd5e1; margin-bottom: 8px;">Email Address</label>
                <input type="email" name="email" value="{{ old('email', 'admin@autoshield.pk') }}" required autofocus
                       style="width: 100%; padding: 12px 14px; background: #161b26; border: 1px solid rgba(255,255,255,0.15); border-radius: 10px; color: #fff; font-size: 0.95rem; box-sizing: border-box;">
            </div>

            <div style="margin-bottom: 18px;">
                <label style="display: block; font-size: 0.82rem; font-weight: 600; color: #cbd5e1; margin-bottom: 8px;">Password</label>
                <input type="password" name="password" required
                       placeholder="Enter your password"
                       style="width: 100%; padding: 12px 14px; background: #161b26; border: 1px solid rgba(255,255,255,0.15); border-radius: 10px; color: #fff; font-size: 0.95rem; box-sizing: border-box;">
            </div>

            <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 24px; font-size: 0.85rem;">
                <label style="display: flex; align-items: center; gap: 8px; color: #94a3b8; cursor: pointer;">
                    <input type="checkbox" name="remember" value="1" checked> Remember this device
                </label>
            </div>

            <button type="submit" class="btn btn-primary" style="width: 100%; padding: 14px; font-size: 1rem; font-weight: 700; border-radius: 10px; cursor: pointer;">
                🔒 Sign In with Security
            </button>
        </form>

        <div style="margin-top: 24px; padding: 12px; background: rgba(255,255,255,0.03); border-radius: 8px; border: 1px solid rgba(255,255,255,0.06); font-size: 0.8rem; color: #94a3b8; text-align: center;">
            <div style="font-weight: 600; color: #f59e0b; margin-bottom: 4px;">Default Super-Admin Credentials:</div>
            <div>Email: <code style="color: #fff;">admin@autoshield.pk</code></div>
            <div>Password: <code style="color: #fff;">Admin@12345</code></div>
        </div>
    </div>
</section>
@endsection
