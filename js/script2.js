'use strict';
// Manipulamos el DOM / seleccionamos los elementos con clase .card.
const cards = document.querySelectorAll(".card");

// Creamos variables para la primera y segunda carta clickada y otra variable más para el momento en el que coinciden las dos cartas seleccionadas.
let firstCard, secondCard;
let notBingo = false;

// Declaramos variables para los contadores de intentos, errores y aciertos
let triesCounter = 0;
let errorCounter = 0;
let successCounter = 0;

// Elementos del DOM para mostrar los contadores 
const triesDisplay = document.getElementById('tries');
const errorDisplay = document.getElementById('errors');
const successDisplay = document.getElementById('success');

/* Creamos callback flipCard() que se ejecuta al hacer click en una carta.
Si notBingo se cumple(false) la función se detiene.
Verificamos si this es la misma que firstCard para prevenir el hacer click dos veces a la misma carta .
Agregamos la propiedad flipped a la carta actual.
Si firstCard ya tiene un valor le asigna el valor this a secondCard.
Actualizamos los contadores.
Ejecutamos checkForMatch.
*/
function flipCard() {
if (notBingo) return;
if (this === firstCard) return;
 this.classList.add('flipped');

 if (!firstCard) {
    firstCard = this;
    return;
}
    secondCard = this;
    
        triesCounter++;
        triesDisplay.textContent = `Intentos totales: ${triesCounter}`;
    checkForMatch();
}

const popup = document.getElementById('popup');
const closePopupButton = document.getElementById('close-popup');
const restartButton = document.getElementById('restart');


// -- NUEVO!!!!!!! --- Creamos nextLevelButton
const nextLevelButton = document.getElementById('nextLevel');


/* Creamos la función checkForMatch para comprobar si las cartas clicadas coinciden comparando el contenido de firstCard y secondCard. Si las coinciden desactivamos las cartas para que queden boca arriba, sumamos 1 a successCounter, actualizamos el contador de aciertos y comparamos si el número de aciertos es 8, entonces finaliza el juego mostrando mensaje.
Si no coinciden, las cartas vuelven a su estado original boca abajo 
*/
function checkForMatch() {
    
    let isMatch = firstCard.querySelector('.back').textContent === secondCard.querySelector('.back').textContent;
    
    if (isMatch) {
    
        disableCards();
        
        successCounter++;
        successDisplay.textContent = `Aciertos totales: ${successCounter}`;
    
    if (successCounter === 10) {
        showPopup('¡Has encontrado todas las parejas👌, pasa al siguiente nivel!!!');
    }
    } else {
    
        unflipCards();
    }
}

function showPopup(message) {
  
    const popupMessage = document.getElementById('popupMessage');
    
    popupMessage.textContent = message;
    popup.style.display = 'flex';
}

closePopupButton.addEventListener('click', () => {
    
  popup.style.display = 'none';
});

restartButton.addEventListener('click', () => {
    
  popup.style.display = 'none';
    startGame();
});

// Reseteamos contadores, mostramos display de los contadores a 0 y repartimos emojis a cada carta
function startGame() {
  triesCounter = 0;
  errorCounter = 0;
  successCounter = 0;
  triesDisplay.textContent = `Intentos totales: ${triesCounter} `;
  errorDisplay.textContent = `Errores totales: ${errorCounter}`;
  successDisplay.textContent = `Aciertos totales: ${successCounter}`;

  cards.forEach(card => {
  card.classList.remove('flipped');
  card.addEventListener('click', flipCard);
});
}

// -- SIRVE PARA PASAR AL HTML DEL NIVEL 2, LO HE LLAMADO indexLevel2.html PARA ACLARARME YO, PERO LE PODEMOS PONER COMO SEA
nextLevelButton.addEventListener('click', () => {
window.location.href = 'index3.html';
});


// Creamos función disableCards para deshabilitar la interactividad de las cartas seleccionadas
function disableCards() {
firstCard.removeEventListener('click', flipCard);
secondCard.removeEventListener('click', flipCard);
resetBoard();
}

// Creamos la función unflipCards para evitar que den la vuelta si las cartas clicadas coinciden
function unflipCards() {
errorCounter++;
errorDisplay.textContent = `Errors: ${errorCounter}`;
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

// Creamos el array de emojis y lo duplicamos
const emojis = ['👻', '👹', '👽', '🪢', '🦋', '🎲', '💻', '🌰', '🐙', '🍕'];
const pairedEmojis = emojis.concat(emojis);

// Mezclamos el array (usando Fisher-Yates)
function shuffle(array) {
for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
}
return array;
}

const shuffledEmojis = shuffle(pairedEmojis);
const backs = document.querySelectorAll('.back');

// Asignamos un emoji a cada carta 
backs.forEach((back, index) => {
if (index < shuffledEmojis.length) {
    back.textContent = shuffledEmojis[index];
}
});