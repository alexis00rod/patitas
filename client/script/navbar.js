// Funcion para crear el navbar
document.addEventListener("DOMContentLoaded", () => {
  // Elementos del navbar
  const header = document.createElement("header");
  const nav = document.createElement("nav");
  nav.classList.add("navbar");

  // Logo
  const logo = document.createElement("h1");
  logo.classList.add("logo");
  const logoLink = document.createElement("a");
  logoLink.href = "/index.html";
  const logoImg = document.createElement("img");
  logoImg.src = "/client/assets/patitas-logo.png";
  logoImg.alt = "Patitas logo";
  const logoText = document.createElement("span");
  logoText.textContent = "Patitas";
  logoLink.appendChild(logoImg);
  logoLink.appendChild(logoText);
  logo.appendChild(logoLink);

  // Contenedor de enlaces
  const navbarContainer = document.createElement("ul");
  navbarContainer.id = "navbar-container";
  navbarContainer.classList.add("navbar-container");

  // Enlaces
  const items = [
    { text: "Inicio", href: "/index.html" },
    { text: "Productos", href: "/client/pages/productos.html" },
    { text: "Sobre nosotros", href: "/client/pages/sobre-nosotros.html" },
    { text: "Contactanos", href: "/client/pages/contactanos.html" },
    { text: "Iniciar sesión", href: "/client/pages/login.html" },
  ];

  // Funcion para crear items del navbar
  const createNavbarItem = (content) => {
    const { text, href } = content;
    const item = document.createElement("li");
    item.classList.add("navbar-item");
    const link = document.createElement("a");
    link.href = href;
    link.textContent = text;
    item.appendChild(link);
    return item;
  };

  // Recorrer array items y crear item del navbar por cada elemento
  items.map((item) => navbarContainer.appendChild(createNavbarItem(item)));

  // Botón para abrir el navbar en resoluciones menores a 1000px
  const navbarButton = document.createElement("button");
  navbarButton.type = "button";
  navbarButton.classList.add("navbar-button");
  navbarButton.setAttribute("onclick", "openNavbar()");
  const navbarIcon = document.createElement("i");
  navbarIcon.classList.add("fa-solid", "fa-bars");
  navbarButton.appendChild(navbarIcon);

  // Agrego los elementos del navbar a la pagina
  const page = document.getElementById("page");
  nav.appendChild(logo);
  nav.appendChild(navbarContainer);
  nav.appendChild(navbarButton);
  header.appendChild(nav);
  page.prepend(header);
});

// Función para abrir el navbar
window.openNavbar = () => {
  const navbar = document.getElementById("navbar-container");
  navbar.classList.toggle("active");
};
