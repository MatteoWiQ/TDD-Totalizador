import Venta from "./venta.js";

describe("Venta", () => {
  describe("calcularSubtotal", () => {
    it("deberia calcular subtotal = precio * cantidad", () => {
      const venta = new Venta();
      expect(venta.calcularSubtotal(20, 3)).toEqual(60);
    });
  });

  describe("calcularImpuestoTasa", () => {
    it("deberia obtener la tasa de impuesto de un estado", () => {
      const venta = new Venta();
      expect(venta.calcularImpuestoTasa("TX")).toEqual(0.0625);
    });
  });

  describe("calcularImpuesto", () => {
    it("deberia calcular el impuesto sobre el subtotal", () => {
      const venta = new Venta();
      expect(venta.calcularImpuesto(60, "TX")).toEqual(3.75);
    });
  });

  describe("calcularTotalImpuesto", () => {
    it("deberia sumar el impuesto al subtotal", () => {
      const venta = new Venta();
      expect(venta.calcularTotalImpuesto(60, 3.75)).toEqual(63.75);
    });
  });

  describe("calcularDescuento", () => {
    it("deberia devolver 0 cuando el total es menor a 1000", () => {
      const venta = new Venta();
      expect(venta.calcularDescuento(999)).toEqual(0);
    });

    it("deberia aplicar descuento de 3% desde un total de 1000", () => {
      const venta = new Venta();
      expect(venta.calcularDescuento(1000)).toEqual(0.03);
    });

    it("deberia aplicar descuento de 15% desde un total de 30000", () => {
      const venta = new Venta();
      expect(venta.calcularDescuento(30000)).toEqual(0.15);
    });

    it("deberia aplicar descuento de 5% desde un total de 3000", () => {
      const venta = new Venta();
      expect(venta.calcularDescuento(3000)).toEqual(0.05);
    });

    it("deberia aplicar descuento de 7% desde un total de 7000", () => {
      const venta = new Venta();
      expect(venta.calcularDescuento(7000)).toEqual(0.07);
    });

    it("deberia aplicar descuento de 10% desde un total de 10000", () => {
      const venta = new Venta();
      expect(venta.calcularDescuento(10000)).toEqual(0.1);
    });
  });

  describe("calcularTotalConDescuento", () => {
    it("deberia calcular el total con descuento aplicado", () => {
      const venta = new Venta();
      expect(venta.calcularTotalConDescuento(1000)).toEqual(970);
    });
  });

  describe("calcularAhorro", () => {
    it("deberia calcular el monto ahorrado en dolares", () => {
      const venta = new Venta();
      expect(venta.calcularAhorro(1000, 0.03)).toEqual(30);
    });
  });

  describe("calcularTotalFinal", () => {
    it("deberia calcular el precio total final combinando subtotal, descuento e impuesto", () => {
      const venta = new Venta();
      expect(venta.calcularTotalFinal(60, 0, 3.75)).toEqual(63.75);
    });
  });

  describe("redondearMoneda", () => {
    it("deberia redondear el monto a dos decimales", () => {
      const venta = new Venta();
      expect(venta.redondearMoneda(1034.505)).toEqual(1034.51);
    });
  });

  describe("esCantidadValida", () => {
    it("deberia validar que la cantidad sea mayor a cero", () => {
      const venta = new Venta();
      expect(venta.esCantidadValida(20)).toEqual(true);
      expect(venta.esCantidadValida(0)).toEqual(false);
      expect(venta.esCantidadValida(-5)).toEqual(false);
    });
  });

  describe("esPrecioValido", () => {
    it("deberia validar que el precio sea mayor a cero", () => {
      const venta = new Venta();
      expect(venta.esPrecioValido(3)).toEqual(true);
      expect(venta.esPrecioValido(0)).toEqual(false);
    });
  });

  describe("obtenerEstados", () => {
    it("deberia devolver la lista de estados disponibles", () => {
      const venta = new Venta();
      expect(venta.obtenerEstados()).toEqual(["UT", "NV", "TX", "AL", "CA"]);
    });
  });

  describe("crearEstadoInicial", () => {
    it("deberia crear el estado con todos los campos por defecto", () => {
      const venta = new Venta();
      expect(venta.crearEstadoInicial()).toEqual({
        cantidad: 0,
        precio: 0,
        estado: "CA",
        tipoCliente: "Normal",
        errores: []
      });
    });
  });

  describe("confirmarCompra", () => {
    it("deberia devolver la estructura de compra confirmada", () => {
      const venta = new Venta();
      expect(venta.confirmarCompra(20, 3, "TX")).toEqual({
        cantidad: 20,
        precio: 3,
        estado: "TX",
        confirmada: true
      });
    });
  });

  describe("obtenerCategorias", () => {
    it("deberia devolver la lista de categorias disponibles", () => {
      const venta = new Venta();
      expect(venta.obtenerCategorias()).toEqual([
        "Alimentos",
        "Bebidas alcoholicas",
        "Material de escritorio",
        "Muebles",
        "Electronicos",
        "Vestimenta",
        "Varios"
      ]);
    });
  });

  describe("impuestoAdicionalCategoria", () => {
    it("deberia devolver el impuesto adicional de la categoria", () => {
      const venta = new Venta();
      expect(venta.impuestoAdicionalCategoria("Bebidas alcoholicas")).toEqual(0.07);
    });
  });

  describe("descuentoAdicionalCategoria", () => {
    it("deberia devolver el descuento adicional de la categoria", () => {
      const venta = new Venta();
      expect(venta.descuentoAdicionalCategoria("Alimentos")).toEqual(0.02);
    });
  });

  describe("costoEnvioUnidad", () => {
    it("deberia devolver 0 para un peso volumetrico de 10", () => {
      const venta = new Venta();
      expect(venta.costoEnvioUnidad(10)).toEqual(0);
    });

    it("deberia devolver 3.5 para un peso volumetrico de 20", () => {
      const venta = new Venta();
      expect(venta.costoEnvioUnidad(20)).toEqual(3.5);
    });

    it("deberia devolver 5 para un peso volumetrico de 40", () => {
      const venta = new Venta();
      expect(venta.costoEnvioUnidad(40)).toEqual(5);
    });

    it("deberia devolver 6 para un peso volumetrico de 80", () => {
      const venta = new Venta();
      expect(venta.costoEnvioUnidad(80)).toEqual(6);
    });

    it("deberia devolver 6.5 para un peso volumetrico de 100", () => {
      const venta = new Venta();
      expect(venta.costoEnvioUnidad(100)).toEqual(6.5);
    });

    it("deberia devolver 8 para un peso volumetrico de 200", () => {
      const venta = new Venta();
      expect(venta.costoEnvioUnidad(200)).toEqual(8);
    });

    it("deberia devolver 9 para un peso volumetrico de 201", () => {
      const venta = new Venta();
      expect(venta.costoEnvioUnidad(201)).toEqual(9);
    });
  });

  describe("obtenerTiposCliente", () => {
    it("deberia devolver la lista de tipos de cliente disponibles", () => {
      const venta = new Venta();
      expect(venta.obtenerTiposCliente()).toEqual([
        "Normal",
        "Recurrente",
        "Antiguo Recurrente",
        "Especial"
      ]);
    });
  });

  describe("descuentoEnvioCliente", () => {
    it("deberia devolver 0 de descuento en envio para un cliente Normal", () => {
      const venta = new Venta();
      expect(venta.descuentoEnvioCliente("Normal")).toEqual(0);
    });

    it("deberia devolver 0.005 de descuento en envio para un cliente Recurrente", () => {
      const venta = new Venta();
      expect(venta.descuentoEnvioCliente("Recurrente")).toEqual(0.005);
    });

    it("deberia devolver 0.01 de descuento en envio para un cliente Antiguo Recurrente", () => {
      const venta = new Venta();
      expect(venta.descuentoEnvioCliente("Antiguo Recurrente")).toEqual(0.01);
    });

    it("deberia devolver 0.015 de descuento en envio para un cliente Especial", () => {
      const venta = new Venta();
      expect(venta.descuentoEnvioCliente("Especial")).toEqual(0.015);
    });
  });

  describe("descuentoMontoFijo", () => {
    it("deberia devolver 100 de descuento fijo para cliente Recurrente con precio neto mayor a 3000 en Alimentos", () => {
      const venta = new Venta();
      expect(venta.descuentoMontoFijo(4000, "Alimentos", "Recurrente")).toEqual(100);
    });

    it("deberia devolver 200 de descuento fijo para cliente Especial con precio neto mayor a 7000 en Electronicos", () => {
      const venta = new Venta();
      expect(venta.descuentoMontoFijo(8000, "Electronicos", "Especial")).toEqual(200);
    });
  });
});
