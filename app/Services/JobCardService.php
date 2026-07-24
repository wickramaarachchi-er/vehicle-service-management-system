<?php

namespace App\Services;

use App\Models\JobCard;
use App\Models\Part;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Support\Facades\DB;

class JobCardService
{
    public function getPaginated(?string $search = null, int $perPage = 10): LengthAwarePaginator
    {
        return JobCard::query()
            ->with(['booking.vehicle', 'booking.customer', 'mechanic'])
            ->when($search, function ($query, $search) {
                $query->whereHas('booking.vehicle', function ($q) use ($search) {
                    $q->where('registration_no', 'like', "%{$search}%");
                })->orWhereHas('mechanic', function ($q) use ($search) {
                    $q->where('name', 'like', "%{$search}%");
                });
            })
            ->latest()
            ->paginate($perPage)
            ->withQueryString();
    }

    public function create(array $data): JobCard
    {
        return DB::transaction(function () use ($data) {
            $jobCard = JobCard::create([
                'booking_id' => $data['booking_id'],
                'mechanic_id' => $data['mechanic_id'] ?? null,
                'status' => 'Pending',
                'labor_cost' => $data['labor_cost'],
                'started_at' => now(),
            ]);

            if (!empty($data['parts'])) {
                foreach ($data['parts'] as $partData) {
                    $part = Part::findOrFail($partData['part_id']);
                    $jobCard->parts()->attach($part->id, [
                        'quantity_used' => $partData['quantity_used'],
                        'unit_price_at_time' => $part->unit_price,
                    ]);
                }
            }

            return $jobCard->load('parts');
        });
    }

    public function update(JobCard $jobCard, array $data): JobCard
    {
        return DB::transaction(function () use ($jobCard, $data) {
            $wasCompleted = $jobCard->status === 'Completed';
            $isNowCompleted = $data['status'] === 'Completed';

            $jobCard->update([
                'mechanic_id' => $data['mechanic_id'] ?? null,
                'status' => $data['status'],
                'summary' => $data['summary'] ?? null,
                'labor_cost' => $data['labor_cost'],
                'completed_at' => $isNowCompleted ? now() : $jobCard->completed_at,
            ]);

            // Sync parts (replace existing attachments with new selection)
            if (isset($data['parts'])) {
                $jobCard->parts()->detach();
                foreach ($data['parts'] as $partData) {
                    $part = Part::findOrFail($partData['part_id']);
                    $jobCard->parts()->attach($part->id, [
                        'quantity_used' => $partData['quantity_used'],
                        'unit_price_at_time' => $part->unit_price,
                    ]);
                }
            }

            // Deduct stock ONLY when transitioning from not-Completed to Completed
            if (!$wasCompleted && $isNowCompleted) {
                foreach ($jobCard->parts as $part) {
                    $part->decrement('stock_quantity', $part->pivot->quantity_used);
                }
            }

            return $jobCard->fresh(['parts', 'mechanic', 'booking']);
        });
    }

    public function delete(JobCard $jobCard): void
    {
        $jobCard->delete();
    }
}