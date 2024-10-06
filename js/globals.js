"use strict";

//Variables globales
export const globalVars = {
  firstCard,
  secondCard,
  notBingo: false,
  triesCounter: 0,
  errorCounter: 0,
  successCounter: 0,
  currentLevel: 1, //nivel actual
  allLevels: { 1: 16, 2: 20, 3: 24 }, //nº de cartas según nivel
  emojis: [
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
  ],
};

//DOM
export const DOMvars = {
  triesDisplay: document.getElementById("tries"),
  errorDisplay: document.getElementById("errors"),
  successDisplay: document.getElementById("success"),
  popup: document.getElementById("popup"), //aparece cuando pasas de nivel
  closePopupButton: document.getElementById("close-popup"),
  restartButton: document.getElementById("restart"),
  nextLevelButton: document.getElementById("nextLevel"),
  cardContainer: document.getElementById("card-container"),
};
