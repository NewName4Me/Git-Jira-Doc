(function () {
    // variables globales
    const themesCollection = document.querySelector('#themesCollection');

    document.addEventListener('DOMContentLoaded', iniciarApp);

    // Función para inicializar la aplicación
    function iniciarApp() {
        cargarTemas().then(crearBotonesTemas);
    }

    /**
     * Función que carga el JSON con los temas
     * @returns {Promise} Retorna la promesa con los temas procesados
     */
    async function cargarTemas() {
        const URL = '../db/temas.json';
        const response = await fetch(URL);
        const themesJson = await response.json();
        return themesJson.themes;
    }

    /**
     * Función que crea botones para cada tema
     * @param {Array} temas Lista de temas obtenidos del JSON
     */
    function crearBotonesTemas(temas) {
        temas.forEach(({ name, colors }) => {
            const btnTema = crearBotonTema(name, colors);
            themesCollection.appendChild(btnTema);
        });
    }

    /**
     * Función que crea un botón con un tema
     * @param {string} name Nombre del tema
     * @param {object} colors Colores del tema
     * @returns {HTMLElement} Botón configurado para cambiar de tema
     */
    function crearBotonTema(name, colors) {
        const btnTema = document.createElement('BUTTON');
        btnTema.classList.add('btn');
        btnTema.textContent = name;
        btnTema.addEventListener('click', () => cambiarTema(colors));
        return btnTema;
    }

    /**
     * Función que cambia el tema visual
     * @param {object} colors Objeto con los colores del tema
     */
    function cambiarTema(colors) {
        const { primario, secundario, grid } = colors;
        const root = document.documentElement;
        root.style.setProperty('--primario', primario);
        root.style.setProperty('--secundario', secundario);
        root.style.setProperty('--grid', grid);
        console.log(`Tema cambiado a: ${primario}, ${secundario}, ${grid}`);
    }

})();
