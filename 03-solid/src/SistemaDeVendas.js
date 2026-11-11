const Pedido = require("./Pedido");
const CalculadoraDeTotal = require("./CalculadoraDeTotal");
const VendasRepository = require("./VendasRepository");
const NotificadorService = require("./NotificadorService");

// Orquestra o fluxo da venda; cada passo é delegado a uma colaboração com
// responsabilidade única. As dependências chegam por injeção (DIP): os valores
// padrão só existem para manter compatível o uso `new SistemaDeVendas()`.
class SistemaDeVendas {
  constructor({
    calculadora = new CalculadoraDeTotal(),
    repository = new VendasRepository(),
    notificador = new NotificadorService(),
  } = {}) {
    this.calculadora = calculadora;
    this.repository = repository;
    this.notificador = notificador;
  }

  async processarVenda(dadosPedido) {
    const pedido = new Pedido(dadosPedido);
    pedido.validar();

    const total = this.calculadora.calcular(pedido);
    const vendaPaga = { ...dadosPedido, total, status: "pago" };

    await this.repository.salvar(vendaPaga);
    await this.notificador.notificar(dadosPedido.clienteEmail, vendaPaga);

    return vendaPaga;
  }
}

module.exports = SistemaDeVendas;
