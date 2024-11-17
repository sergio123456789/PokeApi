<?php

namespace App\View\Components;

use Closure;
use Illuminate\Contracts\View\View;
use Illuminate\View\Component;

class Pokard extends Component
{
    public $id;
    public $nombre;
    public $imagen;
    public $tipos;
    public $url;

    public function __construct($id,$nombre, $imagen,$tipos, $url)
    {
        $this->id = $id;
        $this->nombre = $nombre;
        $this->imagen = $imagen;
        $this->tipos = $tipos;
        $this->url = $url;
    }

    public function render(): View|Closure|string
    {
        return view('components.Pokard');
    }
}
