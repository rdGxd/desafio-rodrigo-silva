export class CaixaDaLanchonete {
  constructor() {
    // Inicializando o cardápio com os preços dos itens
    this.cardapio = {
      cafe: 3.0,
      chantily: 1.5,
      suco: 6.2,
      sanduiche: 6.5,
      queijo: 2.0,
      salgado: 7.25,
      combo1: 9.5,
      combo2: 7.5,
    };
  }

  calcularValorDaCompra(formaPagamento, itens) {
    const formasValidas = ["debito", "dinheiro", "credito"];

    // Verificando se a forma de pagamento é válida
    if (!formasValidas.includes(formaPagamento)) {
      return "Forma de pagamento inválida!";
    }

    const carrinho = [];
    let valorTotal = 0;

    for (const itemInfo of itens) {
      const [codigo, quantidade] = itemInfo.split(",");

      // Checando quantidade do item
      const checandoQuantidade = Number(quantidade);
      if (checandoQuantidade <= 0) {
        return "Quantidade inválida!";
      }

      // Verificando se o item existe no cardápio
      if (!this.cardapio[codigo]) return "Item inválido!";

      // Verificando se os itens extras estão sendo pedidos com o item principal
      if (codigo === "chantily") {
        if (!carrinho.includes("cafe")) {
          return "Item extra não pode ser pedido sem o principal";
        }
      }

      if (codigo === "queijo") {
        if (!carrinho.includes("sanduiche")) {
          return "Item extra não pode ser pedido sem o principal";
        }
      }
      carrinho.push(codigo);

      // Calculando o valor total do carrinho
      valorTotal += this.cardapio[codigo] * checandoQuantidade;
    }
    if (carrinho.length === 0) {
      return "Não há itens no carrinho de compra!";
    } else {
      // Aplicando desconto ou acréscimo de acordo com a forma de pagamento
      if (formaPagamento === "dinheiro") valorTotal -= (valorTotal * 5) / 100;
      if (formaPagamento === "credito") valorTotal += (valorTotal * 3) / 100;
      return `R$ ${valorTotal.toFixed(2).replace(".", ",")}`;
    }
  }
}
