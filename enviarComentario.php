<?php
// Obtener los datos del formulario
$idx = $_GET['idx'];

$monumento = $_GET['monumento'];
$date= $_GET['date'];

$name = $_GET['name'];
$rating = $_GET['rating'];
$comentario = $_GET['comment'];

// Cargar el JSON existente
$json = file_get_contents('../public/valoraciones.json');
$data = json_decode($json, true);

// Crear un nuevo elemento de valoración
$newItem = array(
    "@context" => "http://schema.org",
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

// Agregar el nuevo elemento a la lista de valoraciones
$data['itemListElement'][] = $newItem;

// Convertir el arreglo de PHP en JSON y guardar el archivo
$newJson = json_encode($data, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE);
file_put_contents('../public/valoraciones.json', $newJson);

header('Location: monumento.html?monumento=' . $idx);
exit();

?>