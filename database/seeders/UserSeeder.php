<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use App\Models\Mechanic;

class UserSeeder extends Seeder
{
    public function run(): void
    {
        $admin = User::firstOrCreate(
            ['email' => 'admin@vehicleservice.com'],
            [
                'name' => 'Kasun Perera',
                'password' => bcrypt('admin123'),
            ]
        );
        $admin->assignRole('Admin');

        $advisor = User::firstOrCreate(
            ['email' => 'advisor@vehicleservice.com'],
            [
                'name' => 'Nadeesha Fernando',
                'password' => bcrypt('advisor123'),
            ]
        );
        $advisor->assignRole('Service Advisor');

        $mechanicRecord = Mechanic::first();

        $mechanic = User::firstOrCreate(
            ['email' => 'mechanic@vehicleservice.com'],
            [
                'name' => 'Chamara Silva',
                'password' => bcrypt('mechanic123'),
                'mechanic_id' => $mechanicRecord?->id,
            ]
        );
        $mechanic->assignRole('Mechanic');
    }
}