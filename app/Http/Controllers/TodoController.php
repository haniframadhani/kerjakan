<?php

namespace App\Http\Controllers;

use App\Http\Resources\TodoCollection;
use App\Models\Todo;
use App\Models\Subtodo;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TodoController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $user = auth()->user();
        $todos = new TodoCollection(Todo::where('user_id', $user->id)->orderBy("isdone","asc")->get());
        return Inertia::render('Homepage', [
            "title" => "to do list",
            "todo" => $todos
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        // dd($request);
        $user = auth()->user();
        $todo = new Todo();
        $todo->name = $request->name;
        $todo->isDone = false;
        $todo->user_id = $user->id;
        $todo->save();
        return redirect()->back()->with('message','berhasil menambahkan kegiatan');
    }

    /**
     * Display the specified resource.
     */
    public function show(todo $todo, subtodo $subtodo, Request $request)
    {
        return Inertia::render('DetailTodo', ['todo' => $todo->find($request->uuid), 'subtodo' => $subtodo->where('todo_uuid', $request->uuid)->orderBy("isdone","asc")->get()]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(todo $todo)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request)
    {
        Todo::where('uuid', $request->uuid)->update([
            'name' => $request->name
        ]);
        return redirect()->back()->with('message','berhasil mengubah kegiatan');
    }

    public function updateDone(Request $request)
    {
        Todo::where('uuid', $request->uuid)->update([
            'isDone' => $request->isDone
        ]);
        return redirect()->back()->with('message','berhasil status mengubah kegiatan');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Request $request)
    {
        $todo = Todo::find($request->uuid);
        if($todo == null) {
            return redirect()->back()->with('message','tidak ada id atau uuid');
        }
        try {
            $todo->delete();
        } catch(\Exception $e) {
            return redirect()->back()->with('message', "$e");
        }
        return redirect()->back()->with('message','berhasil menghapus kegiatan');
    }
}