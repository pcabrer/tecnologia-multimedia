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

header('Location: monumento.html?monumento=' . $idx);
exit();

?>

<!DOCTYPE html>
<html>
<head>
    <title>Mostrar Variables PHP en un Alert</title>
    <script>
        window.onload = function() {
            var idx = '<?php echo $idx; ?>';
            var name = '<?php echo $name; ?>';
            var rating = '<?php echo $rating; ?>';
            var comentario = '<?php echo $comentario; ?>';
            
            var mensaje = "Idx: " + idx + "\nNombre: " + name + "\nRating: " + rating + "\nOpinión: " + comentario;
            
            alert(mensaje);
        };
    </script>
</head>
<body>
</body>
</html>







