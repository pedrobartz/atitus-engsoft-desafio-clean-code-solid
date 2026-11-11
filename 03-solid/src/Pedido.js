class Pedido {
  constructor(dados) {
    this.dados = dados;
  }

  validar() {
    const { itens } = this.dados;
    if (!itens || itens.length === 0) throw new Error("Pedido sem itens");
  }

  subtotal() {
    return this.dados.itens.reduce((soma, item) => soma + item.preco * item.quantidade, 0);
  }
}

module.exports = Pedido;
