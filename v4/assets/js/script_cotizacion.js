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
    <td>${producto.description === undefined ? `` : `${producto.description}`}</td>
    <td>${producto.price.toLocaleString('es-AR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
    <td>${total.toLocaleString('es-AR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
  `;
    tbody.appendChild(row);
});


// Calcular totales
const iva = subtotal * 0.105;
const total = subtotal + iva;

document.getElementById("subtotal").textContent = subtotal.toLocaleString('es-AR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
document.getElementById("iva").textContent = iva.toLocaleString('es-AR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
document.getElementById("total").textContent = total.toLocaleString('es-AR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

const num_cotizacion = document.getElementById("num_cotizacion");
const goback_button = document.getElementById("go-back");

goback_button.addEventListener("click", () => {
    localStorage.removeItem("cart");// Borra el carrito en LocalStorage
    window.location.href = "index.html"; // Redirige a la página de cotización
});

// Descargar PDF
const download_button = document.getElementById("download-pdf");

//Funcion para exportar a PDF directamente
/* download_button.addEventListener("click", () => {
    download_button.classList.add('hidden');
    const element = document.getElementById("cotizacion");    
    const options = {
        margin: 30,
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
 */

download_button.addEventListener("click", () => {
    download_button.classList.add('hidden');
    goback_button.classList.add('hidden');

    const element = document.getElementById("cotizacion");
    const options = {
        margin: [120, 30, 30, 30], // Margen superior para el encabezado
        filename: `Cotizacion ${num_cotizacion.value}.pdf`,
        html2canvas: { scale: 2 },
        jsPDF: {
            unit: "pt",
            format: "a4",
            orientation: "portrait",
        },
        image: { type: "jpeg", quality: 1.0 }, // Mejorar calidad de imagen
        pagebreak: { mode: ['avoid-all', 'css', 'legacy'] },
    };

    // Función para agregar encabezado y pie de página
    const addHeaderAndFooter = (pdf) => {
        const totalPages = pdf.internal.getNumberOfPages();
        const pageWidth = pdf.internal.pageSize.getWidth();
        const margin = 30;

        for (let i = 1; i <= totalPages; i++) {
            pdf.setPage(i);

            // Encabezado
            pdf.setFontSize(12);
            pdf.setFont("helvetica", "bold");
            pdf.text("Mario Tanzi S.A.", margin, 40);
            pdf.text("San Lorenzo 1630, S2183XAB", margin, 55);
            pdf.text("Arequito, Santa Fe, Argentina", margin, 70);
            pdf.text("Tel: +549 03464 471109", margin, 85);
            pdf.text("Email: ventas@tanzi.com.ar", margin, 100);

            // Logo
            pdf.addImage("./assets/img/logo_tanzi.png", "PNG", pageWidth - 100 - margin, 30, 100, 40);

            // Pie de página
            pdf.setFontSize(10);
            pdf.setFont("helvetica", "normal");
            pdf.text(`Página ${i} de ${totalPages}`, pageWidth - margin - 50, pdf.internal.pageSize.getHeight() - 20);
        }
    };

    // Generar el PDF con encabezados/pies
    html2pdf()
        .from(element)
        .set(options)
        .toPdf()
        .get("pdf")
        .then((pdf) => {
            addHeaderAndFooter(pdf);
        })
        .save()
        .finally(() => {
            setTimeout(() => {
                download_button.classList.remove('hidden');
                goback_button.classList.remove('hidden');
            }, 1000);
        });
});
