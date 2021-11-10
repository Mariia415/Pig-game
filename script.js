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
const name0 = document.querySelector('.name--0');
const name1 = document.querySelector('.name--1');
// console.log(btnRoll, btnHold, btnNew, player0, player1);
console.log(name0, name1);

let activePlayer = 0;
let currentScore = 0;
let scores = [0, 0];
let playing = false;

const init = function () {
  activePlayer = 0;
  currentScore = 0;
  scores = [0, 0];
  document.querySelector('.player--0 h2').textContent = 'Player1';
  document.querySelector('.player--1 h2').textContent = 'Player2';
  name0.value = '';
  name1.value = '';
  diceElement.classList.add('hidden');
  // player0.classList.add('player-active');
  // player1.classList.remove('player-active');
  player0.classList.remove('player-active');
  player1.classList.remove('player-active');
  player0.classList.remove('player-winner');
  player1.classList.remove('player-winner');
  btnRoll.classList.remove('action-button');
  btnNew.classList.add('action-button');
  currentScoreP0.textContent = 0;
  currentScoreP1.textContent = 0;
  globalScoreP0.textContent = 0;
  globalScoreP1.textContent = 0;
  name0.classList.remove('hidden');
  name1.classList.remove('hidden');
  name0.addEventListener('keydown', function (e) {
    if (e.key === 'Enter') {
      document.querySelector('.player--0 h2').textContent = name0.value;
      name0.classList.add('hidden');
    }
  });
};
name1.addEventListener('keydown', function (e) {
  if (e.key === 'Enter') {
    document.querySelector('.player--1 h2').textContent = name1.value;
    name1.classList.add('hidden');
  }
  playing =
    document.querySelector('.player--0 h2').textContent === name0.value &&
    document.querySelector('.player--1 h2').textContent === name1.value
      ? true
      : false;
  if (
    document.querySelector('.player--0 h2').textContent === name0.value &&
    document.querySelector('.player--1 h2').textContent === name1.value
  ) {
    btnNew.classList.remove('action-button');
    btnRoll.classList.add('action-button');

    player0.classList.add('player-active');
  }
});

const switchPlayer = function () {
  document.querySelector(`.current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0.classList.toggle('player-active');
  player1.classList.toggle('player-active');
};

//Starting conditions
// init();

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
      document.querySelector(`.current--${activePlayer}`).textContent =
        currentScore;
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
      btnNew.classList.add('action-button');
      btnRoll.classList.remove('action-button');
      name0.classList.add('hidden');
      name1.classList.add('hidden');
    }
  }
});

btnNew.addEventListener('click', init);
