# Sitio web VYY'S

Sitio web de **VYY'S**, tienda de ropa casual y semielegante de Costa Rica. Proyecto del II semestre de Programación Web.

> Eslogan: *Elegancia para cada día.*

## Integrantes

| Integrante | Rol en la empresa |
|---|---|
| Yohel Garita | Gerente General |
| Valeska Guevara | Asesora de ventas |
| Yulissa Miranda | Encargada de bodega |

## Descripción

VYY'S vende ropa, calzado y complementos de forma física y virtual, con servicio a domicilio y venta al por mayor para reventa. El sitio presenta la empresa, su catálogo de productos, el sistema de gestión diseñado en el proyecto de Diseño de Software y un formulario de contacto.

## Tecnologías utilizadas

- HTML5 (estructura)
- CSS3 (diseño, Flexbox y diseño responsivo)
- JavaScript (validación de formulario y funcionalidades)
- Git y GitHub (control de versiones)
- Visual Studio Code

## Funcionalidades de JavaScript

1. Validación del formulario de contacto (campos obligatorios, correo y teléfono).
2. Saludo personalizado con el nombre del visitante (opción A).
3. Calculadora de compra con descuento por cantidad e IVA (opciones B y C).
4. Catálogo de 51 productos con filtro por categoría, botón "Ver más" y contador del carrito.
5. Menú desplegable para celulares.
6. Inicio de sesión (login) y registro de usuarios nuevos; las páginas del sitio solo se abren con sesión iniciada.

## Estructura del proyecto

```
ProyectoWeb_VYYS/
├── index.html
├── nosotros.html
├── productos.html
├── contacto.html
├── sistema.html
├── login.html
├── registro.html
├── css/
│   └── estilos.css
├── js/
│   ├── script.js
│   └── auth.js
├── img/
│   ├── logo.png
│   └── fotos de productos (51), hero y capturas del sistema
└── README.md
```

## Cómo abrirlo

Descargar la carpeta y abrir `index.html` en cualquier navegador (si no hay sesión, redirige a `login.html`).

## Usuarios del login

| Usuario | Contraseña | Nombre |
|---|---|---|
| yohel | Yohel2026* | Yohel Garita |
| valeska | Valeska2026* | Valeska Guevara |
| yulissa | Yulissa2026* | Yulissa Miranda |

Cualquier persona nueva puede crear su cuenta en `registro.html` (usuario, correo y contraseña de mínimo 8 caracteres con letras y números). Se puede iniciar sesión con el usuario o con el correo.

> El login y el registro funcionan solo en el navegador (sin servidor) y es para fines del curso: las cuentas nuevas se guardan en el navegador de cada persona y los 3 usuarios base están en `js/auth.js`.

## Colores corporativos

| Color | Código |
|---|---|
| Verde | `#1e3b35` |
| Crema | `#f5f0e6` |
| Dorado | `#b8975a` |
| Rosa | `#d9b8a8` |
