<?php

namespace App\Services;

use App\Models\Vehicle;
use Illuminate\Pagination\LengthAwarePaginator;

class VehicleService
{
    public function getPaginated(?string $search = null, int $perPage = 10): LengthAwarePaginator
    {
        return Vehicle::query()
            ->with('customer')
            ->when($search, function ($query, $search) {
                $query->where('registration_no', 'like', "%{$search}%")
                    ->orWhere('make', 'like', "%{$search}%")
                    ->orWhere('model', 'like', "%{$search}%")
                    ->orWhere('vin', 'like', "%{$search}%");
            })
            ->latest()
            ->paginate($perPage)
            ->withQueryString();
    }

    public function create(array $data): Vehicle
    {
        return Vehicle::create($data);
    }

    public function update(Vehicle $vehicle, array $data): Vehicle
    {
        $vehicle->update($data);
        return $vehicle;
    }

    public function delete(Vehicle $vehicle): void
    {
        $vehicle->delete();
    }
}