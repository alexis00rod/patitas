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
        nombre_producto: name.value,
        descripcion: description.value,
        precio: price.value,
        tipo: type.value,
      };
      const postProducto = async () => {
        const response = await fetch(
          `https://patitas.up.railway.app/productos/crear`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(producto),
          }
        );
        if (response.ok) {
          alert("producto creado correctamente");
          window.location.href = "../pages/productos.html";
        } else {
          alert("error al crear producto");
        }
        return json;
      };
      postProducto();
    } else {
      // Si no es valido
      alert("Error formulario");
    }
  });
});
