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
  div.innerHTML =
    "<p>Subtotal: " + subtotal + "</p>" +
    "<p>Impuesto (" + estado.value + " " + tasa + "): " + impuesto + "</p>";
}

form.addEventListener("submit", (event) => {
  event.preventDefault();
  renderizar();
});
