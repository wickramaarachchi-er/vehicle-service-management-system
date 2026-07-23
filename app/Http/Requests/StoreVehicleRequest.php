<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreVehicleRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user()->can('create', \App\Models\Vehicle::class);
    }

    public function rules(): array
    {
        return [
            'customer_id' => ['required', 'exists:customers,id'],
            'registration_no' => ['required', 'string', 'max:50', 'unique:vehicles,registration_no'],
            'make' => ['required', 'string', 'max:100'],
            'model' => ['required', 'string', 'max:100'],
            'year' => ['required', 'integer', 'min:1980', 'max:' . (date('Y') + 1)],
            'vin' => ['required', 'string', 'max:100', 'unique:vehicles,vin'],
            'mileage' => ['required', 'integer', 'min:0'],
        ];
    }
}