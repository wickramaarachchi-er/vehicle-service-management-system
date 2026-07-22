<?php

namespace Database\Seeders;

use App\Models\Customer;
use App\Models\Vehicle;
use App\Models\Mechanic;
use App\Models\Part;
use App\Models\Booking;
use App\Models\JobCard;
use App\Models\Invoice;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        $this->call([
            RoleSeeder::class,
        ]);

        // Create mechanics and parts first (no dependencies)
        Mechanic::factory(6)->create();
        Part::factory(15)->create();

        // Now create users, linking Mechanic user to a real Mechanic record
        $this->call([
            UserSeeder::class,
        ]);

        // Create customers, each with 1-3 vehicles
        Customer::factory(10)->create()->each(function ($customer) {
            Vehicle::factory(rand(1, 3))->create([
                'customer_id' => $customer->id,
            ]);
        });

        // Create bookings (automatically picks random existing vehicles)
        Booking::factory(20)->create();

        // Create job cards linked to real bookings
        $bookings = Booking::all();
        foreach ($bookings as $booking) {
            $jobCard = JobCard::factory()->create([
                'booking_id' => $booking->id,
            ]);

            $parts = Part::inRandomOrder()->take(rand(1, 4))->get();
            foreach ($parts as $part) {
                $jobCard->parts()->attach($part->id, [
                    'quantity_used' => rand(1, 3),
                    'unit_price_at_time' => $part->unit_price,
                ]);
            }

            if ($jobCard->status === 'Completed') {
                $laborTotal = $jobCard->labor_cost;
                $partsTotal = $jobCard->parts->sum(function ($part) {
                    return $part->pivot->quantity_used * $part->pivot->unit_price_at_time;
                });

                Invoice::factory()->create([
                    'job_card_id' => $jobCard->id,
                    'labor_total' => $laborTotal,
                    'parts_total' => $partsTotal,
                    'grand_total' => $laborTotal + $partsTotal,
                ]);
            }
        }
    }
}