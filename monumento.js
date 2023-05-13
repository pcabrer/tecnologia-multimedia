


function loadedPage() {
    const idxMonumento = ObtenerNumeroMonumento();
    cargaMonumento(idxMonumento);
}

function ObtenerNumeroMonumento() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('monumento');
}

function obtenerTemperatura(latitud, longitud) {
    var apiKey = '91f45d91a911c4e90b86b1d46fdee1cc';
    var url = 'https://api.openweathermap.org/data/2.5/weather?lat=' + latitud + '&lon=' + longitud + '&units=metric&appid=' + apiKey;

    fetch(url)
        .then(response => response.json())
        .then(data => {



            const temperatura = data.main.temp;
            const sensacionTermica = data.main.feels_like;
            const humedad = data.main.humidity;
            const velocidadViento = data.wind.speed;
            const descripcion = data.weather[0].description;
            const icono = data.weather[0].icon;

            const temperaturaElemento = document.getElementById('temperatura');
            temperaturaElemento.innerHTML = `
                <img src="https://openweathermap.org/img/wn/${icono}.png" alt="${descripcion}">
                <p>Temperatura: ${temperatura}°C</p>
                <p>Sensación térmica: ${sensacionTermica}°C</p>
                <p>Humedad: ${humedad}%</p>
                <p>Velocidad del viento: ${velocidadViento} km/h</p>
                `;
        })
        .catch(error => {
            console.error('Ocurrió un error al obtener la temperatura:', error);
        });
}

function mapaLeaflet() {
    // div que contiene la lista de monumentos


}




function cargaMonumento(idxMonumento) {
    // div que contiene la lista de monumentos

    var xhr = new XMLHttpRequest();
    xhr.open("GET", "Monumentos.json", true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            //console.log(xhr.responseText);
            var datos = JSON.parse(xhr.responseText);

            const monumento = datos.itemListElement[idxMonumento];
            console.log(monumento.name);

            const titulo = document.getElementById('tituloMonumento');
            titulo.innerText = monumento.name;

            const monumentoActual = document.getElementById('monumentoActual');
            monumentoActual.innerText = monumento.name;

            const titulo1 = document.getElementById('tituloMonumento1');
            titulo1.innerText = monumento.name;

            const puebloMonumento = document.getElementById('puebloMonumento');
            puebloMonumento.innerText = monumento.address.addressLocality;;




            const val = document.getElementById('valoracion');
            // creamos el elemento span con clase "rating" y contenido de texto "4,1"
            var ratingSpan = document.createElement("span");
            ratingSpan.classList.add("rating-monumento");
            ratingSpan.innerText = monumento.aggregateRating.ratingValue;

            var numero = parseFloat(monumento.aggregateRating.ratingValue);
            var entero = Math.floor(numero); // obtiene la parte entera (4)
            var decimal = parseInt((numero - entero) * 10); // obtiene la parte decimal (7)
            console.log(numero);
            val.appendChild(ratingSpan);

            // creamos cinco elementos span con clase "star", de los cuales los primeros cuatro tienen clase "checked" y contenido de texto "&#9733;"
            for (var i = 0; i < 5; i++) {
                var starSpan = document.createElement("span");
                starSpan.classList.add("star");
                if (i < entero) {
                    starSpan.classList.add("checked");

                } else if (decimal >= 5) {
                    starSpan.classList.add("halfchecked");
                    decimal = 0;

                }
                starSpan.innerHTML = "&#9733;";
                val.appendChild(starSpan);


            }

            var numValoraciones = document.createElement("span");
            numValoraciones.innerText = monumento.aggregateRating.reviewCount + " Valoraciones";
            numValoraciones.classList.add("valoracionesTexto");
            val.appendChild(numValoraciones);


            const textoMonumento = document.getElementById('textoMonumento');
            textoMonumento.innerText = monumento.description;


            // Obtener el elemento que contiene los slides del carrusel
            const carousel = document.getElementById('contenidoCarousel');
            const opciones = document.getElementById('mi-hero-carousel-indicators');


            monumento.image.forEach(function (imagen, idx) {



                var div = document.createElement("div");
                if (idx == 0) {

                    div.className = "carousel-item active";


                } else {

                    div.className = "carousel-item";

                }

                div.style.backgroundImage = "url(" + imagen.url + ")";


                carousel.appendChild(div);

                // Crear el elemento li
                var li = document.createElement("li");
                li.setAttribute("data-bs-target", "#heroCarousel");
                li.setAttribute("data-bs-slide-to", idx);
                if (idx == 0) {
                    li.className = "active";
                }



                // Agregar el elemento li al contenedor de los indicadores del carrusel
                opciones.appendChild(li);



            });

            //Para el Tiempo
            obtenerTemperatura(monumento.geo.latitude, monumento.geo.longitude);

            //Para el mapa

            var mymap = L.map('mapaMon').setView([monumento.geo.latitude, monumento.geo.longitude], 15);
            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors',
                maxZoom: 18,
            }).addTo(mymap);
            const marker = L.marker([monumento.geo.latitude, monumento.geo.longitude]).addTo(mymap);

            // Crear el popup con la información del monumento
            const popupContent = `
                <div>
                <h2>${monumento.name}</h2>
                <img src="${monumento.image[0].url}" style="width: 100%;" >
                </div>
            `;
            marker.bindPopup(popupContent);

            // Actividades

            const seccionActividades = document.getElementById('actividades');

            if (monumento.event) {

                // Crear el elemento <section>
                var section = document.createElement("section");
                section.id = "pricing";
                section.className = "pricing";

                // Crear el elemento <div> con la clase "container"
                var divContainer = document.createElement("div");
                divContainer.className = "container";

                // Crear el elemento <h2> con la clase "tituloSection"
                var h2 = document.createElement("h2");
                h2.className = "tituloSection";
                h2.textContent = "actividades";

                // Crear el elemento <div> con la clase "row g-5" y el id "contenedorActividades"
                var divRow = document.createElement("div");
                divRow.className = "row g-5";
                divRow.id = "contenedorActividades";

                // Agregar los elementos al árbol DOM
                divContainer.appendChild(h2);
                divContainer.appendChild(divRow);
                section.appendChild(divContainer);

                // Agregar el código HTML generado al documento
                seccionActividades.appendChild(section);


                const contenedorActividades = document.getElementById('contenedorActividades');


                console.log("La lista de eventos no está vacía.");
                monumento.event.forEach(function (evento, idx) {


                    var divCol = document.createElement("div");
                    divCol.className = "col-lg-4 col-md-6";

                    var divBox = document.createElement("div");
                    divBox.className = "box featured h-100";

                    var h3 = document.createElement("h3");
                    h3.textContent = evento.name;


                    var p = document.createElement("p");
                    p.textContent = evento.description;


                    var h4 = document.createElement("h4");
                    h4.textContent = evento.offers.price;
                    var sup = document.createElement("sup");
                    sup.innerHTML = "&#8364";
                    h4.appendChild(sup);
                    var span = document.createElement("span");
                    h4.appendChild(span);

                    var a = document.createElement("a");
                    a.href = "https://catedraldemallorca.org/visitas/horarios/";
                    a.textContent = "Más información";

                    divBox.appendChild(h3);
                    divBox.appendChild(p);
                    divBox.appendChild(h4);
                    divBox.appendChild(a);

                    divCol.appendChild(divBox);


                    contenedorActividades.appendChild(divCol);




                });

            } else {

                console.log("La lista de eventos está vacía.");
            }



        };

    }

    xhr.send();
}