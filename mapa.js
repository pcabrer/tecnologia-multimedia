

function mapaLeaflet() {
    // div que contiene la lista de monumentos

    var mymap = L.map('map').setView([39.6, 3.0176], 9.5);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors',
        maxZoom: 18,
    }).addTo(mymap);

    const monumentList = document.getElementById('contenedor-monumentos');
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "Monumentos.json", true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            //console.log(xhr.responseText);
            var datos = JSON.parse(xhr.responseText);

            /*
            var markersLayer = L.layerGroup();

            // Iterar sobre los monumentos y agregar un marcador para cada uno
            datos.itemListElement.forEach(function (monumento) {
                var marker = L.marker([monumento.geo.latitude, monumento.geo.longitude]);

                // Crear el contenido del popup con el nombre del monumento y el enlace al HTML correspondiente
                var popupContent = '<div>' +
                    '<h3>' + monumento.name + '</h3>' +
                    '<a href="monumento.html?id=' + monumento.id + '">Ver detalles</a>' +
                    '</div>';

                // Establecer el contenido del popup y un controlador de eventos para abrir el HTML correspondiente al hacer clic en el popup
                marker.bindPopup(popupContent).on('click', function () {
                    window.location.href = 'detalle.html?id=' + monumento.id;
                });

                // Agregar el marcador a la capa de marcadores
                markersLayer.addLayer(marker);
            });

            // Agregar la capa de marcadores al mapa
            markersLayer.addTo(map);
            */
            
            datos.itemListElement.forEach(function (monumento, layer) {

                
                var marker = L.marker([monumento.geo.latitude, monumento.geo.longitude]).addTo(mymap);
                marker.bindPopup(monumento.name);
              
            });
            



        }

    };

    xhr.send();
}






