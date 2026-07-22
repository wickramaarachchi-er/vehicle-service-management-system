<?php

namespace App\Policies;

use App\Models\User;
use App\Models\JobCard;

class JobCardPolicy
{
    public function viewAny(User $user): bool
    {
        return $user->hasAnyRole(['Admin', 'Service Advisor', 'Mechanic']);
    }

    public function view(User $user, JobCard $jobCard): bool
    {
        if ($user->hasAnyRole(['Admin', 'Service Advisor'])) {
            return true;
        }

        // Mechanic can only view job cards assigned to them
        return $user->hasRole('Mechanic') && $jobCard->mechanic_id === $user->mechanic_id;
    }

    public function create(User $user): bool
    {
        return $user->hasAnyRole(['Admin', 'Service Advisor']);
    }

    public function update(User $user, JobCard $jobCard): bool
    {
        if ($user->hasAnyRole(['Admin', 'Service Advisor'])) {
            return true;
        }

        // Mechanic can only update status on their own assigned job
        return $user->hasRole('Mechanic') && $jobCard->mechanic_id === $user->mechanic_id;
    }

    public function delete(User $user, JobCard $jobCard): bool
    {
        return $user->hasRole('Admin');
    }
}