document.addEventListener("DOMContentLoaded", () => {
  const infoBox = document.querySelector(".info-box");
  const characterInfo = document.querySelector("#character-info");
  const navButtons = document.querySelectorAll(".nav-button");
  const navArrowNext = document.querySelector(".nav-arrow-next");
  const navArrowPrev = document.querySelector(".nav-arrow-prev");
  const speciesContainer = document.getElementById("species-container");

  let currentCharacterId = 1;

  async function fetchCharacter(id, direction = "right") {
    try {
      const response = await fetch(`https://rickandmortyapi.com/api/character/${id}`);
      const data = await response.json();

      infoBox.style.animation =
        direction === "right" ? "slideInRight 0.5s ease-in-out" : "slideInLeft 0.5s ease-in-out";

      setTimeout(() => {
        infoBox.innerHTML = `<img src="${data.image}" alt="${data.name}" class="character-image">`;
        infoBox.style.animation = "";
      }, 200);

      characterInfo.innerHTML = `
        <strong>${data.name}</strong><br>
        Status: ${data.status}<br>
        Espécie: ${data.species}<br>
        Origem: ${data.origin.name}
      `;
    } catch (error) {
      console.error("Erro ao buscar personagem:", error);
    }
  }

  function updateNavButtons(startId) {
    navButtons.forEach((button, index) => {
      const characterId = startId + index;
      button.setAttribute("data-id", characterId);

      fetch(`https://rickandmortyapi.com/api/character/${characterId}`)
        .then(response => response.json())
        .then(data => {
          button.innerHTML = `<img src="${data.image}" alt="${data.name}" class="nav-character-image">`;
        })
        .catch(error => console.error("Erro ao buscar personagem:", error));
    });
  }

  navButtons.forEach(button => {
    button.addEventListener("click", () => {
      const characterId = parseInt(button.getAttribute("data-id"));
      fetchCharacter(characterId);
    });
  });

  if (navArrowNext) {
    navArrowNext.addEventListener("click", () => {
      currentCharacterId += 4;
      updateNavButtons(currentCharacterId);
    });
  }

  if (navArrowPrev) {
    navArrowPrev.addEventListener("click", () => {
      if (currentCharacterId > 4) {
        currentCharacterId -= 4;
        updateNavButtons(currentCharacterId);
      }
    });
  }

  async function fetchAllCharacters() {
    let allCharacters = [];
    let url = "https://rickandmortyapi.com/api/character";

    while (url) {
      const res = await fetch(url);
      const data = await res.json();
      allCharacters = allCharacters.concat(data.results);
      url = data.info.next;
    }

    return allCharacters;
  }

  function renderCharactersBySpecies(list) {
    speciesContainer.innerHTML = "";

    const speciesMap = {};

    list.forEach(character => {
      if (!speciesMap[character.species]) {
        speciesMap[character.species] = [];
      }
      speciesMap[character.species].push(character);
    });

    Object.entries(speciesMap).forEach(([species, characters]) => {
      const speciesBlock = document.createElement("div");
      speciesBlock.classList.add("species-block");

      const title = document.createElement("h3");
      title.textContent = species;
      speciesBlock.appendChild(title);

      const characterRow = document.createElement("div");
      characterRow.classList.add("character-row");

      characters.forEach(character => {
        const card = document.createElement("div");
        card.classList.add("character-card");
        card.innerHTML = `
          <img src="${character.image}" alt="${character.name}" />
          <p>${character.name}</p>
        `;
        characterRow.appendChild(card);
      });

      speciesBlock.appendChild(characterRow);
      speciesContainer.appendChild(speciesBlock);
    });
  }

  fetchCharacter(currentCharacterId);
  updateNavButtons(currentCharacterId);

  fetchAllCharacters()
    .then(renderCharactersBySpecies)
    .catch(err => console.error("Erro ao carregar personagens:", err));
});
