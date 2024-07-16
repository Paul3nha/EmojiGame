const cards = document.querySelectorAll(".card");

const reveal = (e) => {
  const currentCard = e.currentTarget;
  currentCard.classList.add("flipped");

  setTimeout(() => {
    currentCard.classList.remove("flipped");
  }, 1000);
};

for (const card of cards) {
  card.addEventListener("click", reveal);
}

// Paso 1: Crear el array de emojis
const emojis =  ['👻', '👹', '🤪', '😎', '🤑', '💩', '🤬', '😋'];

// Paso 2: Duplicar el array
const pairedEmojis = emojis.concat(emojis);  // Esto crea un array con 16 elementos (8 pares)

// Paso 3: Mezclar el array (usando Fisher-Yates)
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

const shuffledEmojis = shuffle(pairedEmojis);  // Debes mezclar el array duplicado

const backs = document.querySelectorAll('.back');

backs.forEach((back, index) => {
    if (index < shuffledEmojis.length) {
        back.textContent = shuffledEmojis[index];
    }
});



