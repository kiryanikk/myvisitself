import { gameLogic } from "./gameLogic.js";

function createCard(flippedIcon) {
  const template = document.querySelector('#cardTemplate').cloneNode(true).content;
  const card = template.querySelector('.card');
  card.querySelector('#flippedIcon').classList.add(`fa-${flippedIcon}`);

  card.addEventListener('click', () => gameLogic(card));

  return card;
}

function createIconsArray(initialCount) {
  const cardsIcons = [
    "compass",
    "cloud",
    "play",
    "bolt",
    "stop",
    "cogs",
    "atom",
    "basketball-ball",
    "arrows",
    "angle-left",
    "bars",
    "file",
    "filter",
    "gear",
    "folder",
    "folder-open",
    "shield",
    "scissors",
    "pen-clip",
  ];

  let cards = cardsIcons.slice(0, Math.floor(initialCount / 2));
  const duobleCards = dublicateElements(cards);

  return shuffleArray(duobleCards);
};

function shuffleArray(array) {
  let currentIndex = array.length;

  while (currentIndex !== 0) {
    currentIndex--;
    const randomIndex = Math.floor(Math.random() * currentIndex);

    const temp = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temp;
  };

  return array;
}

function dublicateElements(array) {
  const newArr = [];

  array.forEach((item) => {
    newArr.push(item, item);
  });

  return newArr;
}

export { createCard, createIconsArray };