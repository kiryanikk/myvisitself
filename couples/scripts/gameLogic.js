import { stopTimer, totalTime } from "./timer.js";
import { generateConfetti } from "./confetti.js";

const confettiArray = generateConfetti(150);

let totalFlips = 0;
let isGameOver = false;

const couple = {
  first: null,
  firstClickable: true,
  second: null,
  secondClickable: true,
};

function gameLogic(card) {
  if (isGameOver) return;
  if (totalTime === 0) return;
  if (!couple.firstClickable && !couple.secondClickable) return;

  card.classList.add('flip');
  totalFlips++;

  if (couple.first === null) {
    couple.first = card;
    couple.firstClickable = false;
  } else if (couple.second === null && couple.first !== card) {
    couple.second = card;
    couple.secondClickable = false;
  }

  if (couple.first === null || couple.second === null) return;

  const isEqual = couple.first.firstElementChild.classList[2] === couple.second.firstElementChild.classList[2];

  if (isEqual) {
    setTimeout(() => {
      couple.first.classList.add('successfully');
      couple.second.classList.add('successfully');

      refresh();
    }, 1000);
  } else {
    setTimeout(() => {
      couple.first.classList.remove('flip');
      couple.second.classList.remove('flip');

      refresh();
    }, 1000);
  }

  function refresh() {
    couple.first = null;
    couple.second = null;
    couple.firstClickable = true;
    couple.secondClickable = true;
  }

  isWin();
}


function isWin() {
  const gameTable = document.querySelector('.table');
  if (Array.from(gameTable.children).every((card) => card.classList.contains('flip'))) {
    setTimeout(() => {
      stopTimer();
      startConfetti();
      isGameOver = true;
      alert("Вы победили!");
    }, 1500)
  }
}

function startConfetti() {
  const confettiElement = document.querySelector('.confetti');
  confettiArray.forEach((item) => {
    confettiElement.append(item);
  })
}

export { gameLogic, totalFlips };