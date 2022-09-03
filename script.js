let monto, moneda, monedaDevolucion

const uru = 1
let dolar = 40
let euro = 41.82
let arg = 0.22
let real = 7.7
/* const libra = 48.8
const franco = 41.6 */

traerCotizaciones()

setInterval(()=>{
   traerCotizaciones()
}, 60000)

class Producto {
    constructor(nombre, descripcion, precio, stock, imagen) {
        this.nombre = nombre
        this.descripcion = descripcion
        this.stock = stock
        this.precio = precio
        this.imagen = imagen
        
    }
   
}

let p1 = new Producto ("Latest Album", "Album", 1, 450, "../images/album.jpg")
let p2 = new Producto ("Black Hoddie", "Clothes", 1, 120, "../images/black-hoodie.jpg")
let p3 = new Producto ("Original Sinname", "CD", 1, 220, "../images/originalCD.jpg")
let p4 = new Producto ("White T-shirt", "Clothes", 1, 12, "../images/white-Tshirt.jpg")
let p5 = new Producto ("Ring with band logo", "Jewllery", 1, 25, "../images/ring.jpg")
let p6 = new Producto ("Black and white necklace", "Jewllery", 1, 33, "../images/necklace.jpg")
let p7 = new Producto ("Sinname Hat", "Clothes", 1, 8, "../images/hat.webp")
let p8 = new Producto ("Grey Jacket", "Clothes", 1, 95, "../images/jacket.jpg")

let productosStock = [p1, p2, p3, p4, p5, p6, p7, p8]
let productosCarrito = []

if(localStorage.getItem('productosStock')) {
    tareas = JSON.parse(localStorage.getItem('productosStock'))
} else {
    localStorage.setItem('productosStock', JSON.stringify(productosStock))
}
/* 
const formProductos = document.getElementById("formProductos")

const botonProductos = document.getElementById("botonProductos") */

const divProductosCarrito = document.getElementById("divProductosCarrito")
const btnCarrito = document.getElementById("btnCarrito")
/* const btnAgregar = document.getElementById("btnAgregar") */

/* productosStock.forEach((producto, indice) => {
    let botonAgregar = document.getElementById(`producto${indice}`).lastElementChild.lastElementChild
    botonAgregar.addEventListener ('click', () =>{
        divProductosCarrito.innerHTML += `
            <div id="producto${indice}">
                <img src="${producto.imagen}" alt="Album">
                <p> ${producto.nombre} </p>
                <strong>"$${producto.precio}"</strong>
                <button> QUITAR DEL CARRITO </button>
            </div>
        `
        productosCarrito.push(producto)
    })
})
 */
btnCarrito.addEventListener('click', () => {
    let arrayStorage = JSON.parse(localStorage.getItem('productosStock'))
    divProductosCarrito.innerHTML = ""
    arrayStorage.forEach((producto, indice) => {
        divProductosCarrito.innerHTML += `
            <div id="producto${indice}">
                <img src="${producto.imagen}" alt="Album">
                <p> ${producto.nombre} </p>
                <strong>"$${producto.precio}"</strong>
                <button> QUITAR DEL CARRITO </button>
            </div>
        `
    });

    arrayStorage.forEach((producto, indice) => {
        let botonEliminar = document.getElementById(`producto${indice}`).lastElementChild.lastElementChild
        botonEliminar.addEventListener('click', () => {
            document.getElementById(`producto${indice}`).remove()
            productosStock.splice(indice,1)
            localStorage.setItem('productos', JSON.stringify(productos))
            Swal.fire (`${producto.nombre} ha sido eliminado del sistema exitosamente`)
        })
    })
})

botonProductos.addEventListener('click', () => {
    let arrayStorage = JSON.parse(localStorage.getItem('empleados'))
    divEmpleados.innerHTML = ""
    arrayStorage.forEach((empleado, indice) => {
        
        divEmpleados.innerHTML += `
        <div class="card border-dark mb-3" id="empleado${indice}" style="max-width: 20rem; margin:4px;">
            <div class="card-header"><h2>${empleado.nombre} ${empleado.apellido}</h2></div>
            <div class="card-body">
                <p class="card-title">${empleado.fechaNac}</p>
                <p class="card-title">${empleado.puesto}</p>
                <p class="card-title">${empleado.salario}</p>
                <button class="btn btn-danger">Dar de baja Empleado</button>
                
            </div>
        </div>

        `
    });

    arrayStorage.forEach((empleado, indice) => {
        let botonEliminar = document.getElementById(`empleado${indice}`).lastElementChild.lastElementChild
        botonEliminar.addEventListener('click', () => {
            document.getElementById(`empleado${indice}`).remove()
            empleados.splice(indice,1)
            localStorage.setItem('empleados', JSON.stringify(empleados))
            Swal.fire (`${empleado.nombre} ${empleado.apellido} ha sido eliminado del sistema exitosamente`)
        })
    })
})


formProductos.addEventListener('submit', (e) => {
    e.preventDefault()
    
    let datForm = new FormData(e.target)
    let producto = new Producto(datForm.get('nombre'), datForm.get('descripcion'), datForm.get('precio'), datForm.get('stock'))
    productos.push(producto)
    localStorage.setItem('productos', JSON.stringify(productos))
    Swal.fire (`${producto.nombre} ha sido ingresado al sistema exitosamente`)
    formProductos.reset()
})

botonAtenderCliente.addEventListener("click", () => {
    divClientes.innerHTML += `
        <form id="formClientes">

            <div class="mb-3">
                <label for="montoCambiar" class="form-label">Ingrese la cantidad de dinero que desea cambiar</label>
                <input type="number" class="form-control" id="montoCambiar" name="monto"> 
            </div>
            <div class="mb-3">
                <label for="monedaCliente" class="form-label">Ingrese tipo de moneda de su dinero</label>
                <label> Elija el tipo de moneda del dinero que usted tiene, ingrese 1 para peso argentino, 2-peso uruguayo, 3-dólar, 4-euro, 5-real, 6-libra esterlina, 7-franco suizo </label>
                <input type="number" class="form-control" id="monedaCliente" name="monedaC">
            </div>
            <div class="mb-3">
                <label for="monedaDevolucion" class="form-label">Ingrese tipo de moneda en que desea su cambio</label>
                <label> ¿A qué moneda desea que le cambiemos su dinero? Ingrese 1 para peso argentino, 2-peso uruguayo, 3-dólares, 4-euro, 5-real, 6-libra esterlina, 7-franco suizo </label>
                <input type="number" class="form-control" id="monedaDevolucion" name="monedaD">
            </div>

            <button type="submit" class="btn btn-primary">Efectuar Cambio</button>

        </form>

        `
        formClientes.addEventListener('submit', (e) => {
            e.preventDefault()
            
            let datForm = new FormData(e.target)
          
            let monedaCli = parseInt(datForm.get("monedaC"))
            let mon = parseInt(datForm.get("monto"))
            let monedaDev = parseInt(datForm.get("monedaD"))
            
            monto = cambioMoneda (mon, monedaCli)
            calcularDevolucion (monto,monedaDev)
        })
});

function validarDatos (monto, moneda,monedaDevolucion){
    if ((monto > 0) && (monedaDevolucion > 0) && (moneda > 0) && (moneda < 8) && (monedaDevolucion < 8) && (moneda != monedaDevolucion)){
        
        return false // TODO OK, PUEDE CONTINUAR EL TRAMITE
    }else {
        alert ("Ingrese opciones válidas")
        return true // VUELVE A PEDIR DATOS
    }
}

function cambioMoneda (monto, moneda){
  
    switch (moneda){
        case 1:
            //peso argentino
            Swal.fire ("Usted entregó " + (monto) + " pesos argentinos")
            monto = monto * arg
            break
        case 2:
            //peso uruguayo
            Swal.fire ("Usted entregó " + (monto) + " pesos uruguayos")
            monto = monto * uru
            break
        case 3:
            //dolar
            Swal.fire ("Usted entregó " + (monto) + " dólares")
            monto = monto * dolar
            break
        case 4:
            //euro
            Swal.fire ("Usted entregó " + (monto) + " euros")
            monto = monto * euro
            break
        case 5:
            //real
             
            Swal.fire ("Usted entregó " + (monto) + " reales")
            monto = monto * real
            break
        /* case 6:
            //libra
            console.log ("Usted entregó " + (monto) + " libras esterlinas")
            monto = monto * libra
            break
        case 7:
            //franco
            Swal.fire ("Usted entregó " + (monto) + " francos suizos")
            monto = monto * franco
            break */
        default:
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Número de moneda no válido!',
                footer: '<a href="">Why do I have this issue?</a>'
              })
            break
    }
    return monto
}
   
function calcularDevolucion (monto,monedaDevolucion){

    switch(monedaDevolucion){
        case 1:
            //peso argentino
           monto = monto / arg
           Swal.fire ("Le devolvemos $ " + parseInt(monto) + " pesos argentinos")
            break
        case 2:
            //peso uruguayo
            monto = monto / uru 
            Swal.fire ("Le devolvemos $ " + parseInt(monto) + " pesos uruguayos")
            break
        case 3:
            //dolar
            monto = monto / dolar
            Swal.fire ("Le devolvemos $ " + monto + " dolares")
            break
        case 4:
            //euro
            monto = monto / euro
            Swal.fire ("Le devolvemos $ " + parseInt(monto) + " euros")
            break
        case 5:
            //real
            monto = monto / real
            Swal.fire ("Le devolvemos $ " + parseInt(monto) + " reales")
            break
        /* case 6:
            //libra
            monto = monto / libra
            Swal.fire ("Le devolvemos $ " + parseInt(monto) + " libras esterlinas")
            break
        case 7:
            //franco
            monto = monto / franco
            Swal.fire ("Le devolvemos $ " + parseInt(monto) + " francos suizos")
            break */
        default:
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Número de moneda no válido!',
                footer: '<a href="">Why do I have this issue?</a>'
              })
            break
    }
}

function traerCotizaciones(){
    fetch ("https://cotizaciones-brou.herokuapp.com/api/currency/latest")
    .then(response => response.json())
    .then(({rates}) => {
        arg = (rates.ARS.sell + rates.ARS.buy) / 2
        dolar = (rates.USD.sell + rates.USD.buy) / 2
        real = (rates.BRL.sell + rates.BRL.buy) / 2
        euro = (rates.EUR.sell + rates.EUR.buy) / 2
    })
}