import Venta from "./venta.js";

const venta = new Venta();

const cantidad = document.querySelector("#cantidad-input");
const precio = document.querySelector("#precio-input");
const estado = document.querySelector("#estado-select");
const categoria = document.querySelector("#categoria-select");
const tipoCliente = document.querySelector("#tipo-cliente-select");
const peso = document.querySelector("#peso-input");
const form = document.querySelector("#venta-form");
const cancelarButton = document.querySelector("#cancelar-button");
const confirmarButton = document.querySelector("#confirmar-button");
const div = document.querySelector("#resultado-div");

function reiniciarFormulario() {
  const estadoInicial = venta.crearEstadoInicial();
  cantidad.value = estadoInicial.cantidad;
  precio.value = estadoInicial.precio;
  estado.value = estadoInicial.estado;
  categoria.value = "Varios";
  tipoCliente.value = estadoInicial.tipoCliente;
  peso.value = 0;
  div.innerHTML = "";
}

cancelarButton.addEventListener("click", () => {
  reiniciarFormulario();
  alert("Compra cancelada");
});

confirmarButton.addEventListener("click", () => {
  venta.confirmarCompra(Number(cantidad.value), Number(precio.value), estado.value);
  alert("Compra confirmada");
});

function renderizarEstados() {
  estado.innerHTML = venta.obtenerEstados().map((e) => "<option value='" + e + "'>" + e + "</option>").join("");
  estado.value = venta.crearEstadoInicial().estado;
}

function renderizarCategorias() {
  categoria.innerHTML = venta.obtenerCategorias().map((c) => "<option value='" + c + "'>" + c + "</option>").join("");
  categoria.value = "Varios";
}

function renderizarTiposCliente() {
  tipoCliente.innerHTML = venta.obtenerTiposCliente().map((t) => "<option value='" + t + "'>" + t + "</option>").join("");
  tipoCliente.value = venta.crearEstadoInicial().tipoCliente;
}

renderizarEstados();
renderizarCategorias();
renderizarTiposCliente();

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
  const impuestoAdicional = venta.impuestoAdicionalCategoria(categoria.value);
  const descuentoCategoria = venta.descuentoAdicionalCategoria(categoria.value);
  const costoEnvioUnidad = venta.costoEnvioUnidad(Number(peso.value));
  const costoEnvioTotal = venta.redondearMoneda(costoEnvioUnidad * cantidadValor);
  const porcentajeDescuentoEnvio = venta.descuentoEnvioCliente(tipoCliente.value);
  const descuentoEnvio = venta.redondearMoneda(costoEnvioTotal * porcentajeDescuentoEnvio);
  const costoEnvioFinal = venta.redondearMoneda(costoEnvioTotal - descuentoEnvio);
  const descuentoMontoFijo = venta.descuentoMontoFijo(subtotal, categoria.value, tipoCliente.value);
  const total = venta.redondearMoneda(venta.calcularTotalImpuesto(subtotal, impuesto));
  const descuento = venta.calcularDescuento(total);
  const ahorro = venta.redondearMoneda(venta.calcularAhorro(total, descuento));
  const totalFinal = venta.redondearMoneda(venta.calcularTotalFinal(subtotal, ahorro, impuesto));
  const precioFinal = venta.redondearMoneda(totalFinal + costoEnvioFinal - descuentoMontoFijo);

  const lineas = [
    "Subtotal: " + subtotal,
    "Impuesto (" + estado.value + " " + tasa + "): " + impuesto,
    "Impuesto adicional (" + categoria.value + " " + impuestoAdicional + "): " + venta.redondearMoneda(impuestoAdicional * subtotal),
    "Descuento adicional (" + categoria.value + " " + descuentoCategoria + "): " + venta.redondearMoneda(descuentoCategoria * subtotal),
    "Costo de envio por unidad (peso " + peso.value + "): $" + venta.redondearMoneda(costoEnvioUnidad),
    "Costo de envio total: $" + costoEnvioTotal,
    "Descuento en costo de envio (" + tipoCliente.value + " " + porcentajeDescuentoEnvio + "): $" + descuentoEnvio,
    "Descuento fijo por tipo de cliente: $" + descuentoMontoFijo,
    "Total: " + total,
    "Descuento: " + descuento,
    "Ahorro: $" + ahorro,
    "Total con descuento: " + venta.redondearMoneda(venta.calcularTotalConDescuento(total)),
    "Precio final: " + precioFinal
  ];
  div.innerHTML = lineas.map((linea) => "<p>" + linea + "</p>").join("");
}

form.addEventListener("submit", (event) => {
  event.preventDefault();
  renderizar();
});
