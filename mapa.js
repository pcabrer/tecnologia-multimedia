

function loadedPage() {

    var monumentos = [
        {
            "@context": "http://schema.org",
            "@type": "TouristAttraction",
            "name": "La Sagrada Familia",
            "geo": {
                "@type": "GeoCoordinates",
                "latitude": 41.4036,
                "longitude": 2.1744
            }
        },
        {
            "@context": "http://schema.org",
            "@type": "TouristAttraction",
            "name": "Park Güell",
            "geo": {
                "@type": "GeoCoordinates",
                "latitude": 41.4145,
                "longitude": 2.1527
            }
        }
    ];


    var mymap = L.map('mapid').setView([51.505, -0.09], 13);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors',
        maxZoom: 18,
    }).addTo(mymap);

    monumentos.forEach(function (monumento) {
        var marker = L.marker([monumento.geo.latitude, monumento.geo.longitude]).addTo(mymap);
    });

    marker.bindPopup(monumento.name);
}
