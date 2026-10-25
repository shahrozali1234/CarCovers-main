<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class AdminMiddleware
{
    /**
     * Handle an incoming request.
     * Enforces Role-Based Access Control (RBAC) for Admin areas.
     */
    public function handle(Request $request, Closure $next): Response
    {
        if (!auth()->check()) {
            return redirect()->route('login')->with('error', 'Please login to access the administration dashboard.');
        }

        if (!auth()->user()->isAdmin()) {
            abort(403, 'Unauthorized action. Only administrators can access this section.');
        }

        return $next($request);
    }
}
