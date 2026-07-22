<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class MechanicFactory extends Factory
{
    public function definition(): array
    {
        return [
            'name' => $this->faker->name(),
            'employee_id' => 'EMP-' . $this->faker->unique()->numberBetween(1000, 9999),
            'specialization' => $this->faker->randomElement(['Engine Repair', 'Electrical', 'Brakes & Suspension', 'AC Repair', 'General Maintenance']),
            'contact' => $this->faker->phoneNumber(),
        ];
    }
}