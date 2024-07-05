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
      const loginUsuario = async () => {
        const response = await fetch(
          `https://patitas.up.railway.app/usuario/login`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(usuario),
          }
        );
        if (response.ok) {
          alert("Se inicio de sesión correctamente");
          window.location.href = "../index.html";
        } else {
          const json = await response.json();
          alert(json.msg);
          // alert("Error al iniciar sesión");
        }
      };
      loginUsuario();
    } else {
      // Si no es valido
      alert("Completa correctamente el formulario");
    }
  });
});
