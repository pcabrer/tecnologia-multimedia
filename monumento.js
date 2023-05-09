


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

            console.log(datos.itemListElement[idxMonumento]);

            const titulo = document.getElementById('tituloMonumento');
            titulo.innerText = datos.itemListElement[idxMonumento].name;

            const monumentoActual = document.getElementById('monumentoActual');
            monumentoActual.innerText = datos.itemListElement[idxMonumento].name;



        };

    }

    xhr.send();
}