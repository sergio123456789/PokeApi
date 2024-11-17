Estimada profesora,

Realicé este proyecto en Laravel debido a que en mi trabajo me asignaron un desarrollo en este framework y quería aprovechar la oportunidad para practicar. En este proyecto, intenté minimizar la cantidad de llamadas a la API de Pokémon.

Primero, hice una llamada inicial para obtener el número total de Pokémon y utilicé ese dato para crear una paginación. Posteriormente,use el numero de total de los Pokémones como un id y solicité los detalles de los Pokémon en tandas de 20, construyendo las tarjetas dinámicamente con JavaScript y añadiéndolas a la vista con AJAX.

Para el buscador, opté por no realizar nuevas consultas a la API. En lugar de eso, filtré los datos directamente en el contenido de las tarjetas ya cargadas, ocultando los elementos que no coincidían con el término de búsqueda. De esta manera, evité cargar nuevamente la información de los Pokémon, ya que se mantenían en la misma vista.

Utilicé una técnica similar al mostrar los detalles de un Pokémon: implementé un script para hacer una solicitud AJAX y obtener los detalles, además de otro script para ocultar el contenedor de las tarjetas y mostrar la vista de detalle.

PD: Intenté crear las tarjetas utilizando los elementos Blade que Laravel proporciona, pero no pude hacerlo sin tener que llamar a un método adicional en mi controlador, lo cual añadiría una llamada extra y consideré que sería ineficiente. Además, como ya estaba familiarizado con el funcionamiento de trabajar con el código en el controlador y enviarlo a la vista, me resultaba muy sencillo de esta manera. Por esta razón, opté por no hacerlo de esa forma y mantener todo el proceso en JavaScript y jQuery, ya que nunca los había usado antes.

PDD: Con respecto al diseño, como nunca había usado CSS, decidí hacer todo el diseño a mano para aprender más sobre los diferentes elementos. El diseño de la tarjeta está inspirado en las cartas de Pokémon. Mi idea era que parecieran cartas apiladas hacia la derecha, incluso quería que cada carta que se agregara a la derecha quedara un poco encima de la anterior, como cuando uno dispersa cartas sobre una mesa. Sin embargo, como verá en el proyecto, no logré implementarlo, pero incluí una pequeña animación que oscurece el área alrededor de la carta, como si estuviera levantándose ligeramente, acompañada de un pequeño movimiento hacia arriba para hacerla destacar.

Para la vista de detalles, simplemente intenté crear una versión más grande de la misma tarjeta.


las ruta de los elementos son:
js: PokeAPI\public\js\app.js
css: PokeAPI\public\css\app.css
texturas : G:\codigos\pokeapi\PokeAPI\public\css\texturas
views :PokeAPI\resources\views\index.blade.php