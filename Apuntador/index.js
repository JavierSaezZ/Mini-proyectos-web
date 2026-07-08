const botondatos = document.getElementById("btndatos");
const botonenviar = document.getElementById("boton");
const modal = document.getElementById("modal");

botonenviar.onclick = enviar;
botondatos.onclick = datos;

function enviar() {
    const titulo = document.getElementById("titulo");
    const texto = document.getElementById("texto");
    
    if(!titulo.value || !texto.value) {
        alert("Por favor, rellena ambos campos.");
        return;
    }

    fetch('PHP/index.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: `titulo=${encodeURIComponent(titulo.value)}&texto=${encodeURIComponent(texto.value)}`
    })
    .then(response => response.text())
    .then(data => {
        console.log('Respuesta del servidor:', data);
        titulo.value = "";
        texto.value = "";
    })
    .catch(error => console.error('Error:', error));
}

function datos() {
    modal.style.display = "flex"; 
    
    fetch('PHP/select_datos.php', {
        method: 'POST'
    })
    .then(response => response.json())
    .then(data => {
        // Añadimos la cabecera "Acciones" a la tabla
        let tabla = '<div class="table-container"><table>';
        tabla += '<thead><tr><th>Título</th><th>Texto</th><th>Fecha</th><th>Hora</th><th>Acciones</th></tr></thead><tbody>';
        
        if (data && data.length > 0) {
            data.forEach(item => {
                // Pasamos item.id y el elemento 'this' a la función de eliminar
                tabla += `<tr> 
                    <td>${item.titulo}</td> 
                    <td>${item.texto}</td> 
                    <td>${item.fecha}</td> 
                    <td>${item.hora}</td> 
                    <td><button class="btn-eliminar" onclick="eliminarDato(${item.id}, this)">Eliminar</button></td>
                </tr>`;
            });
        } else {
            tabla += '<tr><td colspan="5" style="text-align:center;">No hay datos</td></tr>';
        }
        
        tabla += '</tbody></table></div>';
        modal.innerHTML = tabla;
    })
    .catch(error => {
        console.error('Error cargando datos:', error);
        modal.innerHTML = '<div class="table-container"><p style="color:white; text-align:center;">Error al cargar datos.</p></div>';
    });
}

// Nueva función para gestionar el borrado
function eliminarDato(id, boton) {
    if (!confirm("¿Estás seguro de que deseas eliminar este registro?")) return;

    fetch('PHP/delete_datos.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: `id=${id}`
    })
    .then(response => response.text())
    .then(data => {
        console.log('Respuesta de eliminación:', data);
        // Elimina la fila (tr) directamente del DOM de manera visual sin refrescar la página
        boton.closest('tr').remove();
    })
    .catch(error => console.error('Error al eliminar:', error));
}

modal.onclick = function(event) {
    if (event.target === modal) {
        modal.style.display = "none";
    }
};