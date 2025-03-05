// Datos de productos (simulados)
const products = [
    { id: 1, category: "Seeder", name: "TANZI TIGON", description: "Seeder with 16 openers at 19.1 cm", price: 126335, version: "3.16", width: "3m", code: "6630009" },
    { id: 2, category: "Seeder", name: "TANZI TIGON", description: "Seeder with 32 openers at 19.1 cm", price: 162181, version: "6.32", width: "6m", code: "6630007" },
    { id: 3, category: "Optional", name: "TANZI TIGON (for versions 6.32 and 8.42)", description: "Difference for installing a leveling wheel with 2 7/8 cast spokes (per unit)", price: 139, code: "5000012" },
    { id: 4, category: "Seeder", name: "TANZI 9200 AIR DRILL", description: "Seeder with 48 openers at 19.1 cm", price: 171045, chassis: "10m", code: "6630001" },
    { id: 5, category: "Seeder", name: "TANZI 9200 AIR DRILL", description: "Seeder with 60 openers at 19.1 cm", price: 181422, chassis: "12m", code: "6630002" },
    { id: 6, category: "Optional", name: "TANZI 9200 AIR DRILL (for any version)", description: "Difference for installing a leveling wheel with 4 1/2 cast spokes (per unit)", price: 159, code: "5000013" },
    { id: 7, category: "Seeder", name: "TANZI TIGON", description: "Seeder with 42 openers at 19.1 cm", price: 215000, version: "8.42", width: "8m", code: "6630008" },
    { id: 8, category: "Seeder", name: "TANZI TIGON", description: "Seeder with 20 openers at 19.1 cm", price: 150000, version: "4.20", width: "4m", code: "6630010" },
    { id: 9, category: "Seeder", name: "TANZI TIGON", description: "Seeder with 24 openers at 19.1 cm", price: 180000, version: "5.24", width: "5m", code: "6630011" },
    { id: 10, category: "Seeder", name: "TANZI 9200 AIR DRILL", description: "Seeder with 72 openers at 19.1 cm", price: 220000, chassis: "14m", code: "6630003" },
    { id: 11, category: "Seeder", name: "TANZI TIGON", description: "Seeder with 12 openers at 19.1 cm", price: 100000, version: "2.12", width: "2m", code: "6630012" },
    { id: 12, category: "Seeder", name: "TANZI 9200 AIR DRILL", description: "Seeder with 36 openers at 19.1 cm", price: 140000, chassis: "8m", code: "6630004" },
    { id: 13, category: "Seeder", name: "TANZI TIGON", description: "Seeder with 64 openers at 19.1 cm", price: 300000, version: "12.64", width: "12m", code: "6630013" },
    { id: 14, category: "Seeder", name: "TANZI TIGON", description: "Seeder with 8 openers at 19.1 cm", price: 80000, version: "1.8", width: "1m", code: "6630014" }
];
  
  // Variables globales
  const productGrid = document.getElementById("product-grid");
  const cartItems = document.getElementById("cart-items");
  const totalElement = document.getElementById("total");
  const searchInput = document.getElementById("search");
  const clearCartButton = document.getElementById("clear-cart");
  const exportPdfButton = document.getElementById("export-pdf");
  
  let cart = [];
  
  // Cargar productos en la página
  function loadProducts(filter = "") {
    productGrid.innerHTML = "";
    const filteredProducts = products.filter(product =>
      product.name.toLowerCase().includes(filter.toLowerCase()) || 
      product.description.toLowerCase().includes(filter.toLowerCase())
    );
  
    filteredProducts.forEach(product => {
      const card = document.createElement("div");
      card.className = "product-card";
      card.innerHTML = `
        <h3>${product.name}</h3>
        <p>${product.description}</p>
        <p class="price">$${product.price.toFixed(2)}</p>
        <button onclick="addToCart(${product.id})">Añadir al carrito</button>
      `;
      productGrid.appendChild(card);
    });
  }
  
  // Añadir producto al carrito
  function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    const existingItem = cart.find(item => item.id === productId);
  
    if (existingItem) {
      existingItem.quantity++;
    } else {
      cart.push({ ...product, quantity: 1 });
    }
  
    updateCart();
  }
  
  // Actualizar el carrito
  function updateCart() {
    cartItems.innerHTML = "";
    let total = 0;
  
    cart.forEach(item => {
      const li = document.createElement("li");
      li.innerHTML = `
        <span>${item.name} (x${item.quantity})</span>
        <span>$${(item.price * item.quantity).toFixed(2)}</span>
        <button onclick="removeFromCart(${item.id})">Eliminar</button>
      `;
      cartItems.appendChild(li);
      total += item.price * item.quantity;
    });
  
    totalElement.textContent = `$${total.toFixed(2)}`;
  }
  
  // Eliminar producto del carrito
  function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCart();
  }
  
  // Vaciar el carrito
  clearCartButton.addEventListener("click", () => {
    cart = [];
    updateCart();
  });
  
  // Exportar a PDF (simulado)
  exportPdfButton.addEventListener("click", () => {
    alert("Exportando a PDF...");
    // Aquí podrías integrar una librería como jsPDF para generar el PDF.
  });
  
  // Filtro de búsqueda
  searchInput.addEventListener("input", () => {
    loadProducts(searchInput.value);
  });
  
  // Inicializar la página
  loadProducts();