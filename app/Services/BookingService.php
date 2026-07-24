<?php

namespace App\Services;

use App\Models\Booking;
use App\Models\Vehicle;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Support\Facades\DB;

class BookingService
{
    public function getPaginated(?string $search = null, int $perPage = 10): LengthAwarePaginator
    {
        return Booking::query()
            ->with(['vehicle', 'customer'])
            ->when($search, function ($query, $search) {
                $query->whereHas('vehicle', function ($q) use ($search) {
                    $q->where('registration_no', 'like', "%{$search}%");
                })->orWhereHas('customer', function ($q) use ($search) {
                    $q->where('name', 'like', "%{$search}%");
                });
            })
            ->latest()
            ->paginate($perPage)
            ->withQueryString();
    }

    public function create(array $data): Booking
    {
        return DB::transaction(function () use ($data) {
            $vehicle = Vehicle::findOrFail($data['vehicle_id']);

            return Booking::create([
                'vehicle_id' => $vehicle->id,
                'customer_id' => $vehicle->customer_id,
                'booking_date' => $data['booking_date'],
                'booking_time' => $data['booking_time'],
                'complaint' => $data['complaint'] ?? null,
                'status' => 'Pending',
            ]);
        });
    }

    public function update(Booking $booking, array $data): Booking
    {
        $booking->update($data);
        return $booking;
    }

    public function delete(Booking $booking): void
    {
        $booking->delete();
    }
}