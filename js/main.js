
//? PRODUCTOS: Definicion del stock inicial de herrajes.

var html_base = `<table border='1|1'>
<tr>
    <td>ID</td>
    <td>Herraje</td>
    <td>Stock</td>
</tr>
`

//? Clase Constructora del Objeto Herraje
class Herraje {
    constructor(nombre, stock) {
        this.id = set_id++
        this.nombre = nombre
        this.stock = stock
    }
}

let set_id = 1


//? Objeto Herrajes, Inventario inicial

let herrajes = [
    new Herraje('Argolla 2cm Dorado', 8),
    new Herraje('Argolla 2.5cm Dorado', 42),
    new Herraje('Argolla 3.2cm Dorado', 44),
    new Herraje('Cuadro 2cm Dorado', 2),
    new Herraje('Cuadro 2.5cm Dorado', 37),
    new Herraje('Media Argolla 1cm Dorado', 20),
    new Herraje('Media Argolla 1.5cm Dorado', 27),
    new Herraje('Media Argolla 2cm Dorado', 69),
    new Herraje('Media Argolla 2.5cm Dorado', 80),
    new Herraje('Mosqueton 2cm Dorado', 7),
    new Herraje('Mosqueton 2.5cm Dorado', 13),
    new Herraje('Pasador 1cm Dorado', 13),
    new Herraje('Pasador 1.5cm Dorado', 42),
    new Herraje('Pasador 2cm Dorado', 52),
    new Herraje('Pasador 2.5cm Dorado', 67),
    new Herraje('Argolla de llavero 2.5cm Dorado', 8),
    new Herraje('Mosqueton de llavero 2cm Dorado', 11),
    new Herraje('Argolla 2cm Plateado', 14),
    new Herraje('Argolla 2.5cm Plateado', 36),
    new Herraje('Argolla 3.2cm Plateado', 29),

]
const herrajes_og = JSON.parse(JSON.stringify(herrajes));

//? Definicion del sistema como metodo constructor

class Sistema {
    constructor(herrajes) {
        this.herrajes = herrajes;
    }

    //? Funcion 1: Agregar nuevo herraje al inventario, Se declara como un metodo dentro de la la clase contructora.
    nuevoHerraje() {
        let nombre = document.getElementById("herraje1").value;
        let stock = document.getElementById("stock1").value;
        mensajesReset()
        updatePokemon()
        if (nombre == "" || stock == "" || stock < 0 || Number.isInteger(parseInt(nombre)) || nombre.length > 20 || nombre.length < 7) {
            if (nombre.length > 20 || nombre.length < 7) {
                document.getElementById("msg_1").textContent = "El nombre debe tener entre 7 y 20 caracteres";

                // Toastify
                toastifyNegativo(`Herraje no agregado por catidad de caracteres 😑
                    Intenta de nuevo por favor.`)
                limpiarInputs()
            } else {
                document.getElementById("msg_1").textContent = "Ingresa datos validos por favor";
                toastifyNegativo(`Los datos que ingresaste no son validos 😑
                Intenta de nuevo por favor.`)
                limpiarInputs()
            }
        } else {
            this.herrajes.push(new Herraje(nombre, stock))
            mostrarTabla(herrajes);
            actualizarTabla(herrajes)
            limpiarInputs()
            mensajesReset()
            document.getElementById("msg_1").textContent = "Herraje agregado satisfactoriamente";

            // Toastify
            toastifyPositivo(`Herraje agregado satisfactoriamente 😁`)

        }
    }
}


//? SISTEMA: Definicion de las funciones principales del sistema.
let sistema_stock = new Sistema(herrajes)


// //? Funcion 2: Mostrar tabla en la consola para usar en el debug
function mostrarTabla(datos) {
    // console.clear();
    // console.table(datos);
}
mostrarTabla(herrajes)
let contador = 1;
updatePokemon()

//? Funcion 3: Buscar herrajes.
function filtrarHerrajes(herraje) {
    let busqueda = document.getElementById("busqueda1").value;
    const result = herrajes.filter((herraje) => herraje.nombre.toLowerCase().includes(busqueda.toLocaleLowerCase()));
    mostrarTabla(result);
    actualizarTabla(result)
    mensajesReset()
    updatePokemon()

    if (result.length == 0) {
        // alert(`La busqueda de ${busqueda} arrojo 0 resultados`);
        document.getElementById("table").innerHTML = html_base
        document.getElementById("msg_3").textContent = `La busqueda de ${busqueda} arrojo 0 resultados`;

        // Toastify
        toastifyNegativo(
            `La busqueda no ha dado resultados 🤔
            Intenta de nuevo por favor.`)
    } else {
        // console.log(`Se encontraron ${result.length} herrajes`);
        document.getElementById("msg_3").textContent = `Se encontraron ${result.length} herrajes`;
        limpiarInputs()
        // Toastify
        toastifyPositivo(`Se encontraron ${result.length} resultados 😁`)
    }
}

//? Funcion 4: Agregar incidencia, modificar inventario.
function agregarIncidencia(herrajes) {
    let id_herraje = document.getElementById("id1").value;
    let cantidad = parseInt(document.getElementById("stock2").value, 10);
    let idExists = herrajes.some(herraje => herraje.id == id_herraje);
    updatePokemon()

    if (idExists) {
        herrajes[id_herraje - 1].stock = herrajes[id_herraje - 1].stock + cantidad;
        mostrarTabla(herrajes);
        actualizarTabla(herrajes)
        limpiarInputs()
        mensajesReset()
        document.getElementById("msg_4").textContent = "Stock actualizado satisfactoriamente";

        cantidad < 0 ? toastifyPositivo(`Se han restado ${Math.abs(cantidad)} items del herraje "${herrajes[id_herraje - 1].nombre}"`) : toastifyPositivo(`Se han agregado ${cantidad} items del herraje "${herrajes[id_herraje - 1].nombre}"`);

        // if (cantidad < 0) {
        //     toastifyPositivo(`Se han restado ${Math.abs(cantidad)} items del herraje "${herrajes[id_herraje - 1].nombre}"`)
        // } else {
        //     toastifyPositivo(`Se han agregado ${cantidad} items del herraje "${herrajes[id_herraje - 1].nombre}"`)
        // }

    } else {
        document.getElementById("msg_4").textContent = "ID no encontrado";
        limpiarInputs()
        // Toastify
        toastifyNegativo(`No se ha encontrado el ID que buscas 😑
                        Intenta de nuevo por favor.`)
    }



}

//? Funcion 5: Mostrar stock bajo
function stockBajo(herrajes) {
    let busqueda = parseInt(document.getElementById("stock_bajo1").value, 10);
    const result = herrajes.filter((herraje) => herraje.stock <= busqueda);
    mostrarTabla(result);
    actualizarTabla(result)
    mensajesReset()
    updatePokemon()
    if (result.length == 0) {
        document.getElementById("msg_5").textContent = `La busqueda de stock menor o igual a ${busqueda} arrojo 0 resultados`;
        document.getElementById("table").innerHTML = html_base
        // Toastify
        toastifyNegativo(
            `El filtro no ha dado resultados 🤔
            Intenta cambiar el stock minimo.`)


    } else {
        document.getElementById("msg_5").textContent = `Se encontraron ${result.length} herrajes`;
        // Toastify
        toastifyPositivo(
            `Se encontraron ${result.length} herrajes por debajo del stock minimo 😁`)
    }
    limpiarInputs()
}

//? Funcion 6: Eliminar herraje
function eliminarHerraje(herrajes) {
    let id_herraje = parseInt(document.getElementById("id2").value, 10);
    updatePokemon()
    if (isNaN(id_herraje)) {
        document.getElementById("msg_2").textContent = "Por favor ingresa un ID";
        // Toastify
        toastifyNegativo(
            `El ID está vacío 🤔`)
        limpiarInputs()
        mensajesReset()
    } else {
        const herrajeID = herrajes.find((herraje) => herraje.id === id_herraje)
        const index = herrajes.indexOf(herrajeID);
        mensajesReset()
        if (index === -1) {
            document.getElementById("msg_2").textContent = `No se encontro el herraje con ID ${id_herraje}`;
            // console.log(`No se encontro el herraje con ID ${id_herraje}`);
            // Toastify
            toastifyNegativo(
                `No se ha encontrado el ID que buscas 😑
                Intenta de nuevo por favor.`)
            limpiarInputs()
            return;
        } else {
            herrajes.splice([index], 1);
            mostrarTabla(herrajes);
            actualizarTabla(herrajes)
            document.getElementById("msg_2").textContent = "Herraje eliminado satisfactoriamente";
            // Toastify
            toastifyPositivo(
                `El herraje ${id_herraje} se ha eliminado satisfactoriamente 😁`)
            limpiarInputs()
        }
        limpiarInputs()
    }
}

//? Funcion 7: Regenerar IDs
function idReset(herrajes) {
    mensajesReset()
    updatePokemon()
    for (let i = 0; i < herrajes.length; i++) {
        herrajes[i].id = i + 1;
    }
    // mostrarTabla(herrajes);
    actualizarTabla(herrajes)
    document.getElementById("msg_6").textContent = "IDs de Herrajes reseteados satisfactoriamente";
    // Toastify
    toastifyPositivo(
        `Los IDs han sido reseteados satisfactorimente 😁`)
}

//? Funcion 8: Regresar al inventario original inicial
function inventarioOriginal() {
    // Hacer una copia profunda del inventario original y reasignarlo
    herrajes.length = 0;  // Vacía el array actual
    // Copiar los valores desde herrajes_og al array herrajes
    herrajes.push(...herrajes_og);
    // Actualizar la tabla para reflejar los cambios
    idReset(herrajes)
    actualizarTabla(herrajes);
    mensajesReset()
    updatePokemon()
    document.getElementById("msg_7").textContent = "Tabla reseteada a parametros iniciales";
    // Toastify
    toastifyPositivo(
        `La tabla ha sido regresada a su estado original 😁`)

}

// //? Funcion 9: Resetear Display Inventario
function inventarioReset(herrajes) {
    updatePokemon()
    mensajesReset()
    actualizarTabla(herrajes)
    // Toastify
    toastifyPositivo(
        `Se ha quitado el filtro de busqueda 😁`)
}

//? Funcion 10: Actualizar tabla en el HTML usando el DOM
function actualizarTabla(array) {
    let html = html_base;
    for (let i = 0; i < array.length; i++) {
        html += '<tr>';
        html += '<td>' + array[i].id + '</td>';
        html += '<td>' + array[i].nombre + '</td>';
        html += '<td>' + array[i].stock + '</td>';
        html += '</tr>';
    }
    document.getElementById("table").innerHTML = html
}

//? Funcion 14: Vaciar Local Storage
function vaciarLocal() {
    localStorage.clear();
    mensajesReset()
    updatePokemon()
    document.getElementById("msg_9").textContent = "Local Storage eliminado";
    // Toastify
    toastifyPositivo(
        `El Local Storage ha sido eliminado 😁`)
}


actualizarTabla(herrajes)

//? Guardando los botones del DOM

let boton_agregar = document.getElementById("boton_agregar")
let boton_buscar = document.getElementById("boton_buscar")
let boton_modificar_stock = document.getElementById("boton_modificar_stock")
let boton_stock_bajo = document.getElementById("boton_stock_bajo")
let boton_id_reset = document.getElementById("boton_id_reset")
let boton_reset = document.getElementById("boton_reset")
let boton_guardar_local = document.getElementById("boton_guardar_local")
let boton_eliminar_local = document.getElementById("boton_eliminar_local")
let boton_cargar_local = document.getElementById("boton_cargar_local")

//? Agregando event listeners a los botones

boton_agregar.addEventListener('click', () => { sistema_stock.nuevoHerraje() })
boton_buscar.addEventListener('click', () => { filtrarHerrajes(herrajes) })
boton_modificar_stock.addEventListener('click', () => { agregarIncidencia(herrajes) })
boton_stock_bajo.addEventListener('click', () => { stockBajo(herrajes) })
boton_eliminar.addEventListener('click', () => { eliminarHerraje(herrajes) })
boton_id_reset.addEventListener('click', () => { idReset(herrajes) })
boton_reset.addEventListener('click', () => { inventarioOriginal(herrajes) })
boton_resetear_busqueda.addEventListener('click', () => { inventarioReset(herrajes) })
boton_resetear_filtro.addEventListener('click', () => { inventarioReset(herrajes) })
boton_guardar_local.addEventListener('click', () => { guardarLocal() })
boton_eliminar_local.addEventListener('click', () => { vaciarLocal() })
boton_cargar_local.addEventListener('click', () => { cargarLocal() })


//? Funcion 11: Limpiar todos los inputs
function limpiarInputs() {
    document.getElementById("herraje1").value = "";
    document.getElementById("stock1").value = "";
    document.getElementById("busqueda1").value = "";
    document.getElementById("id1").value = "";
    document.getElementById("stock2").value = "";
    document.getElementById("stock_bajo1").value = "";
    document.getElementById("id2").value = "";
}

//? Funcion 12: Resetear todos los mensajes
function mensajesReset() {
    document.getElementById("msg_1").textContent = "Ingrese nombre y Stock";
    document.getElementById("msg_2").textContent = "Ingrese ID de Herraje a eliminar";
    document.getElementById("msg_3").textContent = "Ingrese busqueda";
    document.getElementById("msg_4").textContent = "Ingrese el ID y la cantidad a sumar o restar";
    document.getElementById("msg_5").textContent = "Ingrese el nivel de stock a revisar";
    document.getElementById("msg_6").textContent = "";
    document.getElementById("msg_7").textContent = "";
    document.getElementById("msg_8").textContent = "";
    document.getElementById("msg_9").textContent = "";
    document.getElementById("msg_10").textContent = "";
}

//? Funcion 13: Guardar en local storage
function guardarLocal() {
    let inventarioJSON = JSON.stringify(herrajes);
    localStorage.setItem("inventario", inventarioJSON);
    mensajesReset()
    updatePokemon()
    document.getElementById("msg_8").textContent = "Inventario guardado en Local Storage";
    // Toastify
    toastifyPositivo(
        `El inventario actual se ha guardado en el Local Storage 😁`)

}


//? Funcion 15: Cargar Local Storage
function cargarLocal() {
    updatePokemon()
    herrajes.length = 0;
    let inventarioJSON = localStorage.getItem("inventario");
    let inventario = JSON.parse(inventarioJSON);
    if (inventario == null) {
        mensajesReset()
        document.getElementById("msg_10").textContent = "Local Storage vacío";
        // Toastify
        toastifyNegativo(
            `El Local Storage se encuentra vacío 🤔`)

        return;
    } else {
        herrajes.push(...inventario);
        actualizarTabla(herrajes);
        mensajesReset()
        document.getElementById("msg_10").textContent = "Inventario cargado desde Local Storage";
        // Toastify
        toastifyPositivo(
            `El inventario se ha cargado desde Local Storage 😁`)
    }
}


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


//? Funcion que actualiza las imagenes de pokemon 

function updatePokemon() {
    document.getElementsByClassName('pokeimg')[0].src = ""
    document.getElementsByClassName('pokeimg')[1].src = ""
    fetch(`https://pokeapi.co/api/v2/pokemon/${contador}`)
        .then((response) => response.json())
        .then((datos) => renderPokemon(datos))
        .catch((error) => console.log(error))
    contador++
}

function renderPokemon(datos) {
    {
        document.getElementsByClassName('pokeimg')[0].src = datos.sprites.front_default
        document.getElementsByClassName('pokeimg')[1].src = datos.sprites.front_default
    }
}
