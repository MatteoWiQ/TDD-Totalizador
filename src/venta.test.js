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
  });
});
