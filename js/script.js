'use strict';
const cards = document.querySelectorAll(".card"); // Manipulamos el DOM / seleccionamos los elementos con clase .card.

let firstCard, secondCard;
let notBingo = false; // Creamos variables para la primera y segunda carta clickada y otra variable más para el momento en el que coinciden las dos cartas seleccionadas.

// Declaramos un contador de intentos y un contador de errores
//let aciertosCounter = 0;
//let errorCounter = 0;

// Elementos del DOM para mostar los contadores de intentos y errores
//const aciertosDisplay = document.getElementById('aciertos');
//const errorDisplay = document.getElementById('errors');

// Creamos función flipCard para controlar el click en cada carta - si bingo se cumple(su valor original es false), retorna y no ejecuta nada más
function flipCard() {
  if (notBingo) return; 
  if (this === firstCard) return; // Comprobamos si la carta girada (this) es la misma que firstCard. Si es igual la función se detiene para evitar que la carta se vuelva a procesar

  // Agregamos flipped a la tarjeta actual this
  this.classList.add('flipped'); 

  // Si firstCard no tiene valor asigna el valor que tiene this a firstCard
  if (!firstCard) {
    firstCard = this;
    return;
  }

  // Si firstCard ya tiene un valor asigna la carta actual (this) a secondCard
  secondCard = this; 

  //Incrementamos el contador de intentos y lo mostramos en pantalla
  //aciertosCounter++;
  //aciertosDisplay.textContent = (`Intentos totales: ${aciertosCounter}`);

  checkForMatch(); 
}

// Creamos la función checkForMatch para comprobar si las cartas clicadas coinciden
function checkForMatch() {
  let isMatch = firstCard.querySelector('.back').textContent === secondCard.querySelector('.back').textContent;

  isMatch ? disableCards() : unflipCards();
}

// Creamos función disableCards para deshabilitar la interactividad de las cartas seleccionadas
function disableCards() {
  firstCard.removeEventListener('click', flipCard);
  secondCard.removeEventListener('click', flipCard);

  resetBoard();
}

// Creamos la función unflipCards para evitar que den la vuelta si las cartas clicadas coinciden
function unflipCards() {
  // incrementamos el contador de errores
  //errorCounter++;
  //errorDisplay.textContent = `Errores totales: ${errorCounter}`;
  notBingo = true;

  setTimeout(() => {
    firstCard.classList.remove('flipped');
    secondCard.classList.remove('flipped');

    resetBoard();
  }, 1000);
}

// Creamos función resetBoard para asegurarnos de que el resultado anteriomente seleccionado no interfiera con el moviento siguiente
function resetBoard() {
  [firstCard, secondCard, notBingo] = [null, null, false];
}

cards.forEach(card => card.addEventListener('click', flipCard));

// Creamos el array de emojis
const emojis =  ['👻', '👹', '👽', '🪢', '🦋', '🎲', '💻', '🌰'];

// Duplicamos el array
const pairedEmojis = emojis.concat(emojis);  // Esto crea un array con 16 elementos (8 pares)

// Mezclamos el array (usando Fisher-Yates)
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
};


const shuffledEmojis = shuffle(pairedEmojis);

const backs = document.querySelectorAll('.back');

// Asignamos un emoji a cada carta 
backs.forEach((back, index) => {
    if (index < shuffledEmojis.length) {
        back.textContent = shuffledEmojis[index];
    }
});