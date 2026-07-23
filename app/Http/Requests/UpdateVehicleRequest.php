<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateVehicleRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user()->can('update', $this->route('vehicle'));
    }

    public function rules(): array
    {
        $vehicleId = $this->route('vehicle')->id;

        return [
            'customer_id' => ['required', 'exists:customers,id'],
            'registration_no' => ['required', 'string', 'max:50', 'unique:vehicles,registration_no,' . $vehicleId],
            'make' => ['required', 'string', 'max:100'],
            'model' => ['required', 'string', 'max:100'],
            'year' => ['required', 'integer', 'min:1980', 'max:' . (date('Y') + 1)],
            'vin' => ['required', 'string', 'max:100', 'unique:vehicles,vin,' . $vehicleId],
            'mileage' => ['required', 'integer', 'min:0'],
        ];
    }
}