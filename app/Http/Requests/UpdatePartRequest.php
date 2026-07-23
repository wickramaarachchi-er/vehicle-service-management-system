<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdatePartRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user()->can('update', $this->route('part'));
    }

    public function rules(): array
    {
        $partId = $this->route('part')->id;

        return [
            'name'                => ['required', 'string', 'max:255'],
            'part_number'         => ['required', 'string', 'unique:parts,part_number,' . $partId],
            'stock_quantity'      => ['required', 'integer', 'min:0'],
            'low_stock_threshold' => ['required', 'integer', 'min:0'],
            'unit_price'          => ['required', 'numeric', 'min:0'],
        ];
    }
}
