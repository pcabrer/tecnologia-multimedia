<?php

    // Recopila los datos del formulario
    $nombre = $_POST['nombre'];
    $email = $_POST['email'];
    $sujeto = $_POST['sujeto'];
    $mensaje = $_POST['mensaje'];

    // Configura los detalles del correo electrónico
    $destinatario = 'soporte@monumentosmallorca.com';
    $asunto = 'Nuevo mensaje de contacto';

    // Construye el cuerpo del mensaje
    $cuerpoMensaje = "Nombre: $nombre\n";
    $cuerpoMensaje .= "Email: $email\n";
    $cuerpoMensaje .= "Asunto: $sujeto\n";
    $cuerpoMensaje .= "Mensaje: $mensaje\n";

    $to = "p.cabrer.007@hotmail.es";
    $subject = "Checking PHP mail";
    $message = "PHP mail works just fine";
    mail($to,$subject,$message);
    //echo "The email message was sent.";


    /*
    // Envía el correo electrónico
    mail($destinatario, $asunto, $cuerpoMensaje);
    */

    // Muestra un mensaje de éxito en tu página HTML
    echo '<script>alert("Tu mensaje ha sido enviado. ¡Gracias!");</script>';
    exit();
?>