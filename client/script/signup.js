document.addEventListener("DOMContentLoaded", () => {
  // Elementos del formulario
  const form = document.getElementById("signupForm");
  const name = document.getElementById("name");
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
    // Validar nombre
    if (!name.value) {
      document.querySelector("#signupName").classList.add("error");
      validate = false;
    } else {
      document.querySelector("#signupName").classList.remove("error");
    }
    // Validar email
    if (!email.value || !exp.email.test(email.value)) {
      document.querySelector("#signupEmail").classList.add("error");
      validate = false;
    } else {
      document.querySelector("#signupEmail").classList.remove("error");
    }
    // Validar contraseña
    if (!password.value || !exp.password.test(password.value)) {
      document.querySelector("#signupPassword").classList.add("error");
      validate = false;
    } else {
      document.querySelector("#signupPassword").classList.remove("error");
    }

    if (validate) {
      // Si es valido
      const usuario = {
        name: name.value,
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
