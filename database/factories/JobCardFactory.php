<?php

namespace Database\Factories;

use App\Models\Booking;
use App\Models\Mechanic;
use Illuminate\Database\Eloquent\Factories\Factory;

class JobCardFactory extends Factory
{
    public function definition(): array
    {
        return [
            'booking_id' => Booking::factory(),
            'mechanic_id' => Mechanic::inRandomOrder()->first()?->id ?? Mechanic::factory(),
            'status' => $this->faker->randomElement(['Pending', 'In Progress', 'Completed', 'Cancelled']),
            'summary' => $this->faker->optional()->sentence(),
            'labor_cost' => $this->faker->randomFloat(2, 20, 150),
            'started_at' => now(),
            'completed_at' => null,
        ];
    }
}