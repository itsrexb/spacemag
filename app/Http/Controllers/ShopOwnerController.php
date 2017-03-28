<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use JavaScript;

class ShopOwnerController extends Controller
{
    public function includeUserOnJS()
    {
        $shop = session()->has("selected_shop") ? 
                session()->get("selected_shop") : 
                auth()->user()->shops()->first();
                
        JavaScript::put([
            'user' => auth()->user(),
            'selectedShop' => $shop
        ]);
    }

    public function index(){
        $this->includeUserOnJS();
    	return view('shop_owner.dashboard');
    }

    public function clients(){
        $this->includeUserOnJS();
    	return view('shop_owner.clients');
    }

    public function articles(){
        $this->includeUserOnJS();
    	return view('shop_owner.articles');
    }

    public function customers(){
        $this->includeUserOnJS();
    	return view('shop_owner.customers');
    }

    public function todo(){
        $this->includeUserOnJS();
        return view('shop_owner.todo');
    }

    public function workers(){
        $this->includeUserOnJS();
        return view('shop_owner.workers');
    }

    public function workersTodo(){
        $this->includeUserOnJS();
        return view('shop_owner.workers_todo');
    }
}
