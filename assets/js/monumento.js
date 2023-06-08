
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
                <img class="imagenTiempo" src="https://openweathermap.org/img/wn/${icono}.png" alt="${descripcion}">
                <p class="gradosTemperatura"> ${temperatura}°C</p>
                <p class="ptiempo">Sensación térmica: ${sensacionTermica}°C</p>
                <p class="ptiempo">Humedad: ${humedad}%</p>
                <p class="ptiempo">Velocidad del viento: ${velocidadViento} km/h</p>
                `;
        })
        .catch(error => {
            console.error('Ocurrió un error al obtener la temperatura:', error);
        });
}


function cargaCafeterias(monumentoLatitud, monumentoLongitud, mymap) {
    var xhr2 = new XMLHttpRequest();
    xhr2.open("GET", "./assets/json/cafeterias.json", true);
    xhr2.onreadystatechange = function () {
        if (xhr2.readyState === 4 && xhr2.status === 200) {
        
            var datos = JSON.parse(xhr2.responseText);


            const cafesFiltrados = datos.itemListElement.filter(cafe => {

                const distancia = calcularDistancia(monumentoLatitud, monumentoLongitud, cafe.geo.latitude, cafe.geo.longitude);
                return distancia <= 1; // Considerar las cafeterías dentro del radio de 15 km
            });

            const brownIcon = L.icon({
                iconUrl: 'assets/img/marcadorCafe.png', // Ruta a la imagen del ícono marrón
                iconSize: [32, 32], // Tamaño del ícono
                iconAnchor: [16, 32] // Anclaje del ícono
            });

            // Crear los marcadores de las cafeterías filtradas
            cafesFiltrados.forEach((cafe, idx) => {
                const marker = L.marker([cafe.geo.latitude, cafe.geo.longitude], { icon: brownIcon }).addTo(mymap);


                // Crear el popup con la información del café
                const popupContent = `
                  <div>
                    <h2>${cafe.name}</h2>
                    <p>Dirección: ${cafe.address.streetAddress}</p>
                    <p><a href="${cafe.url}" target="_blank">Más información</a></p>
                  </div>
                `;
                marker.bindPopup(popupContent);
            });
        }
    };
    xhr2.send();
}

function cargaHoteles(monumentoLatitud, monumentoLongitud, mymap) {
    var xhr2 = new XMLHttpRequest();
    xhr2.open("GET", "./assets/json/hotel.json", true);
    xhr2.onreadystatechange = function () {
        if (xhr2.readyState === 4 && xhr2.status === 200) {
       
            var datos = JSON.parse(xhr2.responseText);


            const hotelesFiltrados = datos.itemListElement.filter(hotel => {

                const distancia = calcularDistancia(monumentoLatitud, monumentoLongitud, hotel.geo.latitude, hotel.geo.longitude);
                return distancia <= 10; // Considerar las cafeterías dentro del radio de 15 km
            });

            const hotelIcon = L.icon({
                iconUrl: 'assets/img/marcadorHotel.png', // Ruta a la imagen del ícono marrón
                iconSize: [32, 40], // Tamaño del ícono
                iconAnchor: [16, 32] // Anclaje del ícono
            });

            // Crear los marcadores de las cafeterías filtradas
            hotelesFiltrados.forEach((hotel, idx) => {
                const marker = L.marker([hotel.geo.latitude, hotel.geo.longitude], { icon: hotelIcon }).addTo(mymap);

                // Crear el popup con la información del café
                const popupContent = `
                  <div>
                    <h2>${hotel.name}</h2>
                    <p>Dirección: ${hotel.address.streetAddress}</p>
                  </div>
                `;
                marker.bindPopup(popupContent);
            });
        }
    };
    xhr2.send();
}

function cargaSupermercados(monumentoLatitud, monumentoLongitud, mymap) {
    var xhr2 = new XMLHttpRequest();
    xhr2.open("GET", "./assets/json/supermercat.json", true);
    xhr2.onreadystatechange = function () {
        if (xhr2.readyState === 4 && xhr2.status === 200) {
          
            var datos = JSON.parse(xhr2.responseText);


            const supermercadosFiltrados = datos.itemListElement.filter(supermercado => {

                const distancia = calcularDistancia(monumentoLatitud, monumentoLongitud, supermercado.geo.latitude, supermercado.geo.longitude);
                return distancia <= 10; // Considerar las cafeterías dentro del radio de 15 km
            });

            const brownIcon = L.icon({
                iconUrl: 'assets/img/marcadorSupermercado.png', // Ruta a la imagen del ícono marrón
                iconSize: [32, 32], // Tamaño del ícono
                iconAnchor: [16, 32] // Anclaje del ícono
            });

        
            // Crear los marcadores de las cafeterías filtradas
            supermercadosFiltrados.forEach((supermercado, idx) => {
                const marker = L.marker([supermercado.geo.latitude, supermercado.geo.longitude], { icon: brownIcon }).addTo(mymap);
            

                // Crear el popup con la información del café
                const popupContent = `
                  <div>
                    <h2>${supermercado.name}</h2>
                    <p>Dirección: ${supermercado.address.streetAddress}</p>
                  </div>
                `;
                marker.bindPopup(popupContent);
           
            });
        }
    };
    xhr2.send();
}


// Función para calcular la distancia entre dos puntos en la Tierra (fórmula de Haversine)
function calcularDistancia(lat1, lon1, lat2, lon2) {
    const R = 6371; // Radio de la Tierra en kilómetros
    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);
    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distancia = R * c;
    return distancia;

}


// Función para convertir grados a radianes
function toRad(grados) {
    return grados * Math.PI / 180;
}

function cargaMonumento(idxMonumento) {

    var xhr = new XMLHttpRequest();
    xhr.open("GET", "./assets/json/Monumentos.json", true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {

            var datos = JSON.parse(xhr.responseText);

            const monumento = datos.itemListElement[idxMonumento];

            //JSON-LD
            initJSONLD(monumento);

           

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
                li.setAttribute("data-bs-target", "#monumentoCarousel");
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

            //Cargamos las cafeterias a traves de su función
            cargaCafeterias(monumento.geo.latitude, monumento.geo.longitude, mymap);

            //Cargamos los Hoteles a través de su función.
            cargaHoteles(monumento.geo.latitude, monumento.geo.longitude, mymap);

            //Cargamos los Supermercados a través de su función.
            cargaSupermercados(monumento.geo.latitude, monumento.geo.longitude, mymap);



            // Video

            const contenedorVideo = document.getElementById('contenedorVideo');

            var iframe = document.createElement("iframe");
            iframe.className = "videoMonumento";
            var url = monumento.subjectOf.video[0].contentUrl;
       
            var nuevaUrl = url.replace("/watch?v=", "/embed/");
            iframe.src = nuevaUrl;
            iframe.title = "YouTube video player";
            iframe.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share";
            iframe.allowFullscreen = true;

            // Asegúrate de que haya un elemento en el DOM donde quieras insertar el iframe

            contenedorVideo.appendChild(iframe);

            // horario


            const contenedorHorario = document.getElementById('contenedorHorario');
            // Crear la tabla con la clase "table table-striped text-center"


            // Definir los datos de la tabla
            var data = obtenerDatosTabla(monumento.openingHours);
            var tbody = document.createElement("tbody");
            for (var i = 0; i < data.length; i++) {
                var row = document.createElement("tr");

                for (var j = 0; j < data[i].length; j++) {
                    var cell = document.createElement("td");
                    var cellData = document.createTextNode(data[i][j]);
                    cell.appendChild(cellData);
                    row.appendChild(cell);
                }

                if (diaActual() == i) {
                    if (estaAbierto(monumento.openingHours)) {
                        row.className = "bg-success";
                    } else {
                        row.className = "bg-danger";
                    }

                }

                tbody.appendChild(row);
            }

            contenedorHorario.appendChild(tbody);

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
                    a.href = evento.url;
                    a.textContent = "Más información sobre " + evento.name;

                    divBox.appendChild(h3);
                    divBox.appendChild(p);
                    divBox.appendChild(h4);
                    divBox.appendChild(a);

                    divCol.appendChild(divBox);

                    contenedorActividades.appendChild(divCol);

                });

            }

            // ---- Apartado información extra

            const contenedorInformacion = document.getElementById('contenedorInformacion');
            // teléfono
            if (monumento.telephone) {

                // Crear el elemento div principal con la clase "col-md-4 mt-4 mt-md-0"
                const divElement = document.createElement('div');
                divElement.className = 'col-md-4 mt-4 mt-md-0';

                // Crear el elemento div con la clase "icon-box" dentro del div principal
                const iconBoxElement = document.createElement('div');
                iconBoxElement.className = 'icon-box';

                // Crear el elemento <i> con la clase "bi bi-telephone" dentro del div icon-box
                const iElement = document.createElement('i');
                iElement.className = 'bi bi-telephone';
                iconBoxElement.appendChild(iElement);

                // Crear el elemento <h4> con un enlace dentro del div icon-box
                const h4Element = document.createElement('h4');
                const aElement = document.createElement('a');
                aElement.href = '#';
                aElement.textContent = 'Teléfono';
                h4Element.appendChild(aElement);
                iconBoxElement.appendChild(h4Element);

                // Crear el elemento <p> con el texto de contacto dentro del div icon-box
                const pElement = document.createElement('p');
                pElement.innerHTML = 'Teléfono de contacto: <br>' + monumento.telephone;
                iconBoxElement.appendChild(pElement);

                // Agregar el div icon-box al div principal
                divElement.appendChild(iconBoxElement);

                contenedorInformacion.appendChild(divElement);

            }

            // Página oficial
            if (monumento.mainEntityOfPage) {

                // Crear el elemento div principal con la clase "col-md-4 mt-4 mt-md-0"
                const divElement = document.createElement('div');
                divElement.className = 'col-md-4 mt-4 mt-md-0';

                // Crear el elemento div con la clase "icon-box" dentro del div principal
                const iconBoxElement = document.createElement('div');
                iconBoxElement.className = 'icon-box';

                // Crear el elemento <i> con la clase "bi bi-telephone" dentro del div icon-box
                const iElement = document.createElement('i');
                iElement.className = 'bi bi-bank';
                iconBoxElement.appendChild(iElement);

                // Crear el elemento <h4> con un enlace dentro del div icon-box
                const h4Element = document.createElement('h4');
                const aElement = document.createElement('a');
                aElement.href = monumento.mainEntityOfPage;
                aElement.textContent = 'Página web oficial';
                h4Element.appendChild(aElement);
                iconBoxElement.appendChild(h4Element);

                // Crear el elemento <p> con el texto de contacto dentro del div icon-box
                const pElement = document.createElement('p');
                pElement.textContent = 'Visita la página web oficial del monumento.';
                iconBoxElement.appendChild(pElement);

                // Agregar el div icon-box al div principal
                divElement.appendChild(iconBoxElement);

                contenedorInformacion.appendChild(divElement);


            }

            // Más información
            if (monumento.sameAs) {

                // Crear el elemento div principal con la clase "col-md-4 mt-4 mt-md-0"
                const divElement = document.createElement('div');
                divElement.className = 'col-md-4 mt-4 mt-md-0';

                // Crear el elemento div con la clase "icon-box" dentro del div principal
                const iconBoxElement = document.createElement('div');
                iconBoxElement.className = 'icon-box';

                // Crear el elemento <i> con la clase "bi bi-telephone" dentro del div icon-box
                const iElement = document.createElement('i');
                iElement.className = 'bi bi-info-circle';
                iconBoxElement.appendChild(iElement);

                // Crear el elemento <h4> con un enlace dentro del div icon-box
                const h4Element = document.createElement('h4');
                const aElement = document.createElement('a');
                aElement.href = monumento.sameAs;
                aElement.textContent = 'Información adicional';
                h4Element.appendChild(aElement);
                iconBoxElement.appendChild(h4Element);

                // Crear el elemento <p> con el texto de contacto dentro del div icon-box
                const pElement = document.createElement('p');
                pElement.textContent = 'Visita más información sobre este monumento.';
                iconBoxElement.appendChild(pElement);

                // Agregar el div icon-box al div principal
                divElement.appendChild(iconBoxElement);

                contenedorInformacion.appendChild(divElement);


            }


            prepararFormulario(monumento,idxMonumento);
            // Comentarios
            cargarComentarios(monumento);

        };

    }

    xhr.send();
}


function prepararFormulario(monumento,idxMonumento){

    console.log("heeeey")

    const indiceMonumento = document.getElementById("indiceMonumento");
    indiceMonumento.value = idxMonumento; 

    const nombreMonumento = document.getElementById("comentarioNombre");
    nombreMonumento.value = monumento.name; 

    var today = new Date();

    var year = today.getFullYear();
    var month = (today.getMonth() + 1).toString().padStart(2, '0');
    var day = today.getDate().toString().padStart(2, '0');

var formattedDate = year + '-' + month + '-' + day;

    const fechaMonumento = document.getElementById("comentarioFecha");
    fechaMonumento.value = formattedDate; // Cambia el número a 5


}

function cargarComentarios(monumento) {

    console.log("hola")

    const contenedorComentarios = document.getElementById('contenedorComentarios');
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "./assets/json/valoraciones.json", true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {

            console.log("hey")
            console.log(xhr.responseText);
            var datos = JSON.parse(xhr.responseText);

          

            var numComentarios=0;

            datos.itemListElement.forEach(function (comentario, idx) {

                if (comentario.itemReviewed.name === monumento.name) {

                    numComentarios++;

                    var commentDiv = document.createElement('div');
                    commentDiv.className = 'comment';

                    var dFlexDiv = document.createElement('div');
                    dFlexDiv.className = 'd-flex';

                    var miComentarioDiv = document.createElement('div');
                    miComentarioDiv.className = 'miComentario';

                    var containerDiv = document.createElement('div');
                    containerDiv.className = 'container';

                    var rowDiv = document.createElement('div');
                    rowDiv.className = 'row';

                    var colLg9Div = document.createElement('div');
                    colLg9Div.className = 'col-lg-9';

                    var comentarioNombreH5 = document.createElement('h5');
                    comentarioNombreH5.className = 'comentario-nombre';
                    comentarioNombreH5.textContent = comentario.author;

                    colLg9Div.appendChild(comentarioNombreH5);
                    rowDiv.appendChild(colLg9Div);

                    var colLg3Div = document.createElement('div');
                    colLg3Div.className = 'col-lg-3';

                    var estrellasComentarioDiv = document.createElement('div');
                    estrellasComentarioDiv.className = 'estrellasComentario';
                    estrellasComentarioDiv.id = 'va';



                    var numero = parseFloat(comentario.reviewRating.ratingValue);
                    var entero = Math.floor(numero); // obtiene la parte entera (4)
                    var decimal = parseInt((numero - entero) * 10); // obtiene la parte decimal (7)
          
    
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
                        estrellasComentarioDiv.appendChild(starSpan);
    
                    }

                    colLg3Div.appendChild(estrellasComentarioDiv);
                    rowDiv.appendChild(colLg3Div);

                    containerDiv.appendChild(rowDiv);

                    var dateTime = document.createElement('time');
                    dateTime.setAttribute('datetime', comentario.datePublished);
                    dateTime.textContent = comentario.datePublished;

                    var paragraph = document.createElement('p');
                    paragraph.textContent = comentario.reviewBody;

                    containerDiv.appendChild(dateTime);
                    containerDiv.appendChild(paragraph);

                    miComentarioDiv.appendChild(containerDiv);

                    dFlexDiv.appendChild(miComentarioDiv);

                    commentDiv.appendChild(dFlexDiv);

               
                    contenedorComentarios.appendChild(commentDiv);


                }




            });

            const contadorComentarios = document.getElementById('contadorComentarios');

            if(numComentarios>0){

                if(numComentarios===1){
                    contadorComentarios.textContent= numComentarios+" Comentario";

                }else{
                    contadorComentarios.textContent= numComentarios+" Comentarios";

                }

            }else{

                contadorComentarios.textContent= " No hay comentarios";

            }
           
        }
    }

    xhr.send();
}

function obtenerDatosTabla(openingHoursMonumento) {


    var data = [
        ["Lunes", "Cerrado"],
        ["Martes", "Cerrado"],
        ["Miércoles", "Cerrado"],
        ["Jueves", "Cerrado"],
        ["Viernes", "Cerrado"],
        ["Sábado", "Cerrado"],
        ["Domingo", "Cerrado"]
    ];


    for (let i = 0; i < openingHoursMonumento.length; i++) {

 
        const cadenadias = openingHoursMonumento[i].split(" "); // separar la cadena en dos partes utilizando el espacio como separador

        const dias = cadenadias[0]; // primera parte de la cadena
        const horas = cadenadias[1]; // segunda parte de la cadena



        if (dias.includes('-')) {

            const diasSemanaRango = dias.split("-");
            const indiceDia1 = obtenerNumeroDiaSemana(diasSemanaRango[0]);
            const indiceDia2 = obtenerNumeroDiaSemana(diasSemanaRango[1]);



            if (indiceDia1 != -1 && indiceDia2 != -1) {

                var diaSemana = indiceDia1;
                var indicefinal = (indiceDia2 + 1) % 7;

                do {

                    if (data[diaSemana][1] === "Cerrado") {

                        data[diaSemana][1] = horas;

                    } else {

                        data[diaSemana][1] = data[diaSemana][1] + "  |  " + horas;

                    }

                    diaSemana = (diaSemana + 1) % 7;

                } while (diaSemana != indicefinal);

            }


        } else if (dias.includes(',')) {

            const diasSemanaIndice = dias.split(",");

            for (let j = 0; j < diasSemanaIndice.length; j++) {

                const diaSemana = obtenerNumeroDiaSemana(diasSemanaRango[j]);
                if (data[diaSemana][1] === "Cerrado") {

                    data[diaSemana][1] = horas;

                } else {

                    data[diaSemana][1] = data[diaSemana][1] + "  |  " + horas;

                }
            }

        } else {



            var diaSemana = obtenerNumeroDiaSemana(dias);
            if (data[diaSemana][1] === "Cerrado") {

                data[diaSemana][1] = horas;

            } else {

                data[diaSemana][1] = data[diaSemana][1] + "  |  " + horas;

            }


        }


    }





    return data;
}

function diaActual() {


    const dateActual = new Date();
    const diaActual = dateActual.getDay();


    if (diaActual != 0) {

        return diaActual - 1;
    } else {
        return 6;

    }


}

function obtenerNumeroDiaSemana(diaSemana) {
    var dias = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"];
    var indice = dias.indexOf(diaSemana);

    return indice;
}


function getMousePosition(event) {

    var rangoMinimo = 0; // El número mínimo en el nuevo rango
    var rangoMaximo = 10; // El número máximo en el nuevo rango

    var boundingRect = event.currentTarget.getBoundingClientRect();
    var mouseX = event.clientX - boundingRect.left;


    var numeroConvertido = (mouseX / 128) * (rangoMaximo - rangoMinimo) + rangoMinimo;

    if (numeroConvertido >= 0) {


        var numeroEstrellas = numeroConvertido / 2;
        numeroEstrellas = redondearNumero(numeroEstrellas);
        var enteroEstrellas = Math.floor(numeroEstrellas); // Obtener la parte entera del número
        var decimalEstrellas = numeroEstrellas - enteroEstrellas; // Obtener la parte decimal del número

     
        var estrellas = document.getElementsByClassName("mistar");

        // Eliminar todas las clases "selected"
        for (var i = 0; i < estrellas.length; i++) {
            estrellas[i].classList.remove("checked");
            estrellas[i].classList.remove("halfchecked");
        }

        var indice = 0;

        for (var i = 0; i < enteroEstrellas; i++) {

            estrellas[i].classList.add("checked");
            indice = i;
        }

        if (decimalEstrellas >= 0.5 && enteroEstrellas < 5) {

            estrellas[i].classList.add("halfchecked");
        }



        var numeroValoracion = document.getElementById("numeroValoracion");
        var numero = Math.abs(redondearNumero(numeroEstrellas));
        numeroValoracion.textContent = numero.toFixed(1);

        var valorValoracion = document.getElementById("valorValoracion");
        valorValoracion.value = numero.toFixed(1); // Cambia el número a 5
    }
}

function redondearNumero(numero) {
    // Multiplica el número por 2 para que el redondeo sea a múltiplos de 0.5
    var multiplicadoPorDos = numero * 2;

    // Redondea al número entero más cercano
    var redondeado = Math.round(multiplicadoPorDos);

    // Divide el número redondeado entre 2 para obtener el resultado final
    var resultado = redondeado / 2;

    return resultado;
}

//JSON-LD
function initJSONLD(monumento) {
   
    const schema = Object.assign({ '@context': 'http://www.schema.org' }, monumento);
    document.querySelector("script[type='application/ld+json']").innerHTML = JSON.stringify(schema, null, 2);

}
