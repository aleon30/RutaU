const formRegistro = document.querySelector("#register-form");

const obtenerUsuarios = () => {
    return leerDatos("rutau_lista_usuarios");
};

const crearUsuario = (usuario) => {
    const usuarios = obtenerUsuarios();
    usuarios.push(usuario);
    guardarDatos("rutau_lista_usuarios", usuarios);
};

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
    const estadoRegistro = document.querySelector("#register-status");

    if (usuarios.some((u) => u.correo.toLowerCase() === usuario.correo)) {
        estadoRegistro.textContent = "Este correo ya está registrado.";
        estadoRegistro.hidden = false;
        return;
    }

    crearUsuario(usuario);
    window.location.href = "login.html";
}

if (formRegistro) {
    formRegistro.addEventListener("submit", registrarUsuario);
}