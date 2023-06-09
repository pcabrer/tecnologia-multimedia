<?php
// Obtener los datos del formulario
$idx = $_POST['idx'];

$monumento = $_POST['monumento'];
$date= $_POST['date'];

$name = $_POST['name'];
$rating = $_POST['rating'];
$comentario = $_POST['comment'];

// Cargar el JSON de valoraciones
$json = file_get_contents('../public/assets/json/valoraciones.json');
$data = json_decode($json, true);

// Crear un nuevo elemento de valoración
$newItem = array(
    "@type" => "Review",
    "author" => $name,
    "datePublished" => $date,
    "reviewBody" => $comentario,
    "itemReviewed" => array(
        "@type" => "CivicStructure",
        "name" => $monumento
    ),
    "reviewRating" => array(
        "@type" => "Rating",
        "ratingValue" => $rating
    ),
);

// Agregar la nueva valoración a la lista de valoraciones
$data['itemListElement'][] = $newItem;

// Convertir el arreglo de PHP en JSON y añadirlo al archivo valoraciones.json
$newJson = json_encode($data, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE);
file_put_contents('../public/assets/json/valoraciones.json', $newJson);


/*--------------- ACTUALIZAR VALORACIÓN MONUMENTO ------------------ */

// Cargar el JSON de monumentos.
$jsonMonumento = file_get_contents('../public/assets/json/Monumentos.json');
$dataMonumento = json_decode($jsonMonumento, true);

// Recorrer las reseñas y buscar el monumento con nombre "Catedral de Palma"
foreach ($dataMonumento['itemListElement'] as &$item) {
    if ($item['name'] == $monumento) {

        // Actualizar los valores de "ratingValue" y "reviewCount"
        $mediaValoraciones  = floatval($item['aggregateRating']['ratingValue']);
        $numeroValoraciones  = floatval($item['aggregateRating']['reviewCount']);

        $nuevaMedia = ($mediaValoraciones*$numeroValoraciones + floatval($rating))/($numeroValoraciones+1);

        $numeroValoraciones++;

        $nuevaMedia = number_format($nuevaMedia, 1);
        
        $item['aggregateRating']['ratingValue'] = $nuevaMedia;
        $item['aggregateRating']['reviewCount'] =  $numeroValoraciones;
    }
}


// Codificar el array actualizado de nuevo a JSON
$jsonUpdated = json_encode($dataMonumento, JSON_PRETTY_PRINT| JSON_UNESCAPED_UNICODE);

// Escribir el JSON actualizado de vuelta al archivo
file_put_contents('../public/assets/json/Monumentos.json', $jsonUpdated);

header('Location: monumento.html?monumento=' . $idx);

exit();

?>