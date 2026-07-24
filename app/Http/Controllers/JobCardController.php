<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreJobCardRequest;
use App\Http\Requests\UpdateJobCardRequest;
use App\Models\Booking;
use App\Models\JobCard;
use App\Models\Mechanic;
use App\Models\Part;
use App\Services\JobCardService;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;

class JobCardController extends Controller
{
    public function __construct(protected JobCardService $jobCardService)
    {
    }

    public function index(Request $request): Response
    {
        $this->authorize('viewAny', JobCard::class);

        $jobCards = $this->jobCardService->getPaginated($request->search);

        return Inertia::render('JobCards/Index', [
            'jobCards' => $jobCards,
            'filters' => $request->only(['search']),
        ]);
    }

    public function create(): Response
    {
        $this->authorize('create', JobCard::class);

        return Inertia::render('JobCards/Create', [
            'bookings' => Booking::with(['vehicle', 'customer'])
                ->whereDoesntHave('jobCard')
                ->get()
                ->map(fn($booking) => [
                    'id' => $booking->id,
                    'label' => "{$booking->vehicle->registration_no} - {$booking->customer->name} ({$booking->booking_date})",
                ]),
            'mechanics' => Mechanic::select('id', 'name', 'specialization')->get(),
            'parts' => Part::select('id', 'name', 'part_number', 'stock_quantity', 'unit_price')->get(),
        ]);
    }

    public function store(StoreJobCardRequest $request): RedirectResponse
    {
        $this->jobCardService->create($request->validated());

        return redirect()->route('job-cards.index')->with('success', 'Job card created successfully.');
    }

    public function edit(JobCard $jobCard): Response
    {
        $this->authorize('update', $jobCard);

        return Inertia::render('JobCards/Edit', [
            'jobCard' => $jobCard->load(['booking.vehicle', 'booking.customer', 'mechanic', 'parts']),
            'mechanics' => Mechanic::select('id', 'name', 'specialization')->get(),
            'parts' => Part::select('id', 'name', 'part_number', 'stock_quantity', 'unit_price')->get(),
        ]);
    }

    public function update(UpdateJobCardRequest $request, JobCard $jobCard): RedirectResponse
    {
        $this->jobCardService->update($jobCard, $request->validated());

        return redirect()->route('job-cards.index')->with('success', 'Job card updated successfully.');
    }

    public function destroy(JobCard $jobCard): RedirectResponse
    {
        $this->authorize('delete', $jobCard);

        $this->jobCardService->delete($jobCard);

        return redirect()->route('job-cards.index')->with('success', 'Job card deleted successfully.');
    }
}