const obtenerServicios = async () => {
  const service = [];
  const data = await fetch("../data/data.json");
  const json = await data.json();

  json.service.forEach((e) => {
    service.push(e);
  });

  return service;
};

//Funcion para mostrar los servicios
const mostrarServicios = async (containerServiceId) => {
  //consumo la api
  const servicios = await obtenerServicios();

  //obtengo el container del DOM
  const containerService = document.getElementById(containerServiceId);

  //por cada element de la api creo un div
  servicios.forEach((servicio) => {
    const elemento = document.createElement("li");
    elemento.classList.add("service-item");

    //creo la estructura a mostrar
    elemento.innerHTML = `
            <figure class="service-item-img">
              <img src="${servicio.img}" alt="${servicio.title}">
            </figure>
            <div class="service-item-body">
              <h3>${servicio.title}</h3>
              <p>${servicio.description}</p>
            </div>
        `;
    // elemento.innerHTML = `
    //         <h2>${servicio.title}</h2>
    //         <img src="${servicio.img}" alt="${servicio.title}">
    //         <p>${servicio.description}</p>
    //         <h5>${servicio.type}</h5>
    //     `;

    //creo los elementos en el HTML apenas de cargan en el DOM
    containerService.appendChild(elemento);
  });
};

mostrarServicios("service-container");
