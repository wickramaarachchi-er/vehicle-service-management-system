<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreBookingRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user()->can('create', \App\Models\Booking::class);
    }

    public function rules(): array
    {
        return [
            'vehicle_id' => ['required', 'exists:vehicles,id'],
            'booking_date' => ['required', 'date', 'after_or_equal:today'],
            'booking_time' => [
                'required',
                'date_format:H:i',
                Rule::unique('bookings')->where(function ($query) {
                    return $query->where('booking_date', $this->booking_date)
                        ->where('vehicle_id', $this->vehicle_id)
                        ->whereNotIn('status', ['Cancelled']);
                }),
            ],
            'complaint' => ['nullable', 'string', 'max:1000'],
        ];
    }

    public function messages(): array
    {
        return [
            'booking_time.unique' => 'This vehicle already has a booking at this date and time. Please choose a different slot.',
        ];
    }
}