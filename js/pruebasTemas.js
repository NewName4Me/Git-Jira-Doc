(function () {
    // variables globales
    const themesCollection = document.querySelector('#themesCollection');
    const modalPopUp = document.querySelector('#modalBtn');
    let modalPopUpVisible = false;

    document.addEventListener('DOMContentLoaded', iniciarApp);

    // Función para inicializar la aplicación
    function iniciarApp() {
        cargarTemas().then(temas => {
            crearBotonesTemas(temas);
            cargarTemaGuardado(); // Cargar el tema guardado al iniciar
        });
        modalPopUp.addEventListener('click', toggleThemesCollection);
    }

    /**
     * Función para mostrar u ocultar el contenedor de temas
     */
    function toggleThemesCollection() {
        if (!modalPopUpVisible) {
            themesCollection.style.opacity = '1';
            modalPopUpVisible = true;
        } else {
            themesCollection.style.opacity = '0';
            modalPopUpVisible = false;
        }
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

        // Aplicar los colores del tema al botón
        btnTema.style.borderColor = colors.grid;
        btnTema.style.backgroundColor = colors.primario;
        btnTema.style.color = colors.secundario;

        btnTema.addEventListener('click', () => {
            cambiarTema(colors);
            localStorage.setItem('selectedTheme', JSON.stringify(colors)); // Guardar tema en localStorage
        });
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

    /**
     * Función que carga el tema guardado en localStorage
     */
    function cargarTemaGuardado() {
        const savedTheme = localStorage.getItem('selectedTheme');
        if (savedTheme) {
            const parsedTheme = JSON.parse(savedTheme);
            cambiarTema(parsedTheme);
        }
    }

})();
