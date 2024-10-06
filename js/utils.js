"use strict";
//funciones auxiliares

// Método Fisher-Yate (baraja las cartas)
export function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array; //retorna el array mezclado
}

// Reset del estado de las cartas
export function resetBoard(globalVars) {
  globalVars.firstCard = null;
  globalVars.secondCard = null;
  globalVars.notBingo = false;
}
