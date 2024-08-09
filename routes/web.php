<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\SubtodoController;
use App\Http\Controllers\TodoController;
use Illuminate\Support\Facades\Route;

Route::middleware('auth')->group(function () {
    Route::get('/', [TodoController::class, 'index']);
    Route::get('/todo', [TodoController::class, 'show'])->name('todo.show');
    Route::post('/todo', [TodoController::class, 'store']);
    Route::delete('/todo', [TodoController::class, 'destroy'])->name('todo.destroy');
    Route::patch('/todo', [TodoController::class, 'update'])->name('todo.update');
    Route::patch('/todo/done', [TodoController::class, 'updateDone'])->name('todo.updateDone');

    Route::post('/subtodo', [SubtodoController::class, 'store']);
    Route::delete('/subtodo', [SubtodoController::class, 'destroy'])->name('subtodo.destroy');
    Route::patch('/subtodo', [SubtodoController::class, 'update'])->name('subtodo.update');
    Route::patch('/subtodo/done', [SubtodoController::class, 'updateDone'])->name('subtodo.updateDone');

    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';