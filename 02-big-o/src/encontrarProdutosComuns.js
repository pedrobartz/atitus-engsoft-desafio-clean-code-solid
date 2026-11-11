/**
 * Retorna os itens de listaA que também existem em listaB.
 * Complexidade: O(n + m) — um Set de listaB dá busca O(1) por item.
 */
function encontrarProdutosComuns(listaA, listaB) {
  const produtosDeB = new Set(listaB);

  return listaA.filter((produto) => produtosDeB.has(produto));
}

module.exports = encontrarProdutosComuns;
