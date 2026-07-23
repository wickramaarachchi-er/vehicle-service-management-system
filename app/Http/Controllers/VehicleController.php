<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreVehicleRequest;
use App\Http\Requests\UpdateVehicleRequest;
use App\Models\Customer;
use App\Models\Vehicle;
use App\Services\VehicleService;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;

class VehicleController extends Controller
{
    public function __construct(protected VehicleService $vehicleService)
    {
    }

    public function index(Request $request): Response
    {
        $this->authorize('viewAny', Vehicle::class);

        $vehicles = $this->vehicleService->getPaginated($request->search);

        return Inertia::render('Vehicles/Index', [
            'vehicles' => $vehicles,
            'filters' => $request->only(['search']),
        ]);
    }

    public function create(): Response
    {
        $this->authorize('create', Vehicle::class);

        return Inertia::render('Vehicles/Create', [
            'customers' => Customer::select('id', 'name')->orderBy('name')->get(),
        ]);
    }

    public function store(StoreVehicleRequest $request): RedirectResponse
    {
        $this->vehicleService->create($request->validated());

        return redirect()->route('vehicles.index')->with('success', 'Vehicle created successfully.');
    }

    public function edit(Vehicle $vehicle): Response
    {
        $this->authorize('update', $vehicle);

        return Inertia::render('Vehicles/Edit', [
            'vehicle' => $vehicle,
            'customers' => Customer::select('id', 'name')->orderBy('name')->get(),
        ]);
    }

    public function update(UpdateVehicleRequest $request, Vehicle $vehicle): RedirectResponse
    {
        $this->vehicleService->update($vehicle, $request->validated());

        return redirect()->route('vehicles.index')->with('success', 'Vehicle updated successfully.');
    }

    public function destroy(Vehicle $vehicle): RedirectResponse
    {
        $this->authorize('delete', $vehicle);

        $this->vehicleService->delete($vehicle);

        return redirect()->route('vehicles.index')->with('success', 'Vehicle deleted successfully.');
    }
}