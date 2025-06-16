const btnSim = document.getElementById('btnSim');
const btnNao = document.getElementById('btnNao');
const conteudo = document.getElementById('conteudo');

btnSim.addEventListener('click', async () => {
  conteudo.innerHTML = '<p>Carregando personagem...</p>';

  const totalPersonagens = 826;
  const idAleatorio = Math.floor(Math.random() * totalPersonagens) + 1;

  try {
    const resposta = await fetch(`https://rickandmortyapi.com/api/character/${idAleatorio}`);
    const personagem = await resposta.json();

    conteudo.innerHTML = `
      <div class="card">
        <img src="${personagem.image}" alt="${personagem.name}" />
        <h2>${personagem.name}</h2>
        <p>Status: ${personagem.status}</p>
        <p>Espécie: ${personagem.species}</p>
        <p>Origem: ${personagem.origin.name}</p>
      </div>
    `;
  } catch (erro) {
    conteudo.innerHTML = '<p>Erro ao carregar personagem.</p>';
    console.error(erro);
  }
});

btnNao.addEventListener('click', () => {
  alert('Você escolheu ficar no portal!');
});
