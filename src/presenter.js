import Venta from "./venta.js";

const venta = new Venta();

const cantidad = document.querySelector("#cantidad-input");
const precio = document.querySelector("#precio-input");
const estado = document.querySelector("#estado-select");
const form = document.querySelector("#venta-form");
const div = document.querySelector("#resultado-div");

const estados = ["UT", "NV", "TX", "AL", "CA"];

function renderizarEstados() {
  estado.innerHTML = estados.map((e) => "<option value='" + e + "'>" + e + "</option>").join("");
}

renderizarEstados();

function renderizar() {
  const subtotal = venta.calcularSubtotal(Number(precio.value), Number(cantidad.value));
  const tasa = venta.calcularImpuestoTasa(estado.value);
  const impuesto = venta.calcularImpuesto(subtotal, estado.value);
  const total = venta.calcularTotalImpuesto(subtotal, impuesto);
  const descuento = venta.calcularDescuento(total);
  const ahorro = venta.calcularAhorro(total, descuento);
  const totalFinal = venta.calcularTotalFinal(subtotal, ahorro, impuesto);

  const lineas = [
    "Subtotal: " + subtotal,
    "Impuesto (" + estado.value + " " + tasa + "): " + impuesto,
    "Total: " + total,
    "Descuento: " + descuento,
    "Ahorro: $" + ahorro,
    "Total con descuento: " + venta.calcularTotalConDescuento(total),
    "Precio final: " + totalFinal
  ];
  div.innerHTML = lineas.map((linea) => "<p>" + linea + "</p>").join("");
}

form.addEventListener("submit", (event) => {
  event.preventDefault();
  renderizar();
});
