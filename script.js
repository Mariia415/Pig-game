'use strict';
const btnRoll = document.querySelector('.roll');
const btnHold = document.querySelector('.hold');
const btnNew = document.querySelector('.new');
const diceElement = document.querySelector('.dice');
const currentScoreP0 = document.querySelector('.current--0');
const currentScoreP1 = document.querySelector('.current--1');
const globalScoreP0 = document.querySelector('.score--0');
const globalScoreP1 = document.querySelector('.score--1');
const player0 = document.querySelector('.player--0');
const player1 = document.querySelector('.player--1');
console.log(btnRoll, btnHold, btnNew, player0, player1);

let activePlayer = 0;
let currentScore = 0;
let scores = [0, 0];
let playing = true;

const init = function () {
  playing = true;
  activePlayer = 0;
  currentScore = 0;
  scores = [0, 0];
  diceElement.classList.add('hidden');
  player0.classList.add('player-active');
  player1.classList.remove('player-active');
  player0.classList.remove('player-winner');
  player1.classList.remove('player-winner');
  currentScoreP0.textContent = 0;
  currentScoreP1.textContent = 0;
  globalScoreP0.textContent = 0;
  globalScoreP1.textContent = 0;
};
const switchPlayer = function () {
  document.querySelector(`.current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0.classList.toggle('player-active');
  player1.classList.toggle('player-active');
};

//Starting conditions
init();

//Rolling the dice
btnRoll.addEventListener('click', function () {
  if (playing) {
    const diceRole = Math.trunc(Math.random() * 6) + 1;
    diceElement.classList.remove('hidden');
    diceElement.src = `dice-${diceRole}.png`;
    if (diceRole === 1) {
      switchPlayer();
    } else {
      currentScore += diceRole;
      document.querySelector(
        `.current--${activePlayer}`
      ).textContent = currentScore;
    }
  }
});

//Holding the score

btnHold.addEventListener('click', function () {
  if (playing) {
    scores[activePlayer] += currentScore;
    if (scores[activePlayer] < 100) {
      document.querySelector(`.score--${activePlayer}`).textContent =
        scores[activePlayer];
      switchPlayer();
    } else {
      document.querySelector(`.score--${activePlayer}`).textContent = 100;
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player-winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player-active');
      diceElement.classList.add('hidden');

      playing = false;
      document.querySelector(`.win${activePlayer}`).textContent = 'Winner';
      document.querySelector(`.current--${activePlayer}`).textContent = '🎉';
    }
  }
});

btnNew.addEventListener('click', init);
