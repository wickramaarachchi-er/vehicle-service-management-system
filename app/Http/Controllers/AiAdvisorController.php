<?php

namespace App\Http\Controllers;

use App\Services\AiService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class AiAdvisorController extends Controller
{
    public function __construct(protected AiService $aiService)
    {
    }

    public function analyze(Request $request): JsonResponse
    {
        $request->validate([
            'complaint' => ['required', 'string', 'max:1000'],
        ]);

        $result = $this->aiService->analyzeComplaint($request->complaint);

        return response()->json($result);
    }
}