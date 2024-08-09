<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Subtodo;

class SubtodoController extends Controller
{

    public function store(Request $request)
    {
        $subtodo = new Subtodo();
        $subtodo->name = $request->name;
        $subtodo->isDone = false;
        $subtodo->todo_uuid = $request->todo_uuid;
        $subtodo->save();
        return redirect()->back()->with('message','berhasil menambahkan kegiatan');
    }
    
    public function destroy(Request $request) {
        // dd($request->id);
        $subtodo = Subtodo::find($request->id);
        if($subtodo == null) {
            return redirect()->back()->with('message','tidak ada id atau uuid');
        }
        try {
            $subtodo->delete();
        } catch(\Exception $e) {
            return redirect()->back()->with('message', "$e");
        }
        return redirect()->back()->with('message','berhasil menghapus kegiatan');
        
    }

    public function update(Request $request) {
        Subtodo::where('id', $request->id)->update([
            'name' => $request->name
        ]);
        return redirect()->back()->with('message','berhasil mengubah kegiatan');
    }
    
    public function updateDone(Request $request)
    {
        Subtodo::where('id', $request->id)->update([
            'isDone' => $request->isDone
        ]);
        return redirect()->back()->with('message','berhasil status mengubah kegiatan');
    }
}