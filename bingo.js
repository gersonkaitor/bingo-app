const bingoEl = document.querySelector('#bingo-table');
const spinBtn = document.querySelector('#spin-btn');
const resetBtn = document.querySelector('#reset-btn');
const spinner = document.querySelector('.spinner');
const bingoArr = ['B', 'I', 'N', 'G', 'O'];

function displayBingoTable() {
  let lastNum = 0;
  let lastNumSecondArr = 0;
  for (let i = 1; i <= 5; i++) {
    const bingoItem = document.createElement('div');
    const text = document.createTextNode(bingoArr[i - 1]);
    bingoItem.classList.add(`letter-${bingoArr[i - 1]}`);
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
      lastNumSecondArr = j;
    }
    lastNum = i * lastNumSecondArr;
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

function resetDisplay() {
  for (let i = 0; i < 5; i++) {
    for (let j = 0; j <= 15; j++) {
      bingoEl.children[i].children[j].classList.remove('active');
    }
  }
}

function spin() {
  const results = [];
  const randomNum = Math.floor(Math.random() * 75);
  results.push(randomNum);

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

window.addEventListener('DOMContentLoaded', displayBingoTable);
spinBtn.addEventListener('click', spin);
resetBtn.addEventListener('click', resetDisplay);
