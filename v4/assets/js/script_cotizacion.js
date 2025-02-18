/* // Fecha de cotización automática
document.getElementById("fecha-cotizacion").value = new Date().toLocaleDateString(); */

// Cargar productos desde LocalStorage
const productos = JSON.parse(localStorage.getItem("cart")) || [
    {
        cantidad: 1,
        producto: "SPECIAL 3 AIR DRILL",
        descripcion: "45 abresurcos a 21 cm - Sistema doble disco, rodados duales.",
        precioUnitario: 182350.0,
    },
    {
        cantidad: 1,
        producto: "12000 AIR CART",
        descripcion: "Tolva de 12.000 lts (60%-40%) - Motores eléctricos y sistema hidráulico.",
        precioUnitario: 83544.0,
    },
];

// Renderizar productos en la tabla
const tbody = document.querySelector("#productos-table tbody");
let subtotal = 0;

productos.forEach((producto) => {
    const total = producto.quantity * producto.price;
    subtotal += total;

    const row = document.createElement("tr");
    row.innerHTML = `
    <td>${producto.quantity}</td>
    <td>${producto.name}</td>
    <td>${producto.description}</td>
    <td>$${producto.price.toFixed(2)}</td>
    <td>${total.toFixed(2)}</td>
  `;
    tbody.appendChild(row);
});

// Calcular totales
const iva = subtotal * 0.105;
const total = subtotal + iva;

document.getElementById("subtotal").textContent = subtotal.toFixed(2);
document.getElementById("iva").textContent = iva.toFixed(2);
document.getElementById("total").textContent = total.toFixed(2);

// Descargar PDF
document.getElementById("download-pdf").addEventListener("click", () => {
    const element = document.getElementById("cotizacion");
/*     const num_cotizacion = document.getElementbyId("num_cotizacion"); */

    const options = {
        margin: 0,
        filename: `cotizacion.pdf`,
        image: { type: "jpeg", quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: "pt", format: "a4", orientation: "portrait" },
    };

    html2pdf().from(element).set(options).save();
});
