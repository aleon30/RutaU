const CLAVE_VIAJES = "rutau_lista_viajes";
const formularioPublicacion = document.querySelector("#trip-publish-form");
const resultadosViajes = document.querySelector("#search-results");
const formularioFiltros = document.querySelector("#trip-filters");
const detalleViaje = document.querySelector("#details-layout");
const controlesReserva = document.querySelector("#reservation-controls");
const estadoReserva = document.querySelector("#reservation-status");
const botonReservarViaje = document.querySelector("#reserve-button");
const botonCancelarReserva = document.querySelector("#cancel-reservation-button");
const dialogoCancelarReserva = document.querySelector("#cancel-reservation-dialog");
const botonMantenerReserva = document.querySelector("#keep-reservation-button");
const botonConfirmarCancelacion = document.querySelector("#confirm-cancel-reservation");
let idViajeDetalle = null;
let usuarioReservaActual = null;

const viajesIniciales = [
    {
        id: 1,
        origin: "UPC Monterrico",
        destination: "UPC Villa",
        date: "2026-02-08",
        departureTime: "10:45",
        arrivalTime: "11:30",
        seats: 2,
        totalSeats: 5,
        price: 34,
        driverName: "Luciana Vargas Paredes",
        university: "UPC",
        driverTrips: 27,
        driverRating: "4.95",
        vehicleModel: "Toyota Corolla",
        vehicleColor: "Blanco",
        licensePlate: "ANX-766",
    },
    {
        id: 2,
        origin: "UNMSM",
        destination: "UNI",
        date: "2026-01-09",
        departureTime: "16:00",
        arrivalTime: "16:45",
        seats: 4,
        totalSeats: 5,
        price: 67,
        driverName: "Valeria Fernandez Salazar",
        university: "UNMSM",
        driverTrips: 18,
        driverRating: "4.88",
        vehicleModel: "Kia Sportage",
        vehicleColor: "Gris",
        licensePlate: "XYZ-789",
    },
    {
        id: 3,
        origin: "PUCP",
        destination: "UNMSM",
        date: "2025-12-17",
        departureTime: "00:10",
        arrivalTime: "00:50",
        seats: 3,
        totalSeats: 5,
        price: 14,
        driverName: "Nicolas Torres Rojas",
        university: "PUCP",
        driverTrips: 12,
        driverRating: "4.76",
        vehicleModel: "Hyundai Elantra",
        vehicleColor: "Negro",
        licensePlate: "DEF-456",
    },
    {
        id: 4,
        origin: "UNMSM",
        destination: "ULIMA",
        date: "2026-09-08",
        departureTime: "11:30",
        arrivalTime: "12:15",
        seats: 1,
        totalSeats: 5,
        price: 39,
        driverName: "Camila Rojas Mendoza",
        university: "UNMSM",
        driverTrips: 21,
        driverRating: "4.91",
        vehicleModel: "Mazda 3",
        vehicleColor: "Rojo",
        licensePlate: "GHT-321",
    },
    {
        id: 5,
        origin: "UTP",
        destination: "UCV",
        date: "2026-09-20",
        departureTime: "09:00",
        arrivalTime: "10:00",
        seats: 4,
        totalSeats: 8,
        price: 24,
        driverName: "Diego Martinez Vargas",
        university: "UTP",
        driverTrips: 27,
        driverRating: "4.95",
        vehicleModel: "Toyota Yaris",
        vehicleColor: "Plata",
        licensePlate: "JKS-654",
    },
    {
        id: 6,
        origin: "UPC San Isidro",
        destination: "UPC San Miguel",
        date: "2026-02-17",
        departureTime: "15:30",
        arrivalTime: "16:20",
        seats: 3,
        totalSeats: 8,
        price: 26,
        driverName: "Sofia Navarro Campos",
        university: "UPC",
        driverTrips: 15,
        driverRating: "4.83",
        vehicleModel: "Honda Civic",
        vehicleColor: "Azul",
        licensePlate: "LMN-987",
    },
];

const obtenerViajes = () => {
    const viajesGuardados = localStorage.getItem(CLAVE_VIAJES);
    const viajes = viajesGuardados === null
        ? viajesIniciales.map((viaje) => ({ ...viaje }))
        : leerDatos(CLAVE_VIAJES, []);

    if (!Array.isArray(viajes)) {
        throw new TypeError("La lista guardada de viajes no es válida.");
    }

    if (viajesGuardados === null) {
        guardarDatos(CLAVE_VIAJES, viajes);
    }

    return viajes;
};

const normalizarTexto = (valor) => valor
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();

const formatearFecha = (fecha) => {
    const valor = new Date(`${fecha}T00:00:00`);
    return Number.isNaN(valor.getTime())
        ? fecha
        : valor.toLocaleDateString("en-US", {
            month: "short",
            day: "2-digit",
            year: "numeric",
        });
};

const formatearHora = (hora) => {
    const [horas, minutos] = hora.split(":").map(Number);
    const valor = new Date(2000, 0, 1, horas, minutos);

    return Number.isNaN(valor.getTime())
        ? hora
        : valor.toLocaleTimeString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
        });
};

const crearElemento = (etiqueta, clase, texto) => {
    const elemento = document.createElement(etiqueta);
    if (clase) elemento.className = clase;
    if (texto !== undefined) elemento.textContent = texto;
    return elemento;
};

const crearIcono = (ruta) => {
    const imagen = document.createElement("img");
    imagen.src = ruta;
    imagen.alt = "";
    return imagen;
};

const textoAsientos = (viaje) => {
    if (viaje.totalSeats) {
        return `${viaje.seats} de ${viaje.totalSeats} disponibles`;
    }

    return `${viaje.seats} asiento${Number(viaje.seats) === 1 ? "" : "s"} disponibles`;
};

const formatearPrecio = (precio) => Number(precio).toLocaleString("en-US", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
});

const crearTarjetaViaje = (viaje) => {
    const tarjeta = crearElemento("article", "trip-card card");
    tarjeta.dataset.origin = viaje.origin;
    tarjeta.dataset.destination = viaje.destination;
    tarjeta.dataset.date = viaje.date;
    tarjeta.dataset.time = viaje.departureTime;
    tarjeta.dataset.seats = String(viaje.seats);
    tarjeta.dataset.price = String(viaje.price);

    const ruta = crearElemento("h2", "card-title", `${viaje.origin} → ${viaje.destination}`);
    const detalles = crearElemento("div", "trip-details");
    const fecha = crearElemento("span", "trip-date");
    fecha.append(
        crearElemento("span", "", formatearFecha(viaje.date)),
        crearIcono("../../img/trip-calendar.svg")
    );

    const hora = crearElemento("span", "trip-time");
    hora.append(
        crearElemento("span", "", formatearHora(viaje.departureTime)),
        crearIcono("../../img/trip-clock-a.svg")
    );

    const detallesLink = crearElemento("a", "trip-link", "Ver detalles del viaje");
    detallesLink.href = `detalles_viaje.html?id=${encodeURIComponent(viaje.id)}`;

    detalles.append(
        fecha,
        hora,
        crearElemento("span", "", textoAsientos(viaje)),
        crearElemento("span", "", `Precio: S/ ${formatearPrecio(viaje.price)}`),
        detallesLink
    );
    tarjeta.append(ruta, detalles);

    return tarjeta;
};

const obtenerRangoPrecio = (valor) => {
    const cantidades = valor.match(/\d+(?:[.,]\d+)?/g);
    if (!cantidades) return null;

    const precios = cantidades.map((cantidad) => Number(cantidad.replace(",", ".")));
    return precios.length > 1
        ? { minimo: Math.min(...precios), maximo: Math.max(...precios) }
        : { minimo: precios[0], maximo: precios[0] };
};

const obtenerIdentidadReserva = () => {
    const sesion = leerDatos("rutau_sesion_actual", null);
    if (!sesion) return null;

    if (typeof sesion.correo === "string" && sesion.correo.trim()) {
        return {
            correo: sesion.correo.trim().toLowerCase(),
            nombre: [sesion.nombre, sesion.apellido]
                .filter((parte) => typeof parte === "string" && parte.trim())
                .join(" "),
        };
    }

    if (typeof sesion.nombre !== "string" || !sesion.nombre.trim()) {
        return null;
    }

    const usuarios = leerDatos("rutau_lista_usuarios", []);
    if (!Array.isArray(usuarios)) {
        throw new TypeError("La lista guardada de usuarios no es válida.");
    }

    const coincidencias = usuarios.filter((usuario) =>
        typeof usuario.nombre === "string"
        && typeof usuario.correo === "string"
        && usuario.correo.trim()
        && normalizarTexto(usuario.nombre) === normalizarTexto(sesion.nombre)
    );

    if (coincidencias.length !== 1) return null;

    const usuario = coincidencias[0];
    const sesionCompleta = {
        ...sesion,
        correo: usuario.correo,
        nombre: usuario.nombre,
        apellido: usuario.apellido,
    };
    guardarDatos("rutau_sesion_actual", sesionCompleta);

    return {
        correo: usuario.correo.trim().toLowerCase(),
        nombre: [usuario.nombre, usuario.apellido]
            .filter((parte) => typeof parte === "string" && parte.trim())
            .join(" "),
    };
};

const obtenerReservasDeViaje = (viaje) => {
    if (viaje.reservations === undefined) return [];
    if (!Array.isArray(viaje.reservations)) {
        throw new TypeError("Las reservas guardadas para el viaje no son válidas.");
    }

    return viaje.reservations;
};

const mostrarMensajeReserva = (mensaje, estado) => {
    if (!controlesReserva || !estadoReserva) return;

    controlesReserva.classList.remove("is-reserved", "is-cancelled", "is-error");
    if (estado === "success") {
        controlesReserva.classList.add("is-reserved");
    } else if (estado === "cancelled" || estado === "error") {
        controlesReserva.classList.add(`is-${estado}`);
    }

    estadoReserva.className = "reservation-status";
    if (estado) estadoReserva.classList.add(`is-${estado}`);
    estadoReserva.textContent = mensaje;
    estadoReserva.hidden = !mensaje;
};

const actualizarControlesReserva = (viaje) => {
    if (!controlesReserva || !estadoReserva || !botonReservarViaje || !botonCancelarReserva) {
        return;
    }

    controlesReserva.classList.remove("is-reserved", "is-cancelled", "is-error");
    mostrarMensajeReserva("", "");
    botonReservarViaje.hidden = false;
    botonReservarViaje.disabled = false;
    botonReservarViaje.textContent = "Reservar viaje";
    botonCancelarReserva.hidden = true;

    if (!usuarioReservaActual) {
        botonReservarViaje.hidden = true;
        mostrarMensajeReserva(
            "No pudimos identificar tu cuenta. Inicia sesión nuevamente.",
            "error"
        );
        return;
    }

    const reservas = obtenerReservasDeViaje(viaje);
    const reservaPropia = reservas.find((reserva) =>
        reserva
        && typeof reserva.email === "string"
        && reserva.email.trim().toLowerCase() === usuarioReservaActual.correo
    );
    const asientosDisponibles = Number(viaje.seats);
    const quedanAsientos = Number.isFinite(asientosDisponibles) && asientosDisponibles > 0;

    if (reservaPropia?.active) {
        controlesReserva.classList.add("is-reserved");
        botonReservarViaje.hidden = true;
        botonCancelarReserva.hidden = false;
        mostrarMensajeReserva("¡Viaje reservado exitosamente!", "success");
        return;
    }

    if (reservaPropia && !reservaPropia.active) {
        controlesReserva.classList.add("is-cancelled");
        botonReservarViaje.hidden = !quedanAsientos;
        if (quedanAsientos) botonReservarViaje.textContent = "Reservar nuevamente";
        mostrarMensajeReserva(
            quedanAsientos
                ? "Viaje cancelado."
                : "Viaje cancelado. No quedan asientos disponibles.",
            "cancelled"
        );
        return;
    }

    if (!quedanAsientos) {
        botonReservarViaje.hidden = true;
        mostrarMensajeReserva("No hay asientos disponibles para este viaje.", "error");
    }
};

const mostrarPasajeros = (viaje) => {
    const pasajeros = document.querySelector("#passenger-list");
    const reservasActivas = obtenerReservasDeViaje(viaje)
        .filter((reserva) => reserva?.active);

    if (reservasActivas.length === 0) {
        pasajeros.replaceChildren(crearElemento("li", "", "Aún no hay pasajeros."));
        return;
    }

    pasajeros.replaceChildren(...reservasActivas.map((reserva) => {
        const pasajero = crearElemento("li");
        pasajero.append(crearElemento("span", "", reserva.name || reserva.email));
        return pasajero;
    }));
};

const aplicarFiltros = () => {
    const origen = normalizarTexto(document.querySelector("#filter-origin").value);
    const destino = normalizarTexto(document.querySelector("#filter-destination").value);
    const fecha = document.querySelector("#filter-date").value;
    const hora = document.querySelector("#filter-time").value;
    const asientos = Number(document.querySelector("#filter-seats").value || 0);
    const rangoPrecio = obtenerRangoPrecio(document.querySelector("#filter-price").value);
    const tarjetas = [...resultadosViajes.querySelectorAll(".trip-card")];
    let visibles = 0;

    tarjetas.forEach((tarjeta) => {
        const coincide = normalizarTexto(tarjeta.dataset.origin || "").includes(origen)
            && normalizarTexto(tarjeta.dataset.destination || "").includes(destino)
            && (!fecha || tarjeta.dataset.date === fecha)
            && (!hora || (tarjeta.dataset.time || "").startsWith(hora))
            && (!asientos || Number(tarjeta.dataset.seats) >= asientos)
            && (!rangoPrecio || (
                Number(tarjeta.dataset.price) >= rangoPrecio.minimo
                && Number(tarjeta.dataset.price) <= rangoPrecio.maximo
            ));

        tarjeta.hidden = !coincide;
        if (coincide) visibles += 1;
    });

    const estadoVacio = document.querySelector("#search-empty-state");
    if (estadoVacio) estadoVacio.hidden = visibles > 0;

    const estadoFiltros = formularioFiltros.querySelector(".filter-status");
    const hayFiltros = Boolean(origen || destino || fecha || hora || asientos || rangoPrecio);
    if (estadoFiltros) {
        estadoFiltros.hidden = !hayFiltros;
        estadoFiltros.textContent = `${visibles} viaje${visibles === 1 ? "" : "s"} encontrado${visibles === 1 ? "" : "s"}.`;
    }
};

const inicializarBusqueda = () => {
    obtenerViajes().forEach((viaje) => resultadosViajes.append(crearTarjetaViaje(viaje)));

    const parametros = new URLSearchParams(location.search);
    const valoresIniciales = {
        "filter-origin": parametros.get("desde") || parametros.get("origin"),
        "filter-destination": parametros.get("hacia") || parametros.get("destination"),
        "filter-date": parametros.get("fecha") || parametros.get("date"),
    };

    Object.entries(valoresIniciales).forEach(([id, valor]) => {
        if (valor) document.getElementById(id).value = valor;
    });

    const botonFiltros = document.querySelector("#filter-toggle");
    botonFiltros.addEventListener("click", () => {
        const expandido = botonFiltros.getAttribute("aria-expanded") === "true";
        botonFiltros.setAttribute("aria-expanded", String(!expandido));
        formularioFiltros.hidden = expandido;
    });

    formularioFiltros.addEventListener("submit", (evento) => {
        evento.preventDefault();
        aplicarFiltros();
    });

    aplicarFiltros();
};

const publicarViaje = (evento) => {
    evento.preventDefault();
    if (!formularioPublicacion.reportValidity()) return;

    const viajes = obtenerViajes();
    const ids = viajes.map((viaje) => Number(viaje.id)).filter(Number.isSafeInteger);
    const viaje = {
        id: Math.max(0, ...ids) + 1,
        origin: document.querySelector("#trip-origin").value.trim(),
        destination: document.querySelector("#trip-destination").value.trim(),
        date: document.querySelector("#trip-date").value,
        departureTime: document.querySelector("#trip-departure-time").value,
        arrivalTime: document.querySelector("#trip-arrival-time").value,
        seats: Number(document.querySelector("#trip-seats").value),
        price: Number(document.querySelector("#trip-price").value),
        driverName: document.querySelector("#trip-driver-name").value.trim(),
        university: document.querySelector("#trip-university").value.trim(),
        vehicleModel: document.querySelector("#trip-vehicle-model").value.trim(),
        vehicleColor: document.querySelector("#trip-vehicle-color").value.trim(),
        licensePlate: document.querySelector("#trip-license-plate").value.trim(),
    };

    viajes.push(viaje);
    guardarDatos(CLAVE_VIAJES, viajes);
    location.href = "buscar_viaje.html";
};

const mostrarDetalleViaje = () => {
    const id = new URLSearchParams(location.search).get("id");
    if (!id) {
        if (controlesReserva) controlesReserva.hidden = true;
        return;
    }

    idViajeDetalle = id;
    usuarioReservaActual = obtenerIdentidadReserva();
    if (controlesReserva) controlesReserva.hidden = false;

    const viajes = obtenerViajes();
    const viaje = viajes.find((elemento) => String(elemento.id) === id);
    if (!viaje) {
        document.querySelector("#trip-detail-status").hidden = false;
        detalleViaje.hidden = true;
        return;
    }
    detalleViaje.hidden = false;

    const asignarTexto = (selector, texto) => {
        document.querySelector(selector).textContent = texto;
    };

    asignarTexto("#detail-driver-name", viaje.driverName);
    asignarTexto("#detail-driver-university", viaje.university);
    const viajesDelConductor = viajes
        .filter((item) => item.driverName === viaje.driverName).length;
    asignarTexto("#detail-driver-trips", String(viaje.driverTrips ?? viajesDelConductor));
    asignarTexto("#detail-driver-rating", viaje.driverRating || "Sin calificación");
    document.querySelector("#driver-photo").alt = viaje.driverName;

    asignarTexto("#detail-route", `${viaje.origin} → ${viaje.destination}`);
    asignarTexto("#detail-date", formatearFecha(viaje.date));
    asignarTexto("#detail-departure-time", formatearHora(viaje.departureTime));
    asignarTexto("#detail-arrival-time", formatearHora(viaje.arrivalTime));
    asignarTexto("#detail-seats", textoAsientos(viaje));
    asignarTexto("#detail-price", `S/ ${formatearPrecio(viaje.price)}`);
    asignarTexto("#detail-vehicle-model", viaje.vehicleModel);
    asignarTexto("#detail-vehicle-color", viaje.vehicleColor);
    asignarTexto("#detail-license-plate", viaje.licensePlate);

    actualizarControlesReserva(viaje);
    mostrarPasajeros(viaje);
};

const obtenerDetalleViajeGuardado = () => {
    const viajes = obtenerViajes();
    const indice = viajes.findIndex((viaje) => String(viaje.id) === idViajeDetalle);
    if (indice === -1) return null;

    return { viajes, indice, viaje: viajes[indice] };
};

const reservarAsiento = () => {
    if (!idViajeDetalle || !usuarioReservaActual) {
        mostrarMensajeReserva(
            "No pudimos identificar tu cuenta. Inicia sesión nuevamente.",
            "error"
        );
        return;
    }

    const detalle = obtenerDetalleViajeGuardado();
    if (!detalle) {
        mostrarDetalleViaje();
        return;
    }

    const { viajes, indice, viaje } = detalle;
    const reservas = obtenerReservasDeViaje(viaje);
    const reservaPropia = reservas.find((reserva) =>
        reserva
        && typeof reserva.email === "string"
        && reserva.email.trim().toLowerCase() === usuarioReservaActual.correo
    );
    if (reservaPropia?.active) {
        mostrarDetalleViaje();
        return;
    }

    const asientosDisponibles = Number(viaje.seats);
    if (!Number.isFinite(asientosDisponibles) || asientosDisponibles <= 0) {
        mostrarDetalleViaje();
        return;
    }

    viaje.seats = asientosDisponibles - 1;
    viaje.reservations = reservas;
    if (reservaPropia) {
        reservaPropia.name = usuarioReservaActual.nombre;
        reservaPropia.active = true;
    } else {
        reservas.push({
            email: usuarioReservaActual.correo,
            name: usuarioReservaActual.nombre,
            active: true,
        });
    }

    viajes[indice] = viaje;
    guardarDatos(CLAVE_VIAJES, viajes);
    mostrarDetalleViaje();
};

const solicitarCancelacionReserva = () => {
    const detalle = obtenerDetalleViajeGuardado();
    if (!detalle || !usuarioReservaActual) {
        mostrarDetalleViaje();
        return;
    }

    const reservaActiva = obtenerReservasDeViaje(detalle.viaje).some((reserva) =>
        reserva?.active
        && typeof reserva.email === "string"
        && reserva.email.trim().toLowerCase() === usuarioReservaActual.correo
    );
    if (reservaActiva) dialogoCancelarReserva.showModal();
    else mostrarDetalleViaje();
};

const confirmarCancelacionReserva = () => {
    if (dialogoCancelarReserva.open) dialogoCancelarReserva.close();

    const detalle = obtenerDetalleViajeGuardado();
    if (!detalle || !usuarioReservaActual) {
        mostrarDetalleViaje();
        return;
    }

    const { viajes, indice, viaje } = detalle;
    const reservas = obtenerReservasDeViaje(viaje);
    const reservaActiva = reservas.find((reserva) =>
        reserva?.active
        && typeof reserva.email === "string"
        && reserva.email.trim().toLowerCase() === usuarioReservaActual.correo
    );
    if (!reservaActiva) {
        mostrarDetalleViaje();
        return;
    }

    const asientosDisponibles = Number(viaje.seats);
    const asientosTotales = Number(viaje.totalSeats);
    if (!Number.isFinite(asientosDisponibles)
        || (Number.isFinite(asientosTotales) && asientosDisponibles >= asientosTotales)
    ) {
        mostrarMensajeReserva(
            "No se pudo cancelar la reserva. Actualiza la página e inténtalo nuevamente.",
            "error"
        );
        return;
    }

    viaje.seats = asientosDisponibles + 1;
    reservaActiva.active = false;
    viajes[indice] = viaje;
    guardarDatos(CLAVE_VIAJES, viajes);
    mostrarDetalleViaje();
};

if (detalleViaje
    && botonReservarViaje
    && botonCancelarReserva
    && dialogoCancelarReserva
    && botonMantenerReserva
    && botonConfirmarCancelacion
) {
    botonReservarViaje.addEventListener("click", reservarAsiento);
    botonCancelarReserva.addEventListener("click", solicitarCancelacionReserva);
    botonMantenerReserva.addEventListener("click", () => dialogoCancelarReserva.close());
    botonConfirmarCancelacion.addEventListener("click", confirmarCancelacionReserva);
}

if (formularioPublicacion) {
    const sesion = leerDatos("rutau_sesion_actual", null);
    const conductor = document.querySelector("#trip-driver-name");
    if (sesion?.nombre) conductor.value = sesion.nombre;
    formularioPublicacion.addEventListener("submit", publicarViaje);
}

if (resultadosViajes && formularioFiltros) {
    inicializarBusqueda();
}

if (detalleViaje) {
    mostrarDetalleViaje();
}
