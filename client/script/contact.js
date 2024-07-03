document.addEventListener("DOMContentLoaded", () => {
  // Elementos del formulario
  const form = document.getElementById("contactForm");
  const name = document.getElementById("name");
  const email = document.getElementById("email");
  const help = document.getElementById("help");
  const phone = document.getElementById("phone");

  // Expresiones regulares
  const exp = {
    email: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
  };

  // Funcion al hacer submit del formulario
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    let validate = true;

    // Validar nombre
    if (!name.value) {
      document.querySelector("#contactName").classList.add("error");
      validate = false;
    } else {
      document.querySelector("#contactName").classList.remove("error");
    }

    // Validar email
    if (!email.value || !exp.email.test(email.value)) {
      document.querySelector("#contactEmail").classList.add("error");
      validate = false;
    } else {
      document.querySelector("#contactEmail").classList.remove("error");
    }

    // Validar telefono
    if (!phone.value) {
      document.querySelector("#contactPhone").classList.add("error");
      validate = false;
    } else {
      document.querySelector("#contactPhone").classList.remove("error");
    }

    // Validar consulta
    if (!help.value) {
      document.querySelector("#contactHelp").classList.add("error");
      validate = false;
    } else {
      document.querySelector("#contactHelp").classList.remove("error");
    }

    if (validate) {
      // Si es valido
      console.log("Formulario enviado");
    } else {
      // Si no es valido
      console.log("Error formulario");
    }
  });
});
