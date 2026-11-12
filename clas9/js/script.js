
/* CLASES Y OBJETOS */
// Esta clase sirve para crear los productos de mi tienda.
class ProductoEspacial {
    //creaamos el constructor de nuestros productos
    constructor(nombre, precio, stock, exportable) {
        this.nombre = nombre;
        this.precio = precio;
        this.stock = stock;
        this.exportable = exportable;
    }

    // Esta función sirve para vender productos.
    vender(cantidad) {

        // Revisa si hay suficientes productos.
        if (this.stock >= cantidad) {

            // Calculo el total de la compra.
            let total = this.calcularTotal(cantidad);

            // Resto los productos que se vendieron.
            this.stock -= cantidad;

            // Muestro el mensaje de la venta.
            imprimirEnConsola(`VENTA EXITOSA: Se vendieron ${cantidad} unidades de ${this.nombre}. Total: ${total} créditos. Stock restante: ${this.stock}`);

            // Actualizo los productos en pantalla.
            actualizarInterfaz();

        } else {
            // Aviso si no hay suficiente stock.
            imprimirEnConsola(`❌ ERROR: No hay suficiente stock de ${this.nombre}. Solicitado: ${cantidad}, Disponible: ${this.stock}`);
        }
    }

    /* Esta función calcula el precio y aplica el descuento. */
    calcularTotal(cantidad) {

        // Multiplica el precio por la cantidad.
        let totalBruto = this.precio * cantidad;

        // Aplica el 10% de descuento si compra más de 5.
        if (cantidad > 5) {
            totalBruto = totalBruto * 0.9;
        }

        // Devuelvo el total.
        return totalBruto;
    }
}


/* Arreglos */
// Aquí guardo los productos de mi tienda.
const inventario = [
    new ProductoEspacial("Cristales de Litio", 150, 10, true),
    new ProductoEspacial("Raciones de Plasma", 45, 25, true),
    new ProductoEspacial("Combustible Antimateria", 500, 3, false)
];


/* ACTUALIZAR LA INTERFAZ */
// Esta función muestra los productos en la página.
function actualizarInterfaz() {

    // Busco el contenedor de los productos en el HTML.
    const contenedor = document.getElementById("contenedor-productos");

    // Limpio el contenido anterior.
    contenedor.innerHTML = "";

    // Recorro todos los productos del inventario.
    for (let i = 0; i < inventario.length; i++) {

        // Obtengo el producto actual.
        const prod = inventario[i];

        // Muestro los datos de cada producto en una tarjeta.
        contenedor.innerHTML += `
            <div class="card">
                <h3>${prod.nombre}</h3>
                <p><strong>Precio:</strong> ${prod.precio} 🪙</p>
                <p><strong>Stock:</strong> ${prod.stock} uds</p>
                <p><strong>Exportable:</strong> ${prod.exportable ? '✅ Sí' : '🚫 No'}</p>
            </div>
        `;
    }
}


/* SIMULAR VENTAS */
// Esta función busca el producto que quiero comprar.
function simularVenta(nombreProducto, cantidad) {

    // Busco el producto por su nombre.
    const producto = inventario.find(p => p.nombre === nombreProducto);

    // Si existe, realizo la venta.
    if (producto) {
        producto.vender(cantidad);
    }
}


// Esta función muestra los mensajes en pantalla.
function imprimirEnConsola(mensaje) {

    // Busca la consola del HTML.
    const consola = document.getElementById("consola-web");

    // Agrega el mensaje a la consola.
    consola.innerHTML += `> ${mensaje}<br>`;

    // Bajo automáticamente hasta el último mensaje.
    consola.scrollTop = consola.scrollHeight;
}

// Muestro los productos al cargar la página.
actualizarInterfaz();
