<?php

namespace Database\Factories;

use App\Models\Customer;
use Illuminate\Database\Eloquent\Factories\Factory;

class VehicleFactory extends Factory
{
    public function definition(): array
    {
        return [
            'customer_id' => Customer::factory(),
            'registration_no' => strtoupper($this->faker->bothify('??-####')),
            'make' => $this->faker->randomElement(['Toyota', 'Honda', 'Nissan', 'Suzuki', 'Mazda']),
            'model' => $this->faker->word(),
            'year' => $this->faker->numberBetween(2005, 2025),
            'vin' => strtoupper($this->faker->bothify('VIN#############')),
            'mileage' => $this->faker->numberBetween(1000, 150000),
        ];
    }
}