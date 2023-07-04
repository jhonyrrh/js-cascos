window.addEventListener('DOMContentLoaded', function() {
  if (localStorage.getItem('carrito')) {
    carrito = JSON.parse(localStorage.getItem('carrito'));
    actualizarCarrito();
  }
});

let carritoElement = document.getElementById('carrito');
let eliminarTodoContainer = document.createElement('div');
eliminarTodoContainer.classList.add('d-flex', 'justify-content-end', 'mt-3');
let eliminarTodoBtn = document.createElement('button');
eliminarTodoBtn.classList.add('btn', 'btn-danger');
eliminarTodoBtn.textContent = 'Vaciar Carrito';

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

eliminarTodoBtn.addEventListener('click', function() {
  vaciarCarrito();
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
  fetch("./js/cascos.json")
    .then(response => response.json())
    .then(cascos => {
      const casco = cascos.find(c => c.talla === tallaCasco);

      if (casco) {
        document.getElementById("resultado").innerHTML = `
        <p>Talla: ${casco.talla}</p>
              <p>Modelo: ${casco.modelo}</p>
              <p>Color: ${casco.color}</p>
              <p>Precio: $${casco.precio}</p>
              <img src="${casco.foto}" alt="Foto del casco" style="max-width: 100%; height: auto;">
        `;
      } else {
        document.getElementById("resultado").innerHTML = "No se encontró el casco con la talla especificada.";
      }
    })
    .catch(error => {
      console.error("Error al cargar los datos de los cascos:", error);
    });
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
  let talla = document.getElementById("resultado").querySelector("p:nth-child(1)").textContent.split(":")[1].trim();
  let modelo = document.getElementById("resultado").querySelector("p:nth-child(2)").textContent.split(":")[1].trim();
  let color = document.getElementById("resultado").querySelector("p:nth-child(3)").textContent.split(":")[1].trim();
  let precio = parseFloat(document.getElementById("resultado").querySelector("p:nth-child(4)").textContent.split(":")[1].trim().slice(1));
  let foto = document.getElementById("resultado").querySelector("img").src;

  let productoExistente = carrito.find(function(producto) {
    return producto.talla === talla && producto.modelo === modelo && producto.color === color;
  });

  if (productoExistente) {
    productoExistente.cantidad += 1;
  } else {
    let producto = {
      talla: talla,
      modelo: modelo,
      color: color,
      cantidad: 1,
      precio: precio,
      foto: foto
    };

    carrito.push(producto);
  }

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
  
  let precioTotal = 0;
  carritoElement.innerHTML = '';
  carrito.forEach(function(producto, index) {
    let productoElement = document.createElement('li');
    productoElement.classList.add('list-group-item');
    productoElement.innerHTML = `
      <div class="producto-info">
        <p>Talla: ${producto.talla} | Modelo: ${producto.modelo} | Color: ${producto.color} | Cantidad: ${producto.cantidad} | Precio Und: $${producto.precio}</p>
      </div>
      <div class="producto-imagen carrito-imagen">
        <img src="${producto.foto}" alt="Foto del casco">
      </div>
    `;
  precioTotal += producto.precio * producto.cantidad;

    // Botón "+" para sumar cantidad
    let sumarBtn = document.createElement('button');
    sumarBtn.classList.add('btn', 'btn-outline-secondary', 'btn-sm', 'float-end', 'mx-1');
    sumarBtn.textContent = '+';
    sumarBtn.addEventListener('click', function() {
      incrementarCantidad(index);
    });

    // Botón "-" para restar cantidad
    let restarBtn = document.createElement('button');
    restarBtn.classList.add('btn', 'btn-outline-secondary', 'btn-sm', 'float-end', 'mx-1');
    restarBtn.textContent = '-';
    restarBtn.addEventListener('click', function() {
      decrementarCantidad(index);
    });

    productoElement.appendChild(sumarBtn);
    productoElement.appendChild(restarBtn);

    let eliminarBtn = document.createElement('button');
    eliminarBtn.classList.add('btn', 'btn-danger', 'btn-sm', 'float-end');
    eliminarBtn.innerHTML = '&times;';
    eliminarBtn.addEventListener('click', function() {
      eliminarProducto(index);
    });

    productoElement.appendChild(eliminarBtn);
    carritoElement.appendChild(productoElement);
  });
  let precioTotalElement = document.createElement('p');
  precioTotalElement.innerHTML = `<strong>Total: $${precioTotal.toFixed(2)}</strong>`;
  carritoElement.appendChild(precioTotalElement);

  eliminarTodoContainer.appendChild(eliminarTodoBtn);
  carritoElement.appendChild(eliminarTodoContainer);

  localStorage.setItem('carrito', JSON.stringify(carrito));
}

function eliminarProducto(index) {
  carrito.splice(index, 1);
  actualizarCarrito();
}

function cerrarModal() {
  let modal = document.getElementById("resultadoModal");
  let bootstrapModal = bootstrap.Modal.getInstance(modal);
  bootstrapModal.hide();
}

function vaciarCarrito() {
  carrito = [];
  actualizarCarrito();
}

function incrementarCantidad(index) {
  carrito[index].cantidad += 1;
  actualizarCarrito();
}

function decrementarCantidad(index) {
  if (carrito[index].cantidad > 1) {
    carrito[index].cantidad -= 1;
    actualizarCarrito();
  }
}
