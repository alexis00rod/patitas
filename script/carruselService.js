const wrapper = document.querySelector(".wrapper");
const carousel = wrapper.querySelector(".carousel");
const arrowBtns = wrapper.querySelectorAll("i");

let isDragging = false, isAutoPlay = true, startX, startScrollLeft, timeoutId;

// Función para obtener los productos
const obtenerServicios = async () => {
  const service = []
  const data = await fetch("../data/data.json");
  const json = await data.json();

  json.service.forEach(e => {
    service.push(e)
  });

  return service
}

// Función para mostrar los productos
const mostrarServicios = async () => {
    
    const servicios = await obtenerServicios();
    const carousel = document.querySelector(".carousel");
    
    //por cada element de la api creo un div
    servicios.slice(0,3).forEach(servicio => {

        const card = document.createElement("li");
        card.className = "card";
        card.innerHTML = `
            <div class="img"><img src="${servicio.img}" alt="${servicio.title}" draggable="false"></div>
            <h2>${servicio.description}</h2>
            <span>${servicio.description}</span>
        `;
        carousel.appendChild(card);
    });

     // Después de cargar los productos, ajusta el carrusel
     ajustarCarrusel();
}

// Función para ajustar el carrusel
const ajustarCarrusel = () => {
    const firstCardWidth = carousel.querySelector(".card").offsetWidth;
    const carouselChildrens = [...carousel.children];
    const cardPerView = Math.round(carousel.offsetWidth / firstCardWidth);

    carouselChildrens.slice(-cardPerView).reverse().forEach(card => {
        carousel.insertAdjacentHTML("afterbegin", card.outerHTML);
    });

    carouselChildrens.slice(0, cardPerView).forEach(card => {
        carousel.insertAdjacentHTML("beforeend", card.outerHTML);
    });

    carousel.classList.add("no-transition");
    carousel.scrollLeft = carousel.offsetWidth;
    carousel.classList.remove("no-transition");

    autoPlay();
}

// Event listeners
arrowBtns.forEach(btn => {
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
}

const dragging = (e) => {
    if (!isDragging) return;
    carousel.scrollLeft = startScrollLeft - (e.pageX - startX);
}

const dragStop = () => {
    isDragging = false;
    carousel.classList.remove("dragging");
}

const infiniteScroll = () => {
    const firstCardWidth = carousel.querySelector(".card").offsetWidth;

    if (carousel.scrollLeft === 0) {
        carousel.classList.add("no-transition");
        carousel.scrollLeft = carousel.scrollWidth - (2 * carousel.offsetWidth);
        carousel.classList.remove("no-transition");
    } else if (Math.ceil(carousel.scrollLeft) === carousel.scrollWidth - carousel.offsetWidth) {
        carousel.classList.add("no-transition");
        carousel.scrollLeft = carousel.offsetWidth;
        carousel.classList.remove("no-transition");
    }

    clearTimeout(timeoutId);
    if (!wrapper.matches(":hover")) autoPlay();
}

const autoPlay = () => {
    if (window.innerWidth < 800 || !isAutoPlay) return;
    
    const firstCardWidth = carousel.querySelector(".card").offsetWidth;
    timeoutId = setTimeout(() => carousel.scrollLeft += firstCardWidth, 2500);
}

mostrarServicios("");

carousel.addEventListener("mousedown", dragStart);
carousel.addEventListener("mousemove", dragging);
document.addEventListener("mouseup", dragStop);
carousel.addEventListener("scroll", infiniteScroll);
wrapper.addEventListener("mouseenter", () => clearTimeout(timeoutId));
wrapper.addEventListener("mouseleave", autoPlay);
