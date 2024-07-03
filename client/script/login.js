document.addEventListener("DOMContentLoaded", () => {
  // Elementos del formulario
  const form = document.getElementById("loginForm");
  const email = document.getElementById("email");
  const password = document.getElementById("password");

  // Expresiones regulares
  const exp = {
    email: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
    password: /^(?=.*[a-zA-Z])(?=.*\d).{8,}$/,
  };

  // Funcion al hacer submit del formulario
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    let validate = true;
    // Validar email
    if (!email.value || !exp.email.test(email.value)) {
      document.querySelector("#loginEmail").classList.add("error");
      validate = false;
    } else {
      document.querySelector("#loginEmail").classList.remove("error");
    }
    // Validar contraseña
    if (!password.value || !exp.password.test(password.value)) {
      document.querySelector("#loginPassword").classList.add("error");
      validate = false;
    } else {
      document.querySelector("#loginPassword ").classList.remove("error");
    }

    if (validate) {
      // Si es valido
      const usuario = {
        email: email.value,
        password: password.value,
      };
      console.log(usuario);
    } else {
      // Si no es valido
      console.log("Error formulario");
    }
  });
});
