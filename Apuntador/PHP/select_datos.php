<?php include_once("datos_model.php");

$datos= new DatosModel();
$datos=$datos->selctdatos();
echo json_encode($datos);
?>