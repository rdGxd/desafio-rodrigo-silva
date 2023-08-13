// Definição da classe CaixaDaLanchonete
export class CaixaDaLanchonete {
  constructor() {
    // Inicialização do cardápio com itens e seus preços correspondentes
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

  // Método para calcular o valor total da compra
  calcularValorDaCompra(formaDePagamento, itens) {
    // Lista de formas de pagamento válidas
    const formasDePagamentoValidas = ["debito", "credito", "dinheiro"];

    // Verificação da forma de pagamento válida
    if (!formasDePagamentoValidas.includes(formaDePagamento)) {
      return "Forma de pagamento inválida!";
    }

    // Inicialização do carrinho de compras vazio e valor total
    const carrinho = {};
    let valorTotal = 0;

    // Loop para processar cada item no pedido
    for (const itemInfo of itens) {
      // Separação do código do item e sua quantidade
      const [codigo, quantidade] = itemInfo.split(",");

      // Conversão da quantidade para número e verificação se é válida
      let checandoQuantidade = Number(quantidade);
      if (checandoQuantidade <= 0) return "Quantidade inválida!";

      // Verificação se o item está no cardápio
      if (!this.cardapio[codigo]) {
        return "Item inválido!";
      }

      // Verificação de condições para adicionar o item ao carrinho
      if (
        (this.cardapio[codigo] && codigo !== "chantily") ||
        (this.cardapio[codigo] && codigo !== "queijo")
      ) {
        // Criação ou incremento da quantidade do item no carrinho
        if (!carrinho[codigo]) {
          carrinho[codigo] = 0;
        }
        carrinho[codigo] += Number(quantidade);
      }
      // Verificação de itens extras sem o item principal correspondente
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

    // Verificação se o carrinho está vazio
    if (Object.keys(carrinho).length === 0) {
      return "Não há itens no carrinho de compra!";
    }

    // Cálculo do valor total da compra com base no carrinho
    for (const codigo in carrinho) {
      valorTotal += this.cardapio[codigo] * carrinho[codigo];
    }

    // Aplicação de desconto ou acréscimo com base na forma de pagamento
    if (formaDePagamento === "dinheiro") {
      valorTotal *= 0.95;
    } else if (formaDePagamento === "credito") {
      valorTotal *= 1.03;
    }

    // Retorno do valor total formatado como uma string
    return `R$ ${valorTotal.toFixed(2).replace(".", ",")}`;
  }
}
