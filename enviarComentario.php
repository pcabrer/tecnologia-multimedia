<?php
// Obtener los datos del formulario
$idx = $_GET['idx'];

$name = $_GET['name'];
$rating = $_GET['rating'];
$comentario = $_GET['comment'];

// Imprime los valores en la página
echo "Nombre: " . $name . "<br>";
echo "Rating: " . $rating . "<br>";
echo "Opinión: " . $comentario . "<br>";

header('Location: ../index.html');
exit(); // Asegurarse de que el script se detenga después de la redirección

?>