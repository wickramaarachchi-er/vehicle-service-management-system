<?php

namespace App\Services;

use App\Models\Booking;
use App\Models\JobCard;
use App\Models\Part;
use App\Models\Invoice;
use Illuminate\Support\Carbon;

class DashboardService
{
    public function getStats(): array
    {
        $today = Carbon::today();

        return [
            'todaysBookings' => Booking::with(['vehicle', 'customer'])
                ->whereDate('booking_date', $today)
                ->orderBy('booking_time')
                ->get(),

            'activeJobs' => JobCard::with(['booking.vehicle', 'booking.customer', 'mechanic'])
                ->whereIn('status', ['Pending', 'In Progress'])
                ->latest()
                ->take(10)
                ->get(),

            'lowStockParts' => Part::whereColumn('stock_quantity', '<=', 'low_stock_threshold')
                ->orderBy('stock_quantity')
                ->get(),

            'dailyRevenue' => Invoice::whereDate('created_at', $today)
                ->where('payment_status', 'Paid')
                ->sum('grand_total'),

            'todaysBookingsCount' => Booking::whereDate('booking_date', $today)->count(),
            'activeJobsCount' => JobCard::whereIn('status', ['Pending', 'In Progress'])->count(),
            'lowStockCount' => Part::whereColumn('stock_quantity', '<=', 'low_stock_threshold')->count(),
        ];
    }
}