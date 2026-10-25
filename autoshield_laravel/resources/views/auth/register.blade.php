@extends('layouts.app')

@section('title', 'Customer Registration — AutoShield Pakistan')

@section('content')
<section class="section" style="min-height: 75vh; display: flex; align-items: center; justify-content: center; padding: 60px 20px;">
    <div style="background: #0d1017; border: 1px solid rgba(255,255,255,0.1); border-radius: 20px; max-width: 480px; width: 100%; padding: 40px; box-shadow: 0 10px 40px rgba(0,0,0,0.6);">
        <div style="text-align: center; margin-bottom: 28px;">
            <img src="{{ asset('autoshield-logo.png') }}" alt="AutoShield" style="height: 52px; margin-bottom: 16px;">
            <h2 style="font-size: 1.5rem; font-weight: 800; color: #fff; margin-bottom: 6px;">Create Customer Account</h2>
            <p style="color: var(--text-muted); font-size: 0.88rem;">Track your orders, save delivery addresses, and claim warranties</p>
        </div>

        @if($errors->any())
            <div style="background: rgba(239, 68, 68, 0.15); border: 1px solid #ef4444; border-radius: 10px; padding: 12px 16px; margin-bottom: 20px; color: #ef4444; font-size: 0.85rem;">
                @foreach ($errors->all() as $error)
                    <div>• {{ $error }}</div>
                @endforeach
            </div>
        @endif

        <form action="{{ route('register.post') }}" method="POST">
            @csrf

            <div style="margin-bottom: 16px;">
                <label style="display: block; font-size: 0.82rem; font-weight: 600; color: #cbd5e1; margin-bottom: 6px;">Full Name *</label>
                <input type="text" name="name" value="{{ old('name') }}" required
                       style="width: 100%; padding: 12px 14px; background: #161b26; border: 1px solid rgba(255,255,255,0.15); border-radius: 8px; color: #fff; font-size: 0.95rem; box-sizing: border-box;">
            </div>

            <div style="margin-bottom: 16px;">
                <label style="display: block; font-size: 0.82rem; font-weight: 600; color: #cbd5e1; margin-bottom: 6px;">Email Address *</label>
                <input type="email" name="email" value="{{ old('email') }}" required
                       style="width: 100%; padding: 12px 14px; background: #161b26; border: 1px solid rgba(255,255,255,0.15); border-radius: 8px; color: #fff; font-size: 0.95rem; box-sizing: border-box;">
            </div>

            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 14px; margin-bottom: 16px;">
                <div>
                    <label style="display: block; font-size: 0.82rem; font-weight: 600; color: #cbd5e1; margin-bottom: 6px;">Mobile / WhatsApp *</label>
                    <input type="tel" name="phone" value="{{ old('phone') }}" required placeholder="03001234567"
                           style="width: 100%; padding: 12px 14px; background: #161b26; border: 1px solid rgba(255,255,255,0.15); border-radius: 8px; color: #fff; font-size: 0.95rem; box-sizing: border-box;">
                </div>
                <div>
                    <label style="display: block; font-size: 0.82rem; font-weight: 600; color: #cbd5e1; margin-bottom: 6px;">City *</label>
                    <input type="text" name="city" value="{{ old('city') }}" required placeholder="e.g. Lahore"
                           style="width: 100%; padding: 12px 14px; background: #161b26; border: 1px solid rgba(255,255,255,0.15); border-radius: 8px; color: #fff; font-size: 0.95rem; box-sizing: border-box;">
                </div>
            </div>

            <div style="margin-bottom: 16px;">
                <label style="display: block; font-size: 0.82rem; font-weight: 600; color: #cbd5e1; margin-bottom: 6px;">Complete Shipping Address *</label>
                <input type="text" name="address" value="{{ old('address') }}" required placeholder="House #, Street #, Area..."
                       style="width: 100%; padding: 12px 14px; background: #161b26; border: 1px solid rgba(255,255,255,0.15); border-radius: 8px; color: #fff; font-size: 0.95rem; box-sizing: border-box;">
            </div>

            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 14px; margin-bottom: 24px;">
                <div>
                    <label style="display: block; font-size: 0.82rem; font-weight: 600; color: #cbd5e1; margin-bottom: 6px;">Password *</label>
                    <input type="password" name="password" required
                           style="width: 100%; padding: 12px 14px; background: #161b26; border: 1px solid rgba(255,255,255,0.15); border-radius: 8px; color: #fff; font-size: 0.95rem; box-sizing: border-box;">
                </div>
                <div>
                    <label style="display: block; font-size: 0.82rem; font-weight: 600; color: #cbd5e1; margin-bottom: 6px;">Confirm Password *</label>
                    <input type="password" name="password_confirmation" required
                           style="width: 100%; padding: 12px 14px; background: #161b26; border: 1px solid rgba(255,255,255,0.15); border-radius: 8px; color: #fff; font-size: 0.95rem; box-sizing: border-box;">
                </div>
            </div>

            <button type="submit" class="btn btn-primary" style="width: 100%; padding: 14px; font-size: 1rem; font-weight: 700; border-radius: 8px; cursor: pointer; border: none;">
                Create Account &rarr;
            </button>
        </form>

        <div style="text-align: center; margin-top: 20px; font-size: 0.85rem; color: var(--text-muted);">
            Already have an account? <a href="{{ route('login') }}" style="color: var(--red); font-weight: 700; text-decoration: none;">Sign in here</a>
        </div>
    </div>
</section>
@endsection
