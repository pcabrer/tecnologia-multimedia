


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
            temperaturaElemento.innerHTML =  `
                <img src="https://openweathermap.org/img/wn/${icono}.png" alt="${descripcion}">
                <p>Temperatura: ${temperatura}°C</p>
                <p>Sensación térmica: ${sensacionTermica}°C</p>
                <p>Humedad: ${humedad}%</p>
                <p>Velocidad del viento: ${velocidadViento} km/h</p>
                `;
            /*
            const temperatura = data.main.temp;
            const icono = data.weather[0].icon;
            const descripcion = data.weather[0].description;

            const temperaturaElemento = document.getElementById('temperatura');
            temperaturaElemento.innerHTML = `
                <img src="https://openweathermap.org/img/wn/${icono}.png" alt="${descripcion}">
                ${temperatura}°C
                `;
            */
        })
        .catch(error => {
            console.error('Ocurrió un error al obtener la temperatura:', error);
        });
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

            const textoMonumento = document.getElementById('textoMonumento');
            textoMonumento.innerText = monumento.description;

            const contenedorImagenes = document.getElementById('textoMonumento');


            monumento.image.forEach(function (imagen) {


                // Crea el elemento <div>
                const div = document.createElement('div');

                // Agrega las clases "carousel-item" y "active" al elemento <div>
                div.classList.add('carousel-item', 'active');

                // Agrega el atributo "style" con el valor "background-image: url(assets/img/slide/slide1.jpg)" al elemento <div>
                div.setAttribute('style', `background-image: url(${imagen})`);

                // Agrega el elemento <div> al DOM
                document.body.appendChild(div);


            });

            //Para el Tiempo
            obtenerTemperatura(monumento.geo.latitude, monumento.geo.longitude);


        };

    }

    xhr.send();
}