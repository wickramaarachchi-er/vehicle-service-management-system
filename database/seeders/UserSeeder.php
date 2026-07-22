<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;

class UserSeeder extends Seeder
{
    public function run(): void
    {
        $admin = User::firstOrCreate(
            ['email' => 'admin@vehicleservice.com'],
            [
                'name' => 'Admin User',
                'password' => bcrypt('password123'),
            ]
        );
        $admin->assignRole('Admin');

        $advisor = User::firstOrCreate(
            ['email' => 'advisor@vehicleservice.com'],
            [
                'name' => 'Service Advisor User',
                'password' => bcrypt('password123'),
            ]
        );
        $advisor->assignRole('Service Advisor');

        $mechanic = User::firstOrCreate(
            ['email' => 'mechanic@vehicleservice.com'],
            [
                'name' => 'Mechanic User',
                'password' => bcrypt('password123'),
            ]
        );
        $mechanic->assignRole('Mechanic');
    }
}