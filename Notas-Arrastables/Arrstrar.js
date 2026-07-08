
let activeElement = null;
let offsetX = 0, offsetY = 0;
let zIndexCounter = 1;
const draggables = document.querySelectorAll('.draggable');
draggables.forEach((draggable, index) => {
    if (!draggable.id) {
        draggable.id = `draggable-${index}`;
    }

    // Solo permitir arrastrar desde el "drag-handle"
    const dragHandle = draggable.querySelector('.drag-handle');
    dragHandle.addEventListener('mousedown', (e) => startDrag(e, draggable));
});

function normalizeZIndex() {
    let elementsArray = [...draggables];
    let zIndexes = elementsArray.map(el => {
        const savedData = localStorage.getItem(el.id);
        return savedData ? { el, zIndex: JSON.parse(savedData).zIndex || 1 } : { el, zIndex: 1 };
    });

    zIndexes.sort((a, b) => b.zIndex - a.zIndex);
    zIndexes.forEach((item, index) => {
        item.el.style.zIndex = draggables.length - index;
        savePosition(item.el);
    });

    zIndexCounter = draggables.length;
}

function loadPositions() {
    draggables.forEach((draggable) => {
        const savedPosition = localStorage.getItem(draggable.id);
        if (savedPosition) {
            const { left, top, titulo } = JSON.parse(savedPosition);
            draggable.style.left = `${left}px`;
            draggable.style.top = `${top}px`;
            // console.log(title)
            draggable.querySelector(".note-title").value = titulo;
        }
    });
    normalizeZIndex();
}

function savePosition(element) {

    if (element.id) {
        console.log(element)
        console.log(element.querySelector(".note-title").value)
        const position = {
            left: element.offsetLeft,
            top: element.offsetTop,
            zIndex: element.style.zIndex || 1,
            titulo: element.querySelector(".note-title").value,
            // cuerpo:element.querySelector(".note-title").value 
        };
        localStorage.setItem(element.id, JSON.stringify(position));
    }
}

function startDrag(e, element) {
    activeElement = element;
    offsetX = e.clientX - activeElement.offsetLeft;
    offsetY = e.clientY - activeElement.offsetTop;
    activeElement.style.cursor = 'grabbing';
    zIndexCounter++;
    activeElement.style.zIndex = zIndexCounter;
    document.addEventListener('mousemove', handleDrag);
    document.addEventListener('mouseup', stopDrag);
}

function handleDrag(e) {
    if (activeElement) {
        activeElement.style.left = `${e.clientX - offsetX}px`;
        activeElement.style.top = `${e.clientY - offsetY}px`;
    }
}

function stopDrag() {
    if (activeElement) {
        activeElement.style.cursor = 'default';
        savePosition(activeElement);
        activeElement = null;
        document.removeEventListener('mousemove', handleDrag);
        document.removeEventListener('mouseup', stopDrag);
    }
}

// window.addEventListener('load', loadPositions);








function nuevanota() {
    const note = document.getElementById("tablon");
    for (let i = 0; i < localStorage.length; i++) {
        // let key = localStorage.key(i);
        // console.log(`${key}: ${localStorage.getItem(key)}`);
        note.insertAdjacentHTML("beforeend", `
        <div class="draggable">
        <div class="drag-handle">🟰</div>
        
        <div class="note-header">
        <img src="https://upload.wikimedia.org/wikipedia/commons/e/ec/Cute_cat_face.png" alt="Gatito" class="cat-icon">
        <textarea type="text" class="note-title" placeholder="Título (escribe aquí)"></textarea>
        </div>
        <textarea class="note-body" placeholder="Cuerpo de la nota (escribe aquí)"></textarea>
        </div>
        `);
    }
        const draggables = document.querySelectorAll('.draggable');
    loadPositions()
    // document.querySelector(".tablon").appendChild(note); // Cambia esto si quieres agregarlo a otro contenedor
}

// Llamar a la función para añadir la nota 
document.addEventListener("DOMContentLoaded", () => {
    nuevanota();
});




// //  <div class="draggable">
// <div class="drag-handle">
// <div class="menu">
//   <span></span>
//   <span></span>
// </div>
// </div>
// <div class="note-header">
// <!-- <img src="https://upload.wikimedia.org/wikipedia/commons/e/ec/Cute_cat_face.png" alt="Gatito" class="cat-icon"> -->
// <textarea type="text" class="note-title" placeholder="Título (escribe aquí)"></textarea>
// </div>
// <textarea class="note-body" placeholder="Cuerpo de la nota (escribe aquí)"></textarea>
// </div>

// <div class="draggable">
// <div class="drag-handle">🟰</div>
// <div class="note-header">
// <img src="https://upload.wikimedia.org/wikipedia/commons/e/ec/Cute_cat_face.png" alt="Gatito" class="cat-icon">
// <textarea type="text" class="note-title" placeholder="Título (escribe aquí)"></textarea>
// </div>
// <textarea class="note-body" placeholder="Cuerpo de la nota (escribe aquí)"></textarea>
// </div>

// <div class="draggable">
// <div class="drag-handle">=</div>
// <div class="note-header">
// <img src="https://upload.wikimedia.org/wikipedia/commons/e/ec/Cute_cat_face.png" alt="Gatito" class="cat-icon">
// <input type="text" class="note-title" placeholder="Título (escribe aquí)">

// </div>
// <textarea class="note-body" placeholder="Cuerpo de la nota (escribe aquí)"></textarea>
// </div>