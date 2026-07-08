<?php
include_once("datos_model.php");

// Comprobamos que nos llega el ID por POST
if (isset($_POST['id'])) {
    $id = $_POST['id'];
    $datosModel = new DatosModel();
    
    // Llamamos a la nueva función de borrado
    $resultado = $datosModel->delete($id);
    
    echo $resultado;
} else {
    echo "Error: No se ha recibido ningún ID para eliminar.";
}
?>