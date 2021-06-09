<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Post;

class PostController extends Controller
{
    //
    public function index(){
        return Post::all();
    }

    public function upload(Request $request){
        return Post::create($request -> all());
    }

    // public function update(Request $request, $id){
    //     $task=Task::findOrFail($id);
    //     $task->update($request->all());
    //     return $task;
    // }

    public function delete($id){
        $task = Post::findOrFail($id);
        $task->delete();
        return 204;
    }

}
