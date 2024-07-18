'use strict';

const cards = document.querySelectorAll(".card");
let firstCard, secondCard;
let notBingo = false;
let triesCounter = 0;
let errorCounter = 0;
let successCounter = 0;
const triesDisplay = document.getElementById('tries');
const errorDisplay = document.getElementById('errors');
const successDisplay = document.getElementById('success');
const popup = document.getElementById('popup');
const closePopupButton = document.getElementById('close-popup');

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
  triesDisplay.textContent = `Tries: ${triesCounter}`;
  checkForMatch();
}

function checkForMatch() {
  let isMatch = firstCard.querySelector('.back').textContent === secondCard.querySelector('.back').textContent;
  if (isMatch) {
    disableCards();
    successCounter++;
    successDisplay.textContent = `Matches: ${successCounter}`;
    if (successCounter === 8) {
      showPopup();
    }
  } else {
    unflipCards();
  }
}

function showPopup() {
  popup.style.display = 'flex';
}

closePopupButton.addEventListener('click', () => {
  popup.style.display = 'none';
});

const goToNextButton = document.getElementById('next-level');

goToNextButton.addEventListener('click', () => {
  window.location.href = 'index2.html';
});

function disableCards() {
  firstCard.removeEventListener('click', flipCard);
  secondCard.removeEventListener('click', flipCard);
  resetBoard();
}

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

function resetBoard() {
  [firstCard, secondCard, notBingo] = [null, null, false];
}

cards.forEach(card => card.addEventListener('click', flipCard));

const emojis = ['👻', '👹', '👽', '🪢', '🦋', '🎲', '💻', '🌰'];
const pairedEmojis = emojis.concat(emojis);

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

const shuffledEmojis = shuffle(pairedEmojis);
const backs = document.querySelectorAll('.back');

backs.forEach((back, index) => {
  if (index < shuffledEmojis.length) {
    back.textContent = shuffledEmojis[index];
  }
});
