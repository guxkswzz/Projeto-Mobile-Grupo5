document.addEventListener("DOMContentLoaded", () => {
    const infoBox = document.querySelector(".info-box");
    const characterInfo = document.querySelector(".main-content p");
    const navButtons = document.querySelectorAll(".nav-button");
    const navArrowNext = document.querySelector(".nav-arrow-next");
    const navArrowPrev = document.querySelector(".nav-arrow-prev");

    let currentCharacterId = 1; 

    async function fetchCharacter(id, direction = "right") {
        try {
            const response = await fetch(`https://rickandmortyapi.com/api/character/${id}`);
            const data = await response.json();

            
            infoBox.style.animation = direction === "right" ? "slideInRight 0.5s ease-in-out" : "slideInLeft 0.5s ease-in-out";

            
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

    
    navArrowNext.addEventListener("click", () => {
        currentCharacterId += 4; 
        updateNavButtons(currentCharacterId);
    });

    
    navArrowPrev.addEventListener("click", () => {
        if (currentCharacterId > 4) {
            currentCharacterId -= 4; 
            updateNavButtons(currentCharacterId);
        }
    });

    
    fetchCharacter(currentCharacterId);
    updateNavButtons(currentCharacterId);
});
