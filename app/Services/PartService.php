<?php

namespace App\Services;

use App\Models\Part;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Pagination\LengthAwarePaginator;

class PartService
{
    public function getPaginated(?string $search = null, int $perPage = 10): LengthAwarePaginator
    {
        return Part::query()
            ->when($search, function ($query, $search) {
                $query->where('name', 'like', "%{$search}%")
                    ->orWhere('part_number', 'like', "%{$search}%");
            })
            ->latest()
            ->paginate($perPage)
            ->withQueryString();
    }

    public function getLowStockParts(): Collection
    {
        return Part::query()
            ->whereColumn('stock_quantity', '<=', 'low_stock_threshold')
            ->orderBy('stock_quantity')
            ->get();
    }

    public function create(array $data): Part
    {
        return Part::create($data);
    }

    public function update(Part $part, array $data): Part
    {
        $part->update($data);
        return $part;
    }

    public function delete(Part $part): void
    {
        $part->delete();
    }
}
