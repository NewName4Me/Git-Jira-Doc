(function () {
    // variables globales
    const themesCollection = document.querySelector('#themesCollection');
    const modalPopUp = document.querySelector('nav a:last-child');
    let modalPopUpVisible = false;

    document.addEventListener('DOMContentLoaded', iniciarApp);

    // Función para inicializar la aplicación
    function iniciarApp() {
        crearBotonesTemas(temasJson.themes);
        cargarTemaGuardado(); // Cargar el tema guardado al iniciar
        modalPopUp.addEventListener('click', e => {
            e.preventDefault();
            toggleThemesCollection();
        });
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
     * Función que crea botones para cada tema
     * @param {Array} temas Lista de temas obtenidos del objeto temasJson
     */
    function crearBotonesTemas(temas) {
        temas.forEach(tema => {
            const btnTema = crearBotonTema(tema.name, tema.colors);
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

    const temasJson = {
        "themes": [
            {
                "name": "light-orange",
                "colors": {
                    "primario": "#ffffff",
                    "secundario": "#f17223",
                    "grid": "hsla(0, 1%, 81%, 0.531)"
                }
            },
            {
                "name": "aqua-green",
                "colors": {
                    "primario": "#a2d5c6",
                    "secundario": "#077b8a",
                    "grid": "#1e656d"
                }
            },
            {
                "name": "bright-pink",
                "colors": {
                    "primario": "#ffc0cb",
                    "secundario": "#ff69b4",
                    "grid": "#ffb6c1"
                }
            },
            {
                "name": "neon",
                "colors": {
                    "primario": "#000000",
                    "secundario": "#ff00ff",
                    "grid": "#007acc"
                }

            },
            {
                "name": "bright-blue",
                "colors": {
                    "primario": "#87ceeb",
                    "secundario": "#6495ed",
                    "grid": "#4682b4"
                }
            }
        ]
    }


})();

