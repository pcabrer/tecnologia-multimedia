

function mapaLeaflet() {
    // div que contiene la lista de monumentos

    var mymap = L.map('map').setView([39.6, 3.0176], 9.5);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors',
        maxZoom: 18,
    }).addTo(mymap);

    const monumentList = document.getElementById('contenedor-monumentos');
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "./assets/json/Monumentos.json", true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            //console.log(xhr.responseText);
            var datos = JSON.parse(xhr.responseText);

            datos.itemListElement.forEach(function (monumento, idx) {

                const marker = L.marker([monumento.geo.latitude, monumento.geo.longitude]).addTo(mymap);

                // Crear el popup con la información del monumento
                const popupContent = `
                    <div>
                    <h2>${monumento.name}</h2>
                    <img src="${monumento.image[0].url}" style="width: 100%;" >

                    <p><a href='monumento.html?monumento=${idx}' target="_blank">Más información</a></p>
                    </div>
                `;
                marker.bindPopup(popupContent);
            });




        }

    };

    xhr.send();
}






