<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreInvoiceRequest;
use App\Http\Requests\UpdateInvoiceRequest;
use App\Models\Invoice;
use App\Models\JobCard;
use App\Services\InvoiceService;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;

class InvoiceController extends Controller
{
    public function __construct(protected InvoiceService $invoiceService)
    {
    }

    public function index(Request $request): Response
    {
        $this->authorize('viewAny', Invoice::class);

        $invoices = $this->invoiceService->getPaginated($request->search);

        return Inertia::render('Invoices/Index', [
            'invoices' => $invoices,
            'filters' => $request->only(['search']),
        ]);
    }

    public function create(): Response
    {
        $this->authorize('create', Invoice::class);

        // Only show Completed job cards that don't already have an invoice
        $jobCards = JobCard::with(['booking.vehicle', 'booking.customer'])
            ->where('status', 'Completed')
            ->whereDoesntHave('invoice')
            ->get()
            ->map(fn($jobCard) => [
                'id' => $jobCard->id,
                'label' => "{$jobCard->booking->vehicle->registration_no} - {$jobCard->booking->customer->name}",
            ]);

        return Inertia::render('Invoices/Create', [
            'jobCards' => $jobCards,
        ]);
    }

    public function store(StoreInvoiceRequest $request): RedirectResponse
    {
        $this->invoiceService->createFromJobCard($request->validated()['job_card_id']);

        return redirect()->route('invoices.index')->with('success', 'Invoice generated successfully.');
    }

    public function edit(Invoice $invoice): Response
    {
        $this->authorize('update', $invoice);

        return Inertia::render('Invoices/Edit', [
            'invoice' => $invoice->load(['jobCard.booking.vehicle', 'jobCard.booking.customer', 'jobCard.parts']),
        ]);
    }

    public function update(UpdateInvoiceRequest $request, Invoice $invoice): RedirectResponse
    {
        $this->invoiceService->updatePaymentStatus($invoice, $request->validated()['payment_status']);

        return redirect()->route('invoices.index')->with('success', 'Invoice updated successfully.');
    }

    public function destroy(Invoice $invoice): RedirectResponse
    {
        $this->authorize('delete', $invoice);

        $this->invoiceService->delete($invoice);

        return redirect()->route('invoices.index')->with('success', 'Invoice deleted successfully.');
    }
}