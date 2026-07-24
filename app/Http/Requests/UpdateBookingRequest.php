<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateBookingRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user()->can('update', $this->route('booking'));
    }

    public function rules(): array
    {
        $bookingId = $this->route('booking')->id;

        return [
            'vehicle_id' => ['required', 'exists:vehicles,id'],
            'booking_date' => ['required', 'date'],
            'booking_time' => [
                'required',
                'date_format:H:i',
                Rule::unique('bookings')->ignore($bookingId)->where(function ($query) {
                    return $query->where('booking_date', $this->booking_date)
                        ->where('vehicle_id', $this->vehicle_id)
                        ->whereNotIn('status', ['Cancelled']);
                }),
            ],
            'complaint' => ['nullable', 'string', 'max:1000'],
            'status' => ['required', Rule::in(['Pending', 'In Progress', 'Completed', 'Cancelled'])],
        ];
    }

    public function messages(): array
    {
        return [
            'booking_time.unique' => 'This vehicle already has a booking at this date and time. Please choose a different slot.',
        ];
    }
}