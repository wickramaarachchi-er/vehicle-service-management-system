<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class AiService
{
    protected string $apiKey;
    protected string $model = 'gemini-flash-latest';

    public function __construct()
    {
        $this->apiKey = config('services.gemini.api_key');
    }

    public function analyzeComplaint(string $complaint): array
    {
        $prompt = <<<PROMPT
You are an expert vehicle service advisor. A customer has described a problem with their vehicle. 
Analyze the complaint and respond with ONLY a valid JSON object (no markdown, no extra text) in this exact format:

{
  "issues": ["issue 1", "issue 2"],
  "recommended_services": ["service 1", "service 2"],
  "urgency": "Low" or "Medium" or "High"
}

Customer complaint: "{$complaint}"
PROMPT;

        try {
            $response = Http::timeout(15)->post(
                "https://generativelanguage.googleapis.com/v1beta/models/{$this->model}:generateContent?key={$this->apiKey}",
                [
                    'contents' => [
                        ['parts' => [['text' => $prompt]]],
                    ],
                ]
            );

            if ($response->failed()) {
                Log::error('Gemini API request failed', ['response' => $response->body()]);
                return $this->fallbackResponse();
            }

            $text = $response->json('candidates.0.content.parts.0.text');

            // Strip markdown code fences if Gemini wraps the JSON in ```json ... ```
            $cleaned = trim(preg_replace('/```json|```/', '', $text));

            $parsed = json_decode($cleaned, true);

            if (!$parsed || !isset($parsed['issues'], $parsed['recommended_services'])) {
                Log::warning('Gemini response could not be parsed as expected JSON', ['raw' => $text]);
                return $this->fallbackResponse();
            }

            return [
                'issues' => $parsed['issues'],
                'recommended_services' => $parsed['recommended_services'],
                'urgency' => $parsed['urgency'] ?? 'Medium',
            ];

        } catch (\Exception $e) {
            Log::error('AiService exception', ['message' => $e->getMessage()]);
            return $this->fallbackResponse();
        }
    }

    protected function fallbackResponse(): array
    {
        return [
            'issues' => ['Unable to analyze complaint automatically.'],
            'recommended_services' => ['General inspection recommended.'],
            'urgency' => 'Medium',
        ];
    }
}