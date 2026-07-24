<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreInvoiceRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user()->can('create', \App\Models\Invoice::class);
    }

    public function rules(): array
    {
        return [
            'job_card_id' => ['required', 'exists:job_cards,id', 'unique:invoices,job_card_id'],
        ];
    }

    public function messages(): array
    {
        return [
            'job_card_id.unique' => 'An invoice already exists for this job card.',
        ];
    }
}