const wrapper = document.querySelector(".carrousel-wrapper");
const carousel = wrapper.querySelector(".carrousel-items");
const arrowBtns = wrapper.querySelectorAll(".btn-carrousel");

let isDragging = false,
  isAutoPlay = true,
  startX,
  startScrollLeft,
  timeoutId;

// Función para obtener los productos
const obtenerProductos = async () => {
  const products = [];
  const data = await fetch("/client/data/data.json");
  const json = await data.json();

  json.shop.forEach((e) => {
    products.push(e);
  });

  return products.slice(0, 5);
};

// Función para mostrar los productos
const mostrarProductos = async () => {
  const productos = await obtenerProductos();
  const carousel = document.querySelector(".carrousel-items");

  productos.forEach((producto) => {
    const card = document.createElement("li");
    card.classList.add("card");
    card.innerHTML = `
            <figure class="card-img">
              <img src="${producto.img}" alt="${producto.name}" draggable="false">
            </figure>
            <div class="card-body">
              <h3>${producto.name}</h3>
              <span>$200</span>
            </div>
        `;
    carousel.appendChild(card);
  });

  // Después de cargar los productos, ajusta el carrusel
  ajustarCarrusel();
};

// Función para ajustar el carrusel
const ajustarCarrusel = () => {
  const firstCardWidth = carousel.querySelector(".card").offsetWidth;
  const carouselChildrens = [...carousel.children];
  const cardPerView = Math.round(carousel.offsetWidth / firstCardWidth);

  carouselChildrens
    .slice(-cardPerView)
    .reverse()
    .forEach((card) => {
      carousel.insertAdjacentHTML("afterbegin", card.outerHTML);
    });

  carouselChildrens.slice(0, cardPerView).forEach((card) => {
    carousel.insertAdjacentHTML("beforeend", card.outerHTML);
  });

  carousel.classList.add("no-transition");
  carousel.scrollLeft = carousel.offsetWidth;
  carousel.classList.remove("no-transition");

  autoPlay();
};

// Funcion para manejar carrousel
arrowBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    const firstCardWidth = carousel.querySelector(".card").offsetWidth;
    carousel.scrollLeft += btn.id == "left" ? -firstCardWidth : firstCardWidth;
  });
});

const dragStart = (e) => {
  isDragging = true;
  carousel.classList.add("dragging");
  startX = e.pageX;
  startScrollLeft = carousel.scrollLeft;
};

const dragging = (e) => {
  if (!isDragging) return;
  carousel.scrollLeft = startScrollLeft - (e.pageX - startX);
};

const dragStop = () => {
  isDragging = false;
  carousel.classList.remove("dragging");
};

const infiniteScroll = () => {
  const firstCardWidth = carousel.querySelector(".card").offsetWidth;

  if (carousel.scrollLeft === 0) {
    carousel.classList.add("no-transition");
    carousel.scrollLeft = carousel.scrollWidth - 2 * carousel.offsetWidth;
    carousel.classList.remove("no-transition");
  } else if (
    Math.ceil(carousel.scrollLeft) ===
    carousel.scrollWidth - carousel.offsetWidth
  ) {
    carousel.classList.add("no-transition");
    carousel.scrollLeft = carousel.offsetWidth;
    carousel.classList.remove("no-transition");
  }

  clearTimeout(timeoutId);
  if (!wrapper.matches(":hover")) autoPlay();
};

const autoPlay = () => {
  if (window.innerWidth < 800 || !isAutoPlay) return;

  const firstCardWidth = carousel.querySelector(".card").offsetWidth;
  timeoutId = setTimeout(() => (carousel.scrollLeft += firstCardWidth), 2500);
};

mostrarProductos();

carousel.addEventListener("mousedown", dragStart);
carousel.addEventListener("mousemove", dragging);
document.addEventListener("mouseup", dragStop);
carousel.addEventListener("scroll", infiniteScroll);
wrapper.addEventListener("mouseenter", () => clearTimeout(timeoutId));
wrapper.addEventListener("mouseleave", autoPlay);
