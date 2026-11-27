// Lectura de datos desde el localStorage
const raizProyecto = new URL("../", document.currentScript.src);
const rutasPublicas = new Set([
    raizProyecto.pathname,
    new URL("index.html", raizProyecto).pathname,
    new URL("pages/auth/login.html", raizProyecto).pathname,
    new URL("pages/auth/registro.html", raizProyecto).pathname,
]);
const sesionActual = leerDatos("rutau_sesion_actual", null);
const sesionIniciada = Boolean(
    sesionActual
    && typeof sesionActual.nombre === "string"
    && sesionActual.nombre.trim()
);

if (!rutasPublicas.has(window.location.pathname) && !sesionIniciada) {
    window.location.replace(new URL("pages/auth/login.html", raizProyecto).href);
}

const formRegistro = document.querySelector("#register-form");
const formLogin = document.querySelector("#login-form");
const botonCerrarSesion = document.querySelector("#logout-button");
const formPerfil = document.querySelector("#profile-form");
const campoNombrePerfil = document.querySelector("#profile-first-name");
const campoApellidoPerfil = document.querySelector("#profile-last-name");
const campoCorreoPerfil = document.querySelector("#profile-email");
const botonEditarPerfil = document.querySelector("#edit-profile");
const accionesEdicionPerfil = document.querySelector("#profile-edit-actions");
const botonCancelarPerfil = document.querySelector("#cancel-profile");
const estadoPerfil = document.querySelector("#profile-status");

const cerrarSesion = () => {
    localStorage.removeItem("rutau_sesion_actual");
    location.href = "../../index.html";
};

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
        correo: usuario.correo,
        nombre: usuario.nombre,
        apellido: usuario.apellido,
    };

    guardarDatos("rutau_sesion_actual", sesion);

    window.location.href = "../viajes/buscar_viaje.html";
};

if (formLogin) {
    formLogin.addEventListener("submit", iniciarSesion);
}

if (botonCerrarSesion) {
    botonCerrarSesion.addEventListener("click", cerrarSesion);
}

// ==== PERFIL ====
const normalizarTextoPerfil = (texto) => texto
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLocaleLowerCase()
    .trim();

const buscarUsuarioDeSesion = (sesion, usuarios) => {
    if (typeof sesion.correo === "string" && sesion.correo.trim()) {
        const correoSesion = sesion.correo.trim().toLowerCase();
        return usuarios.find((usuario) =>
            typeof usuario.correo === "string"
            && usuario.correo.trim().toLowerCase() === correoSesion
        ) || null;
    }

    if (typeof sesion.nombre !== "string" || !sesion.nombre.trim()) {
        return null;
    }

    const coincidencias = usuarios.filter((usuario) =>
        typeof usuario.nombre === "string"
        && typeof usuario.correo === "string"
        && usuario.correo.trim()
        && normalizarTextoPerfil(usuario.nombre) === normalizarTextoPerfil(sesion.nombre)
    );

    return coincidencias.length === 1 ? coincidencias[0] : null;
};

const guardarSesionDeUsuario = (usuario) => {
    const sesion = {
        correo: usuario.correo,
        nombre: usuario.nombre,
        apellido: usuario.apellido,
    };
    guardarDatos("rutau_sesion_actual", sesion);
    return sesion;
};

const actualizarCamposPerfil = (sesion) => {
    if (!campoNombrePerfil || !campoApellidoPerfil || !campoCorreoPerfil) {
        return;
    }

    campoNombrePerfil.value = sesion.nombre || "";
    campoApellidoPerfil.value = sesion.apellido || "";
    campoCorreoPerfil.value = sesion.correo || "";
};

const mostrarEstadoPerfil = (mensaje, esError = false) => {
    if (!estadoPerfil) {
        return;
    }

    estadoPerfil.textContent = mensaje;
    estadoPerfil.classList.toggle("is-error", esError);
    estadoPerfil.hidden = !mensaje;
};

const cambiarModoEdicionPerfil = (editar) => {
    if (campoNombrePerfil) campoNombrePerfil.readOnly = !editar;
    if (campoApellidoPerfil) campoApellidoPerfil.readOnly = !editar;
    if (campoCorreoPerfil) campoCorreoPerfil.readOnly = true;
    if (botonEditarPerfil) botonEditarPerfil.hidden = editar;
    if (botonCerrarSesion) botonCerrarSesion.hidden = editar;
    if (accionesEdicionPerfil) accionesEdicionPerfil.hidden = !editar;
};

let usuarioPerfilActual = null;
let sesionPerfilActual = null;

const inicializarPerfil = () => {
    if (!formPerfil || !campoNombrePerfil || !campoApellidoPerfil || !campoCorreoPerfil) {
        return;
    }

    const sesion = leerDatos("rutau_sesion_actual", null);
    if (!sesion) {
        return;
    }

    const usuarios = obtenerUsuarios();
    usuarioPerfilActual = buscarUsuarioDeSesion(sesion, usuarios);

    if (usuarioPerfilActual) {
        sesionPerfilActual = guardarSesionDeUsuario(usuarioPerfilActual);
    } else {
        sesionPerfilActual = sesion;
        if (botonEditarPerfil) botonEditarPerfil.disabled = true;
        mostrarEstadoPerfil(
            "Vuelve a iniciar sesión para cargar y editar todos los datos de tu perfil.",
            true
        );
    }

    actualizarCamposPerfil(sesionPerfilActual);
};

if (formPerfil) {
    inicializarPerfil();

    [campoNombrePerfil, campoApellidoPerfil].forEach((campo) => {
        campo?.addEventListener("input", () => campo.setCustomValidity(""));
    });

    if (botonEditarPerfil) {
        botonEditarPerfil.addEventListener("click", () => {
            mostrarEstadoPerfil("");
            cambiarModoEdicionPerfil(true);
            campoNombrePerfil?.focus();
        });
    }

    if (botonCancelarPerfil) {
        botonCancelarPerfil.addEventListener("click", () => {
            if (sesionPerfilActual) actualizarCamposPerfil(sesionPerfilActual);
            mostrarEstadoPerfil("");
            cambiarModoEdicionPerfil(false);
        });
    }

    formPerfil.addEventListener("submit", (evento) => {
        evento.preventDefault();

        campoNombrePerfil.setCustomValidity(
            campoNombrePerfil.value.trim() ? "" : "Ingresa tus nombres."
        );
        campoApellidoPerfil.setCustomValidity(
            campoApellidoPerfil.value.trim() ? "" : "Ingresa tus apellidos."
        );
        if (!formPerfil.reportValidity()) {
            return;
        }

        if (!usuarioPerfilActual || !sesionPerfilActual) {
            mostrarEstadoPerfil(
                "No se pudo encontrar la cuenta asociada a esta sesión. Inicia sesión nuevamente.",
                true
            );
            return;
        }

        const correoSesion = typeof sesionPerfilActual.correo === "string"
            ? sesionPerfilActual.correo.trim().toLowerCase()
            : "";
        if (!correoSesion) {
            mostrarEstadoPerfil(
                "No se pudo encontrar la cuenta asociada a esta sesión. Inicia sesión nuevamente.",
                true
            );
            return;
        }

        const usuarios = obtenerUsuarios();
        const indiceUsuario = usuarios.findIndex((usuario) =>
            typeof usuario.correo === "string"
            && usuario.correo.trim().toLowerCase()
                === correoSesion
        );

        if (indiceUsuario === -1) {
            mostrarEstadoPerfil(
                "No se pudo guardar el perfil porque la cuenta ya no está disponible.",
                true
            );
            return;
        }

        const usuarioActualizado = {
            ...usuarios[indiceUsuario],
            nombre: campoNombrePerfil.value.trim(),
            apellido: campoApellidoPerfil.value.trim(),
        };
        usuarios[indiceUsuario] = usuarioActualizado;
        guardarDatos("rutau_lista_usuarios", usuarios);

        usuarioPerfilActual = usuarioActualizado;
        sesionPerfilActual = guardarSesionDeUsuario(usuarioActualizado);
        actualizarCamposPerfil(sesionPerfilActual);
        cambiarModoEdicionPerfil(false);
        mostrarEstadoPerfil("Perfil actualizado correctamente.");
        mostrarUsuario();
    });
}

// ==== MOSTRAR USUARIO ====
const nombreParaSaludo = (nombre) => {
    const palabras = nombre.trim().split(/\s+/);
    const normalizarPalabra = normalizarTextoPerfil;

    return palabras.filter((palabra, indice) =>
        indice === 0
        || normalizarPalabra(palabra) !== normalizarPalabra(palabras[indice - 1])
    ).join(" ");
};

const mostrarUsuario = () => {
    const headerActions = document.getElementById("header-actions");
    const helpUserActions = document.querySelectorAll(".help-user-actions");
    const helpNav = document.getElementById("help-nav");
    const sesion = leerDatos("rutau_sesion_actual", null);
    const tieneSesion = Boolean(
        sesion
        && typeof sesion.nombre === "string"
        && sesion.nombre.trim()
    );

    if (!tieneSesion) {
        if (headerActions) headerActions.style.display = "";
        helpUserActions.forEach((acciones) => {
            acciones.style.display = "none";
        });
        if (helpNav) helpNav.style.display = "none";
        return;
    }

    if (headerActions) headerActions.style.display = "none";
    helpUserActions.forEach((acciones) => {
        acciones.style.display = "";
    });
    if (helpNav) helpNav.style.display = "";

    document.querySelectorAll(".help-greeting").forEach((greeting) => {
        greeting.textContent = `¡Hola, ${nombreParaSaludo(sesion.nombre)}!`;
    });
};

mostrarUsuario();