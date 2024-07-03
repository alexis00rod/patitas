document.addEventListener("DOMContentLoaded", () => {
  // Elementos del formulario
  const form = document.getElementById("postProductForm");
  const name = document.getElementById("name");
  const description = document.getElementById("description");
  const price = document.getElementById("price");
  const type = document.getElementById("type");

  // Funcion al hacer submit del formulario
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    let validate = true;

    // Validar nombre
    if (!name.value) {
      document.querySelector("#postProductName").classList.add("error");
      validate = false;
    } else {
      document.querySelector("#postProductName").classList.remove("error");
    }

    // Validar descripcion
    if (!description.value) {
      document.querySelector("#postProductDescription").classList.add("error");
      validate = false;
    } else {
      document
        .querySelector("#postProductDescription")
        .classList.remove("error");
    }

    // Validar precio
    if (!price.value) {
      document.querySelector("#postProductPrice").classList.add("error");
      validate = false;
    } else {
      document.querySelector("#postProductPrice").classList.remove("error");
    }

    // Validar tipo
    if (!type.value) {
      document.querySelector("#postProductType").classList.add("error");
      validate = false;
    } else {
      document.querySelector("#postProductType").classList.remove("error");
    }

    if (validate) {
      // Si es valido
      const producto = {
        name: name.value,
        description: description.value,
        price: price.value,
        type: type.value,
      };
      console.log(producto);
    } else {
      // Si no es valido
      console.log("Error formulario");
    }
  });
});
