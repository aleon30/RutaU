// Lectura de datos desde el localStorage
const formRegistro = document.querySelector("#register-form");
const formLogin = document.querySelector("#login-form");

// Función para obtener la lista de usuarios desde el localStorage
const obtenerUsuarios = () => {
    return leerDatos("rutau_lista_usuarios");
};

// Función para crear un nuevo usuario y guardarlo en el localStorage
const crearUsuario = (usuario) => {
    const usuarios = obtenerUsuarios();
    usuarios.push(usuario);
    guardarDatos("rutau_lista_usuarios", usuarios);
};

// ==== REGISTRO ====
const registrarUsuario = (e) => {
    e.preventDefault();

    if (!formRegistro.reportValidity()) {
        return;
    }

    const usuario = {
        nombre: document.querySelector("#register-first-name").value.trim(),
        apellido: document.querySelector("#register-last-name").value.trim(),
        dni: document.querySelector("#register-dni").value.trim(),
        telefono: document.querySelector("#register-phone").value.trim(),
        correo: document.querySelector("#register-email").value.trim().toLowerCase(),
        contraseña: document.querySelector("#register-password").value
    };

    const usuarios = obtenerUsuarios();

    if (usuarios.some((u) => u.correo.toLowerCase() === usuario.correo)) {
        document.querySelector("#register-status").textContent = "Este correo ya está registrado.";
        document.querySelector("#register-status").hidden = false;
        return;
    }

    crearUsuario(usuario);
    window.location.href = "login.html";
}

if (formRegistro) {
    formRegistro.addEventListener("submit", registrarUsuario);
}

// ==== LOGIN ====
const iniciarSesion = (e) => {
    e.preventDefault();

    if (!formLogin.reportValidity()) {
        return;
    }

    const credenciales = {
        correo: document.querySelector("#login-email").value.trim().toLowerCase(),
        contraseña: document.querySelector("#login-password").value,
    };

    const usuario = obtenerUsuarios().find((u) => {
        const mismoCorreo = u.correo.toLowerCase() === credenciales.correo;
        const mismaContraseña = u.contraseña === credenciales.contraseña;
        return mismoCorreo && mismaContraseña;
    });

    if (!usuario) {
        document.querySelector("#login-status").textContent = "Correo o contraseña incorrectos.";
        document.querySelector("#login-status").hidden = false;
        return;
    }

    const sesion = {
        nombre: usuario.nombre,
    };

    guardarDatos("rutau_sesion_actual", sesion);

    window.location.href = "../viajes/buscar_viaje.html";
};

if (formLogin) {
    formLogin.addEventListener("submit", iniciarSesion);
}

// ==== MOSTRAR USUARIO ====
const mostrarUsuario = () => {
    const headerActions = document.getElementById("header-actions");
    const helpUserActions = document.getElementById("help-user-actions");
    const helpNav = document.getElementById("help-nav");

    if (!headerActions || !helpUserActions || !helpNav) {
        return;
    }

    const sesion = leerDatos("rutau_sesion_actual", null);

    if (!sesion) {
        headerActions.style.display = "";
        helpUserActions.style.display = "none";
        helpNav.style.display = "none";
        return;
    }

    headerActions.style.display = "none";
    helpUserActions.style.display = "";
    helpNav.style.display = "";

    const greeting = document.querySelector(".help-greeting");
    if (greeting) {
        greeting.textContent = `¡Hola, ${sesion.nombre}!`;
    }
};

mostrarUsuario();