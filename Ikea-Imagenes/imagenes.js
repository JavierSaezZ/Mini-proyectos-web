


// imagenes.js
const contenedor = document.getElementById("image-container");
const datosPines = JSON.parse(localStorage.getItem("pinesData")) || [];

// REEMPLAZA LA FUNCIÓN renderizarPines POR ESTA:
function renderizarPines() {
    datosPines.forEach(pin => {
        const circuloFuera = document.createElement('div');
        circuloFuera.classList.add('circuloFuera');
        circuloFuera.style.left = pin.x + "%";
        circuloFuera.style.top = pin.y + "%";

        const circuloDentro = document.createElement('div');
        circuloDentro.classList.add('circuloDentro');

        const infoproducto = document.createElement('div');
        infoproducto.classList.add('infoproducto');
        
        infoproducto.innerHTML = `
            <p class="info-titulo">${pin.titulo}</p>
            <p class="info-desc">${pin.info}</p>
            <p class="info-precio">${pin.precio}€</p>
        `;

        // AÑADIR DIRECCIÓN DINÁMICA SEGÚN SU POSICIÓN
        if (pin.x > 50) {
            infoproducto.classList.add('pos-left');
        }
        if (pin.y < 35) {
            infoproducto.classList.add('pos-bottom');
        } else if (pin.y > 65) {
            infoproducto.classList.add('pos-top');
        }

        circuloFuera.appendChild(circuloDentro);
        circuloFuera.appendChild(infoproducto);
        contenedor.appendChild(circuloFuera);
    });
}
// Pintar pines al iniciar
renderizarPines();