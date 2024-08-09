<?php

namespace Database\Factories;

use App\Models\Todo;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Model>
 */
class SubtodoFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        // array of uuid todo
        $todos = [];
        return [
            'name' => fake()->sentence(3),
            'isDone' => fake()->boolean(),
            'todo_uuid' => $todos[array_rand($todos)]
        ];
    }
}