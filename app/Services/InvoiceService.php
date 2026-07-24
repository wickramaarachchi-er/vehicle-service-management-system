<?php

namespace App\Services;

use App\Models\Invoice;
use App\Models\JobCard;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class InvoiceService
{
    public function getPaginated(?string $search = null, int $perPage = 10): LengthAwarePaginator
    {
        return Invoice::query()
            ->with(['jobCard.booking.vehicle', 'jobCard.booking.customer'])
            ->when($search, function ($query, $search) {
                $query->where('invoice_number', 'like', "%{$search}%")
                    ->orWhereHas('jobCard.booking.customer', function ($q) use ($search) {
                        $q->where('name', 'like', "%{$search}%");
                    });
            })
            ->latest()
            ->paginate($perPage)
            ->withQueryString();
    }

    public function createFromJobCard(int $jobCardId): Invoice
    {
        return DB::transaction(function () use ($jobCardId) {
            $jobCard = JobCard::with('parts')->findOrFail($jobCardId);

            $laborTotal = $jobCard->labor_cost;
            $partsTotal = $jobCard->parts->sum(function ($part) {
                return $part->pivot->quantity_used * $part->pivot->unit_price_at_time;
            });

            return Invoice::create([
                'job_card_id' => $jobCard->id,
                'invoice_number' => $this->generateInvoiceNumber(),
                'labor_total' => $laborTotal,
                'parts_total' => $partsTotal,
                'grand_total' => $laborTotal + $partsTotal,
                'payment_status' => 'Pending',
            ]);
        });
    }

    public function updatePaymentStatus(Invoice $invoice, string $status): Invoice
    {
        $invoice->update(['payment_status' => $status]);
        return $invoice;
    }

    public function delete(Invoice $invoice): void
    {
        $invoice->delete();
    }

    protected function generateInvoiceNumber(): string
    {
        do {
            $number = 'INV-' . date('Ymd') . '-' . strtoupper(Str::random(4));
        } while (Invoice::where('invoice_number', $number)->exists());

        return $number;
    }
}