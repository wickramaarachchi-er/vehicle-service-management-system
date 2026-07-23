<?php

namespace App\Services;

use App\Models\Mechanic;
use Illuminate\Pagination\LengthAwarePaginator;

class MechanicService
{
    public function getPaginated(?string $search = null, int $perPage = 10): LengthAwarePaginator
    {
        return Mechanic::query()
            ->when($search, function ($query, $search) {
                $query->where('name', 'like', "%{$search}%")
                    ->orWhere('employee_id', 'like', "%{$search}%")
                    ->orWhere('specialization', 'like', "%{$search}%");
            })
            ->latest()
            ->paginate($perPage)
            ->withQueryString();
    }

    public function create(array $data): Mechanic
    {
        return Mechanic::create($data);
    }

    public function update(Mechanic $mechanic, array $data): Mechanic
    {
        $mechanic->update($data);
        return $mechanic;
    }

    public function delete(Mechanic $mechanic): void
    {
        $mechanic->delete();
    }
}
