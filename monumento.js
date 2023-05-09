


function loadedPage() {
    const idxMonumento = ObtenerNumeroMonumento();
    cargaMonumento(idxMonumento);
}

function ObtenerNumeroMonumento() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('monumento');
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

        };

    }

    xhr.send();
}