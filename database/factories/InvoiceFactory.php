<?php

namespace Database\Factories;

use App\Models\JobCard;
use Illuminate\Database\Eloquent\Factories\Factory;

class InvoiceFactory extends Factory
{
    public function definition(): array
    {
        $labor = $this->faker->randomFloat(2, 20, 150);
        $parts = $this->faker->randomFloat(2, 0, 300);

        return [
            'job_card_id' => JobCard::factory(),
            'invoice_number' => 'INV-' . $this->faker->unique()->numberBetween(10000, 99999),
            'labor_total' => $labor,
            'parts_total' => $parts,
            'grand_total' => $labor + $parts,
            'payment_status' => $this->faker->randomElement(['Paid', 'Pending']),
        ];
    }
}