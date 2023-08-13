export class CaixaDaLanchonete {
  constructor() {
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

  calcularValorDaCompra(formaDePagamento, itens) {
    const formasDePagamentoValidas = ["debito", "credito", "dinheiro"];

    if (!formasDePagamentoValidas.includes(formaDePagamento)) {
      return "Forma de pagamento inválida!";
    }

    const carrinho = {};
    let valorTotal = 0;

    for (const itemInfo of itens) {
      const [codigo, quantidade] = itemInfo.split(",");

      let checandoQuantidade = Number(quantidade);
      if (checandoQuantidade <= 0) return "Quantidade inválida!";

      if (!this.cardapio[codigo]) {
        return "Item inválido!";
      }

      if (
        (this.cardapio[codigo] && codigo !== "chantily") ||
        (this.cardapio[codigo] && codigo !== "queijo")
      ) {
        if (!carrinho[codigo]) {
          carrinho[codigo] = 0;
        }
        carrinho[codigo] += parseInt(quantidade);
      }
      if (codigo === "chantily") {
        if (!carrinho["cafe"]) {
          return "Item extra não pode ser pedido sem o principal";
        }
      }
      if (codigo === "queijo") {
        if (!carrinho["sanduiche"]) {
          return "Item extra não pode ser pedido sem o principal";
        }
      }
    }

    if (Object.keys(carrinho).length === 0) {
      return "Não há itens no carrinho de compra!";
    }

    for (const codigo in carrinho) {
      valorTotal += this.cardapio[codigo] * carrinho[codigo];
    }

    if (formaDePagamento === "dinheiro") {
      valorTotal *= 0.95;
    } else if (formaDePagamento === "credito") {
      valorTotal *= 1.03;
    }

    return `R$ ${valorTotal.toFixed(2).replace(".", ",")}`;
  }
}

// Exemplos de uso:
const caixa = new CaixaDaLanchonete();

console.log(caixa.calcularValorDaCompra("debito", ["chantily,1"])); // "Item extra não pode ser pedido sem o principal"
console.log(caixa.calcularValorDaCompra("debito", ["cafe,0", "chantily,1"])); // "R$ 4,50"
console.log(caixa.calcularValorDaCompra("credito", ["combo1,1", "cafe,2"])); // "R$ 15,96"
