<?php

namespace App\Policies;

use App\Models\User;
use App\Models\Booking;

class BookingPolicy
{
    public function viewAny(User $user): bool
    {
        return $user->hasAnyRole(['Admin', 'Service Advisor', 'Mechanic']);
    }

    public function view(User $user, Booking $booking): bool
    {
        return $user->hasAnyRole(['Admin', 'Service Advisor', 'Mechanic']);
    }

    public function create(User $user): bool
    {
        return $user->hasAnyRole(['Admin', 'Service Advisor']);
    }

    public function update(User $user, Booking $booking): bool
    {
        return $user->hasAnyRole(['Admin', 'Service Advisor']);
    }

    public function delete(User $user, Booking $booking): bool
    {
        return $user->hasRole('Admin');
    }
}