<div class="TP{{$tipos[0] }} pokard m-3 shadow-lg border-0 protector">
<h5 class="pokeNombre card-title text-center mb-3 text-dark" >{{ $title }}</h5>
    <div class="{{$tipos[0] }} pokefotoContainer d-flex justify-content-center" loading="lazy">
        <img src="{{ $image }}" class="centered-image pokefoto" alt="{{ $title }}">
        <h4 class="Npoke overlay-text">{{ $id }}</h4>
    </div>
    <div class="card-body p-4">
        <ul class="card-text list-tipo">
            @foreach ($tipos as $item)
                <li class="TP{{$item}} tipopk badge bg-info text-white mb-1">{{$item}}</li>
            @endforeach
        </ul>
            <a href="{{ $url }}"></a>
    </div>
</div>
