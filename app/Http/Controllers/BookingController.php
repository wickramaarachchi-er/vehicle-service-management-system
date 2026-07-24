<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreBookingRequest;
use App\Http\Requests\UpdateBookingRequest;
use App\Models\Booking;
use App\Models\Vehicle;
use App\Services\BookingService;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;

class BookingController extends Controller
{
    public function __construct(protected BookingService $bookingService)
    {
    }

    public function index(Request $request): Response
    {
        $this->authorize('viewAny', Booking::class);

        $bookings = $this->bookingService->getPaginated($request->search);

        return Inertia::render('Bookings/Index', [
            'bookings' => $bookings,
            'filters' => $request->only(['search']),
        ]);
    }

    public function create(): Response
    {
        $this->authorize('create', Booking::class);

        return Inertia::render('Bookings/Create', [
            'vehicles' => Vehicle::with('customer')->get()->map(function ($vehicle) {
                return [
                    'id' => $vehicle->id,
                    'label' => "{$vehicle->registration_no} - {$vehicle->make} {$vehicle->model} ({$vehicle->customer->name})",
                ];
            }),
        ]);
    }

    public function store(StoreBookingRequest $request): RedirectResponse
    {
        $this->bookingService->create($request->validated());

        return redirect()->route('bookings.index')->with('success', 'Booking created successfully.');
    }

    public function edit(Booking $booking): Response
    {
        $this->authorize('update', $booking);

        return Inertia::render('Bookings/Edit', [
            'booking' => $booking,
            'vehicles' => Vehicle::with('customer')->get()->map(function ($vehicle) {
                return [
                    'id' => $vehicle->id,
                    'label' => "{$vehicle->registration_no} - {$vehicle->make} {$vehicle->model} ({$vehicle->customer->name})",
                ];
            }),
        ]);
    }

    public function update(UpdateBookingRequest $request, Booking $booking): RedirectResponse
    {
        $this->bookingService->update($booking, $request->validated());

        return redirect()->route('bookings.index')->with('success', 'Booking updated successfully.');
    }

    public function destroy(Booking $booking): RedirectResponse
    {
        $this->authorize('delete', $booking);

        $this->bookingService->delete($booking);

        return redirect()->route('bookings.index')->with('success', 'Booking deleted successfully.');
    }
}