class Usuario {
    constructor(nombre, pass, id) {
        this.nombre = nombre
        this.pass = pass
        this.id = id
    }
}

let usuarios_login = [
    new Usuario('admin', 'admin', 5421),
    new Usuario('dani', 'dani.4455', 2321),
    new Usuario('diego', 'xdz.345', 8567)
]

localStorage.setItem('usuarios', JSON.stringify(usuarios_login))

//? traemosraemos la informacion de local storage

let usuarios_verificados = JSON.parse(localStorage.getItem('usuarios'))

// Tenemos que traer el formulario del DOM

let formulario = document.querySelector('form')

// Evento por defecto del formulario

formulario.addEventListener('submit', (evt) => {
    evt.preventDefault() // con esto evitamos que se resetee

    // Tomamos los datos del usuario
    let nombre = formulario[0].value
    let pass = formulario[1].value

    // Ver si el usuario esta en la base de datos
    let usuario = usuarios_verificados.find((usuario) => {
        return usuario.nombre == nombre && usuario.pass == pass
    })
    if (usuario) {
        // Toastify
        toastifyPositivo(`Usuario y contraseña correctas 🤩`);
        setTimeout(() => {
            location.href = 'index.html';
        }, 1550);

    } else {
        // Toastify
        toastifyNegativo(
            `El usuario o la contraseña no son correctos 🤔`)
    }
})

//? Funcion toastify positivo
function toastifyPositivo(mensaje) {
    Toastify({
        text: mensaje,
        duration: 5000,
        gravity: 'bottom',
        style: {
            background: 'linear-gradient(to right, #7BA67C, #4FAA53)',
        },
    }).showToast();
}

//? Funcion toastify negativo
function toastifyNegativo(mensaje) {
    Toastify({
        text: mensaje,
        duration: 5000,
        gravity: 'bottom',
        style: {
            background: 'linear-gradient(to right, #755150, #E53935)',
        },
    }).showToast();
}