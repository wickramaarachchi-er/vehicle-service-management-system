<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreJobCardRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user()->can('create', \App\Models\JobCard::class);
    }

    public function rules(): array
    {
        return [
            'booking_id' => ['required', 'exists:bookings,id', 'unique:job_cards,booking_id'],
            'mechanic_id' => ['nullable', 'exists:mechanics,id'],
            'labor_cost' => ['required', 'numeric', 'min:0'],
            'parts' => ['nullable', 'array'],
            'parts.*.part_id' => ['required_with:parts', 'exists:parts,id'],
            'parts.*.quantity_used' => ['required_with:parts', 'integer', 'min:1'],
        ];
    }

    public function messages(): array
    {
        return [
            'booking_id.unique' => 'A job card already exists for this booking.',
        ];
    }
}