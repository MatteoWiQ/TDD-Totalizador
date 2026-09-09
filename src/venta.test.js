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
});
