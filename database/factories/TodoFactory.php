<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Ramsey\Uuid\Uuid;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Model>
 */
class TodoFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        // number of user if user using auto increment id sequentially from 1 to n and there is never any user deletion
        $numOfUser = 5;
        return [
            'uuid' => Uuid::uuid4(),
            'name' => fake()->sentence(3),
            'isDone' => fake()->boolean(),
            'user_id' => fake()->numberBetween(1, $numOfUser),
        ];
    }
}