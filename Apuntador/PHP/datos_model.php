<?php
include_once 'connect_data.php';
include_once 'datos.php';
class DatosModel {
    public $db; // Propiedad para almacenar la conexión a la base de datos

    // public function __construct($db) {
    //     $this->db = $db;
    // }

    public function OpenConnect()
    {
        $konDat=new connect_data();
        try
        {
            $this->db=new mysqli($konDat->host,$konDat->userbbdd,$konDat->passbbdd,$konDat->ddbbname);
        }
        catch(Exception $e)
        {
            echo $e->getMessage();
        }
        $this->db->set_charset("utf8"); // honek behartu egiten du aplikazio eta
        //                  //databasearen artean UTF -8 erabiltzera datuak trukatzeko
    }
    public function CloseConnect()
    {
        mysqli_close ($this->db);
        
    }


    // Método para obtener un dato por su ID
    public function setList() {
{
        $this->OpenConnect();  // konexio zabaldu  - abrir conexión
            
                $result = $this->db->query("SELECT * FROM datos");
        
                $datos = []; // Arreglo para almacenar los datos
                $list = array();
                while ($row = mysqli_fetch_array($result, MYSQLI_ASSOC)) {
                    $dato = new datos(); // Crear un nuevo objeto Dato
                    $dato->setId($row['id']);
                    $dato->setTitulo($row['titulo']);
                    $dato->setTexto($row['texto']);
                    $dato->setFecha($row['fecha']);
                    $dato->setHora($row['hora']);
                    $datos[] = $dato; // Agregar el objeto Dato al arreglo
                }
                $this->CloseConnect();
                return $datos;
            }
        }
    
    // Método para insertar un nuevo dato
    public function insert($titulo, $texto) {
    
        $this->OpenConnect();  

        
        $sql = "INSERT INTO datos(id,titulo, texto, fecha, hora) VALUES ( (SELECT LAST_INSERT_ID() AS id),'$titulo', '$texto', CURDATE(), CURTIME());;";
        
        $this->db->query($sql);
        
        if ($this->db->affected_rows == 1)
        {
            $msg= "El dato se inserto correctamente: ";
        } else {
            $msg=$sql." Fallo al insertar una cuenta nuevo: (" . $this->db->errno . ") ";
        }
        $this->CloseConnect();
        return $msg;
    }

// ... Otros métodos (actualizar, eliminar, etc.)

public function selctdatos() {
        $list = array();
        $this->OpenConnect();  
        $sql = "select * from datos;";
        
        $result=$this->db->query($sql);
        while ($row = mysqli_fetch_array($result, MYSQLI_ASSOC)) {
            $newdatos= new datos();
            
            // ¡ESTA LÍNEA ES LA CLAVE PARA QUE FUNCIONE EL BORRADO!
            $newdatos->id = $row["id"]; 
            
            $newdatos->titulo = $row["titulo"];
            $newdatos->texto = $row["texto"];
            $newdatos->fecha = $row["fecha"];
            $newdatos->hora = $row["hora"];
            
            array_push($list, get_object_vars($newdatos));
        }
        $this->CloseConnect();
        return $list;
    }
// Método para eliminar un dato por su ID
    public function delete($id) {
        $this->OpenConnect();  
        
        // Aseguramos el ID para evitar inyecciones SQL básicas
        $id_seguro = $this->db->real_escape_string($id);
        
        $sql = "DELETE FROM datos WHERE id = '$id_seguro';";
        $this->db->query($sql);
        
        if ($this->db->affected_rows == 1) {
            $msg = "El registro se eliminó correctamente.";
        } else {
            $msg = "Fallo al eliminar el registro: (" . $this->db->errno . ") ";
        }
        
        $this->CloseConnect();
        return $msg;
    }

// ... Otros métodos (actualizar, eliminar, etc.)
}

?>