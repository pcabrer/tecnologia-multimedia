

function cargaListaMonumentos() {



    // div que contiene la lista de monumentos

    const monumentList = document.getElementById('contenedor-monumentos');
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "Monumentos.json", true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            //console.log(xhr.responseText);
            var datos = JSON.parse(xhr.responseText);

            datos.itemListElement.forEach(function (monumento) {

                console.log(monumento.name);
                console.log(monumento.image[0].url);

                /*
                <div class="col-lg-4 col-md-6 portfolio-item filter-palma">
                    <div class="portfolio-wrap">
                    <img src="assets/img/portfolio/monumento1.jpg" class="img-fluid" alt="">
                    <div class="portfolio-info">
                        <a href="catedral.html">
                        <h4>Catedral de Palma</h4>
                        </a>
                        <p>Palma</p>
                        <div class="portfolio-links">
                        <a href="assets/img/portfolio/monumento1.jpg" data-gallery="portfolioGallery"
                            class="portfolio-lightbox"><i class="bx bx-plus"></i></a>
                        </div>
                    </div>
                    </div>
                </div>
              */
                // Creamos los elementos HTML
                const colDiv = document.createElement('div');
                colDiv.classList.add('col-lg-4', 'col-md-6', 'portfolio-item', 'filter-palma');

                const wrapDiv = document.createElement('div');
                wrapDiv.classList.add('portfolio-wrap');

                const img = document.createElement('img');
                img.src = monumento.image[0].url;
                img.classList.add('img-fluid');
                img.alt = '';

                const infoDiv = document.createElement('div');
                infoDiv.classList.add('portfolio-info');

                const linkA = document.createElement('a');
                linkA.href = 'catedral.html';

                const titleH4 = document.createElement('h4');
                titleH4.textContent = monumento.name;

                const locationP = document.createElement('p');
                locationP.textContent = monumento.address.addressLocality;

                const linksDiv = document.createElement('div');
                linksDiv.classList.add('portfolio-links');

                const lightboxA = document.createElement('a');
                lightboxA.href = monumento.image[0].url;
                lightboxA.dataset.gallery = 'portfolioGallery';
                lightboxA.classList.add('portfolio-lightbox');

                const plusIcon = document.createElement('i');
                plusIcon.classList.add('bx', 'bx-plus');

                // Agregamos los elementos al árbol del DOM
                linksDiv.appendChild(lightboxA);
                lightboxA.appendChild(plusIcon);

                linkA.appendChild(titleH4);

                infoDiv.appendChild(linkA);
                infoDiv.appendChild(locationP);
                infoDiv.appendChild(linksDiv);

                wrapDiv.appendChild(img);
                wrapDiv.appendChild(infoDiv);

                colDiv.appendChild(wrapDiv);

                monumentList.appendChild(colDiv);


            });



        }

    };
   
    xhr.send();
}
