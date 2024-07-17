'use strict';
const cards = document.querySelectorAll(".card"); // Manipulamos el DOM / seleccionamos los elementos con clase .card.

let firstCard, secondCard; //Creamos variables para la 1ra y 2da carta clickada.
let notBingo = false; //variable (notbingo) hará que no se puedan clickar más cartas una vez que se ha hecho un match o se estén comparando 2 cartas.

//Declaramos un contador de intentos y un contador de errores
let triesCounter = 0;
let errorCounter = 0;
let successCounter = 0;

// Manipulamos el DOM para mostar los contadores de tries, errors y success
const triesDisplay = document.getElementById('tries');
const errorDisplay = document.getElementById('errors');
const successDisplay = document.getElementById('success');

// Función flipCard() es la que se llama cada vez que hay un click en una carta: 
function flipCard() {
  if (notBingo) return; //si notBingo es falso (coincidiendo con su valor original), no permite que se dé vuelta una carta, por lo que la función flipCard() se detiene inmediatamente.

  if (this === firstCard) return; //Se comprueba si la carta que se acaba de girar (this) es la misma que la 1ra carta girada (firstCard). Si es así, la función se detiene para evitar procesar la misma carta 2 veces.

  // Agregamos la clase .flipped a la carta actual this, que suele hacer que la carta se dé vuelta.
  this.classList.add('flipped'); 

  if (!firstCard) { // Si firstCard no tiene valor, se asigna la carta actual (this) a firstCard.
    firstCard = this;
    return;
  }

  secondCard = this; // Si firstCard ya tiene un valor asigna la carta actual (this) a secondCard


  triesCounter++;//Incrementamos el contador de tries y lo mostramos en pantalla
  triesDisplay.textContent = `Intentos totales: ${triesCounter}`;

  checkForMatch(); //// Llama a la función checkForMatch para comprobar si las cartas coinciden.
}

//Función checkForMatch() comprueba si las cartas clickadas coinciden para dejarlas boca arriba (disabledCards()) o volverlas a voltear (unflipCards())

function checkForMatch() {
  let isMatch = firstCard.querySelector('.back').textContent === secondCard.querySelector('.back').textContent; //// Comprueba si el contenido de la parte trasera de las dos cartas es igual.

  if (isMatch) {
    disableCards();

    successCounter++; // Incrementa el contador de aciertos
    successDisplay.textContent = `Aciertos totales: ${successCounter}`; // Actualiza el display de aciertos
    
  } else {
    unflipCards();
  }
}

// Creamos función disableCards para deshabilitar la interactividad de las cartas seleccionadas
function disableCards() { //las cartas se quedan boca arriba y no se pueden seleccionar más
  firstCard.removeEventListener('click', flipCard); //(evento, función que eliminas)
  secondCard.removeEventListener('click', flipCard);

  resetBoard();
}


function unflipCards() { //cartas vuelven a su estado original si, al clickarlas no hay coincidencias
  
  errorCounter++;// incrementamos el contador de errores
  errorDisplay.textContent = `Errores totales: ${errorCounter}`;
  notBingo = true; //indicar que hay un error en el juego.

  setTimeout(() => { //función que eliminará el evento flipped pasado 1 sec 
    firstCard.classList.remove('flipped');
    secondCard.classList.remove('flipped');

    resetBoard(); //reinicia el tablero para poder empezar de nuevo el juego cuando se clicke la siguiente carta
  }, 1000);
}

//ResetBoard() reinicia las variables firstCard() y secondCard() para que el resultado anterior no interfiera con el próximo. Esta función se llama después de comprobar que las cartas anteriores (first y second) no coinciden
function resetBoard() {
  [firstCard, secondCard, notBingo] = [null, null, false];
}

cards.forEach(card => card.addEventListener('click', flipCard)); //recorremos cards y le añadimos un evento a cada carta que se clicke

// Creamos el array de emojis
const emojis =  ['👻', '👹', '👽', '🪢', '🦋', '🎲', '💻', '🌰'];

// Duplicamos el array
const pairedEmojis = emojis.concat(emojis);  // Esto crea un array con 16 elementos (8 pares)

// Mezclamos el array con el método Fisher-Yate, que baraja las cartas
function shuffle(array) { //esta función coge el array que le indiques y lo recorre desde el final al inicio
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1)); //selecciona un índice aleatorio: para cada elemento en i, selecciona un índice aleatorio j entre 0 y i.
        [array[i], array[j]] = [array[j], array[i]]; //intercambia los elementos
    }
    return array; //devuelve el array mezclado
};

const shuffledEmojis = shuffle(pairedEmojis); //indicamos a la función que baraje el array de los emojis

const backs = document.querySelectorAll('.back'); //manipulamos el DOM para meter en una variable los reversos de las cartas

// Distribuimos los emojis en el tablero de juego
backs.forEach((back, index) => {
    if (index < shuffledEmojis.length) {
        back.textContent = shuffledEmojis[index];
    } //si el index es menor que la longitud de shuffledEmojis, se asigna el emoji correspondiente a back.textContent.
});