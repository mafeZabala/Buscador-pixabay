// función asíncrona que se ejecuta cuando el usuario envía un formulario. Comienza por obtener el valor del campo de entrada con el id "busqueda"
const cargarImagenes = async () => {
	const input = document.querySelector("#busqueda").value;
	if (input.trim() == "") {
		mostarError("#error", "Falta que ingrese el valor");
		return;
	}
  divListadoImagenes = document.querySelector("#listarImagenes");
  //Spinner: se agrega un spinner al elemento divListadoImagenes para indicar que se están cargando las imágenes. 
  divListadoImagenes.innerHTML = `<div>
      <img src="cargando.gif" class="gif">
    </div>`;
  const numberFormat = Intl.NumberFormat('es-ES')
	const key = "40266417-36d2caafb5e6fc7d576da395e";
	const url = `https://pixabay.com/api/?key=${key}&q=${input}`;
	/* console.log(url); */
  //Se realiza una solicitud a la API de Pixabay utilizando fetch y se espera la respuesta con await. La respuesta se almacena en la variable respuesta, y luego se convierte a formato JSON utilizando respuesta.json() y se almacena en la variable resultado.
	const respuesta = await fetch(url);
	const resultado = await respuesta.json();
	let imagenes = resultado.hits;
	console.log(imagenes);
	//Genera un String HTML el cual va a contener las imagenes
	let imagenesHTML = ``;
  //Se itera sobre las imágenes utilizando el método map, y se crea un fragmento de HTML para cada imagen.
	imagenes.map((imagen) => {
		const {
			largeImageURL,
			likes,
			previewURL,
			tags,
			views,
			previewWidth,
			previewHeight
		} = imagen;
		imagenesHTML += `
    <div class="main-content">
      <div class="content-info">
        <p><span class="material-symbols-outlined red-color">favorite</span>${numberFormat.format(likes)}</p>
        <p><span class="material-symbols-outlined red-color green-color">visibility</span>${numberFormat.format(views)}</p>
      </div>
      <a class="image-preview" href="${largeImageURL}" target="_blank">
        <img src="${previewURL}"/>
      </a>
    </div>`;
	});
  //vamos a mostrar las imagenes
	setTimeout(() => {
		console.log("Enviando imagenes");
		divListadoImagenes.innerHTML = imagenesHTML;
	}, 3000);
};
//funcion para mostrar un mensaje de error por si hay campos vacios
const mostarError = (element, message) => {
	divError = document.querySelector(element);
	divError.innerHtml = `<p class="message">${message}</p>`;
	setTimeout(() => {
		divError.innerHtml = ``;
	}, 2000);
};

document
	.querySelector("#formulario_boton")
	.addEventListener("submit", async (e) => {
		e.preventDefault();
		await cargarImagenes();
	});
