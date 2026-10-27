// =========================================
// VYY'S - Inicio de sesión y registro
// Nota: es un login del lado del cliente (sin servidor), pensado para el
// proyecto del curso. No es seguro para producción.
// =========================================

// Usuarios base (los 3 integrantes)
const USUARIOS = [
    { usuario: "yohelito",   correo: "yohel@vyys.cr",   clave: "Yohel2026*",   nombre: "Yohel Garita" },
    { usuario: "valeska", correo: "valeska@vyys.cr", clave: "Valeska2026*", nombre: "Valeska Guevara" },
    { usuario: "yulissa", correo: "yulissa@vyys.cr", clave: "Yulissa2026*", nombre: "Yulissa Miranda" }
];

const CLAVE_SESION = "vyys_sesion";
const CLAVE_REGISTRADOS = "vyys_usuarios";

// ---------- Usuarios registrados (se guardan en el navegador) ----------
function obtenerRegistrados() {
    try {
        const datos = localStorage.getItem(CLAVE_REGISTRADOS);
        return datos ? JSON.parse(datos) : [];
    } catch (e) {
        return [];
    }
}

function todosLosUsuarios() {
    return USUARIOS.concat(obtenerRegistrados());
}

function existeUsuario(usuario, correo) {
    const u = usuario.trim().toLowerCase();
    const c = correo.trim().toLowerCase();
    return todosLosUsuarios().some(function (x) {
        return x.usuario === u || x.correo === c;
    });
}

function registrarUsuario(datos) {
    const lista = obtenerRegistrados();
    const nuevo = {
        usuario: datos.usuario.trim().toLowerCase(),
        correo: datos.correo.trim().toLowerCase(),
        clave: datos.clave,
        nombre: datos.nombre.trim()
    };
    lista.push(nuevo);
    try {
        localStorage.setItem(CLAVE_REGISTRADOS, JSON.stringify(lista));
    } catch (e) {
        return null;
    }
    return nuevo;
}

// ---------- Sesión ----------
function obtenerSesion() {
    try {
        const datos = sessionStorage.getItem(CLAVE_SESION);
        return datos ? JSON.parse(datos) : null;
    } catch (e) {
        return null;
    }
}

function guardarSesion(u) {
    try {
        sessionStorage.setItem(CLAVE_SESION, JSON.stringify({
            usuario: u.usuario,
            nombre: u.nombre
        }));
    } catch (e) {}
}

// Se puede entrar con el usuario o con el correo
function iniciarSesion(identificador, clave) {
    const buscado = identificador.trim().toLowerCase();
    const encontrado = todosLosUsuarios().find(function (u) {
        return (u.usuario === buscado || u.correo === buscado) && u.clave === clave;
    });
    if (!encontrado) {
        return null;
    }
    guardarSesion(encontrado);
    return encontrado;
}

function cerrarSesion() {
    try {
        sessionStorage.removeItem(CLAVE_SESION);
    } catch (e) {}
    window.location.href = "login.html";
}

// ---------- Protección de páginas ----------
const esPublica = /(login|registro)\.html$/i.test(window.location.pathname);
const sesion = obtenerSesion();

if (!sesion && !esPublica) {
    window.location.replace("login.html");
} else if (sesion && esPublica) {
    window.location.replace("index.html");
}

document.addEventListener("DOMContentLoaded", function () {
    // ---------- Menú: botón de cerrar sesión ----------
    const lista = document.getElementById("listaMenu");
    if (sesion && lista) {
        const li = document.createElement("li");
        li.className = "item-sesion";
        const enlace = document.createElement("a");
        enlace.href = "#";
        enlace.textContent = "Cerrar sesión (" + sesion.nombre.split(" ")[0] + ")";
        enlace.addEventListener("click", function (e) {
            e.preventDefault();
            cerrarSesion();
        });
        li.appendChild(enlace);
        lista.appendChild(li);
    }

    // ---------- Formulario de login ----------
    const form = document.getElementById("formLogin");
    if (form) {
        const campoUsuario = document.getElementById("loginUsuario");
        const campoClave = document.getElementById("loginClave");
        const errorLogin = document.getElementById("errorLogin");
        const verClave = document.getElementById("verClave");

        verClave.addEventListener("change", function () {
            campoClave.type = verClave.checked ? "text" : "password";
        });

        [campoUsuario, campoClave].forEach(function (campo) {
            campo.addEventListener("input", function () {
                errorLogin.textContent = "";
                campoUsuario.classList.remove("error");
                campoClave.classList.remove("error");
            });
        });

        form.addEventListener("submit", function (event) {
            event.preventDefault();

            if (campoUsuario.value.trim() === "" || campoClave.value === "") {
                errorLogin.textContent = "Escriba su usuario y su contraseña.";
                if (campoUsuario.value.trim() === "") campoUsuario.classList.add("error");
                if (campoClave.value === "") campoClave.classList.add("error");
                return;
            }

            const ok = iniciarSesion(campoUsuario.value, campoClave.value);
            if (!ok) {
                errorLogin.textContent = "Usuario o contraseña incorrectos.";
                campoUsuario.classList.add("error");
                campoClave.classList.add("error");
                campoClave.value = "";
                return;
            }
            window.location.href = "index.html";
        });
    }

    // ---------- Formulario de registro ----------
    const formReg = document.getElementById("formRegistro");
    if (formReg) {
        const ids = ["regNombre", "regCorreo", "regUsuario", "regClave", "regClave2"];

        function mostrarErr(id, texto) {
            document.getElementById("error-" + id).textContent = texto;
            document.getElementById(id).classList.add("error");
        }
        function limpiarErr(id) {
            document.getElementById("error-" + id).textContent = "";
            document.getElementById(id).classList.remove("error");
        }

        ids.forEach(function (id) {
            document.getElementById(id).addEventListener("input", function () {
                limpiarErr(id);
            });
        });

        document.getElementById("verClaveReg").addEventListener("change", function (e) {
            const tipo = e.target.checked ? "text" : "password";
            document.getElementById("regClave").type = tipo;
            document.getElementById("regClave2").type = tipo;
        });

        formReg.addEventListener("submit", function (event) {
            event.preventDefault();
            ids.forEach(limpiarErr);

            const nombre = document.getElementById("regNombre").value.trim();
            const correo = document.getElementById("regCorreo").value.trim();
            const usuario = document.getElementById("regUsuario").value.trim();
            const clave = document.getElementById("regClave").value;
            const clave2 = document.getElementById("regClave2").value;
            let valido = true;

            if (nombre.length < 3 || !nombre.includes(" ")) {
                mostrarErr("regNombre", "Escriba su nombre y apellido.");
                valido = false;
            }

            if (correo === "") {
                mostrarErr("regCorreo", "Debe escribir su correo electrónico.");
                valido = false;
            } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo)) {
                mostrarErr("regCorreo", "El correo no tiene un formato válido.");
                valido = false;
            }

            if (!/^[a-zA-Z0-9_]{3,20}$/.test(usuario)) {
                mostrarErr("regUsuario", "Use de 3 a 20 letras, números o guion bajo.");
                valido = false;
            }

            if (clave.length < 8 || !/[a-zA-Z]/.test(clave) || !/\d/.test(clave)) {
                mostrarErr("regClave", "Mínimo 8 caracteres, con letras y números.");
                valido = false;
            }

            if (clave2 !== clave) {
                mostrarErr("regClave2", "Las contraseñas no coinciden.");
                valido = false;
            }

            if (!valido) {
                return;
            }

            if (existeUsuario(usuario, correo)) {
                mostrarErr("regUsuario", "Ese usuario o correo ya está registrado.");
                return;
            }

            const nuevo = registrarUsuario({
                nombre: nombre,
                correo: correo,
                usuario: usuario,
                clave: clave
            });
            if (!nuevo) {
                mostrarErr("regUsuario", "Su navegador no permite guardar la cuenta.");
                return;
            }

            guardarSesion(nuevo);
            window.location.href = "index.html";
        });
    }
});
