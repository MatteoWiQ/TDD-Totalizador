class Venta {
  calcularSubtotal(precio, cantidad) {
    return precio * cantidad;
  }

  calcularImpuestoTasa(estado) {
    const tasas = {
      TX: 0.0625,
      UT: 0.0665,
      NV: 0.08,
      AL: 0.04,
      CA: 0.0825
    };
    return tasas[estado];
  }

  calcularImpuesto(subtotal, estado) {
    return subtotal * this.calcularImpuestoTasa(estado);
  }

  calcularTotalImpuesto(subtotal, impuesto) {
    return subtotal + impuesto;
  }

  calcularDescuento(total) {
    return 0;
  }
}

export default Venta;
