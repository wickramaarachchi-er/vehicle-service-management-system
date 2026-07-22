<?php

namespace Database\Factories;

use App\Models\Customer;
use App\Models\Vehicle;
use Illuminate\Database\Eloquent\Factories\Factory;

class BookingFactory extends Factory
{
    public function definition(): array
    {
        $vehicle = Vehicle::inRandomOrder()->first() ?? Vehicle::factory()->create();

        return [
            'vehicle_id' => $vehicle->id,
            'customer_id' => $vehicle->customer_id,
            'booking_date' => $this->faker->dateTimeBetween('-1 month', '+1 week')->format('Y-m-d'),
            'booking_time' => $this->faker->time('H:i'),
            'complaint' => $this->faker->randomElement([
                'Car makes a clicking noise when turning',
                'Brakes feel spongy',
                'Engine warning light is on',
                'AC not cooling properly',
                'Strange noise from engine',
            ]),
            'status' => $this->faker->randomElement(['Pending', 'In Progress', 'Completed', 'Cancelled']),
        ];
    }
}