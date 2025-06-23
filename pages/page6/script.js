const btnSim = document.getElementById('btnSim');
const btnNao = document.getElementById('btnNao');
const conteudo = document.getElementById('conteudo');

  btnSim.addEventListener('click', async () => {
      window.location.href = "page1.html" ;
    });

btnNao.addEventListener('click', () => {
  alert('Você escolheu ficar no portal!');
});
