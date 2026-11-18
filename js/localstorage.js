// Función para guardar datos localmente
const guardarDatos = (clave, lista) => {
    localStorage.setItem(clave, JSON.stringify(lista));
};

// Función para leer datos localmente
const leerDatos = (clave, datosIniciales=[]) => {
    const datos = localStorage.getItem(clave);
    if (datos !== null) {
        return JSON.parse(datos);
    }
    return datosIniciales;
};