"use strict";
//funciones que manejan eventos

import { globalVars, DOMvars } from "./globals.js";
import { resetBoard } from "./utils.js";
import { updateDisplay, showPopup } from "./ui.js";

export function handleEventListeners() {
  DOMvars.closePopupButton.addEventListener("click", () => {
    //cierra popUp
    DOMvars.popup.style.display = "none";
  });

  DOMvars.restartButton.addEventListener("click", () => {
    //botón de reinicio de juego
    DOMvars.popup.style.display = "none";
    startGame();
  });

  DOMvars.nextLevelButton.addEventListener("click", () => {
    //botón para pasar de nivel
    if (globalVars.currentLevel < 3) {
      globalVars.currentLevel++;
      startGame();
      DOMvars.popup.style.display = "none";
    }
  });

  // Cartas según nivel
  document.getElementById("level1").addEventListener("click", () => {
    globalVars.currentLevel = 1;
    startGame();
  });

  document.getElementById("level2").addEventListener("click", () => {
    globalVars.currentLevel = 2;
    startGame();
  });

  document.getElementById("level3").addEventListener("click", () => {
    globalVars.currentLevel = 3;
    startGame();
  });
}
