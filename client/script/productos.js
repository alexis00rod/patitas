// Funcion obtener todos los productos
const obtenerProductos = async () => {
  const products = [];
  const data = await fetch("../data/data.json");
  const json = await data.json();

  json.shop.forEach((e) => {
    products.push(e);
  });

  return products;
};

// Funcion obtener producto por id
const obtenerProductoPorId = async (id) => {
  const productos = await obtenerProductos();
  return productos.find((producto) => producto.id === id);
};

//funcion para mostrar los productos
const mostrarProductos = async (containerProductId) => {
  //consumo la api
  const productos = await obtenerProductos();

  const containerProduct = document.getElementById(containerProductId);

  //por cada element de la api creo un div
  productos.forEach((producto) => {
    const li = document.createElement("li");
    li.classList.add("product-item");
    li.innerHTML = `
      <figure class="product-item-img">
        <img src="${producto.img}" alt="${producto.name}"/>
      </figure>
      <div class="product-item-body">
        <h3>${producto.name}</h3>
        <span>$${producto.price}</span>
      </div>
      <div class="product-item-btns">
        <button class="btn-icon btn-blue" title="Editar producto" onclick="editarProducto(${producto.id})">
          <i class="fa-solid fa-pen"></i>
        </button>
        <button class="btn-icon btn-red" title="Eliminar producto" onclick="eliminarProducto(${producto.id})">
          <i class="fa-solid fa-trash"></i>
        </button>
      </div>
    `;

    containerProduct.prepend(li);
  });
};

const mostarModal = (producto) => {
  // Modal
  const modal = document.createElement("div");
  modal.classList.add("modal");

  // Modal container
  const modalContainer = document.createElement("div");
  modalContainer.classList.add("modal-container");
  modal.appendChild(modalContainer);

  // Botones
  const botonCerrarModal = document.createElement("button");
  botonCerrarModal.classList.add("closeModal");
  botonCerrarModal.innerHTML = '<i class="fa-solid fa-x"></i>';
  modalContainer.appendChild(botonCerrarModal);

  // Eventos
  modal.addEventListener("click", () => {
    if (page.contains(modal)) {
      page.removeChild(modal);
    }
  });
  modalContainer.addEventListener("click", (e) => {
    e.stopPropagation();
  });
  botonCerrarModal.addEventListener("click", () => {
    if (page.contains(modal)) {
      page.removeChild(modal);
    }
  });

  // Formulario editar producto
  const formularioEditar = document.createElement("form");
  formularioEditar.classList.add("form");
  formularioEditar.innerHTML = `
    <div class="form-field">
      <label for="name">Nombre</label>
      <input  type="text" name="name" id="name" value="${producto.name}"/>
    </div>
    <div class="form-field">
      <label for="price">Precio</label>
      <input type="text" name="price" id="price" value="${producto.price}" />
    </div>
  `;

  modalContainer.appendChild(formularioEditar);

  console.log(producto);

  const page = document.getElementById("page");
  page.appendChild(modal);
};

// Funcion editar producto
window.editarProducto = async (id) => {
  const producto = await obtenerProductoPorId(id);
  mostarModal(producto);
};

// Funcion eliminar producto
window.eliminarProducto = async (id) => {
  const producto = await obtenerProductoPorId(id);
  console.log(`${producto.name} se elimino exitosamente!`);
};

mostrarProductos("shop-container");
