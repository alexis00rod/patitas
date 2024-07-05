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
        nombre: name.value,
        email: email.value,
        password: password.value,
      };
      const registrarUsuario = async () => {
        const response = await fetch(
          `https://patitas.up.railway.app/usuario/registro`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(usuario),
          }
        );
        if (response.ok) {
          alert("Usuario registrado correctamente");
          window.location.href = "../pages/login.html";
        } else {
          const json = await response.json();
          alert(json.msg);
        }
      };
      registrarUsuario();
    } else {
      // Si no es valido
      alert("Completa el formulario correctamente");
    }
  });
});
