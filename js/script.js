'use strict';

const cards = document.querySelectorAll(".card"); //manipulamos el DOM / seleccionamos los elementos con clase .card 

//RESUMEN 1 parte: función reveal, al activarse añade la clase flipped a la carta clikada y tras 1 sec hace que vuelva a su estado original.

const reveal = (e) => { //función reveal se activa cd ocurre un evento. "e" es el evento
  const currentCard = e.currentTarget; //e.currentTarget es el elemento en el que se establece el evento, es decir la carta clicada
  currentCard.classList.add("flipped"); //se agrega la clase ".flipped" a currentCard. Esta carta se asocia en el CSS con lo que voltea

  setTimeout(() => {
    currentCard.classList.remove("flipped"); //temporizador que elimine el evento "flipped" tras 1 sec
  }, 1000); 
};

//Iteramos sobre las cartas (es un array) con un bucle for...of, a cada posicion le agregamos el evento click con el que se ejecuta la función reveal
for (const card of cards) {
  card.addEventListener("click", reveal);
}

//Vamos 2 parte:
// Paso 2.1: Crear el array de emojis
const emojis =  ['👻', '👹', '🍼', '🧑🏽‍🦽', '💗', '💩', '🫄🏻', '🥑'];

// Paso 2.2: Duplicar el array aplicando metodo .concat()
const pairedEmojis = emojis.concat(emojis);  // Esto crea un array con 16 elementos (8 pares)

// Paso 2.3: Mezclar el array (usando el método Fisher-Yates: es el que se usa típicamente para barajar en los juegos de azar)
function shuffle(array) { //función shuffle tomará un array como argumento
    for (let i = array.length - 1; i > 0; i--) { //bucle q comienza en el último elemento del array y se mueve hacia el 1ro
        const j = Math.floor(Math.random() * (i + 1)); //generación de índice aleatorio 'j', entre 0 y 'i' inclusive. Math.random() devuelve un número aleatorio entre 0 y 1, que se multiplica por i + 1 y se redondea hacia abajo con Math.floor().


        [array[i], array[j]] = [array[j], array[i]]; // elementos en las posiciones i y j se intercambian usando desestructuración de arrays.
    }
    return array; //array ya mezclado
}

const shuffledEmojis = shuffle(pairedEmojis);  //guardamos en la variable shuffledEmojis el resultado de la función shuffle, que es un nuevo array mezclado

const backs = document.querySelectorAll('.back'); //manipulamos el DOM seleccionando todos los elementos con la clase .back (esto devuelve array = nodeList)

//Paso 2.4: asignamos contenido a los elementos DOM
backs.forEach((back, index) => { //vamos a iterar
    if (index < shuffledEmojis.length) { //verificamos si índice (index) es menor que la longitud de nuestro array  mezclado shuffledEmojis.
        back.textContent = shuffledEmojis[index]; //si se cumple lo anterior, asignamos el contenido shuffledEmojis en la posición index con .textContent en el .back
    }
});

/*    QUE FALTA?
    - asignar una función que compare los resultados del volteo y que si coinciden, permanezcan destapadas las cartas
    - crear un contador con los fallos al no cumplirse lo anterior

    - crear un botón o cuadro de diálogo score con los fallos o aciertos
*/
