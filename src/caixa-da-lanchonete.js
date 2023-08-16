// Definição da classe CaixaDaLanchonete
export class CaixaDaLanchonete {
  constructor() {
    // Inicializando o cardápio com os preços dos itens
    this.cardapio = {
      cafe: 3.0, // Preço do café
      chantily: 1.5, // Preço do chantilly
      suco: 6.2, // Preço do suco
      sanduiche: 6.5, // Preço do sanduíche
      queijo: 2.0, // Preço do queijo
      salgado: 7.25, // Preço do salgado
      combo1: 9.5, // Preço do combo 1
      combo2: 7.5, // Preço do combo 2
    };
  }

  // Método para calcular o valor da compra
  calcularValorDaCompra(formaPagamento, itens) {
    const PagamentoValidos = ["dinheiro", "credito", "debito"];

    const carrinho = {}; // Carrinho de compras vazio
    let valorTotal = 0; // Valor total da compra inicializado

    // Verificação da forma de pagamento
    if (!PagamentoValidos.includes(formaPagamento)) {
      return "Forma de pagamento inválida!";
    }

    // Verificação de itens no carrinho
    if (itens <= 0) return "Não há itens no carrinho de compra!";

    // Iteração sobre os itens no carrinho
    for (const itemInfo of itens) {
      const [item, quantidade] = itemInfo.split(",");

      // Verificação de quantidade inválida
      if (Number(quantidade) <= 0) return "Quantidade inválida!";

      // Verificação de item inválido
      if (!this.cardapio[item]) return "Item inválido!";

      // Atualização do carrinho com os itens e quantidades
      if (this.cardapio[item]) {
        if (!carrinho[item]) carrinho[item] = quantidade;
      }

      // Verificação de itens adicionais
      if (item === "chantily") {
        if (!carrinho.cafe) {
          return "Item extra não pode ser pedido sem o principal";
        }
      }

      if (item === "queijo") {
        if (!carrinho.sanduiche) {
          return "Item extra não pode ser pedido sem o principal";
        }
      }
    }

    // Cálculo do valor total da compra
    for (const pedido in carrinho) {
      valorTotal += carrinho[pedido] * this.cardapio[pedido];
    }

    // Cálculo de desconto ou acréscimo baseado na forma de pagamento
    if (formaPagamento === "dinheiro") valorTotal -= (valorTotal * 5) / 100;
    if (formaPagamento === "credito") valorTotal += (valorTotal * 3) / 100;

    // Retorno do valor total formatado como moeda
    return `R$ ${valorTotal.toFixed(2).replace(".", ",")}`;
  }
}
