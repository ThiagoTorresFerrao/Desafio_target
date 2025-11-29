Desafio Técnico Target SIstemas para a vaga de Desenvolvedor/a de Sistemas Jr.

Estrutura incluída:

/src - scripts Node.js (desafio1.js, desafio2.js, desafio3.js)
/data - JSONs completos (vendas.json, estoque.json)
/frontend - aplicação visual (index.html, styles.css, app.js)
desafio_formal.pdf - documentação formal
README.md - este arquivo

Como usar (localmente)

1. Descompacte o pacote.
2. Para executar os scripts Node.js: `node src/desafio1.js`
3. Para abrir o front-end localmente de forma correta (fetch das JSONs):
   - Rode um servidor estático na raiz do pacote. Exemplo rápido com Node: 
     `npx http-server .` (ou `python -m http.server 8000`)
   - Acesse `http://localhost:8080/frontend/` (ou porta usada).
