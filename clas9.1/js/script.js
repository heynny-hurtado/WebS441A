
const nombreProducto = "Cristal Galáctico";
const precioProducto = 100;
const cantidadDisponible = 20;
const permitidoExportar = true;

const salidaEjercicio1 = [
    "--- Ejercicio 1: Variables y Tipos de Datos ---",
    `Nombre del producto: ${nombreProducto}`,
    `Precio: ${precioProducto} créditos`,
    `Cantidad en inventario: ${cantidadDisponible}`,
    `¿Permitido exportar?: ${permitidoExportar}`
].join("\n");

console.log(salidaEjercicio1);
document.querySelector("#exercise-1-output").textContent = salidaEjercicio1;


// DATOS DE LA TIENDA: ARRAY DE OBJETOS
const productos = [
    {
        id: 1,
        nombre: "Cristal Galáctico",
        precio: 100,
        stock: 20,
        categoria: "Minerales",
        exportable: true,
        emoji: "💎"
    },
    {
        id: 2,
        nombre: "Combustible Estelar",
        precio: 80,
        stock: 15,
        categoria: "Combustible",
        exportable: false,
        emoji: "🛢️"
    },
    {
        id: 3,
        nombre: "Casco Espacial",
        precio: 250,
        stock: 8,
        categoria: "Equipamiento",
        exportable: true,
        emoji: "🪖"
    },
    {
        id: 4,
        nombre: "Robot Explorador",
        precio: 400,
        stock: 12,
        categoria: "Robótica",
        exportable: true,
        emoji: "🤖"
    }
];


// MÓDULO 3: BUCLES Y ARRAYS
function mostrarInventario() {
    const listaInventario = document.querySelector("#inventory-list");
    const contenedorProductos = document.querySelector("#product-list");
    const selectorProducto = document.querySelector("#billing-product");

    listaInventario.replaceChildren();
    contenedorProductos.replaceChildren();
    selectorProducto.replaceChildren();

    // Recorremos el array con un bucle for.
    for (let i = 0; i < productos.length; i++) {
        const producto = productos[i];

        const item = document.createElement("li");
        const nombre = document.createElement("strong");
        const stock = document.createElement("span");

        nombre.textContent = producto.nombre;
        stock.textContent = `Stock: ${producto.stock}`;
        item.append(nombre, stock);
        listaInventario.append(item);

        const tarjeta = document.createElement("article");
        tarjeta.className = "product-card";

        const emoji = document.createElement("span");
        emoji.className = "product-emoji";
        emoji.setAttribute("aria-hidden", "true");
        emoji.textContent = producto.emoji;

        const titulo = document.createElement("h3");
        titulo.textContent = producto.nombre;

        const categoria = document.createElement("p");
        categoria.className = "product-category";
        categoria.textContent = producto.categoria;

        const pieTarjeta = document.createElement("div");
        pieTarjeta.className = "product-bottom";

        const precio = document.createElement("span");
        precio.className = "product-price";
        precio.textContent = `${producto.precio} créditos`;

        const etiquetaStock = document.createElement("span");
        etiquetaStock.className = "stock-label";
        etiquetaStock.textContent = `${producto.stock} unidades`;
        if (producto.stock <= 5) {
            etiquetaStock.classList.add("low-stock");
        }

        pieTarjeta.append(precio, etiquetaStock);
        tarjeta.append(emoji, titulo, categoria, pieTarjeta);
        contenedorProductos.append(tarjeta);

        const opcion = document.createElement("option");
        opcion.value = producto.id;
        opcion.textContent = `${producto.nombre} — ${producto.precio} créditos`;
        selectorProducto.append(opcion);

        console.log(`Producto: ${producto.nombre} | Stock: ${producto.stock}`);
    }

    const salidaEjercicio3 = [
        "--- Ejercicio 3: Inventario de productos ---",
        ...productos.map(producto =>
            `Producto: ${producto.nombre} | Stock: ${producto.stock}`
        )
    ].join("\n");

    document.querySelector("#exercise-3-output").textContent = salidaEjercicio3;
}

mostrarInventario();


// MÓDULO 2: ESTRUCTURAS CONDICIONALES Y FACTURACIÓN
function calcularFactura(producto, cantidad, clienteDeOtroPlaneta) {
    if (!Number.isInteger(cantidad) || cantidad <= 0) {
        return { correcta: false, mensaje: "Escribe una cantidad entera mayor que cero." };
    }

    if (cantidad > producto.stock) {
        return {
            correcta: false,
            mensaje: `Stock insuficiente. Solo quedan ${producto.stock} unidades.`
        };
    }

    if (!producto.exportable && clienteDeOtroPlaneta) {
        return {
            correcta: false,
            mensaje: "Compra denegada: este producto no está permitido para exportación."
        };
    }

    const subtotal = producto.precio * cantidad;
    const descuento = cantidad > 5 ? subtotal * 0.10 : 0;
    const total = subtotal - descuento;

    return {
        correcta: true,
        subtotal,
        descuento,
        total,
        mensaje: [
            `Producto: ${producto.nombre}`,
            `Cantidad: ${cantidad}`,
            `Subtotal: ${subtotal} créditos`,
            `Descuento: ${descuento} créditos`,
            `TOTAL: ${total} créditos`
        ].join("\n")
    };
}

document.querySelector("#billing-form").addEventListener("submit", function (evento) {
    evento.preventDefault();

    const idProducto = Number(document.querySelector("#billing-product").value);
    const cantidad = Number(document.querySelector("#billing-quantity").value);
    const clienteDeOtroPlaneta = document.querySelector("#off-world-customer").checked;
    const producto = productos.find(item => item.id === idProducto);
    const resultado = document.querySelector("#billing-result");

    if (!producto) {
        resultado.textContent = "No se encontró el producto seleccionado.";
        resultado.classList.add("error");
        return;
    }

    const factura = calcularFactura(producto, cantidad, clienteDeOtroPlaneta);
    resultado.textContent = factura.mensaje;
    resultado.classList.toggle("error", !factura.correcta);
});

const ejemploFactura = calcularFactura(productos[0], 6, false);
const salidaEjercicio2 = [
    "--- Ejercicio 2: Sistema de Facturación ---",
    ejemploFactura.mensaje
].join("\n");
console.log(salidaEjercicio2);
document.querySelector("#exercise-2-output").textContent = salidaEjercicio2;


// MÓDULO 4: FUNCIONES
function calcularTotal(precio, cantidad) {
    return precio * cantidad;
}

function actualizarStock(stockActual, cantidadComprada) {
    if (cantidadComprada <= 0 || cantidadComprada > stockActual) {
        return stockActual;
    }

    return stockActual - cantidadComprada;
}

const totalEjemplo = calcularTotal(100, 3);
const stockEjemplo = actualizarStock(20, 3);
const salidaEjercicio4 = [
    "--- Ejercicio 4: Funciones ---",
    `Total de la compra: ${totalEjemplo} créditos`,
    `Nuevo stock: ${stockEjemplo}`
].join("\n");

console.log(salidaEjercicio4);
document.querySelector("#exercise-4-output").textContent = salidaEjercicio4;


// MÓDULO 5: OBJETOS Y CLASES (PROGRAMACIÓN ORIENTADA A OBJETOS)
class ProductoEspacial {
    constructor(nombre, precio, stock, categoria) {
        this.nombre = nombre;
        this.precio = precio;
        this.stock = stock;
        this.categoria = categoria;
    }

    vender(cantidad) {
        if (!Number.isInteger(cantidad) || cantidad <= 0) {
            return "Venta no realizada: la cantidad debe ser un entero positivo.";
        }

        if (cantidad > this.stock) {
            return `Venta no realizada: solo quedan ${this.stock} unidades de ${this.nombre}.`;
        }

        this.stock = actualizarStock(this.stock, cantidad);
        const totalRecaudado = calcularTotal(this.precio, cantidad);

        return [
            `Producto vendido: ${this.nombre}`,
            `Categoría: ${this.categoria}`,
            `Unidades vendidas: ${cantidad}`,
            `Dinero recaudado: ${totalRecaudado} créditos`,
            `Stock restante: ${this.stock}`
        ].join("\n");
    }
}

const productoClase1 = new ProductoEspacial("Cristal Galáctico", 100, 20, "Minerales");
const productoClase2 = new ProductoEspacial("Casco Espacial", 250, 10, "Equipamiento");

const venta1 = productoClase1.vender(3);
const venta2 = productoClase2.vender(2);

const salidaEjercicio5 = [
    "--- Ejercicio 5: Objetos y Clases ---",
    venta1,
    "",
    venta2
].join("\n");

console.log(salidaEjercicio5);
document.querySelector("#exercise-5-output").textContent = salidaEjercicio5;
