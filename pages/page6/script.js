const btnSim = document.getElementById('btnSim');
const btnNao = document.getElementById('btnNao');
const conteudo = document.getElementById('conteudo');

btnSim.addEventListener('click', async () => {
  window.location.href = "../page1/index.html"; 
});

btnNao.addEventListener('click', () => {
  window.location.href = "../page2/index.html";
});
