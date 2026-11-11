const LIMITE_PARA_DESCONTO = 1000;
const FATOR_DESCONTO = 0.9;

class CalculadoraDeTotal {
  calcular(pedido) {
    const subtotal = pedido.subtotal();
    return subtotal > LIMITE_PARA_DESCONTO ? subtotal * FATOR_DESCONTO : subtotal;
  }
}

module.exports = CalculadoraDeTotal;
