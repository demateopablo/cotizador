let cart = [];
let total = 0;
const emptyCartBtn = document.getElementById(`emptyCartBtn`);
emptyCartBtn.addEventListener("click", emptyCart);
const cartSection = document.getElementById(`listaCarrito`);
const precioTotal = document.getElementById(`precioTotal`);
const cotizarBtn = document.getElementById("cotizarBtn");

cotizarBtn.addEventListener("click", () => {
    localStorage.clear();
    localStorage.setItem("cart", JSON.stringify(cart)); // Guarda el carrito en LocalStorage
    // Agrega la clase fade-out a todo el body
    document.body.classList.add("fade-out");

    // Espera a que termine la animación y luego redirige a la página de cotización
    setTimeout(() => {
        window.location.href = "cotizacion.html";
    }, 1000); // 500ms = igual al tiempo del transition en CSS
});

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
    { categoria: "Sembradora", nombre: "TANZI TIGON", descripcion: "Sembradora con 8 abresurcos a 19.1 cm", precio: 80000, version: "1.8", ancho: "1m", codigo: "6630014" }
];

// Filtro de productos
function filtrarProductos() {
    const query = document.getElementById("buscador").value.toLowerCase();
    const productosDivs = document.querySelectorAll(".tarjeta");
    productosDivs.forEach((productoDiv) => {
        const texto = productoDiv.textContent.toLowerCase();
        productoDiv.style.display = texto.includes(query) ? "block" : "none";
    });
}
// Generar productos en la página
const listaProductos = document.getElementById("lista-productos");
productos.forEach((producto) => {
    const productoDiv = document.createElement("article");
    producto.categoria === "Sembradora" ?
        productoDiv.className = "tarjeta producto" :
        productoDiv.className = "tarjeta opcional";
    productoDiv.innerHTML = `
            <sup>${producto.categoria}</sup>
            <h3>${producto.nombre}</h3>
            <p>${producto.descripcion}</p>
            <p><strong>Precio:</strong> $${producto.precio}</p>
            ${producto.version ? `<p><strong>Versión:</strong> ${producto.version}</p>` : ""}
            ${producto.ancho ? `<p><strong>Ancho:</strong> ${producto.ancho}</p>` : ""}
            ${producto.chasis ? `<p><strong>Chasis:</strong> ${producto.chasis}</p>` : ""}
            <p><strong>Código:</strong> ${producto.codigo}</p>
            <button class= "cartButton" id=${producto.codigo}_add>Añadir</button>
            <button class= "cartButton hidden" id=${producto.codigo}_remove>Quitar</button>
        `;
    listaProductos.appendChild(productoDiv);
});

for (let i = 0; i < productos.length; i++) {
    document.getElementById(`${productos[i].codigo}_add`).addEventListener("click", () => {
        addToCart(i, productos);
    });
    document.getElementById(`${productos[i].codigo}_remove`).addEventListener("click", () => {
        removeFromCart(productos[i]);
    });
}

function addToCart(index, productos) {
    const selectedProduct = productos[index];
    const itemCartIndex = isAlreadyInCart(selectedProduct);
    if (itemCartIndex !== -1) {
        // Si ya está en el carrito, actualizo la cantidad y el total
        cart[itemCartIndex].cantidad++;
        cart[itemCartIndex].precioTotal += selectedProduct.precio;
        total += cart[itemCartIndex].precio;
    } else {
        // Si no está, lo agrego
        cart.push({
            ...selectedProduct, //Paso todas las propiedades de selectedProduct al array del carrito
            cantidad: 1, //Agrego la propiedad amount para llevar un contador de la cantidad del mismo producto
            precioTotal: selectedProduct.precio, //Calculo el precio total (seria el amount total * price)
        });
        total += selectedProduct.precio;
    }
    if (emptyCartBtn.classList.contains('hidden')) {
        emptyCartBtn.classList.remove('hidden');
    }
    document.getElementById(`${productos[index].codigo}_remove`).classList.remove(`hidden`);
    document.getElementById(`${productos[index].codigo}_add`).classList.add(`hidden`);
    /* showProductInCart(selectedProduct); */
    refreshCartSection(cart);
    precioTotal.innerHTML = total;
}

function isAlreadyInCart(selectedProduct) {
    return cart.findIndex(item => item.codigo === selectedProduct.codigo);
}

function emptyCart() {
    cart = [];
    total = 0;
    emptyCartBtn.classList.add('hidden');
    cartSection.innerHTML = '';
    precioTotal.innerHTML = total;
    alert(`Vaciaste el carrito.`)
}

function removeFromCart(selectedProduct) {
    // Buscar el índice en el carrito comparando por la propiedad única "descripcion"
    const cartProductIndex = cart.findIndex(product => product.descripcion === selectedProduct.descripcion);
    cart.splice(cartProductIndex, 1)
    total -= selectedProduct.precio;
    // Buscar el índice en productos para actualizar el DOM
    const productIndex = productos.findIndex(product => product.descripcion === selectedProduct.descripcion);
    document.getElementById(`${productos[productIndex].codigo}_remove`).classList.add(`hidden`);
    document.getElementById(`${productos[productIndex].codigo}_add`).classList.remove(`hidden`);
    if (total == 0) {
        emptyCartBtn.classList.add('hidden')
    }
    precioTotal.innerHTML = total;
    refreshCartSection(cart);
}
/* 
function showProductInCart(selectedProduct) {
    cartSection.innerHTML +=
        `
        <li>
            <p class="cartNombre">${selectedProduct.descripcion}</p>
            <span class="cartPrecio">$${selectedProduct.precio}</span>
        </li>
        `
} */

function refreshCartSection(cart) {
    cartSection.innerHTML = '';
    cart.forEach((p) => {
        cartSection.innerHTML += `
        <li>
            <p class="cartNombre">${p.descripcion}</p>
            <span class="cartPrecio">$${p.precio}</span>
        </li>
        `
    })
}