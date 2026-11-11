const SEM_DESCONTO = 0;

// Cada regra: "quando" decide se se aplica, "taxa" é o percentual de desconto.
// A ordem importa: a primeira regra que casar vence (da mais específica à mais geral).
const REGRAS_POR_TIPO = new Map([
  [
    "premium",
    [
      { quando: (cliente, valor) => valor > 1000 && cliente.anosCadastro > 5, taxa: 0.2 },
      { quando: (_cliente, valor) => valor > 1000, taxa: 0.15 },
      { quando: (_cliente, valor) => valor > 500, taxa: 0.1 },
      { quando: () => true, taxa: 0.05 },
    ],
  ],
  [
    "gold",
    [
      { quando: (_cliente, valor) => valor > 1000, taxa: 0.1 },
      { quando: () => true, taxa: 0.02 },
    ],
  ],
]);

function calcularDesconto(cliente, valor) {
  const regras = REGRAS_POR_TIPO.get(cliente.tipo) ?? [];
  const regra = regras.find((r) => r.quando(cliente, valor));

  return regra ? valor * regra.taxa : SEM_DESCONTO;
}

module.exports = calcularDesconto;
