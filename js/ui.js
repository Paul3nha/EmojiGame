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

export function setCardGrid(numCards) {
  //Eliminar grids previos (si existiesen)
  DOMvars.cardContainer.classList.remove("grid-4x4", "grid-5x4", "grid-6x4");

  //Asignar la clase correcta según el número de cartas
  if (numCards === 16) {
    DOMvars.cardContainer.classList.add("grid-4x4"); //lama al css
  } else if (numCards === 20) {
    DOMvars.cardContainer.classList.add("grid-5x4");
  } else if (numCards === 24) {
    DOMvars.cardContainer.classList.add("grid-6x4");
  }
}

// Menu lateral
export function initDropdown() {
  //menú lateral izquierdo
  const dropbtn = document.querySelector(".dropbtn");
  const dropdownContent = document.querySelector(".dropdown-content");

  //abrir y cerrar el menu
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
}
