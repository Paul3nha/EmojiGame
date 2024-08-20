"use strict";

//Variables globales para jugar
let firstCard, secondCard;
let notBingo = false;
let triesCounter = 0;
let errorCounter = 0;
let successCounter = 0;
let currentLevel = 1; //nivel actual
const allLevels = { 1: 16, 2: 20, 3: 24 }; //nº de cartas según nivel

//Manipulamos el DOM asignando variables a diferentes elementos
const triesDisplay = document.getElementById("tries"); //contador intentos
const errorDisplay = document.getElementById("errors"); //contador fallos
const successDisplay = document.getElementById("success"); //contador aciertos
const popup = document.getElementById("popup"); //popup que aparece cuando pasas de nivel
const closePopupButton = document.getElementById("close-popup"); //botón para cerrar el popup
const restartButton = document.getElementById("restart"); //botón del popup para empezar de nuevo el mismo nivel
const nextLevelButton = document.getElementById("nextLevel"); //botón del popup para pasar al siguiente nivel
const cardContainer = document.getElementById("card-container"); //contenedor dinámico de cartas

//Array de emojis
const emojis = [
  "👻",
  "🧑🏾‍🦯‍➡️",
  "🥑",
  "🍼",
  "🐙",
  "🧜‍♂️",
  "🔫",
  "🍫",
  "🍆",
  "🦎",
  "🍕",
  "🌟",
];

//Reseteamos los contadores, mostramos display de contadores a 0 y repartimos emojis de cada carta
function startGame() {
  triesCounter = 0;
  errorCounter = 0;
  successCounter = 0;
  triesDisplay.textContent = `Tries: ${triesCounter} `;
  errorDisplay.textContent = `Errors: ${errorCounter}`;
  successDisplay.textContent = `Matches: ${successCounter}`;

  //Generar cartas según nivel actual
  generateCards(allLevels[currentLevel]);

  //Resetear el tablero
  resetBoard();
}

//Generamos las cartas según el nivel actual de juego
function generateCards(numCards) {
  cardContainer.innerHTML = ""; //borra el valor de las cartas (si es que existe)

  //Eliminar grids previos (si existiesen)
  cardContainer.classList.remove("grid-4x4", "grid-5x4", "grid-6x4");

  //Asignar la clase correcta según el número de cartas
  if (numCards === 16) {
    cardContainer.classList.add("grid-4x4"); //lama al css
  } else if (numCards === 20) {
    cardContainer.classList.add("grid-5x4");
  } else if (numCards === 24) {
    cardContainer.classList.add("grid-6x4");
  }

  const pairedEmojis = emojis
    .slice(0, numCards / 2)
    .concat(emojis.slice(0, numCards / 2)); // Ajusta el array según el nivel
  const shuffledEmojis = shuffle(pairedEmojis); //Baraja cartas

  //bucle para crear las cartas
  for (let i = 0; i < numCards; i++) {
    const card = document.createElement("li");
    card.classList.add("card");
    card.innerHTML = `
        <div class="content">
          <div class="front">❔</div>
          <div class="back">${shuffledEmojis[i]}</div>
        </div>`;
    cardContainer.appendChild(card);
    card.addEventListener("click", flipCard); //evento flipCard en cada carta
  }

  resetBoard(); //reseteamos valores 1ra, 2da y comparación de cartas
}

//LÓGICA DEL JUEGO

//función que se llama cada vez que hay un click en una carta:
function flipCard() {
  if (notBingo) return; //si notBingo es falso (coincidiendo con su valor original), no permite que se dé vuelta una carta, por lo que la función flipCard() se detiene inmediatamente. Porque da bingo y se quedan las cartas boca arriba
  if (this === firstCard) return; //this hace referencia a la carta que se acaba de voltear. FirstCard es una variable que almacena la primera carta que se volteó. Si this es la 1ra carta volteada, se impide que se clike 2 veces

  //Agregamos la clase .flipped a la carta actual this, que suele hacer que la carta se dé vuelta.
  this.classList.add("flipped");

  //Si firstCard no tiene valor, se asigna la carta actual (this):
  if (!firstCard) {
    firstCard = this;
    return;
  }

  secondCard = this; //Si firstCard ya tiene un valor asigna la carta actual (this) a secondCard
  triesCounter++; //Incrementamos el contador de tries
  triesDisplay.textContent = `Tries: ${triesCounter}`;

  checkForMatch(); //Llama a la función checkForMatch para comprobar si las cartas coinciden, para dejarlas boca arriba (disabledCards()) o volverlas a voltear (unflipCards()).
}

// Comprueba si contenido de trasero de las 2 cartas coincide:
function checkForMatch() {
  let isMatch =
    firstCard.querySelector(".back").textContent ===
    secondCard.querySelector(".back").textContent;

  if (isMatch) {
    disableCards();
    successCounter++; // Incrementa el contador de aciertos
    successDisplay.textContent = `Matches: ${successCounter}`;
    if (successCounter === allLevels[currentLevel] / 2) {
      //compara los aciertos actuales con el nº total de pares
      showPopup();
    }
  } else {
    unflipCards();
  }
}

//popUp cuando pasas un nivel
function showPopup() {
  const popupEmojis = document.getElementById("popup-emojis");
  const popupText = document.getElementById("popup-text");
  const nextLevelButton = document.getElementById("nextLevel");

  if (currentLevel === 3) {
    // Mensaje personalizado para cuando superas todos los niveles
    popupEmojis.textContent = "🎰🎉🏆🥇";
    popupText.textContent =
      "¡CONGRATULATIONSSS! You have completed all levels!";
    nextLevelButton.style.display = "none"; // Escondemos el botón de 'Next level'
  } else {
    // Mensaje para los otros niveles
    popupEmojis.textContent = "🧃🦑🥐🧑🏽‍🦽‍➡️";
    popupText.textContent = "¡You have found all the pairs on this level!";
    popupEmojis.textContent = "🫏🍍🍼🔫";
    nextLevelButton.style.display = "inline-block"; // Mostramos el botón de 'Next level'
  }
  popup.style.display = "flex";
}

//botón que cierra el pop up cd pasas de nivel
closePopupButton.addEventListener("click", () => {
  popup.style.display = "none";
});

//botón que reinicia el juego cd pasas de nivel
restartButton.addEventListener("click", () => {
  popup.style.display = "none";
  startGame(); //Reinicia el nivel
});

//botón para pasar de nivel
nextLevelButton.addEventListener("click", () => {
  if (currentLevel < 3) {
    currentLevel++; //sube un nivel
    startGame(); //genera las cartas para ese siguiente nivel
    popup.style.display = "none";
  }
});

//la llamaremos cuando las 2 cartas volteadas coincidan para deshabilitar su interactividad y q se queden boca arriba
function disableCards() {
  firstCard.removeEventListener("click", flipCard); //eliminamos evento
  secondCard.removeEventListener("click", flipCard);
  resetBoard(); //reseteamos valores 1ra, 2da y comparación de cartas
}

//las cartas vuelven a su estado original si, al clickarlas no hay coincidencias
function unflipCards() {
  errorCounter++; //sumamos contador fallos
  errorDisplay.textContent = `Errors: ${errorCounter}`;
  notBingo = true; //no hay bingo, las 2 cartas desvolteadas, se vuelven a voltear

  //función que eliminará el evento flipped pasado 1 sec
  setTimeout(() => {
    firstCard.classList.remove("flipped");
    secondCard.classList.remove("flipped");
    resetBoard(); //reseteamos valores 1ra, 2da y comparación de cartas
  }, 1000);
}

//reseteamos valores 1ra, 2da y comparación de cartas para que el resultado anterior no interfiera con el próximo.
function resetBoard() {
  [firstCard, secondCard, notBingo] = [null, null, false];
}

//Método Fisher-Yate, que baraja las cartas
function shuffle(array) {
  //esta función coge el array que le indiques y lo recorre desde el final al inicio
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1)); //selecciona un índice aleatorio: para cada elemento en i, selecciona un índice aleatorio j entre 0 y i.
    [array[i], array[j]] = [array[j], array[i]]; //intercambia los elementos
  }
  return array; //retorna el array mezclado
}

//Inicialización del juego al cargar la página
document.addEventListener("DOMContentLoaded", () => {
  startGame();

  //menú lateral izquierdo
  const dropbtn = document.querySelector(".dropbtn");
  const dropdownContent = document.querySelector(".dropdown-content");

  dropbtn.addEventListener("click", () => {
    dropdownContent.style.display =
      dropdownContent.style.display === "block" ? "none" : "block";
  });

  //cerramos el menú lateral izquierdo si se clicka fuera de él
  window.addEventListener("click", (event) => {
    if (!event.target.matches(".dropbtn")) {
      if (dropdownContent.style.display === "block") {
        dropdownContent.style.display = "none";
      }
    }
  });

  //montamos las cartas del nivel 1
  document.getElementById("level1").addEventListener("click", () => {
    currentLevel = 1;
    startGame();
  });

  //nivel 2
  document.getElementById("level2").addEventListener("click", () => {
    currentLevel = 2;
    startGame();
  });

  //nivel 3
  document.getElementById("level3").addEventListener("click", () => {
    currentLevel = 3;
    startGame();
  });
});
