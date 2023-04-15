const bingoEl = document.querySelector('#bingo-table');
const spinBtn = document.querySelector('#spin-btn');
const resetBtn = document.querySelector('#reset-btn');
const spinner = document.querySelector('.spinner');
const bingoCard = document.querySelector('#bingo-card-body');
const bingoLoop = ['B', 'I', 'N', 'G', 'O'];
let results = [];

function spin() {
  const randomNum = Math.floor(Math.random() * 75);
  results.push(randomNum);

  displaySpinner(results);
}

function addToggleToPattern(e) {
  let lastNum = 0;
  let lastNumSecondLoop = 0;
  for (let i = 1; i <= 5; i++) {
    for (let j = 1; j <= 5; j++) {
      if (e.target.classList.contains(lastNum + j)) {
        e.target.classList.toggle('item-active');
      }
      lastNumSecondLoop = j;
    }
    lastNum = i * lastNumSecondLoop;
  }
}

function displayBingoTable() {
  let lastNum = 0;
  let lastNumSecondLoop = 0;
  for (let i = 1; i <= 5; i++) {
    const bingoItem = document.createElement('div');
    const text = document.createTextNode(bingoLoop[i - 1]);
    bingoItem.classList.add(`letter-${bingoLoop[i - 1]}`);
    bingoItem.appendChild(text);

    const bingoRow = document.createElement('div');
    bingoRow.classList.add('bingo-row');

    bingoRow.appendChild(bingoItem);
    bingoEl.appendChild(bingoRow);
    for (let j = 1; j <= 15; j++) {
      const bingoItem = document.createElement('div');
      const text = document.createTextNode(lastNum + j);
      bingoItem.classList.add('num');
      bingoItem.setAttribute('data-id', lastNum + j);
      bingoItem.appendChild(text);

      bingoRow.appendChild(bingoItem);
      bingoEl.appendChild(bingoRow);
      lastNumSecondLoop = j;
    }
    lastNum = i * lastNumSecondLoop;
  }
}

function displayResult(results) {
  for (let r of results) {
    for (let i = 0; i < 5; i++) {
      for (let j = 0; j <= 15; j++) {
        if (+bingoEl.children[i].children[j].dataset.id === r) {
          bingoEl.children[i].children[j].classList.add('active');
        }
      }
    }
  }
}

function resetBingo() {
  results = [];
  for (let i = 0; i < 5; i++) {
    for (let j = 0; j <= 15; j++) {
      bingoEl.children[i].children[j].classList.remove('active');
    }
  }
  clearPattern();
}

function displaySpinner(results) {
  spinBtn.style.display = 'none';
  resetBtn.style.display = 'none';
  spinner.style.display = 'block';

  setTimeout(() => {
    displayResult(results);
    spinBtn.style.display = 'inline-block';
    resetBtn.style.display = 'inline-block';
    spinner.style.display = 'none';
  }, 2000);
}

function displayBingoCard() {
  let lastNum = 0;
  let lastNumSecondLoop = 0;
  for (let i = 1; i <= 5; i++) {
    const col = document.createElement('div');
    col.classList.add('bingo-pattern-col');
    for (let j = 1; j <= 5; j++) {
      const colItem = document.createElement('div');
      colItem.classList.add('col-item', lastNum + j);
      if (i === 3 && j === 3) {
        colItem.classList.add('item-active');
        colItem.classList.remove(lastNum + j);
        colItem.textContent = 'free';
      }
      col.appendChild(colItem);
      lastNumSecondLoop = j;
    }
    bingoCard.appendChild(col);
    lastNum = i * lastNumSecondLoop;
  }
}

function clearPattern() {
  for (let i = 0; i < 5; i++) {
    for (let j = 0; j < 5; j++) {
      if (i === 3 && j === 3) {
        bingoCard.children[2].children[2].classList.add('item-active');
      }
      bingoCard.children[i].children[j].classList.remove('item-active');
    }
  }
}

window.addEventListener('DOMContentLoaded', displayBingoTable);
window.addEventListener('DOMContentLoaded', displayBingoCard);
spinBtn.addEventListener('click', spin);
resetBtn.addEventListener('click', resetBingo);
bingoCard.addEventListener('click', addToggleToPattern);
console.log(results);
