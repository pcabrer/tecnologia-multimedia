<?php

    // Recopila los datos del formulario
    $nombre = $_POST['nombre'];
    $email = $_POST['email'];
    $sujeto = $_POST['sujeto'];
    $mensaje = $_POST['mensaje'];



    /*
    $to = "p.cabrer.007@hotmail.es";
    $subject = "Checking PHP mail";
    $message = "PHP mail works just fine";
    mail($to,$subject,$message);
    */

    //echo "The email message was sent.";



    $to = "p.cabrer.007@hotmail.es";
    $headers = "From:" . $email;
    mail($to,$sujeto,$mensaje, $headers);

    

    // Muestra un mensaje de éxito en tu página HTML
    echo '<script>alert("Tu mensaje ha sido enviado. ¡Gracias!");</script>';


?>