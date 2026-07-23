<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreMechanicRequest;
use App\Http\Requests\UpdateMechanicRequest;
use App\Models\Mechanic;
use App\Services\MechanicService;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;

class MechanicController extends Controller
{
    public function __construct(protected MechanicService $mechanicService)
    {
    }

    public function index(Request $request): Response
    {
        $this->authorize('viewAny', Mechanic::class);

        $mechanics = $this->mechanicService->getPaginated($request->search);

        return Inertia::render('Mechanics/Index', [
            'mechanics' => $mechanics,
            'filters'   => $request->only(['search']),
        ]);
    }

    public function create(): Response
    {
        $this->authorize('create', Mechanic::class);

        return Inertia::render('Mechanics/Create');
    }

    public function store(StoreMechanicRequest $request): RedirectResponse
    {
        $this->mechanicService->create($request->validated());

        return redirect()->route('mechanics.index')->with('success', 'Mechanic created successfully.');
    }

    public function edit(Mechanic $mechanic): Response
    {
        $this->authorize('update', $mechanic);

        return Inertia::render('Mechanics/Edit', [
            'mechanic' => $mechanic,
        ]);
    }

    public function update(UpdateMechanicRequest $request, Mechanic $mechanic): RedirectResponse
    {
        $this->mechanicService->update($mechanic, $request->validated());

        return redirect()->route('mechanics.index')->with('success', 'Mechanic updated successfully.');
    }

    public function destroy(Mechanic $mechanic): RedirectResponse
    {
        $this->authorize('delete', $mechanic);

        $this->mechanicService->delete($mechanic);

        return redirect()->route('mechanics.index')->with('success', 'Mechanic deleted successfully.');
    }
}
