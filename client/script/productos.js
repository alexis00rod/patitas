// Funcion obtener todos los productos
const obtenerProductos = async () => {
  const data = await fetch("https://patitas.up.railway.app/productos/todos");
  const json = await data.json();
  return json;
};

// Funcion obtener producto por id
const obtenerProductoPorId = async (id) => {
  const data = await fetch(`https://patitas.up.railway.app/producto/${id}`);
  const json = await data.json();
  return json;
};

//funcion para mostrar los productos
const mostrarProductos = async (containerProductId) => {
  //consumo la api
  const productos = await obtenerProductos();

  const containerProduct = document.getElementById(containerProductId);

  //por cada element de la api creo un div
  productos.forEach((producto) => {
    const li = document.createElement("li");
    li.id = `producto-${producto.id}`;
    li.classList.add("product-item");
    li.innerHTML = `
      <figure class="product-item-img">
        <img src="../assets/labrador.png" alt="Labrador"/>
      </figure>
      <div class="product-item-body">
        <h3>${producto.nombre_producto}</h3>
        <span>$${producto.precio}</span>
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

  // Editar nombre
  const nombreProducto = document.createElement("div");
  nombreProducto.classList.add("form-field");
  const nombreProductoLabel = document.createElement("label");
  nombreProductoLabel.htmlFor = "name";
  nombreProductoLabel.innerText = "Nombre";
  const nombreProductoInput = document.createElement("input");
  nombreProductoInput.type = "text";
  nombreProductoInput.name = "name";
  nombreProductoInput.id = "name";
  nombreProductoInput.value = producto.nombre_producto;
  nombreProducto.appendChild(nombreProductoLabel);
  nombreProducto.appendChild(nombreProductoInput);
  formularioEditar.appendChild(nombreProducto);

  // Editar precio
  const precioProducto = document.createElement("div");
  precioProducto.classList.add("form-field");
  const precioProductoLabel = document.createElement("label");
  precioProductoLabel.htmlFor = "price";
  precioProductoLabel.innerText = "Precio";
  const precioProductoInput = document.createElement("input");
  precioProductoInput.type = "number";
  precioProductoInput.name = "price";
  precioProductoInput.id = "price";
  precioProductoInput.value = producto.precio;
  precioProducto.appendChild(precioProductoLabel);
  precioProducto.appendChild(precioProductoInput);
  formularioEditar.appendChild(precioProducto);

  // Boton confirmar
  const guardarProducto = document.createElement("button");
  guardarProducto.classList.add("btn-icon", "btn-primary");
  guardarProducto.innerHTML = "<i class='fa-solid fa-check'></i>";
  formularioEditar.appendChild(guardarProducto);

  // Funcion editar producto
  formularioEditar.addEventListener("submit", async (e) => {
    e.preventDefault();
    const productoActualizado = {
      nombre_producto: nombreProductoInput.value,
      precio: precioProductoInput.value,
      descripcion: producto.descripcion,
      tipo: producto.tipo,
    };
    const actualizarProducto = async () => {
      const response = await fetch(
        `https://patitas.up.railway.app/producto/actualizar/${producto.id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(productoActualizado),
        }
      );
      if (response.ok) {
        mostrarProductos("shop-container");
        window.location.href = "../pages/productos.html";
      } else {
        alert("error al actualizar producto");
      }
    };
    actualizarProducto();
  });

  modalContainer.appendChild(formularioEditar);

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
  const producto = document.getElementById(`producto-${id}`);
  const response = await fetch(
    `https://patitas.up.railway.app/producto/eliminar/${id}`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  if (response.ok) {
    producto.remove();
    alert("producto eliminado correctamente");
  } else {
    alert("error al eliminar producto");
  }
};

mostrarProductos("shop-container");
