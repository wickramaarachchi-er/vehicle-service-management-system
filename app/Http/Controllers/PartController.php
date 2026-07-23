<?php

namespace App\Http\Controllers;

use App\Http\Requests\StorePartRequest;
use App\Http\Requests\UpdatePartRequest;
use App\Models\Part;
use App\Services\PartService;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;

class PartController extends Controller
{
    public function __construct(protected PartService $partService)
    {
    }

    public function index(Request $request): Response
    {
        $this->authorize('viewAny', Part::class);

        $parts = $this->partService->getPaginated($request->search);

        return Inertia::render('Parts/Index', [
            'parts'   => $parts,
            'filters' => $request->only(['search']),
        ]);
    }

    public function create(): Response
    {
        $this->authorize('create', Part::class);

        return Inertia::render('Parts/Create');
    }

    public function store(StorePartRequest $request): RedirectResponse
    {
        $this->partService->create($request->validated());

        return redirect()->route('parts.index')->with('success', 'Part created successfully.');
    }

    public function edit(Part $part): Response
    {
        $this->authorize('update', $part);

        return Inertia::render('Parts/Edit', [
            'part' => $part,
        ]);
    }

    public function update(UpdatePartRequest $request, Part $part): RedirectResponse
    {
        $this->partService->update($part, $request->validated());

        return redirect()->route('parts.index')->with('success', 'Part updated successfully.');
    }

    public function destroy(Part $part): RedirectResponse
    {
        $this->authorize('delete', $part);

        $this->partService->delete($part);

        return redirect()->route('parts.index')->with('success', 'Part deleted successfully.');
    }
}
