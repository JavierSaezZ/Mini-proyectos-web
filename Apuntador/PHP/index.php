<?php
include_once("datos_model.php");
// Recibir los datos enviados por el formulario
$titulo = $_POST['titulo'];
$texto = $_POST['texto'];

// Hacer algo con los datos (por ejemplo, guardarlos en una base de datos)
$datos= new DatosModel();

$datos=$datos->insert($titulo, $texto);
var_dump($titulo);
echo "Título: " . $titulo . "<br>";
echo "Texto: " . $texto;
?>