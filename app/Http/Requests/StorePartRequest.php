<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StorePartRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user()->can('create', \App\Models\Part::class);
    }

    public function rules(): array
    {
        return [
            'name'                => ['required', 'string', 'max:255'],
            'part_number'         => ['required', 'string', 'unique:parts,part_number'],
            'stock_quantity'      => ['required', 'integer', 'min:0'],
            'low_stock_threshold' => ['required', 'integer', 'min:0'],
            'unit_price'          => ['required', 'numeric', 'min:0'],
        ];
    }
}
