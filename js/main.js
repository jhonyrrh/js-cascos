let calcularBtn = document.getElementById("calcularBtn");
let comprarBtn = document.getElementById("comprarBtn");
let carrito = [];

calcularBtn.addEventListener("click", function() {
  calcularTallaCasco();
});

comprarBtn.addEventListener("click", function() {
  agregarAlCarrito();
  cerrarModal();
});

function medidasCascos(medida) {
  if (medida >= 53 && medida <= 54) {
    return "XS";
  } else if (medida >= 55 && medida <= 56) {
    return "S";
  } else if (medida >= 57 && medida <= 58) {
    return "M";
  } else if (medida >= 59 && medida <= 60) {
    return "L";
  } else if (medida >= 61 && medida <= 62) {
    return "XL";
  } else if (medida >= 63 && medida <= 64) {
    return "XXL";
  } else {
    return "Talla no encontrada";
  }
}

function mostrarDetallesCasco(tallaCasco) {
  let casco = {
    talla: tallaCasco,
    modelo: "",
    color: ""
  };

  if (tallaCasco === "XS") {
    casco.modelo = "AGV 1";
    casco.color = "Verde/Negro";
  } else if (tallaCasco === "S") {
    casco.modelo = "SHAFT";
    casco.color = "Plomo/Figuras";
  } else if (tallaCasco === "M") {
    casco.modelo = "Corsa";
    casco.color = "Rojo Claro/ Lineas Grises";
  } else if (tallaCasco === "L") {
    casco.modelo = "KYT";
    casco.color = "Celeste/Blanco";
  } else if (tallaCasco === "XL") {
    casco.modelo = "AGV V3";
    casco.color = "Rojo/Naranja";
  }

  let resultado = document.getElementById("resultado");
  resultado.innerHTML = `
    <p>Talla: ${casco.talla}</p>
    <p>Modelo: ${casco.modelo}</p>
    <p>Color: ${casco.color}</p>
  `;
}

function mostrarAlerta(mensaje) {
  let resultado = document.getElementById("resultado");
  resultado.innerHTML = `<p>${mensaje}</p>`;
}

function calcularTallaCasco() {
  let medidaInput = document.getElementById("medidaInput").value;
  let medida = parseFloat(medidaInput);

  if (isNaN(medida)) {
    mostrarAlerta("Por favor, ingresa una medida válida.");
    return;
  }

  let tallaCasco = medidasCascos(medida);

  if (tallaCasco === "Talla no encontrada") {
    mostrarAlerta("La talla del casco no tiene resultados");
  } else {
    mostrarDetallesCasco(tallaCasco);
  }
}

function agregarAlCarrito() {
  let talla = document.getElementById("resultado").querySelector("p:first-child").textContent.split(":")[1].trim();
  let modelo = document.getElementById("resultado").querySelector("p:nth-child(2)").textContent.split(":")[1].trim();
  let color = document.getElementById("resultado").querySelector("p:nth-child(3)").textContent.split(":")[1].trim();

  let producto = {
    talla: talla,
    modelo: modelo,
    color: color
  };

  carrito.push(producto);

  mostrarMensajeCarrito("El producto se ha agregado al carrito.");
  actualizarCarrito();
}

function mostrarMensajeCarrito(mensaje) {
  let mensajeElement = document.createElement("div");
  mensajeElement.classList.add("alert", "alert-success");
  mensajeElement.textContent = mensaje;

  let container = document.querySelector(".container");
  container.insertBefore(mensajeElement, container.firstChild);

  setTimeout(function() {
    mensajeElement.remove();
  }, 3000);
}


function actualizarCarrito() {
  let carritoElement = document.getElementById("carrito");
  carritoElement.innerHTML = "";


  carrito.forEach(function(producto) {
    let productoElement = document.createElement("li");
    productoElement.classList.add("list-group-item");
    productoElement.textContent = `Talla: ${producto.talla} | Modelo: ${producto.modelo} | Color: ${producto.color}`;

    carritoElement.appendChild(productoElement);
  });
}
function cerrarModal() {
  let modal = document.getElementById("resultadoModal");
  let bootstrapModal = bootstrap.Modal.getInstance(modal);
  bootstrapModal.hide();
}
