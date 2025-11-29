function calcularJuros(valor, vencimento){
  const hoje = new Date();
  const data = new Date(vencimento);
  const dias = Math.floor((hoje-data)/(1000*60*60*24));
  if(dias<=0) return console.log({diasAtraso:0,valorFinal:valor});
  const valorFinal = valor * (1 + dias * 0.025);
  console.log({diasAtraso:dias,valorOriginal:valor,valorFinal:valorFinal.toFixed(2)});
}

calcularJuros(1000,"2025-01-10");
