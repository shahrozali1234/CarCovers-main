@extends('layouts.app')

@section('title', 'About & Technology — AutoShield Car Top Covers')

@section('content')
<!-- Page Banner -->
<section class="page-banner">
    <div class="container">
        <div class="eyebrow">Engineering Excellence</div>
        <h1>ABOUT AUTOSHIELD <span class="text-gradient">TECHNOLOGY</span></h1>
        <p>Dedicated to engineering the highest grade composite fabric covers to keep vehicle paint finishes flawless.</p>
    </div>
</section>

<!-- Content Section -->
<section class="specs-section">
    <div class="container" style="display:flex; flex-direction:column; gap:64px;">
        
        <div style="display:grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap:48px; align-items:center;">
            <div>
                <div class="eyebrow">Our Mission</div>
                <h2 style="font-size:2.2rem; margin-bottom: 16px;">Protecting Your Passion On Wheels</h2>
                <p style="color:var(--text-secondary); line-height: 1.8; margin-bottom: 16px;">
                    AutoShield was founded with a singular purpose: to solve the frustration car owners face with cheap, paper-thin body covers that tear easily, leak water, or scratch expensive paintwork.
                </p>
                <p style="color:var(--text-secondary); line-height: 1.8;">
                    Every AutoShield cover undergoes rigorous quality testing to ensure 100% water resistance, maximum UV heat reflection, and soft anti-scratch inner lining.
                </p>
            </div>
            <div>
                <img src="{{ asset('images/covers/hero_luxury_bespoke.jpg') }}" alt="AutoShield Technology" style="border-radius: var(--radius-lg); box-shadow: 0 20px 40px rgba(0,0,0,0.8), 0 0 20px rgba(184,148,69,0.15); border: 1px solid var(--border-color); width:100%;">
            </div>
        </div>

        <!-- Lab Test Highlights Grid -->
        <div style="background:var(--bg-card); padding:48px 36px; border-radius:var(--radius-lg); border:1px solid var(--border-color);">
            <div class="section-head" style="margin-bottom:32px;">
                <div class="eyebrow">Quality Standards</div>
                <h2 style="font-family: var(--font-serif); font-size: 2.2rem; font-weight: 400; color: var(--text-primary);">Laboratory Tested & Verified</h2>
            </div>

            <div style="display:grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap:28px;">
                <div style="border-left: 3px solid var(--gold-accent); padding-left: 20px;">
                    <h3 style="font-family: var(--font-serif); font-size: 1.35rem; color: var(--text-primary); margin-bottom:8px; font-weight: 500;">10,000mm Waterproof</h3>
                    <p style="color:var(--text-muted); font-size:0.88rem; line-height: 1.6;">Heat-sealed ultrasonic seams withstand heavy monsoons without any moisture penetration.</p>
                </div>
                <div style="border-left: 3px solid var(--gold-hover); padding-left: 20px;">
                    <h3 style="font-family: var(--font-serif); font-size: 1.35rem; color: var(--text-primary); margin-bottom:8px; font-weight: 500;">99.5% UV Reflection</h3>
                    <p style="color:var(--text-muted); font-size:0.88rem; line-height: 1.6;">Aluminum micro-coating prevents cabin temperature spikes and dashboard cracking in peak summer.</p>
                </div>
                <div style="border-left: 3px solid #1B492D; padding-left: 20px;">
                    <h3 style="font-family: var(--font-serif); font-size: 1.35rem; color: var(--text-primary); margin-bottom:8px; font-weight: 500;">Scratch-Free Velvet</h3>
                    <p style="color:var(--text-muted); font-size:0.88rem; line-height: 1.6;">Ultra soft fleece inner layer prevents swirling and scratches on ceramic coating and clear coats.</p>
                </div>
            </div>
        </div>
    </div>
</section>
@endsection
