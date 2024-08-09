<?php

namespace Database\Seeders;

use App\Models\Subtodo;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class SubtodoSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Subtodo::factory()->count(200)->create();
    }
}