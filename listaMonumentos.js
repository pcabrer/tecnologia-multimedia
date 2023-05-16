

function cargaListaMonumentos() {
    // div que contiene la lista de monumentos

    const monumentList = document.getElementById('contenedor-monumentos');
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "Monumentos.json", true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            //console.log(xhr.responseText);
            var datos = JSON.parse(xhr.responseText);

            datos.itemListElement.forEach(function (monumento, idx) {


                // Crear elemento div con clases col-12 col-md-12 col-lg-6 mr-lg-3 justify-content-center
                const div = document.createElement('div');
                div.classList.add('col-12', 'col-md-12', 'col-lg-6', 'mr-lg-3', 'justify-content-center');

                // Crear enlace con atributos href y clase monumentos-card-link
                const enlace = document.createElement('a');
                enlace.setAttribute('href', `monumento.html?monumento=${idx}`);
                enlace.classList.add('monumentos-card-link');

                // Crear elemento div con clases card mi-carta
                const divCard = document.createElement('div');
                divCard.classList.add('card', 'mi-carta');

                // Crear imagen con atributo src y clase monumentos-card-imagen
                const imagen = document.createElement('img');
                imagen.setAttribute('src', monumento.image[0].url);
                imagen.classList.add('monumentos-card-imagen');

                // Crear elemento div con clase monumentos-card-contenido
                const divContenido = document.createElement('div');
                divContenido.classList.add('monumentos-card-contenido');

                // Crear título h4 con clase monumentos-card-titulo y texto el nombre del monumento
                const titulo1 = document.createElement('h4');
                titulo1.classList.add('monumentos-card-titulo');
                titulo1.textContent = monumento.name;

                // Crear título h5 con clase monumentos-card-titulo y texto Palma
                const titulo2 = document.createElement('h5');
                titulo2.classList.add('monumentos-card-ciudad');
                titulo2.textContent = monumento.address.addressLocality;

                // Crear párrafo con clase monumentos-card-texto y texto Lorem ipsum
                const parrafo = document.createElement('p');
                parrafo.classList.add('monumentos-card-descripcion');

                const palabras = monumento.description.split(' ').slice(0, 40); // Obtener las primeras 10 palabras
                const texto = palabras.join(' '); // Unir las palabras seleccionadas
                parrafo.textContent = texto + '...';

                // Crear el elemento para mostrar si está abierto o cerrado
                const openStatusElement = document.createElement("p");

                if (estaAbierto(monumento.openingHours)) {
                    openStatusElement.classList.add("monumentos-card-abierto");
                    openStatusElement.textContent = "Abierto";


                } else {

                    openStatusElement.classList.add("monumentos-card-cerrado");
                    openStatusElement.textContent = "Cerrado";

                }

                // creamos el elemento div con clase "stars"
                const starsDiv = document.createElement("div");
                starsDiv.classList.add("stars");

                // creamos el elemento span con clase "rating" y contenido de texto "4,1"
                var ratingSpan = document.createElement("span");
                ratingSpan.classList.add("rating");
                ratingSpan.innerText = monumento.aggregateRating.ratingValue;

                var numero = parseFloat(monumento.aggregateRating.ratingValue);
                var entero = Math.floor(numero); // obtiene la parte entera (4)
                var decimal = parseInt((numero - entero) * 10); // obtiene la parte decimal (7)
                console.log(numero);
                starsDiv.appendChild(ratingSpan);

                // creamos cinco elementos span con clase "star", de los cuales los primeros cuatro tienen clase "checked" y contenido de texto "&#9733;"
                for (var i = 0; i < 5; i++) {
                    var starSpan = document.createElement("span");
                    starSpan.classList.add("star");
                    if (i < entero) {
                        starSpan.classList.add("checked");
                        
                    } else if(decimal>=5) {
                        starSpan.classList.add("halfchecked");
                        decimal=0;

                    }
                    starSpan.innerHTML = "&#9733;";
                    starsDiv.appendChild(starSpan);


                }

                // Agregar todos los elementos creados a sus elementos contenedores correspondientes
                divContenido.appendChild(titulo1);
                divContenido.appendChild(titulo2);
                divContenido.appendChild(parrafo);
                divContenido.appendChild(starsDiv);
                divContenido.appendChild(openStatusElement);
                divCard.appendChild(imagen);
                divCard.appendChild(divContenido);
                enlace.appendChild(divCard);
                div.appendChild(enlace);

                monumentList.appendChild(div);


            });



        }

    };

    xhr.send();
}

function estaAbierto(horario) {


    const dateActual = new Date();
    const diaActual = dateActual.getDay();

    const diasSemana = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

    for (let i = 0; i < horario.length; i++) {

        const cadenadias = horario[i].split(" "); // separar la cadena en dos partes utilizando el espacio como separador

        const dias = cadenadias[0]; // primera parte de la cadena
        const horas = cadenadias[1]; // segunda parte de la cadena
        const hora = horas.split("-");

        // Separamos las horas y los minutos
        const horaApertura = hora[0].split(":");
        const horaCierre = hora[1].split(":");

        const horaAperturaI = parseInt(horaApertura[0]);
        const minutosAperturaI = parseInt(horaApertura[1]);

        const horaCierreI = parseInt(horaCierre[0]);
        const minutosCierreI = parseInt(horaCierre[1]);

        // Creamos un objeto Date con la hora
        const horaAperturaDate = new Date();
        horaAperturaDate.setHours(horaAperturaI);
        horaAperturaDate.setMinutes(minutosAperturaI);
        horaAperturaDate.setSeconds(0);

        // Creamos un objeto Date con la hora
        const horaCierreDate = new Date();
        horaCierreDate.setHours(horaCierreI);
        horaCierreDate.setMinutes(minutosCierreI);
        horaCierreDate.setSeconds(0);


        if (dias.includes('-')) {

            const diaJ = dias.split("-");

            const indiceDia1 = diasSemana.indexOf(diaJ[0]);
            const indiceDia2 = diasSemana.indexOf(diaJ[1]);

            if (indiceDia1 != -1 && indiceDia2 != -1) {

                var indice = indiceDia1;
                var indicefinal = (indiceDia2 + 1) % 7;

                do {

                    if (indice == diaActual && horaAperturaDate < dateActual && horaCierreDate > dateActual) {

                        return true;

                    }

                    indice = (indice + 1) % 7;

                } while (indice != indicefinal);

            }
        } else if (dias.includes(',')) {


            const diasSemanaT = dias.split(",");

            for (let j = 0; j < diasSemanaT.length; j++) {
                console.log(diasSemanaT[j]);
                const indiceDia12 = diasSemana.indexOf(diasSemanaT[j]);

                if (indiceDia12 == diaActual && horaAperturaDate < dateActual && horaCierreDate > dateActual) {

                    return true;
                }

            }


        } else {

            const indiceDia = diasSemana.indexOf(dias);
            if (indiceDia == diaActual && horaAperturaDate < dateActual && horaCierreDate > dateActual) {

                return true;
            }

        }
    }

    return false;
}
