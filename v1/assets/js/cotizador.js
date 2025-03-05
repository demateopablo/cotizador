document.addEventListener("DOMContentLoaded", () => {
    setTimeout(() => {
        document.body.classList.add("visible");
    }, 100); // Esperamos 100ms antes de iniciar el fade-in
    const productosLista = document.getElementById("productos-lista");
    const totalPrecio = document.getElementById("total-precio");
    const fechaCotizacion = document.getElementById("fecha");

    // Establecer la fecha actual en la cotización
    const fechaActual = new Date();
    fechaCotizacion.textContent = fechaActual.toLocaleDateString("es-AR");

    // Recuperar el carrito desde LocalStorage
    const carrito = JSON.parse(localStorage.getItem("cart")) || [];

    if (carrito.length === 0) {
        productosLista.innerHTML = `<tr><td colspan="4" style="text-align: center;">No hay productos en la cotización.</td></tr>`;
        totalPrecio.textContent = "$0.00";
        return;
    }

    let totalGeneral = 0;

    carrito.forEach(producto => {
        const fila = document.createElement("tr");

        // Cálculo del total por producto
        const totalProducto = producto.precio * producto.cantidad;
        totalGeneral += totalProducto;

        fila.innerHTML = `
            <td>${producto.nombre}</td>
            <td>${producto.cantidad}</td>
            <td>$${producto.precio.toFixed(2)}</td>
            <td>$${totalProducto.toFixed(2)}</td>
        `;

        productosLista.appendChild(fila);
    });

    // Mostrar total de la cotización
    totalPrecio.textContent = `$${totalGeneral.toFixed(2)}`;
});

const volver = document.getElementById("volver");
volver.addEventListener("click", () => {
    localStorage.removeItem("cart");// Borra el carrito en LocalStorage
    window.location.href = "index.html"; // Redirige a la página de cotización
});

const descargarPDFBtn = document.getElementById("descargarPDF");
descargarPDFBtn.addEventListener("click", () => {
    window.print();
});