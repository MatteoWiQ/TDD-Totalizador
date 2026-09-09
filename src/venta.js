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
    if (total >= 30000) {
      return 0.15;
    }
    if (total >= 10000) {
      return 0.1;
    }
    if (total >= 7000) {
      return 0.07;
    }
    if (total >= 3000) {
      return 0.05;
    }
    if (total >= 1000) {
      return 0.03;
    }
    return 0;
  }

  calcularTotalConDescuento(total) {
    return total - total * this.calcularDescuento(total);
  }

  calcularAhorro(total, descuento) {
    return total * descuento;
  }

  calcularTotalFinal(subtotal, ahorro, impuesto) {
    return subtotal - ahorro + impuesto;
  }

  redondearMoneda(monto) {
    return Math.round(monto * 100) / 100;
  }

  esCantidadValida(cantidad) {
    return cantidad > 0;
  }

  esPrecioValido(precio) {
    return precio > 0;
  }

  obtenerEstados() {
    return ["UT", "NV", "TX", "AL", "CA"];
  }

  crearEstadoInicial() {
    return {
      cantidad: 0,
      precio: 0,
      estado: "CA",
      errores: []
    };
  }

  confirmarCompra(cantidad, precio, estado) {
    return {
      cantidad: cantidad,
      precio: precio,
      estado: estado,
      confirmada: true
    };
  }

  obtenerCategorias() {
    return [
      "Alimentos",
      "Bebidas alcoholicas",
      "Material de escritorio",
      "Muebles",
      "Electronicos",
      "Vestimenta",
      "Varios"
    ];
  }

  impuestoAdicionalCategoria(categoria) {
    const impuestos = {
      Alimentos: 0,
      "Bebidas alcoholicas": 0.07,
      "Material de escritorio": 0,
      Muebles: 0.03,
      Electronicos: 0.04,
      Vestimenta: 0.02,
      Varios: 0
    };
    return impuestos[categoria];
  }

  descuentoAdicionalCategoria(categoria) {
    const descuentos = {
      Alimentos: 0.02,
      "Bebidas alcoholicas": 0,
      "Material de escritorio": 0.015,
      Muebles: 0,
      Electronicos: 0.01,
      Vestimenta: 0,
      Varios: 0
    };
    return descuentos[categoria];
  }

  costoEnvioUnidad() {
    return 0;
  }
}

export default Venta;
