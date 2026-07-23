<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreMechanicRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user()->can('create', \App\Models\Mechanic::class);
    }

    public function rules(): array
    {
        return [
            'name'           => ['required', 'string', 'max:255'],
            'employee_id'    => ['required', 'string', 'unique:mechanics,employee_id'],
            'specialization' => ['required', 'string', 'max:255'],
            'contact'        => ['required', 'string', 'max:20'],
        ];
    }
}
