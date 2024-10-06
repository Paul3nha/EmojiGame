"use strict";
//actualizaciones de la UI --> contadores, popup, y mostrar mensajes

import { DOMvars, globalVars } from "./globals.js";

export function updateDisplay() {
  DOMvars.triesDisplay.textContent = `Tries: ${globalVars.triesCounter} `;
  DOMvars.errorDisplay.textContent = `Errors: ${globalVars.errorCounter}`;
  DOMvars.successDisplay.textContent = `Matches: ${globalVars.successCounter}`;
}

// Cuando pasas un nivel
export function showPopup() {
  const popupEmojis = document.getElementById("popup-emojis");
  const popupText = document.getElementById("popup-text");
  const nextLevelButton = document.getElementById("nextLevel");

  if (globalVars.currentLevel === 3) {
    //superaste todos los niveles
    popupEmojis.textContent = "🎰🎉🏆🥇";
    popupText.textContent =
      "¡CONGRATULATIONSSS! You have completed all levels!";
    nextLevelButton.style.display = "none";
  } else {
    //resto de niveles
    popupEmojis.textContent = "🧃🦑🥐🧑🏽‍🦽‍➡️";
    popupText.textContent = "¡You have found all the pairs on this level!";
    popupEmojis.textContent = "🫏🍍🍼🔫";
    nextLevelButton.style.display = "inline-block";
  }
  DOMvars.popup.style.display = "flex";
}
