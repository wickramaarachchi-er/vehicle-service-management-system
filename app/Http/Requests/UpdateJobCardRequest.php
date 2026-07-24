<?php

namespace App\Http\Requests;

use App\Models\Part;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;
use Illuminate\Validation\Validator;

class UpdateJobCardRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user()->can('update', $this->route('job_card'));
    }

    public function rules(): array
    {
        return [
            'mechanic_id' => ['nullable', 'exists:mechanics,id'],
            'status' => ['required', Rule::in(['Pending', 'In Progress', 'Completed', 'Cancelled'])],
            'summary' => ['nullable', 'string', 'max:2000'],
            'labor_cost' => ['required', 'numeric', 'min:0'],
            'parts' => ['nullable', 'array'],
            'parts.*.part_id' => ['required_with:parts', 'exists:parts,id'],
            'parts.*.quantity_used' => ['required_with:parts', 'integer', 'min:1'],
        ];
    }

    public function withValidator(Validator $validator): void
    {
        $validator->after(function ($validator) {
            if ($this->status === 'Completed' && $this->has('parts')) {
                foreach ($this->parts as $index => $partData) {
                    $part = Part::find($partData['part_id']);
                    if ($part && $part->stock_quantity < $partData['quantity_used']) {
                        $validator->errors()->add(
                            "parts.{$index}.quantity_used",
                            "Not enough stock for {$part->name}. Available: {$part->stock_quantity}."
                        );
                    }
                }
            }
        });
    }
}