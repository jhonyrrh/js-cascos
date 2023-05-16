alert("Medir con un centímetro la circunferencia de tu cabeza y añadirla en la siguiente casilla para saber su talla");

const medidasCascos = (medida) => {
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
};

let continuar = true;

while (continuar) {
  const medidaIngresada = prompt("Ingresa la medida en centímetros de la circunferencia de tu cabeza (escribe 'cabezon' para salir):");

  if (medidaIngresada.toLowerCase() === "cabezon") {
    continuar = false;
  } else {
    const medida = parseFloat(medidaIngresada);
    const tallaCasco = medidasCascos(medida);
    alert("La talla del casco es: " + tallaCasco);
  }
}
