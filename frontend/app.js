// Frontend app.js — carrega os dados e fornece UI
async function fetchJson(path){ const res = await fetch(path); return res.json(); }

function calcularComissao(valor){
  if(valor < 100) return 0;
  if(valor < 500) return valor * 0.01;
  return valor * 0.05;
}

async function renderComissoes(){
  const data = await fetchJson("../data/vendas.json");
  const vendas = data.vendas;
  const totals = {};
  vendas.forEach(v=>{
    const c = calcularComissao(v.valor);
    totals[v.vendedor] = (totals[v.vendedor] || 0) + c;
  });
  const container = document.getElementById("comissoesContent");
  container.innerHTML = "";
  const table = document.createElement("table");
  table.innerHTML = "<thead><tr><th>Vendedor</th><th>Comissão (R$)</th></tr></thead>";
  const tbody = document.createElement("tbody");
  Object.keys(totals).forEach(k=>{
    const tr = document.createElement("tr");
    tr.innerHTML = `<td>${k}</td><td>${totals[k].toFixed(2)}</td>`;
    tbody.appendChild(tr);
  });
  table.appendChild(tbody);
  container.appendChild(table);
}

async function renderEstoque(){
  const data = await fetchJson("../data/estoque.json");
  const lista = data.estoque;
  window._estoque = lista; // global for operations
  const sel = document.getElementById("prodSelect");
  sel.innerHTML = "";
  lista.forEach(p=>{
    const opt = document.createElement("option");
    opt.value = p.codigoProduto; opt.textContent = `${p.codigoProduto} — ${p.descricaoProduto}`;
    sel.appendChild(opt);
  });
  updateEstoqueList();
}

function updateEstoqueList(){
  const lista = window._estoque || [];
  const cont = document.getElementById("estoqueList");
  cont.innerHTML = "";
  const table = document.createElement("table");
  table.innerHTML = "<thead><tr><th>Código</th><th>Produto</th><th>Qtd</th></tr></thead>";
  const tbody = document.createElement("tbody");
  lista.forEach(p=>{
    const tr = document.createElement("tr");
    tr.innerHTML = `<td>${p.codigoProduto}</td><td>${p.descricaoProduto}</td><td>${p.estoque}</td>`;
    tbody.appendChild(tr);
  });
  table.appendChild(tbody);
  cont.appendChild(table);
}

document.getElementById("movForm").addEventListener("submit",(e)=>{
  e.preventDefault();
  const codigo = Number(document.getElementById("prodSelect").value);
  const qtd = Number(document.getElementById("qtd").value) * (document.getElementById("tipo").value === "entrada" ? 1 : -1);
  const desc = document.getElementById("desc").value || "Movimentação";
  const produto = window._estoque.find(p=>p.codigoProduto===codigo);
  if(!produto){ alert("Produto não encontrado"); return; }
  produto.estoque += qtd;
  // simple ID generator
  const id = Math.floor(Math.random()*1000000);
  updateEstoqueList();
  alert(`Movimentação registrada\nID: ${id}\nProduto: ${produto.descricaoProduto}\nEstoque final: ${produto.estoque}`);
});

document.getElementById("jurosForm").addEventListener("submit",(e)=>{
  e.preventDefault();
  const valor = Number(document.getElementById("valor").value);
  const venc = document.getElementById("venc").value;
  if(!valor || !venc){ alert("Preencha valor e vencimento"); return; }
  const hoje = new Date();
  const dataV = new Date(venc);
  const dias = Math.floor((hoje - dataV)/(1000*60*60*24));
  if(dias <= 0){
    document.getElementById("jurosResult").textContent = "Sem atraso. Valor a pagar: R$ " + valor.toFixed(2);
    return;
  }
  const valorFinal = valor * (1 + dias * 0.025);
  document.getElementById("jurosResult").textContent = `Atraso: ${dias} dias • Valor final com juros: R$ ${valorFinal.toFixed(2)}`;
});

// Inicialização
(async function(){
  await renderComissoes();
  await renderEstoque();
})();
