function calcularFecha(dias = 0) {
    const fecha = new Date();
    fecha.setDate(fecha.getDate() + dias);

    const formattedDate = fecha.getFullYear() + '-' +
        String(fecha.getMonth() + 1).padStart(2, '0') + '-' +
        String(fecha.getDate()).padStart(2, '0');

    return formattedDate;
}

document.getElementById("fecha-cotizacion").value = calcularFecha();
document.getElementById("fecha-validez").value = calcularFecha(30);

// Cargar productos desde LocalStorage
const productos = JSON.parse(localStorage.getItem("cart")) || [
    {
        quantity: 0,
        code: 0,
        name: "",
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
    <td>${producto.code}</td>
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

/* download_button.addEventListener("click", () => {
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
        image: { type: "jpg", quality: 1.0 }, // Mejorar calidad de imagen
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
            pdf.setFontSize(10);
            pdf.setFont("helvetica", "bold");
            pdf.text("Gustavo Perez Maquinarias Agrícolas", margin, 40);
            pdf.setFont("helvetica", "normal");
            pdf.text("Av Independencia 993", margin, 53);
            pdf.text("San Cayetano, Argentina", margin, 66);
            pdf.text("Teléfono: +54 9 2983 508989", margin, 79);
            pdf.text("Email: gustavoperez@gmail.com", margin, 92);

            // Logo
            pdf.addImage("./assets/img/logo.png", "PNG", pageWidth - 95 - margin, 30, 100, 40);

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
 */

document.getElementById("download-pdf").addEventListener("click", () => {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF({ orientation: "portrait", unit: "pt", format: "a4" });

    // Función para agregar el encabezado
    const addHeader = (pageNumber, totalPages) => {
        doc.setFont("helvetica", "bold");
        doc.setFontSize(12);
        doc.text("Gustavo Perez Maquinarias Agrícolas", 40, 40);
        doc.setFont("helvetica", "normal");
        doc.setFontSize(10);
        doc.text("Av Independencia 993", 40, 55);
        doc.text("San Cayetano, Argentina", 40, 70);
        doc.text("Teléfono: +54 9 2983 508989", 40, 85);
        doc.text("Email: gustavoperez@gmail.com", 40, 100);
        doc.addImage('./assets/img/logo.png', 'PNG', doc.internal.pageSize.width - 120, 30, 80, 40);
        doc.setFontSize(12);
        doc.text("DOCUMENTO NO VÁLIDO COMO FACTURA", doc.internal.pageSize.width - 300, 100);
        doc.text(`Página ${pageNumber} de ${totalPages}`, doc.internal.pageSize.width - 100, doc.internal.pageSize.height - 20);
    };

    // Capturar los valores de los inputs de la tabla .info-table
    const infoTableData1 = [
        ["Solicitante", "Ejecutivo de Ventas", "Fecha de Cotización", "N° Cotización"],
        [
            `Nombre: ${document.querySelector("input[name='nombre']").value}\nCUIL/CUIT: ${document.querySelector("input[name='cuit']").value}\nEmail: ${document.querySelector("input[name='email']").value}\nTeléfono: ${document.querySelector("input[name='telefono']").value}`,
            document.querySelector("input[name='vendedor']").value,
            document.querySelector("input[name='fecha']").value,
            document.querySelector("input[name='num_cotizacion']").value
        ]];
    const infoTableData2 = [
        ["Condición de Pago", "Condición de Venta", "Válida Hasta", "Moneda"],
        [
            document.querySelector("input[name='condicion_pago']").value,
            document.querySelector("input[name='condicion_venta']").value,
            document.querySelector("input[name='fecha_validez']").value,
            document.querySelector("input[name='moneda']").value
        ]
    ];

    // Extraer tabla de la cotización y convertirla a PDF
    doc.autoTable({
        head: [infoTableData1[0]],
        body: [infoTableData1[1]],
        startY: 120, // Ubicación en la página
        theme: "grid", // Estilo de la tabla
        styles: {
            font: "helvetica",
            fontSize: 10,
            cellPadding: 5,
        },
        headStyles: { textColor: [0, 0, 0], fillColor: [233, 245, 236], fontSize: 10 },
        tableLineColor: [46, 139, 87], // Color del borde (verde)
        tableLineWidth: 1, // Grosor del borde (1 píxel)
        margin: { top: 120 } // Margen superior para no pisar el encabezado
    });

    doc.autoTable({
        head: [infoTableData2[0]],
        body: [infoTableData2[1]],
        startY: 200, // Ubicación en la página
        theme: "grid", // Estilo de la tabla
        styles: {
            font: "helvetica",
            fontSize: 10,
            cellPadding: 5,
        },
        headStyles: { textColor: [0, 0, 0], fillColor: [233, 245, 236], fontSize: 10 },
        tableLineColor: [46, 139, 87], // Color del borde (verde)
        tableLineWidth: 1, // Grosor del borde (1 píxel)
        margin: { top: 200 } // Margen superior para no pisar el encabezado
    });

    const finalY = doc.autoTable.previous.finalY;

    // Extraer tabla de productos y convertirla a PDF
    doc.autoTable({
        html: "#productos-table", // ID de la tabla HTML
        startY: finalY + 10, // Ubicación en la página
        theme: "grid", // Estilo de la tabla
        styles: {
            font: "helvetica",
            fontSize: 10,
            cellPadding: 5,
        },
        headStyles: { textColor: [0, 0, 0], fillColor: [233, 245, 236], fontSize: 10 },
        tableLineColor: [46, 139, 87], // Color del borde (verde)
        tableLineWidth: 1, // Grosor del borde (1 píxel)
        margin: { top: 120 }, // Margen superior para no pisar el encabezado
        rowPageBreak: 'auto' // Asegura que las filas no se rompan entre páginas
    });

    const finalY2 = doc.autoTable.previous.finalY;

    // Agregar el div #totales
    doc.setFont("helvetica", "bold");
    doc.setFontSize(14);
    doc.text("Totales (USD)", 30, finalY2 + 20);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    doc.text(`Subtotal: $${document.getElementById("subtotal").textContent}`, 30, finalY2 + 40);
    doc.text(`IVA (10.5%): $${document.getElementById("iva").textContent}`, 30, finalY2 + 60);
    doc.setFontSize(12);
    doc.setFont("helvetica", "bold");
    doc.text(`Total: $${document.getElementById("total").textContent}`, 30, finalY2 + 80);
    doc.setFontSize(12);
    doc.text("Detalles adicionales:", 30, finalY2 + 100);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    // Ajustar el ancho del textarea para que el texto se ajuste dentro del PDF
    const detalles = document.getElementById("detalles").value;
    const splitDetalles = doc.splitTextToSize(detalles, doc.internal.pageSize.width - 60);
    doc.text(splitDetalles, 30, finalY2 + 120);

    // Agregar pie de página con número de página
    const totalPages = doc.internal.getNumberOfPages();
    for (let i = 1; i <= totalPages; i++) {
        doc.setPage(i);
        addHeader(i, totalPages);
    }

    // Guardar el PDF
    doc.save(`Cotizacion ${num_cotizacion.value}.pdf`);
});
