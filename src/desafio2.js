const estoque = require("../data/estoque.json").estoque;

function gerarId(){
  return Math.floor(Math.random()*1000000);
}

function movimentar(codigo, qtd, descricao){
  const produto = estoque.find(p=>p.codigoProduto===codigo);
  if(!produto) return console.log("Produto não encontrado!");
  const id = gerarId();
  produto.estoque += qtd;
  console.log({id,descricao,produto:produto.descricaoProduto,estoqueFinal:produto.estoque});
}

// Exemplos de uso
movimentar(101,20,"Entrada de reposição");
movimentar(102,-10,"Venda para cliente");
