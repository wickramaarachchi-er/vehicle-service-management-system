<?php

use App\Http\Controllers\InvoiceController;
use App\Http\Controllers\JobCardController;
use App\Http\Controllers\BookingController;
use App\Http\Controllers\VehicleController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\CustomerController;
use App\Http\Controllers\MechanicController;
use App\Http\Controllers\PartController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function (\App\Services\DashboardService $dashboardService) {
    return Inertia::render('Dashboard', $dashboardService->getStats());
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware(['auth', 'role:Admin'])->group(function () {
    Route::get('/admin-only', function () {
        return 'Welcome Admin! This page is Admin-only.';
    });
});

Route::middleware(['auth', 'verified'])->group(function () {
    Route::resource('customers', CustomerController::class)->except(['show']);
    Route::resource('vehicles', VehicleController::class)->except(['show']);
    Route::resource('mechanics', MechanicController::class)->except(['show']);
    Route::resource('parts', PartController::class)->except(['show']);
    Route::resource('bookings', BookingController::class)->except(['show']);
    Route::resource('job-cards', JobCardController::class)->except(['show']);
    Route::resource('invoices', InvoiceController::class)->except(['show']);
});

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';