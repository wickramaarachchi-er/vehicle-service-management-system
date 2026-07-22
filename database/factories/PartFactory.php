<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class PartFactory extends Factory
{
    public function definition(): array
    {
        return [
            'name' => $this->faker->randomElement(['Brake Pad', 'Oil Filter', 'Air Filter', 'Spark Plug', 'Battery', 'Headlight Bulb', 'Wiper Blade']),
            'part_number' => 'PN-' . $this->faker->unique()->numberBetween(10000, 99999),
            'stock_quantity' => $this->faker->numberBetween(0, 100),
            'low_stock_threshold' => 5,
            'unit_price' => $this->faker->randomFloat(2, 5, 200),
        ];
    }
}