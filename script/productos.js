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
    const element = document.createElement("div");
    element.classList.add("product-item");

    //creo lo que se vera en el div
    element.innerHTML = `
            <figure class="product-item-img">
              <img src="${producto.img}" alt="${producto.name}">
            </figure>
            <div class="product-item-body">
              <h3>${producto.name}</h3>
              <span>$200</span>
            </div>
        `;
    // element.innerHTML = `
    //         <img src="${producto.img}" alt="${producto.name}">
    //         <h3>${producto.name}</h3>
    //         <p>${producto.description}</p>
    //         <h5>${producto.type}</h5>
    //     `;

    containerProduct.appendChild(element);
  });
};

mostrarProductos("shop-container");
