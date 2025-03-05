
// Lista de productos
const productos = [
    { categoria: "Sembradora", nombre: "TANZI TIGON", descripcion: "Sembradora con 16 abresurcos a 19.1 cm", precio: 126335, version: "3.16", ancho: "3m", codigo: "6630009" },
    { categoria: "Sembradora", nombre: "TANZI TIGON", descripcion: "Sembradora con 32 abresurcos a 19.1 cm", precio: 162181, version: "6.32", ancho: "6m", codigo: "6630007" },
    { categoria: "Opcional", nombre: "TANZI TIGON (para versiones 6.32 y 8.42)", descripcion: "Diferencia por colocar rueda niveladora con rayos de fundición de 2 7/8 (por unidad)", precio: 139, codigo: "5000012" },
    { categoria: "Sembradora", nombre: "TANZI 9200 AIR DRILL", descripcion: "Sembradora con 48 abresurcos a 19.1 cm", precio: 171045, chasis: "10m", codigo: "6630001" },
    { categoria: "Sembradora", nombre: "TANZI 9200 AIR DRILL", descripcion: "Sembradora con 60 abresurcos a 19.1 cm", precio: 181422, chasis: "12m", codigo: "6630002" },
    { categoria: "Opcional", nombre: "TANZI 9200 AIR DRILL (para cualquier versión)", descripcion: "Diferencia por colocar rueda niveladora con rayos de fundición de 4 1/2 (por unidad)", precio: 159, codigo: "5000013" },
    { categoria: "Sembradora", nombre: "TANZI TIGON", descripcion: "Sembradora con 42 abresurcos a 19.1 cm", precio: 215000, version: "8.42", ancho: "8m", codigo: "6630008" },
    { categoria: "Sembradora", nombre: "TANZI TIGON", descripcion: "Sembradora con 20 abresurcos a 19.1 cm", precio: 150000, version: "4.20", ancho: "4m", codigo: "6630010" },
    { categoria: "Sembradora", nombre: "TANZI TIGON", descripcion: "Sembradora con 24 abresurcos a 19.1 cm", precio: 180000, version: "5.24", ancho: "5m", codigo: "6630011" },
    { categoria: "Sembradora", nombre: "TANZI 9200 AIR DRILL", descripcion: "Sembradora con 72 abresurcos a 19.1 cm", precio: 220000, chasis: "14m", codigo: "6630003" },
    { categoria: "Sembradora", nombre: "TANZI TIGON", descripcion: "Sembradora con 12 abresurcos a 19.1 cm", precio: 100000, version: "2.12", ancho: "2m", codigo: "6630012" },
    { categoria: "Sembradora", nombre: "TANZI 9200 AIR DRILL", descripcion: "Sembradora con 36 abresurcos a 19.1 cm", precio: 140000, chasis: "8m", codigo: "6630004" },
    { categoria: "Sembradora", nombre: "TANZI TIGON", descripcion: "Sembradora con 64 abresurcos a 19.1 cm", precio: 300000, version: "12.64", ancho: "12m", codigo: "6630013" },
    { categoria: "Sembradora", nombre: "TANZI TIGON", descripion: "Sembradora con 8 abresurcos a 19.1 cm", precio: 80000, version: "1.8", ancho: "1m", codigo: "6630014" }
];
  
  let carrito = [];
  let total = 0;
  
  // DOM Elements
  const contenedorProductos = document.getElementById("contenedor-productos");
  const buscador = document.getElementById("buscador");
  const productosSeleccionados = document.getElementById("productos-seleccionados");
  const precioTotal = document.getElementById("precio-total");
  
  // Renderizar productos
  function renderizarProductos() {
    contenedorProductos.innerHTML = productos
      .map(
        (producto) => `
          <div class="producto">
            <h3>${producto.nombre}</h3>
            <p>${producto.descripcion}</p>
            <p>Precio: $${producto.precio}</p>
            <button onclick="agregarAlCarrito('${producto.codigo}')">Añadir al Carrito</button>
          </div>
        `
      )
      .join("");
  }
  
  // Filtrar productos
  function filtrarProductos() {
    const query = buscador?.value.toLowerCase(); // Verifica si el buscador existe
    if (!query) {
      renderizarProductos();
      return;
    }
  
    const productosFiltrados = productos.filter((producto) =>
      producto.nombre.toLowerCase().includes(query) ||
      producto.descripcion.toLowerCase().includes(query)
    );
  
    contenedorProductos.innerHTML = productosFiltrados
      .map(
        (producto) => `
          <div class="producto">
            <h3>${producto.nombre}</h3>
            <p>${producto.descripcion}</p>
            <p>Precio: $${producto.precio}</p>
            <button onclick="agregarAlCarrito('${producto.codigo}')">Añadir al Carrito</button>
          </div>
        `
      )
      .join("");
  }
  
  // Agregar al carrito
  function agregarAlCarrito(codigo) {
    const producto = productos.find((p) => p.codigo === codigo);
    const itemEnCarrito = carrito.find((item) => item.codigo === codigo);
  
    if (itemEnCarrito) {
      itemEnCarrito.cantidad++;
    } else {
      carrito.push({ ...producto, cantidad: 1 });
    }
  
    actualizarCarrito();
  }
  
  // Actualizar carrito
  function actualizarCarrito() {
    productosSeleccionados.innerHTML = carrito
      .map(
        (item) => `
          <li>
            ${item.nombre} (${item.cantidad}) - $${item.precio * item.cantidad}
            <button onclick="eliminarDelCarrito('${item.codigo}')">Eliminar</button>
          </li>
        `
      )
      .join("");
  
    total = carrito.reduce((suma, item) => suma + item.precio * item.cantidad, 0);
    precioTotal.textContent = total;
  }
  
  // Eliminar del carrito
  function eliminarDelCarrito(codigo) {
    carrito = carrito.filter((item) => item.codigo !== codigo);
    actualizarCarrito();
  }
  
  // Vaciar carrito
  document.getElementById("vaciar-carrito").addEventListener("click", () => {
    carrito = [];
    actualizarCarrito();
  });
  
  document.getElementById("exportar-pdf").addEventListener("click", () => {
    // Obtener el contenido del carrito
    const carrito = JSON.parse(localStorage.getItem("cart")) || [];
    const total = carrito.reduce((suma, item) => suma + item.precio * item.cantidad, 0);
  
    // Rellenar el contenedor del PDF
    const pdfContent = document.getElementById("pdf-content");
    pdfContent.innerHTML = carrito
      .map(
        (item) => `
          <li>
            ${item.nombre} (${item.cantidad}) - $${item.precio * item.cantidad}
          </li>
        `
      )
      .join("");
  
    document.getElementById("pdf-total").textContent = total;
  
    // Usar html2canvas para capturar el contenido
    html2canvas(document.querySelector("#pdf-container"), {
      scale: 2, // Aumenta la calidad de la imagen
      useCORS: true, // Permite cargar imágenes externas si es necesario
    }).then((canvas) => {
        console.log(canvas)
      const imgData = canvas.toDataURL("image/png"); // Asegura que el formato sea PNG
  
      // Crear el PDF con jsPDF
      const { jsPDF } = window.jspdf;
      const pdf = new jsPDF("p", "mm", "a4"); // Orientación vertical, tamaño A4
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
  
      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight); // Especifica el formato PNG
      pdf.save("cotizacion.pdf");
    });
  });
  
  // Inicializar
  renderizarProductos();