import Venta from "./venta.js";

const venta = new Venta();

const cantidad = document.querySelector("#cantidad-input");
const precio = document.querySelector("#precio-input");
const estado = document.querySelector("#estado-select");
const form = document.querySelector("#venta-form");
const cuenta = document.querySelector("#cancelar-button");
const div = document.querySelector("#resultado-div");

function reiniciarFormulario() {
  const estadoInicial = venta.crearEstadoInicial();
  cantidad.value = estadoInicial.cantidad;
  precio.value = estadoInicial.precio;
  estado.value = estadoInicial.estado;
  div.innerHTML = "";
}

cuenta.addEventListener("click", () => {
  reiniciarFormulario();
});

function renderizarEstados() {
  estado.innerHTML = venta.obtenerEstados().map((e) => "<option value='" + e + "'>" + e + "</option>").join("");
}

renderizarEstados();

function renderizar() {
  const cantidadValor = Number(cantidad.value);
  const precioValor = Number(precio.value);

  if (!venta.esCantidadValida(cantidadValor)) {
    div.innerHTML = "<p>Cantidad invalida (debe ser mayor a 0)</p>";
    return;
  }

  if (!venta.esPrecioValido(precioValor)) {
    div.innerHTML = "<p>Precio invalido (debe ser mayor a 0)</p>";
    return;
  }

  const subtotal = venta.redondearMoneda(venta.calcularSubtotal(precioValor, cantidadValor));
  const tasa = venta.calcularImpuestoTasa(estado.value);
  const impuesto = venta.redondearMoneda(venta.calcularImpuesto(subtotal, estado.value));
  const total = venta.redondearMoneda(venta.calcularTotalImpuesto(subtotal, impuesto));
  const descuento = venta.calcularDescuento(total);
  const ahorro = venta.redondearMoneda(venta.calcularAhorro(total, descuento));
  const totalFinal = venta.redondearMoneda(venta.calcularTotalFinal(subtotal, ahorro, impuesto));

  const lineas = [
    "Subtotal: " + subtotal,
    "Impuesto (" + estado.value + " " + tasa + "): " + impuesto,
    "Total: " + total,
    "Descuento: " + descuento,
    "Ahorro: $" + ahorro,
    "Total con descuento: " + venta.redondearMoneda(venta.calcularTotalConDescuento(total)),
    "Precio final: " + totalFinal
  ];
  div.innerHTML = lineas.map((linea) => "<p>" + linea + "</p>").join("");
}

form.addEventListener("submit", (event) => {
  event.preventDefault();
  renderizar();
});
