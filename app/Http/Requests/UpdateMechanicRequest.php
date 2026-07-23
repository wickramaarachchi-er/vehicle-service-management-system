<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateMechanicRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user()->can('update', $this->route('mechanic'));
    }

    public function rules(): array
    {
        $mechanicId = $this->route('mechanic')->id;

        return [
            'name'           => ['required', 'string', 'max:255'],
            'employee_id'    => ['required', 'string', 'unique:mechanics,employee_id,' . $mechanicId],
            'specialization' => ['required', 'string', 'max:255'],
            'contact'        => ['required', 'string', 'max:20'],
        ];
    }
}
