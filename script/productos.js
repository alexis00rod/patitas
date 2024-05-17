const obtenerProductos = async () => {
    const products = []
    const data = await fetch("../data/data.json");
    const json = await data.json();
    
    json.shop.forEach(e => {
      products.push(e)
    });
  
    return products
  }

//funcion para mostrar los productos
const mostrarProductos = async (containerProductId) => {

    //consumo la api
    const productos = await obtenerProductos()
  
    const containerProduct = document.getElementById(containerProductId);
  
    //por cada element de la api creo un div
    productos.forEach(producto => {
        const element = document.createElement("div");
  
        //creo lo que se vera en el div
        element.innerHTML = `
            <h2>${producto.name}</h2>
            <img src="${producto.img}" alt="${producto.name}">
            <p>${producto.description}</p>
            <h5>${producto.type}</h5>
        `;
  
        containerProduct.appendChild(element);
    });
}

mostrarProductos("shop-container");