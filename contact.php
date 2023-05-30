<?php
if(isset($_POST['submit'])) {
    // Recopila los datos del formulario
    $nombre = $_POST['nombre'];
    $email = $_POST['email'];
    $sujeto = $_POST['sujeto'];
    $mensaje = $_POST['mensaje'];

    // Configura los detalles del correo electrónico
    $destinatario = 'tudirecciondecorreo@example.com'; // Cambia esto por tu dirección de correo electrónico
    $asunto = 'Nuevo mensaje de contacto';

    // Construye el cuerpo del mensaje
    $cuerpoMensaje = "Nombre: $nombre\n";
    $cuerpoMensaje .= "Email: $email\n";
    $cuerpoMensaje .= "Asunto: $sujeto\n";
    $cuerpoMensaje .= "Mensaje: $mensaje\n";

    // Envía el correo electrónico
    mail($destinatario, $asunto, $cuerpoMensaje);

    // Muestra un mensaje de éxito en tu página HTML
    echo '<script>alert("Tu mensaje ha sido enviado. ¡Gracias!");</script>';
}
?>