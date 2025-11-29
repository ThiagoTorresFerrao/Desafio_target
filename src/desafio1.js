const vendas = require("../data/vendas.json").vendas;

function calcularComissao(valor){
  if(valor < 100) return 0;
  if(valor < 500) return valor * 0.01;
  return valor * 0.05;
}

function apurar(){
  const total = {};
  vendas.forEach(v=>{
    const c = calcularComissao(v.valor);
    if(!total[v.vendedor]) total[v.vendedor] = 0;
    total[v.vendedor] += c;
  });
  console.log("Comissões por vendedor:");
  console.log(total);
}

apurar();
