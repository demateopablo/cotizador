/* // Fecha de cotización automática
document.getElementById("fecha-cotizacion").value = new Date().toLocaleDateString(); */

// Cargar productos desde LocalStorage
const productos = JSON.parse(localStorage.getItem("cart")) || [
    {
        quantity: 1,
        name: "-",
        description: "Sin elementos seleccionados",
        price: 0.00,
    }
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
    <td>${producto.description===undefined?``:`${producto.description}`}</td>
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

const num_cotizacion = document.getElementById("num_cotizacion");
// Descargar PDF
const download_button = document.getElementById("download-pdf");
download_button.addEventListener("click", () => {
    download_button.classList.add('hidden');
    const element = document.getElementById("cotizacion");    
    const options = {
        margin: 0,
        filename: `Cotizacion ${num_cotizacion.value}.pdf`,
        image: { type: "jpeg", quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: "pt", format: "a4", orientation: "portrait" },
    };
    
    html2pdf().from(element).set(options).save();
    setTimeout(() => {
        download_button.classList.remove('hidden');
    }, 1000);
});
