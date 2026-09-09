import Venta from "./venta.js";

const venta = new Venta();

const cantidad = document.querySelector("#cantidad-input");
const precio = document.querySelector("#precio-input");
const estado = document.querySelector("#estado-select");
const form = document.querySelector("#venta-form");
const div = document.querySelector("#resultado-div");

function renderizar() {
  const subtotal = venta.calcularSubtotal(Number(precio.value), Number(cantidad.value));
  div.innerHTML = "<p>Subtotal: " + subtotal + "</p>";
}

form.addEventListener("submit", (event) => {
  event.preventDefault();
  renderizar();
});
