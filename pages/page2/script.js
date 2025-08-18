document.addEventListener("DOMContentLoaded", () => {
  const categoryButtons = document.getElementById("category-buttons");
  const characterList = document.getElementById("character-list");
  const overlay = document.getElementById("character-overlay");
  const overlayImage = document.getElementById("overlay-image");
  const overlayName = document.getElementById("overlay-name");
  const closeOverlay = document.querySelector(".close-overlay");

  let speciesMap = {};

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

  function organizeBySpecies(characters) {
    speciesMap = {};

    characters.forEach(character => {
      const species = character.species || "Desconhecido";
      if (!speciesMap[species]) {
        speciesMap[species] = [];
      }
      speciesMap[species].push(character);
    });

    createCategoryButtons();
  }

  function createCategoryButtons() {
    categoryButtons.innerHTML = "";

    Object.keys(speciesMap).forEach(species => {
      const button = document.createElement("button");
      button.textContent = species;
      button.addEventListener("click", () => showCharacters(species));
      categoryButtons.appendChild(button);
    });
  }

  function showCharacters(species) {
    characterList.innerHTML = "";

    speciesMap[species].forEach(character => {
      const card = document.createElement("div");
      card.classList.add("character-card");
      card.innerHTML = `
        <img src="${character.image}" alt="${character.name}" />
        <p>${character.name}</p>
      `;
      card.addEventListener("click", () => showOverlay(character));
      characterList.appendChild(card);
    });
  }

  function showOverlay(character) {
    overlayImage.src = character.image;
    overlayName.textContent = character.name;
    overlay.classList.remove("hidden");
  }

  closeOverlay.addEventListener("click", () => {
    overlay.classList.add("hidden");
  });

  // Inicializa
  fetchAllCharacters()
    .then(organizeBySpecies)
    .catch(err => console.error("Erro ao carregar personagens:", err));
});
