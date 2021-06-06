<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Travelpost;
use App\Http\Controllers\Controller;

class TravelpostController extends Controller
{

    // fetch all data
    public function index(){
        return Travelpost::all();
    }
    //

    public function upload(Request $request){
        return Travelpost::create($request -> all());
    }

    // public function sort(){
    //     $query = Travellist::query();
    //     $query -> where("region","Europe");
    //     $sortedList = $query->get();
    //     return $sortedList;
    // }

    // public function detail(Request $request, $id){
    //     $detail = Travellist::findorFail($id);
    //     return $detail;
    // }
}
