// Selecionando os elementos
const itemInput = document.getElementById("item-input");
const addItemBtn = document.getElementById("add-item-btn");
const clearItemsBtn = document.getElementById("clear-items-btn");
const favoritosList = document.getElementById("favoritos-list");

// Função para adicionar o item na lista
function addItem() {
    const itemValue = itemInput.value.trim();
    
    if (itemValue !== "") {
        const listItem = document.createElement("li");
        listItem.innerHTML = `${itemValue} <button onclick="removeItem(this)">Remover</button>`;
        favoritosList.appendChild(listItem);
        
        // Limpa o campo de input após adicionar o item
        itemInput.value = "";
    }
}

// Função para remover o item da lista
function removeItem(button) {
    const listItem = button.parentElement;
    favoritosList.removeChild(listItem);
}

// Função para limpar todos os itens
function clearItems() {
    favoritosList.innerHTML = "";
}

// Adicionando o evento de clique no botão de adicionar
addItemBtn.addEventListener("click", addItem);

// Adicionando o evento de clique no botão de limpar
clearItemsBtn.addEventListener("click", clearItems);

// Também permite adicionar pelo teclado (pressionando Enter)
itemInput.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        addItem();
    }
});