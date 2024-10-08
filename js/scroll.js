
const cards = document.querySelectorAll('.card');
let inicial = 0;
const lengthcard = cards.length; // Número total de tarjetas

// Función para mostrar la tarjeta actual y ocultar las demás
function showOrHide() {
    cards.forEach((card, index) => {
        card.style.display = index === inicial ? 'block' : 'none';
    });
}

// Función para manejar el evento de scroll
function handleScroll(event) {
    const delta = Math.sign(event.deltaY); // Determina si el scroll es hacia abajo (1) o hacia arriba (-1)

    // Aumentar o disminuir el valor de 'inicial' dependiendo del scroll
    inicial += delta;

    // Limitar el valor de 'inicial' entre 0 y lengthcard - 1
    if (inicial < 0) inicial = 0;
    if (inicial >= lengthcard) inicial = lengthcard - 1;

    // Actualizar la vista
    showOrHide();
}

// Agregar el listener para el evento de scroll
window.addEventListener('wheel', handleScroll);

// Mostrar la tarjeta inicial al cargar la página
showOrHide();
