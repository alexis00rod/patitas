const obtenerProductos = async () => {
  const products = [];
  const data = await fetch("../data/data.json");
  const json = await data.json();

  json.shop.forEach((e) => {
    products.push(e);
  });

  return products;
};

//funcion para mostrar los productos
const mostrarProductos = async (containerProductId) => {
  //consumo la api
  const productos = await obtenerProductos();

  const containerProduct = document.getElementById(containerProductId);

  //por cada element de la api creo un div
  productos.forEach((producto) => {
    // Item
    const li = document.createElement("li");
    li.classList.add("product-item");
    // Imagen
    const figure = document.createElement("figure");
    figure.classList.add("product-item-img");
    const img = document.createElement("img");
    img.src = producto.img;
    img.alt = producto.name;
    figure.appendChild(img);

    // Informacio producto
    const body = document.createElement("div");
    body.classList.add("product-item-body");
    const h3 = document.createElement("h3");
    h3.textContent = producto.name;
    const span = document.createElement("span");
    span.textContent = "$200";
    body.appendChild(h3);
    body.appendChild(span);

    // Botones
    const botones = document.createElement("div");
    botones.classList.add("product-item-btns");
    const botonEditar = document.createElement("button");
    // botonEditar.id = producto.name;
    botonEditar.classList.add("btn-icon", "btn-blue");
    botonEditar.setAttribute("onclick", `editarProducto(${producto.id})`);
    botonEditar.innerHTML = '<i class="fa-solid fa-pen"></i>';
    botones.appendChild(botonEditar);

    // Agrego los elementos
    li.appendChild(figure);
    li.appendChild(body);
    li.appendChild(botones);
    containerProduct.appendChild(li);
    //creo lo que se vera en el div
    // element.innerHTML = `
    //         <figure class="product-item-img">
    //           <img src="${producto.img}" alt="${producto.name}">
    //         </figure>
    //         <div class="product-item-body">
    //           <h3>${producto.name}</h3>
    //           <span>$200</span>
    //         </div>
    //         <div class="product-item-btns">
    //           <button title="Editar" onClick={editarProducto(${producto})} class="btn btn-icon btn-blue"><i class="fa-solid fa-pen"></i></button>
    //           <button title="Eliminar" class="btn btn-icon btn-red"><i class="fa-solid fa-trash"></i></button>
    //         </div>
    //     `;

    // containerProduct.appendChild(element);
  });
};

const mostarModal = () => {
  // Modal
  const modal = document.createElement("div");
  modal.classList.add("modal");
  // Modal container
  const modalContainer = document.createElement("div");
  modalContainer.classList.add("modal-container");
  modal.appendChild(modalContainer);
  // Boton cerrar modal
  const botonCerrarModal = document.createElement("button");
  botonCerrarModal.classList.add("closeModal");
  botonCerrarModal.innerHTML = '<i class="fa-solid fa-x"></i>';
  modalContainer.appendChild(botonCerrarModal);
  modal.addEventListener("click", () => {
    page.removeChild(modal);
  });
  modalContainer.addEventListener("click", (e) => {
    e.stopPropagation();
  });
  botonCerrarModal.addEventListener("click", () => {
    page.removeChild(modal);
  });

  const page = document.getElementById("page");
  page.appendChild(modal);
};

window.editarProducto = (producto) => {
  mostarModal();
  // const modal = document.createElement("div")
  // modal.classList.add("modal")
  // const modalContainer = document.createElement("div")
  // modalContainer
  // console.log("click");
  // console.log(producto);
};

mostrarProductos("shop-container");
