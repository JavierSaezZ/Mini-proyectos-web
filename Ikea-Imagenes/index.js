// index.js
const contenedor = document.getElementById("image-container");
const imagen = document.getElementById("imagen");
const modal = document.getElementById("myModal");
const btnClose = document.getElementsByClassName("close")[0];
const btnGuardar = document.getElementById("btnGuardar");
const btnBorrar = document.getElementById("btnBorrarTodas");

let cordX = 0;
let cordY = 0;

// Inicializar array de datos desde localStorage
let datosPines = JSON.parse(localStorage.getItem("pinesData")) || [];

// Renderizar pines al cargar la página
function renderizarPines() {
    // Limpiar pines actuales (excepto la imagen)
    document.querySelectorAll('.circuloFuera').forEach(el => el.remove());
    
    datosPines.forEach(pin => {
        crearPinDOM(pin.x, pin.y, pin.titulo, pin.info, pin.precio);
    });
}

function crearPinDOM(x, y, titulo, info, precio) {
    const circuloFuera = document.createElement('div');
    circuloFuera.classList.add('circuloFuera');
    circuloFuera.style.left = x + "%";
    circuloFuera.style.top = y + "%";

    const circuloDentro = document.createElement('div');
    circuloDentro.classList.add('circuloDentro');

    const infoproducto = document.createElement('div');
    infoproducto.classList.add('infoproducto');
    
    // Estructura interna
    infoproducto.innerHTML = `
        <p class="info-titulo">${titulo}</p>
        <p class="info-desc">${info}</p>
        <p class="info-precio">${precio}€</p>
    `;
    if (x > 50) {
        infoproducto.classList.add('pos-left'); // Si está en la mitad derecha, abre hacia la izquierda
    }
    if (y < 35) {
        infoproducto.classList.add('pos-bottom'); // Si está arriba, abre hacia abajo
    } else if (y > 65) {
        infoproducto.classList.add('pos-top'); // Si está abajo, abre hacia arriba
    }

    circuloFuera.appendChild(circuloDentro);
    circuloFuera.appendChild(infoproducto);
    contenedor.appendChild(circuloFuera);
  }
// Abrir modal al hacer clic en la imagen
imagen.addEventListener("click", function(event) {
    const rect = imagen.getBoundingClientRect();
    cordX = ((event.clientX - rect.left) / rect.width) * 100;
    cordY = ((event.clientY - rect.top) / rect.height) * 100;
    
    // MARGEN DE SEGURIDAD: Evitar que la chincheta se salga de los bordes
    if (cordX < 3) cordX = 3;   // No más a la izquierda del 3%
    if (cordX > 97) cordX = 97; // No más a la derecha del 97%
    if (cordY < 3) cordY = 3;   // No más arriba del 3%
    if (cordY > 97) cordY = 97; // No más abajo del 97%
    
    modal.style.display = "block";
});
// Cerrar modal
btnClose.onclick = function() { modal.style.display = "none"; }
window.onclick = function(event) {
    if (event.target == modal) modal.style.display = "none";
}

// Guardar los datos
btnGuardar.onclick = function() {
    const titulo = document.getElementById("titulo").value || "Sin título";
    const info = document.getElementById("informacion").value || "Sin descripción";
    const precio = document.getElementById("precio").value || "0.00";

    const nuevoPin = { x: cordX, y: cordY, titulo: titulo, info: info, precio: precio };
    
    datosPines.push(nuevoPin);
    localStorage.setItem("pinesData", JSON.stringify(datosPines));
    
    // Resetear inputs y cerrar modal
    document.getElementById("titulo").value = "";
    document.getElementById("informacion").value = "";
    document.getElementById("precio").value = "";
    modal.style.display = "none";
    
    renderizarPines(); // Volver a pintar
}

// Borrar todos
btnBorrar.onclick = function() {
    if(confirm("¿Seguro que quieres borrar todas las chinchetas?")) {
        localStorage.removeItem("pinesData");
        datosPines = [];
        renderizarPines();
    }
}

// Pintar pines al iniciar
renderizarPines();